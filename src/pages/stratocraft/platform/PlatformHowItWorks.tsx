import React from "react";
import "./platform.css";

const PlatformHowItWorks: React.FC = () => {
  return (
    <div className="platform-page">
      <section className="platform-section">
        <h1>How it works</h1>
        <p>
          A licensed app is a branded shell on shared packages. Marketing teams
          use App Studio to change approved sections, copy and campaigns.
          Strato-Craft operates infrastructure, releases and the entitlement
          engine.
        </p>
      </section>
      <div className="platform-grid">
        <article className="platform-card">
          <h3>1. Licence</h3>
          <p>Choose modules and content packs. Exclusive Oneura capabilities stay off unless agreed.</p>
        </article>
        <article className="platform-card">
          <h3>2. App Studio</h3>
          <p>Compose Home, Relax, Sleep and Profile from approved components. Live phone preview included.</p>
        </article>
        <article className="platform-card">
          <h3>3. Operate</h3>
          <p>You own Apple, Google and RevenueCat. We ship, monitor and upgrade the platform.</p>
        </article>
      </div>
    </div>
  );
};

export default PlatformHowItWorks;
