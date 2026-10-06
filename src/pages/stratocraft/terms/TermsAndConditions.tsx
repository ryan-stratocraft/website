import React from "react";
import { Link } from "react-router-dom";
import "../styles/PolicyPages.css";

const StratoTermsAndConditions: React.FC = () => {
  return (
    <div className="strato-policy-container">
      <div className="strato-policy-hero">
        <h1>Terms &amp; Conditions</h1>
        <p className="last-updated">Last Updated: September 13, 2026</p>
      </div>

      <div className="strato-policy-content">
        <section className="strato-policy-section">
          <p className="highlight">
            <strong>PLEASE READ THESE TERMS CAREFULLY.</strong> They form a legally binding
            agreement between you and Strato-Craft Ltd (&quot;Strato-Craft,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) regarding access to and use of the Strato-Craft
            website at{" "}
            <a href="https://strato-craft.com" target="_blank" rel="noopener noreferrer">
              strato-craft.com
            </a>{" "}
            and related company pages (collectively, the &quot;Website&quot;).
          </p>
          <p>
            By accessing or using the Website, you confirm that you have read and understood these
            Terms and agree to be bound by them, together with our{" "}
            <Link to="/privacy">Privacy Policy</Link> (which is incorporated by reference). If you
            do not agree, do not use the Website.
          </p>
          <p>
            <strong>Product-specific terms.</strong> Our individual products (such as Oneura, Oh-i,
            and IAC VR) have their own terms of service and privacy policies that apply when you use
            those products. Please refer to the relevant product documentation for details.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>1. About Strato-Craft</h2>
          <p>
            Strato-Craft Ltd is a digital product company registered in England and Wales. We
            design, develop, and operate consumer applications focused on wellness, lifestyle, and
            productivity. Our current portfolio includes Oneura (a sleep and relaxation app), Oh-i
            (a personality-based dating app), and IAC VR (a cloud infrastructure visualisation
            platform).
          </p>
          <p>
            This Website serves as the company portfolio site, providing information about
            Strato-Craft and our products. Individual product experiences are delivered through
            their respective applications and dedicated websites.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>2. Use of the Website</h2>

          <h3>2.1 Permitted use</h3>
          <p>
            You may access and use the Website for lawful, personal, non-commercial purposes. You
            may browse our content, learn about our products, and contact us through the provided
            channels.
          </p>

          <h3>2.2 Restrictions</h3>
          <p>You must not:</p>
          <ul>
            <li>
              Use the Website in any way that violates applicable laws or regulations
            </li>
            <li>
              Attempt to gain unauthorised access to any part of the Website, server, or connected
              systems
            </li>
            <li>
              Interfere with or disrupt the Website&apos;s operation, security features, or
              networks
            </li>
            <li>
              Use automated systems (bots, scrapers, crawlers) to access or collect data from the
              Website except as permitted by our robots.txt file or with our written consent
            </li>
            <li>
              Copy, reproduce, distribute, or create derivative works from the Website content
              without permission
            </li>
            <li>
              Remove or alter any copyright, trademark, or other proprietary notices
            </li>
            <li>
              Use the Website for any fraudulent, deceptive, or harmful purpose
            </li>
          </ul>
        </section>

        <section className="strato-policy-section">
          <h2>3. Intellectual property</h2>

          <h3>3.1 Ownership</h3>
          <p>
            The Website and its contents—including text, graphics, logos, images, software, and
            design elements—are owned by Strato-Craft Ltd or our licensors and are protected by
            copyright, trademark, and other intellectual property laws. &quot;Strato-Craft,&quot;
            &quot;Oneura,&quot; &quot;Oh-i,&quot; and related logos and names are trademarks of
            Strato-Craft Ltd.
          </p>

          <h3>3.2 Limited licence</h3>
          <p>
            We grant you a limited, non-exclusive, non-transferable, revocable licence to access and
            view the Website for personal, non-commercial use only. This licence does not include
            the right to modify, copy, distribute, transmit, display, perform, reproduce, publish,
            license, or create derivative works from the Website.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>4. Third-party links and services</h2>
          <p>
            The Website may contain links to third-party websites, app stores, or services that we
            do not control. We provide these links for convenience only and are not responsible for
            the content, accuracy, or practices of third-party sites. Your use of third-party
            services is subject to their own terms and policies.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>5. Disclaimer of warranties</h2>
          <p>
            <strong>
              THE WEBSITE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
              AVAILABLE.&quot; TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
              WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT
              WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF
              HARMFUL COMPONENTS.
            </strong>
          </p>
          <p>
            Some jurisdictions do not allow certain disclaimers. In those jurisdictions, disclaimers
            apply to the maximum extent permitted by law.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>6. Limitation of liability</h2>
          <p>
            <strong>
              TO THE FULLEST EXTENT PERMITTED BY LAW, STRATO-CRAFT AND OUR AFFILIATES WILL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR
              ANY LOSS OF PROFITS, DATA, GOODWILL, OR OPPORTUNITY, ARISING OUT OF OR RELATED TO YOUR
              USE OF OR INABILITY TO USE THE WEBSITE, WHETHER BASED ON WARRANTY, CONTRACT, TORT
              (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGES.
            </strong>
          </p>
          <p>
            Some jurisdictions do not allow certain limitations. In those jurisdictions, our
            liability is limited to the maximum extent permitted by law. Nothing in these Terms
            excludes or limits liability that cannot legally be excluded or limited (including death
            or personal injury caused by negligence where applicable law forbids such a cap, or
            statutory consumer rights).
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>7. Indemnity</h2>
          <p>
            To the fullest extent permitted by law, you agree to indemnify and hold harmless
            Strato-Craft Ltd and our directors, officers, employees, and agents from any claims,
            damages, losses, liabilities, and expenses (including reasonable legal fees) arising
            from: (a) your use of the Website; (b) your breach of these Terms; or (c) your
            violation of any law or third-party rights.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>8. Changes to the Website and Terms</h2>
          <p>
            We may modify, suspend, or discontinue any part of the Website at any time without
            notice. We may also update these Terms from time to time. We will post the revised Terms
            and update the &quot;Last Updated&quot; date. Your continued use of the Website after
            changes take effect constitutes acceptance of the revised Terms. If you do not agree to
            the changes, please stop using the Website.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>9. Governing law and jurisdiction</h2>

          <h3>9.1 Governing law</h3>
          <p>
            These Terms are governed by the laws of <strong>England and Wales</strong>, without
            regard to conflict-of-law principles.
          </p>

          <h3>9.2 Jurisdiction</h3>
          <p>
            Any disputes arising out of or relating to these Terms or the Website will be subject to
            the exclusive jurisdiction of the courts of <strong>England and Wales</strong>, except
            where applicable consumer law requires a different court—in which case you may also have
            rights to sue in your country of residence where such law requires.
          </p>

          <h3>9.3 Consumer rights</h3>
          <p>
            If you are a consumer in the United Kingdom or European Economic Area, you benefit from
            any mandatory provisions of the law of your country of residence. Nothing in these Terms
            limits those rights.
          </p>
        </section>

        <section className="strato-policy-section">
          <h2>10. Miscellaneous</h2>
          <ul>
            <li>
              <strong>Entire agreement.</strong> These Terms, together with the Privacy Policy,
              constitute the entire agreement between you and us regarding the Website.
            </li>
            <li>
              <strong>Severability.</strong> If any provision is found invalid or unenforceable, the
              remaining provisions continue in full force.
            </li>
            <li>
              <strong>No waiver.</strong> Our failure to enforce any provision is not a waiver of
              our right to do so later.
            </li>
            <li>
              <strong>Assignment.</strong> You may not assign your rights under these Terms. We may
              assign our rights in connection with a merger, acquisition, or sale of assets.
            </li>
            <li>
              <strong>Language.</strong> The English language version of these Terms controls unless
              otherwise required by law.
            </li>
          </ul>
        </section>

        <section className="strato-policy-section contact-section">
          <h2>11. Contact us</h2>
          <p>If you have questions about these Terms, please contact us:</p>
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
              <strong>Registered Office:</strong> 3 Tildesley Drive, Willenhall, WV12 4JD, England
            </p>
          </div>
          <p>
            For privacy matters, see our <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default StratoTermsAndConditions;
