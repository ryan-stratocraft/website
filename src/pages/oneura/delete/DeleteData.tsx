import React from "react";
import "../styles/PolicyPages.css";

const OneuraDeleteData: React.FC = () => {
  return (
    <div className="policy-container">
      <div className="policy-hero">
        <h1>Delete Your Data</h1>
        <p className="last-updated">We respect your right to be forgotten</p>
      </div>

      <div className="policy-content">
        <section className="policy-section">
          <h2>Your Right to Data Deletion</h2>
          <p>
            Under UK GDPR and EU GDPR, you have the right to request deletion of your personal data at any time. 
            We make this process simple and straightforward.
          </p>
        </section>

        <section className="policy-section">
          <h2>How to Delete Your Account</h2>
          
          <h3>Option 1: Delete Within the App</h3>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Open Oneura</h4>
                <p>Launch the Oneura app on your device</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Go to Settings</h4>
                <p>Tap the profile icon or settings gear in the app</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Find Account Settings</h4>
                <p>Scroll down to "Account Management" or "Privacy Settings"</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Select "Delete Account"</h4>
                <p>Tap "Delete My Account" and confirm your choice</p>
              </div>
            </div>
          </div>

          <h3>Option 2: Contact Support</h3>
          <p>
            If you can't access the app or prefer personal assistance, email us at{" "}
            <a href="mailto:support@strato-craft.com">support@strato-craft.com</a> with:
          </p>
          <ul>
            <li>Subject line: "Delete My Account"</li>
            <li>The email address associated with your Oneura account</li>
            <li>Confirmation that you want to permanently delete your account</li>
          </ul>
          <p>We'll process your request within <strong>48 hours</strong>.</p>
        </section>

        <section className="policy-section">
          <h2>What Gets Deleted</h2>
          <p>When you delete your account, we will permanently remove:</p>
          <ul>
            <li>Your email address and profile information</li>
            <li>Listening history and playlists</li>
            <li>Mood tracking entries and reflections</li>
            <li>App preferences and settings</li>
            <li>Any other personal data associated with your account</li>
          </ul>
          <p>
            All data is deleted within <strong>30 days</strong> of your deletion request. Some anonymized usage 
            statistics may be retained for analytics purposes, but these cannot be linked back to you.
          </p>
        </section>

        <section className="policy-section">
          <h2>⚠️ Important: Subscription Cancellation</h2>
          <div className="warning-box">
            <p className="highlight">
              <strong>Deleting your Oneura account does NOT automatically cancel your subscription!</strong>
            </p>
            <p>
              Your subscription is managed by Google Play Store or Apple App Store, not by Oneura directly. 
              To avoid future charges, you <strong>must</strong> cancel your subscription separately through 
              your app store.
            </p>
          </div>

          <h3>How to Cancel Your Subscription:</h3>
          
          <h4>On Android (Google Play):</h4>
          <ol>
            <li>Open the Google Play Store app</li>
            <li>Tap your profile icon → "Payments & subscriptions" → "Subscriptions"</li>
            <li>Find "Oneura Plus" and tap it</li>
            <li>Tap "Cancel subscription" and follow the prompts</li>
          </ol>

          <h4>On iOS (Apple App Store):</h4>
          <ol>
            <li>Open Settings on your iPhone or iPad</li>
            <li>Tap your name → "Subscriptions"</li>
            <li>Find "Oneura Plus" and tap it</li>
            <li>Tap "Cancel Subscription" and confirm</li>
          </ol>

          <p>
            After canceling, you'll keep access to Oneura Plus until the end of your current billing period.
          </p>
        </section>

        <section className="policy-section">
          <h2>What Happens After Deletion</h2>
          <ul>
            <li>You will immediately lose access to your Oneura account</li>
            <li>All your personal data will be permanently deleted within 30 days</li>
            <li>You can create a new account at any time if you change your mind</li>
            <li>Your previous data <strong>cannot</strong> be recovered after deletion</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Partial Data Deletion</h2>
          <p>
            If you don't want to delete your entire account but want to remove specific data:
          </p>
          <ul>
            <li><strong>Mood entries:</strong> Delete individual entries within the app</li>
            <li><strong>Playlists:</strong> Delete unwanted playlists in your library</li>
            <li><strong>Listening history:</strong> Contact support to clear your history</li>
          </ul>
          <p>
            Email us at <a href="mailto:support@strato-craft.com">support@strato-craft.com</a> if you need 
            help with partial data deletion.
          </p>
        </section>

        <section className="policy-section">
          <h2>Legal Retention</h2>
          <p>
            In some cases, we may be required by law to retain certain data even after account deletion, such as:
          </p>
          <ul>
            <li>Transaction records (for tax and accounting purposes)</li>
            <li>Data related to ongoing legal disputes</li>
            <li>Fraud prevention records</li>
          </ul>
          <p>
            These records are kept securely and in compliance with applicable laws, and will be deleted as soon 
            as the legal requirement expires.
          </p>
        </section>

        <section className="policy-section">
          <h2>Questions or Problems?</h2>
          <p>
            If you're having trouble deleting your account, have questions about the process, or want to confirm 
            your data has been deleted, please don't hesitate to reach out.
          </p>
        </section>

        <section className="policy-section contact-section">
          <h2>Contact Us</h2>
          <p>For assistance with account deletion or data privacy concerns:</p>
          <div className="contact-box">
            <p><strong>Email:</strong> <a href="mailto:support@strato-craft.com">support@strato-craft.com</a></p>
            <p><strong>Subject:</strong> "Delete My Account" or "Data Privacy Request"</p>
            <p><strong>Response Time:</strong> Within 48 hours</p>
          </div>
          <p className="small-text">
            We take data privacy seriously and will always respond promptly to your requests.
          </p>
        </section>
      </div>
    </div>
  );
};

export default OneuraDeleteData;

