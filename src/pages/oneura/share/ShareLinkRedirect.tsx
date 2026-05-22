import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import googlePlay from "../../../assets/images/google-play.png";
import appStore from "../../../assets/images/app-store.png";
import oneuraLogo from "../../../assets/images/oneura/logo-color.png";

/**
 * `/d/:slug` — share / acquisition redirect page. Sibling of the
 * partner-offer landing (`/c/:slug`), but stripped down: no Firestore
 * read, no branding payload, no email form. The page:
 *
 *   1. Renders a navy Oneura splash immediately (no flash of white).
 *   2. Fires `navigator.sendBeacon` (fallback `fetch(..., keepalive)`)
 *      to the `recordShareClick` Cloud Function with the slug, the
 *      `?src=` value, and a UA-derived platform bucket.
 *   3. Redirects to the App Store (iOS), Play Store (Android), or
 *      shows both store buttons (desktop).
 *
 * Universal Links / App Links intercept this URL on installed devices
 * and route to the in-app DeepLinkService instead — that's the
 * acquisition / re-engagement loop we're tracking.
 */
const APP_STORE_URL = "https://apps.apple.com/app/oneura/id6754253306";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.stratocraft.oneura";

const RECORD_URL =
  "https://europe-west2-oneura-app.cloudfunctions.net/recordShareClick";

const ShareLinkRedirect: React.FC = () => {
  const { slug: rawSlug } = useParams<{ slug: string }>();
  const slug = rawSlug?.trim() ?? "";
  const [searchParams] = useSearchParams();
  const source = searchParams.get("src");

  const [{ url, platform }] = useState(() => detectStoreUrl());

  useEffect(() => {
    if (!slug) return;
    recordClick({ slug, source, platform });

    // Tiny delay so the splash + logo are visibly painted before the
    // browser swaps to the store URL. Desktop visitors stay on the
    // page (no redirect target) and tap a button instead.
    if (!url) return;
    const t = window.setTimeout(() => {
      window.location.replace(url);
    }, 600);
    return () => window.clearTimeout(t);
  }, [slug, source, platform, url]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0B132B",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <img
          src={oneuraLogo}
          alt="Oneura"
          style={{
            width: 96,
            height: 96,
            marginBottom: 24,
            filter: "drop-shadow(0 0 24px rgba(168, 85, 247, 0.28))",
          }}
        />
        <h1
          style={{
            color: "#fff",
            fontSize: 22,
            margin: "0 0 8px",
            fontWeight: 600,
            letterSpacing: 0.2,
          }}
        >
          {url ? "Opening Oneura…" : "Get Oneura"}
        </h1>
        <p
          style={{
            color: "#cbd5e1",
            fontSize: 14,
            margin: "0 0 24px",
            lineHeight: 1.5,
          }}
        >
          {url
            ? "Taking you to the store so you can install the app."
            : "Calm sounds, sleep stories, and gentle wind-downs. Available on iOS and Android."}
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block" }}
          >
            <img
              src={appStore}
              alt="Download Oneura on the App Store"
              style={{ height: 48 }}
            />
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block" }}
          >
            <img
              src={googlePlay}
              alt="Get Oneura on Google Play"
              style={{ height: 48 }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

/**
 * Best-effort UA sniff. Mirrors the buckets the recordShareClick
 * Cloud Function accepts (ios / android / desktop / other). Falls
 * back to desktop on weird/missing UAs — these users still see the
 * page and can tap a store button manually, so the analytics bucket
 * for them is harmless.
 */
function detectStoreUrl(): {
  url: string | null;
  platform: "ios" | "android" | "desktop";
} {
  if (typeof navigator === "undefined") return { url: null, platform: "desktop" };
  const ua = navigator.userAgent ?? "";
  if (/iPad|iPhone|iPod/.test(ua)) {
    return { url: APP_STORE_URL, platform: "ios" };
  }
  if (/android/i.test(ua)) {
    return { url: PLAY_STORE_URL, platform: "android" };
  }
  return { url: null, platform: "desktop" };
}

/**
 * Fire-and-forget click record. Uses `sendBeacon` when available so
 * the request survives an immediate window.location.replace, falls
 * back to a `fetch(..., keepalive: true)` for browsers without it.
 * Always swallows errors — the user's redirect must never block on
 * an analytics path.
 */
function recordClick({
  slug,
  source,
  platform,
}: {
  slug: string;
  source: string | null;
  platform: "ios" | "android" | "desktop";
}) {
  if (!slug) return;
  const payload = JSON.stringify({
    slug,
    source: source ?? null,
    platform,
  });

  try {
    // Browsers ignore Content-Type on Blob beacons (always treats as
    // CORS-safelisted). The Cloud Function parses string bodies as
    // JSON regardless of header, so this matches what the in-app
    // http.post sends.
    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([payload], { type: "text/plain;charset=UTF-8" });
      const ok = navigator.sendBeacon(RECORD_URL, blob);
      if (ok) return;
    }
    // Fallback path — keepalive lets fetch outlive the page navigation.
    void fetch(RECORD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
      mode: "cors",
    }).catch(() => {
      /* analytics best-effort, ignore */
    });
  } catch {
    /* analytics best-effort, ignore */
  }
}

export default ShareLinkRedirect;
