import React from "react";
import { Link } from "react-router-dom";
import "../styles/PolicyPages.css";

const StratoPrivacyPolicy: React.FC = () => {
  return (
    <div className="strato-policy-container">
      <div className="strato-policy-hero">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: September 13, 2026</p>
      </div>

      <div className="strato-policy-content">
        <section className="strato-policy-section">
          <h2>Introduction</h2>
          <p>
            Strato-Craft Ltd (&quot;Strato-Craft,&quot; &quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;) respects your privacy. This Privacy Policy explains how we collect, use,
            disclose, and safeguard personal information when you visit our company website at{" "}
            <a href="https://strato-craft.com" target="_blank" rel="noopener noreferrer">
              strato-craft.com
            </a>{" "}
            and related company pages (collectively, the &quot;Website&quot;).
          </p>
          <p>
            By using the Website, you agree to the collection, use, and disclosure practices
            described in this Privacy Policy. Your use of the Website is also subject to our{" "}
            <Link to="/terms">Terms &amp; Conditions</Link>.
          </p>
          <p>
            <strong>Product-specific privacy.</strong> Our individual products (such as Oneura,
            Oh-i, and IAC VR) have their own privacy policies that apply when you use those
            products. Please refer to each product&apos;s privacy documentation for details on how
            personal data is handled within those services.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>Data controller</h2>
          <p>The data controller for the Website is:</p>
          <div className="strato-contact-box">
            <p>
              <strong>Strato-Craft Ltd</strong>
            </p>
            <p>
              <strong>Company Number:</strong> 15619171
            </p>
            <p>
              <strong>Registered Office:</strong> 1 Springfield Rise, Horsforth, Leeds, West
              Yorkshire, LS18 5DS, United Kingdom
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@strato-craft.com">support@strato-craft.com</a>
            </p>
          </div>
        </section>

        <section className="strato-policy-section">
          <h2>Information we collect</h2>
          <p>
            When you visit the Website, we may collect the following types of information:
          </p>

          <h3>A. Information you provide</h3>
          <ul>
            <li>
              <strong>Contact information:</strong> If you contact us through the Website (for
              example, via our support form or email), we collect the information you provide, such
              as your name, email address, and the contents of your message.
            </li>
          </ul>

          <h3>B. Information collected automatically</h3>
          <ul>
            <li>
              <strong>Device and technical data:</strong> We may collect information about the
              device and browser you use to access the Website, including device type, operating
              system, browser type, screen resolution, and language settings.
            </li>
            <li>
              <strong>Usage data:</strong> We may collect information about how you interact with
              the Website, such as pages visited, time spent, and navigation paths.
            </li>
            <li>
              <strong>IP address:</strong> We may collect your IP address, which may be used to
              approximate your general location (country or region) for analytics purposes.
            </li>
          </ul>
        </section>

        <section className="strato-policy-section">
          <h2>Cookies and similar technologies</h2>
          <p>
            The Website may use cookies and similar technologies for essential functionality, to
            remember preferences (such as cookie consent), and to measure basic traffic and
            performance.
          </p>
          <p>
            <strong>Types of cookies we may use:</strong>
          </p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> Required for the Website to function properly.
            </li>
            <li>
              <strong>Analytics cookies:</strong> Help us understand how visitors use the Website so
              we can improve it. We may use third-party analytics services that set their own
              cookies.
            </li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling certain cookies may
            affect Website functionality.
          </p>
          <p className="highlight">
            We do <strong>not</strong> sell your personal information. We do <strong>not</strong>{" "}
            use your personal information for third-party targeted advertising.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>How we use information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To operate, maintain, and improve the Website</li>
            <li>To respond to your enquiries and provide support</li>
            <li>To understand how visitors use the Website and identify areas for improvement</li>
            <li>To detect, prevent, and address security issues and fraud</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="strato-policy-section">
          <h2>How we share information</h2>
          <p>
            We do not sell, rent, or lease your personal information. We may share information in
            the following circumstances:
          </p>
          <ul>
            <li>
              <strong>Service providers:</strong> We use third-party providers for hosting,
              analytics, and other services. These providers process information on our behalf under
              appropriate agreements.
            </li>
            <li>
              <strong>Legal compliance:</strong> We may disclose information if required by law,
              regulation, legal process, or governmental request.
            </li>
            <li>
              <strong>Business transfers:</strong> If we are involved in a merger, acquisition, or
              sale of assets, information may be transferred as part of that transaction.
            </li>
            <li>
              <strong>Protection of rights:</strong> We may disclose information to protect our
              rights, property, or safety, or that of our users or others.
            </li>
          </ul>
        </section>

        <section className="strato-policy-section">
          <h2>Data retention</h2>
          <p>
            We retain personal information only as long as reasonably necessary for the purposes
            described in this policy, or as required by law. Contact enquiries are typically
            retained for up to two years unless a longer retention is needed for ongoing
            correspondence or legal purposes.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>International data transfers</h2>
          <p>
            Strato-Craft is based in the United Kingdom. Your information may be processed in the
            UK, the European Economic Area, the United States, and other countries where we or our
            service providers operate. Where required, we use appropriate safeguards (such as
            Standard Contractual Clauses) for transfers from the UK/EEA to countries without an
            adequacy decision.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>Your rights and choices</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal
            information:
          </p>

          <h3>UK and EEA residents</h3>
          <p>
            Under the UK GDPR and EU GDPR, you may have rights to:
          </p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Rectify inaccurate information</li>
            <li>Request erasure of your information</li>
            <li>Restrict or object to certain processing</li>
            <li>Data portability</li>
            <li>Withdraw consent (where processing is based on consent)</li>
          </ul>

          <h3>U.S. residents</h3>
          <p>
            Depending on your state, you may have additional rights under state privacy laws,
            including rights to access, delete, or correct personal information. As noted above, we
            do not sell personal information or use it for cross-context behavioural advertising.
          </p>

          <h3>Exercising your rights</h3>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:support@strato-craft.com">support@strato-craft.com</a>. We will respond
            within the timeframe required by applicable law (typically within 30 days for UK/EEA
            requests).
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>Third-party links</h2>
          <p>
            The Website may contain links to third-party websites or services that we do not
            operate. This Privacy Policy does not apply to those third parties. We encourage you to
            read their privacy policies.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>Security</h2>
          <p>
            We implement reasonable technical and organisational measures to protect personal
            information. However, no method of transmission or storage is completely secure. We
            cannot guarantee absolute security.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>Children&apos;s privacy</h2>
          <p>
            The Website is not directed to children under 13 (or 16 where higher thresholds apply).
            We do not knowingly collect personal information from children. If you believe we have
            collected information from a child, please contact us and we will take appropriate
            steps.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will post the revised version on
            this page and update the &quot;Last Updated&quot; date. Your continued use of the
            Website after changes take effect indicates acceptance of the revised policy.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>Supervisory authority</h2>
          <p>
            If you are in the UK or EU and believe we have not adequately addressed your privacy
            concern, you may lodge a complaint with your local data protection authority. In the UK,
            this is the Information Commissioner&apos;s Office (ICO):{" "}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
              ico.org.uk
            </a>
            .
          </p>
        </section>

        <section className="strato-policy-section contact-section">
          <h2>Contact us</h2>
          <p>
            If you have questions, comments, or concerns about this Privacy Policy or our data
            practices, please contact us:
          </p>
          <div className="strato-contact-box">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@strato-craft.com">support@strato-craft.com</a>
            </p>
            <p>
              <strong>Company:</strong> Strato-Craft Ltd
            </p>
            <p>
              <strong>Company Number:</strong> 15619171
            </p>
            <p>
              <strong>Registered Office:</strong> 1 Springfield Rise, Horsforth, Leeds, West
              Yorkshire, LS18 5DS, United Kingdom
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StratoPrivacyPolicy;
