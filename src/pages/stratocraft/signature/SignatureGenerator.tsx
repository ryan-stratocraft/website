import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { firebaseAuth, firebaseStorage } from "../../../firebase/firebase";
import "./signature.css";

const MAX_IMAGE_BYTES = 400 * 1024;

/** Comma-separated in VITE_SIGNATURE_ALLOWED_EMAILS, or default below. Keep storage.rules in sync. */
const DEFAULT_ALLOWLIST = "ryan@strato-craft.com";

function parseAllowedEmails(): Set<string> {
  const raw = import.meta.env.VITE_SIGNATURE_ALLOWED_EMAILS ?? DEFAULT_ALLOWLIST;
  return new Set(
    raw
      .split(",")
      .map((e: string) => e.trim().toLowerCase())
      .filter(Boolean),
  );
}

function isEmailAllowlisted(email: string | null | undefined): boolean {
  if (!email) return false;
  return parseAllowedEmails().has(email.trim().toLowerCase());
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeHref(url: string): string {
  const t = url.trim();
  if (!t) return "#";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

/**
 * Turns plain footer/disclaimer lines into Outlook-friendly HTML:
 * newlines → <br />; bare https?:// segments become <a> with link styling.
 * Non-URL text is escaped. Content stays customer-controlled via the textarea.
 */
function formatFooterDisclaimerHtml(raw: string, linkCssFragment: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  const lines = trimmed.replace(/\r\n/g, "\n").split("\n");
  return lines.map((line) => linkifyHttpsSegments(line, linkCssFragment)).join("<br />");
}

function linkifyHttpsSegments(line: string, linkCssFragment: string): string {
  let out = "";
  let lastIdx = 0;
  const re = /\b(https?:\/\/[^\s<>"]+)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    const matched = m[0];
    out += escapeHtml(line.slice(lastIdx, m.index));
    const core = matched.replace(/[.,;!?]+$/g, "");
    const trailingPunct = matched.slice(core.length);
    const href = sanitizeHref(core.length > 0 ? core : matched);
    const linkLabel = escapeHtml(core.length > 0 ? core : matched);
    out += `<a href="${escapeHtml(href)}" style="font-size:inherit;${linkCssFragment}">${linkLabel}</a>`;
    out += escapeHtml(trailingPunct);
    lastIdx = m.index + matched.length;
  }
  out += escapeHtml(line.slice(lastIdx));
  return out;
}

function clampInt(n: number, min: number, max: number, fallback: number): number {
  if (typeof n !== "number" || !Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.round(n)));
}

/** Safe #rrggbb for inline HTML; invalid input returns `fallback`. */
function sanitizeHex6(input: string, fallback: string): string {
  const t = input.trim();
  return /^#[0-9A-Fa-f]{6}$/.test(t) ? t.toLowerCase() : fallback;
}

function optionalHex6(input: string): string | null {
  const t = input.trim();
  return /^#[0-9A-Fa-f]{6}$/.test(t) ? t.toLowerCase() : null;
}

function getUploadUidOrThrow(): string {
  const u = firebaseAuth.currentUser;
  if (!u?.uid) {
    throw new Error("Sign in to upload images.");
  }
  if (!isEmailAllowlisted(u.email)) {
    throw new Error("This account cannot upload to signature storage.");
  }
  return u.uid;
}

/** Some exports (e.g. logos) omit `file.type`; Storage rules still need a real `image/*` content type. */
function imageContentType(file: File): string {
  const t = (file.type ?? "").trim().toLowerCase();
  if (t.startsWith("image/")) return t;
  const base = file.name.split(".").pop()?.toLowerCase() ?? "";
  const byExt: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    avif: "image/avif",
  };
  const inferred = byExt[base];
  if (inferred) return inferred;
  throw new Error(
    "No image type detected — use a .png / .jpg / .gif / .webp file, or re-export from your design tool.",
  );
}

type ImageShapeId =
  | "circle"
  | "square_sharp"
  | "square_rounded"
  | "rounded_large"
  | "diamond"
  | "diamond_wide"
  | "triangle_up"
  | "triangle_down"
  | "hexagon"
  | "octagon";

const IMAGE_SHAPE_OPTIONS: { id: ImageShapeId; label: string }[] = [
  { id: "circle", label: "Circle" },
  { id: "square_sharp", label: "Square (sharp corners)" },
  { id: "square_rounded", label: "Square (rounded corners)" },
  { id: "rounded_large", label: "Square (heavy rounded)" },
  { id: "diamond", label: "Diamond" },
  { id: "diamond_wide", label: "Wide diamond (elongated rhombus)" },
  { id: "triangle_up", label: "Triangle (point up)" },
  { id: "triangle_down", label: "Triangle (point down)" },
  { id: "hexagon", label: "Hexagon" },
  { id: "octagon", label: "Octagon" },
];

const IMAGE_SHAPE_IDS = IMAGE_SHAPE_OPTIONS.map((o) => o.id);

const IMAGE_SHAPE_SET = new Set<string>(IMAGE_SHAPE_IDS);

/** clip-path polygons — Gmail/WebKit/mobile often OK; classic Outlook ignores (square crop fallback). */
const SHAPE_CLIP: Partial<
  Record<ImageShapeId, string>
> = {
  diamond: "polygon(50% 8%, 90% 50%, 50% 92%, 10% 50%)",
  diamond_wide:
    "polygon(12% 32%, 50% 12%, 88% 32%, 88% 68%, 50% 88%, 12% 68%)",
  triangle_up: "polygon(50% 12%, 88% 90%, 12% 90%)",
  triangle_down: "polygon(50% 88%, 12% 10%, 88% 10%)",
  hexagon:
    "polygon(24% 8%, 76% 8%, 96% 50%, 76% 92%, 24% 92%, 4% 50%)",
  octagon:
    "polygon(34% 0%, 66% 0%, 100% 34%, 100% 66%, 66% 100%, 34% 100%, 0% 66%, 0% 34%)",
};

type ImageFitId = "cover" | "contain";

function coerceImageShape(
  value: unknown,
  fallback: ImageShapeId,
): ImageShapeId {
  return typeof value === "string" && IMAGE_SHAPE_SET.has(value)
    ? (value as ImageShapeId)
    : fallback;
}

function coerceImageFit(value: unknown, fallback: ImageFitId): ImageFitId {
  return value === "contain" ? "contain" : fallback;
}

/** Border-radius for wrappers/images that don't rely on polygons. */
function shapeBorderRadius(shape: ImageShapeId, boxPx: number): string {
  const rSm = Math.max(6, Math.round(boxPx * 0.09));
  const rLg = Math.max(8, Math.round(boxPx * 0.18));
  switch (shape) {
    case "circle":
      return "50%";
    case "square_sharp":
    case "diamond":
    case "diamond_wide":
    case "triangle_up":
    case "triangle_down":
    case "hexagon":
    case "octagon":
      return "0";
    case "square_rounded":
      return `${rSm}px`;
    case "rounded_large":
      return `${rLg}px`;
    default:
      return "50%";
  }
}

function shapeClipPath(shape: ImageShapeId): string | undefined {
  return SHAPE_CLIP[shape];
}

type ImageBorderStyleId = "none" | "solid" | "dotted";

const IMAGE_BORDER_STYLE_OPTIONS: { id: ImageBorderStyleId; label: string }[] =
  [
    { id: "none", label: "No border" },
    { id: "solid", label: "Solid" },
    { id: "dotted", label: "Dotted" },
  ];

function coerceImageBorderStyle(value: unknown): ImageBorderStyleId {
  if (value === "solid" || value === "dotted") return value;
  return "none";
}

/** Border on the frame; box-sized so inner image uses 100%×100% with border-box. */
function frameBorderInlineFragment(
  borderStyle: unknown,
  borderWidthPx: unknown,
  borderColorHex: unknown,
): string {
  const bs = coerceImageBorderStyle(borderStyle);
  const parsedW =
    typeof borderWidthPx === "number" && Number.isFinite(borderWidthPx)
      ? borderWidthPx
      : Number.parseInt(String(borderWidthPx ?? "").trim(), 10);
  const bw = clampInt(Number.isFinite(parsedW) ? parsedW : 2, 0, 12, 2);
  const col = sanitizeHex6(
    typeof borderColorHex === "string" ? borderColorHex : "",
    "#475569",
  );
  if (bs === "none" || bw < 1) {
    return "border:0";
  }
  return `border:${bw}px ${bs} ${escapeHtml(col)}`;
}

function framedImageMarkup(params: {
  src: string;
  boxPx: number;
  alt: string;
  shape: ImageShapeId;
  fit: ImageFitId;
  posX: number;
  posY: number;
  borderStyle: ImageBorderStyleId;
  borderWidthPx: number;
  borderColorHex: string;
}): string {
  const box = clampInt(params.boxPx, 16, 400, 88);
  const posX = clampInt(params.posX, 0, 100, 50);
  const posY = clampInt(params.posY, 0, 100, 50);
  const fit = params.fit === "contain" ? "contain" : "cover";
  const shape = coerceImageShape(params.shape, "circle");
  const br = shapeBorderRadius(shape, box);
  const clip = shapeClipPath(shape);
  const wrapParts = [
    `box-sizing:border-box`,
    `display:block`,
    `width:${box}px`,
    `height:${box}px`,
    `overflow:hidden`,
    `line-height:0`,
    `border-radius:${br}`,
    `flex-shrink:0`,
    frameBorderInlineFragment(
      params.borderStyle,
      params.borderWidthPx,
      params.borderColorHex,
    ),
  ];
  if (clip) {
    wrapParts.push(`clip-path:${clip}`, `-webkit-clip-path:${clip}`);
  }
  /* No fill behind "contain" — a solid plate (#f1f5f9) reads as white in mail and
   * replaces transparent PNG alpha; leave transparent so logos match banner/body. */
  const wrapStyle = wrapParts.join(";");
  const imgParts = [
    `display:block`,
    /* Percent sizing + object-fit is reliable in browsers but often breaks in Gmail
     * / Outlook (invisible tile or collapsed height). Explicit px matches the frame. */
    `width:${box}px`,
    `height:${box}px`,
    `max-width:${box}px`,
    `object-fit:${fit}`,
    `object-position:${posX}% ${posY}%`,
    `border:0`,
    `margin:0`,
    `vertical-align:top`,
  ];
  const imgStyle = imgParts.join(";");
  return `<div class="sig-framed-slot" style="${wrapStyle}"><img src="${escapeHtml(params.src)}" alt="${escapeHtml(params.alt)}" width="${box}" height="${box}" style="${imgStyle}" /></div>`;
}

/** Grey placeholder framed like the exported headshot crop. */
function framedPlaceholderMarkup(
  boxPx: number,
  shape: ImageShapeId,
  border: {
    borderStyle: ImageBorderStyleId;
    borderWidthPx: number;
    borderColorHex: string;
  },
): string {
  const box = clampInt(boxPx, 16, 400, 88);
  const shapeCoerced = coerceImageShape(shape, "circle");
  const br = shapeBorderRadius(shapeCoerced, box);
  const clip = shapeClipPath(shapeCoerced);
  const parts = [
    `box-sizing:border-box`,
    `display:block`,
    `width:${box}px`,
    `height:${box}px`,
    `overflow:hidden`,
    `border-radius:${br}`,
    `background:#e5e7eb`,
    `color:#64748b`,
    `font-size:11px`,
    `font-family:Arial,sans-serif`,
    `line-height:${box}px`,
    `text-align:center`,
    frameBorderInlineFragment(
      border.borderStyle,
      border.borderWidthPx,
      border.borderColorHex,
    ),
  ];
  if (clip) {
    parts.push(`clip-path:${clip}`, `-webkit-clip-path:${clip}`);
  }
  return `<div class="sig-framed-slot" style="${parts.join(";")}">Headshot</div>`;
}


async function uploadSignatureAsset(file: File, label: string): Promise<string> {
  const contentType = imageContentType(file);
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(`File must be under ${MAX_IMAGE_BYTES / 1024}KB for email-friendly delivery.`);
  }
  const uid = getUploadUidOrThrow();
  const ext =
    file.name.split(".").pop()?.toLowerCase() ||
    (contentType === "image/gif" ? "gif" : "png");
  const path = `signatures/${uid}/${label}-${Date.now()}.${ext}`;
  const storageRef = ref(firebaseStorage, path);
  await uploadBytes(storageRef, file, { contentType });
  return getDownloadURL(storageRef);
}

const SERVICE_LOGO_LIMIT = 8;

/** One optional extra brand mark (app, subsidiary, partnership, etc.) — rendered in the text column after store links. */
type PersistedServiceLogo = {
  id: string;
  url: string;
  heightPx: number;
  shape: ImageShapeId;
  fit: ImageFitId;
  posX: number;
  posY: number;
  borderStyle: ImageBorderStyleId;
  borderWidthPx: number;
  borderColorHex: string;
};

type ServiceLogoRow = PersistedServiceLogo;

function newRandomId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function defaultPersistedServiceLogo(): Omit<PersistedServiceLogo, "id"> {
  return {
    url: "",
    heightPx: 44,
    shape: "square_sharp",
    fit: "cover",
    posX: 50,
    posY: 50,
    borderStyle: "none",
    borderWidthPx: 2,
    borderColorHex: "#475569",
  };
}

function newEmptyServiceLogoRow(): ServiceLogoRow {
  return { id: newRandomId("svc"), ...defaultPersistedServiceLogo() };
}

/** Parse one row from persisted JSON / legacy draft fields. */
function normalizeServiceLogoRow(raw: unknown, index: number): ServiceLogoRow {
  const base = defaultPersistedServiceLogo();
  if (!raw || typeof raw !== "object") {
    return { id: newRandomId(`h-${index}`), ...base };
  }
  const r = raw as Record<string, unknown>;
  const id =
    typeof r.id === "string" && r.id.trim()
      ? r.id
      : newRandomId(`h-${index}`);
  return {
    id,
    url: coerceDraftString(r.url),
    heightPx: coerceDraftInt(r.heightPx, 12, 96, base.heightPx),
    shape: coerceImageShape(r.shape, base.shape),
    fit: coerceImageFit(r.fit, base.fit),
    posX: coerceDraftInt(r.posX, 0, 100, base.posX),
    posY: coerceDraftInt(r.posY, 0, 100, base.posY),
    borderStyle: coerceImageBorderStyle(r.borderStyle),
    borderWidthPx: coerceDraftInt(r.borderWidthPx, 1, 12, base.borderWidthPx),
    borderColorHex: coerceDraftString(r.borderColorHex, base.borderColorHex),
  };
}

/** Build row from legacy single product-logo fields saved in v1 drafts. */
function serviceRowFromLegacyProductFields(
  parsed: Record<string, unknown>,
): ServiceLogoRow | null {
  const url = coerceDraftString(parsed.productLogoUrl).trim();
  if (!url) return null;
  return normalizeServiceLogoRow(
    {
      url,
      heightPx: parsed.productLogoHeightPx,
      shape: parsed.productLogoShape,
      fit: parsed.productLogoFit,
      posX: parsed.productLogoPosX,
      posY: parsed.productLogoPosY,
      borderStyle: parsed.productLogoBorderStyle,
      borderWidthPx: parsed.productLogoBorderWidthPx,
      borderColorHex: parsed.productLogoBorderColorHex,
    },
    0,
  );
}

type PreviewSlideDir = "up" | "down" | "left" | "right";

type PreviewAnimId =
  | "none"
  | "fade_in"
  | "fade_out"
  | "slide_in"
  | "slide_out"
  | "pop_in"
  | "pop_out"
  | "blur_in"
  | "blur_out"
  | "fracture_in"
  | "fracture_out"
  | "slice_in"
  | "slice_out";

type PreviewMotionGroup = {
  anim: PreviewAnimId;
  durationMs: number;
  delayMs: number;
  slideDir: PreviewSlideDir;
  loopPreview: boolean;
};

type SignaturePreviewMotionBundle = {
  profile: PreviewMotionGroup;
  logos: PreviewMotionGroup;
  text: PreviewMotionGroup;
};

const PREVIEW_ANIM_OPTIONS: { id: PreviewAnimId; label: string }[] = [
  { id: "none", label: "None" },
  { id: "fade_in", label: "Fade in" },
  { id: "fade_out", label: "Fade out" },
  { id: "slide_in", label: "Slide in" },
  { id: "slide_out", label: "Slide out" },
  { id: "pop_in", label: "Pop in" },
  { id: "pop_out", label: "Pop out" },
  { id: "blur_in", label: "Blur-ish in (soft pixel dissolve)" },
  { id: "blur_out", label: "Blur-ish out" },
  { id: "fracture_in", label: "Fracture-style in" },
  { id: "fracture_out", label: "Fracture-style out" },
  { id: "slice_in", label: "Sliced bands in" },
  { id: "slice_out", label: "Sliced bands out" },
];

const PREVIEW_SLIDE_DIR_OPTIONS: { id: PreviewSlideDir; label: string }[] = [
  { id: "left", label: "From left" },
  { id: "right", label: "From right" },
  { id: "up", label: "From top" },
  { id: "down", label: "From bottom" },
];

const PREVIEW_ANIM_IDS = new Set<PreviewAnimId>(
  PREVIEW_ANIM_OPTIONS.map((o) => o.id),
);

const PREVIEW_SLIDE_IDS = new Set<PreviewSlideDir>(
  PREVIEW_SLIDE_DIR_OPTIONS.map((o) => o.id),
);

const DEFAULT_PREVIEW_MOTION_GROUP: PreviewMotionGroup = {
  anim: "none",
  durationMs: 700,
  delayMs: 0,
  slideDir: "left",
  loopPreview: false,
};

type SignatureFields = {
  name: string;
  title: string;
  company: string;
  product: string;
  companyLegal: string;
  phone: string;
  websiteDisplay: string;
  websiteHref: string;
  productCtaLabel: string;
  productHref: string;
  iosUrl: string;
  androidUrl: string;
  footerLine: string;
  animatedHeroUrl: string;
  stratoLogoUrl: string;
  serviceLogos: PersistedServiceLogo[];
  nameColorHex: string;
  subtitleColorHex: string;
  legalColorHex: string;
  footerColorHex: string;
  linkColorHex: string;
  bannerBgHex: string;
  heroSizePx: number;
  companyLogoHeightPx: number;
  columnGapPx: number;
  bannerPaddingPx: number;
  heroImageShape: ImageShapeId;
  heroImageFit: ImageFitId;
  heroImagePosX: number;
  heroImagePosY: number;
  companyLogoShape: ImageShapeId;
  companyLogoFit: ImageFitId;
  companyLogoPosX: number;
  companyLogoPosY: number;
  heroBorderStyle: ImageBorderStyleId;
  heroBorderWidthPx: number;
  heroBorderColorHex: string;
  companyLogoBorderStyle: ImageBorderStyleId;
  companyLogoBorderWidthPx: number;
  companyLogoBorderColorHex: string;
  previewMotion: SignaturePreviewMotionBundle;
};

function buildSignatureHtml(
  params: SignatureFields,
  options?: { useHeroPlaceholder?: boolean; wrapPreviewMotion?: boolean },
): string {
  const safeNameColor = sanitizeHex6(params.nameColorHex, "#111111");
  const safeSubtitleColor = sanitizeHex6(params.subtitleColorHex, "#444444");
  const safeLegalColor = sanitizeHex6(params.legalColorHex, "#666666");
  const safeFooterColor = sanitizeHex6(params.footerColorHex, "#777777");
  const safeLink = sanitizeHex6(params.linkColorHex, "#4b3cff");
  const safeBanner = optionalHex6(params.bannerBgHex);
  const heroPx = clampInt(params.heroSizePx, 48, 160, 88);
  const coH = clampInt(params.companyLogoHeightPx, 24, 160, 80);
  const gapPx = clampInt(params.columnGapPx, 4, 40, 14);
  const padPx = clampInt(params.bannerPaddingPx, 0, 36, 12);

  const w = sanitizeHref(params.websiteHref);
  const p = sanitizeHref(params.productHref);
  const iosRaw = params.iosUrl.trim();
  const androidRaw = params.androidUrl.trim();
  const ios = iosRaw ? sanitizeHref(iosRaw) : "";
  const android = androidRaw ? sanitizeHref(androidRaw) : "";

  const hero = params.animatedHeroUrl.trim();
  const stratoLogo = params.stratoLogoUrl.trim();

  const linkStyle = `color:${escapeHtml(safeLink)};text-decoration:none;`;

  const heroShape = coerceImageShape(params.heroImageShape, "circle");
  const heroFit = params.heroImageFit === "contain" ? "contain" : "cover";
  const heroPosX = clampInt(params.heroImagePosX, 0, 100, 50);
  const heroPosY = clampInt(params.heroImagePosY, 0, 100, 50);

  const coShape = coerceImageShape(params.companyLogoShape, "square_sharp");
  const coFit = params.companyLogoFit === "contain" ? "contain" : "cover";
  const coPX = clampInt(params.companyLogoPosX, 0, 100, 50);
  const coPY = clampInt(params.companyLogoPosY, 0, 100, 50);

  const heroBdS = coerceImageBorderStyle(params.heroBorderStyle);
  const heroBdW = clampInt(params.heroBorderWidthPx, 0, 12, 2);
  const heroBdC = params.heroBorderColorHex;

  const coBdS = coerceImageBorderStyle(params.companyLogoBorderStyle);
  const coBdW = clampInt(params.companyLogoBorderWidthPx, 0, 12, 2);
  const coBdC = params.companyLogoBorderColorHex;

  const heroCell = hero
    ? framedImageMarkup({
        src: hero,
        boxPx: heroPx,
        alt: params.name || "Signature",
        shape: heroShape,
        fit: heroFit,
        posX: heroPosX,
        posY: heroPosY,
        borderStyle: heroBdS,
        borderWidthPx: heroBdW,
        borderColorHex: heroBdC,
      })
    : options?.useHeroPlaceholder
      ? framedPlaceholderMarkup(heroPx, heroShape, {
          borderStyle: heroBdS,
          borderWidthPx: heroBdW,
          borderColorHex: heroBdC,
        })
      : framedImageMarkup({
          src: "",
          boxPx: heroPx,
          alt: params.name || "Signature",
          shape: heroShape,
          fit: heroFit,
          posX: heroPosX,
          posY: heroPosY,
          borderStyle: heroBdS,
          borderWidthPx: heroBdW,
          borderColorHex: heroBdC,
        });

  const companyLogoBlock =
    stratoLogo
      ? `<div style="margin-top:10px;line-height:0;">${framedImageMarkup({
          src: stratoLogo,
          boxPx: coH,
          alt: "",
          shape: coShape,
          fit: coFit,
          posX: coPX,
          posY: coPY,
          borderStyle: coBdS,
          borderWidthPx: coBdW,
          borderColorHex: coBdC,
        })}</div>`
      : "";

  const extraServiceFragments: string[] = [];
  for (const svc of params.serviceLogos) {
    const svcUrl = String(svc.url ?? "").trim();
    if (!svcUrl) continue;
    const box = clampInt(svc.heightPx, 12, 96, 44);
    const sh = coerceImageShape(svc.shape, "square_sharp");
    const sfit = svc.fit === "contain" ? "contain" : "cover";
    const sPx = clampInt(svc.posX, 0, 100, 50);
    const sPy = clampInt(svc.posY, 0, 100, 50);
    const sBdS = coerceImageBorderStyle(svc.borderStyle);
    const sBdW = clampInt(svc.borderWidthPx, 0, 12, 2);
    const sBdC = svc.borderColorHex;
    extraServiceFragments.push(
      `<span style="display:inline-block;margin-right:8px;margin-bottom:6px;vertical-align:middle;">${framedImageMarkup({
        src: svcUrl,
        boxPx: box,
        alt: "",
        shape: sh,
        fit: sfit,
        posX: sPx,
        posY: sPy,
        borderStyle: sBdS,
        borderWidthPx: sBdW,
        borderColorHex: sBdC,
      })}</span>`,
    );
  }
  const extraServicesRow =
    extraServiceFragments.length > 0
      ? `<div style="margin-top:10px;line-height:0;">${extraServiceFragments.join("")}</div>`
      : "";

  const appLinksRow =
    ios && android
      ? `<div style="margin-top:8px;">
        <a href="${escapeHtml(ios)}" style="font-size:12px;${linkStyle}">Download on iOS</a>
        <span style="color:#999999;"> | </span>
        <a href="${escapeHtml(android)}" style="font-size:12px;${linkStyle}">Download on Android</a>
      </div>`
      : ios
        ? `<div style="margin-top:8px;">
        <a href="${escapeHtml(ios)}" style="font-size:12px;${linkStyle}">Download on iOS</a>
      </div>`
        : android
          ? `<div style="margin-top:8px;">
        <a href="${escapeHtml(android)}" style="font-size:12px;${linkStyle}">Download on Android</a>
      </div>`
          : "";

  const footerHtml = formatFooterDisclaimerHtml(params.footerLine, linkStyle);

  const footerBlock =
    footerHtml
      ? `<div style="font-size:11px;color:${escapeHtml(safeFooterColor)};margin-top:8px;line-height:1.35;">
        ${footerHtml}
      </div>`
      : "";

  const textLeadingBlock = `<div style="font-size:16px;font-weight:700;color:${escapeHtml(safeNameColor)};">${escapeHtml(params.name)}</div>
      <div style="font-size:13px;color:${escapeHtml(safeSubtitleColor)};">${escapeHtml(params.title)}</div>
      <div style="font-size:13px;color:${escapeHtml(safeSubtitleColor)};">${escapeHtml(params.company)} | ${escapeHtml(params.product)}</div>
      ${
        params.companyLegal.trim()
          ? `<div style="font-size:11px;color:${escapeHtml(safeLegalColor)};margin-top:4px;">${escapeHtml(params.companyLegal.trim())}</div>`
          : ""
      }

      <div style="height:8px;line-height:8px;font-size:0;">&nbsp;</div>

      <a href="${escapeHtml(w)}" style="font-size:13px;${linkStyle}font-weight:600;">${escapeHtml(params.websiteDisplay)}</a>
      <div style="height:6px;line-height:6px;font-size:0;">&nbsp;</div>
      <a href="${escapeHtml(p)}" style="font-size:13px;${linkStyle}">${escapeHtml(params.productCtaLabel)}</a>

      <div style="font-size:13px;color:${escapeHtml(safeSubtitleColor)};margin-top:6px;">${escapeHtml(params.phone)}</div>

      ${appLinksRow}`;

  const motionOn = !!options?.wrapPreviewMotion;
  const pm = params.previewMotion;

  const leftColumnHtml = motionOn
    ? `${wrapPreviewMotionBlock(true, heroCell, pm.profile)}${wrapPreviewMotionBlock(
        true,
        companyLogoBlock,
        pm.logos,
      )}`
    : `${heroCell}${companyLogoBlock}`;

  const rightInnerPlain = `${textLeadingBlock}${extraServicesRow}${footerBlock}`;

  const rightColumnHtml = motionOn
    ? `${wrapPreviewMotionBlock(true, textLeadingBlock, pm.text)}${wrapPreviewMotionBlock(
        true,
        extraServicesRow,
        pm.logos,
      )}${wrapPreviewMotionBlock(true, footerBlock, pm.text)}`
    : rightInnerPlain;

  const innerTable = `<table cellpadding="0" cellspacing="0" role="presentation" style="font-family:Arial,sans-serif;color:${escapeHtml(safeNameColor)};">
  <tr>
    <td style="padding-right:${gapPx}px;vertical-align:top;">
      ${leftColumnHtml}
    </td>
    <td style="vertical-align:top;">
      ${rightColumnHtml}
    </td>
  </tr>
</table>`;

  if (!safeBanner) {
    return innerTable;
  }

  return `<table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td bgcolor="${escapeHtml(safeBanner)}" style="background-color:${escapeHtml(safeBanner)};padding:${padPx}px;border-radius:8px;">${innerTable}</td></tr></table>`;
}

const SIGNATURE_DRAFT_SCHEMA_VERSION = 1;

function signatureDraftStorageKey(uid: string): string {
  return `stratoCraft.signatureDraft.v${SIGNATURE_DRAFT_SCHEMA_VERSION}:${uid}`;
}

function coerceDraftString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function coerceDraftInt(
  value: unknown,
  min: number,
  max: number,
  fallback: number,
): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return clampInt(value, min, max, fallback);
  }
  return fallback;
}

function coercePreviewMotionGroup(raw: unknown): PreviewMotionGroup {
  if (!raw || typeof raw !== "object") return { ...DEFAULT_PREVIEW_MOTION_GROUP };
  const r = raw as Record<string, unknown>;
  const animRaw =
    typeof r.anim === "string" && PREVIEW_ANIM_IDS.has(r.anim as PreviewAnimId)
      ? (r.anim as PreviewAnimId)
      : "none";
  const slideRaw =
    typeof r.slideDir === "string" &&
    PREVIEW_SLIDE_IDS.has(r.slideDir as PreviewSlideDir)
      ? (r.slideDir as PreviewSlideDir)
      : "left";
  return {
    anim: animRaw,
    durationMs: coerceDraftInt(r.durationMs, 80, 4000, 700),
    delayMs: coerceDraftInt(r.delayMs, 0, 8000, 0),
    slideDir: slideRaw,
    loopPreview: r.loopPreview === true,
  };
}

function coercePreviewMotionBundle(
  raw: unknown,
): SignaturePreviewMotionBundle {
  if (!raw || typeof raw !== "object") {
    return {
      profile: { ...DEFAULT_PREVIEW_MOTION_GROUP },
      logos: { ...DEFAULT_PREVIEW_MOTION_GROUP },
      text: { ...DEFAULT_PREVIEW_MOTION_GROUP },
    };
  }
  const r = raw as Record<string, unknown>;
  return {
    profile: coercePreviewMotionGroup(r.profile),
    logos: coercePreviewMotionGroup(r.logos),
    text: coercePreviewMotionGroup(r.text),
  };
}

function previewMotKeyframeSlug(g: PreviewMotionGroup): string {
  switch (g.anim) {
    case "slide_in":
      return `slide_in_${g.slideDir}`;
    case "slide_out":
      return `slide_out_${g.slideDir}`;
    default:
      return g.anim;
  }
}

function previewMotionWrapAttrs(group: PreviewMotionGroup): string {
  if (group.anim === "none") {
    return 'class="sig-mot sig-mot--idle"';
  }
  const durMs = clampInt(group.durationMs, 80, 4000, 700);
  const delMs = clampInt(group.delayMs, 0, 8000, 0);
  const slug = previewMotKeyframeSlug(group);
  const loop = group.loopPreview ? "true" : "false";
  return [
    `class="sig-mot sig-mot--run"`,
    `data-mot="${escapeHtml(slug)}"`,
    `data-loop="${loop}"`,
    `style="${escapeHtml(
      `--sig-mot-dur:${durMs}ms;--sig-mot-del:${delMs}ms;`,
    )}"`,
  ].join(" ");
}

function wrapPreviewMotionBlock(
  enabled: boolean,
  inner: string,
  group: PreviewMotionGroup,
): string {
  if (!enabled || !inner.trim()) return inner;
  if (group.anim === "none") return inner;
  return `<div ${previewMotionWrapAttrs(group)}>${inner}</div>`;
}

type SignatureHexRowProps = {
  label: string;
  fallbackHex: string;
  hex: string;
  setHex: (next: string) => void;
  disabled?: boolean;
};

function SignatureHexRow({
  label,
  fallbackHex,
  hex,
  setHex,
  disabled,
}: SignatureHexRowProps) {
  const pickerValue =
    /^#[0-9A-Fa-f]{6}$/.test(hex.trim()) ? hex.trim() : fallbackHex;

  return (
    <label className="signature-field">
      <span>{label}</span>
      <div className="signature-color-row">
        <input
          type="color"
          aria-label={`Pick colour: ${label}`}
          value={pickerValue}
          disabled={disabled}
          onChange={(e) => setHex(e.target.value)}
        />
        <input
          type="text"
          spellCheck={false}
          value={hex}
          placeholder={fallbackHex}
          disabled={disabled}
          onChange={(e) => setHex(e.target.value)}
          onBlur={() => setHex(sanitizeHex6(hex, fallbackHex))}
        />
      </div>
    </label>
  );
}

const FOCAL_PRESETS_LIST: readonly {
  readonly id: string;
  readonly label: string;
  readonly x: number;
  readonly y: number;
}[] = [
  { id: "c", label: "Center", x: 50, y: 50 },
  { id: "top", label: "Top", x: 50, y: 16 },
  { id: "bottom", label: "Bottom", x: 50, y: 84 },
  { id: "left", label: "Left", x: 16, y: 50 },
  { id: "right", label: "Right", x: 84, y: 50 },
  { id: "tl", label: "Top left", x: 26, y: 26 },
  { id: "tr", label: "Top right", x: 74, y: 26 },
  { id: "bl", label: "Bottom left", x: 26, y: 74 },
  { id: "br", label: "Bottom right", x: 74, y: 74 },
];

type ImageFrameControlsProps = {
  title: string;
  shape: ImageShapeId;
  onShape: (shape: ImageShapeId) => void;
  fit: ImageFitId;
  onFit: (fit: ImageFitId) => void;
  posX: number;
  posY: number;
  onPosX: (n: number) => void;
  onPosY: (n: number) => void;
  borderStyle: ImageBorderStyleId;
  onBorderStyle: (style: ImageBorderStyleId) => void;
  borderWidthPx: number;
  onBorderWidthPx: (n: number) => void;
  borderColorHex: string;
  onBorderColorHex: (hex: string) => void;
};

function ImageFrameControls({
  title,
  shape,
  onShape,
  fit,
  onFit,
  posX,
  posY,
  onPosX,
  onPosY,
  borderStyle,
  onBorderStyle,
  borderWidthPx,
  onBorderWidthPx,
  borderColorHex,
  onBorderColorHex,
}: ImageFrameControlsProps) {
  const presetId =
    FOCAL_PRESETS_LIST.find((p) => p.x === posX && p.y === posY)?.id ??
    "__custom__";

  return (
    <div className="signature-image-frame-controls">
      <p className="signature-image-frame-title">{title}</p>
      <label className="signature-field">
        <span>Mask shape</span>
        <select
          value={shape}
          onChange={(e) => onShape(e.target.value as ImageShapeId)}
        >
          {IMAGE_SHAPE_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <label className="signature-field">
        <span>Scaling inside frame</span>
        <select
          value={fit}
          onChange={(e) => onFit(e.target.value as ImageFitId)}
        >
          <option value="cover">Cover — fill frame (may crop edges)</option>
          <option value="contain">
            Contain — show entire image (may letterbox inside frame)
          </option>
        </select>
      </label>
      <label className="signature-field">
        <span>Border</span>
        <select
          value={borderStyle}
          onChange={(e) =>
            onBorderStyle(e.target.value as ImageBorderStyleId)
          }
        >
          {IMAGE_BORDER_STYLE_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <div className="signature-field-grid-2">
        <label className="signature-field">
          <span>
            Border width (px, 1–12; ignored when no border){' '}
          </span>
          <input
            type="number"
            min={1}
            max={12}
            disabled={borderStyle === "none"}
            value={borderWidthPx}
            onChange={(e) => {
              const v = Number.parseInt(e.target.value, 10);
              onBorderWidthPx(Number.isFinite(v) ? v : 2);
            }}
            onBlur={() =>
              onBorderWidthPx(
                clampInt(borderWidthPx, 1, 12, 2),
              )
            }
          />
        </label>
        <SignatureHexRow
          label="Border colour"
          fallbackHex="#475569"
          hex={borderColorHex}
          setHex={onBorderColorHex}
          disabled={borderStyle === "none"}
        />
      </div>
      <label className="signature-field">
        <span>Focal preset</span>
        <select
          value={presetId}
          onChange={(e) => {
            const id = e.target.value;
            if (id === "__custom__") return;
            const p = FOCAL_PRESETS_LIST.find((row) => row.id === id);
            if (p) {
              onPosX(p.x);
              onPosY(p.y);
            }
          }}
        >
          {FOCAL_PRESETS_LIST.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
          <option value="__custom__">Custom (use percentages below)</option>
        </select>
      </label>
      <div className="signature-field-grid-2">
        <label className="signature-field">
          <span>Horizontal focus % (0=left, 100=right)</span>
          <input
            type="number"
            min={0}
            max={100}
            value={posX}
            onChange={(e) => {
              const v = Number.parseInt(e.target.value, 10);
              onPosX(Number.isFinite(v) ? v : 50);
            }}
            onBlur={() => onPosX(clampInt(posX, 0, 100, 50))}
          />
        </label>
        <label className="signature-field">
          <span>Vertical focus % (0=top, 100=bottom)</span>
          <input
            type="number"
            min={0}
            max={100}
            value={posY}
            onChange={(e) => {
              const v = Number.parseInt(e.target.value, 10);
              onPosY(Number.isFinite(v) ? v : 50);
            }}
            onBlur={() => onPosY(clampInt(posY, 0, 100, 50))}
          />
        </label>
      </div>
    </div>
  );
}

function mapAuthError(code: string): string {
  switch (code) {
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/user-disabled":
      return "This account is disabled.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    default:
      return "Sign-in failed. Try again.";
  }
}

function PreviewMotionGroupControls({
  title,
  hint,
  group,
  onPatch,
}: {
  title: string;
  hint?: string;
  group: PreviewMotionGroup;
  onPatch: (patch: Partial<PreviewMotionGroup>) => void;
}) {
  const slideRelevant =
    group.anim === "slide_in" || group.anim === "slide_out";
  return (
    <div className="signature-preview-motion-group">
      <p className="signature-preview-motion-group-title">{title}</p>
      {hint ? (
        <p className="signature-note signature-note--tight-top">{hint}</p>
      ) : null}
      <label className="signature-field">
        <span>Animation type</span>
        <select
          value={group.anim}
          onChange={(e) =>
            onPatch({ anim: e.target.value as PreviewAnimId })
          }
        >
          {PREVIEW_ANIM_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <div className="signature-field-grid-2">
        <label className="signature-field">
          <span>Duration (ms)</span>
          <input
            type="number"
            min={80}
            max={4000}
            step={20}
            value={group.durationMs}
            onChange={(e) => {
              const v = Number.parseInt(e.target.value, 10);
              onPatch({ durationMs: Number.isFinite(v) ? v : group.durationMs });
            }}
            onBlur={() =>
              onPatch({
                durationMs: clampInt(group.durationMs, 80, 4000, 700),
              })
            }
          />
        </label>
        <label className="signature-field">
          <span>Delay (ms)</span>
          <input
            type="number"
            min={0}
            max={8000}
            step={50}
            value={group.delayMs}
            onChange={(e) => {
              const v = Number.parseInt(e.target.value, 10);
              onPatch({ delayMs: Number.isFinite(v) ? v : group.delayMs });
            }}
            onBlur={() =>
              onPatch({
                delayMs: clampInt(group.delayMs, 0, 8000, 0),
              })
            }
          />
        </label>
      </div>
      <label className="signature-field">
        <span>Slide direction (slide in / slide out)</span>
        <select
          value={group.slideDir}
          disabled={!slideRelevant}
          onChange={(e) =>
            onPatch({ slideDir: e.target.value as PreviewSlideDir })
          }
        >
          {PREVIEW_SLIDE_DIR_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <label className="signature-field signature-field-checkbox">
        <input
          type="checkbox"
          checked={group.loopPreview}
          onChange={(e) => onPatch({ loopPreview: e.target.checked })}
        />
        <span>Loop ping-pong in this preview pane</span>
      </label>
    </div>
  );
}

const SignatureGenerator: React.FC = () => {
  const [sessionUser, setSessionUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authErr, setAuthErr] = useState<string | null>(null);
  const [loginBusy, setLoginBusy] = useState(false);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [companyLegal, setCompanyLegal] = useState("");
  const [phone, setPhone] = useState("");
  const [websiteDisplay, setWebsiteDisplay] = useState("");
  const [websiteHref, setWebsiteHref] = useState("https://");
  const [productCtaLabel, setProductCtaLabel] = useState("");
  const [productHref, setProductHref] = useState("https://");
  const [iosUrl, setIosUrl] = useState("");
  const [androidUrl, setAndroidUrl] = useState("");
  const [footerLine, setFooterLine] = useState("");
  const [animatedHeroUrl, setAnimatedHeroUrl] = useState("");
  const [stratoLogoUrl, setStratoLogoUrl] = useState("");
  const [serviceLogos, setServiceLogos] = useState<ServiceLogoRow[]>([]);

  const [nameColorHex, setNameColorHex] = useState("#111111");
  const [subtitleColorHex, setSubtitleColorHex] = useState("#444444");
  const [legalColorHex, setLegalColorHex] = useState("#666666");
  const [footerColorHex, setFooterColorHex] = useState("#777777");
  const [linkColorHex, setLinkColorHex] = useState("#4b3cff");
  const [bannerBgHex, setBannerBgHex] = useState("");
  const [heroSizePx, setHeroSizePx] = useState(88);
  const [companyLogoHeightPx, setCompanyLogoHeightPx] = useState(80);
  const [columnGapPx, setColumnGapPx] = useState(14);
  const [bannerPaddingPx, setBannerPaddingPx] = useState(12);

  const [heroImageShape, setHeroImageShape] = useState<ImageShapeId>("circle");
  const [heroImageFit, setHeroImageFit] = useState<ImageFitId>("cover");
  const [heroImagePosX, setHeroImagePosX] = useState(50);
  const [heroImagePosY, setHeroImagePosY] = useState(50);
  const [companyLogoShape, setCompanyLogoShape] =
    useState<ImageShapeId>("square_sharp");
  const [companyLogoFit, setCompanyLogoFit] =
    useState<ImageFitId>("cover");
  const [companyLogoPosX, setCompanyLogoPosX] = useState(50);
  const [companyLogoPosY, setCompanyLogoPosY] = useState(50);

  const [heroBorderStyle, setHeroBorderStyle] =
    useState<ImageBorderStyleId>("none");
  const [heroBorderWidthPx, setHeroBorderWidthPx] = useState(2);
  const [heroBorderColorHex, setHeroBorderColorHex] =
    useState("#475569");
  const [companyLogoBorderStyle, setCompanyLogoBorderStyle] =
    useState<ImageBorderStyleId>("none");
  const [companyLogoBorderWidthPx, setCompanyLogoBorderWidthPx] =
    useState(2);
  const [companyLogoBorderColorHex, setCompanyLogoBorderColorHex] =
    useState("#475569");
  const [previewMotion, setPreviewMotion] =
    useState<SignaturePreviewMotionBundle>(() => ({
      profile: { ...DEFAULT_PREVIEW_MOTION_GROUP },
      logos: { ...DEFAULT_PREVIEW_MOTION_GROUP },
      text: { ...DEFAULT_PREVIEW_MOTION_GROUP },
    }));
  const [previewMotionReplayKey, setPreviewMotionReplayKey] = useState(0);

  const [gifExportBusy, setGifExportBusy] = useState<string | null>(null);
  const [gifExportDurationMs, setGifExportDurationMs] = useState(2400);
  const [gifExportFps, setGifExportFps] = useState(10);
  const previewGifTargetRef = useRef<HTMLDivElement | null>(null);

  const patchPreviewMotion = useCallback(
    (
      which: keyof SignaturePreviewMotionBundle,
      patch: Partial<PreviewMotionGroup>,
    ) => {
      setPreviewMotion((m) => ({
        ...m,
        [which]: { ...m[which], ...patch },
      }));
    },
    [],
  );

  const patchServiceLogoRow = useCallback(
    (index: number, patch: Partial<Omit<PersistedServiceLogo, "id">>) => {
      setServiceLogos((rows) =>
        rows.map((r, i) => (i === index ? { ...r, ...patch } : r)),
      );
    },
    [],
  );

  const addServiceLogoRow = useCallback(() => {
    setServiceLogos((rows) =>
      rows.length >= SERVICE_LOGO_LIMIT
        ? rows
        : [...rows, newEmptyServiceLogoRow()],
    );
  }, []);

  const removeServiceLogoRow = useCallback((index: number) => {
    setServiceLogos((rows) => rows.filter((_, i) => i !== index));
  }, []);

  const [busy, setBusy] = useState<string | null>(null);
  const [copyHint, setCopyHint] = useState<string>("");
  /** Avoid writing empty defaults before we read localStorage for this UID. */
  const [signatureDraftHydrated, setSignatureDraftHydrated] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      setSessionUser(user);
      setAuthReady(true);
      setAuthErr(null);
    });
    return unsub;
  }, []);

  const allowedIn = sessionUser != null && isEmailAllowlisted(sessionUser.email);

  /** Load persisted draft from this browser once per UID (after allowlisted login). */
  useEffect(() => {
    setSignatureDraftHydrated(false);

    if (typeof window === "undefined" || !allowedIn || !sessionUser?.uid) {
      setSignatureDraftHydrated(false);
      return undefined;
    }

    let cancelled = false;

    try {
      const raw = window.localStorage.getItem(
        signatureDraftStorageKey(sessionUser.uid),
      );
      if (!raw) {
        if (!cancelled) setSignatureDraftHydrated(true);
        return () => {
          cancelled = true;
        };
      }

      const parsed = JSON.parse(raw) as { v?: number } & Record<string, unknown>;
      if (parsed.v !== SIGNATURE_DRAFT_SCHEMA_VERSION) {
        if (!cancelled) setSignatureDraftHydrated(true);
        return () => {
          cancelled = true;
        };
      }

      setName(coerceDraftString(parsed.name));
      setTitle(coerceDraftString(parsed.title));
      setCompany(coerceDraftString(parsed.company));
      setProduct(coerceDraftString(parsed.product));
      setCompanyLegal(coerceDraftString(parsed.companyLegal));
      setPhone(coerceDraftString(parsed.phone));
      setWebsiteDisplay(coerceDraftString(parsed.websiteDisplay));
      setWebsiteHref(coerceDraftString(parsed.websiteHref, "https://"));
      setProductCtaLabel(coerceDraftString(parsed.productCtaLabel));
      setProductHref(coerceDraftString(parsed.productHref, "https://"));
      setIosUrl(coerceDraftString(parsed.iosUrl));
      setAndroidUrl(coerceDraftString(parsed.androidUrl));
      setFooterLine(coerceDraftString(parsed.footerLine));
      setAnimatedHeroUrl(coerceDraftString(parsed.animatedHeroUrl));
      setStratoLogoUrl(coerceDraftString(parsed.stratoLogoUrl));
      const rawSvc = parsed.serviceLogos;
      if (Array.isArray(rawSvc)) {
        setServiceLogos(
          rawSvc
            .slice(0, SERVICE_LOGO_LIMIT)
            .map((entry, idx) => normalizeServiceLogoRow(entry, idx)),
        );
      } else {
        const legacyRow = serviceRowFromLegacyProductFields(parsed);
        setServiceLogos(legacyRow ? [legacyRow] : []);
      }

      setNameColorHex(coerceDraftString(parsed.nameColorHex, "#111111"));
      setSubtitleColorHex(coerceDraftString(parsed.subtitleColorHex, "#444444"));
      setLegalColorHex(coerceDraftString(parsed.legalColorHex, "#666666"));
      setFooterColorHex(coerceDraftString(parsed.footerColorHex, "#777777"));
      setLinkColorHex(coerceDraftString(parsed.linkColorHex, "#4b3cff"));
      setBannerBgHex(coerceDraftString(parsed.bannerBgHex));
      setHeroSizePx(coerceDraftInt(parsed.heroSizePx, 48, 160, 88));
      setCompanyLogoHeightPx(
        coerceDraftInt(parsed.companyLogoHeightPx, 24, 160, 80),
      );
      setColumnGapPx(coerceDraftInt(parsed.columnGapPx, 4, 40, 14));
      setBannerPaddingPx(coerceDraftInt(parsed.bannerPaddingPx, 0, 36, 12));

      setHeroImageShape(coerceImageShape(parsed.heroImageShape, "circle"));
      setHeroImageFit(coerceImageFit(parsed.heroImageFit, "cover"));
      setHeroImagePosX(coerceDraftInt(parsed.heroImagePosX, 0, 100, 50));
      setHeroImagePosY(coerceDraftInt(parsed.heroImagePosY, 0, 100, 50));
      setCompanyLogoShape(
        coerceImageShape(parsed.companyLogoShape, "square_sharp"),
      );
      setCompanyLogoFit(coerceImageFit(parsed.companyLogoFit, "cover"));
      setCompanyLogoPosX(coerceDraftInt(parsed.companyLogoPosX, 0, 100, 50));
      setCompanyLogoPosY(coerceDraftInt(parsed.companyLogoPosY, 0, 100, 50));

      setHeroBorderStyle(coerceImageBorderStyle(parsed.heroBorderStyle));
      setHeroBorderWidthPx(
        coerceDraftInt(parsed.heroBorderWidthPx, 1, 12, 2),
      );
      setHeroBorderColorHex(
        coerceDraftString(parsed.heroBorderColorHex, "#475569"),
      );
      setCompanyLogoBorderStyle(
        coerceImageBorderStyle(parsed.companyLogoBorderStyle),
      );
      setCompanyLogoBorderWidthPx(
        coerceDraftInt(parsed.companyLogoBorderWidthPx, 1, 12, 2),
      );
      setCompanyLogoBorderColorHex(
        coerceDraftString(parsed.companyLogoBorderColorHex, "#475569"),
      );

      setPreviewMotion(coercePreviewMotionBundle(parsed.previewMotion));

      setCopyHint("");
    } catch {
      // stale or corrupt draft — ignore
    } finally {
      if (!cancelled) setSignatureDraftHydrated(true);
    }

    return () => {
      cancelled = true;
    };
  }, [allowedIn, sessionUser?.uid]);

  const signatureFields = useMemo<SignatureFields>(
    () => ({
      name,
      title,
      company,
      product,
      companyLegal,
      phone,
      websiteDisplay,
      websiteHref,
      productCtaLabel,
      productHref,
      iosUrl,
      androidUrl,
      footerLine,
      animatedHeroUrl,
      stratoLogoUrl,
      serviceLogos,
      nameColorHex,
      subtitleColorHex,
      legalColorHex,
      footerColorHex,
      linkColorHex,
      bannerBgHex,
      heroSizePx,
      companyLogoHeightPx,
      columnGapPx,
      bannerPaddingPx,
      heroImageShape,
      heroImageFit,
      heroImagePosX,
      heroImagePosY,
      companyLogoShape,
      companyLogoFit,
      companyLogoPosX,
      companyLogoPosY,
      heroBorderStyle,
      heroBorderWidthPx,
      heroBorderColorHex,
      companyLogoBorderStyle,
      companyLogoBorderWidthPx,
      companyLogoBorderColorHex,
      previewMotion,
    }),
    [
      animatedHeroUrl,
      androidUrl,
      bannerBgHex,
      bannerPaddingPx,
      columnGapPx,
      company,
      companyLegal,
      companyLogoBorderColorHex,
      companyLogoBorderStyle,
      companyLogoBorderWidthPx,
      companyLogoFit,
      companyLogoHeightPx,
      companyLogoPosX,
      companyLogoPosY,
      companyLogoShape,
      footerColorHex,
      footerLine,
      heroBorderColorHex,
      heroBorderStyle,
      heroBorderWidthPx,
      heroImageFit,
      heroImagePosX,
      heroImagePosY,
      heroImageShape,
      heroSizePx,
      iosUrl,
      legalColorHex,
      linkColorHex,
      name,
      nameColorHex,
      phone,
      product,
      productCtaLabel,
      productHref,
      previewMotion,
      serviceLogos,
      stratoLogoUrl,
      subtitleColorHex,
      title,
      websiteDisplay,
      websiteHref,
    ],
  );

  /** Persist whenever the form snapshot changes (after hydration). */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!signatureDraftHydrated || !allowedIn || !sessionUser?.uid) return;

    try {
      const payload = {
        v: SIGNATURE_DRAFT_SCHEMA_VERSION,
        ...signatureFields,
      };
      window.localStorage.setItem(
        signatureDraftStorageKey(sessionUser.uid),
        JSON.stringify(payload),
      );
    } catch {
      // quota / privacy mode — best-effort
    }
  }, [
    allowedIn,
    sessionUser?.uid,
    signatureDraftHydrated,
    signatureFields,
  ]);

  /** What gets copied — real &lt;img&gt; URLs only (broken headshot if empty). */
  const exportHtml = useMemo(
    () => buildSignatureHtml(signatureFields),
    [signatureFields],
  );

  /** Preview shows a grey circle until a headshot is set so logos/text still appear. */
  const previewHtml = useMemo(
    () =>
      buildSignatureHtml(signatureFields, {
        useHeroPlaceholder: true,
        wrapPreviewMotion: true,
      }),
    [signatureFields, previewMotionReplayKey],
  );

  const showLivePreview =
    !!animatedHeroUrl.trim() ||
    !!stratoLogoUrl.trim() ||
    serviceLogos.some((s) => s.url.trim()) ||
    !!name.trim() ||
    !!title.trim() ||
    !!company.trim() ||
    !!product.trim() ||
    !!phone.trim();

  const onLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setAuthErr(null);
      setLoginBusy(true);
      try {
        const cred = await signInWithEmailAndPassword(
          firebaseAuth,
          loginEmail.trim(),
          loginPassword,
        );
        if (!isEmailAllowlisted(cred.user.email)) {
          await signOut(firebaseAuth);
          setAuthErr("This email is not allowlisted for the signature tool.");
        }
      } catch (err: unknown) {
        const code =
          err && typeof err === "object" && "code" in err
            ? String((err as { code: string }).code)
            : "";
        setAuthErr(mapAuthError(code));
      } finally {
        setLoginBusy(false);
        setLoginPassword("");
      }
    },
    [loginEmail, loginPassword],
  );

  const onLogout = useCallback(async () => {
    setAuthErr(null);
    await signOut(firebaseAuth);
  }, []);

  const runImageUpload = useCallback(
    async (
      file: File | undefined,
      target:
        | { kind: "headshot" }
        | { kind: "companyLogo" }
        | { kind: "serviceLogo"; index: number },
      input: HTMLInputElement,
    ) => {
      if (!file) return;
      const storageLabel =
        target.kind === "headshot"
          ? "headshot"
          : target.kind === "companyLogo"
            ? "company-logo"
            : `service-logo-${target.index}`;
      const label =
        target.kind === "headshot"
          ? "Headshot"
          : target.kind === "companyLogo"
            ? "Company logo"
            : `Product / service logo ${target.index + 1}`;
      setBusy(`Uploading ${label}…`);
      setCopyHint("");
      try {
        const url = await uploadSignatureAsset(file, storageLabel);
        if (target.kind === "headshot") {
          setAnimatedHeroUrl(url);
        } else if (target.kind === "companyLogo") {
          setStratoLogoUrl(url);
        } else {
          const idx = target.index;
          setServiceLogos((rows) =>
            rows.map((r, i) => (i === idx ? { ...r, url } : r)),
          );
        }
        setCopyHint(`${label} uploaded — check the URL field below.`);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        setCopyHint(`${label}: ${msg}`);
      } finally {
        setBusy(null);
        input.value = "";
      }
    },
    [],
  );

  const onHeadshotFileChange: React.ChangeEventHandler<HTMLInputElement> =
    (e) => {
      void runImageUpload(
        e.currentTarget.files?.[0],
        { kind: "headshot" },
        e.currentTarget,
      );
    };

  const onCompanyLogoFileChange: React.ChangeEventHandler<HTMLInputElement> =
    (e) => {
      void runImageUpload(
        e.currentTarget.files?.[0],
        { kind: "companyLogo" },
        e.currentTarget,
      );
    };

  const copySignature = useCallback(async () => {
    if (!animatedHeroUrl.trim()) {
      setCopyHint(
        "Add a headshot URL or upload a photo/GIF before copying — pasted mail needs that image.",
      );
      return;
    }
    setCopyHint("");
    try {
      const blobHtml = new Blob([exportHtml], { type: "text/html" });
      const blobText = new Blob([exportHtml], { type: "text/plain" });
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blobHtml,
          "text/plain": blobText,
        }),
      ]);
      setCopyHint("Copied. In Gmail / Outlook paste into signature settings.");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = exportHtml;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopyHint("Copied as HTML text (fallback).");
    }
  }, [animatedHeroUrl, exportHtml]);

  const onDownloadPreviewGif = useCallback(async () => {
    const el = previewGifTargetRef.current;
    if (!showLivePreview || !el?.innerHTML.trim()) return;
    setGifExportBusy("Recording frames for GIF…");
    setCopyHint("");
    try {
      const { recordElementToGif, downloadUint8Gif } = await import(
        "./exportAnimatedPreviewGif"
      );
      const bytes = await recordElementToGif(el, {
        durationMs: gifExportDurationMs,
        fps: gifExportFps,
        maxCssWidthPx: 560,
        onProgress: (cur, total) => {
          setGifExportBusy(`Recording GIF… frame ${cur}/${total}`);
        },
      });
      downloadUint8Gif(bytes, "signature-preview.gif");
      setCopyHint(
        "GIF downloaded. Drop it into signatures as a normal image — it is a flat picture, so links are not clickable inside the GIF. Combine with the HTML copy if you need real links.",
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setCopyHint(
        `GIF export failed (${msg}). Images must allow cross-origin use (CORS) for the browser to rasterise them — try your Firebase download URLs or re-host on a CDN.`,
      );
    } finally {
      setGifExportBusy(null);
    }
  }, [gifExportDurationMs, gifExportFps, showLivePreview]);

  if (!authReady) {
    return (
      <div className="signature-page signature-page--narrow">
        <p className="signature-auth-loading">Checking sign-in…</p>
      </div>
    );
  }

  if (!allowedIn) {
    return (
      <div className="signature-page signature-page--narrow">
        <header className="signature-header">
          <h1>Strato-Craft · email signature generator</h1>
          <p className="signature-lede">
            This page is not linked from the public site. Sign in with an
            allowlisted Strato-Craft account to continue.
          </p>
        </header>
        <form className="signature-login" onSubmit={(e) => void onLogin(e)}>
          <label className="signature-field">
            <span>Email</span>
            <input
              type="email"
              autoComplete="username"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
              placeholder="you@strato-craft.com"
            />
          </label>
          <label className="signature-field">
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </label>
          {authErr && <p className="signature-auth-err">{authErr}</p>}
          <button
            type="submit"
            className="signature-copy-btn"
            disabled={loginBusy}
          >
            {loginBusy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="signature-page">
      <header className="signature-header signature-header--row">
        <div>
          <h1>Strato-Craft · email signature generator</h1>
          <p className="signature-lede">
            Signed in as <strong>{sessionUser?.email}</strong>.{' '}
            <button
              type="button"
              className="signature-link-btn"
              onClick={() => void onLogout()}
            >
              Sign out
            </button>
          </p>
          <p className="signature-lede signature-lede--small">
            Build a{' '}
            <strong>static HTML block</strong> for Gmail, Outlook, and Apple Mail
            — no scripts in outbound mail.
          </p>
          <p className="signature-lede signature-lede--small">
            Your fields are{' '}
            <strong>saved automatically in this browser</strong>
            {' '}for your signed-in account, so refreshes won’t wipe your work (not
            synced across devices).
          </p>
        </div>
      </header>

      <div className="signature-grid">
        <section className="signature-panel" aria-labelledby="sig-form-heading">
          <h2 id="sig-form-heading">Fields</h2>

          <label className="signature-field">
            <span>Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
          </label>
          <label className="signature-field">
            <span>Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job title"
            />
          </label>
          <label className="signature-field">
            <span>Company</span>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
            />
          </label>
          <label className="signature-field">
            <span>Primary offering (shown after company name)</span>
            <input
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Product or service family name"
            />
          </label>
          <label className="signature-field">
            <span>Company / legal line (optional)</span>
            <input
              value={companyLegal}
              onChange={(e) => setCompanyLegal(e.target.value)}
              placeholder='Ltd name, company no., etc.'
            />
          </label>
          <label className="signature-field">
            <span>Phone (E.164 recommended)</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+44 …"
            />
          </label>

          <label className="signature-field">
            <span>Main site — display text</span>
            <input
              value={websiteDisplay}
              onChange={(e) => setWebsiteDisplay(e.target.value)}
              placeholder="strato-craft.com"
            />
          </label>
          <label className="signature-field">
            <span>Main site — URL</span>
            <input
              value={websiteHref}
              onChange={(e) => setWebsiteHref(e.target.value)}
              placeholder="https://strato-craft.com/"
            />
          </label>

          <label className="signature-field">
            <span>Primary offering link — label</span>
            <input
              value={productCtaLabel}
              onChange={(e) => setProductCtaLabel(e.target.value)}
              placeholder="Try our app"
            />
          </label>
          <label className="signature-field">
            <span>Primary offering link — URL</span>
            <input
              value={productHref}
              onChange={(e) => setProductHref(e.target.value)}
              placeholder="https://"
            />
          </label>

          <label className="signature-field">
            <span>iOS App Store URL (optional)</span>
            <input
              value={iosUrl}
              onChange={(e) => setIosUrl(e.target.value)}
              placeholder="https://apps.apple.com/… or leave blank"
            />
          </label>
          <label className="signature-field">
            <span>Google Play URL (optional)</span>
            <input
              value={androidUrl}
              onChange={(e) => setAndroidUrl(e.target.value)}
              placeholder="https://play.google.com/… or leave blank"
            />
          </label>

          <label className="signature-field">
            <span>Disclaimer text (footer copy)</span>
            <textarea
              rows={5}
              value={footerLine}
              onChange={(e) => setFooterLine(e.target.value)}
              placeholder="Legal / compliance copy (plain text)."
            />
          </label>
          <p className="signature-note">
            Separate sentences or clauses with{' '}
            <strong>Enter</strong>{' '}so they wrap more cleanly on narrow mail panes —
            outbound HTML uses soft line breaks between those lines.
            Plain <code>https://</code>
            URLs in this box are turned into clickable links; copy stays editable for each customer.
          </p>

          <hr className="signature-hr" />

          <h3>Layout &amp; colours</h3>
          <p className="signature-note signature-note--layout">
            <strong>Typography</strong>{' '}— use the colour pickers below for name,
            supporting text, legal line, and disclaimer wording.{' '}
            <strong>Links</strong>{' '}pick up the Links colour (
            applies to CTAs plus any <code>https://…</code> auto-linked inside the footer).
            Sizes and hex values are sanitized; optional banner honours{' '}
            <code>bgcolor</code> in Outlook.
          </p>

          <SignatureHexRow
            label="Name colour"
            fallbackHex="#111111"
            hex={nameColorHex}
            setHex={setNameColorHex}
          />
          <SignatureHexRow
            label="Supporting text (title, company line, phone)"
            fallbackHex="#444444"
            hex={subtitleColorHex}
            setHex={setSubtitleColorHex}
          />
          <SignatureHexRow
            label="Company / legal line"
            fallbackHex="#666666"
            hex={legalColorHex}
            setHex={setLegalColorHex}
          />
          <SignatureHexRow
            label="Disclaimer text colour (non-URL wording)"
            fallbackHex="#777777"
            hex={footerColorHex}
            setHex={setFooterColorHex}
          />
          <SignatureHexRow
            label="Links (website & CTAs)"
            fallbackHex="#4b3cff"
            hex={linkColorHex}
            setHex={setLinkColorHex}
          />

          <label className="signature-field">
            <span>Banner background (optional)</span>
            <input
              type="text"
              value={bannerBgHex}
              placeholder="Blank = none, or #f8fafc"
              spellCheck={false}
              onChange={(e) => setBannerBgHex(e.target.value)}
              onBlur={() => {
                const t = bannerBgHex.trim();
                setBannerBgHex(
                  t && /^#[0-9A-Fa-f]{6}$/.test(t) ? t.toLowerCase() : "",
                );
              }}
            />
          </label>

          <label className="signature-field">
            <span>Headshot column — size (px, 48–160)</span>
            <input
              type="number"
              min={48}
              max={160}
              value={heroSizePx}
              onChange={(e) => {
                const v = Number.parseInt(e.target.value, 10);
                setHeroSizePx(Number.isFinite(v) ? v : 88);
              }}
              onBlur={() =>
                setHeroSizePx(clampInt(heroSizePx, 48, 160, 88))
              }
            />
          </label>

          <label className="signature-field">
            <span>Company logo — height (px, 24–160, under headshot)</span>
            <input
              type="number"
              min={24}
              max={160}
              value={companyLogoHeightPx}
              onChange={(e) => {
                const v = Number.parseInt(e.target.value, 10);
                setCompanyLogoHeightPx(Number.isFinite(v) ? v : 80);
              }}
              onBlur={() =>
                setCompanyLogoHeightPx(
                  clampInt(companyLogoHeightPx, 24, 160, 80),
                )
              }
            />
          </label>

          <label className="signature-field">
            <span>Gap between photo and text (px, 4–40)</span>
            <input
              type="number"
              min={4}
              max={40}
              value={columnGapPx}
              onChange={(e) => {
                const v = Number.parseInt(e.target.value, 10);
                setColumnGapPx(Number.isFinite(v) ? v : 14);
              }}
              onBlur={() =>
                setColumnGapPx(clampInt(columnGapPx, 4, 40, 14))
              }
            />
          </label>

          <label className="signature-field">
            <span>Banner padding (px, 0–36; ignored if no banner colour)</span>
            <input
              type="number"
              min={0}
              max={36}
              value={bannerPaddingPx}
              onChange={(e) => {
                const v = Number.parseInt(e.target.value, 10);
                setBannerPaddingPx(Number.isFinite(v) ? v : 12);
              }}
              onBlur={() =>
                setBannerPaddingPx(clampInt(bannerPaddingPx, 0, 36, 12))
              }
            />
          </label>

          <hr className="signature-hr" />

          <h3>Animated headshot</h3>
          <details className="signature-gif-plan">
            <summary>GIF rule: 1st frame → motion → back to 1st (Outlook-safe)</summary>
            <ol>
              <li>
                <strong>First frame is the guarantee.</strong> Older Outlook often shows{' '}
                <em>only</em> frame&nbsp;1 — design it so your desired final look reads
                there (crop, brightness, branding if baked in).
              </li>
              <li>
                <strong>Animation adds polish</strong> in clients that play GIFs
                (Gmail, Apple Mail, many mobiles). Treat motion as optional enhancement.
              </li>
              <li>
                <strong>Loop back to frame&nbsp;1.</strong> End on the same (or visually
                matching) pose as frame&nbsp;1 so the loop never “snaps”, and recipients
                who only see stills always align with what you intend.
              </li>
            </ol>
          </details>
          <label className="signature-field">
            <span>Upload (GIF / PNG / JPG, max 400KB)</span>
            <input
              type="file"
              accept="image/*"
              disabled={!!busy}
              onChange={onHeadshotFileChange}
            />
          </label>
          <label className="signature-field">
            <span>Or paste image URL</span>
            <input
              value={animatedHeroUrl}
              onChange={(e) => setAnimatedHeroUrl(e.target.value)}
              placeholder="https://…"
            />
          </label>

          <ImageFrameControls
            title="Profile image — mask & focal point"
            shape={heroImageShape}
            onShape={setHeroImageShape}
            fit={heroImageFit}
            onFit={setHeroImageFit}
            posX={heroImagePosX}
            posY={heroImagePosY}
            onPosX={setHeroImagePosX}
            onPosY={setHeroImagePosY}
            borderStyle={heroBorderStyle}
            onBorderStyle={setHeroBorderStyle}
            borderWidthPx={heroBorderWidthPx}
            onBorderWidthPx={setHeroBorderWidthPx}
            borderColorHex={heroBorderColorHex}
            onBorderColorHex={setHeroBorderColorHex}
          />
          <p className="signature-note">
            Custom masks use <code>clip-path</code> and sizing uses{' '}
            <code>object-fit</code> /{' '}
            <code>object-position</code> — best in Gmail, Apple Mail, and most mobile clients.
            Some Outlook builds show a simpler crop; send a real test message before rollout.
          </p>

          <h3>Company logo — under headshot</h3>
          <p className="signature-note signature-note--tight-top">
            Sits directly below your profile image in the left column. Use Layout to set its pixel size (larger sizes read better for the main brand mark).
          </p>
          <label className="signature-field">
            <span>Company logo — upload</span>
            <input
              type="file"
              accept="image/*"
              disabled={!!busy}
              onChange={onCompanyLogoFileChange}
            />
          </label>
          <label className="signature-field">
            <span>Company logo — URL</span>
            <input
              value={stratoLogoUrl}
              onChange={(e) => setStratoLogoUrl(e.target.value)}
              placeholder="Filled after upload, or paste https://…"
            />
          </label>
          <ImageFrameControls
            title="Company logo — mask & focal point"
            shape={companyLogoShape}
            onShape={setCompanyLogoShape}
            fit={companyLogoFit}
            onFit={setCompanyLogoFit}
            posX={companyLogoPosX}
            posY={companyLogoPosY}
            onPosX={setCompanyLogoPosX}
            onPosY={setCompanyLogoPosY}
            borderStyle={companyLogoBorderStyle}
            onBorderStyle={setCompanyLogoBorderStyle}
            borderWidthPx={companyLogoBorderWidthPx}
            onBorderWidthPx={setCompanyLogoBorderWidthPx}
            borderColorHex={companyLogoBorderColorHex}
            onBorderColorHex={setCompanyLogoBorderColorHex}
          />

          <h3>Additional products &amp; services (optional)</h3>
          <p className="signature-note signature-note--tight-top">
            Extra logos appear in the right-hand text column — in a row after the
            app store links (same placement as before), not under the headshot.
            Leave empty or remove rows you do not need — add up to{' '}
            {SERVICE_LOGO_LIMIT} for apps, subsidiaries, partnerships, etc.
          </p>
          {serviceLogos.map((row, idx) => (
            <div key={row.id}>
              {idx > 0 ? <hr className="signature-hr" /> : null}
              <p className="signature-image-frame-title">
                Logo {idx + 1}
                {' · '}
                <button
                  type="button"
                  className="signature-link-btn"
                  disabled={!!busy}
                  onClick={() => removeServiceLogoRow(idx)}
                >
                  Remove
                </button>
              </p>
              <label className="signature-field">
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={!!busy}
                  onChange={(e) => {
                    void runImageUpload(
                      e.currentTarget.files?.[0],
                      { kind: "serviceLogo", index: idx },
                      e.currentTarget,
                    );
                  }}
                />
              </label>
              <label className="signature-field">
                <span>Image URL</span>
                <input
                  value={row.url}
                  onChange={(e) =>
                    patchServiceLogoRow(idx, { url: e.target.value })
                  }
                  placeholder="https://…"
                />
              </label>
              <label className="signature-field">
                <span>Logo box size (px, 12–96)</span>
                <input
                  type="number"
                  min={12}
                  max={96}
                  value={row.heightPx}
                  onChange={(e) => {
                    const v = Number.parseInt(e.target.value, 10);
                    patchServiceLogoRow(idx, {
                      heightPx: Number.isFinite(v) ? v : row.heightPx,
                    });
                  }}
                  onBlur={() =>
                    patchServiceLogoRow(idx, {
                      heightPx: clampInt(row.heightPx, 12, 96, 44),
                    })
                  }
                />
              </label>
              <ImageFrameControls
                title="Mask & focal point"
                shape={row.shape}
                onShape={(s) => patchServiceLogoRow(idx, { shape: s })}
                fit={row.fit}
                onFit={(f) => patchServiceLogoRow(idx, { fit: f })}
                posX={row.posX}
                posY={row.posY}
                onPosX={(n) => patchServiceLogoRow(idx, { posX: n })}
                onPosY={(n) => patchServiceLogoRow(idx, { posY: n })}
                borderStyle={row.borderStyle}
                onBorderStyle={(b) =>
                  patchServiceLogoRow(idx, { borderStyle: b })
                }
                borderWidthPx={row.borderWidthPx}
                onBorderWidthPx={(n) =>
                  patchServiceLogoRow(idx, { borderWidthPx: n })
                }
                borderColorHex={row.borderColorHex}
                onBorderColorHex={(hex) =>
                  patchServiceLogoRow(idx, { borderColorHex: hex })
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="signature-link-btn"
            style={{ marginTop: 10 }}
            disabled={
              !!busy || serviceLogos.length >= SERVICE_LOGO_LIMIT
            }
            onClick={() => addServiceLogoRow()}
          >
            Add product or service logo
          </button>
          {serviceLogos.length >= SERVICE_LOGO_LIMIT ? (
            <p className="signature-note signature-note--tight-top">
              Maximum {SERVICE_LOGO_LIMIT} additional logos reached.
            </p>
          ) : null}

          <p className="signature-note">
            <strong>Access:</strong> allowlisted email +{' '}
            <strong>Email/Password</strong> in Firebase Auth. Deploy{' '}
            <code>storage.rules</code> so only your account can write to{' '}
            <code>signatures/&lt;uid&gt;/…</code>. You can turn off{' '}
            <strong>Anonymous</strong> sign-in if you no longer need it.
          </p>

          {busy && <p className="signature-busy">{busy}</p>}
          {copyHint && <p className="signature-feedback">{copyHint}</p>}

          <button
            type="button"
            className="signature-copy-btn"
            onClick={() => void copySignature()}
          >
            Copy signature HTML
          </button>
        </section>

        <section className="signature-preview-panel" aria-labelledby="sig-prev-heading">
          <h2 id="sig-prev-heading">Live preview</h2>
          <details className="signature-preview-motion-details">
            <summary>Preview-only motion — profile, logos &amp; text blocks</summary>
            <p className="signature-note signature-note--tight-top">
              These CSS effects run inside this preview. Copied HTML stays static for
              Gmail / Outlook reliability. Below you can bake the{' '}
              <strong>moving preview into a looping GIF</strong> — that GIF plays in almost
              any mail client because it&apos;s just an image file (same idea as embedding
              an animated emoji or banner GIF).
              Blur / fracture / slice presets are raster approximations, not pixel-perfect
              VFX passes.
            </p>
            <div className="signature-preview-motion-grid">
              <PreviewMotionGroupControls
                title="Profile photo"
                hint="Left column — headshot or placeholder only."
                group={previewMotion.profile}
                onPatch={(p) => patchPreviewMotion("profile", p)}
              />
              <PreviewMotionGroupControls
                title="Logos (company + product / service marks)"
                hint="Same timing applies to the company mark under the photo and the extra logos after store links."
                group={previewMotion.logos}
                onPatch={(p) => patchPreviewMotion("logos", p)}
              />
              <PreviewMotionGroupControls
                title="Text (name, links, phone, stores, disclaimer)"
                hint="Upper copy and footer disclaimer use the same motion block."
                group={previewMotion.text}
                onPatch={(p) => patchPreviewMotion("text", p)}
              />
            </div>
            <button
              type="button"
              className="signature-link-btn"
              style={{ marginTop: 8 }}
              onClick={() => setPreviewMotionReplayKey((k) => k + 1)}
            >
              Replay preview animations
            </button>
            <hr className="signature-hr" style={{ margin: "16px 0" }} />
            <p className="signature-preview-motion-gif-heading">
              Export animated GIF (for live motion in mail)
            </p>
            <p className="signature-note signature-note--tight-top">
              Saves what you see moving in the preview as <code>.gif</code> (loops forever).
              Larger / longer captures take longer. Keep files small for inbox speed.
              The GIF is flat pixels — URLs in the HTML copy aren&apos;t inside the GIF.
            </p>
            <div className="signature-field-grid-2">
              <label className="signature-field">
                <span>Clip length (ms)</span>
                <select
                  value={gifExportDurationMs}
                  onChange={(e) =>
                    setGifExportDurationMs(Number.parseInt(e.target.value, 10))
                  }
                >
                  <option value={1600}>1.6 s</option>
                  <option value={2400}>2.4 s</option>
                  <option value={3200}>3.2 s</option>
                  <option value={4000}>4.0 s</option>
                  <option value={5600}>5.6 s</option>
                </select>
              </label>
              <label className="signature-field">
                <span>Frame rate (smoothness × file size)</span>
                <select
                  value={gifExportFps}
                  onChange={(e) =>
                    setGifExportFps(Number.parseInt(e.target.value, 10))
                  }
                >
                  <option value={6}>6 fps — smaller file</option>
                  <option value={8}>8 fps</option>
                  <option value={10}>10 fps</option>
                  <option value={12}>12 fps</option>
                  <option value={15}>15 fps — heavier</option>
                </select>
              </label>
            </div>
            <button
              type="button"
              className="signature-copy-btn"
              disabled={!showLivePreview || !!busy || !!gifExportBusy}
              style={{ marginTop: 10 }}
              onClick={() => void onDownloadPreviewGif()}
            >
              {gifExportBusy ? gifExportBusy : "Download preview as GIF"}
            </button>

          </details>
          <div
            className={
              previewMotion.profile.anim !== "none" ||
              previewMotion.logos.anim !== "none" ||
              previewMotion.text.anim !== "none"
                ? "signature-preview-wrap signature-preview-wrap--motion"
                : "signature-preview-wrap"
            }
          >
            {!showLivePreview ? (
              <p className="signature-preview-placeholder">
                Start by filling name, title, phone, etc., or paste image URLs —
                the preview appears as soon as there is something to render.
              </p>
            ) : (
              /* eslint-disable-next-line react/no-danger */
              <div
                ref={previewGifTargetRef}
                key={previewMotionReplayKey}
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            )}
          </div>
          <details className="signature-raw">
            <summary>Raw HTML (what Copy uses)</summary>
            <pre>{exportHtml}</pre>
          </details>
        </section>
      </div>
    </div>
  );
};

export default SignatureGenerator;
