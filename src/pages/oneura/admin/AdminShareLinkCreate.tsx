import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { oneuraDb } from "../../../firebase/oneuraFirestore";
import { PageShell } from "./AdminOffersList";
import ShareLinkFormFields, {
  emptyShareLinkFormValue,
  shareLinkFormToDoc,
  validateShareLinkForm,
  type ShareLinkFormValue,
} from "./ShareLinkFormFields";

/**
 * `/admin/links/new` — creates a new share-link doc at
 * `/share_links/{slug}`. Writes the full schema (status, sources,
 * counter scaffolding zeroed out, plus createdAt/updatedAt). Slug
 * uniqueness enforced via a pre-write getDoc check so a race-y
 * duplicate doesn't silently overwrite an existing campaign.
 */
const AdminShareLinkCreate: React.FC = () => {
  const nav = useNavigate();

  const [value, setValue] = useState<ShareLinkFormValue>(
    emptyShareLinkFormValue,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function patch(p: Partial<ShareLinkFormValue>) {
    setValue((v) => ({ ...v, ...p }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const formError = validateShareLinkForm(value, "create");
    if (formError) {
      setError(formError);
      return;
    }

    setBusy(true);
    try {
      const ref = doc(oneuraDb, "share_links", value.slug);
      const existing = await getDoc(ref);
      if (existing.exists()) {
        setError(
          `A share link with slug "${value.slug}" already exists. Pick another slug.`,
        );
        setBusy(false);
        return;
      }

      const body = shareLinkFormToDoc(value);

      await setDoc(ref, {
        slug: body.slug,
        name: body.name,
        description: body.description,
        status: body.status,
        sources: body.sources,
        totalClicks: 0,
        clicksBySource: {},
        clicksByPlatform: {},
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      nav(`/admin/links/${encodeURIComponent(value.slug)}`);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Couldn't save the share link.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <Crumb to="/admin/links" label="← All share links" />
      <h1 style={{ color: "#fff", margin: "8px 0 24px" }}>New share link</h1>

      <form onSubmit={submit}>
        <ShareLinkFormFields value={value} onChange={patch} mode="create" />

        {error && <div style={errorBoxStyle}>{error}</div>}

        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button type="submit" disabled={busy} style={primaryButton}>
            {busy ? "Saving…" : "Create share link"}
          </button>
          <Link to="/admin/links" style={secondaryButton}>
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

export default AdminShareLinkCreate;
