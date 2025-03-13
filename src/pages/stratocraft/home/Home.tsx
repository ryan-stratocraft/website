import React from "react";
import "./home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container"> {/* Ensures content is not under navbar */}
      {/* Hero Section */}
      <div className="hero">
        <h1>A Digital Agency Shaping Ideas</h1>
        <p>There are endless possibilities in building your business.</p>
      </div>

      {/* Features Section */}
      <div className="features">
        <h3>Discover how we work</h3>
        <p>To deliver outstanding results</p>

        <div className="feature-container">
          {/* Feature 1 */}
          <div className="feature-box">
            <span>01</span>
            <h4>Developing an effective strategy</h4>
            <p>We tailor strategies to meet your business needs.</p>
          </div>

          {/* Feature 2 */}
          <div className="feature-box">
            <span>02</span>
            <h4>Software development process</h4>
            <p>Using cutting-edge technology to build great products.</p>
          </div>

          {/* Feature 3 */}
          <div className="feature-box">
            <span>03</span>
            <h4>Automated testing & support</h4>
            <p>Ensuring reliability and performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
