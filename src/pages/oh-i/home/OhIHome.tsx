import React from "react";
import { Link } from "react-router-dom";
import "./OhIHome.css";
import profileCustomization from "../../../assets/images/profileCustomization.png";
import datePlanning from "../../../assets/images/datePlanning.png";
import matchingSystem from "../../../assets/images/matchingSystem.png";
import googlePlay from "../../../assets/images/google-play.png";
import appStore from "../../../assets/images/app-store.png";
import ohiLogo from "../../../assets/images/ohilogo.jpg";




const OhIHome: React.FC = () => {
  return (
    <div className="ohihome-container">
      {/* SEO Hidden Content for Search Engines */}
      <div className="seo-hidden" aria-hidden="false" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <h2>Oh-i Dating App - Personality-Based Matching and Location Dating</h2>
        <p>Oh-i is an innovative dating app that combines personality matching with location-based dating. Features include smart matching algorithm, mystery swiping, place-based dating, hide and seek dating game, personality insights, safety features, and inclusive dating for LGBTQ+ community. Download on Google Play Store and Apple App Store.</p>
        <p>Keywords: dating app, personality dating, location dating, smart matching, personality compatibility, place-based dating, dating near me, unique dating app, alternative to tinder, alternative to bumble, LGBTQ dating, safe dating app, personality test dating, dating with personality insights, Tinder like dating app, Bumble like dating app, Free dating app, Dating app for singles, Dating app for couples, Dating app for LGBTQ+ community</p>
      </div>
      
      {/* Hero Section */}
      <div className="ohihero">
        <img src={ohiLogo} alt="Oh-i - Personality and Place-Based Dating App Logo" className="app-logo" />
        <h1>Oh-i: Personality & Place-Based Dating</h1>
        <p>Discover a new way to match beyond traditional swiping.</p>
      
        {/* Store Buttons */}
        <div className="store-buttons">
          <a 
            href="https://play.google.com/store/apps/details?id=com.stratocraft.oh_i" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img src={googlePlay} alt="Get it on Google Play" className="store-badge" />
          </a>
          <a 
            href="https://apps.apple.com/app/oh-i" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img src={appStore} alt="Download on the App Store" className="store-badge" />
          </a>
        </div>

        <Link to="/oh-i/about" className="about-button">Learn More</Link>
      </div>

      {/* App Preview Section */}
      <div className="app-preview">
        <h2>Oh-i Preview</h2>
        <div className="preview-container">
          {/* App Screenshot 1 */}
          <div className="preview-box">
          <h3>Smart Matching</h3>
          <p>Get matched based on personality compatibility and shared interests.</p>
            <img src={matchingSystem} alt="Oh-i smart matching algorithm showing personality compatibility" />
            
          </div>

          {/* App Screenshot 2 */}
          <div className="preview-box">
            <img src={datePlanning} alt="Oh-i date planning feature with location-based matching" />
            <h3>Date Planning</h3>
            <p>Choose fun date spots and see who else is interested in the same places.</p>
          </div>

          {/* App Screenshot 3 */}
          <div className="preview-box">
          <h3>Personalized Profiles</h3>
          <p>Customize your profile with unique interests and personality insights.</p>
          <img src={profileCustomization} alt="Oh-i profile customization with personality insights" />
          
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <ul>
          <li><Link to="/oh-i/cookie-policy">Cookie Policy</Link></li>
          <li><Link to="/oh-i/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/oh-i/terms-and-conditions">Terms & Conditions</Link></li>
          <li><Link to="/oh-i/delete-data">Delete My Data</Link></li>
          <li><Link to="/oh-i/child-safety">Child Safety Policy</Link></li>

        </ul>
      </footer>
    </div>
  );
};

export default OhIHome;
