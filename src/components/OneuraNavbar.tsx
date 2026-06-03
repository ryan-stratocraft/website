import React from "react";
import { Link } from "react-router-dom";
import oneuraLogo from "../assets/images/oneura/logo-color.png";
import {
  STRATO_CRAFT_ORIGIN,
  STRATO_CRAFT_SUPPORT_URL,
} from "../constants/origins";
import { oneuraHomePath, oneuraPagePath } from "../routes/oneuraPaths";

/**
 * Site chrome for oneura.app: Oneura-first nav; Strato-Craft is a footer/company link only.
 */
const OneuraNavbar: React.FC = () => {
  return (
    <nav className="navbar oneura-navbar">
      <Link to={oneuraHomePath()} className="navbar-logo-link">
        <img src={oneuraLogo} alt="Oneura" className="navbar-logo" />
        <span className="brand-name">Oneura</span>
      </Link>

      <ul>
        <li>
          <Link to={oneuraHomePath()}>Home</Link>
        </li>
        <li>
          <Link to={oneuraPagePath("about")}>About</Link>
        </li>
        <li>
          <Link to={oneuraPagePath("subscription")}>Subscription</Link>
        </li>
        <li>
          <Link to={oneuraPagePath("faq")}>FAQ</Link>
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
          <a
            href={STRATO_CRAFT_ORIGIN}
            target="_blank"
            rel="noopener noreferrer"
            className="oneura-studio-link"
          >
            Strato-Craft ↗
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default OneuraNavbar;
