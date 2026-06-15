import React, { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ONEURA_LOCALES } from "../i18n/localeConfig";
import { switchLocalePath } from "../i18n/localePath";
import { useOneuraLocaleConfig } from "../i18n/OneuraLocaleProvider";
import "./LanguageSwitcher.css";

function GlobeIcon() {
  return (
    <svg
      className="language-switcher-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.93 9h-3.18a15.6 15.6 0 0 0-1.07-4.36A8.02 8.02 0 0 1 19.93 11ZM12 4c.95 1.2 1.72 2.86 2.08 5H9.92C10.28 6.86 11.05 5.2 12 4ZM4.25 13h3.18c.14 1.48.48 2.88 1.01 4.07A8.02 8.02 0 0 1 4.25 13Zm3.18-2H4.25a8.02 8.02 0 0 1 4.19-3.93C7.73 8.12 7.39 9.52 7.25 11Zm2.67 7h4.16c-.36 2.14-1.13 3.8-2.08 5-1.2-1.52-1.87-3.18-2.08-5Zm4.16-2H9.92c.21-1.82.88-3.48 2.08-5 .95 1.52 1.72 3.18 2.08 5Zm2.49 2.07c.53-1.19.87-2.59 1.01-4.07h3.18a8.02 8.02 0 0 1-4.19 3.93Z"
      />
    </svg>
  );
}

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const activeLocale = useOneuraLocaleConfig();
  const dialogId = useId();
  const titleId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const modal =
    open && typeof document !== "undefined"
      ? createPortal(
          <div
            className="language-switcher-overlay"
            onClick={() => setOpen(false)}
          >
            <div
              id={dialogId}
              className="language-switcher-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="language-switcher-panel-header">
                <h2 id={titleId}>{t("nav.language")}</h2>
                <button
                  type="button"
                  className="language-switcher-close"
                  aria-label="Close language menu"
                  onClick={() => setOpen(false)}
                >
                  ×
                </button>
              </div>
              <ul
                className="language-switcher-list"
                role="listbox"
                aria-label={t("nav.language")}
              >
                {ONEURA_LOCALES.map((locale) => (
                  <li
                    key={locale.id}
                    role="option"
                    aria-selected={locale.id === activeLocale.id}
                  >
                    <button
                      type="button"
                      className={
                        locale.id === activeLocale.id
                          ? "language-switcher-option is-active"
                          : "language-switcher-option"
                      }
                      onClick={() => {
                        setOpen(false);
                        navigate(switchLocalePath(location.pathname, locale));
                      }}
                    >
                      {locale.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <li className="language-switcher-item">
        <button
          type="button"
          className="dropdown-toggle language-switcher-trigger"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? dialogId : undefined}
          aria-label={`${t("nav.language")}: ${activeLocale.label}`}
          onClick={() => setOpen(true)}
        >
          <GlobeIcon />
          <span className="language-switcher-label">{activeLocale.label}</span>
        </button>
      </li>
      {modal}
    </>
  );
};

export default LanguageSwitcher;
