import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { oneuraDb } from "../../../firebase/oneuraFirestore";
import { PageShell } from "./AdminOffersList";
import OfferFormFields, {
  emptyOfferFormValue,
  offerFormToDoc,
  validateOfferForm,
  type OfferFormValue,
} from "./OfferFormFields";

/**
 * `/admin/offers/:slug/edit` - pre-fills the same form
 * AdminOfferCreate uses, but writes back via `updateDoc` so
 * server-managed fields (createdAt, redemptionCount) are preserved.
 *
 * Slug is read-only since it's the Firestore doc id; the only way to
 * "rename" a campaign is to delete and re-create.
 */
const AdminOfferEdit: React.FC = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const nav = useNavigate();

  const [value, setValue] = useState<OfferFormValue | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(oneuraDb, "campaigns", slug));
        if (!snap.exists()) {
          if (!cancelled) setLoadError("offer_not_found");
          return;
        }
        const data = snap.data() as Record<string, unknown>;
        const b = (data.branding ?? {}) as Record<string, unknown>;

        const validUntilStr = formatLocalDateTime(
          data.validUntil instanceof Timestamp
            ? data.validUntil.toDate()
            : null,
        );

        if (!cancelled) {
          setValue({
            ...emptyOfferFormValue,
            slug: snap.id,
            status:
              data.status === "active" ||
              data.status === "paused" ||
              data.status === "expired"
                ? data.status
                : "active",
            partnerName: stringOr(data.partnerName, ""),
            displayName: stringOr(data.displayName, ""),
            iosProductId: stringOr(data.iosProductId, ""),
            androidProductId: stringOr(data.androidProductId, ""),
            logoUrl: stringOr(b.logoUrl, ""),
            primaryColorHex: stringOr(b.primaryColorHex, "#A855F7"),
            headline: stringOr(b.headline, ""),
            body: stringOr(b.body, ""),
            ctaLabel: stringOr(b.ctaLabel, "Activate offer"),
            finePrint: stringOr(b.finePrint, ""),
            heroImageUrl: stringOr(b.heroImageUrl, ""),
            validUntilStr,
            redemptionCapStr:
              typeof data.redemptionCap === "number"
                ? String(data.redemptionCap)
                : "",
            visibilityMode:
              data.visibilityMode === "always_card" ||
              data.visibilityMode === "always_hidden"
                ? data.visibilityMode
                : "auto",
          });

          // Auto-expand advanced section if any advanced field has a value.
          if (
            data.validUntil ||
            data.redemptionCap != null ||
            (data.visibilityMode && data.visibilityMode !== "auto")
          ) {
            setShowAdvanced(true);
          }
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(e instanceof Error ? e.message : "unknown_error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  function patch(p: Partial<OfferFormValue>) {
    setValue((v) => (v ? { ...v, ...p } : v));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!value) return;

    const formError = validateOfferForm(value, "edit");
    if (formError) {
      setSubmitError(formError);
      return;
    }

    setBusy(true);
    try {
      const body = offerFormToDoc(value);
      const validUntil = body.validUntilStr
        ? Timestamp.fromDate(new Date(body.validUntilStr))
        : null;

      await updateDoc(doc(oneuraDb, "campaigns", slug), {
        status: body.status,
        partnerName: body.partnerName,
        displayName: body.displayName,
        iosProductId: body.iosProductId,
        androidProductId: body.androidProductId,
        branding: body.branding,
        validUntil,
        redemptionCap: body.redemptionCap,
        visibilityMode: body.visibilityMode,
        updatedAt: serverTimestamp(),
      });

      nav(`/admin/offers/${encodeURIComponent(slug)}`);
    } catch (e) {
      setSubmitError(
        e instanceof Error ? e.message : "Couldn't save changes.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (loadError) {
    return (
      <PageShell>
        <Crumb to="/admin/offers" label="← All offers" />
        <div style={errorBlockStyle}>
          {loadError === "offer_not_found"
            ? `No offer with slug "${slug}".`
            : `Couldn't load offer: ${loadError}`}
        </div>
      </PageShell>
    );
  }

  if (!value) {
    return (
      <PageShell>
        <Crumb to="/admin/offers" label="← All offers" />
        <div style={loaderStyle}>Loading offer…</div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Crumb
        to={`/admin/offers/${encodeURIComponent(slug)}`}
        label="← Back to offer"
      />
      <h1 style={{ color: "#fff", margin: "8px 0 24px" }}>
        Edit <code style={codeStyle}>{slug}</code>
      </h1>

      <form onSubmit={submit}>
        <OfferFormFields
          value={value}
          onChange={patch}
          mode="edit"
          showAdvanced={showAdvanced}
          onToggleAdvanced={() => setShowAdvanced((v) => !v)}
        />

        {submitError && <div style={errorBoxStyle}>{submitError}</div>}

        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button type="submit" disabled={busy} style={primaryButton}>
            {busy ? "Saving…" : "Save changes"}
          </button>
          <Link
            to={`/admin/offers/${encodeURIComponent(slug)}`}
            style={secondaryButton}
          >
            Cancel
          </Link>
        </div>
      </form>
    </PageShell>
  );
};

function stringOr(v: unknown, fallback: string): string {
  return typeof v === "string" ? v : fallback;
}

/** Returns the local-datetime string usable in <input type="datetime-local">. */
function formatLocalDateTime(d: Date | null): string {
  if (!d) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

const Crumb: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <Link
    to={to}
    style={{ color: "#94a3b8", textDecoration: "none", fontSize: 13 }}
  >
    {label}
  </Link>
);

const codeStyle: React.CSSProperties = {
  background: "rgba(11,19,43,0.6)",
  padding: "2px 8px",
  borderRadius: 6,
  fontSize: 18,
  color: "#cbd5e1",
  fontFamily: "monospace",
};

const primaryButton: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: 8,
  border: "none",
  background: "#A855F7",
  color: "#fff",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
};

const secondaryButton: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "transparent",
  color: "#cbd5e1",
  fontSize: 14,
  textDecoration: "none",
  display: "inline-block",
};

const errorBoxStyle: React.CSSProperties = {
  marginTop: 12,
  padding: "10px 14px",
  background: "rgba(252,165,165,0.08)",
  border: "1px solid #fca5a533",
  borderRadius: 8,
  color: "#fca5a5",
  fontSize: 13,
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

const errorBlockStyle: React.CSSProperties = {
  ...loaderStyle,
  color: "#fca5a5",
  borderColor: "#fca5a533",
  background: "#fca5a508",
};

export default AdminOfferEdit;
