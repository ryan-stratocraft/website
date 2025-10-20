import React from "react";
import "../styles/PolicyPages.css";

const OneuraPrivacyPolicy: React.FC = () => {
  return (
    <div className="policy-container">
      <div className="policy-hero">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: October 16, 2025</p>
      </div>

      <div className="policy-content">
        <section className="policy-section">
          <h2>Introduction</h2>
          <p>
            Strato-Craft ("we," "our," or "us") operates the Oneura mobile application. This Privacy Policy 
            explains how we collect, use, disclose, and protect your personal information in accordance with UK 
            and EU data protection laws, including the UK General Data Protection Regulation (UK GDPR) and the 
            EU General Data Protection Regulation (GDPR).
          </p>
        </section>

        <section className="policy-section">
          <h2>Information We Collect</h2>
          <p>We collect the following types of information:</p>
          
          <h3>1. Account Information:</h3>
          <ul>
            <li>Email address</li>
            <li>Name (if provided)</li>
            <li>Account creation date</li>
          </ul>

          <h3>2. Usage Data:</h3>
          <ul>
            <li>Sounds played and listening history</li>
            <li>Playlists created</li>
            <li>App usage statistics</li>
            <li>Device information (model, OS version)</li>
          </ul>

          <h3>3. Wellness Data (Optional):</h3>
          <ul>
            <li>Mood tracking entries</li>
            <li>Reflections and notes</li>
            <li>Sleep ratings</li>
          </ul>

          <h3>4. Subscription Data:</h3>
          <ul>
            <li>Subscription status and type</li>
            <li>Purchase history (processed by app stores)</li>
            <li>Payment information is <strong>NOT stored by us</strong> - it is handled exclusively by Google Play Store or Apple App Store</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>To provide and maintain the Oneura service</li>
            <li>To personalize your experience</li>
            <li>To process subscriptions and manage your account</li>
            <li>To send important updates about the app</li>
            <li>To improve our services and develop new features</li>
            <li>To comply with legal obligations</li>
          </ul>
          <p className="highlight">
            We do <strong>NOT</strong> sell your personal data to third parties. We do <strong>NOT</strong> use 
            your data for targeted advertising.
          </p>
        </section>

        <section className="policy-section">
          <h2>Data Storage and Security</h2>
          <p>
            Your data is stored securely using Google Firebase, which provides enterprise-grade security and 
            encryption. We implement appropriate technical and organizational measures to protect your personal 
            information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p>
            Your data is stored in secure data centers and is accessible only to authorized personnel who need 
            it to perform their job functions.
          </p>
        </section>

        <section className="policy-section">
          <h2>Data Sharing</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We use Firebase (Google) for backend services and RevenueCat 
              for subscription management. These providers are contractually obligated to protect your data.
            </li>
            <li>
              <strong>App Stores:</strong> Google Play Store and Apple App Store process subscription payments 
              and may collect their own data according to their privacy policies.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information if required by law or in response 
              to valid legal requests.
            </li>
          </ul>
          <p className="highlight">
            We do <strong>NOT</strong> share your personal data with advertisers or data brokers.
          </p>
        </section>

        <section className="policy-section">
          <h2>Your Rights (UK & EU Users)</h2>
          <p>Under UK GDPR and EU GDPR, you have the following rights:</p>
          <ul>
            <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
            <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
            <li><strong>Right to Restriction:</strong> Limit how we use your data</li>
            <li><strong>Right to Data Portability:</strong> Receive your data in a machine-readable format</li>
            <li><strong>Right to Object:</strong> Object to certain types of processing</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
          </ul>
          <p>
            To exercise these rights, contact us at <a href="mailto:support@strato-craft.com">support@strato-craft.com</a>. 
            We will respond within 30 days.
          </p>
        </section>

        <section className="policy-section">
          <h2>Data Retention</h2>
          <p>We retain your personal data only for as long as necessary to provide our services and comply with legal obligations:</p>
          <ul>
            <li><strong>Active accounts:</strong> Data retained while account is active</li>
            <li><strong>Deleted accounts:</strong> Data deleted within 30 days of account deletion</li>
            <li><strong>Legal requirements:</strong> Some data may be retained longer if required by law</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Children's Privacy</h2>
          <p>
            Oneura is not intended for children under the age of 13 (or 16 in the EU). We do not knowingly 
            collect personal information from children. If you believe we have collected information from a 
            child, please contact us immediately and we will delete it.
          </p>
        </section>

        <section className="policy-section">
          <h2>International Data Transfers</h2>
          <p>
            Your data may be transferred to and processed in countries outside the UK and EU, including the 
            United States (where Firebase servers are located). We ensure appropriate safeguards are in place, 
            such as Standard Contractual Clauses approved by the European Commission.
          </p>
        </section>

        <section className="policy-section">
          <h2>Cookies and Tracking</h2>
          <p>
            Oneura does not use cookies or third-party tracking technologies for advertising purposes. We use 
            Firebase Analytics to understand app usage, which collects anonymized data to help us improve the app.
          </p>
        </section>

        <section className="policy-section">
          <h2>Changes to Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes via 
            the app or email. Your continued use of Oneura after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="policy-section">
          <h2>Supervisory Authority</h2>
          <p>
            If you are located in the UK or EU and believe we have not handled your data properly, you have the 
            right to lodge a complaint with your local data protection authority:
          </p>
          <ul>
            <li><strong>UK:</strong> Information Commissioner's Office (ICO) - <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a></li>
            <li><strong>EU:</strong> Your national data protection authority</li>
          </ul>
        </section>

        <section className="policy-section contact-section">
          <h2>Contact Information</h2>
          <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
          <div className="contact-box">
            <p><strong>Email:</strong> <a href="mailto:support@strato-craft.com">support@strato-craft.com</a></p>
            <p><strong>Data Controller:</strong> Strato-Craft</p>
            <p><strong>Location:</strong> United Kingdom</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OneuraPrivacyPolicy;

