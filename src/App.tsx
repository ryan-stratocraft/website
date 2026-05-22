import React from "react";
import Navbar from "./components/Navbar";
import OneuraNavbar from "./components/OneuraNavbar";
import {
  OneuraProductSiteRoutes,
  StratoSiteRoutes,
} from "./components/AppRoutes";
import CookieConsent from "./components/CookieConsent";
import { isOneuraHostname } from "./host";
import "./styles/global.css";

const isOneuraProductSite =
  typeof window !== "undefined" &&
  isOneuraHostname(window.location.hostname);

/** True for any /admin/... route — used to hide the marketing navbar
 *  and cookie banner so the operator UI gets the full viewport. */
function isAdminRoute(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.pathname.startsWith("/admin/");
}

const App: React.FC = () => {
  const onAdmin = isAdminRoute();
  return (
    <>
      {!onAdmin && (isOneuraProductSite ? <OneuraNavbar /> : <Navbar />)}

      <div className="page-container">
        {isOneuraProductSite ? (
          <OneuraProductSiteRoutes />
        ) : (
          <StratoSiteRoutes />
        )}
      </div>

      {isOneuraProductSite && !onAdmin ? <CookieConsent /> : null}
    </>
  );
};

export default App;
