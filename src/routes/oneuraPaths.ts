import { useOneuraLocale } from "../i18n/OneuraLocaleProvider";
import { buildOneuraLocalizedPath } from "../i18n/localePath";
import { isOneuraProductSite } from "../host";

export type OneuraPageSlug =
  | "about"
  | "faq"
  | "subscription"
  | "privacy-policy"
  | "terms-and-conditions"
  | "cookie-policy"
  | "delete-data"
  | "sleep-sounds-white-noise"
  | "sensory-relaxation-app"
  | "sleep-app-for-busy-minds"
  | "neuro-friendly-sleep-app"
  | "mood-tracking-sleep-app"
  | "sleep-sounds-for-focus"
  | "best-sleep-app-for-busy-minds"
  | "white-noise-pink-noise-rain-sounds"
  | "sleep-app-adhd-neurodivergent"
  | "oneura-vs-calm"
  | "oneura-vs-bettersleep"
  | "oneura-vs-headspace"
  | "best-free-sleep-sounds-app"
  | "sleep-sounds-sensory-overload";

function currentHostname(): string {
  if (typeof window === "undefined") return "";
  return window.location.hostname;
}

/** Whether a path should use clean oneura.app-style URLs (not /oneura/ prefix). */
function usesCleanOneuraPath(pathname: string): boolean {
  return isOneuraProductSite(currentHostname(), pathname);
}

export function useOneuraPaths() {
  const { locale } = useOneuraLocale();

  return {
    homePath: () =>
      usesCleanOneuraPath("/")
        ? buildOneuraLocalizedPath("/", locale)
        : "/oneura",
    pagePath: (slug: OneuraPageSlug) => {
      const cleanPath = `/${slug}`;
      return usesCleanOneuraPath(cleanPath)
        ? buildOneuraLocalizedPath(cleanPath, locale)
        : `/oneura/${slug}`;
    },
  };
}

/** @deprecated Prefer {@link useOneuraPaths} for locale-aware links. */
export function oneuraPagePath(slug: OneuraPageSlug): string {
  const cleanPath = `/${slug}`;
  if (usesCleanOneuraPath(cleanPath)) return cleanPath;
  return `/oneura/${slug}`;
}

/** @deprecated Prefer {@link useOneuraPaths} for locale-aware links. */
export function oneuraHomePath(): string {
  if (usesCleanOneuraPath("/")) return "/";
  return "/oneura";
}

/**
 * Universal Link / App Link for a partner-offer slug. Always anchored
 * at oneura.app so that iOS / Android can match the domain association
 * regardless of the page the user is currently viewing.
 */
export function universalOfferLink(slug: string): string {
  return `https://oneura.app/c/${encodeURIComponent(slug)}`;
}

/**
 * In-website route for the partner landing page. Local navigation only
 * (e.g. from the home page to the landing); for deep linking into the
 * mobile app use {@link universalOfferLink}.
 */
export function partnerOfferWebPath(slug: string): string {
  return `/c/${encodeURIComponent(slug)}`;
}

/** Admin section paths - same on both hostnames. */
export function adminOffersListPath(): string {
  return "/admin/offers";
}

export function adminOfferDetailPath(slug: string): string {
  return `/admin/offers/${encodeURIComponent(slug)}`;
}

export function adminOfferCreatePath(): string {
  return "/admin/offers/new";
}

/**
 * Universal Link / App Link for a share link slug. Always anchored at
 * oneura.app so iOS / Android can match the domain association. The
 * optional `source` is appended as `?src=` so the recordShareClick
 * Cloud Function can attribute the click to a predefined source.
 */
export function universalShareLink(slug: string, source?: string): string {
  const base = `https://oneura.app/d/${encodeURIComponent(slug)}`;
  if (!source) return base;
  return `${base}?src=${encodeURIComponent(source)}`;
}

export function adminShareLinksListPath(): string {
  return "/admin/links";
}

export function adminShareLinkDetailPath(slug: string): string {
  return `/admin/links/${encodeURIComponent(slug)}`;
}

export function adminShareLinkCreatePath(): string {
  return "/admin/links/new";
}

export function adminShareLinkEditPath(slug: string): string {
  return `/admin/links/${encodeURIComponent(slug)}/edit`;
}
