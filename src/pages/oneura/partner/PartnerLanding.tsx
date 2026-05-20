import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCampaignByCode,
  type PublicCampaignView,
} from "../../../firebase/oneuraFunctions";
import googlePlay from "../../../assets/images/google-play.png";
import appStore from "../../../assets/images/app-store.png";
import PartnerLeadForm from "./PartnerLeadForm";

const APP_STORE_URL = "https://apps.apple.com/app/oneura/id6754253306";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.stratocraft.oneura";

/**
 * Renders a partner campaign landing page. The component is fully
 * generic — branding (logo, headline, body, CTA label, fine print,
 * accent colour, hero image) is fetched from Firestore via the
 * `getCampaignByCode` Cloud Function. Adding a new partner is a
 * Firestore-only operation; no code change required.
 *
 * Routes:
 *   /c/:code             — user followed a QR with a code in the URL
 *   /partner/:campaignId — user followed a branded campaign link
 *
 * Both render the same component; the param shape just differs.
 */
const PartnerLanding: React.FC = () => {
  const { code, campaignId } = useParams<{ code?: string; campaignId?: string }>();
  const [view, setView] = useState<PublicCampaignView | null | "loading" | "error">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await getCampaignByCode({ code, campaignId });
        if (!cancelled) setView(result);
      } catch {
        if (!cancelled) setView("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, campaignId]);

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
            This partner offer is no longer active, or the code couldn't be
            recognised. Try the original link or QR code from the partner.
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

      {/* Store buttons link to the actual app stores. Universal Links /
          App Links handle the "open installed app" case automatically
          when someone first navigates to /c/<code> from a QR or email —
          a click within oneura.app cannot re-trigger that interception,
          so we always send the user to the store from this surface. */}
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 24,
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

      {code && (
        <div
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            fontSize: 14,
            marginBottom: 24,
          }}
        >
          Your code:{" "}
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 16,
              color: "#fff",
              letterSpacing: 1.5,
              padding: "2px 8px",
              borderRadius: 4,
              background: "rgba(255,255,255,0.08)",
            }}
          >
            {code.toUpperCase()}
          </span>
        </div>
      )}

      {view.branding.finePrint && (
        <p
          style={{
            color: "#64748b",
            fontSize: 12,
            textAlign: "center",
            maxWidth: 480,
            margin: "0 auto 24px",
          }}
        >
          {view.branding.finePrint}
        </p>
      )}

      <PartnerLeadForm
        campaignId={view.campaignId}
        primaryColorHex={view.branding.primaryColorHex}
      />
    </Layout>
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
