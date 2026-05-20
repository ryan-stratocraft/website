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
 * Universal Link / App Link for a partner code. Always anchored at
 * oneura.app so that iOS / Android can match the domain association
 * regardless of the page the user is currently viewing.
 */
export function universalCodeLink(code: string): string {
  return `https://oneura.app/c/${encodeURIComponent(code)}`;
}

/** Same idea but for a campaign id rather than a raw code. */
export function universalCampaignLink(campaignId: string): string {
  return `https://oneura.app/partner/${encodeURIComponent(campaignId)}`;
}

/**
 * In-website route for the partner landing page. Local navigation only
 * (e.g. from the home page to the landing); for deep linking into the
 * mobile app use {@link universalCodeLink} / {@link universalCampaignLink}.
 */
export function partnerCodeWebPath(code: string): string {
  return `/c/${encodeURIComponent(code)}`;
}

export function partnerCampaignWebPath(campaignId: string): string {
  return `/partner/${encodeURIComponent(campaignId)}`;
}
