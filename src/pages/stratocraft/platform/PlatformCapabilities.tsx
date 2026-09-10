import React from "react";
import "./platform.css";

const PlatformCapabilities: React.FC = () => {
  return (
    <div className="platform-page">
      <section className="platform-section">
        <h1>Platform capabilities</h1>
        <p>
          Client apps compose approved modules. Neurodivergent journeys, sensory
          tools and related positioning stay with Oneura unless they are
          licensed as a deliberate exception.
        </p>
      </section>
      <div className="platform-grid">
        <article className="platform-card">
          <h3>Core</h3>
          <p>Identity, audio engine, entitlements, analytics, notifications, theme tokens.</p>
        </article>
        <article className="platform-card">
          <h3>Licensable</h3>
          <p>Sounds, stories, meditations, mixer, routines, QR campaigns, mood, insights, health.</p>
        </article>
        <article className="platform-card">
          <h3>Client-owned</h3>
          <p>Brand, copy, memberships, campaigns, and approved home-screen composition.</p>
        </article>
      </div>
    </div>
  );
};

export default PlatformCapabilities;
