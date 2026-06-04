import { isOneuraProductSite } from "../host";

function onProductSite(): boolean {
  if (typeof window === "undefined") {
    return isOneuraProductSite("");
  }

  return isOneuraProductSite(
    window.location.hostname,
    window.location.pathname,
  );
}

/**
 * On oneura.app: clean URLs (`/about`).
 * On strato-craft.com: nested under `/oneura` (`/oneura/about`).
 */
export function oneuraPagePath(
  slug:
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
    | "sleep-sounds-for-focus",
): string {
  if (onProductSite()) return `/${slug}`;
  return `/oneura/${slug}`;
}

/** Home: `/` on oneura.app, `/oneura` on Strato. */
export function oneuraHomePath(): string {
  if (onProductSite()) return "/";
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

/** Admin section paths — same on both hostnames. */
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
