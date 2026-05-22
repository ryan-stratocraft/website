import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Thin tab strip embedded at the top of each admin list/detail page so
 * the operator can swap between the two parallel sections (partner
 * offers vs. share links). Active section is highlighted based on
 * which `/admin/<x>/...` prefix the current pathname falls under.
 */
const AdminSectionNav: React.FC = () => {
  const loc = useLocation();
  const onOffers = loc.pathname.startsWith("/admin/offers");
  const onLinks = loc.pathname.startsWith("/admin/links");

  return (
    <nav
      style={{
        display: "flex",
        gap: 4,
        marginBottom: 16,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Tab to="/admin/offers" active={onOffers}>
        Partner offers
      </Tab>
      <Tab to="/admin/links" active={onLinks}>
        Share links
      </Tab>
    </nav>
  );
};

interface TabProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ to, active, children }) => (
  <Link
    to={to}
    style={{
      padding: "8px 14px",
      fontSize: 13,
      fontWeight: 600,
      color: active ? "#fff" : "#94a3b8",
      borderBottom: active
        ? "2px solid #A855F7"
        : "2px solid transparent",
      textDecoration: "none",
      marginBottom: -1,
    }}
  >
    {children}
  </Link>
);

export default AdminSectionNav;
