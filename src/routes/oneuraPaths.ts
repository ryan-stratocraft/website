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
