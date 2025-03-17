import React, { useState } from "react";
import "./CookieConsent.css";

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(!localStorage.getItem("cookieConsent"));

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="cookie-banner">
        <p>
          We use cookies to enhance your experience. By using our site, you agree to our 
          <a href="/cookie-policy"> Cookie Policy</a>.
        </p>
        <button onClick={handleAccept}>Accept</button>
      </div>
    )
  );
};

export default CookieConsent;
