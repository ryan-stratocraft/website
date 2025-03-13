import React from "react";
import "./PrivacyPolicy.css"; // ✅ Import page-specific CSS

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <p className="privacy-text">
        Your data is safe with us. We do not share your personal information.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
