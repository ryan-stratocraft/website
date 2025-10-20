import React from "react";
import "../styles/PolicyPages.css";

const OneuraTermsAndConditions: React.FC = () => {
  return (
    <div className="policy-container">
      <div className="policy-hero">
        <h1>Terms and Conditions</h1>
        <p className="last-updated">Last Updated: October 16, 2025</p>
      </div>

      <div className="policy-content">
        <section className="policy-section">
          <h2>About Oneura</h2>
          <p>
            Oneura is a product of Strato-Craft, a UK-based company. Oneura provides ambient sound and wellness 
            features designed to support relaxation, focus, and mindfulness. These services are provided "as is" 
            for your convenience and enjoyment.
          </p>
        </section>

        <section className="policy-section">
          <h2>No Medical Claims</h2>
          <p className="highlight">
            Oneura is <strong>NOT</strong> a medical device and does not provide medical advice, diagnosis, or 
            treatment. The app is designed for general wellness and relaxation purposes only. We make no 
            guarantees regarding health outcomes, sleep improvement, stress reduction, or any other medical or 
            therapeutic benefits.
          </p>
          <p>
            If you have any medical concerns, please consult a qualified healthcare professional. Do not rely on 
            Oneura as a substitute for professional medical advice.
          </p>
        </section>

        <section className="policy-section">
          <h2>Subscriptions</h2>
          <p>Oneura offers both free and premium subscription tiers:</p>
          <ul>
            <li><strong>Free Plan:</strong> Limited access to sounds and features</li>
            <li><strong>Oneura Plus:</strong> Full access to all sounds, features, and unlimited listening time</li>
          </ul>
          <p>
            Subscriptions are billed monthly or annually through your device's app store (Google Play Store or 
            Apple App Store). All subscription fees are non-refundable except as required by law. You may cancel 
            your subscription at any time through your app store account settings.
          </p>
        </section>

        <section className="policy-section">
          <h2>Account Deletion</h2>
          <p>
            You may request deletion of your account and personal data at any time through the app settings or 
            by contacting us at <a href="mailto:support@strato-craft.com">support@strato-craft.com</a>. We will 
            process deletion requests in accordance with UK and EU data protection laws.
          </p>
          <p className="highlight">
            <strong>Important:</strong> Deleting your Oneura account does <strong>NOT</strong> automatically 
            cancel your subscription. You must manually cancel your subscription through your device's app store 
            to stop future billing.
          </p>
        </section>

        <section className="policy-section">
          <h2>Intellectual Property</h2>
          <p>
            Oneura and all its content, features, and functionality are owned by Strato-Craft and are protected 
            by international copyright, trademark, and other intellectual property laws. You may not copy, modify, 
            distribute, sell, or reverse engineer any part of the app without our express written permission.
          </p>
          
          <h3>Sound Content:</h3>
          <p>Our sound library is curated from various sources, including:</p>
          <ul>
            <li>Open-source audio from <a href="https://pixabay.com/sound-effects" target="_blank" rel="noopener noreferrer">Pixabay</a></li>
            <li>Creative Commons audio from <a href="https://audio.com/echopulsemystic/" target="_blank" rel="noopener noreferrer">Audio.com contributors</a></li>
            <li>Sounds licensed for use in Oneura</li>
          </ul>
          <p>All sounds are used in accordance with their respective licenses and are curated, edited, and organized by Strato-Craft.</p>
        </section>

        <section className="policy-section">
          <h2>User Conduct</h2>
          <p>You agree to use Oneura only for lawful purposes and in accordance with these Terms. You may not:</p>
          <ul>
            <li>Attempt to gain unauthorized access to the app or our systems</li>
            <li>Use the app to harass, abuse, or harm others</li>
            <li>Upload or transmit viruses or malicious code</li>
            <li>Attempt to reverse engineer or copy the app</li>
            <li>Use the app in any way that violates applicable laws</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Strato-Craft and Oneura shall not be liable for any indirect, 
            incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether 
            incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses 
            resulting from:
          </p>
          <ul>
            <li>Your use or inability to use the app</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
            <li>Any bugs, viruses, or similar harmful components</li>
            <li>Any errors or omissions in any content</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of any material changes 
            via the app or email. Your continued use of Oneura after changes are made constitutes acceptance of 
            the new Terms.
          </p>
        </section>

        <section className="policy-section">
          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of England and Wales, United Kingdom. Any disputes arising from 
            these Terms or your use of Oneura shall be subject to the exclusive jurisdiction of the courts of 
            England and Wales.
          </p>
        </section>

        <section className="policy-section contact-section">
          <h2>Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us:</p>
          <div className="contact-box">
            <p><strong>Email:</strong> <a href="mailto:support@strato-craft.com">support@strato-craft.com</a></p>
            <p><strong>Company:</strong> Strato-Craft</p>
            <p><strong>Location:</strong> United Kingdom</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OneuraTermsAndConditions;

