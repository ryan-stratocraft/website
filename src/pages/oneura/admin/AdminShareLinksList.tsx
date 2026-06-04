import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { oneuraDb } from "../../../firebase/oneuraFirestore";
import { PageShell } from "./AdminOffersList";
import AdminSectionNav from "./AdminSectionNav";

interface ShareLinkRow {
  slug: string;
  name: string;
  status: string;
  totalClicks: number;
  sourcesCount: number;
  updatedAt: Date | null;
}

/**
 * `/admin/links` — table of every share link in /share_links. Sister
 * page to AdminOffersList; shares the PageShell + AdminSectionNav so
 * the operator can swap between the two sections.
 */
const AdminShareLinksList: React.FC = () => {
  const [rows, setRows] = useState<ShareLinkRow[] | "loading" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const q = query(
          collection(oneuraDb, "share_links"),
          orderBy("updatedAt", "desc"),
        );
        const snap = await getDocs(q);
        const out: ShareLinkRow[] = snap.docs.map((d) => {
          const data = d.data() as Record<string, unknown>;
          const sources = Array.isArray(data.sources)
            ? (data.sources as unknown[]).filter((s) => typeof s === "string")
            : [];
          return {
            slug: d.id,
            name: typeof data.name === "string" ? data.name : d.id,
            status: typeof data.status === "string" ? data.status : "unknown",
            totalClicks:
              typeof data.totalClicks === "number" ? data.totalClicks : 0,
            sourcesCount: sources.length,
            updatedAt:
              data.updatedAt instanceof Timestamp
                ? data.updatedAt.toDate()
                : null,
          };
        });
        if (!cancelled) setRows(out);
      } catch (e) {
        if (!cancelled) {
          setRows("error");
          setErrorMessage(e instanceof Error ? e.message : "Unknown error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PageShell>
      <AdminSectionNav />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h1 style={{ margin: 0, color: "#fff", fontSize: 24 }}>
          Share links
        </h1>
        <Link
          to="/admin/links/new"
          style={{
            background: "#A855F7",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          New share link
        </Link>
      </div>

      {rows === "loading" && (
        <div style={loaderStyle}>Loading share links…</div>
      )}

      {rows === "error" && (
        <div style={errorStyle}>
          Couldn't load share links: {errorMessage ?? "unknown error"}
        </div>
      )}

      {Array.isArray(rows) && rows.length === 0 && (
        <div style={loaderStyle}>
          No share links yet. Click <strong>New share link</strong> to
          create the first one — they're the simplest way to share Oneura
          on social, in ads, or in a QR code.
        </div>
      )}

      {Array.isArray(rows) && rows.length > 0 && (
        <div style={tableWrap}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Slug</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Total clicks</th>
                <th style={thStyle}>Sources</th>
                <th style={thStyle}>Last updated</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.slug}>
                  <td style={tdStyle}>
                    <Link
                      to={`/admin/links/${encodeURIComponent(r.slug)}`}
                      style={{
                        color: "#A855F7",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      {r.slug}
                    </Link>
                  </td>
                  <td style={tdStyle}>{r.name}</td>
                  <td style={tdStyle}>
                    <StatusPill status={r.status} />
                  </td>
                  <td style={tdStyle}>{r.totalClicks.toLocaleString()}</td>
                  <td style={tdStyle}>{r.sourcesCount}</td>
                  <td style={{ ...tdStyle, color: "#94a3b8", fontSize: 13 }}>
                    {r.updatedAt ? r.updatedAt.toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageShell>
  );
};

const StatusPill: React.FC<{ status: string }> = ({ status }) => {
  const color =
    status === "active"
      ? "#34d399"
      : status === "paused"
      ? "#facc15"
      : "#94a3b8";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 999,
        background: `${color}22`,
        color,
        fontSize: 12,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: 0.6,
      }}
    >
      {status}
    </span>
  );
};

const loaderStyle: React.CSSProperties = {
  textAlign: "center",
  padding: 40,
  color: "#94a3b8",
  background: "rgba(255,255,255,0.03)",
  border: "1px dashed rgba(255,255,255,0.1)",
  borderRadius: 12,
};

const errorStyle: React.CSSProperties = {
  ...loaderStyle,
  color: "#fca5a5",
  borderColor: "#fca5a533",
  background: "#fca5a508",
};

const tableWrap: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  overflow: "hidden",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 16px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  color: "#94a3b8",
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.8,
};

const tdStyle: React.CSSProperties = {
  padding: "14px 16px",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  color: "#cbd5e1",
};

export default AdminShareLinksList;
