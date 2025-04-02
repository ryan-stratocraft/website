import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import ohiPreview from "../../../assets/images/icon.jpg"; 
import iacPreview from "../../../assets/images/iac-preview.jpg"


const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <h1>Strato-Craft Ltd</h1>
        <p>We build digital products that merge AI with everyday life.</p>
      </div>

      {/* Product Philosophy */}
      <div className="products-section">
        <h2>Explore Our Products</h2>
        <p className="products-description">
          We’re not a consultancy. At Strato-Craft, we build and maintain our own products designed for public use — focusing on AI-powered experiences that are meaningful, accessible, and future-ready.
        </p>

        {/* Product Cards */}
        <div className="product-card">
          <img src={ohiPreview} alt="Oh-i App" className="product-image" />
          <div className="product-info">
            <h3>Oh-i</h3>
            <p>A next-gen dating app based on personality and location data.</p>
            <button onClick={() => navigate("/oh-i")} className="app-button">View App</button>
          </div>
        </div>

        <div className="product-card">
          <img src={iacPreview} alt="IAC Platform" className="product-image" />
          <div className="product-info">
            <h3>IAC Platform <span className="coming-soon">Coming Soon</span></h3>
            <p>
              A visual, intuitive way to understand cloud infrastructure — ideal for developers, teams, and curious learners.
            </p>
            <button onClick={() => navigate("/iac-vr")} className="app-button">View App</button>

          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <h3>How We Build</h3>
        <p>Creating reliable, intuitive, and forward-thinking applications.</p>

        <div className="feature-container">
          <div className="feature-box">
            <span>01</span>
            <h4>AI at the Core</h4>
            <p>Our apps are powered by machine learning and behavior-driven design.</p>
          </div>

          <div className="feature-box">
            <span>02</span>
            <h4>Future-Oriented</h4>
            <p>We're always exploring new paradigms like VR, voice, and automation.</p>
          </div>

          <div className="feature-box">
            <span>03</span>
            <h4>Real-World Impact</h4>
            <p>We design for actual people. Our products are made to be used, not pitched.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
