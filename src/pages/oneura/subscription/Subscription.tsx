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
        <p className="pricing-subtitle">All plans include a free trial to experience Oneura Plus</p>

        <div className="pricing-cards">
          {/* Free Plan */}
          <div className="pricing-card free-card">
            <div className="plan-badge">FREE</div>
            <h3>Free Tier</h3>
            <div className="price">
              <span className="amount">$0</span>
              <span className="period">/forever</span>
            </div>
            <ul className="features">
              <li>✓ 20 minutes daily listening</li>
              <li>✓ 5-minute ambience previews</li>
              <li>✓ Access to core sound library</li>
              <li>✓ Basic sleep timer</li>
              <li>✓ Unlock sounds via ads</li>
            </ul>
            <div className="plan-description">
              Perfect for trying out Oneura and experiencing the basics
            </div>
          </div>

          {/* Monthly Plan */}
          <div className="pricing-card">
            <h3>Monthly</h3>
            <div className="price">
              <span className="amount">$4.99</span>
              <span className="period">/month</span>
            </div>
            <div className="trial-badge">7-Day Free Trial</div>
            <ul className="features">
              <li>✓ Unlimited listening time</li>
              <li>✓ Full ambience sessions</li>
              <li>✓ Ad-free experience</li>
              <li>✓ Exclusive premium sounds</li>
              <li>✓ Advanced playlists</li>
              <li>✓ Sleep timer & loops</li>
              <li>✓ Offline downloads</li>
            </ul>
            <div className="plan-description">
              Flexible monthly access, cancel anytime
            </div>
          </div>

          {/* Annual Plan */}
          <div className="pricing-card popular-card">
            <div className="plan-badge popular-badge">BEST VALUE</div>
            <h3>Annual</h3>
            <div className="price">
              <span className="amount">$29.99</span>
              <span className="period">/year</span>
            </div>
            <div className="savings">Save 50% vs Monthly</div>
            <div className="trial-badge">7-Day Free Trial</div>
            <ul className="features">
              <li>✓ Everything in Monthly</li>
              <li>✓ Best value per month</li>
              <li>✓ Priority support</li>
              <li>✓ Early access to new features</li>
              <li>✓ Exclusive annual-only sounds</li>
            </ul>
            <div className="plan-description">
              Most popular choice - best for committed users
            </div>
          </div>

          {/* Lifetime Plan */}
          <div className="pricing-card lifetime-card">
            <div className="plan-badge lifetime-badge">LIFETIME ACCESS</div>
            <h3>Lifetime</h3>
            <div className="price">
              <span className="amount">$79.99</span>
              <span className="period">one-time</span>
            </div>
            <div className="savings">Pay once, own forever</div>
            <ul className="features">
              <li>✓ Lifetime unlimited access</li>
              <li>✓ All current & future features</li>
              <li>✓ No recurring payments</li>
              <li>✓ Priority support forever</li>
              <li>✓ Exclusive lifetime sounds</li>
              <li>✓ Support future development</li>
            </ul>
            <div className="plan-description">
              One payment, lifetime of relaxation and peace
            </div>
          </div>
        </div>
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
            <div className="comparison-icon">📱</div>
            <h3>Offline Mode</h3>
            <p>Download your favorite sounds and listen anywhere, even without internet.</p>
          </div>
          <div className="comparison-item">
            <div className="comparison-icon">🎨</div>
            <h3>Advanced Playlists</h3>
            <p>Create unlimited custom soundscapes with multiple sounds mixed perfectly.</p>
          </div>
          <div className="comparison-item">
            <div className="comparison-icon">🌟</div>
            <h3>Future Features</h3>
            <p>Get access to upcoming guided meditations, stories, affirmations, and AI journaling.</p>
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
          Cancel anytime during your trial and you won't be charged. If you love it (and we think you will), 
          your subscription continues automatically.
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
            You'll return to the free tier with 20 minutes of daily listening. Your playlists and preferences 
            are saved, so you can resubscribe anytime.
          </p>
        </div>
        <div className="faq-item">
          <h3>How does the lifetime plan work?</h3>
          <p>
            Pay once and get lifetime access to all current and future Oneura Plus features. No recurring 
            payments, no expiration. Own it forever.
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
            href="#" 
            onClick={(e) => { e.preventDefault(); alert('Coming soon to the App Store!'); }}
          >
            <img src={appStore} alt="Download on the App Store" className="store-badge store-badge-disabled" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default OneuraSubscription;

