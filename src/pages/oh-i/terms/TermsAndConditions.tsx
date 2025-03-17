import React from "react";
import "./TermsAndConditions.css";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p><strong>Last Updated:</strong> March 17, 2025</p>

      <h2>1. Agreement to Our Legal Terms</h2>
      <p>
        Welcome to <strong>Oh-i</strong>, a dating app operated by <strong>Strato-Craft Ltd</strong> ("Company", "we", "us", or "our").
      </p>
      <p>
        By accessing Oh-i via our website (<a href="https://strato-craft.com" target="_blank" rel="noopener noreferrer">strato-craft.com</a>) or mobile application, you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use immediately.
      </p>

      <h2>2. Company Information</h2>
      <ul>
        <li><strong>Company Name:</strong> Strato-Craft Ltd</li>
        <li><strong>Company Number:</strong> 15619171</li>
        <li><strong>Registered Address:</strong> 1 Springfield Rise, Horsforth, Leeds, West Yorkshire, LS18 5DS</li>
        <li><strong>Contact Email:</strong> <a href="mailto:ryan@strato-craft.com">ryan@strato-craft.com</a></li>
      </ul>

      <h2>3. Eligibility</h2>
      <ul>
        <li>You must be at least <strong>18 years old</strong> to use Oh-i.</li>
        <li>By creating an account, you confirm that you have not been convicted of any sexual offenses.</li>
        <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
      </ul>

      <h2>4. User Registration & Account Security</h2>
      <ul>
        <li>You must provide accurate and up-to-date information.</li>
        <li>You are responsible for keeping your account credentials secure.</li>
        <li>We are not responsible for unauthorized access to your account.</li>
      </ul>

      <h2>5. Subscription Plans & Payments</h2>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Features</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Free</td>
            <td>£0</td>
            <td>Basic features, limited likes, ads enabled</td>
          </tr>
          <tr>
            <td>Plus</td>
            <td>£3.99/month</td>
            <td>No ads, extra likes, profile boosts</td>
          </tr>
          <tr>
            <td>Premium</td>
            <td>£6.00/month</td>
            <td>All features unlocked, unlimited likes, super likes</td>
          </tr>
        </tbody>
      </table>
      <p>Subscriptions renew automatically unless canceled before the renewal date.</p>

      <h2>6. Refunds & Cancellation Policy</h2>
      <ul>
        <li><strong>All purchases are final</strong> unless required by law.</li>
        <li>Users may cancel subscriptions via their Google Play or Apple settings.</li>
        <li>Refunds are only available for accidental duplicate purchases.</li>
      </ul>

      <h2>7. Prohibited Activities</h2>
      <p>By using Oh-i, you agree not to:</p>
      <ul>
        <li>Harass, stalk, or threaten other users.</li>
        <li>Share explicit, hateful, or discriminatory content.</li>
        <li>Use bots, automation, or fake accounts.</li>
        <li>Engage in fraudulent activities, scams, or phishing attempts.</li>
        <li>Impersonate another person or misrepresent your identity.</li>
      </ul>

      <h2>8. Tracking & Location Services</h2>
      <ul>
        <li>Users can opt-in for location tracking for matchmaking and safety features.</li>
        <li>If activated, the date tracking feature may allow emergency contacts to view your last known location.</li>
        <li>We do not share location data without consent unless legally required.</li>
      </ul>

      <h2>9. Third-Party Advertising & Data Collection</h2>
      <p>We work with third-party services such as:</p>
      <ul>
        <li><strong>Google Ads</strong></li>
        <li><strong>Facebook Pixel</strong></li>
        <li><strong>Firebase Analytics</strong></li>
      </ul>
      <p>Users can opt out of targeted ads through these platforms.</p>

      <h2>10. Copyright & Intellectual Property</h2>
      <ul>
        <li>We own all rights to our logo, branding, and platform content.</li>
        <li>Users must not reproduce, distribute, or modify our content without permission.</li>
        <li>Copyright infringement can result in legal action.</li>
      </ul>

      <h2>11. Privacy Policy</h2>
      <p>Our privacy policy outlines how we handle user data. Read it here: <a href="https://strato-craft.com/oh-i/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></p>

      <h2>12. Dispute Resolution & Arbitration</h2>
      <p>All disputes shall be resolved under UK law. Users agree to resolve disputes via arbitration before pursuing legal action.</p>

      <h2>13. Limitation of Liability</h2>
      <ul>
        <li>We are not responsible for user interactions outside of the app.</li>
        <li>If you experience harassment, fraud, or misconduct, we are <strong>not liable</strong>.</li>
        <li>Users assume all risk when meeting others from the platform.</li>
      </ul>

      <h2>14. Termination of Services</h2>
      <ul>
        <li>We reserve the right to suspend or terminate accounts for violating our policies.</li>
        <li>Terminated users may not create new accounts.</li>
      </ul>

      <h2>15. Changes to These Terms</h2>
      <p>We may update these terms periodically. Continued use of Oh-i constitutes agreement to the changes.</p>

      <h2>16. Contact Information</h2>
      <p>
        <strong>Email:</strong> <a href="mailto:ryan@strato-craft.com">ryan@strato-craft.com</a><br />
        <strong>Address:</strong> 1 Springfield Rise, Horsforth, Leeds, West Yorkshire, LS18 5DS
      </p>
    </div>
  );
};

export default TermsAndConditions;
