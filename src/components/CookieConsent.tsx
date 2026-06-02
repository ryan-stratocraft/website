import React, { useEffect, useState } from "react";
import { grantOneuraAnalyticsConsent } from "../firebase/oneuraAnalytics";
import "./CookieConsent.css";

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    setIsVisible(consent !== "true" && consent !== "rejected");
  }, []);

  const handleAccept = () => {
    void grantOneuraAnalyticsConsent();
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="cookie-banner">
        <p>
          We use cookies for basic analytics to improve the site. See our{" "}
          <a href="/cookie-policy">Cookie Policy</a>.
        </p>
        <button type="button" onClick={handleReject}>
          Essential only
        </button>
        <button type="button" onClick={handleAccept}>
          Accept
        </button>
      </div>
    )
  );
};

export default CookieConsent;
