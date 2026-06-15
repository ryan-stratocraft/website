import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { STRATO_CRAFT_SUPPORT_URL } from "../constants/origins";
import {
  ONEURA_FACEBOOK_URL,
  ONEURA_INSTAGRAM_URL,
} from "../constants/oneuraSocial";
import { useOneuraPaths } from "../routes/oneuraPaths";
import {
  ONEURA_GUIDE_LINKS,
} from "../routes/oneuraGuideLinks";
import "./OneuraFooter.css";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 8.5h2.5l-.5 3H14v9h-3.5v-9H9v-3h1.5V7.2c0-2.2 1.3-3.7 3.6-3.7H16v3h-1.8c-.9 0-1.2.5-1.2 1.2V8.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm0 2.2A2.8 2.8 0 0 0 5.2 8v8A2.8 2.8 0 0 0 8 18.8h8a2.8 2.8 0 0 0 2.8-2.8V8A2.8 2.8 0 0 0 16 5.2H8zm9.2 1.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm0 2.2A1.3 1.3 0 1 0 13.3 12 1.3 1.3 0 0 0 12 10.7z" />
    </svg>
  );
}

const OneuraFooter: React.FC = () => {
  const { t } = useTranslation();
  const { pagePath } = useOneuraPaths();

  return (
    <footer className="oneura-footer">
      <div className="oneura-footer-social">
        <a
          href={ONEURA_FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Oneura on Facebook"
        >
          <FacebookIcon />
        </a>
        <a
          href={ONEURA_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Oneura on Instagram"
        >
          <InstagramIcon />
        </a>
      </div>
      <ul className="oneura-footer-links">
        <li>
          <Link to={pagePath("about")}>About</Link>
        </li>
        <li>
          <Link to={pagePath("subscription")}>Subscription</Link>
        </li>
        <li>
          <Link to={pagePath("faq")}>FAQ</Link>
        </li>
        {ONEURA_GUIDE_LINKS.map((guide) => (
          <li key={guide.slug}>
            <Link to={pagePath(guide.slug)}>{t(guide.titleKey)}</Link>
          </li>
        ))}
        <li>
          <Link to={pagePath("privacy-policy")}>Privacy Policy</Link>
        </li>
        <li>
          <Link to={pagePath("terms-and-conditions")}>
            Terms &amp; Conditions
          </Link>
        </li>
        <li>
          <Link to={pagePath("cookie-policy")}>Cookie Policy</Link>
        </li>
        <li>
          <a
            href={STRATO_CRAFT_SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Support
          </a>
        </li>
        <li>
          <Link to={pagePath("delete-data")}>Delete My Data</Link>
        </li>
      </ul>
    </footer>
  );
};

export default OneuraFooter;
