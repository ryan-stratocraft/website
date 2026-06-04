/** Normalizes host for comparisons (drops leading `www.`). */
export function canonicalHostname(hostname: string): string {
  return hostname.replace(/^www\./i, "").toLowerCase();
}

export function isOneuraHostname(hostname: string): boolean {
  return canonicalHostname(hostname) === "oneura.app";
}

function isLocalPreviewHostname(hostname: string): boolean {
  const normalized = canonicalHostname(hostname);
  return (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "::1"
  );
}

function normalizedPathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

function isOneuraOnlyCleanPath(pathname: string): boolean {
  const normalized = normalizedPathname(pathname);
  if (
    normalized === "/admin" ||
    normalized.startsWith("/admin/") ||
    normalized.startsWith("/c/") ||
    normalized.startsWith("/d/")
  ) {
    return true;
  }

  return new Set([
    "/subscription",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cookie-policy",
    "/delete-data",
    "/sleep-sounds-white-noise",
    "/sensory-relaxation-app",
    "/sleep-app-for-busy-minds",
    "/neuro-friendly-sleep-app",
    "/mood-tracking-sleep-app",
    "/sleep-sounds-for-focus",
  ]).has(normalized);
}

function hasOneuraLocalPreviewOverride(hostname: string): boolean {
  if (typeof window === "undefined") {
    return (
      (globalThis as { __ONEURA_PRERENDER__?: boolean })
        .__ONEURA_PRERENDER__ === true
    );
  }

  if (!isLocalPreviewHostname(hostname)) {
    return false;
  }

  const previewKey = "oneura-local-preview";
  const params = new URLSearchParams(window.location.search);
  const site = params.get("site")?.toLowerCase();

  if (site === "oneura") {
    window.sessionStorage.setItem(previewKey, "true");
    return true;
  }

  if (site === "strato") {
    window.sessionStorage.removeItem(previewKey);
    return false;
  }

  return window.sessionStorage.getItem(previewKey) === "true";
}

/**
 * Production oneura.app uses clean root routes. In local dev, open
 * `/?site=oneura` once to preview the same standalone product-site mode.
 * Open `/?site=strato` to switch the local session back to Strato-Craft routes.
 * Oneura-only clean URLs are also recognized directly on localhost.
 */
export function isOneuraProductSite(
  hostname: string,
  pathname =
    typeof window === "undefined" ? "" : window.location.pathname,
): boolean {
  return (
    isOneuraHostname(hostname) ||
    hasOneuraLocalPreviewOverride(hostname) ||
    (isLocalPreviewHostname(hostname) && isOneuraOnlyCleanPath(pathname))
  );
}
