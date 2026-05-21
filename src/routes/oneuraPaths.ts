import { isOneuraHostname } from "../host";

function onProductSite(): boolean {
  return (
    typeof window !== "undefined" &&
    isOneuraHostname(window.location.hostname)
  );
}

/**
 * On oneura.app: clean URLs (`/about`).
 * On strato-craft.com: nested under `/oneura` (`/oneura/about`).
 */
export function oneuraPagePath(
  slug:
    | "about"
    | "subscription"
    | "privacy-policy"
    | "terms-and-conditions"
    | "cookie-policy"
    | "delete-data",
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
