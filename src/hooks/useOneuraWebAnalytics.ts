import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { canonicalHostname } from "../host";
import {
  hasOneuraAnalyticsConsent,
  initOneuraAnalytics,
  isTrackableOutboundLink,
  trackOneuraOutboundClick,
  trackOneuraPageView,
} from "../firebase/oneuraAnalytics";

/**
 * Page views and outbound link clicks for oneura.app (after cookie consent).
 */
export function useOneuraWebAnalytics(enabled: boolean): void {
  const location = useLocation();
  const pagePath = `${location.pathname}${location.search}`;

  useEffect(() => {
    if (!enabled || !hasOneuraAnalyticsConsent()) {
      return;
    }
    void initOneuraAnalytics();
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !hasOneuraAnalyticsConsent()) {
      return;
    }
    void trackOneuraPageView(pagePath);
  }, [enabled, pagePath]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const hostname = canonicalHostname(window.location.hostname);

    const onClick = (event: MouseEvent) => {
      if (!hasOneuraAnalyticsConsent()) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const href = anchor.getAttribute("href") ?? "";
      if (!isTrackableOutboundLink(href, hostname)) {
        return;
      }

      void trackOneuraOutboundClick(
        anchor,
        `${window.location.pathname}${window.location.search}`,
      );
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [enabled, pagePath]);
}
