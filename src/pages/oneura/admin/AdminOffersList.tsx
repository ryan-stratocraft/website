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
import AdminSectionNav from "./AdminSectionNav";

interface CampaignRow {
  slug: string;
  status: string;
  partnerName: string | null;
  displayName: string | null;
  redemptionCount: number;
  redemptionCap: number | null;
  updatedAt: Date | null;
}

/**
 * `/admin/offers` - table of every campaign in /campaigns. Rule change:
 * isAdmin() can read regardless of `status`, so paused / draft offers
 * appear here too. Click a row to drill into AdminOfferDetail.
 */
const AdminOffersList: React.FC = () => {
  const [rows, setRows] = useState<CampaignRow[] | "loading" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const q = query(
          collection(oneuraDb, "campaigns"),
          orderBy("updatedAt", "desc"),
        );
        const snap = await getDocs(q);
        const out: CampaignRow[] = snap.docs.map((d) => {
          const data = d.data() as Record<string, unknown>;
          return {
            slug: d.id,
            status: typeof data.status === "string" ? data.status : "unknown",
            partnerName:
              typeof data.partnerName === "string" ? data.partnerName : null,
            displayName:
              typeof data.displayName === "string" ? data.displayName : null,
            redemptionCount:
              typeof data.redemptionCount === "number"
                ? data.redemptionCount
                : 0,
            redemptionCap:
              typeof data.redemptionCap === "number"
                ? data.redemptionCap
                : null,
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
      <Header>
        <h1 style={{ margin: 0, color: "#fff", fontSize: 24 }}>
          Partner offers
        </h1>
        <Link
          to="/admin/offers/new"
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
          New offer
        </Link>
      </Header>

      {rows === "loading" && (
        <div style={loaderStyle}>Loading campaigns…</div>
      )}

      {rows === "error" && (
        <div style={errorStyle}>
          Couldn't load campaigns: {errorMessage ?? "unknown error"}
        </div>
      )}

      {Array.isArray(rows) && rows.length === 0 && (
        <div style={loaderStyle}>
          No campaigns yet. Click <strong>New offer</strong> to create the
          first one.
        </div>
      )}

      {Array.isArray(rows) && rows.length > 0 && (
        <div style={tableWrap}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Slug</th>
                <th style={thStyle}>Partner</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Redemptions</th>
                <th style={thStyle}>Last updated</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.slug} style={trStyle}>
                  <td style={tdStyle}>
                    <Link
                      to={`/admin/offers/${encodeURIComponent(r.slug)}`}
                      style={{
                        color: "#A855F7",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      {r.slug}
                    </Link>
                  </td>
                  <td style={tdStyle}>{r.displayName ?? r.partnerName ?? "-"}</td>
                  <td style={tdStyle}>
                    <StatusPill status={r.status} />
                  </td>
                  <td style={tdStyle}>
                    {r.redemptionCount}
                    {r.redemptionCap != null ? ` / ${r.redemptionCap}` : ""}
                  </td>
                  <td style={{ ...tdStyle, color: "#94a3b8", fontSize: 13 }}>
                    {r.updatedAt ? r.updatedAt.toLocaleString() : "-"}
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

export const PageShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      minHeight: "calc(100vh - 53px)",
      background: "#0B132B",
      color: "#fff",
      padding: "32px 20px",
    }}
  >
    <div style={{ maxWidth: 1024, margin: "0 auto" }}>{children}</div>
  </div>
);

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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
    {children}
  </div>
);

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

const trStyle: React.CSSProperties = {
  transition: "background 120ms",
};

const tdStyle: React.CSSProperties = {
  padding: "14px 16px",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  color: "#cbd5e1",
};

export default AdminOffersList;
