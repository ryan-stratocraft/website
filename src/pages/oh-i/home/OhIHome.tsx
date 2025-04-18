import React from "react";
import { Link } from "react-router-dom";
import "./OhIHome.css";
import profileCustomization from "../../../assets/images/profileCustomization.png"; // Adjust path as needed
import datePlanning from "../../../assets/images/datePlanning.png"; // Adjust path as needed
import matchingSystem from "../../../assets/images/matchingSystem.png"; // Adjust path as needed




const OhIHome: React.FC = () => {
  return (
    <div className="ohihome-container">
      {/* Hero Section */}
      <div className="ohihero">
        <h1>Oh-i: Personality & Place-Based Dating</h1>
        <p>Discover a new way to match beyond traditional swiping.</p>
      
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
            <img src={matchingSystem} alt="Matching System" />
            
          </div>

          {/* App Screenshot 2 */}
          <div className="preview-box">
            <img src={datePlanning} alt="Date Planning" />
            <h3>Date Planning</h3>
            <p>Choose fun date spots and see who else is interested in the same places.</p>
          </div>

          {/* App Screenshot 3 */}
          <div className="preview-box">
          <h3>Personalized Profiles</h3>
          <p>Customize your profile with unique interests and personality insights.</p>
          <img src={profileCustomization} alt="Profile Customization" />
          
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
