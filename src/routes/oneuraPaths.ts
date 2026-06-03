import { isOneuraProductSite } from "../host";

function onProductSite(): boolean {
  if (typeof window === "undefined") {
    return isOneuraProductSite("");
  }

  return isOneuraProductSite(window.location.hostname);
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
