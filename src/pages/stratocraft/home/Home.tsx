import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import ohiPreview from "../../../assets/images/ohilogo.jpg"; 
import iacPreview from "../../../assets/images/iac-preview.jpg";
import oneuraPreview from "../../../assets/images/oneura/logo-color.png";


const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* SEO Hidden Content for Search Engines */}
      <div className="seo-hidden" aria-hidden="false" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <h2>Strato-Craft - UK Mobile App Development Company</h2>
        <p>Strato-Craft Ltd is a UK-based mobile app development company specializing in AI-powered applications. Our portfolio includes Oneura (sleep and relaxation app), Oh-i (personality-based dating app), and IAC VR (cloud infrastructure visualization platform). We create innovative mobile experiences for iOS and Android using cutting-edge technology including artificial intelligence, machine learning, and virtual reality.</p>
        <p>Keywords: mobile app development, UK app developer, AI apps, machine learning apps, sleep app, dating app, cloud infrastructure, VR platform, iOS development, Android development, Flutter apps, innovative mobile apps, app development company UK</p>
      </div>
      
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
          <img src={oneuraPreview} alt="Oneura - Sleep and Relaxation App for Android and iOS" className="product-image" />
          <div className="product-info">
            <h3>Oneura - Relax, Sleep & Focus</h3>
            <p>Your all-in-one app for better sleep, stress relief, and relaxation through immersive soundscapes.</p>
            <button onClick={() => navigate("/oneura")} className="app-button">View App</button>
          </div>
        </div>

        <div className="product-card">
          <img src={ohiPreview} alt="Oh-i - Personality-Based Dating App with Location Matching" className="product-image" />
          <div className="product-info">
            <h3>Oh-i</h3>
            <p>A next-gen dating app based on personality and location data.</p>
            <button onClick={() => navigate("/oh-i")} className="app-button">View App</button>
          </div>
        </div>

        <div className="product-card">
          <img src={iacPreview} alt="IAC Platform - Cloud Infrastructure Visualization in VR" className="product-image" />
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
