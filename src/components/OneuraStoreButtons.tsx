import React from "react";
import googlePlay from "../assets/images/google-play.png";
import appStore from "../assets/images/app-store.png";
import {
  ONEURA_APP_STORE_URL,
  ONEURA_GOOGLE_PLAY_URL,
} from "../constants/oneuraStore";
import "./OneuraStoreButtons.css";

export type OneuraStoreButtonsProps = {
  /** Firebase Analytics `link_placement` (via data-analytics-placement). */
  analyticsPlacement: string;
  /** Optional plan id, e.g. free, annual, monthly, lifetime. */
  analyticsPlan?: string;
  /** Short line above the badges on subscription cards. */
  ctaLabel?: string;
  compact?: boolean;
  className?: string;
};

const OneuraStoreButtons: React.FC<OneuraStoreButtonsProps> = ({
  analyticsPlacement,
  analyticsPlan,
  ctaLabel,
  compact = false,
  className = "",
}) => {
  const sharedAnchorProps = {
    target: "_blank" as const,
    rel: "noopener noreferrer",
    "data-analytics-placement": analyticsPlacement,
    ...(analyticsPlan ? { "data-analytics-plan": analyticsPlan } : {}),
  };

  return (
    <div
      className={`oneura-store-cta ${compact ? "oneura-store-cta--compact" : ""} ${className}`.trim()}
    >
      {ctaLabel ? <p className="oneura-store-cta-label">{ctaLabel}</p> : null}
      <div
        className={`store-buttons ${compact ? "store-buttons--compact" : ""}`}
        aria-label="Download Oneura"
      >
        <a
          href={ONEURA_GOOGLE_PLAY_URL}
          {...sharedAnchorProps}
          data-analytics-link="google_play"
          aria-label="Download Oneura on Google Play"
        >
          <img
            src={googlePlay}
            alt="Get it on Google Play"
            className="store-badge"
          />
        </a>
        <a
          href={ONEURA_APP_STORE_URL}
          {...sharedAnchorProps}
          data-analytics-link="app_store"
          aria-label="Download Oneura on the App Store"
        >
          <img
            src={appStore}
            alt="Download on the App Store"
            className="store-badge"
          />
        </a>
      </div>
    </div>
  );
};

export default OneuraStoreButtons;
