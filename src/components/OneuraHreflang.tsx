import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { ONEURA_APP_ORIGIN } from "../constants/origins";
import { ONEURA_LOCALES } from "../i18n/localeConfig";
import { buildOneuraLocalizedPath, parseOneuraPath } from "../i18n/localePath";

/**
 * Injects `<link rel="alternate" hreflang="…">` tags for the current
 * public Oneura page across all supported locales.
 */
const OneuraHreflang: React.FC = () => {
  const location = useLocation();

  const { path, links } = useMemo(() => {
    const parsed = parseOneuraPath(location.pathname);
    return {
      path: parsed.path,
      links: ONEURA_LOCALES.map((locale) => ({
        hreflang: locale.hreflang,
        href: `${ONEURA_APP_ORIGIN}${buildOneuraLocalizedPath(parsed.path, locale)}`,
      })),
    };
  }, [location.pathname]);

  useEffect(() => {
    const existing = document.querySelectorAll('link[data-oneura-hreflang="true"]');
    existing.forEach((node) => node.remove());

    links.forEach(({ hreflang, href }) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hreflang;
      link.href = href;
      link.dataset.oneuraHreflang = "true";
      document.head.appendChild(link);
    });

    const defaultLink = document.createElement("link");
    defaultLink.rel = "alternate";
    defaultLink.hreflang = "x-default";
    defaultLink.href = `${ONEURA_APP_ORIGIN}${buildOneuraLocalizedPath(path, "en-GB")}`;
    defaultLink.dataset.oneuraHreflang = "true";
    document.head.appendChild(defaultLink);

    return () => {
      document
        .querySelectorAll('link[data-oneura-hreflang="true"]')
        .forEach((node) => node.remove());
    };
  }, [links, location.pathname]);

  return null;
};

export default OneuraHreflang;
