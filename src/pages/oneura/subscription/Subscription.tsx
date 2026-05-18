import React from "react";
import "./Subscription.css";
import googlePlay from "../../../assets/images/google-play.png";
import appStore from "../../../assets/images/app-store.png";

const OneuraSubscription: React.FC = () => {
  return (
    <div className="oneura-subscription-container">
      {/* Hero Section */}
      <div className="subscription-hero">
        <h1>Oneura Plus</h1>
        <p>Unlock unlimited relaxation, sleep, and focus</p>
      </div>

      {/* Pricing Plans */}
      <div className="pricing-section">
        <h2>Choose Your Plan</h2>
        <p className="pricing-subtitle">
          Monthly and annual plans include a 7-day free trial (see app). Prices below match the UK store listing in
          GBP—your app store may show an equivalent in your local currency.
        </p>

        <div className="pricing-cards">
          {/* Free Plan */}
          <div className="pricing-card free-card">
            <div className="plan-badge">FREE</div>
            <h3>Free Tier</h3>
            <div className="price">
              <span className="amount">£0</span>
              <span className="period">forever</span>
            </div>
            <ul className="features">
              <li>✓ Listening allowance &amp; cool-down refreshes (quota shown in app)</li>
              <li>✓ Rewarded-video bonus time where offered</li>
              <li>✓ Core ambiences and previews</li>
              <li>✓ Mood, calendar &amp; insight surfaces that stay on the free tier</li>
              <li>✓ Stories &amp; sounds marked Free in the catalogue</li>
            </ul>
            <div className="plan-description">Try Oneura before you upgrade</div>
          </div>

          {/* Annual Plan — matches in-app “POPULAR” */}
          <div className="pricing-card popular-card">
            <div className="plan-badge popular-badge">POPULAR</div>
            <h3>Annual</h3>
            <p className="plan-tagline">Best value · Save 33% vs monthly</p>
            <div className="price">
              <span className="amount">£2.00</span>
              <span className="period">/month</span>
            </div>
            <p className="price-footnote">£23.99 billed annually</p>
            <div className="trial-badge">7-day free trial</div>
            <ul className="features">
              <li>✓ Unlimited listening</li>
              <li>✓ Full ambience sessions &amp; layered mixes</li>
              <li>✓ Ad-free experience</li>
              <li>✓ Premium catalogue: sounds &amp; sleep stories marked Plus</li>
              <li>✓ Sleep timers, looping &amp; uninterrupted floating player</li>
              <li>✓ Advanced playlists &amp; premium personalization where available</li>
            </ul>
            <div className="plan-description">
              7-day free trial, then £23.99 per year. Auto-renews until cancelled.
            </div>
          </div>

          {/* Monthly Plan */}
          <div className="pricing-card">
            <h3>Monthly</h3>
            <p className="plan-tagline">Perfect for trying out</p>
            <div className="price">
              <span className="amount">£2.99</span>
              <span className="period">/month</span>
            </div>
            <div className="trial-badge">7-day free trial</div>
            <ul className="features">
              <li>✓ Unlimited listening</li>
              <li>✓ Full ambience sessions &amp; layered mixes</li>
              <li>✓ Ad-free experience</li>
              <li>✓ Premium catalogue: sounds &amp; sleep stories marked Plus</li>
              <li>✓ Sleep timers, looping &amp; uninterrupted floating player</li>
              <li>✓ Advanced playlists &amp; premium personalization where available</li>
            </ul>
            <div className="plan-description">
              7-day free trial, then £2.99 per month. Auto-renews until cancelled.
            </div>
          </div>

          {/* Lifetime — matches in-app “BEST VALUE” */}
          <div className="pricing-card lifetime-card">
            <div className="plan-badge best-value-badge">BEST VALUE</div>
            <h3>Lifetime Access</h3>
            <p className="plan-tagline">Pay once, enjoy forever</p>
            <div className="price">
              <span className="amount">£179.99</span>
              <span className="period">one-time</span>
            </div>
            <ul className="features">
              <li>✓ Everything in Oneura Plus, with no subscription</li>
              <li>✓ Same premium catalogue and features as paying members</li>
              <li>✓ One-time purchase—no renewals</li>
              <li>✓ Keep access for the life of the product / your account</li>
            </ul>
            <div className="plan-description">One-time purchase. No subscription.</div>
          </div>
        </div>

        <p className="pricing-footnote">
          After installing the app, use <strong>Restore Purchases</strong> on the Membership screen if you reinstall
          or change device.
        </p>
      </div>

      {/* Features Comparison */}
      <div className="comparison-section">
        <h2>What's Included in Oneura Plus?</h2>
        <div className="comparison-grid">
          <div className="comparison-item">
            <div className="comparison-icon">⏰</div>
            <h3>Unlimited Listening</h3>
            <p>Listen as long as you need—no daily limits, no restrictions. Fall asleep to 8+ hours of continuous sound.</p>
          </div>
          <div className="comparison-item">
            <div className="comparison-icon">🎵</div>
            <h3>Premium Sound Library</h3>
            <p>Unlock exclusive high-quality soundscapes and ambiences not available in the free tier.</p>
          </div>
          <div className="comparison-item">
            <div className="comparison-icon">🚫</div>
            <h3>Ad-Free Experience</h3>
            <p>Enjoy uninterrupted relaxation without ads breaking your peaceful state.</p>
          </div>
          <div className="comparison-item">
            <div className="comparison-icon">📚</div>
            <h3>Premium stories & narratives</h3>
            <p>Binge sleep stories and narratives marked Plus—including extended listens not available on the metered tier.</p>
          </div>
          <div className="comparison-item">
            <div className="comparison-icon">🎨</div>
            <h3>Advanced Playlists</h3>
            <p>Create unlimited custom soundscapes with multiple sounds mixed perfectly.</p>
          </div>
          <div className="comparison-item">
            <div className="comparison-icon">🌟</div>
            <h3>What&apos;s next</h3>
            <p>
              Guided packs, sharper sleep/mood correlations, and deeper personalisation—the Plus tier is where we unlock the biggest new experiences first.
            </p>
          </div>
        </div>
      </div>

      {/* Free Trial Info */}
      <div className="trial-info-section">
        <h2>🎁 Start Your Free Trial</h2>
        <p>
          Try Oneura Plus <strong>risk-free for 7 days</strong>. Experience unlimited listening, premium sounds, 
          and all the features that make Oneura the perfect companion for sleep, relaxation, and focus.
        </p>
        <p>
          Cancel anytime during your trial and you won&apos;t be charged. Subscriptions auto-renew unless you
          cancel at least <strong>24 hours</strong> before the trial or billing period ends (manage in Google Play
          or the App Store).
        </p>
      </div>

      {/* FAQs */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>How do I start my free trial?</h3>
          <p>
            Download Oneura from the app store, create an account, and select a subscription plan. You'll get 
            7 days of full access before being charged.
          </p>
        </div>
        <div className="faq-item">
          <h3>Can I cancel my subscription?</h3>
          <p>
            Yes! You can cancel anytime through your device's subscription settings (Google Play or App Store). 
            You'll keep access until the end of your billing period.
          </p>
        </div>
        <div className="faq-item">
          <h3>What happens if I cancel?</h3>
          <p>
            You'll return to the free tier listening allowance (metering &amp; cool-down refreshes as shown in-app). Your preferences stay on device so you can resubscribe anytime.
          </p>
        </div>
        <div className="faq-item">
          <h3>How does Lifetime Access work?</h3>
          <p>
            Pay once (£179.99 in the UK listing) for the same Plus benefits as subscribers, with no renewals.
            Availability and price may vary slightly by storefront region. Use Restore Purchases if you reinstall the app.
          </p>
        </div>
        <div className="faq-item">
          <h3>Can I switch between plans?</h3>
          <p>
            Yes! You can upgrade or downgrade your plan at any time through your subscription settings. 
            Changes take effect at the start of your next billing cycle.
          </p>
        </div>
      </div>

      {/* Download CTA */}
      <div className="download-cta">
        <h2>Ready to Get Started?</h2>
        <p>Download Oneura and start your free trial today</p>
        <div className="store-buttons">
          <a 
            href="https://play.google.com/store/apps/details?id=com.stratocraft.oneura&pli=1" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img src={googlePlay} alt="Get it on Google Play" className="store-badge" />
          </a>
          <a 
            href="https://apps.apple.com/app/oneura/id6754253306" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img src={appStore} alt="Download on the App Store" className="store-badge" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default OneuraSubscription;

