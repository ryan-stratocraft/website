import React, { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useOneuraPaths } from "../routes/oneuraPaths";
import {
  ONEURA_COMPARE_GUIDE_LINKS,
  ONEURA_GUIDE_LINKS,
  ONEURA_TOPIC_GUIDE_LINKS,
} from "../routes/oneuraGuideLinks";
import "./GuidesNav.css";

const GuidesNav: React.FC = () => {
  const { t } = useTranslation();
  const { pagePath } = useOneuraPaths();
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
          <div className="guides-nav-overlay" onClick={() => setOpen(false)}>
            <div
              id={dialogId}
              className="guides-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="guides-nav-panel-header">
                <h2 id={titleId}>{t("nav.guides")}</h2>
                <button
                  type="button"
                  className="guides-nav-close"
                  aria-label="Close guides menu"
                  onClick={() => setOpen(false)}
                >
                  ×
                </button>
              </div>

              <div className="guides-nav-list">
                <p className="guides-nav-section-label">{t("nav.guidesCompare")}</p>
                <ul className="guides-nav-links">
                  {ONEURA_COMPARE_GUIDE_LINKS.map((guide) => (
                    <li key={guide.slug}>
                      <Link
                        to={pagePath(guide.slug)}
                        className="guides-nav-link"
                        onClick={() => setOpen(false)}
                      >
                        <span className="guides-nav-link-title">
                          {t(guide.titleKey)}
                        </span>
                        <span className="guides-nav-link-desc">
                          {t(guide.descKey)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="guides-nav-section-label">{t("nav.guidesExplore")}</p>
                <ul className="guides-nav-links">
                  {ONEURA_TOPIC_GUIDE_LINKS.map((guide) => (
                    <li key={guide.slug}>
                      <Link
                        to={pagePath(guide.slug)}
                        className="guides-nav-link"
                        onClick={() => setOpen(false)}
                      >
                        <span className="guides-nav-link-title">
                          {t(guide.titleKey)}
                        </span>
                        <span className="guides-nav-link-desc">
                          {t(guide.descKey)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <li className="guides-nav-item">
        <nav aria-label={t("nav.guides")} className="guides-nav-crawl">
          <ul>
            {ONEURA_GUIDE_LINKS.map((guide) => (
              <li key={guide.slug}>
                <Link to={pagePath(guide.slug)}>{t(guide.titleKey)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="dropdown-toggle guides-nav-trigger"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? dialogId : undefined}
          onClick={() => setOpen(true)}
        >
          {t("nav.guides")} ▼
        </button>
      </li>
      {modal}
    </>
  );
};

export default GuidesNav;
