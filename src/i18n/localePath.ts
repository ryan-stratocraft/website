import {
  DEFAULT_ONEURA_LOCALE,
  findOneuraLocale,
  findOneuraLocaleByUrlPrefix,
  getDefaultOneuraLocale,
  type OneuraLocaleConfig,
  type OneuraLocaleId,
} from "./localeConfig";

export type ParsedOneuraPath = {
  locale: OneuraLocaleConfig;
  /** Path without locale prefix, always starts with `/`. */
  path: string;
};

function normalizedPathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

/** Split `/fr/about` → locale `fr`, path `/about`. Default locale has no prefix. */
export function parseOneuraPath(pathname: string): ParsedOneuraPath {
  const normalized = normalizedPathname(pathname);
  const segments = normalized.split("/").filter(Boolean);
  const first = segments[0]?.toLowerCase();

  if (first) {
    const locale = findOneuraLocaleByUrlPrefix(first);
    if (locale) {
      const rest = segments.slice(1).join("/");
      return {
        locale,
        path: rest ? `/${rest}` : "/",
      };
    }
  }

  return {
    locale: getDefaultOneuraLocale(),
    path: normalized,
  };
}

export function localeUrlPrefix(locale: OneuraLocaleConfig | OneuraLocaleId): string {
  const config =
    typeof locale === "string" ? findOneuraLocale(locale) : locale;
  if (!config || !config.urlPrefix) return "";
  return `/${config.urlPrefix}`;
}

export function buildOneuraLocalizedPath(
  pathname: string,
  locale: OneuraLocaleConfig | OneuraLocaleId = DEFAULT_ONEURA_LOCALE,
): string {
  const config =
    typeof locale === "string"
      ? (findOneuraLocale(locale) ?? getDefaultOneuraLocale())
      : locale;
  const { path } = parseOneuraPath(pathname);
  const prefix = localeUrlPrefix(config);
  if (path === "/") return prefix || "/";
  return `${prefix}${path}`;
}

export function switchLocalePath(
  pathname: string,
  targetLocale: OneuraLocaleConfig | OneuraLocaleId,
): string {
  const { path } = parseOneuraPath(pathname);
  return buildOneuraLocalizedPath(path, targetLocale);
}
