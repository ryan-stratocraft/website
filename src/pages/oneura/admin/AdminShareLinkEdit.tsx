import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { oneuraDb } from "../../../firebase/oneuraFirestore";
import { PageShell } from "./AdminOffersList";
import ShareLinkFormFields, {
  emptyShareLinkFormValue,
  shareLinkFormToDoc,
  validateShareLinkForm,
  type ShareLinkFormValue,
} from "./ShareLinkFormFields";

/**
 * `/admin/links/:slug/edit` - same form AdminShareLinkCreate uses,
 * but pre-filled from the existing doc and writing back via
 * updateDoc so the counter fields (`totalClicks`, `clicksBySource`,
 * `clicksByPlatform`, `createdAt`) are preserved.
 *
 * Slug is read-only - to "rename" a share link, delete and recreate.
 */
const AdminShareLinkEdit: React.FC = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const nav = useNavigate();

  const [value, setValue] = useState<ShareLinkFormValue | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(oneuraDb, "share_links", slug));
        if (!snap.exists()) {
          if (!cancelled) setLoadError("share_link_not_found");
          return;
        }
        const data = snap.data() as Record<string, unknown>;
        const sources = Array.isArray(data.sources)
          ? (data.sources as unknown[]).filter(
              (s): s is string => typeof s === "string",
            )
          : [];

        if (!cancelled) {
          setValue({
            ...emptyShareLinkFormValue,
            slug: snap.id,
            status: data.status === "paused" ? "paused" : "active",
            name: typeof data.name === "string" ? data.name : "",
            description:
              typeof data.description === "string" ? data.description : "",
            sourcesStr: sources.join(", "),
            promoEnabled: data.promoEnabled === true,
            offerSlug:
              typeof data.offerSlug === "string" ? data.offerSlug : "",
          });
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

  function patch(p: Partial<ShareLinkFormValue>) {
    setValue((v) => (v ? { ...v, ...p } : v));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!value) return;

    const formError = validateShareLinkForm(value, "edit");
    if (formError) {
      setSubmitError(formError);
      return;
    }

    setBusy(true);
    try {
      const body = shareLinkFormToDoc(value);

      await updateDoc(doc(oneuraDb, "share_links", slug), {
        name: body.name,
        description: body.description,
        status: body.status,
        sources: body.sources,
        promoEnabled: body.promoEnabled,
        offerSlug: body.offerSlug,
        updatedAt: serverTimestamp(),
      });

      nav(`/admin/links/${encodeURIComponent(slug)}`);
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
        <Crumb to="/admin/links" label="← All share links" />
        <div style={errorBlockStyle}>
          {loadError === "share_link_not_found"
            ? `No share link with slug "${slug}".`
            : `Couldn't load share link: ${loadError}`}
        </div>
      </PageShell>
    );
  }

  if (!value) {
    return (
      <PageShell>
        <Crumb to="/admin/links" label="← All share links" />
        <div style={loaderStyle}>Loading share link…</div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Crumb
        to={`/admin/links/${encodeURIComponent(slug)}`}
        label="← Back to share link"
      />
      <h1 style={{ color: "#fff", margin: "8px 0 24px" }}>
        Edit <code style={codeStyle}>{slug}</code>
      </h1>

      <form onSubmit={submit}>
        <ShareLinkFormFields value={value} onChange={patch} mode="edit" />

        {submitError && <div style={errorBoxStyle}>{submitError}</div>}

        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button type="submit" disabled={busy} style={primaryButton}>
            {busy ? "Saving…" : "Save changes"}
          </button>
          <Link
            to={`/admin/links/${encodeURIComponent(slug)}`}
            style={secondaryButton}
          >
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

export default AdminShareLinkEdit;
