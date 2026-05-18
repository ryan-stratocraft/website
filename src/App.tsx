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

const App: React.FC = () => {
  return (
    <>
      {isOneuraProductSite ? <OneuraNavbar /> : <Navbar />}

      <div className="page-container">
        {isOneuraProductSite ? (
          <OneuraProductSiteRoutes />
        ) : (
          <StratoSiteRoutes />
        )}
      </div>

      {isOneuraProductSite ? <CookieConsent /> : null}
    </>
  );
};

export default App;
