import React from "react";
import { Link } from "react-router-dom";
import { oneuraPagePath } from "../../../routes/oneuraPaths";
import "../styles/PolicyPages.css";

const OneuraRefundPolicy: React.FC = () => {
  const termsHref = oneuraPagePath("terms-and-conditions");
  const subscriptionHref = oneuraPagePath("subscription");

  return (
    <div className="policy-container">
      <div className="policy-hero">
        <h1>Refunds &amp; Billing</h1>
        <p className="last-updated">Last Updated: September 13, 2026</p>
      </div>

      <div className="policy-content">
        <section className="policy-section">
          <h2>Overview</h2>
          <p>
            This page explains how refunds, billing, and subscription cancellations work for Oneura.
            Oneura Plus subscriptions and any one-time purchases are processed through the Apple App
            Store (for iOS) or Google Play Store (for Android). Because these platforms handle
            payment processing, refund requests generally must go through them rather than directly
            to Strato-Craft Ltd.
          </p>
          <p>
            This page supplements our <Link to={termsHref}>Terms &amp; Conditions</Link>. In the
            event of any conflict, the Terms &amp; Conditions prevail. Nothing in this page limits
            your statutory rights as a consumer.
          </p>
        </section>

        <section className="policy-section">
          <h2>How payments work</h2>
          <p>
            When you subscribe to Oneura Plus or make an in-app purchase, your payment is processed
            by Apple or Google, not directly by Strato-Craft. We do not receive your full payment
            card details. Your payment relationship is governed by the applicable store&apos;s terms
            in addition to our own.
          </p>
          <p>
            Subscriptions automatically renew unless cancelled before the renewal date. Prices are
            displayed in your local currency and may include applicable taxes.
          </p>
        </section>

        <section className="policy-section">
          <h2>Requesting a refund</h2>

          <h3>App Store (iOS) refunds</h3>
          <p>
            If you purchased Oneura Plus or made an in-app purchase on an iPhone or iPad, refund
            requests are handled by Apple. To request a refund:
          </p>
          <ol>
            <li>
              Visit{" "}
              <a
                href="https://reportaproblem.apple.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                reportaproblem.apple.com
              </a>
            </li>
            <li>Sign in with your Apple ID</li>
            <li>Find the Oneura purchase in your transaction history</li>
            <li>Select &quot;Request a refund&quot; and follow the prompts</li>
          </ol>
          <p>
            Apple reviews refund requests and makes the final decision. Strato-Craft cannot approve
            or deny App Store refund requests, as we do not have access to Apple&apos;s billing
            system.
          </p>

          <h3>Google Play (Android) refunds</h3>
          <p>
            If you purchased Oneura Plus or made an in-app purchase on an Android device, refund
            requests are handled by Google. To request a refund:
          </p>
          <ol>
            <li>
              Open the Google Play app or visit{" "}
              <a
                href="https://play.google.com/store/account/orderhistory"
                target="_blank"
                rel="noopener noreferrer"
              >
                play.google.com/store/account/orderhistory
              </a>
            </li>
            <li>Find the Oneura purchase you want to refund</li>
            <li>Select &quot;Request a refund&quot; or &quot;Report a problem&quot;</li>
            <li>Follow the on-screen instructions</li>
          </ol>
          <p>
            Google reviews refund requests and makes the final decision. Strato-Craft cannot approve
            or deny Google Play refund requests, as we do not have access to Google&apos;s billing
            system.
          </p>
        </section>

        <section className="policy-section">
          <h2>When Strato-Craft may provide refunds</h2>
          <p>
            In limited circumstances, Strato-Craft may be able to arrange a refund directly. This
            typically applies only when:
          </p>
          <ul>
            <li>
              A significant technical issue on our end prevented you from accessing purchased content
              or features, and we were unable to resolve it within a reasonable timeframe
            </li>
            <li>
              You were charged due to a billing error that we can verify and that Apple or Google
              cannot resolve
            </li>
            <li>
              Applicable consumer protection law requires us to provide a refund
            </li>
          </ul>
          <p>
            To request a refund directly from Strato-Craft, please contact us at{" "}
            <a href="mailto:support@strato-craft.com">support@strato-craft.com</a> with details of
            your purchase and the issue you experienced. In most cases, we will direct you to the
            relevant app store, as they control the payment and have the ability to process refunds.
          </p>
        </section>

        <section className="policy-section">
          <h2>When refunds are not available</h2>
          <p>
            Refunds are generally not available in the following situations (subject to your
            statutory rights):
          </p>
          <ul>
            <li>
              You changed your mind after subscribing and have already had access to premium features
            </li>
            <li>
              You forgot to cancel before an automatic renewal (please contact Apple or Google
              promptly; they may grant refunds in some cases)
            </li>
            <li>
              You did not use the app or found it was not suitable for your needs after trying it
              (please use the free tier to evaluate before subscribing)
            </li>
            <li>
              The subscription period has already ended
            </li>
          </ul>
          <p>
            We encourage you to try Oneura&apos;s free features before subscribing to ensure it
            meets your needs.
          </p>
        </section>

        <section className="policy-section">
          <h2>Cancelling your subscription</h2>
          <p>
            You can cancel your Oneura Plus subscription at any time. Cancellation stops future
            charges but does not trigger an automatic refund for time already paid. You will
            continue to have access to premium features until the end of your current billing
            period.
          </p>

          <h3>How to cancel on iOS (iPhone/iPad)</h3>
          <ol>
            <li>Open the <strong>Settings</strong> app on your device</li>
            <li>Tap your name at the top to access your Apple ID</li>
            <li>Tap <strong>Subscriptions</strong></li>
            <li>Find and tap <strong>Oneura</strong></li>
            <li>Tap <strong>Cancel Subscription</strong> and confirm</li>
          </ol>

          <h3>How to cancel on Android</h3>
          <ol>
            <li>Open the <strong>Google Play Store</strong> app</li>
            <li>Tap your profile icon in the top right</li>
            <li>Tap <strong>Payments &amp; subscriptions</strong> &gt; <strong>Subscriptions</strong></li>
            <li>Find and tap <strong>Oneura</strong></li>
            <li>Tap <strong>Cancel subscription</strong> and follow the prompts</li>
          </ol>

          <p className="highlight">
            <strong>Important:</strong> Deleting the Oneura app or deleting your Oneura account does{" "}
            <strong>not</strong> automatically cancel your subscription. You must cancel through your
            device&apos;s subscription settings as described above. Unprocessed renewals will
            continue until you cancel with the app store.
          </p>

          <p>
            For more information about subscription plans and pricing, see our{" "}
            <Link to={subscriptionHref}>Subscription page</Link>.
          </p>
        </section>

        <section className="policy-section">
          <h2>UK consumer rights</h2>
          <p>
            If you are a consumer in the United Kingdom, you have certain statutory rights that
            cannot be excluded or limited by contract. These include rights under the Consumer
            Rights Act 2015 relating to digital content.
          </p>
          <p>
            Under UK law, digital content must be of satisfactory quality, fit for a particular
            purpose, and as described. If digital content does not meet these standards, you may be
            entitled to a repair, replacement, or refund depending on the circumstances.
          </p>
          <p>
            <strong>Right to cancel (cooling-off period):</strong> When you purchase a subscription
            online, UK consumer law generally provides a 14-day cooling-off period during which you
            can cancel for any reason. However, by using Oneura Plus features immediately after
            purchase, you may acknowledge that you lose your right to cancel once digital content
            delivery has begun. The app stores provide this acknowledgement during the purchase
            process.
          </p>
          <p>
            Nothing in our terms or this policy limits or excludes your statutory consumer rights.
            If you believe you have a valid claim under UK consumer law that has not been addressed,
            please contact us at{" "}
            <a href="mailto:support@strato-craft.com">support@strato-craft.com</a>.
          </p>
        </section>

        <section className="policy-section">
          <h2>Free trials</h2>
          <p>
            From time to time, we may offer free trials of Oneura Plus. If you start a free trial:
          </p>
          <ul>
            <li>
              You will not be charged during the trial period
            </li>
            <li>
              Unless you cancel before the trial ends, your subscription will automatically convert
              to a paid subscription and you will be charged the applicable subscription fee
            </li>
            <li>
              To avoid being charged, cancel through your device&apos;s subscription settings before
              the trial period ends
            </li>
          </ul>
          <p>
            Free trial terms and duration will be clearly stated at the time of sign-up.
          </p>
        </section>

        <section className="policy-section">
          <h2>Price changes</h2>
          <p>
            We may change subscription prices from time to time. If we increase prices, we will
            provide advance notice as required by the app stores and applicable law. Price changes
            will typically apply to new subscribers immediately and to existing subscribers at their
            next renewal date following the notice period.
          </p>
          <p>
            You can always cancel before a price change takes effect to avoid being charged the new
            price.
          </p>
        </section>

        <section className="policy-section">
          <h2>Failed payments</h2>
          <p>
            If a renewal payment fails (for example, due to an expired card or insufficient funds),
            the app store may retry the payment and/or temporarily suspend your access to premium
            features. We are not responsible for service interruptions caused by payment failures.
            Please ensure your payment method is up to date in your Apple ID or Google account
            settings.
          </p>
        </section>

        <section className="policy-section contact-section">
          <h2>Contact us</h2>
          <p>
            If you have questions about refunds, billing, or subscriptions, please contact us:
          </p>
          <div className="contact-box">
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
          <p>
            For general terms, see our <Link to={termsHref}>Terms &amp; Conditions</Link>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default OneuraRefundPolicy;
