import React from "react";
import "./about.css"; // ✅ Import page-specific CSS

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Strato-Craft</h1>
      <p className="about-text">
        We are a company focused on building innovative Applications.
      </p>
    </div>
  );
};

export default About;
