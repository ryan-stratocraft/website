import React from "react";
import "./platform.css";

const PlatformContent: React.FC = () => {
  return (
    <div className="platform-page">
      <section className="platform-section">
        <h1>Content catalogue</h1>
        <p>
          Oneura media can be licensed as packs. Clients can also upload their
          own audio and stories. Licensed files are a time-bounded right of use,
          not a transfer of ownership.
        </p>
      </section>
      <div className="platform-grid">
        <article className="platform-card">
          <h3>Sleep sounds</h3>
          <p>Rain, ocean, wind, white noise, fire, forest and other ambience.</p>
        </article>
        <article className="platform-card">
          <h3>Stories and sessions</h3>
          <p>General-audience narrated stories, breathing and guided relaxation.</p>
        </article>
        <article className="platform-card">
          <h3>Exclusive layer</h3>
          <p>Oneura-only content stays out of the default catalogue.</p>
        </article>
      </div>
    </div>
  );
};

export default PlatformContent;
