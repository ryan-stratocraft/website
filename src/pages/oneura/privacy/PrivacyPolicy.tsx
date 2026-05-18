import React from "react";
import "../styles/PolicyPages.css";

const OneuraPrivacyPolicy: React.FC = () => {
  return (
    <div className="policy-container">
      <div className="policy-hero">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: May 7, 2026 (includes U.S. disclosures)</p>
      </div>

      <div className="policy-content">
        <section className="policy-section">
          <h2>Introduction</h2>
          <p>
            Strato-Craft Ltd (&quot;Strato-Craft,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
            respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
            personal information when you use the Oneura mobile application, our website at{" "}
            <a href="https://oneura.app" target="_blank" rel="noopener noreferrer">
              oneura.app
            </a>{" "}
            (and related Strato-Craft pages that describe Oneura), and related features and services we offer in
            connection with Oneura (collectively, the &quot;Services&quot;).
          </p>
          <p>
            By using the Services, you agree to the collection, use, and disclosure practices described in this
            Privacy Policy. Your use of the Services is also subject to our Terms &amp; Conditions.
          </p>
          <p>
            Where the UK GDPR, EU GDPR, or other applicable laws grant you rights, we honor those rights as
            described below.
          </p>
        </section>

        <section className="policy-section">
          <h2>Personal Information We Collect</h2>
          <p>
            We may collect personal information about you from various sources, including information you
            provide directly, information collected automatically when you use the Services, and information you
            choose to connect from other apps or devices, as described below.
          </p>

          <h3>A. Information You Provide to Us</h3>
          <ul>
            <li>
              <strong>Registration and account:</strong> When you create or manage an account, we may collect
              identifiers such as email address, display name (if you provide one), authentication identifiers,
              and account-related metadata (e.g. account creation date).
            </li>
            <li>
              <strong>In-app content you choose to enter:</strong> If you use features such as mood check-ins,
              reflections, notes, or similar wellness journaling, we store the content you submit so we can
              display it back to you and power related features.
            </li>
            <li>
              <strong>Communications with us:</strong> If you contact us (for example by email), we receive the
              information you send, such as your email address, the contents of your message, and attachments you
              choose to provide.
            </li>
          </ul>

          <h3>B. Information We Collect When You Use Our Services</h3>
          <ul>
            <li>
              <strong>Device and technical information:</strong> We receive information about the device and
              software used to access the Services, such as device type, operating system version, app version,
              language settings, and diagnostic or crash information to help us maintain reliability and security.
            </li>
            <li>
              <strong>Usage information:</strong> We collect information about how you interact with the Services,
              such as features used, session activity, listening activity (see below), aggregates and preferences
              you set in the app, and timestamps associated with your use. This helps us operate, maintain, and
              improve the Services.
            </li>
            <li>
              <strong>Listening and audio-related usage:</strong> We process information about playback and
              listening (for example daily or session-level summaries and related metadata) to run core features
              (such as time allowances where applicable), show you history and insights inside the app, and
              improve the product. Where you use optional modes or features, additional metadata may be stored to
              support those features.
            </li>
            <li>
              <strong>Optional health and wearable data:</strong> If you choose to connect Apple Health, Health
              Connect, or similar integrations supported on your device, we may sync and store certain
              health-related metrics and sleep-related records you authorize for use within Oneura (such as
              metrics you view in the app&rsquo;s health areas). This data is processed to show you summaries and
              correlations inside the Services and is not intended as medical diagnosis or treatment.
            </li>
            <li>
              <strong>Push notification tokens:</strong> If you enable push notifications, we process tokens and
              related data needed to deliver notifications you opt into.
            </li>
            <li>
              <strong>Subscriptions and purchases:</strong> Subscription status and transaction metadata are
              processed through the app stores and our subscription tooling. We do not receive your full payment
              card details from those stores.
            </li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Cookies, Analytics, and Similar Technologies</h2>
          <p>
            <strong>Mobile app:</strong> Oneura does not use traditional web cookies in the same way a browser
            does. We may use software development kits and analytics tools (such as Firebase Analytics) to
            collect usage information in accordance with this policy and to improve the Services.
          </p>
          <p>
            <strong>Websites:</strong> Our websites (including oneura.app and strato-craft.com) may use cookies
            or similar technologies for essential functionality, to remember preferences (such as cookie
            consent where applicable), and to measure basic traffic and performance. Third-party analytics
            partners may use cookies or similar technologies; their use is subject to their own policies.
          </p>
          <p>
            You can control many cookies through your browser settings. If you disable or block certain cookies,
            parts of a website may not function properly.
          </p>
          <p className="highlight">
            We do <strong>not</strong> sell your personal information. We do <strong>not</strong> use your
            personal information for third-party targeted advertising as described in many ad-tech models.
          </p>
        </section>

        <section className="policy-section">
          <h2>How We Use the Information We Collect</h2>
          <p>We use information for purposes including:</p>
          <ul>
            <li>To provide, maintain, secure, and operate the Services</li>
            <li>To personalize your experience within the Services (for example, preferences and relevant in-app content)</li>
            <li>To understand how the Services are used and to develop new features and improvements</li>
            <li>
              To communicate with you about service-related matters, respond to your requests, and provide
              customer support
            </li>
            <li>
              To send transactional or service messages (and, where permitted by law and your settings,
              notifications about the Services)
            </li>
            <li>To generate aggregated or de-identified statistics that do not identify you</li>
            <li>To detect, prevent, and address fraud, abuse, and security or technical issues</li>
            <li>To comply with legal obligations and enforce our terms and policies</li>
            <li>
              For other purposes explained at the point of collection, or with your consent where required
            </li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>How We Share Information</h2>
          <p>
            We do <strong>not</strong> sell, rent, or lease your personal information to data brokers, and we do
            not share it for cross-context behavioral advertising in the manner commonly called &quot;selling&quot;
            personal data under some US state laws.
          </p>
          <p>We may share information in the following circumstances:</p>
          <ul>
            <li>
              <strong>Service providers and processors:</strong> We use providers to host data, run
              infrastructure, provide analytics, deliver notifications, process subscriptions, and operate our
              business. Examples include Google Firebase (backend, analytics, and related services), Apple and
              Google app distribution and in-app purchase infrastructure, and subscription management providers
              such as RevenueCat. These providers process information on our behalf under appropriate agreements.
            </li>
            <li>
              <strong>Analytics partners:</strong> Analytics services may collect or receive information about
              how the Services are used, subject to their policies and our configuration. We use analytics to
              improve stability and product quality.
            </li>
            <li>
              <strong>Corporate affiliates:</strong> We may share information with our corporate parent,
              subsidiaries, or affiliates for the purposes described in this Privacy Policy and consistent with
              applicable law.
            </li>
            <li>
              <strong>Legal and safety:</strong> We may access, preserve, and disclose information if we believe
              it is reasonably necessary to comply with law, regulation, legal process, or governmental requests;
              to enforce our policies or agreements; or to protect the rights, property, or safety of Strato-Craft,
              our users, or others.
            </li>
            <li>
              <strong>Business transfers:</strong> If we are involved in a merger, acquisition, financing,
              reorganization, bankruptcy, or sale of assets, information may be transferred as part of that
              transaction, subject to appropriate safeguards and notice where required.
            </li>
            <li>
              <strong>With your direction or consent:</strong> For example, if you choose to share using OS-level
              or third-party integrations, those third parties process information under their own policies and
              your settings.
            </li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Your Choices and Rights</h2>
          <ul>
            <li>
              <strong>Account controls:</strong> You can review and update certain information in the app
              settings where available.
            </li>
            <li>
              <strong>Optional features:</strong> You can disconnect optional integrations (such as health or
              wearable connections) using your device settings and in-app controls where provided.
            </li>
            <li>
              <strong>Marketing:</strong> If we send optional promotional communications where permitted, you may
              opt out using the instructions in those messages. We may still send important service-related
              messages about your account or the Services.
            </li>
            <li>
              <strong>Do Not Track:</strong> There is no universally accepted standard for how to respond to
              &quot;Do Not Track&quot; signals. Our Services may not respond to such signals in a uniform way.
            </li>
            <li>
              <strong>UK &amp; EU rights:</strong> If applicable, you may have rights to access, rectify, erase,
              restrict processing, object, data portability, and withdraw consent for processing based on
              consent. Contact us using the details below.
            </li>
            <li>
              <strong>U.S. state rights:</strong> If you live in the United States, you may have additional rights
              under state law (including access, deletion, correction, or opt-out rights in some states). See{" "}
              <em>United States Residents</em> below and contact{" "}
              <a href="mailto:support@strato-craft.com">support@strato-craft.com</a>.
            </li>
          </ul>
          <p>
            To exercise privacy rights, contact{" "}
            <a href="mailto:support@strato-craft.com">support@strato-craft.com</a>. We will respond within the
            timeframe required by applicable law (often within 30 days for UK/EU requests, unless an extension
            applies).
          </p>
        </section>

        <section className="policy-section">
          <h2>Third-Party Links and Services</h2>
          <p>
            The Services may contain links to third-party websites, app stores, or services that we do not
            operate (for example, Google Play, the Apple App Store, or support pages). This Privacy Policy does
            not apply to those third parties. We encourage you to read their privacy policies and terms.
          </p>
        </section>

        <section className="policy-section">
          <h2>Security</h2>
          <p>
            We implement reasonable technical and organizational measures designed to protect personal
            information. However, no method of transmission or storage is completely secure. We cannot guarantee
            absolute security of information transmitted through the internet or stored on our systems.
          </p>
        </section>

        <section className="policy-section">
          <h2>Data Retention</h2>
          <p>We retain personal information only as long as reasonably necessary for the purposes described in this policy, including:</p>
          <ul>
            <li>While your account is active and for a short period afterward as needed for recovery, legal, or security reasons</li>
            <li>As required to comply with legal obligations, resolve disputes, and enforce agreements</li>
          </ul>
          <p>
            When you delete your account (subject to our deletion process), we work to delete or anonymize
            personal information associated with your account within a reasonable period, except where retention
            is required by law.
          </p>
        </section>

        <section className="policy-section">
          <h2>Children&apos;s Privacy</h2>
          <p>
            The Services are not directed to children under 13 (or 16 where higher age thresholds apply in the
            EU). We do not knowingly collect personal information from children in that age group. If you believe
            we have collected information from a child, please contact us and we will take appropriate steps.
          </p>
        </section>

        <section className="policy-section">
          <h2>International Data Transfers</h2>
          <p>
            Strato-Craft is based in the United Kingdom. Your information may be processed in the UK, the
            European Economic Area, the United States, and other countries where we or our service providers
            operate. Where required, we use appropriate safeguards (such as Standard Contractual Clauses) for
            transfers from the UK/EEA to countries that have not received an adequacy decision.
          </p>
        </section>

        <section className="policy-section">
          <h2>United States Residents</h2>
          <h3>HIPAA and medical records</h3>
          <p>
            The Health Insurance Portability and Accountability Act of 1996 (HIPAA) imposes specific rules on
            certain U.S. healthcare providers, health plans, and related entities, and their business
            associates, when they handle protected health information in those regulated contexts.
          </p>
          <p>
            <strong>Oneura is a consumer wellness application.</strong> In providing the Services as described
            in this policy, Strato-Craft does <strong>not</strong> act as a HIPAA-covered health care provider
            or health plan, and the Services are <strong>not</strong> intended to operate as a HIPAA-compliant
            medical record, electronic health record, or clinical system. You should not rely on the Services as
            a substitute for records or treatment governed by HIPAA.
          </p>
          <p>
            If you are a patient seeking HIPAA protections for clinical information, please use channels
            provided by your clinician or insurer.
          </p>

          <h3>U.S. state privacy laws</h3>
          <p>
            Depending on where you live in the United States, you may have additional rights under state privacy
            laws (for example, rights to access, delete, or correct personal information, or to opt out of
            certain types of processing or &quot;sales&quot; / sharing as those terms are defined in applicable
            state law).
          </p>
          <p>
            As described elsewhere in this policy, we do <strong>not</strong> sell your personal information for
            money, and we do <strong>not</strong> use your personal information for cross-context behavioral
            advertising in the manner described by some state laws. To exercise rights available to you under
            applicable U.S. state law, contact{" "}
            <a href="mailto:support@strato-craft.com">support@strato-craft.com</a> and include enough detail for
            us to verify and process your request. We will not discriminate against you for exercising rights
            where such discrimination is prohibited by law.
          </p>

          <h3>California residents (summary)</h3>
          <p>
            If you are a California resident, the California Consumer Privacy Act as amended (CCPA / CPRA) may
            grant you specific rights regarding personal information. This summary is provided under California
            law:
          </p>
          <ul>
            <li>
              <strong>Categories collected:</strong> In the preceding 12 months, we may have collected the
              categories described in this Privacy Policy (such as identifiers, commercial information related
              to subscriptions, internet or network activity, geolocation at a coarse level, and, if you use
              optional features, health-adjacent information you choose to connect).
            </li>
            <li>
              <strong>Sensitive personal information:</strong> Where California law classifies certain data you
              optionally provide or sync (such as some wellness or health-related metrics) as sensitive personal
              information, we use it only for the purposes disclosed in this policy and as permitted by law.
            </li>
            <li>
              <strong>No sale / sharing for cross-context behavioral advertising:</strong> We do not sell your
              personal information or share it for cross-context behavioral advertising as those practices are
              commonly defined under the CPRA for our consumer app.
            </li>
            <li>
              <strong>Requests:</strong> You may request access, deletion, or correction of personal information
              subject to exceptions under law. Submit requests to{" "}
              <a href="mailto:support@strato-craft.com">support@strato-craft.com</a>.
            </li>
          </ul>
          <p>
            California&apos;s &quot;Shine the Light&quot; law (Civil Code § 1798.83) may give California residents
            the right to ask about certain disclosures of personal information to third parties for their direct
            marketing purposes. We do not share personal information with third parties for their direct marketing
            purposes as described in that statute.
          </p>
        </section>

        <section className="policy-section">
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will post the revised version on this page
            and update the &quot;Last Updated&quot; date. If changes are material, we will provide additional
            notice as appropriate (such as through the Services or by email where we have your contact details).
            Your continued use of the Services after the effective date of the revised policy may indicate
            acceptance of the changes where permitted by law.
          </p>
        </section>

        <section className="policy-section">
          <h2>Supervisory Authority</h2>
          <p>
            If you are in the UK or EU and believe we have not addressed your concern, you may lodge a complaint
            with your local data protection authority. In the UK, this is the Information Commissioner&apos;s
            Office (ICO):{" "}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
              ico.org.uk
            </a>
            .
          </p>
        </section>

        <section className="policy-section contact-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions, comments, or concerns about this Privacy Policy or our processing activities,
            contact us at:
          </p>
          <div className="contact-box">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@strato-craft.com">support@strato-craft.com</a>
            </p>
            <p>
              <strong>Data controller:</strong> Strato-Craft Ltd
            </p>
            <p>
              <strong>Location:</strong> United Kingdom
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OneuraPrivacyPolicy;
