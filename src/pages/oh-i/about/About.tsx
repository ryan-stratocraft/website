import React from "react";
import "./OhIAbout.css";
import coffeeCouple from "../../../assets/images/coffee_couple.jpeg"; // ✅ Import the image
import googlePlay from "../../../assets/images/google-play.png"; // ✅ Import Google Play Store button
import appStore from "../../../assets/images/app-store.png"; // ✅ Import Apple App Store button

const OhIAbout: React.FC = () => {
  return (
    <div className="oh-i-about-container">
      {/* Left Side - Text Content */}
      <div className="about-text">
        <h1>Dating Reimagined with Oh-i</h1>
        <p>
          Oh-i makes dating <strong>exciting again</strong> by blending our <strong>Smart Matching Algorithm</strong> with real-world places to create <strong>genuine</strong> connections.
        </p>
        <p>
          Instead of endless repetitive swiping like <em>certain</em> apps (👀🔥🐝), Oh-i lets you <strong>match in multiple ways</strong>, keeping dating fresh and fun!
        </p>

        <h2>🚀 Match Based on Places</h2>
        <p>
          Ever wanted to meet someone who shares your vibe? Search for places—<strong>coffee shops, restaurants, bars, events, or parks</strong>—and connect with people who also want to go there.
        </p>

        <h2>✨ Mystery Swiping</h2>
        <p>
          Our <strong>Smart Matching</strong> system brings an element of mystery. Profiles are slightly <strong>obscured</strong> at first, so it's <strong>personality first</strong> before looks, making connections <strong>deeper and more meaningful</strong>.
        </p>

        <h2>🎭 Hide & Seek (Marco/Polo)</h2>
        <p>
          A whole new way to meet people! <strong>As the hider, you're in full control</strong>—send quick <strong>clues</strong> (images & text) to seekers and watch them <strong>follow the breadcrumbs</strong> to win your heart!
        </p>

        <h2>🔥 Discover the Hotspots</h2>
        <p>
          See the <strong>most active spots</strong> in town where Oh-i users are, so you know where the action is happening.
        </p>
        <h2>🧠 Daily Personality Insights</h2>
        <p>
          Knowing <strong>yourself</strong> is a game-changer in dating. Get <strong>daily personality insights</strong>, detailed breakdowns of your matches' personalities, and <strong>expert dating advice</strong> tailored to their personality type.
        </p>

        <h2>🛡️ Safety First</h2>
        <p>
          Modern dating can be unpredictable. Use <strong>our safety feature</strong> to notify your trusted contacts about your dates—if you forget to check in, they’ll get a gentle reminder to make sure you're okay.
        </p>

        <h2>🌈 Inclusive for Everyone</h2>
        <p>
          Whether you're looking for something <strong>casual or serious</strong>, Oh-i is built to be <strong>inclusive for all genders & sexualities</strong>.
        </p>
      </div>

      {/* Right Side - Full-Height Image with Fade Effect */}
      <div className="about-image">
        <div className="image-overlay"></div>
        <img src={coffeeCouple} alt="Couple at Coffee Shop" />
      </div>

      {/* 🚀 App Store & Play Store Buttons (Bottom Right of Screen) */}
      <div className="app-download-links">
        <a href="https://play.google.com/store/apps/details?id=com.stratocraft.oh_i" target="_blank" rel="noopener noreferrer">
          <img src={googlePlay} alt="Download on Google Play" className="app-store-button" />
        </a>
        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
          <img src={appStore} alt="Download on App Store" className="app-store-button" />
        </a>
      </div>
    </div>
  );
};

export default OhIAbout;
