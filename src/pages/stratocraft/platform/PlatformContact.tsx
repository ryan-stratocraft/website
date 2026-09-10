import React from "react";
import { Link } from "react-router-dom";
import "./platform.css";

const PlatformContact: React.FC = () => {
  return (
    <div className="platform-page">
      <section className="platform-section">
        <h1>Platform enquiries</h1>
        <p>
          If you want a branded wellness app on the Strato-Craft platform,
          start with a conversation about ownership, modules and channels.
          We do not list live licensee brands here.
        </p>
        <Link className="platform-cta" to="/support">
          Contact Strato-Craft
        </Link>
      </section>
    </div>
  );
};

export default PlatformContact;
