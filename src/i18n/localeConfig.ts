import localesJson from "./locales.config.json";

export type OneuraLocaleId = (typeof localesJson)[number]["id"];

export type OneuraLocaleConfig = {
  id: OneuraLocaleId;
  /** Empty string for the default locale (en-GB). */
  urlPrefix: string;
  hreflang: string;
  ogLocale: string;
  label: string;
};

export const ONEURA_LOCALES = localesJson as OneuraLocaleConfig[];

export const DEFAULT_ONEURA_LOCALE: OneuraLocaleId = "en-GB";

export const ONEURA_LOCALE_URL_PREFIXES = ONEURA_LOCALES.map((locale) =>
  locale.urlPrefix.toLowerCase(),
).filter(Boolean);

export function findOneuraLocale(id: string): OneuraLocaleConfig | undefined {
  return ONEURA_LOCALES.find((locale) => locale.id === id);
}

export function findOneuraLocaleByUrlPrefix(
  urlPrefix: string,
): OneuraLocaleConfig | undefined {
  const normalized = urlPrefix.toLowerCase();
  return ONEURA_LOCALES.find(
    (locale) => locale.urlPrefix.toLowerCase() === normalized,
  );
}

export function getDefaultOneuraLocale(): OneuraLocaleConfig {
  return (
    findOneuraLocale(DEFAULT_ONEURA_LOCALE) ??
    ONEURA_LOCALES[0]!
  );
}
