import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> (02/03/2025)</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to <strong>Oh-i</strong>, a personality-driven and place-based dating app operated by <strong>Strato-Craft Ltd 15619171</strong> ("Company", "we", "us", "our").
      </p>
      <p>
        This Privacy Policy explains how we collect, use, store, and protect your data when you use our website (<a href="https://strato-craft.com" target="_blank" rel="noopener noreferrer">strato-craft.com</a>) and the Oh-i app.
      </p>
      <p>
        By using our services, you agree to this Privacy Policy. If you do not agree, please discontinue use.
      </p>

      <h2>2. Information We Collect</h2>
      <h3>A. Information You Provide</h3>
      <ul>
        <li><strong>Account & Profile Info:</strong> Name, age, gender, orientation, photos, bio.</li>
        <li><strong>Location Data (if enabled):</strong> Used for matching nearby users.</li>
        <li><strong>User Interactions:</strong> Messages, likes, superlikes, reports.</li>
        <li><strong>Subscriptions & Purchases:</strong> In-app purchases, membership tiers.</li>
      </ul>

      <h3>B. Information Collected Automatically</h3>
      <ul>
        <li><strong>Device & Log Data:</strong> IP address, device type, OS, crash reports.</li>
        <li><strong>Usage Data:</strong> Features used, time spent, app activity.</li>
        <li><strong>Cookies & Tracking:</strong> Google Analytics, Firebase, Facebook Pixel.</li>
      </ul>

      <h3>C. Information from Third Parties</h3>
      <ul>
        <li><strong>Social Logins:</strong> Google, Apple, Facebook login details.</li>
        <li><strong>Payment Processing:</strong> Stripe, Apple Pay, Google Pay.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <ul>
        <li>Match & Recommend Users.</li>
        <li>Personalize Experience.</li>
        <li>Moderate Content & Safety.</li>
        <li>Secure the Platform.</li>
        <li>Analyze & Improve the App.</li>
        <li>Marketing & Advertising.</li>
      </ul>

      <h2>4. How We Share Your Information</h2>
      <h3>A. With Other Users</h3>
      <p>Your profile and interactions are visible to matches.</p>

      <h3>B. With Third-Party Services</h3>
      <p>Payment processors, analytics providers, and advertising partners.</p>

      <h3>C. Legal & Safety Requirements</h3>
      <p>Data may be disclosed to law enforcement for safety investigations.</p>

      <h2>5. Data Retention & Deletion</h2>
      <p><strong>Deleted Accounts:</strong> Your data is removed within 30 days.</p>
      <p><strong>Request Deletion:</strong> Contact us at <a href="mailto:support@strato-craft.com">support@strato-craft.com</a>.</p>

      <h2>6. User Controls & Privacy Settings</h2>
      <ul>
        <li>Privacy Settings – Control who sees your profile.</li>
        <li>Blocking & Reporting – Block or report unwanted users.</li>
        <li>Location Sharing – Enable/disable location features.</li>
      </ul>

      <h2>7. Security Measures</h2>
      <ul>
        <li>Encryption for passwords and messages.</li>
        <li>Two-Factor Authentication (2FA) available.</li>
        <li>AI moderation to detect fake profiles & harmful content.</li>
      </ul>

      <h2>8. Children's Privacy</h2>
      <p><strong>Oh-i is for users aged 18+ only.</strong> Accounts found to belong to minors will be removed.</p>

      <h2>9. International Data Transfers</h2>
      <p>Your data may be processed outside the UK in compliance with GDPR laws.</p>

      <h2>10. Updates to This Privacy Policy</h2>
      <p>We may update this policy periodically. Updates will be posted here.</p>

      <h2>11. Contact Information</h2>
      <p><strong>Email:</strong> <a href="mailto:support@strato-craft.com">support@strato-craft.com</a></p>
      <p><strong>Address:</strong> 1 Springfield Rise, Horsforth, Leeds, West Yorkshire, LS18 5DS</p>
    </div>
  );
};

export default PrivacyPolicy;
