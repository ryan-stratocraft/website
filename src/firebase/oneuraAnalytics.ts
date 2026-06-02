import {
  getAnalytics,
  isSupported,
  logEvent,
  type Analytics,
} from "firebase/analytics";
import { STRATO_CRAFT_ORIGIN } from "../constants/origins";
import { firebaseApp } from "./firebase";

export const ONEURA_ANALYTICS_CONSENT_KEY = "cookieConsent";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.stratocraft.oneura";
const APP_STORE_URL = "https://apps.apple.com/app/oneura/id6754253306";

let analyticsInstance: Analytics | null = null;
let initPromise: Promise<Analytics | null> | null = null;

export function hasOneuraAnalyticsConsent(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return localStorage.getItem(ONEURA_ANALYTICS_CONSENT_KEY) === "true";
}

function analyticsEnabled(): boolean {
  return (
    !import.meta.env.DEV &&
    typeof window !== "undefined" &&
    hasOneuraAnalyticsConsent()
  );
}

export async function initOneuraAnalytics(): Promise<Analytics | null> {
  if (!analyticsEnabled()) {
    return null;
  }
  if (analyticsInstance) {
    return analyticsInstance;
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      if (!(await isSupported())) {
        return null;
      }
      analyticsInstance = getAnalytics(firebaseApp);
      logEvent(analyticsInstance, "app_started");
      return analyticsInstance;
    } catch {
      return null;
    }
  })();

  return initPromise;
}

export async function grantOneuraAnalyticsConsent(): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(ONEURA_ANALYTICS_CONSENT_KEY, "true");
  await initOneuraAnalytics();
  await trackOneuraPageView(
    `${window.location.pathname}${window.location.search}`,
  );
}

async function getAnalyticsInstance(): Promise<Analytics | null> {
  if (!analyticsEnabled()) {
    return null;
  }
  return initOneuraAnalytics();
}

export async function trackOneuraPageView(pagePath: string): Promise<void> {
  const analytics = await getAnalyticsInstance();
  if (!analytics) {
    return;
  }

  const pageTitle =
    typeof document !== "undefined" ? document.title : "Oneura";

  logEvent(analytics, "page_view", {
    page_path: pagePath,
    page_title: pageTitle,
    page_location:
      typeof window !== "undefined"
        ? `${window.location.origin}${pagePath}`
        : pagePath,
  });
}

export type OutboundLinkId =
  | "google_play"
  | "app_store"
  | "strato_craft"
  | "strato_support"
  | "facebook"
  | "instagram"
  | "support_email"
  | "external";

export function classifyOutboundLink(href: string): OutboundLinkId {
  const normalized = href.trim().toLowerCase();

  if (normalized.startsWith("mailto:")) {
    return "support_email";
  }

  try {
    const url = new URL(normalized, window.location.origin);

    if (url.hostname.includes("play.google.com")) {
      return "google_play";
    }
    if (url.hostname.includes("apps.apple.com")) {
      return "app_store";
    }
    if (url.hostname.includes("facebook.com")) {
      return "facebook";
    }
    if (url.hostname.includes("instagram.com")) {
      return "instagram";
    }
    if (
      url.origin === new URL(STRATO_CRAFT_ORIGIN).origin &&
      url.pathname.startsWith("/support")
    ) {
      return "strato_support";
    }
    if (url.origin === new URL(STRATO_CRAFT_ORIGIN).origin) {
      return "strato_craft";
    }
    if (
      url.hostname.includes("play.google.com") &&
      url.href.includes("stratocraft.oneura")
    ) {
      return "google_play";
    }
    if (url.hostname.includes("apps.apple.com") && url.pathname.includes("oneura")) {
      return "app_store";
    }
    if (url.href.startsWith(GOOGLE_PLAY_URL.toLowerCase())) {
      return "google_play";
    }
    if (url.href.startsWith(APP_STORE_URL.toLowerCase())) {
      return "app_store";
    }
  } catch {
    return "external";
  }

  return "external";
}

export function resolveClickPlacement(anchor: HTMLAnchorElement): string {
  if (anchor.dataset.analyticsPlacement) {
    return anchor.dataset.analyticsPlacement;
  }

  const zones: Array<[string, string]> = [
    [".oneura-navbar", "navbar"],
    [".oneura-footer", "footer"],
    [".oneura-store-cta", "subscription_plan"],
    [".store-buttons", "store_cta"],
    [".download-cta-section", "home_download_cta"],
    [".oneura-hero", "hero"],
    [".cookie-banner", "cookie_banner"],
  ];

  for (const [selector, placement] of zones) {
    if (anchor.closest(selector)) {
      return placement;
    }
  }

  return "page_content";
}

export function isTrackableOutboundLink(
  href: string,
  hostname: string,
): boolean {
  if (!href || href.startsWith("#")) {
    return false;
  }

  if (href.startsWith("mailto:")) {
    return true;
  }

  if (!href.startsWith("http://") && !href.startsWith("https://")) {
    return false;
  }

  try {
    const url = new URL(href);
    return url.hostname.replace(/^www\./i, "") !== hostname.replace(/^www\./i, "");
  } catch {
    return false;
  }
}

export async function trackOneuraOutboundClick(
  anchor: HTMLAnchorElement,
  pagePath: string,
): Promise<void> {
  const analytics = await getAnalyticsInstance();
  if (!analytics) {
    return;
  }

  const href = anchor.href;
  const linkId = anchor.dataset.analyticsLink ?? classifyOutboundLink(href);
  const placement = resolveClickPlacement(anchor);

  const planId = anchor.dataset.analyticsPlan;

  logEvent(analytics, "outbound_click", {
    link_id: linkId,
    link_placement: placement,
    link_url: href,
    page_path: pagePath,
    ...(planId ? { plan_id: planId } : {}),
  });
}
