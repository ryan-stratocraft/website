import React from "react";
import { Link } from "react-router-dom";
import "./OneuraHome.css";
import previewCafe from "../../../assets/images/oneura/preview-cafe-optimized.png";
import previewForest from "../../../assets/images/oneura/preview-forest-optimized.png";
import previewOcean from "../../../assets/images/oneura/preview-ocean-optimized.png";
import googlePlay from "../../../assets/images/google-play.png";
import appStore from "../../../assets/images/app-store.png";
import oneuraLogo from "../../../assets/images/oneura/logo-color.png";

const OneuraHome: React.FC = () => {
  return (
    <div className="oneura-home-container">
      {/* SEO Hidden Content for Search Engines */}
      <div className="seo-hidden" aria-hidden="false" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <h2>Oneura Sleep and Relaxation App - Download for Android and iOS</h2>
        <p>Oneura is a premium sleep app featuring calming soundscapes, white noise, meditation sounds, nature ambience, rain sounds, ocean waves, forest sounds, and focus music. Perfect for sleep, relaxation, stress relief, anxiety reduction, mindfulness, and concentration. Available on Google Play Store and Apple App Store.</p>
        <p>Keywords: sleep app, meditation app, relaxation app, white noise app, ambient sounds, nature sounds, sleep timer, focus music, stress relief, anxiety relief, mindfulness app, calming sounds, rain sounds, ocean sounds, forest ambience, free sleep app, premium sleep sounds, sleep app for ADHD, sleep app for autism, sleep app for anxiety, sleep app for depression, sleep app for insomnia, neurodivergent sleep app, relaxation for ADHD, meditation for anxiety, mood tracker app, sleep disorder help, alternative to Calm, alternative to Headspace, free meditation sounds</p>
      </div>
      
      {/* Hero Section */}
      <div className="oneura-hero">
        <img src={oneuraLogo} alt="Oneura - Sleep Relaxation and Focus App Logo" className="app-logo" />
        <h1>Oneura - Relax, Sleep & Focus</h1>
        <p>Your all-in-one app for better sleep, stress relief, and relaxation</p>
        
        {/* Store Buttons */}
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
            className="coming-soon-link"
            onClick={(e) => { e.preventDefault(); alert('Coming soon to the App Store!'); }}
          >
            <img src={appStore} alt="Download on the App Store" className="store-badge store-badge-disabled" />
          </a>
        </div>
        
        <Link to="/oneura/about" className="about-button">Learn More</Link>
      </div>

      {/* App Preview Section */}
      <div className="app-preview">
        <h2>Immersive Soundscapes & Visuals</h2>
        <div className="preview-container">
          {/* Preview 1 */}
          <div className="preview-box">
            <img 
              src={previewOcean} 
              alt="Oneura app showing ocean waves soundscape for sleep and relaxation"
              loading="lazy"
              decoding="async"
              className="preview-image"
            />
            <h3>Sleep & Relaxation</h3>
            <p>Drift into deep rest with calming ocean waves, rain, and soothing sounds designed to improve your sleep cycle.</p>
          </div>

          {/* Preview 2 */}
          <div className="preview-box">
            <img 
              src={previewForest} 
              alt="Oneura sound library with forest ambience and nature sounds"
              loading="lazy"
              decoding="async"
              className="preview-image"
            />
            <h3>Sound Library & Ambience</h3>
            <p>Choose from nature ambiences, white noise, and more. Build custom playlists or explore curated soundscapes.</p>
          </div>

          {/* Preview 3 */}
          <div className="preview-box">
            <img 
              src={previewCafe} 
              alt="Oneura cafe atmosphere and focus sounds for productivity"
              loading="lazy"
              decoding="async"
              className="preview-image"
            />
            <h3>Mindfulness & Focus</h3>
            <p>Reduce stress with immersive audio, calming visualizers, and ambient sounds to enhance focus and productivity.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🌙</div>
            <h3>Sleep Timer</h3>
            <p>Set a timer and drift off peacefully</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎵</div>
            <h3>Custom Playlists</h3>
            <p>Mix your favorite sounds together</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✨</div>
            <h3>Premium Sounds</h3>
            <p>Unlock exclusive ambiences</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <h3>Offline Mode</h3>
            <p>Download and listen anywhere</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <ul>
          <li><Link to="/oneura/about">About</Link></li>
          <li><Link to="/oneura/subscription">Subscription</Link></li>
          <li><Link to="/oneura/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/oneura/terms-and-conditions">Terms & Conditions</Link></li>
          <li><Link to="/oneura/cookie-policy">Cookie Policy</Link></li>
          <li><Link to="/oneura/delete-data">Delete My Data</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default OneuraHome;

