import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import QRCodeStyling from "qr-code-styling";
import { oneuraDb } from "../../../firebase/oneuraFirestore";
import oneuraLogo from "../../../assets/images/oneura/logo-color.png";
import { PageShell } from "./AdminOffersList";

interface OfferDoc {
  slug: string;
  status: string;
  partnerName: string | null;
  displayName: string | null;
  iosProductId: string | null;
  androidProductId: string | null;
  branding: {
    logoUrl: string | null;
    primaryColorHex: string | null;
    headline: string;
    body: string;
    ctaLabel: string;
    finePrint: string | null;
    heroImageUrl: string | null;
  };
  validFrom: Date | null;
  validUntil: Date | null;
  redemptionCap: number | null;
  redemptionCount: number;
  visibilityMode: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

/** `/admin/offers/:slug` — detail view + branded QR + pause/activate + delete. */
const AdminOfferDetail: React.FC = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const nav = useNavigate();

  const [offer, setOffer] = useState<OfferDoc | null | "loading" | "error">(
    "loading",
  );
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const publicUrl = useMemo(
    () => `https://oneura.app/c/${encodeURIComponent(slug)}`,
    [slug],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(oneuraDb, "campaigns", slug));
        if (!snap.exists()) {
          if (!cancelled) setOffer(null);
          return;
        }
        const data = snap.data() as Record<string, unknown>;
        const b = (data.branding ?? {}) as Record<string, unknown>;
        if (!cancelled) {
          setOffer({
            slug: snap.id,
            status: typeof data.status === "string" ? data.status : "unknown",
            partnerName:
              typeof data.partnerName === "string" ? data.partnerName : null,
            displayName:
              typeof data.displayName === "string" ? data.displayName : null,
            iosProductId:
              typeof data.iosProductId === "string" ? data.iosProductId : null,
            androidProductId:
              typeof data.androidProductId === "string"
                ? data.androidProductId
                : null,
            branding: {
              logoUrl: typeof b.logoUrl === "string" ? b.logoUrl : null,
              primaryColorHex:
                typeof b.primaryColorHex === "string"
                  ? b.primaryColorHex
                  : null,
              headline: typeof b.headline === "string" ? b.headline : "",
              body: typeof b.body === "string" ? b.body : "",
              ctaLabel:
                typeof b.ctaLabel === "string" ? b.ctaLabel : "Activate offer",
              finePrint: typeof b.finePrint === "string" ? b.finePrint : null,
              heroImageUrl:
                typeof b.heroImageUrl === "string" ? b.heroImageUrl : null,
            },
            validFrom:
              data.validFrom instanceof Timestamp ? data.validFrom.toDate() : null,
            validUntil:
              data.validUntil instanceof Timestamp
                ? data.validUntil.toDate()
                : null,
            redemptionCap:
              typeof data.redemptionCap === "number"
                ? data.redemptionCap
                : null,
            redemptionCount:
              typeof data.redemptionCount === "number"
                ? data.redemptionCount
                : 0,
            visibilityMode:
              typeof data.visibilityMode === "string"
                ? data.visibilityMode
                : "auto",
            createdAt:
              data.createdAt instanceof Timestamp ? data.createdAt.toDate() : null,
            updatedAt:
              data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : null,
          });
        }
      } catch (e) {
        if (!cancelled) {
          setOffer("error");
          setErrorMessage(e instanceof Error ? e.message : "Unknown error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function toggleStatus(next: "active" | "paused") {
    if (typeof offer !== "object" || offer === null) return;
    setBusy(true);
    try {
      await updateDoc(doc(oneuraDb, "campaigns", slug), {
        status: next,
        updatedAt: serverTimestamp(),
      });
      setOffer({ ...offer, status: next });
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (typeof offer !== "object" || offer === null) return;
    const confirmed = window.confirm(
      `Delete offer "${slug}"? This is permanent. Any registered users will lose access.`,
    );
    if (!confirmed) return;
    setBusy(true);
    try {
      await deleteDoc(doc(oneuraDb, "campaigns", slug));
      nav("/admin/offers");
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Couldn't delete.");
      setBusy(false);
    }
  }

  if (offer === "loading") {
    return (
      <PageShell>
        <Crumb to="/admin/offers" label="← All offers" />
        <div style={loaderStyle}>Loading offer…</div>
      </PageShell>
    );
  }

  if (offer === "error") {
    return (
      <PageShell>
        <Crumb to="/admin/offers" label="← All offers" />
        <div style={errorStyle}>
          Couldn't load: {errorMessage ?? "unknown error"}
        </div>
      </PageShell>
    );
  }

  if (offer === null) {
    return (
      <PageShell>
        <Crumb to="/admin/offers" label="← All offers" />
        <div style={loaderStyle}>
          No offer with slug <strong>{slug}</strong>.
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Crumb to="/admin/offers" label="← All offers" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "8px 0 24px",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ color: "#fff", margin: "0 0 4px", fontSize: 26 }}>
            {offer.displayName ?? offer.partnerName ?? offer.slug}
          </h1>
          <div style={{ color: "#94a3b8", fontSize: 14 }}>
            slug: <code style={{ color: "#cbd5e1" }}>{offer.slug}</code>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link
            to={`/admin/offers/${encodeURIComponent(slug)}/edit`}
            style={primaryButtonLink}
          >
            Edit
          </Link>
          {offer.status === "active" ? (
            <button
              type="button"
              onClick={() => toggleStatus("paused")}
              disabled={busy}
              style={secondaryButton}
            >
              Pause
            </button>
          ) : (
            <button
              type="button"
              onClick={() => toggleStatus("active")}
              disabled={busy}
              style={secondaryButton}
            >
              Activate
            </button>
          )}
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            style={dangerButton}
          >
            Delete
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 320px",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div>
          <Card title="Public link">
            <code style={codeStyle}>{publicUrl}</code>
            <CopyButton text={publicUrl} />
          </Card>

          <Card title="Status">
            <KV label="status" value={offer.status} />
            <KV
              label="redemptions"
              value={
                offer.redemptionCap != null
                  ? `${offer.redemptionCount} / ${offer.redemptionCap}`
                  : `${offer.redemptionCount}`
              }
            />
            <KV
              label="valid until"
              value={
                offer.validUntil ? offer.validUntil.toLocaleString() : "—"
              }
            />
            <KV label="visibility" value={offer.visibilityMode} />
            <KV
              label="updated"
              value={offer.updatedAt ? offer.updatedAt.toLocaleString() : "—"}
            />
          </Card>

          <Card title="Store products">
            <KV
              label="iOS product"
              value={offer.iosProductId ?? "(not set yet)"}
            />
            <KV
              label="Android product"
              value={offer.androidProductId ?? "(not set yet)"}
            />
            {(!offer.iosProductId || !offer.androidProductId) && (
              <div style={hintStyle}>
                These point at one of the shared partner SKUs (the discount is
                baked into the SKU itself, so the same product can power many
                campaigns). Until both platforms are filled in, the in-app
                purchase flow can't resolve a StoreProduct — but the landing
                page and email registration still work end-to-end.
              </div>
            )}
          </Card>

          <Card title="Branding">
            <KV label="partner name" value={offer.partnerName ?? "—"} />
            <KV label="display name" value={offer.displayName ?? "—"} />
            <KV label="primary color" value={offer.branding.primaryColorHex ?? "—"} />
            <KV label="headline" value={offer.branding.headline || "—"} />
            <KV label="body" value={offer.branding.body || "—"} />
            <KV label="CTA label" value={offer.branding.ctaLabel} />
            <KV label="fine print" value={offer.branding.finePrint ?? "—"} />
          </Card>
        </div>

        <div>
          <Card title="QR code">
            <QrPanel slug={offer.slug} publicUrl={publicUrl} />
          </Card>
        </div>
      </div>
    </PageShell>
  );
};

/* ─── QR panel ────────────────────────────────────────────────── */

interface QrPanelProps {
  slug: string;
  publicUrl: string;
}

/**
 * Branded QR with two preset variants:
 *   - Branded — QR + Oneura logo in centre + gradient ring around the outside
 *   - Plain   — same gradient ring + navy fill, no centre logo (use when
 *               you want a cleaner scan-target / partner co-brand sticker)
 *
 * Both variants paint the QR on top of a filled navy disc whose radius
 * matches the ring's inner edge, so the "corner gaps" between the
 * inscribed QR square and the circle read as continuous background
 * rather than a square-in-a-circle. The ring itself is drawn as a
 * gradient arc so it stays crisp at any export size and never picks
 * up the white border the PNG asset ships with.
 */
const QR_RENDER_PX = 720;

const QrPanel: React.FC<QrPanelProps> = ({ slug, publicUrl }) => {
  const [branded, setBranded] = useState<string | null>(null);
  const [plain, setPlain] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setBranded(null);
    setPlain(null);
    setError(null);
    (async () => {
      try {
        const [a, b] = await Promise.all([
          buildBrandedQrDataUrl({ url: publicUrl, includeLogo: true }),
          buildBrandedQrDataUrl({ url: publicUrl, includeLogo: false }),
        ]);
        if (cancelled) return;
        setBranded(a);
        setPlain(b);
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Failed to generate QR.",
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [publicUrl]);

  function download(dataUrl: string | null, suffix: string) {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `oneura-qr-${slug}-${suffix}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div>
      {error && (
        <div
          style={{
            background: "rgba(239,68,68,0.15)",
            color: "#fecaca",
            border: "1px solid rgba(239,68,68,0.35)",
            padding: "10px 12px",
            borderRadius: 8,
            marginBottom: 12,
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        <QrVariant
          title="Branded"
          subtitle="With Oneura mark in the centre."
          dataUrl={branded}
          onDownload={() => download(branded, "branded")}
        />
        <QrVariant
          title="Plain"
          subtitle="Cleaner scan target — no centre logo."
          dataUrl={plain}
          onDownload={() => download(plain, "plain")}
        />
      </div>
      <div style={{ ...hintStyle, marginTop: 14 }}>
        QR is rendered at 720×720 with error-correction level H (≈30% damage
        tolerance) — print at any size. Downloads are transparent-background
        PNG so they sit cleanly on light or dark backgrounds.
      </div>
    </div>
  );
};

interface QrVariantProps {
  title: string;
  subtitle: string;
  dataUrl: string | null;
  onDownload: () => void;
}

const QrVariant: React.FC<QrVariantProps> = ({
  title,
  subtitle,
  dataUrl,
  onDownload,
}) => (
  <div
    style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 12,
      padding: 16,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
    }}
  >
    <div
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "repeating-conic-gradient(rgba(255,255,255,0.03) 0% 25%, rgba(255,255,255,0) 0% 50%) 50% / 16px 16px",
        borderRadius: 8,
      }}
    >
      {dataUrl ? (
        <img
          src={dataUrl}
          alt={`${title} QR code`}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : (
        <div style={{ color: "#94a3b8", fontSize: 13 }}>Generating…</div>
      )}
    </div>
    <div style={{ textAlign: "center" }}>
      <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>
        {title}
      </div>
      <div
        style={{
          color: "#94a3b8",
          fontSize: 12,
          marginTop: 2,
          maxWidth: 220,
        }}
      >
        {subtitle}
      </div>
    </div>
    <button
      type="button"
      onClick={onDownload}
      disabled={!dataUrl}
      style={{
        ...primaryButton,
        width: "100%",
        opacity: dataUrl ? 1 : 0.5,
        cursor: dataUrl ? "pointer" : "not-allowed",
      }}
    >
      Download PNG
    </button>
  </div>
);

/* ─── QR composition helpers ──────────────────────────────────── */

const QR_BG = "#0B132B"; // navy — matches in-app branded card surface
const QR_PURPLE = "#A855F7";
const QR_BLUE = "#3B82F6";

/**
 * Layout (numbers in 0..1 fractions of the final square canvas):
 *
 *     ┌──────────────────────────────┐
 *     │  ╭───────── ring ─────────╮  │
 *     │ │        ╭─QR sq──╮        │ │   navy disc fills
 *     │ │ navy ──┤  QR    ├── navy │ │   the corners between
 *     │ │        ╰────────╯        │ │   the QR's edges and
 *     │  ╰───────────────────────╯  │   the ring
 *     └──────────────────────────────┘
 *
 *   discR        = 0.46  — radius of the filled navy disc
 *   ringWidth    = 0.030 — gradient ring stroke width
 *   qrSide       = discR · √2 (inscribed square — corners touch the disc)
 */
async function buildBrandedQrDataUrl(opts: {
  url: string;
  includeLogo: boolean;
}): Promise<string> {
  const size = QR_RENDER_PX;
  const cx = size / 2;
  const cy = size / 2;
  const discR = size * 0.46;
  const ringWidth = size * 0.03;
  const qrSide = Math.floor(discR * Math.SQRT2 * 0.96); // small breathing room

  const qrImage = await renderInnerQrImage({
    url: opts.url,
    size: qrSide,
    includeLogo: opts.includeLogo,
  });

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable.");

  // 1. Navy disc — fills the area inside the ring so QR corners blend in.
  ctx.beginPath();
  ctx.arc(cx, cy, discR, 0, Math.PI * 2);
  ctx.fillStyle = QR_BG;
  ctx.fill();

  // 2. QR (transparent background) centred on the disc.
  ctx.drawImage(qrImage, cx - qrSide / 2, cy - qrSide / 2, qrSide, qrSide);

  // 3. Gradient ring — purple top-left → blue bottom-right, matches
  // oneura_circular_no_name.png without inheriting its white border.
  const gradient = ctx.createLinearGradient(
    cx - discR,
    cy - discR,
    cx + discR,
    cy + discR,
  );
  gradient.addColorStop(0, QR_PURPLE);
  gradient.addColorStop(1, QR_BLUE);
  ctx.lineWidth = ringWidth;
  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, discR + ringWidth / 2, 0, Math.PI * 2);
  ctx.stroke();

  return canvas.toDataURL("image/png");
}

/**
 * Renders a transparent-background QR to an HTMLImageElement so it
 * can be drawn onto the composite canvas. Uses qr-code-styling
 * directly (rather than `.append(...)` to a hidden div) and parses
 * its PNG output back into an image — both `getRawData('png')` and
 * `Image.decode()` are widely supported in the browsers we ship to.
 */
async function renderInnerQrImage(opts: {
  url: string;
  size: number;
  includeLogo: boolean;
}): Promise<HTMLImageElement> {
  // NOTE: `imageOptions` must ALWAYS be a populated object even when
  // no logo is set. qr-code-styling deep-merges user options over its
  // defaults, and passing `undefined` overrides the default object
  // entirely — the lib then crashes inside its draw path with
  // `Cannot read properties of undefined (reading 'hideBackgroundDots')`.
  // Keeping the object present (with imageSize: 0 when there's no
  // logo) is the safest workaround.
  const qr = new QRCodeStyling({
    width: opts.size,
    height: opts.size,
    type: "canvas",
    data: opts.url,
    image: opts.includeLogo ? oneuraLogo : undefined,
    margin: 0,
    qrOptions: { errorCorrectionLevel: "H" },
    dotsOptions: { type: "rounded", color: QR_PURPLE },
    cornersSquareOptions: { type: "extra-rounded", color: QR_PURPLE },
    cornersDotOptions: { type: "dot", color: QR_PURPLE },
    backgroundOptions: { color: "transparent" },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: opts.includeLogo ? 4 : 0,
      imageSize: opts.includeLogo ? 0.28 : 0,
      hideBackgroundDots: opts.includeLogo,
      saveAsBlob: true,
    },
  });

  const blob = (await qr.getRawData("png")) as Blob | null;
  if (!blob) throw new Error("Failed to render inner QR.");

  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    img.src = url;
    if (img.decode) {
      await img.decode();
    } else {
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Inner QR image load failed."));
      });
    }
    return img;
  } finally {
    // Hold the object URL until after the image is drawn to canvas in
    // the caller — the caller's drawImage() finishes synchronously
    // before the next macrotask, so a microtask-deferred revoke would
    // be safe, but we just let GC clean up. Avoid revoking immediately
    // here because Safari sometimes invalidates the decoded image's
    // pixels when its source URL is revoked synchronously.
  }
}

/* ─── small bits ──────────────────────────────────────────────── */

const Crumb: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <Link to={to} style={{ color: "#94a3b8", textDecoration: "none", fontSize: 13 }}>
    {label}
  </Link>
);

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: "16px 20px",
      marginBottom: 16,
    }}
  >
    <div
      style={{
        color: "#94a3b8",
        fontSize: 12,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginBottom: 12,
      }}
    >
      {title}
    </div>
    {children}
  </section>
);

const KV: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "140px 1fr",
      gap: 8,
      padding: "4px 0",
      fontSize: 14,
      borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}
  >
    <div style={{ color: "#94a3b8" }}>{label}</div>
    <div style={{ color: "#cbd5e1", wordBreak: "break-word" }}>{value}</div>
  </div>
);

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      style={{ ...secondaryButton, marginLeft: 8, padding: "4px 10px", fontSize: 12 }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

const codeStyle: React.CSSProperties = {
  background: "rgba(11,19,43,0.6)",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 13,
  color: "#fff",
  fontFamily: "monospace",
};

const loaderStyle: React.CSSProperties = {
  textAlign: "center",
  padding: 40,
  color: "#94a3b8",
  background: "rgba(255,255,255,0.03)",
  border: "1px dashed rgba(255,255,255,0.1)",
  borderRadius: 12,
  marginTop: 20,
};

const errorStyle: React.CSSProperties = {
  ...loaderStyle,
  color: "#fca5a5",
  borderColor: "#fca5a533",
  background: "#fca5a508",
};

const hintStyle: React.CSSProperties = {
  color: "#64748b",
  fontSize: 12,
  marginTop: 8,
  lineHeight: 1.5,
};

const primaryButton: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 8,
  border: "none",
  background: "#A855F7",
  color: "#fff",
  fontWeight: 600,
  fontSize: 13,
  cursor: "pointer",
};

const primaryButtonLink: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 8,
  border: "none",
  background: "#A855F7",
  color: "#fff",
  fontWeight: 600,
  fontSize: 13,
  textDecoration: "none",
  display: "inline-block",
};

const secondaryButton: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "transparent",
  color: "#cbd5e1",
  fontSize: 13,
  cursor: "pointer",
};

const dangerButton: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 8,
  border: "1px solid #fca5a544",
  background: "rgba(252,165,165,0.08)",
  color: "#fca5a5",
  fontSize: 13,
  cursor: "pointer",
};

export default AdminOfferDetail;
