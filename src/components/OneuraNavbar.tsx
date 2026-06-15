import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import oneuraLogo from "../assets/images/oneura/logo-color.png";
import {
  STRATO_CRAFT_ORIGIN,
  STRATO_CRAFT_SUPPORT_URL,
} from "../constants/origins";
import { useOneuraPaths } from "../routes/oneuraPaths";
import GuidesNav from "./GuidesNav";
import LanguageSwitcher from "./LanguageSwitcher";

/**
 * Site chrome for oneura.app: Oneura-first nav; Strato-Craft is a footer/company link only.
 */
const OneuraNavbar: React.FC = () => {
  const { t } = useTranslation();
  const { homePath, pagePath } = useOneuraPaths();

  return (
    <nav className="navbar oneura-navbar">
      <Link to={homePath()} className="navbar-logo-link">
        <img src={oneuraLogo} alt="Oneura" className="navbar-logo" />
        <span className="brand-name">Oneura</span>
      </Link>

      <ul>
        <li>
          <Link to={homePath()}>{t("nav.home")}</Link>
        </li>
        <GuidesNav />
        <li>
          <Link to={pagePath("about")}>{t("nav.about")}</Link>
        </li>
        <li>
          <Link to={pagePath("subscription")}>{t("nav.subscription")}</Link>
        </li>
        <li>
          <Link to={pagePath("faq")}>{t("nav.faq")}</Link>
        </li>
        <li>
          <a
            href={STRATO_CRAFT_SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("nav.support")}
          </a>
        </li>
        <li>
          <a
            href={STRATO_CRAFT_ORIGIN}
            target="_blank"
            rel="noopener noreferrer"
            className="oneura-studio-link"
          >
            {t("nav.stratoCraft")}
          </a>
        </li>
        <LanguageSwitcher />
      </ul>
    </nav>
  );
};

export default OneuraNavbar;
