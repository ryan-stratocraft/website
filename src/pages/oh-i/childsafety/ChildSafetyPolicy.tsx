import React from "react";
import "./ChildSafetyPolicy.css";

const ChildSafetyPolicy: React.FC = () => {
  return (
    <div className="child-safety-container">
      <h1>Child Safety Policy</h1>
      <p><strong>Effective Date:</strong> March 25, 2025</p>

      <h2>1. Our Commitment</h2>
      <p>
        Strato-Craft Ltd, the operator of Oh-i, has a zero-tolerance policy for any form of child sexual abuse, exploitation, or harmful content. Our platform is strictly intended for users aged 18 and older. We implement proactive safety measures and respond swiftly to any violations.
      </p>

      <h2>2. Compliance with Laws & Platform Standards</h2>
      <ul>
        <li>We comply fully with UK child protection laws, as well as relevant international regulations.</li>
        <li>We adhere to Google Play's <a href="https://support.google.com/googleplay/android-developer/answer/9958765?hl=en" target="_blank" rel="noopener noreferrer">Child Safety Policies</a>.</li>
        <li>We do not knowingly collect or store any personal information from users under the age of 18.</li>
      </ul>

      <h2>3. Content Monitoring & AI Detection</h2>
      <p>
        Our moderation system uses a combination of automated AI tools and manual review to detect and remove:
      </p>
      <ul>
        <li>Sexual content involving minors (real or simulated)</li>
        <li>Exploitation, grooming, or inappropriate behavior toward underage individuals</li>
        <li>Fake age, identity, or age-masking attempts</li>
      </ul>

      <h2>4. User Reporting Tools</h2>
      <p>Users can report content or behavior that raises concern directly in-app through:</p>
      <ul>
        <li>Report user buttons</li>
        <li>Flagging messages or media</li>
        <li>Emailing <a href="mailto:support@strato-craft.com">support@strato-craft.com</a></li>
      </ul>

      <h2>5. Review and Enforcement Process</h2>
      <ul>
        <li>All reports are reviewed by trained moderators within 24 hours.</li>
        <li>Immediate account suspension or deletion occurs for any verified breaches.</li>
        <li>We cooperate with law enforcement when appropriate.</li>
      </ul>

      <h2>6. Education and Prevention</h2>
      <p>
        Oh-i promotes awareness of child safety through in-app prompts and user education. We encourage:
      </p>
      <ul>
        <li>Respectful interaction between users</li>
        <li>Clear boundary-setting features</li>
        <li>Regular safety reminders</li>
      </ul>

      <h2>7. Contact & Escalation</h2>
      <p>
        If you believe someone is impersonating a minor or engaging in predatory behavior, please contact us:
      </p>
      <p>
        <strong>Email:</strong> <a href="mailto:support@strato-craft.com">support@strato-craft.com</a><br />
        <strong>Address:</strong> 1 Springfield Rise, Horsforth, Leeds, West Yorkshire, LS18 5DS
      </p>
      <p>We will act swiftly and responsibly.</p>
    </div>
  );
};

export default ChildSafetyPolicy;
