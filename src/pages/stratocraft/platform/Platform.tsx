import React from "react";
import { Link } from "react-router-dom";
import "./platform.css";

const Platform: React.FC = () => {
  return (
    <div className="platform-page">
      <div className="platform-hero">
        <h1>Your brand. Your customer experience. Powered by Strato-Craft.</h1>
        <p>
          License a proven wellness operating model as a separately branded app.
          You own the store listing, content, tone of voice and memberships.
          We own and operate the reusable platform underneath.
        </p>
        <Link className="platform-cta" to="/platform/contact">
          Talk to us
        </Link>
      </div>
      <div className="platform-grid">
        <Link className="platform-card" to="/platform/capabilities">
          <h3>Capabilities</h3>
          <p>Modular features you can license, not a copy of Oneura.</p>
        </Link>
        <Link className="platform-card" to="/platform/content">
          <h3>Content catalogue</h3>
          <p>Launch with licensed sounds and stories, or add your own.</p>
        </Link>
        <Link className="platform-card" to="/platform/how-it-works">
          <h3>How it works</h3>
          <p>App Studio for marketing. Managed platform for everything else.</p>
        </Link>
      </div>
      <p className="platform-note">
        Oneura remains Strato-Craft’s neurodivergent wellness product. Licensed
        apps are separate brands with their own customer relationships.
      </p>
    </div>
  );
};

export default Platform;
