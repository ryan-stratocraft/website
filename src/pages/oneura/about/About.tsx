import React from "react";
import "./About.css";
import logoColor from "../../../assets/images/oneura/logo-color.png";
import googlePlay from "../../../assets/images/google-play.png";
import appStore from "../../../assets/images/app-store.png";

const OneuraAbout: React.FC = () => {
  return (
    <div className="oneura-about-container">
      {/* Hero Section with Logo */}
      <div className="about-hero">
        <img src={logoColor} alt="Oneura Logo" className="about-logo" />
        <h1>Welcome to Oneura</h1>
        <p className="tagline">Your sanctuary for relaxation, sleep, and focus</p>
      </div>

      {/* About Content */}
      <div className="about-content">
        <section className="about-section">
          <h2>🌙 Better Sleep & Deep Relaxation</h2>
          <p>
            Drift into restful sleep with our carefully curated collection of <strong>calming soundscapes</strong>. 
            From gentle ocean waves to soothing rain and peaceful forest ambience, Oneura creates the perfect 
            environment for deep, restorative sleep.
          </p>
          <p>
            Our audio is designed to reduce anxiety, lower stress levels, and help you fall asleep faster—giving 
            you the rest you deserve.
          </p>
        </section>

        <section className="about-section">
          <h2>🎵 Immersive Sound Library</h2>
          <p>
            Choose from an extensive library of high-quality sounds:
          </p>
          <ul className="feature-list">
            <li><strong>Ocean Waves</strong> - Gentle coastal rhythms</li>
            <li><strong>Rain & Storms</strong> - From light drizzle to thunderstorms</li>
            <li><strong>Forest Ambience</strong> - Birds chirping, leaves rustling</li>
            <li><strong>White & Pink Noise</strong> - Perfect for focus and blocking distractions</li>
            <li><strong>Cafe Atmosphere</strong> - Productive background chatter</li>
            <li><strong>Wind Chimes</strong> - Peaceful and meditative</li>
            <li><strong>Fans & Air Flow</strong> - Consistent, calming background noise</li>
            <li><strong>Streams & Water</strong> - Flowing water sounds</li>
          </ul>
          <p>
            Mix and match sounds to create your perfect soundscape, or explore our curated playlists designed by 
            experts for specific moods and activities.
          </p>
        </section>

        <section className="about-section">
          <h2>🧘 Mindfulness & Enhanced Focus</h2>
          <p>
            Oneura isn't just for sleep—it's your companion for <strong>productivity and mindfulness</strong>. 
            Our immersive audio environments help you:
          </p>
          <ul className="feature-list">
            <li>Stay focused during work or study sessions</li>
            <li>Practice meditation and breathing exercises</li>
            <li>Block out distractions in busy environments</li>
            <li>Create a calming atmosphere for yoga and relaxation</li>
            <li>Enhance creativity and deep work</li>
          </ul>
          <p>
            With optional haptic feedback and beautiful visualizers, Oneura creates a multi-sensory experience 
            that helps you stay present and centered.
          </p>
        </section>

        <section className="about-section">
          <h2>✨ Premium Features</h2>
          <p>
            Elevate your Oneura experience with <strong>Oneura Plus</strong>:
          </p>
          <ul className="feature-list">
            <li><strong>Unlimited Listening</strong> - No daily limits, listen as long as you need</li>
            <li><strong>Full Ambience Sessions</strong> - Unlock complete guided experiences</li>
            <li><strong>Exclusive Premium Sounds</strong> - Access to our expanding premium library</li>
            <li><strong>Ad-Free Experience</strong> - Uninterrupted relaxation</li>
            <li><strong>Advanced Playlists</strong> - Create unlimited custom soundscapes</li>
            <li><strong>Sleep Timer & Loops</strong> - Customize your listening experience</li>
            <li><strong>Offline Downloads</strong> - Take your favorite sounds anywhere</li>
          </ul>
          <p>
            Or unlock <strong>lifetime access</strong> with a one-time purchase and enjoy Oneura forever!
          </p>
        </section>

        <section className="about-section">
          <h2>🆓 Free Tier</h2>
          <p>
            Start your journey to better sleep and relaxation with our generous free tier:
          </p>
          <ul className="feature-list">
            <li>20 minutes of daily listening time</li>
            <li>5-minute ambience previews</li>
            <li>Access to core sound library</li>
            <li>Basic sleep timer functionality</li>
            <li>Unlock additional sounds by watching short videos</li>
          </ul>
          <p>
            No credit card required. Download and start relaxing today!
          </p>
        </section>

        <section className="about-section">
          <h2>🎯 Our Mission</h2>
          <p>
            In today's fast-paced world, quality sleep and mental wellness are more important than ever. 
            Oneura was created to bring <strong>calm into your busy life</strong>—whether you're trying to 
            fall asleep, focus on work, or simply take a moment to breathe.
          </p>
          <p>
            We believe everyone deserves access to tools that support mental health and well-being. That's 
            why we offer a generous free tier alongside our premium options, ensuring Oneura is accessible 
            to all.
          </p>
        </section>

        <section className="about-section">
          <h2>🚀 What's Coming Next</h2>
          <p>
            We're constantly improving Oneura with new features on the horizon:
          </p>
          <ul className="feature-list">
            <li>Guided meditation stories and sleep narratives</li>
            <li>Daily affirmations and mindfulness prompts</li>
            <li>AI-powered voice journaling for reflection</li>
            <li>Mood tracking and wellness insights</li>
            <li>Community soundscapes created by users</li>
          </ul>
          <p>
            Join us on this journey to better sleep, deeper relaxation, and mindful living.
          </p>
        </section>

        {/* Download Section */}
        <section className="download-section">
          <h2>📲 Download Oneura Today</h2>
          <p>Start your journey to better rest, relaxation, and focus.</p>
          <div className="app-download-buttons">
            <a 
              href="https://play.google.com/store/apps/details?id=com.stratocraft.oneura&pli=1" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src={googlePlay} alt="Get it on Google Play" className="store-button" />
            </a>
            <a 
              href="#" 
              className="coming-soon-link"
              onClick={(e) => { e.preventDefault(); alert('Coming soon to the App Store!'); }}
            >
              <img src={appStore} alt="Download on the App Store" className="store-button store-button-disabled" />
            </a>
          </div>
          <p className="coming-soon-text">iOS version coming soon!</p>
        </section>
      </div>
    </div>
  );
};

export default OneuraAbout;

