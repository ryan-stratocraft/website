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
import { universalShareLink } from "../../../routes/oneuraPaths";
import AdminSectionNav from "./AdminSectionNav";

interface ShareLinkDoc {
  slug: string;
  name: string;
  description: string | null;
  status: string;
  sources: string[];
  promoEnabled: boolean;
  offerSlug: string | null;
  totalClicks: number;
  clicksBySource: Record<string, number>;
  clicksByPlatform: Record<string, number>;
  createdAt: Date | null;
  updatedAt: Date | null;
}

/**
 * `/admin/links/:slug` - detail view for a share link.
 *
 * Layout:
 *   ┌──────────────────────────┬─────────────────────────┐
 *   │ Public link + metadata   │ Base QR (the bare URL,  │
 *   │ Stats: per-source +      │ no `?src=`)             │
 *   │   per-platform breakdown │                         │
 *   ├──────────────────────────┴─────────────────────────┤
 *   │  Per-source QR + URL panels                        │
 *   │  (one panel per predefined source)                 │
 *   └────────────────────────────────────────────────────┘
 */
const AdminShareLinkDetail: React.FC = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const nav = useNavigate();

  const [link, setLink] = useState<ShareLinkDoc | null | "loading" | "error">(
    "loading",
  );
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const baseUrl = useMemo(() => universalShareLink(slug), [slug]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(oneuraDb, "share_links", slug));
        if (!snap.exists()) {
          if (!cancelled) setLink(null);
          return;
        }
        const data = snap.data() as Record<string, unknown>;
        if (!cancelled) {
          setLink({
            slug: snap.id,
            name: typeof data.name === "string" ? data.name : snap.id,
            description:
              typeof data.description === "string" ? data.description : null,
            status: typeof data.status === "string" ? data.status : "unknown",
            sources: Array.isArray(data.sources)
              ? (data.sources as unknown[]).filter(
                  (s): s is string => typeof s === "string",
                )
              : [],
            promoEnabled: data.promoEnabled === true,
            offerSlug:
              typeof data.offerSlug === "string" ? data.offerSlug : null,
            totalClicks:
              typeof data.totalClicks === "number" ? data.totalClicks : 0,
            clicksBySource: toNumberMap(data.clicksBySource),
            clicksByPlatform: toNumberMap(data.clicksByPlatform),
            createdAt:
              data.createdAt instanceof Timestamp
                ? data.createdAt.toDate()
                : null,
            updatedAt:
              data.updatedAt instanceof Timestamp
                ? data.updatedAt.toDate()
                : null,
          });
        }
      } catch (e) {
        if (!cancelled) {
          setLink("error");
          setErrorMessage(e instanceof Error ? e.message : "Unknown error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function toggleStatus(next: "active" | "paused") {
    if (typeof link !== "object" || link === null) return;
    setBusy(true);
    try {
      await updateDoc(doc(oneuraDb, "share_links", slug), {
        status: next,
        updatedAt: serverTimestamp(),
      });
      setLink({ ...link, status: next });
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (typeof link !== "object" || link === null) return;
    const confirmed = window.confirm(
      `Delete share link "${slug}"? This is permanent and stops collecting clicks for any QR codes or URLs already in the wild.`,
    );
    if (!confirmed) return;
    setBusy(true);
    try {
      await deleteDoc(doc(oneuraDb, "share_links", slug));
      nav("/admin/links");
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Couldn't delete.");
      setBusy(false);
    }
  }

  if (link === "loading") {
    return (
      <PageShell>
        <Crumb to="/admin/links" label="← All share links" />
        <div style={loaderStyle}>Loading share link…</div>
      </PageShell>
    );
  }

  if (link === "error") {
    return (
      <PageShell>
        <Crumb to="/admin/links" label="← All share links" />
        <div style={errorStyle}>
          Couldn't load: {errorMessage ?? "unknown error"}
        </div>
      </PageShell>
    );
  }

  if (link === null) {
    return (
      <PageShell>
        <Crumb to="/admin/links" label="← All share links" />
        <div style={loaderStyle}>
          No share link with slug <strong>{slug}</strong>.
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <AdminSectionNav />
      <Crumb to="/admin/links" label="← All share links" />
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
            {link.name}
          </h1>
          <div style={{ color: "#94a3b8", fontSize: 14 }}>
            slug: <code style={{ color: "#cbd5e1" }}>{link.slug}</code>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link
            to={`/admin/links/${encodeURIComponent(slug)}/edit`}
            style={primaryButtonLink}
          >
            Edit
          </Link>
          {link.status === "active" ? (
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
          marginBottom: 24,
        }}
      >
        <div>
          <Card title="Base public link">
            <code style={codeStyle}>{baseUrl}</code>
            <CopyButton text={baseUrl} />
            <div style={hintStyle}>
              No <code>?src=</code> means clicks bucket under{" "}
              <code>_direct</code>. Add a per-source QR / URL from the panels
              below for attributable channels.
            </div>
          </Card>

          <Card title="Status">
            <KV label="status" value={link.status} />
            <KV
              label="50% promo gate"
              value={
                link.promoEnabled && link.offerSlug
                  ? `on → offer ${link.offerSlug}`
                  : "off"
              }
            />
            <KV
              label="total clicks"
              value={link.totalClicks.toLocaleString()}
            />
            <KV
              label="updated"
              value={link.updatedAt ? link.updatedAt.toLocaleString() : "-"}
            />
            <KV
              label="created"
              value={link.createdAt ? link.createdAt.toLocaleString() : "-"}
            />
          </Card>

          {link.description && (
            <Card title="Notes">
              <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.5 }}>
                {link.description}
              </div>
            </Card>
          )}

          <Card title="Clicks by source">
            <ClickBreakdown
              entries={breakdownEntries(
                link.clicksBySource,
                link.sources,
                ["_direct", "_other"],
              )}
              total={link.totalClicks}
            />
          </Card>

          <Card title="Clicks by platform">
            <ClickBreakdown
              entries={breakdownEntries(
                link.clicksByPlatform,
                [],
                ["ios", "android", "desktop", "other"],
              )}
              total={link.totalClicks}
            />
          </Card>
        </div>

        <div>
          <Card title="Base QR">
            <BrandedQrPanel
              url={baseUrl}
              filenameBase={`oneura-share-${link.slug}`}
            />
          </Card>
        </div>
      </div>

      {link.sources.length > 0 && (
        <Card title="Per-source QRs">
          <p style={{ color: "#94a3b8", fontSize: 13, margin: "0 0 16px" }}>
            One panel per predefined source. Each URL appends{" "}
            <code>?src=&lt;source&gt;</code>; clicks are bucketed in{" "}
            <code>clicksBySource.&lt;source&gt;</code>.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {link.sources.map((source) => (
              <PerSourceCard key={source} slug={link.slug} source={source} />
            ))}
          </div>
        </Card>
      )}
    </PageShell>
  );
};

/** One QR + URL pair for a single predefined source. */
const PerSourceCard: React.FC<{ slug: string; source: string }> = ({
  slug,
  source,
}) => {
  const url = useMemo(
    () => universalShareLink(slug, source),
    [slug, source],
  );
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          color: "#A855F7",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {source}
      </div>
      <code style={{ ...codeStyle, fontSize: 12, wordBreak: "break-all" }}>
        {url}
      </code>
      <div style={{ marginTop: 8 }}>
        <CopyButton text={url} />
      </div>
      <div style={{ marginTop: 12 }}>
        <BrandedQrPanel
          url={url}
          filenameBase={`oneura-share-${slug}-${source}`}
        />
      </div>
    </div>
  );
};

/* ─── breakdown helpers ────────────────────────────────────────── */

interface BreakdownEntry {
  key: string;
  label: string;
  count: number;
  highlight: boolean;
}

/**
 * Builds a stable, human-readable ordering for the per-bucket
 * breakdowns. Predefined buckets (sources defined on the doc or the
 * fixed platform set) always show, even at zero. Underscore buckets
 * (`_direct`, `_other`) only show if they have a non-zero count
 * (less visual noise on a fresh link). Anything else that landed in
 * the map (e.g. a never-defined source from an old config) shows as
 * "unknown".
 */
function breakdownEntries(
  map: Record<string, number>,
  predefined: string[],
  alwaysShow: string[],
): BreakdownEntry[] {
  const out: BreakdownEntry[] = [];
  const seen = new Set<string>();

  for (const key of predefined) {
    seen.add(key.toLowerCase());
    out.push({
      key,
      label: key,
      count: map[key] ?? 0,
      highlight: true,
    });
  }

  for (const key of alwaysShow) {
    if (seen.has(key.toLowerCase())) continue;
    seen.add(key.toLowerCase());
    const count = map[key] ?? 0;
    // Hide zero-count underscore buckets to reduce noise; show every
    // platform bucket even at zero so the operator can see the matrix.
    if (key.startsWith("_") && count === 0) continue;
    out.push({
      key,
      label: prettyLabel(key),
      count,
      highlight: false,
    });
  }

  // Catch-all for any extra keys not in predefined/alwaysShow lists.
  for (const [key, count] of Object.entries(map)) {
    if (seen.has(key.toLowerCase())) continue;
    out.push({
      key,
      label: prettyLabel(key),
      count,
      highlight: false,
    });
  }

  return out;
}

function prettyLabel(key: string): string {
  if (key === "_direct") return "direct (no src)";
  if (key === "_other") return "other / unrecognised";
  return key;
}

const ClickBreakdown: React.FC<{
  entries: BreakdownEntry[];
  total: number;
}> = ({ entries, total }) => {
  if (entries.length === 0) {
    return (
      <div style={{ color: "#94a3b8", fontSize: 13 }}>
        No data yet - clicks will populate this list as the link is used.
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {entries.map((e) => {
        const pct = total > 0 ? (e.count / total) * 100 : 0;
        return (
          <div key={e.key}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                marginBottom: 4,
                color: e.highlight ? "#fff" : "#94a3b8",
                fontWeight: e.highlight ? 600 : 400,
              }}
            >
              <span>{e.label}</span>
              <span>
                {e.count.toLocaleString()}
                <span
                  style={{ color: "#64748b", marginLeft: 8, fontWeight: 400 }}
                >
                  {total > 0 ? `${pct.toFixed(1)}%` : ""}
                </span>
              </span>
            </div>
            <div
              style={{
                height: 4,
                background: "rgba(255,255,255,0.05)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: e.highlight ? "#A855F7" : "#475569",
                  transition: "width 240ms",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

function toNumberMap(input: unknown): Record<string, number> {
  if (!input || typeof input !== "object") return {};
  const out: Record<string, number> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (typeof value === "number") out[key] = value;
  }
  return out;
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

export default AdminShareLinkDetail;
