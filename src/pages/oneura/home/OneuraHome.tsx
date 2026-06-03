import React from "react";
import { Link } from "react-router-dom";
import { oneuraPagePath } from "../../../routes/oneuraPaths";
import "./OneuraHome.css";
import previewCafe from "../../../assets/images/oneura/preview-cafe-optimized.png";
import previewForest from "../../../assets/images/oneura/preview-forest-optimized.png";
import previewOcean from "../../../assets/images/oneura/preview-ocean-optimized.png";
import OneuraStoreButtons from "../../../components/OneuraStoreButtons";
import oneuraLogo from "../../../assets/images/oneura/logo-color.png";

const soundCategories = [
  "Rain and storms",
  "Ocean waves",
  "Forest ambience",
  "Streams and water",
  "White, pink, brown, and green noise",
  "Fans and steady air",
  "Cafe atmosphere",
  "Meditation and tonal beds",
];

const proofStats = [
  {
    value: "5,000+",
    label: "total installs",
  },
  {
    value: "5.0",
    label: "recent Google Play rating",
  },
  {
    value: "5.0",
    label: "App Store rating",
  },
  {
    value: "iOS + Android",
    label: "available platforms",
  },
];

const userReviews = [
  {
    name: "Ana L.",
    meta: "Google Play review, May 2026",
    quote:
      "Great app! It's nice to have all of my mindfulness stuff in one place (sounds, meditation, mood logs and more). It connects to my watch to give me insights, and I've been sleeping better since using both combined.",
  },
  {
    name: "Jessica F.",
    meta: "Google Play review, May 2026",
    quote:
      "Finally an app that isn't too 'busy' like all other ones. The layout is not overwhelming and can use it easily. There's a huge variety of sounds and meditations - the free features are better than all other apps I've tried.",
  },
  {
    name: "Vika S.",
    meta: "App Store review, February 2026",
    quote: "Real relaxation. Thanks for the app.",
  },
];

const topicLinks = [
  {
    slug: "sleep-sounds-white-noise" as const,
    title: "Sleep sounds and white noise",
    description:
      "A focused guide to Oneura as a sleep sounds app with white noise, brown noise, rain, ocean, fans, and timers.",
  },
  {
    slug: "sensory-relaxation-app" as const,
    title: "Sensory relaxation app",
    description:
      "How Oneura uses sound, ambience, optional haptics, and simple routines for overstimulated moments.",
  },
  {
    slug: "sleep-app-for-busy-minds" as const,
    title: "Sleep app for busy minds",
    description:
      "A calmer way to settle racing thoughts with soundscapes, sleep stories, and low-friction wind-downs.",
  },
  {
    slug: "neuro-friendly-sleep-app" as const,
    title: "Neuro-friendly sleep app",
    description:
      "Careful, non-medical language around sensory needs, busy minds, and flexible sleep support.",
  },
  {
    slug: "mood-tracking-sleep-app" as const,
    title: "Mood tracking sleep app",
    description:
      "How Oneura connects mood check-ins, sleep sounds, and gentle insight without heavy scoring.",
  },
  {
    slug: "sleep-sounds-for-focus" as const,
    title: "Sleep sounds for focus",
    description:
      "Use cafe ambience, fans, steady noise, and nature soundscapes for study, work, and transitions.",
  },
];

const faqs = [
  {
    question: "What is Oneura?",
    answer:
      "Oneura is a sleep sounds and sensory relaxation app for iOS and Android. It combines calming soundscapes, white noise, sleep stories, mood tracking, and gentle wind-down insights for busy minds.",
  },
  {
    question: "Is Oneura a free sleep app?",
    answer:
      "Oneura is free to download and includes a free listening tier. Oneura Plus adds unlimited listening, premium sounds, premium stories, ad-free use, and advanced playlists.",
  },
  {
    question: "Can Oneura help with focus as well as sleep?",
    answer:
      "Yes. Oneura includes steady noise, cafe ambience, nature sounds, and layered mixes that can support reading, studying, deep work, and calmer transitions between tasks.",
  },
  {
    question: "Does Oneura give medical advice?",
    answer:
      "No. Oneura is wellness software, not a medical device. Any mood or sleep insights are informational and reflective, and serious or persistent concerns should be discussed with a qualified professional.",
  },
];

const OneuraHome: React.FC = () => {
  return (
    <main className="oneura-home-container">
      <section className="oneura-hero" aria-labelledby="oneura-home-title">
        <img
          src={oneuraLogo}
          alt="Oneura app icon"
          className="app-logo"
          fetchPriority="high"
        />
        <p className="hero-kicker">Sleep sounds app for iOS and Android</p>
        <h1 id="oneura-home-title">
          Oneura sleep sounds, sensory relaxation, and mood-aware wind-downs
        </h1>
        <p>
          Build calmer evenings with relaxing soundscapes, sleep stories,
          focus-friendly ambience, mood tracking, and sensory support designed
          for busy minds, overstimulation, and your own wind-down routine.
        </p>

        <OneuraStoreButtons analyticsPlacement="hero" />

        <Link to={oneuraPagePath("about")} className="about-button">
          Explore Oneura
        </Link>
      </section>

      <section className="answer-summary" aria-labelledby="what-is-oneura">
        <div className="answer-summary-inner">
          <h2 id="what-is-oneura">What is Oneura?</h2>
          <p className="section-eyebrow">Quick answer</p>
          <p>
            Oneura is a mobile sleep sounds and sensory relaxation app from
            Strato-Craft Ltd. It helps people relax, sleep, focus, and reflect
            with ambient audio, mood tracking, optional health-connected
            context, and a simple subscription called Oneura Plus.
          </p>

          <dl className="answer-facts">
            <div>
              <dt>Best for</dt>
              <dd>
                Sleep, sensory relaxation, focus, overstimulation, and
                wind-down routines
              </dd>
            </div>
            <div>
              <dt>Platforms</dt>
              <dd>iOS and Android</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>Free download with optional Plus upgrade</dd>
            </div>
            <div>
              <dt>Publisher</dt>
              <dd>Strato-Craft Ltd</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="positioning-section" aria-labelledby="busy-minds-title">
        <div className="positioning-inner">
          <p className="section-eyebrow">Built for busy, overstimulated minds</p>
          <h2 id="busy-minds-title">
            Sleep support when switching off does not feel simple
          </h2>
          <p>
            Oneura is designed for people who struggle to settle after noisy,
            high-input days. Whether that means racing thoughts, sensory
            overload, focus fatigue, or needing a calmer evening routine, the
            app gives you sound, ambience, and reflection without turning
            relaxation into another performance.
          </p>
        </div>
      </section>

      <section className="topic-cluster-section" aria-labelledby="topic-cluster-title">
        <div className="section-heading">
          <p className="section-eyebrow">Built for the moments people search for</p>
          <h2 id="topic-cluster-title">
            Sleep sounds, sensory calm, and neuro-friendly wind-downs
          </h2>
          <p>
            Oneura is still a sleep app, but its sharper lane is calmer
            sensory support for busy, overstimulated minds that need a softer
            way into sleep, focus, or decompression.
          </p>
        </div>

        <div className="topic-link-grid">
          {topicLinks.map((topic) => (
            <Link
              className="topic-link-card"
              to={oneuraPagePath(topic.slug)}
              key={topic.slug}
            >
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="sound-category-section" aria-labelledby="sound-library">
        <div className="section-heading">
          <p className="section-eyebrow">Sound library</p>
          <h2 id="sound-library">Calming sounds for sleep, focus, and rest</h2>
          <p>
            Mix natural ambience, steady masking sounds, and gentle audio beds
            into a routine that fits the way you actually unwind.
          </p>
        </div>

        <ul className="sound-category-list" aria-label="Oneura sound categories">
          {soundCategories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </section>

      <section className="app-preview" aria-labelledby="preview-title">
        <h2 id="preview-title">Immersive soundscapes and visual moments</h2>
        <div className="preview-container">
          <article className="preview-box">
            <img
              src={previewOcean}
              alt="Oneura ocean waves soundscape for sleep and relaxation"
              loading="lazy"
              decoding="async"
              className="preview-image"
            />
            <h3>Sleep and relaxation</h3>
            <p>
              Drift into rest with ocean waves, rain, and soothing soundscapes
              that make night routines easier to repeat.
            </p>
          </article>

          <article className="preview-box">
            <img
              src={previewForest}
              alt="Oneura sound library with forest ambience and nature sounds"
              loading="lazy"
              decoding="async"
              className="preview-image"
            />
            <h3>Sound library and ambience</h3>
            <p>
              Choose from nature ambience, noise colours, and curated
              soundscapes. Save favourites and build mixes around your mood.
            </p>
          </article>

          <article className="preview-box">
            <img
              src={previewCafe}
              alt="Oneura cafe atmosphere and focus sounds for productivity"
              loading="lazy"
              decoding="async"
              className="preview-image"
            />
            <h3>Mindfulness and focus</h3>
            <p>
              Create a calmer background for reading, journaling, study,
              breathwork, or quiet productivity.
            </p>
          </article>
        </div>
      </section>

      <section className="features-section" aria-labelledby="features-title">
        <h2 id="features-title">Key features</h2>
        <div className="features-grid">
          <article className="feature-item">
            <div className="feature-icon" aria-hidden="true">
              Timer
            </div>
            <h3>Sleep timer</h3>
            <p>Set a timer and let your soundscape fade into the background.</p>
          </article>
          <article className="feature-item">
            <div className="feature-icon" aria-hidden="true">
              Mix
            </div>
            <h3>Layered playlists</h3>
            <p>Blend favourite sounds together for a personal ambience.</p>
          </article>
          <article className="feature-item">
            <div className="feature-icon" aria-hidden="true">
              Mood
            </div>
            <h3>Mood tracking</h3>
            <p>Log simple reflections and notice patterns over time.</p>
          </article>
          <article className="feature-item">
            <div className="feature-icon" aria-hidden="true">
              Plus
            </div>
            <h3>Oneura Plus</h3>
            <p>Unlock unlimited listening, premium audio, and ad-free use.</p>
          </article>
        </div>
      </section>

      <section className="proof-section" aria-labelledby="proof-title">
        <div className="section-heading">
          <p className="section-eyebrow">Early proof</p>
          <h2 id="proof-title">Trusted by people building calmer routines</h2>
          <p>
            Oneura is already helping users bring sounds, meditation, mood
            logs, and gentle insights together without making the app feel
            overwhelming.
          </p>
        </div>

        <dl className="proof-stat-grid" aria-label="Oneura proof points">
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
              <div className="review-rating" aria-label="5 out of 5 stars">
                5.0 stars
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
          <p className="section-eyebrow">FAQ</p>
          <h2 id="oneura-faq-title">Questions people ask about Oneura</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <article className="faq-item" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>

        <Link to={oneuraPagePath("faq")} className="faq-see-all-link">
          See all frequently asked questions →
        </Link>
      </section>

      <section
        className="download-cta-section"
        aria-labelledby="download-cta-title"
      >
        <div className="download-cta-inner">
          <p className="section-eyebrow">Get the app</p>
          <h2 id="download-cta-title">Download Oneura free on iOS and Android</h2>
          <p>
            Start with calming soundscapes, sleep stories, and mood-aware
            wind-downs. Upgrade to Plus anytime for unlimited listening.
          </p>
          <OneuraStoreButtons analyticsPlacement="home_download_cta" />
        </div>
      </section>
    </main>
  );
};

export default OneuraHome;
