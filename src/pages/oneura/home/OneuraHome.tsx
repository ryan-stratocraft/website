import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./OneuraHome.css";
import previewCafe from "../../../assets/images/oneura/preview-cafe-optimized.png";
import previewForest from "../../../assets/images/oneura/preview-forest-optimized.png";
import previewOcean from "../../../assets/images/oneura/preview-ocean-optimized.png";
import OneuraStoreButtons from "../../../components/OneuraStoreButtons";
import oneuraLogo from "../../../assets/images/oneura/logo-color.png";
import { useOneuraPaths } from "../../../routes/oneuraPaths";
import {
  ONEURA_COMPARE_GUIDE_LINKS,
  ONEURA_TOPIC_GUIDE_LINKS,
} from "../../../routes/oneuraGuideLinks";

const soundCategoryKeys = [
  "home.soundRain",
  "home.soundOcean",
  "home.soundForest",
  "home.soundStreams",
  "home.soundNoise",
  "home.soundFans",
  "home.soundCafe",
  "home.soundMeditation",
] as const;

const faqKeys = [
  { q: "home.faqWhatIsQ", a: "home.faqWhatIsA" },
  { q: "home.faqFreeQ", a: "home.faqFreeA" },
  { q: "home.faqFocusQ", a: "home.faqFocusA" },
  { q: "home.faqMedicalQ", a: "home.faqMedicalA" },
] as const;

const OneuraHome: React.FC = () => {
  const { t } = useTranslation();
  const { pagePath } = useOneuraPaths();

  const proofStats = [
    { value: t("home.statInstallsValue"), label: t("home.statInstallsLabel") },
    {
      value: t("home.statPlayRatingValue"),
      label: t("home.statPlayRatingLabel"),
    },
    {
      value: t("home.statAppStoreRatingValue"),
      label: t("home.statAppStoreRatingLabel"),
    },
    {
      value: t("home.statPlatformsValue"),
      label: t("home.statPlatformsLabel"),
    },
  ];

  const userReviews = [
    {
      name: "Ana L.",
      meta: t("home.reviewAnaMeta"),
      quote: t("home.reviewAnaQuote"),
    },
    {
      name: "Jessica F.",
      meta: t("home.reviewJessicaMeta"),
      quote: t("home.reviewJessicaQuote"),
    },
    {
      name: "Vika S.",
      meta: t("home.reviewVikaMeta"),
      quote: t("home.reviewVikaQuote"),
    },
  ];

  return (
    <main className="oneura-home-container">
      <section className="oneura-hero" aria-labelledby="oneura-home-title">
        <img
          src={oneuraLogo}
          alt={t("home.logoAlt")}
          className="app-logo"
          fetchPriority="high"
        />
        <p className="hero-kicker">{t("home.heroKicker")}</p>
        <h1 id="oneura-home-title">{t("home.heroTitle")}</h1>
        <p>{t("home.heroBody")}</p>

        <OneuraStoreButtons analyticsPlacement="hero" />

        <Link to={pagePath("about")} className="about-button">
          {t("home.exploreCta")}
        </Link>
      </section>

      <section className="answer-summary" aria-labelledby="what-is-oneura">
        <div className="answer-summary-inner">
          <h2 id="what-is-oneura">{t("home.whatIsTitle")}</h2>
          <p className="section-eyebrow">{t("home.quickAnswer")}</p>
          <p>{t("home.whatIsBody")}</p>

          <dl className="answer-facts">
            <div>
              <dt>{t("home.bestFor")}</dt>
              <dd>{t("home.bestForValue")}</dd>
            </div>
            <div>
              <dt>{t("home.platforms")}</dt>
              <dd>{t("home.platformsValue")}</dd>
            </div>
            <div>
              <dt>{t("home.price")}</dt>
              <dd>{t("home.priceValue")}</dd>
            </div>
            <div>
              <dt>{t("home.publisher")}</dt>
              <dd>{t("home.publisherValue")}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="positioning-section" aria-labelledby="busy-minds-title">
        <div className="positioning-inner">
          <p className="section-eyebrow">{t("home.busyMindsEyebrow")}</p>
          <h2 id="busy-minds-title">{t("home.busyMindsTitle")}</h2>
          <p>{t("home.busyMindsBody")}</p>
        </div>
      </section>

      <section className="topic-cluster-section" aria-labelledby="topic-cluster-title">
        <div className="section-heading">
          <p className="section-eyebrow">{t("home.topicsEyebrow")}</p>
          <h2 id="topic-cluster-title">{t("home.topicsTitle")}</h2>
          <p>{t("home.topicsBody")}</p>
        </div>

        <div className="topic-link-grid">
          {ONEURA_TOPIC_GUIDE_LINKS.map((topic) => (
            <Link
              className="topic-link-card"
              to={pagePath(topic.slug)}
              key={topic.slug}
            >
              <h3>{t(topic.titleKey)}</h3>
              <p>{t(topic.descKey)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="topic-cluster-section compare-cluster-section"
        aria-labelledby="compare-cluster-title"
      >
        <div className="section-heading">
          <p className="section-eyebrow">{t("home.compareEyebrow")}</p>
          <h2 id="compare-cluster-title">{t("home.compareTitle")}</h2>
          <p>{t("home.compareBody")}</p>
        </div>

        <div className="topic-link-grid compare-link-grid">
          {ONEURA_COMPARE_GUIDE_LINKS.map((topic) => (
            <Link
              className="topic-link-card compare-link-card"
              to={pagePath(topic.slug)}
              key={topic.slug}
            >
              <h3>{t(topic.titleKey)}</h3>
              <p>{t(topic.descKey)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="sound-category-section" aria-labelledby="sound-library">
        <div className="section-heading">
          <p className="section-eyebrow">{t("home.soundLibraryEyebrow")}</p>
          <h2 id="sound-library">{t("home.soundLibraryTitle")}</h2>
          <p>{t("home.soundLibraryBody")}</p>
        </div>

        <ul
          className="sound-category-list"
          aria-label={t("home.soundCategoriesLabel")}
        >
          {soundCategoryKeys.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </section>

      <section className="app-preview" aria-labelledby="preview-title">
        <h2 id="preview-title">{t("home.previewTitle")}</h2>
        <div className="preview-container">
          <article className="preview-box">
            <img
              src={previewOcean}
              alt={t("home.previewOceanAlt")}
              loading="lazy"
              decoding="async"
              className="preview-image"
            />
            <h3>{t("home.previewOceanTitle")}</h3>
            <p>{t("home.previewOceanBody")}</p>
          </article>

          <article className="preview-box">
            <img
              src={previewForest}
              alt={t("home.previewForestAlt")}
              loading="lazy"
              decoding="async"
              className="preview-image"
            />
            <h3>{t("home.previewForestTitle")}</h3>
            <p>{t("home.previewForestBody")}</p>
          </article>

          <article className="preview-box">
            <img
              src={previewCafe}
              alt={t("home.previewCafeAlt")}
              loading="lazy"
              decoding="async"
              className="preview-image"
            />
            <h3>{t("home.previewCafeTitle")}</h3>
            <p>{t("home.previewCafeBody")}</p>
          </article>
        </div>
      </section>

      <section className="features-section" aria-labelledby="features-title">
        <h2 id="features-title">{t("home.featuresTitle")}</h2>
        <div className="features-grid">
          <article className="feature-item">
            <div className="feature-icon" aria-hidden="true">
              {t("home.featureTimerIcon")}
            </div>
            <h3>{t("home.featureTimerTitle")}</h3>
            <p>{t("home.featureTimerBody")}</p>
          </article>
          <article className="feature-item">
            <div className="feature-icon" aria-hidden="true">
              {t("home.featureMixIcon")}
            </div>
            <h3>{t("home.featureMixTitle")}</h3>
            <p>{t("home.featureMixBody")}</p>
          </article>
          <article className="feature-item">
            <div className="feature-icon" aria-hidden="true">
              {t("home.featureMoodIcon")}
            </div>
            <h3>{t("home.featureMoodTitle")}</h3>
            <p>{t("home.featureMoodBody")}</p>
          </article>
          <article className="feature-item">
            <div className="feature-icon" aria-hidden="true">
              {t("home.featurePlusIcon")}
            </div>
            <h3>{t("home.featurePlusTitle")}</h3>
            <p>{t("home.featurePlusBody")}</p>
          </article>
        </div>
      </section>

      <section className="proof-section" aria-labelledby="proof-title">
        <div className="section-heading">
          <p className="section-eyebrow">{t("home.proofEyebrow")}</p>
          <h2 id="proof-title">{t("home.proofTitle")}</h2>
          <p>{t("home.proofBody")}</p>
        </div>

        <dl className="proof-stat-grid" aria-label={t("home.proofStatsLabel")}>
          {proofStats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>

        <div className="review-grid">
          {userReviews.map((review) => (
            <figure className="review-card" key={review.name}>
              <div className="review-rating" aria-label={t("home.reviewStars")}>
                {t("home.reviewStars")}
              </div>
              <blockquote>{review.quote}</blockquote>
              <figcaption>
                <strong>{review.name}</strong>
                <span>{review.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="oneura-faq" aria-labelledby="oneura-faq-title">
        <div className="section-heading">
          <p className="section-eyebrow">{t("home.faqEyebrow")}</p>
          <h2 id="oneura-faq-title">{t("home.faqTitle")}</h2>
        </div>

        <div className="faq-list">
          {faqKeys.map((faq) => (
            <article className="faq-item" key={faq.q}>
              <h3>{t(faq.q)}</h3>
              <p>{t(faq.a)}</p>
            </article>
          ))}
        </div>

        <Link to={pagePath("faq")} className="faq-see-all-link">
          {t("home.faqSeeAll")}
        </Link>
      </section>

      <section
        className="download-cta-section"
        aria-labelledby="download-cta-title"
      >
        <div className="download-cta-inner">
          <p className="section-eyebrow">{t("home.downloadEyebrow")}</p>
          <h2 id="download-cta-title">{t("home.downloadTitle")}</h2>
          <p>{t("home.downloadBody")}</p>
          <OneuraStoreButtons analyticsPlacement="home_download_cta" />
        </div>
      </section>
    </main>
  );
};

export default OneuraHome;
