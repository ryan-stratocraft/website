import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getOffer,
  type PublicOfferView,
} from "../../../firebase/oneuraFunctions";
import googlePlay from "../../../assets/images/google-play.png";
import appStore from "../../../assets/images/app-store.png";
import OfferRegistrationForm from "./OfferRegistrationForm";

const APP_STORE_URL = "https://apps.apple.com/app/oneura/id6754253306";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.stratocraft.oneura";

/**
 * Renders a partner-offer landing page. Slug comes from the URL
 * (`/c/:slug`). Branding (logo, headline, body, accent colour, hero
 * image) is fetched from `getOffer` at runtime — adding a new partner
 * is purely a Firestore-doc operation.
 *
 * Stage 2 flow:
 *   1. Read offer by slug → render branding.
 *   2. User submits email via OfferRegistrationForm.
 *   3. registerForOffer writes /offer_registrations.
 *   4. Page transitions to a "thanks — opening the store" view that
 *      shows both store buttons and, on iOS/Android, auto-redirects to
 *      the appropriate store.
 *   5. Universal Link / App Link domain association on oneura.app
 *      intercepts /c/:slug when the app is already installed, so this
 *      page rarely appears for returning users.
 */
const PartnerLanding: React.FC = () => {
  const { slug: rawSlug } = useParams<{ slug: string }>();
  const slug = rawSlug?.trim() ?? "";
  const [view, setView] = useState<
    PublicOfferView | null | "loading" | "error"
  >("loading");
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!slug) {
      setView("error");
      return;
    }
    (async () => {
      try {
        const result = await getOffer(slug);
        if (!cancelled) setView(result);
      } catch {
        if (!cancelled) setView("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (view === "loading") {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
          Loading offer…
        </div>
      </Layout>
    );
  }

  if (view === "error" || view === null) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: 40 }}>
          <h2 style={{ color: "#fff", marginBottom: 8 }}>
            Offer not available
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: 24 }}>
            This partner offer is no longer active, or the link couldn't be
            recognised. Try the original QR / link from the partner.
          </p>
          <a
            href="https://oneura.app"
            style={{ color: "#A855F7", textDecoration: "none", fontWeight: 600 }}
          >
            Go to oneura.app →
          </a>
        </div>
      </Layout>
    );
  }

  const accent = view.branding.primaryColorHex ?? "#A855F7";

  return (
    <Layout accent={accent} heroImageUrl={view.branding.heroImageUrl}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        {view.branding.logoUrl && (
          <img
            src={view.branding.logoUrl}
            alt={view.partnerName ?? "Partner logo"}
            style={{ height: 48, marginBottom: 16 }}
          />
        )}
        <div
          style={{
            color: "#cbd5e1",
            fontSize: 12,
            letterSpacing: 1.4,
            fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {view.displayName ?? view.partnerName ?? "Oneura Partner Offer"}
        </div>
        <h1
          style={{
            color: "#fff",
            fontSize: 32,
            margin: "0 0 12px",
            lineHeight: 1.2,
          }}
        >
          {view.branding.headline || "Unlock Oneura"}
        </h1>
        {view.branding.body && (
          <p
            style={{
              color: "#cbd5e1",
              fontSize: 16,
              lineHeight: 1.5,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            {view.branding.body}
          </p>
        )}
      </div>

      {registered ? (
        <RegisteredView accent={accent} />
      ) : (
        <OfferRegistrationForm
          offerSlug={view.slug}
          primaryColorHex={view.branding.primaryColorHex}
          source={`web-${view.slug}`}
          onRegistered={() => setRegistered(true)}
        />
      )}

      {view.branding.finePrint && (
        <p
          style={{
            color: "#64748b",
            fontSize: 12,
            textAlign: "center",
            maxWidth: 480,
            margin: "24px auto 0",
          }}
        >
          {view.branding.finePrint}
        </p>
      )}
    </Layout>
  );
};

/** Best-effort UA sniff to pick the right store. Falls back to desktop. */
function detectStoreUrl(): { url: string | null; platform: "ios" | "android" | "desktop" } {
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

interface RegisteredViewProps {
  accent: string;
}

const RegisteredView: React.FC<RegisteredViewProps> = ({ accent }) => {
  const { url, platform } = detectStoreUrl();

  useEffect(() => {
    if (!url) return;
    // Small delay so the user can see the confirmation message + the
    // 3-step roadmap before the store opens. On iOS Safari this also
    // gives the page time to finish painting before the navigation.
    const t = window.setTimeout(() => {
      window.location.href = url;
    }, 2200);
    return () => window.clearTimeout(t);
  }, [url]);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          padding: "20px 24px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${accent}55`,
          marginBottom: 20,
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
          You're registered.
        </div>
        <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.5 }}>
          {platform === "desktop"
            ? "Open this page on your phone to install Oneura, or use the buttons below."
            : "Opening the app store in a moment so you can install Oneura."}
        </div>
      </div>

      <NextStepsCard accent={accent} />

      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: 20,
          marginBottom: 8,
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
            style={{ height: 56 }}
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
            style={{ height: 56 }}
          />
        </a>
      </div>
    </div>
  );
};

/**
 * Explicit "what happens next" roadmap shown right after registration.
 *
 * The previous one-liner was too easy to skim past, leaving users
 * stranded on the home screen wondering where their offer went. This
 * walks them through the exact sequence the backend expects:
 *   1. install + open the app (link-out below)
 *   2. sign up with THIS email (we match on it)
 *   3. open Subscriptions inside the app → branded offer card appears
 *      with a personal code → tap Activate offer.
 */
const NextStepsCard: React.FC<{ accent: string }> = ({ accent }) => {
  const steps: { n: number; title: string; body: string }[] = [
    {
      n: 1,
      title: "Install Oneura",
      body: "Use the App Store or Google Play buttons below to download.",
    },
    {
      n: 2,
      title: "Sign up with this same email",
      body: "We match your offer to the email you just registered with — anything different won't attach.",
    },
    {
      n: 3,
      title: "Open Subscriptions in the app",
      body: "Your branded offer card appears at the top with a personal code. Tap Activate offer to redeem at the discounted price.",
    },
  ];

  return (
    <div
      style={{
        textAlign: "left",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "16px 18px",
      }}
    >
      <div
        style={{
          color: "#cbd5e1",
          fontSize: 11,
          letterSpacing: 1.4,
          fontWeight: 600,
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        What happens next
      </div>
      {steps.map((s) => (
        <div
          key={s.n}
          style={{
            display: "flex",
            gap: 12,
            marginBottom: s.n === steps.length ? 0 : 12,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              flex: "0 0 28px",
              width: 28,
              height: 28,
              borderRadius: 999,
              background: accent,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {s.n}
          </div>
          <div style={{ flex: "1 1 auto" }}>
            <div
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 2,
              }}
            >
              {s.title}
            </div>
            <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.45 }}>
              {s.body}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  accent?: string;
  heroImageUrl?: string | null;
}

const Layout: React.FC<LayoutProps> = ({ children, accent, heroImageUrl }) => {
  const gradient = accent
    ? `linear-gradient(180deg, ${accent}22 0%, #0B132B 50%, #0B132B 100%)`
    : "#0B132B";
  return (
    <div
      style={{
        minHeight: "100vh",
        background: heroImageUrl
          ? `linear-gradient(180deg, rgba(11,19,43,0.85) 0%, #0B132B 100%), url(${heroImageUrl}) center/cover`
          : gradient,
        color: "#fff",
        padding: "60px 20px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>{children}</div>
    </div>
  );
};

export default PartnerLanding;
