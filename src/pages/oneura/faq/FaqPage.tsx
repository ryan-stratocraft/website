import React from "react";
import { Link } from "react-router-dom";
import { oneuraPagePath } from "../../../routes/oneuraPaths";
import OneuraStoreButtons from "../../../components/OneuraStoreButtons";
import oneuraLogo from "../../../assets/images/oneura/logo-color.png";
import faqData from "./faqData.json";
import "./FaqPage.css";

/**
 * Renders a FAQ answer that may contain newline-separated lines, turning any
 * lines that begin with "- " into a bulleted list and the rest into paragraphs.
 * Content is the single source of truth in faqData.json (also consumed by the
 * build-time FAQPage schema generator in scripts/oneura-schema-data.mjs).
 */
const FaqAnswer: React.FC<{ answer: string }> = ({ answer }) => {
  const lines = answer.split("\n").filter((line) => line.trim().length > 0);
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (bullets.length === 0) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`}>
        {bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  for (const line of lines) {
    if (line.startsWith("- ")) {
      bullets.push(line.slice(2));
    } else {
      flushBullets();
      blocks.push(<p key={`p-${blocks.length}`}>{line}</p>);
    }
  }
  flushBullets();

  return <>{blocks}</>;
};

const FaqPage: React.FC = () => {
  return (
    <main className="oneura-faq-page">
      <section className="oneura-faq-hero" aria-labelledby="oneura-faq-page-title">
        <img
          src={oneuraLogo}
          alt="Oneura app icon"
          className="app-logo"
          fetchPriority="high"
        />
        <p className="hero-kicker">Oneura help & FAQ</p>
        <h1 id="oneura-faq-page-title">Frequently asked questions about Oneura</h1>
        <p>
          Answers about sleep sounds, white and coloured noise, sensory
          relaxation for busy and neurodivergent minds (including ADHD and
          AuDHD), focus, mood tracking, and the Oneura Plus subscription. If your
          question isn't here, you can reach us from the support link in the app.
        </p>
        <OneuraStoreButtons analyticsPlacement="faq-hero" />
      </section>

      {faqData.categories.map((category) => (
        <section
          key={category.id}
          className="oneura-faq-category"
          aria-labelledby={`faq-cat-${category.id}`}
        >
          <h2 id={`faq-cat-${category.id}`}>{category.title}</h2>
          <div className="faq-list">
            {category.questions.map((faq) => (
              <article className="faq-item" key={faq.question}>
                <h3>{faq.question}</h3>
                <FaqAnswer answer={faq.answer} />
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="oneura-faq-footer-cta">
        <p>
          Still deciding? Read more about{" "}
          <Link to={oneuraPagePath("about")}>what Oneura does</Link> or compare{" "}
          <Link to={oneuraPagePath("subscription")}>Oneura Plus plans</Link>.
        </p>
      </section>
    </main>
  );
};

export default FaqPage;
