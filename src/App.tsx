import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import OneuraNavbar from "./components/OneuraNavbar";
import OneuraFooter from "./components/OneuraFooter";
import {
  OneuraProductSiteRoutes,
  StratoSiteRoutes,
} from "./components/AppRoutes";
import CookieConsent from "./components/CookieConsent";
import OneuraHreflang from "./components/OneuraHreflang";
import { useOneuraWebAnalytics } from "./hooks/useOneuraWebAnalytics";
import { OneuraLocaleProvider } from "./i18n/OneuraLocaleProvider";
import { isOneuraProductSite } from "./host";
import "./styles/global.css";

function useOneuraFont(shouldLoad: boolean): void {
  useEffect(() => {
    if (!shouldLoad || typeof document === "undefined") return;

    const fontLinks = [
      {
        id: "oneura-font-preconnect-google",
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        id: "oneura-font-preconnect-gstatic",
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        id: "oneura-font-stylesheet",
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap",
      },
    ];

    fontLinks.forEach(({ id, rel, href, crossOrigin }) => {
      if (document.getElementById(id)) return;

      const link = document.createElement("link");
      link.id = id;
      link.rel = rel;
      link.href = href;
      if (crossOrigin) {
        link.crossOrigin = crossOrigin;
      }
      document.head.appendChild(link);
    });
  }, [shouldLoad]);
}

const App: React.FC = () => {
  const location = useLocation();
  const onAdminRoute =
    location.pathname === "/admin" || location.pathname.startsWith("/admin/");
  const onOneuraProductSite =
    typeof window !== "undefined" &&
    isOneuraProductSite(window.location.hostname, location.pathname);
  const isOneuraRoute =
    location.pathname === "/oneura" || location.pathname.startsWith("/oneura/");
  useOneuraFont(onOneuraProductSite || isOneuraRoute);
  useOneuraWebAnalytics(onOneuraProductSite);

  const shellClassName = onOneuraProductSite
    ? "site-shell oneura-site"
    : "site-shell";

  return (
    <div className={shellClassName}>
      {!onAdminRoute && (onOneuraProductSite ? <OneuraNavbar /> : <Navbar />)}

      <div className="page-container">
        {onOneuraProductSite ? (
          <OneuraLocaleProvider>
            <OneuraHreflang />
            <OneuraProductSiteRoutes />
          </OneuraLocaleProvider>
        ) : (
          <StratoSiteRoutes />
        )}
      </div>

      {onOneuraProductSite && !onAdminRoute ? <OneuraFooter /> : null}
      {onOneuraProductSite && !onAdminRoute ? <CookieConsent /> : null}
    </div>
  );
};

export default App;
