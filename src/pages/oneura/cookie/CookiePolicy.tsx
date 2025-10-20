import React from "react";
import "../styles/PolicyPages.css";

const OneuraCookiePolicy: React.FC = () => {
  return (
    <div className="policy-container">
      <div className="policy-hero">
        <h1>Cookie Policy</h1>
        <p className="last-updated">Last Updated: October 16, 2025</p>
      </div>

      <div className="policy-content">
        <section className="policy-section">
          <h2>Introduction</h2>
          <p>
            This Cookie Policy explains how Oneura, operated by Strato-Craft, uses cookies and similar tracking 
            technologies in our mobile application and website.
          </p>
        </section>

        <section className="policy-section">
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit a website or use an app. 
            They help websites and apps remember your preferences and improve your experience.
          </p>
        </section>

        <section className="policy-section">
          <h2>Our Cookie Usage</h2>
          <p className="highlight">
            <strong>Good news!</strong> Oneura does <strong>NOT</strong> use traditional cookies for advertising 
            or third-party tracking on our mobile app.
          </p>
          <p>
            We believe in respecting your privacy and keeping your experience clean and focused on relaxation.
          </p>
        </section>

        <section className="policy-section">
          <h2>Analytics We Use</h2>
          <p>We do use Firebase Analytics to understand how users interact with Oneura. This helps us:</p>
          <ul>
            <li>Understand which features are most popular</li>
            <li>Identify bugs and technical issues</li>
            <li>Improve app performance</li>
            <li>Make better decisions about new features</li>
          </ul>
          <p>
            Firebase Analytics collects <strong>anonymized data</strong> and does not personally identify you. 
            This data includes:
          </p>
          <ul>
            <li>Device type and operating system</li>
            <li>App screens visited</li>
            <li>Time spent in the app</li>
            <li>General location (country/region only)</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Website Cookies</h2>
          <p>
            Our website (strato-craft.com) may use minimal cookies to:
          </p>
          <ul>
            <li>Remember your cookie consent preferences</li>
            <li>Keep you logged in if you have an account</li>
            <li>Understand basic website traffic (via Google Analytics)</li>
          </ul>
          <p>
            We do <strong>NOT</strong> use cookies for:
          </p>
          <ul>
            <li>Targeted advertising</li>
            <li>Selling your data to third parties</li>
            <li>Tracking you across other websites</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Third-Party Services</h2>
          <p>Oneura uses the following third-party services that may collect data:</p>
          
          <h3>Firebase (Google)</h3>
          <p>
            Used for backend services, authentication, and analytics. Firebase may store small amounts of data 
            on your device to function properly.
          </p>

          <h3>RevenueCat</h3>
          <p>
            Used for managing subscriptions. RevenueCat may store subscription status information locally on 
            your device.
          </p>

          <h3>Google Play Services / App Store</h3>
          <p>
            Your device's app store may collect data according to their own policies. We do not control their 
            data collection practices.
          </p>
        </section>

        <section className="policy-section">
          <h2>Your Choices</h2>
          <p>You have control over your data:</p>
          <ul>
            <li>
              <strong>Disable Analytics:</strong> You can disable analytics tracking in your device settings 
              (usually under "Privacy" → "Analytics & Improvements")
            </li>
            <li>
              <strong>Clear App Data:</strong> You can clear all locally stored data by uninstalling and 
              reinstalling the app
            </li>
            <li>
              <strong>Opt Out of Targeted Ads:</strong> While Oneura doesn't use targeted ads, you can disable 
              ad personalization system-wide on your device in Settings → Privacy → Advertising
            </li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Data Retention</h2>
          <p>
            Analytics data collected through Firebase is automatically deleted after <strong>60 days</strong>. 
            We do not store long-term user behavior data.
          </p>
        </section>

        <section className="policy-section">
          <h2>Children's Privacy</h2>
          <p>
            Oneura is not intended for children under 13 (or 16 in the EU). We do not knowingly collect data 
            from children. If we discover that a child's data has been collected, we will delete it immediately.
          </p>
        </section>

        <section className="policy-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an 
            updated "Last Updated" date. Your continued use of Oneura after changes are made constitutes 
            acceptance of the updated policy.
          </p>
        </section>

        <section className="policy-section">
          <h2>More Information</h2>
          <p>For more details about how we handle your data, please see our:</p>
          <ul>
            <li><a href="/oneura/privacy-policy">Privacy Policy</a></li>
            <li><a href="/oneura/terms-and-conditions">Terms & Conditions</a></li>
          </ul>
        </section>

        <section className="policy-section contact-section">
          <h2>Contact Us</h2>
          <p>If you have questions about our use of cookies or tracking technologies, please contact us:</p>
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

export default OneuraCookiePolicy;

