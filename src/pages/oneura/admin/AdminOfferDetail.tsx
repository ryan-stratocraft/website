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
import { oneuraDb } from "../../../firebase/oneuraFirestore";
import { PageShell } from "./AdminOffersList";
import BrandedQrPanel from "../../../components/BrandedQrPanel";
import AdminSectionNav from "./AdminSectionNav";

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
      <AdminSectionNav />
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
            <BrandedQrPanel
              url={publicUrl}
              filenameBase={`oneura-qr-${offer.slug}`}
            />
          </Card>
        </div>
      </div>
    </PageShell>
  );
};

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
