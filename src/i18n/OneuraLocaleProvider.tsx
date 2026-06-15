import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import i18n from "./index";
import type { OneuraLocaleConfig } from "./localeConfig";
import { parseOneuraPath, type ParsedOneuraPath } from "./localePath";

const OneuraLocaleContext = createContext<ParsedOneuraPath | null>(null);

export function OneuraLocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const parsed = useMemo(
    () => parseOneuraPath(location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    void i18n.changeLanguage(parsed.locale.id);
    document.documentElement.lang = parsed.locale.id;
  }, [parsed.locale.id]);

  return (
    <OneuraLocaleContext.Provider value={parsed}>
      {children}
    </OneuraLocaleContext.Provider>
  );
}

export function useOneuraLocale(): ParsedOneuraPath {
  const context = useContext(OneuraLocaleContext);
  if (!context) {
    return parseOneuraPath(
      typeof window !== "undefined" ? window.location.pathname : "/",
    );
  }
  return context;
}

export function useOneuraLocaleConfig(): OneuraLocaleConfig {
  return useOneuraLocale().locale;
}
