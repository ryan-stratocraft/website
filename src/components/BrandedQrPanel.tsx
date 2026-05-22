import React, { useEffect, useState } from "react";
import QRCodeStyling from "qr-code-styling";
// Transparent-background ring (no built-in navy padding, no "Oneura"
// wordmark). Using the padded `logo-color.png` would force imageSize
// down to ~0.28 to avoid the navy square spilling outside the cleared
// QR centre — most of that 28% allocation is then wasted on padding,
// leaving the visible ring uncomfortably small at small print sizes.
import oneuraLogo from "../assets/images/oneura/logo-no-background.png";

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
 *
 * Shared between the partner-offers admin (where `url` is
 * `oneura.app/c/<slug>`) and the share-links admin (where `url` is
 * `oneura.app/d/<slug>` or `oneura.app/d/<slug>?src=<source>`).
 */
const QR_RENDER_PX = 720;

interface BrandedQrPanelProps {
  /** URL to encode in the QR. */
  url: string;
  /**
   * File name root used for the downloaded PNG, e.g. `oneura-qr-spring`
   * → `oneura-qr-spring-branded.png` / `oneura-qr-spring-plain.png`.
   */
  filenameBase: string;
}

const BrandedQrPanel: React.FC<BrandedQrPanelProps> = ({
  url,
  filenameBase,
}) => {
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
          buildBrandedQrDataUrl({ url, includeLogo: true }),
          buildBrandedQrDataUrl({ url, includeLogo: false }),
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
  }, [url]);

  function download(dataUrl: string | null, suffix: string) {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${filenameBase}-${suffix}.png`;
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
      <div style={hintStyle}>
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
 *     │ │ navy ──┤  QR ⊙  ├── navy │ │   the corners between
 *     │ │        ╰────────╯        │ │   the QR's edges and
 *     │  ╰───────────────────────╯  │   the outer ring; centre
 *     └──────────────────────────────┘   ⊙ = the big inner logo
 *
 *   discR        = 0.46  — radius of the filled navy disc
 *   ringWidth    = 0.030 — gradient ring stroke width
 *   qrSide       = discR · √2 · 0.96 (inscribed square, slight breathing)
 *   logoFraction = 0.55  — inner logo as a fraction of qrSide
 *
 * Note that we NO LONGER use qr-code-styling's `image` + `imageOptions`
 * overlay — that mechanic clears a SQUARE area in the centre (imageSize²
 * of total QR area). With EC level H tolerating ~30% damage, that capped
 * the logo at ~0.5·qrSide. Doing the compositing ourselves lets us draw
 * the transparent ring at 0.55·qrSide while only sacrificing the modules
 * the ring's stroke physically covers, so the QR still scans on cheap
 * phone cameras AND the brand mark fills the centre properly.
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

  // Plain QR (no image overlay) — every module is intact, so EC H has
  // its full 30% damage budget available for whatever we composite
  // on top.
  const qrImage = await renderInnerQrImage({
    url: opts.url,
    size: qrSide,
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

  // 3. Big centre logo (Branded variant only). We draw the
  // transparent ring directly on top of the QR — only the ring's
  // visible stroke obscures modules.
  //
  // We additionally clear a small navy disc behind the ring's
  // transparent middle so the centre reads as a clean navy circle
  // rather than QR speckle peeking through.
  if (opts.includeLogo) {
    const logoSize = qrSide * 0.55;
    const innerClearR = logoSize * 0.32; // sits just inside the ring's inner edge

    ctx.beginPath();
    ctx.arc(cx, cy, innerClearR, 0, Math.PI * 2);
    ctx.fillStyle = QR_BG;
    ctx.fill();

    const logoImg = await loadLogoImage(oneuraLogo);
    ctx.drawImage(
      logoImg,
      cx - logoSize / 2,
      cy - logoSize / 2,
      logoSize,
      logoSize,
    );
  }

  // 4. Outer gradient ring — purple top-left → blue bottom-right,
  // matches oneura_circular_no_name.png without inheriting its
  // white border.
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
}): Promise<HTMLImageElement> {
  // NOTE: `imageOptions` must ALWAYS be a populated object — see the
  // qr-code-styling crash we hit previously. We don't ask the lib
  // to render a logo any more (we composite our own), so all the
  // image-related fields stay at their no-op defaults.
  const qr = new QRCodeStyling({
    width: opts.size,
    height: opts.size,
    type: "canvas",
    data: opts.url,
    margin: 0,
    qrOptions: { errorCorrectionLevel: "H" },
    dotsOptions: { type: "rounded", color: QR_PURPLE },
    cornersSquareOptions: { type: "extra-rounded", color: QR_PURPLE },
    cornersDotOptions: { type: "dot", color: QR_PURPLE },
    backgroundOptions: { color: "transparent" },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 0,
      imageSize: 0,
      hideBackgroundDots: false,
      saveAsBlob: true,
    },
  });

  const blob = (await qr.getRawData("png")) as Blob | null;
  if (!blob) throw new Error("Failed to render inner QR.");

  const url = URL.createObjectURL(blob);
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
  // Hold the object URL until after the image is drawn to canvas in
  // the caller — Safari sometimes invalidates the decoded image's
  // pixels when its source URL is revoked synchronously, so we let
  // GC clean up after the drawImage() call completes.
  return img;
}

/** Loads the logo PNG into an HTMLImageElement ready for drawImage(). */
async function loadLogoImage(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = src;
  if (img.decode) {
    await img.decode();
    return img;
  }
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Logo image load failed."));
  });
  return img;
}

const hintStyle: React.CSSProperties = {
  color: "#64748b",
  fontSize: 12,
  marginTop: 14,
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

export default BrandedQrPanel;
