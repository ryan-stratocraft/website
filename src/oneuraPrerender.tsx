import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import OneuraNavbar from "./components/OneuraNavbar";
import OneuraFooter from "./components/OneuraFooter";
import CookieConsent from "./components/CookieConsent";
import { OneuraProductSiteRoutes } from "./components/AppRoutes";

type OneuraPrerenderGlobal = typeof globalThis & {
  __ONEURA_PRERENDER__?: boolean;
};

export function renderOneuraRoute(pathname: string): string {
  (globalThis as OneuraPrerenderGlobal).__ONEURA_PRERENDER__ = true;

  return renderToString(
    <React.StrictMode>
      <MemoryRouter initialEntries={[pathname]}>
        <div className="site-shell oneura-site">
          <OneuraNavbar />
          <div className="page-container">
            <OneuraProductSiteRoutes />
          </div>
          <OneuraFooter />
          <CookieConsent />
        </div>
      </MemoryRouter>
    </React.StrictMode>,
  );
}
