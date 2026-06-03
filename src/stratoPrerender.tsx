import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { StratoSiteRoutes } from "./components/AppRoutes";

/**
 * Server-side render a Strato-Craft company-site route to HTML so crawlers and
 * AI readers receive real content instead of an empty SPA shell. Mirrors the
 * Strato chrome rendered in App.tsx (Navbar + page-container, no Oneura footer
 * or cookie banner). Consumed at build time by scripts/prep-strato-dist.mjs.
 */
export function renderStratoRoute(pathname: string): string {
  return renderToString(
    <React.StrictMode>
      <MemoryRouter initialEntries={[pathname]}>
        <div className="site-shell">
          <Navbar />
          <div className="page-container">
            <StratoSiteRoutes />
          </div>
        </div>
      </MemoryRouter>
    </React.StrictMode>,
  );
}
