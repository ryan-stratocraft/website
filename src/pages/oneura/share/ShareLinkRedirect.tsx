import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import googlePlay from "../../../assets/images/google-play.png";
import appStore from "../../../assets/images/app-store.png";
import oneuraLogo from "../../../assets/images/oneura/logo-color.png";
import {
  getShareLink,
  type PublicShareLinkView,
} from "../../../firebase/oneuraFunctions";
import OfferRegistrationForm from "../partner/OfferRegistrationForm";

/**
 * `/d/:slug` - share / acquisition redirect page. Sibling of the
 * partner-offer landing (`/c/:slug`).
 *
 * Flow:
 *   1. Render a navy Oneura splash immediately (no flash of white).
 *   2. Fire `recordShareClick` (beacon) with slug / `?src=` / platform.
 *   3. Load public share-link config via `getShareLink`.
 *   4. If `promoEnabled` + `offerSlug`: collect email via the same
 *      `registerForOffer` path as partner offers, then show store CTAs.
 *   5. Otherwise (plain acquisition link): redirect to App Store /
 *      Play Store, or show both buttons on desktop.
 *
 * Universal Links / App Links intercept this URL on installed devices
 * and route to the in-app DeepLinkService instead.
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
  const [link, setLink] = useState<
    PublicShareLinkView | null | "loading" | "error"
  >("loading");
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (!slug) {
      setLink("error");
      return;
    }
    recordClick({ slug, source, platform });

    let cancelled = false;
    (async () => {
      try {
        const view = await getShareLink(slug);
        if (!cancelled) setLink(view);
      } catch {
        if (!cancelled) setLink("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, source, platform]);

  const promoActive =
    typeof link === "object" &&
    link !== null &&
    link.promoEnabled &&
    !!link.offerSlug;

  // Plain share links (no promo): keep the original fast store bounce.
  useEffect(() => {
    if (link === "loading" || link === "error" || link === null) return;
    if (promoActive) return;
    if (!url) return;
    const t = window.setTimeout(() => {
      window.location.replace(url);
    }, 600);
    return () => window.clearTimeout(t);
  }, [link, promoActive, url]);

  // After promo email registration on mobile, bounce to the store.
  useEffect(() => {
    if (!registered || !promoActive || !url) return;
    const t = window.setTimeout(() => {
      window.location.replace(url);
    }, 900);
    return () => window.clearTimeout(t);
  }, [registered, promoActive, url]);

  if (!slug || link === "error" || link === null) {
    return (
      <Shell>
        <h1 style={titleStyle}>Link unavailable</h1>
        <p style={bodyStyle}>
          This share link is paused or couldn&apos;t be recognised. Try the
          original QR or post from Oneura socials.
        </p>
        <StoreButtons />
      </Shell>
    );
  }

  if (link === "loading") {
    return (
      <Shell>
        <h1 style={titleStyle}>Opening Oneura…</h1>
        <p style={bodyStyle}>Just a moment.</p>
      </Shell>
    );
  }

  if (promoActive && !registered) {
    return (
      <Shell>
        <h1 style={titleStyle}>50% off Oneura Plus</h1>
        <p style={bodyStyle}>
          Enter the email you&apos;ll use when you sign up in the app. We&apos;ll
          unlock the half-price offer on your subscriptions page after you
          install.
        </p>
        <div style={{ textAlign: "left", marginBottom: 20 }}>
          <OfferRegistrationForm
            offerSlug={link.offerSlug!}
            primaryColorHex="#A855F7"
            source={source}
            onRegistered={() => setRegistered(true)}
          />
        </div>
        <p style={{ ...bodyStyle, marginBottom: 0, fontSize: 12 }}>
          Already registered? Install below and sign up with the same email.
        </p>
        <div style={{ marginTop: 16 }}>
          <StoreButtons />
        </div>
      </Shell>
    );
  }

  if (promoActive && registered) {
    return (
      <Shell>
        <h1 style={titleStyle}>
          {url ? "You're registered — opening the store…" : "You're registered"}
        </h1>
        <p style={bodyStyle}>
          Install Oneura, then sign up with the <strong>same email</strong>.
          Open Profile → Membership to claim 50% off Plus.
        </p>
        <StoreButtons />
      </Shell>
    );
  }

  // Plain acquisition (no promo)
  return (
    <Shell>
      <h1 style={titleStyle}>
        {url ? "Opening Oneura…" : "Get Oneura"}
      </h1>
      <p style={bodyStyle}>
        {url
          ? "Taking you to the store so you can install the app."
          : "Calm sounds, sleep stories, and gentle wind-downs. Available on iOS and Android."}
      </p>
      <StoreButtons />
    </Shell>
  );
};

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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
      {children}
    </div>
  </div>
);

const StoreButtons: React.FC = () => (
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
);

const titleStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: 22,
  margin: "0 0 8px",
  fontWeight: 600,
  letterSpacing: 0.2,
};

const bodyStyle: React.CSSProperties = {
  color: "#e8eef7",
  fontSize: 14,
  margin: "0 0 24px",
  lineHeight: 1.55,
};

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
    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([payload], { type: "text/plain;charset=UTF-8" });
      const ok = navigator.sendBeacon(RECORD_URL, blob);
      if (ok) return;
    }
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
