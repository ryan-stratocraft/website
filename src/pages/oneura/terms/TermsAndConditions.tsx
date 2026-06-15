import React from "react";
import { Link } from "react-router-dom";
import { oneuraPagePath } from "../../../routes/oneuraPaths";
import "../styles/PolicyPages.css";

const OneuraTermsAndConditions: React.FC = () => {
  const privacyHref = oneuraPagePath("privacy-policy");
  const cookieHref = oneuraPagePath("cookie-policy");
  const deleteDataHref = oneuraPagePath("delete-data");

  return (
    <div className="policy-container">
      <div className="policy-hero">
        <h1>Terms &amp; Conditions</h1>
        <p className="last-updated">Last Updated: May 7, 2026</p>
      </div>

      <div className="policy-content">
        <section className="policy-section">
          <p className="highlight">
            <strong>PLEASE READ THESE TERMS CAREFULLY.</strong> They form a legally binding agreement between
            you and Strato-Craft Ltd (&quot;Strato-Craft,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) regarding the Oneura mobile application, our website at{" "}
            <a href="https://oneura.app" target="_blank" rel="noopener noreferrer">
              oneura.app
            </a>
            , related Strato-Craft pages, and other services we make available in connection with Oneura
            (collectively, the &quot;Service&quot;).
          </p>
          <p>
            By tapping accept (where presented), creating an account, downloading or installing the app, or
            otherwise accessing or using the Service, you confirm that you have read and understood these Terms
            of Service and agree to be bound by them, together with our{" "}
            <Link to={privacyHref}>Privacy Policy</Link> and{" "}
            <Link to={cookieHref}>Cookie Policy</Link> (where applicable), which are incorporated by reference
            (collectively, these &quot;Terms&quot;). If you do not agree, do not use the Service.
          </p>
          <p>
            <strong>Arbitration notice for U.S. residents.</strong> If you reside in the United States, Section
            18 (Dispute resolution - United States) contains a binding arbitration provision and class-action
            waiver that affect your legal rights. Please read it carefully.
          </p>
        </section>

        <section className="policy-section">
          <h2>1. Service overview</h2>
          <p>
            Oneura is a consumer wellness and lifestyle application that offers ambient audio, routines,
            stories, mood and reflection tools, optional insights, and related features intended to support
            relaxation, focus, and personal wellbeing. The Service may also allow you to connect optional device
            or platform integrations - for example, optional health or wearable data where you grant permission
            - solely to display information and correlations within the app as described in our{" "}
            <Link to={privacyHref}>Privacy Policy</Link>.
          </p>
          <p className="highlight">
            <strong>The Service is not medical care.</strong> Oneura is <strong>not</strong> a medical device,
            clinical service, or substitute for professional diagnosis, treatment, therapy, or emergency care. We
            do not provide medical advice. Nothing in the Service establishes a clinician–patient relationship with
            Strato-Craft.
          </p>
          <p className="highlight">
            <strong>Emergency.</strong> If you believe you may be in crisis or need urgent help,
            <strong> call your local emergency number</strong> (for example, <strong>911</strong> in the United
            States, <strong>999</strong> in the United Kingdom). In the U.S., you can dial <strong>988</strong>{" "}
            for the Suicide &amp; Crisis Lifeline or <strong>1-800-273-TALK (8255)</strong>. In the UK, you can
            contact <strong>Samaritans</strong> on <strong>116 123</strong>. Use the emergency and crisis options
            appropriate to your location.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Eligibility</h2>
          <p>
            You may use the Service only if you can form a binding contract with us and meet the minimum age
            required in your region (typically at least <strong>13 years</strong> old, or older where the law
            requires a higher age for valid consent to online services or data processing). If you are not of legal
            age to consent on your own behalf, your parent or legal guardian must read and accept these Terms on
            your behalf and is responsible for your use of the Service.
          </p>
          <p>
            The Service is not directed to children under 13 (or under 16 where a higher threshold applies under
            local law), as further described in our <Link to={privacyHref}>Privacy Policy</Link>. Do not use the
            Service if you are prohibited from doing so under applicable law.
          </p>
        </section>

        <section className="policy-section">
          <h2>3. Accounts and registration</h2>
          <p>
            Certain features require an account. You agree that information you provide is accurate and complete,
            and that you will keep it up to date. You are responsible for safeguarding your login credentials and
            for all activity under your account. Notify us promptly at{" "}
            <a href="mailto:support@strato-craft.com">support@strato-craft.com</a> if you believe your account
            has been compromised.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Fees, billing, and subscriptions</h2>

          <h3>4.1 Fees</h3>
          <p>
            Parts of the Service are free; premium features may require payment. Fees, billing cycles, and taxes
            are shown before you confirm a purchase where the applicable app store or payment flow requires
            disclosure. Unless otherwise stated at purchase or required by law, fees are non-refundable.
          </p>

          <h3>4.2 Payment processing</h3>
          <p>
            Purchases made through Apple&apos;s App Store or Google Play are processed by those platforms. We do
            not receive your full payment card details. Your payment relationship is also governed by the
            applicable store&apos;s terms. Third-party subscription tools (such as subscription management
            platforms) may process entitlement status as described in our <Link to={privacyHref}>Privacy Policy</Link>.
          </p>

          <h3>4.3 Subscriptions and renewal</h3>
          <p>
            If you subscribe, your subscription may renew automatically for successive periods unless you cancel
            through your app store account settings before the renewal date, or as otherwise explained at the point
            of purchase. You authorise us, our app store partners, and our payment/subscription processors to
            charge the applicable fees using the payment method on file. We may change fees or introduce new fees
            for new features with reasonable advance notice where required by law or platform rules.
          </p>

          <h3>4.4 Delinquent accounts and failed payments</h3>
          <p>
            We may suspend or limit access to fee-based features if payments fail. We are not responsible for
            losses arising from suspension, account deletion by a store, or failed renewals where your payment
            method is invalid - subject to applicable consumer rights that cannot be waived.
          </p>

          <h3>4.5 Cancellation</h3>
          <p>
            You may cancel a subscription through your app store account. Cancelling the Service or deleting your
            account may <strong>not</strong> automatically stop a recurring subscription; you must cancel the
            subscription with the store. See <Link to={deleteDataHref}>Delete My Data</Link> for account deletion
            information.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Health, wellness, and optional integrations</h2>

          <h3>5.1 Not medical advice</h3>
          <p>
            Content and features in the Service (including summaries, correlations, or optional AI-assisted
            outputs) are for general wellbeing and information only. They may be incomplete, inaccurate, or
            unsuitable for your situation. Always seek qualified professional advice for medical, mental health,
            or urgent safety concerns. Do not disregard professional advice because of something you see in the
            Service.
          </p>

          <h3>5.2 Optional health and device data</h3>
          <p>
            If you connect optional health, sleep, or wearable integrations, you decide what to connect and can
            revoke permissions using your device or in-app controls where available. Strato-Craft does{" "}
            <strong>not</strong> use the Service as a HIPAA-covered medical record system or a regulated clinical
            repository for U.S. users; see the{' '}
            <Link to={privacyHref}>Privacy Policy (United States Residents)</Link> for additional context.
          </p>

          <h3>5.3 No guarantee of results</h3>
          <p>
            We do not guarantee any specific health, sleep, mood, or wellness outcome. Individual experiences
            vary.
          </p>
        </section>

        <section className="policy-section">
          <h2>6. Licence to you</h2>

          <h3>6.1 Limited licence</h3>
          <p>
            Subject to your compliance with these Terms, we grant you a personal, non-exclusive,
            non-transferable, non-sublicensable, revocable licence to install and use the app (object code) on
            devices you own or control, and to access the Service, solely for your personal, non-commercial use.
          </p>

          <h3>6.2 Restrictions</h3>
          <p>Except where applicable law forbids such a restriction, you must not:</p>
          <ul>
            <li>Copy, modify, distribute, publicly display, or create derivative works from the Service except as
              expressly permitted</li>
            <li>Reverse engineer, decompile, or attempt to extract source code except to the extent mandatory law
              allows</li>
            <li>Bypass, disable, or interfere with security or access controls</li>
            <li>Use the Service in violation of law or in a way that harms us or others</li>
          </ul>

          <h3>6.3 Feedback</h3>
          <p>
            If you send suggestions or feedback (&quot;Feedback&quot;), you grant us a perpetual, worldwide,
            royalty-free licence to use Feedback to improve the Service and our business, without obligation to
            compensate you or credit you (unless mandatory law requires otherwise).
          </p>
        </section>

        <section className="policy-section">
          <h2>7. Our intellectual property</h2>
          <p>
            The Service, including software, branding, design, audio curation, text, and other materials
            (&quot;Materials&quot;), is owned by Strato-Craft or our licensors. Except for the limited licence
            above, no rights are granted. Sound content may include licensed or open-licensed sources used
            according to their respective terms. All rights not expressly granted are reserved.
          </p>
        </section>

        <section className="policy-section">
          <h2>8. Third-party services</h2>
          <p>
            The Service relies on or links to third parties - including app stores, hosting and analytics
            providers, authentication services, and optional integrations you enable. Those third parties have
            their own terms and privacy practices. We are not responsible for third-party services. Where you
            direct data to a third party or connect an integration, your relationship is with that third party.
          </p>
        </section>

        <section className="policy-section">
          <h2>9. User content and permitted use</h2>

          <h3>9.1 Your content</h3>
          <p>
            The Service may allow you to enter material such as notes, mood check-ins, favorites, or similar
            (&quot;User Content&quot;). You retain ownership of your User Content subject to the licences below
            and our{' '} <Link to={privacyHref}>Privacy Policy</Link>.
          </p>

          <h3>9.2 Licence to us</h3>
          <p>
            To operate the Service, you grant Strato-Craft a worldwide, non-exclusive licence to host, store,
            process, display, and transmit User Content as needed to provide the Service to you and to maintain,
            secure, and improve the Service, including in encrypted or aggregated form where applicable.
          </p>

          <h3>9.3 Your responsibilities</h3>
          <p>You represent that you have the rights to your User Content and that it does not violate law or
            third-party rights. Do not submit content that is unlawful, abusive, hateful, harassing, or that
            infringes intellectual property or privacy rights of others.</p>

          <h3>9.4 Monitoring and removal</h3>
          <p>
            We are not obliged to monitor User Content but may review, remove, or restrict access where we
            reasonably believe it violates these Terms, poses a risk, or is required by law.
          </p>

          <h3>9.5 Automated and AI-assisted features</h3>
          <p>
            Some features may use automation or machine learning (for example, insight or analysis features).
            Outputs may be inaccurate or unsuitable. Outputs are not professional advice. You are responsible for
            how you interpret or act on them. You must not submit inputs that unlawfully include third-party
            personal data you are not authorised to share, or that you intend to use to violate law.
          </p>
        </section>

        <section className="policy-section">
          <h2>10. Usage data</h2>
          <p>
            We may create and use data derived from use of the Service (&quot;Usage Data&quot;) for lawful
            business purposes such as operating, securing, improving, and measuring the Service, including in
            de-identified or aggregated form where we describe in the <Link to={privacyHref}>Privacy Policy</Link>.
            To the extent permitted by law, Strato-Craft owns Usage Data and analytical results derived from it,
            excluding your personal information where you retain rights under applicable data protection law.
          </p>
        </section>

        <section className="policy-section">
          <h2>11. Communications</h2>
          <p>
            We may send service-related and transactional messages. If we send optional promotional messages
            where permitted, you may opt out as described in those messages. Push notifications can usually be
            disabled in your device settings. See our <Link to={privacyHref}>Privacy Policy</Link> for details on
            communications and choices.
          </p>
        </section>

        <section className="policy-section">
          <h2>12. Prohibited conduct</h2>
          <p>By using the Service, you agree not to:</p>
          <ul>
            <li>Use the Service for any unlawful purpose or violate applicable laws or regulations</li>
            <li>Harass, threaten, harm, or impersonate others</li>
            <li>Infringe intellectual property or other rights</li>
            <li>
              Access or scrape the Service through automated means (including bots, scrapers, or unauthorised
              scripts) except as we expressly permit
            </li>
            <li>Interfere with or disrupt the Service, servers, or networks</li>
            <li>Upload malware or attempt to gain unauthorised access to accounts or systems</li>
            <li>Circumvent subscription, usage, or technical limits</li>
            <li>Use the Service to develop or train unrelated machine-learning models on our content or outputs
              where prohibited, or to misrepresent the origin of content</li>
            <li>Attempt any of the above or assist others in doing so</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>13. Copyright and intellectual property complaints (DMCA-style)</h2>
          <p>
            We respect intellectual property rights. If you believe material on the Service infringes your
            copyright, you may send a notice to our designated contact with the information typically required
            under applicable law (for example, U.S. Digital Millennium Copyright Act procedures where they apply).
          </p>
          <div className="contact-box">
            <p>
              <strong>Strato-Craft Ltd</strong>
              <br />
              Attn: Copyright / IP Notices
              <br />
              Email:{" "}
              <a href="mailto:support@strato-craft.com?subject=Copyright%20notice">support@strato-craft.com</a>
              <br />
              Please include &quot;Copyright notice&quot; in the subject line and sufficient detail to locate the
              material and evaluate your claim.
            </p>
          </div>
          <p>
            We may remove or disable access to material in appropriate circumstances. Repeat infringement may
            result in account termination. If you believe material was removed by mistake, you may submit a
            counter-notice as permitted by applicable law.
          </p>
        </section>

        <section className="policy-section">
          <h2>14. Changes to these Terms</h2>
          <p>
            We may modify these Terms from time to time. We will post the updated Terms and revise the
            &quot;Last Updated&quot; date. If changes are material, we will provide additional notice where
            appropriate (for example, through the Service or by email if we have your address). Your continued use
            of the Service after the effective date may constitute acceptance of the revised Terms where permitted
            by law. If you do not agree, stop using the Service and cancel subscriptions as needed.
          </p>
        </section>

        <section className="policy-section">
          <h2>15. Term, suspension, and termination</h2>
          <p>
            These Terms apply from your first use of the Service until terminated. We may suspend or terminate
            access if you materially breach these Terms, if we are required to do so by law, or for operational,
            security, or fraud-prevention reasons. You may stop using the Service at any time. Upon termination,
            your licence ends and you must cease use. Provisions that by their nature should survive (including
            intellectual property, disclaimers, limitations of liability, dispute resolution, and governing law)
            will survive. Account deletion is described on{' '}
            <Link to={deleteDataHref}>Delete My Data</Link>.
          </p>
        </section>

        <section className="policy-section">
          <h2>16. Indemnity</h2>
          <p>
            To the fullest extent permitted by law, you will defend and indemnify Strato-Craft and our
            affiliates, directors, officers, employees, and agents against third-party claims, damages, losses,
            liabilities, and expenses (including reasonable legal fees) arising from: (a) your User Content;
            (b) your misuse of the Service; (c) your breach of these Terms or applicable law; or (d) your
            dispute with a third party in connection with the Service.
          </p>
        </section>

        <section className="policy-section">
          <h2>17. Disclaimers</h2>
          <p>
            <strong>
              THE SERVICE AND ALL MATERIALS ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE
              FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR
              STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF
              HARMFUL COMPONENTS.
            </strong>{" "}
            Nothing in the Service creates a warranty not expressly stated in these Terms.
          </p>
          <p>
            Some jurisdictions do not allow certain disclaimers. In those jurisdictions, disclaimers apply to the
            maximum extent allowed.
          </p>
        </section>

        <section className="policy-section">
          <h2>18. Limitation of liability</h2>
          <p>
            <strong>
              TO THE FULLEST EXTENT PERMITTED BY LAW, STRATO-CRAFT AND OUR AFFILIATES WILL NOT BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF
              PROFITS, DATA, GOODWILL, OR OPPORTUNITY, ARISING OUT OF OR RELATED TO THE SERVICE OR THESE TERMS,
              WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF
              WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </strong>
          </p>
          <p>
            <strong>
              TO THE FULLEST EXTENT PERMITTED BY LAW, OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE
              SERVICE OR THESE TERMS WILL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID TO STRATO-CRAFT FOR
              THE SERVICE IN THE TWELVE (12) MONTHS BEFORE THE EVENT GIVING RISE TO LIABILITY, OR (B) ONE HUNDRED
              US DOLLARS (US$100) / ONE HUNDRED UK POUNDS (£100) EQUIVALENT (WE MAY APPLY THE CURRENCY THAT
              MATCHES YOUR PLACE OF PURCHASE).
            </strong>
          </p>
          <p>
            Some jurisdictions do not allow certain limitations. In those jurisdictions, our liability is limited
            to the maximum extent permitted. Nothing in these Terms excludes or limits liability that cannot
            legally be excluded or limited (including death or personal injury caused by negligence where
            applicable law forbids such a cap, or statutory rights for consumers).
          </p>
        </section>

        <section className="policy-section">
          <h2>19. Dispute resolution - United States</h2>
          <p>
            <strong>This Section 19 applies only if you reside in the United States.</strong> It does not apply
            where prohibited by law. Nothing in this Section limits non-waivable rights you may have under federal,
            state, or local consumer protection laws.
          </p>

          <h3>19.1 Binding arbitration</h3>
          <p>
            Except for disputes that qualify for small claims court or that concern intellectual property
            injunctive relief (to the extent a court may hear such claims first), you and Strato-Craft agree that
            any dispute, claim, or controversy arising out of or relating to the Service or these Terms
            (including formation, breach, enforcement, or interpretation) will be resolved exclusively by binding
            arbitration administered by Judicial Arbitration and Mediation Services, Inc. (&quot;JAMS&quot;) in
            accordance with its applicable consumer arbitration rules, as modified by these Terms. The Federal
            Arbitration Act governs this arbitration agreement.
          </p>

          <h3>19.2 Class action waiver</h3>
          <p>
            <strong>
              YOU AND STRATO-CRAFT AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN AN INDIVIDUAL
              CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
            </strong>{" "}
            Unless both you and we agree otherwise, the arbitrator may not consolidate claims or preside over any
            form of representative or class proceeding.
          </p>

          <h3>19.3 Opt-out</h3>
          <p>
            You may opt out of this Section 19 within thirty (30) days after you first accept these Terms by
            emailing{" "}
            <a href="mailto:support@strato-craft.com?subject=Arbitration%20opt-out">support@strato-craft.com</a>{" "}
            from the email associated with your account (if any) with the subject line &quot;Arbitration
            opt-out&quot; and stating your full name and intent to opt out. If you opt out, this Section 19 does
            not apply to you, but other Terms still apply.
          </p>

          <h3>19.4 Enforceability</h3>
          <p>
            If any portion of this Section 19 is found unenforceable, the remainder may still apply, or the
            dispute may be brought in court as applicable law requires.
          </p>
        </section>

        <section className="policy-section">
          <h2>20. Governing law, venue, and non-U.S. users</h2>

          <h3>20.1 Governing law</h3>
          <p>
            Subject to mandatory consumer protections that apply to you, these Terms are governed by the laws of{" "}
            <strong>England and Wales</strong>, without regard to conflict-of-law principles.
          </p>

          <h3>20.2 Venue (court disputes)</h3>
          <p>
            If you are not subject to Section 19, or Section 19 does not apply or has been validly opted out, and
            a dispute may be heard in court, the courts of <strong>England and Wales</strong> will have exclusive
            jurisdiction, except where applicable consumer law requires a different court for consumers in the UK,
            EEA, or other regions &mdash; in which case you may also have rights to sue in your country of
            residence where such law requires.
          </p>

          <h3>20.3 European Economic Area and United Kingdom consumers</h3>
          <p>
            If you are a consumer in the UK or EEA, you benefit from any mandatory provisions of the law of your
            country of residence. Nothing in these Terms limits those rights.
          </p>
        </section>

        <section className="policy-section">
          <h2>21. Miscellaneous</h2>
          <ul>
            <li>
              <strong>Entire agreement.</strong> These Terms, together with the policies they reference, are the
              entire agreement between you and us regarding the Service.
            </li>
            <li>
              <strong>Assignment.</strong> You may not assign these Terms without our consent. We may assign in
              connection with a merger, acquisition, or sale of assets.
            </li>
            <li>
              <strong>No waiver.</strong> Failure to enforce a provision is not a waiver.
            </li>
            <li>
              <strong>Severability.</strong> If any provision is invalid, the remainder remains in effect.
            </li>
            <li>
              <strong>Language.</strong> The English language version controls unless required otherwise by law.
            </li>
            <li>
              <strong>Electronic communications.</strong> You consent to receive notices electronically as
              described in our <Link to={privacyHref}>Privacy Policy</Link>.
            </li>
            <li>
              <strong>International use.</strong> We operate from the United Kingdom. Access where prohibited is
              not authorised.
            </li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>22. California consumers</h2>
          <p>
            Under California Civil Code § 1789.3, California users may contact the Complaint Assistance Unit of
            the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625
            N. Market Blvd., Suite S-202, Sacramento, California 95834, or by telephone at +1 (800) 952-5210.
          </p>
        </section>

        <section className="policy-section">
          <h2>23. Export</h2>
          <p>
            You may not use or export the Service except as authorised by applicable export control and sanctions
            laws.
          </p>
        </section>

        <section className="policy-section contact-section">
          <h2>24. Contact</h2>
          <p>For questions about these Terms:</p>
          <div className="contact-box">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@strato-craft.com">support@strato-craft.com</a>
            </p>
            <p>
              <strong>Company:</strong> Strato-Craft Ltd
            </p>
            <p>
              <strong>Location:</strong> United Kingdom
            </p>
          </div>
          <p>
            For privacy matters, see the <Link to={privacyHref}>Privacy Policy</Link> and contact details listed
            there.
          </p>
        </section>
      </div>
    </div>
  );
};

export default OneuraTermsAndConditions;
