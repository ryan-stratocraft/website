import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
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
 * `/admin/offers/new` — creates a new campaign doc at
 * `/campaigns/{slug}`. Writes the full Stage 2 schema (status,
 * branding, store product ids, visibility mode, etc.) plus
 * server-set createdAt + updatedAt and an initial redemptionCount of
 * 0.
 *
 * Slug uniqueness is enforced via a pre-write `getDoc` check
 * (Firestore rules permit admin writes regardless, so a race-y
 * duplicate would silently overwrite — the pre-check avoids that
 * footgun).
 */
const AdminOfferCreate: React.FC = () => {
  const nav = useNavigate();

  const [value, setValue] = useState<OfferFormValue>(emptyOfferFormValue);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function patch(p: Partial<OfferFormValue>) {
    setValue((v) => ({ ...v, ...p }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const formError = validateOfferForm(value, "create");
    if (formError) {
      setError(formError);
      return;
    }

    setBusy(true);
    try {
      const ref = doc(oneuraDb, "campaigns", value.slug);
      const existing = await getDoc(ref);
      if (existing.exists()) {
        setError(
          `An offer with slug "${value.slug}" already exists. Pick another slug.`,
        );
        setBusy(false);
        return;
      }

      const body = offerFormToDoc(value);
      const validUntil = body.validUntilStr
        ? Timestamp.fromDate(new Date(body.validUntilStr))
        : null;

      await setDoc(ref, {
        slug: body.slug,
        status: body.status,
        partnerName: body.partnerName,
        displayName: body.displayName,
        iosProductId: body.iosProductId,
        androidProductId: body.androidProductId,
        branding: body.branding,
        validFrom: null,
        validUntil,
        redemptionCap: body.redemptionCap,
        redemptionCount: 0,
        visibilityMode: body.visibilityMode,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      nav(`/admin/offers/${encodeURIComponent(value.slug)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save the offer.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <Crumb to="/admin/offers" label="← All offers" />
      <h1 style={{ color: "#fff", margin: "8px 0 24px" }}>New partner offer</h1>

      <form onSubmit={submit}>
        <OfferFormFields
          value={value}
          onChange={patch}
          mode="create"
          showAdvanced={showAdvanced}
          onToggleAdvanced={() => setShowAdvanced((v) => !v)}
        />

        {error && <div style={errorBoxStyle}>{error}</div>}

        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button type="submit" disabled={busy} style={primaryButton}>
            {busy ? "Saving…" : "Create offer"}
          </button>
          <Link to="/admin/offers" style={secondaryButton}>
            Cancel
          </Link>
        </div>
      </form>
    </PageShell>
  );
};

const Crumb: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <Link
    to={to}
    style={{ color: "#94a3b8", textDecoration: "none", fontSize: 13 }}
  >
    {label}
  </Link>
);

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

export default AdminOfferCreate;
