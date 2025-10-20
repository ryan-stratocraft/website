import React from "react";
import "./about.css";

const About: React.FC = () => {
  return (
    <div className="strato-about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About Strato-Craft</h1>
        <p className="tagline">Building apps that make technology more human</p>
      </div>

      {/* Mission Section */}
      <section className="about-section mission-section">
        <div className="section-icon">🚀</div>
        <h2>Our Mission</h2>
        <p>
          Strato-Craft is a digital product company focused on building applications that make life 
          easier, more accessible, and more human—through AI. We develop innovative tools that help 
          people understand, connect, and interact with the world in new ways.
        </p>
        <p>
          We don't build for profit margins or trends—we build with <strong>real people</strong> in mind.
        </p>
      </section>

      {/* Story Section */}
      <section className="about-section story-section">
        <div className="section-icon">💡</div>
        <h2>Our Story</h2>
        <p>
          Strato-Craft was founded with a personal purpose: to use technology, especially AI, to support 
          <strong> neurodivergent individuals</strong> like myself in navigating challenges in learning, 
          communication, dating, and day-to-day living.
        </p>
        <p>
          We believe technology should adapt to people, not the other way around.
        </p>
      </section>

      {/* Products Section */}
      <section className="about-section products-section">
        <h2>What We're Building</h2>
        
        <div className="product-highlight">
          <div className="product-icon">💕</div>
          <div className="product-content">
            <h3>Oneura - Relax, Sleep & Focus</h3>
            <p>
              Your all-in-one app for better sleep, stress relief, and relaxation through immersive 
              soundscapes. Available now on Google Play.
            </p>
          </div>
        </div>

        <div className="product-highlight">
          <div className="product-icon">❤️</div>
          <div className="product-content">
            <h3>Oh-i - Dating Reimagined</h3>
            <p>
              Our first product is a personality- and place-based dating app that reimagines how people 
              match and connect. It's just the beginning.
            </p>
          </div>
        </div>

        <div className="product-highlight">
          <div className="product-icon">🔧</div>
          <div className="product-content">
            <h3>IAC VR - Visual Infrastructure</h3>
            <p>
              Our flagship project: a visual Infrastructure-as-Code platform designed to help people 
              interact with complex systems in intuitive ways—especially for those who learn best by 
              seeing and doing.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="about-section philosophy-section">
        <div className="section-icon">🎯</div>
        <h2>Our Philosophy</h2>
        <p>
          At our core, we're not a consultancy or a service provider. <strong>We're builders</strong>—creating 
          useful, empathetic, and empowering apps. Our products are tools designed to help people experience 
          the world on their own terms.
        </p>
      </section>

      {/* Collaboration Section */}
      <section className="about-section collaboration-section">
        <div className="section-icon">🤝</div>
        <h2>Let's Collaborate</h2>
        <p>
          We believe in collaboration and responsiveness. If you have an idea or a real-life problem you 
          want solved through tech, <strong>reach out</strong>.
        </p>
        <p>
          If we build something based on your idea, we'll recognize you publicly as a contributor and 
          offer a small stake in the app (subject to terms and conditions). We don't charge people for 
          sharing ideas—they're what move us forward.
        </p>
        <div className="contact-cta">
          <a href="mailto:support@strato-craft.com" className="contact-button">
            Get in Touch
          </a>
        </div>
      </section>

      {/* Closing Section */}
      <section className="about-section closing-section">
        <h2>For the Curious & Creative</h2>
        <p>
          Strato-Craft is here for the curious, the different, the creative, and the visionary. We're 
          building apps for people who want the world to make a bit more sense—and maybe even be more fun.
        </p>
      </section>
    </div>
  );
};

export default About;
