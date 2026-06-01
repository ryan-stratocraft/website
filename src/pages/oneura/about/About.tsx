import React from "react";
import { Link } from "react-router-dom";
import { oneuraPagePath } from "../../../routes/oneuraPaths";
import "./About.css";
import logoColor from "../../../assets/images/oneura/logo-color.png";
import googlePlay from "../../../assets/images/google-play.png";
import appStore from "../../../assets/images/app-store.png";

const OneuraAbout: React.FC = () => {
  return (
    <div className="oneura-about-container">
      <div className="about-hero">
        <img src={logoColor} alt="Oneura Logo" className="about-logo" />
        <h1>Welcome to Oneura</h1>
        <p className="tagline">Your sanctuary for relaxation, sleep, and focus</p>
      </div>

      <div className="about-content">
        <section className="about-section about-founder">
          <h2>
            <span className="about-section-icon" aria-hidden="true">✨</span>
            Why we built Oneura
          </h2>
          <p>
            Oneura began at home. My wife and I had used well-known meditation
            and sleep apps, but for her - <strong>AuDHD</strong> - the structure
            often felt overwhelming: busy screens, too many paths, and pressure
            to subscribe. Evenings turned into decision fatigue and scrolling,
            then the same few &ldquo;safe&rdquo; sounds on repeat. We stayed on
            free tiers because premium plans were out of reach, and the choice
            never quite matched what she needed.
          </p>
          <p>
            I&apos;m <strong>autistic</strong> as well, but I built Oneura for her
            first - calmer layout, real variety, and less noise so she could pick
            something quickly, sleep more easily, and use it when she felt
            overloaded. Our children loved it too. She was the one who said
            others must feel the same: in a world where calmness shouldn&apos;t depend
            on an expensive subscription, more people deserve a gentle escape.
            She encouraged me to release it publicly; <strong>Strato-Craft Ltd</strong>{" "}
            is how we ship and support it properly.
          </p>
          <p>
            We still measure pricing against what we can afford ourselves, and we
            aim to stay below the big apps - even if, one day, Oneura grows to
            sit alongside them. The product stays simple: choose an atmosphere,
            set a timer, and let the app stay out of the way.
          </p>
          <p>
            Oneura is <strong>wellness software only</strong>. It does not
            diagnose conditions, provide therapy, or replace advice from a
            qualified professional. Questions? Use{" "}
            <a
              href="https://strato-craft.com/support"
              target="_blank"
              rel="noopener noreferrer"
            >
              Strato-Craft support
            </a>
            .
          </p>
        </section>

        <section className="about-section">
          <h2>
            <span className="about-section-icon" aria-hidden="true">🌙</span>
            Better Sleep &amp; Deep Relaxation
          </h2>
          <p>
            Drift into restorative rest with a broad palette of{" "}
            <strong>calming soundscapes</strong> - ocean, rain, forests, gentle fans,
            streams, and curated noise colours when you need steady masking sound.
            Whether you&apos;re settling in after a long day or quieting a busy mind,
            Oneura is built to lower tension and make it easier to switch off.
          </p>
          <p>
            Pair audio with optional{" "}
            <strong>ambience and wind-down visuals</strong> where available, set a
            nightly wind-down reminder, and let layers of sound carry you through the
            evening without reaching for another screen.
          </p>
        </section>

        <section className="about-section">
          <h2>
            <span className="about-section-icon" aria-hidden="true">📊</span>
            Smart sleep insights &amp; wearables - guidance you steer
          </h2>
          <p>
            When you choose to link <strong>supported health and wearable apps</strong>{" "}
            (permissions vary by device), Oneura can combine your listening habits with
            the sleep signals you already collect - things like bedtime consistency or
            duration trends - into a fuller picture than raw numbers alone.
          </p>
          <p>
            The goal isn&apos;t to overwhelm you with charts: it&apos;s to surface{" "}
            <strong>clear, practical nudges</strong> - patterns you might optimise, rhythms
            to experiment with next week, cosy experiments with sound or wind-down
            timing - and <strong>you decide</strong> what fits your life and values. Think
            of it as reflective guidance for better habits,{" "}
            <strong>not a diagnosis</strong>, not a verdict, and certainly not{" "}
            <strong>medical advice</strong>.
          </p>
          <ul className="feature-list">
            <li>Suggestions rooted in correlations you can see - not hidden scores or opaque “scores” pretending to judge your health</li>
            <li>Friction-free language: optimise for <em>you</em>, on <em>your</em> terms</li>
            <li>Open invitation to iterate: try small changes, revisit insights, iterate again</li>
            <li>Always steer serious or persistent concerns to qualified professionals - we&apos;re wellness software, not clinicians</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>
            <span className="about-section-icon" aria-hidden="true">🎵</span>
            Immersive Sound Library
          </h2>
          <p>Explore high-quality ambience and tones, including:</p>
          <ul className="feature-list">
            <li>
              <strong>Ocean &amp; coastal</strong>  -  rolling surf and shoreline calm
            </li>
            <li>
              <strong>Rain &amp; storms</strong>  -  from soft drizzle to steady downpour
            </li>
            <li>
              <strong>Forest &amp; wildlife</strong>  -  birds, leaves, and woodland air
            </li>
            <li>
              <strong>Noise palettes</strong>  -  white, pink, green &amp; brown noise for
              focus and sleep
            </li>
            <li>
              <strong>Café &amp; chatter</strong>  -  gentle bustle for productive flow
            </li>
            <li>
              <strong>Wind chimes, fans, air, traffic cues &amp; more</strong>  -  niche
              textures when you crave something specific
            </li>
            <li>
              <strong>Frequencies &amp; tonal beds</strong>  -  simple carriers for masking
              and meditation
            </li>
          </ul>
          <p>
            Stack ambience with the floating player, save favourite mixes, and return
            to what worked last night. When you upgrade to Plus you unlock{" "}
            <strong>longer ambience sessions</strong> and labelled{" "}
            <strong>premium soundscapes</strong> right inside the explorer.
          </p>
        </section>

        <section className="about-section">
          <h2>
            <span className="about-section-icon" aria-hidden="true">🧘</span>
            Mindfulness &amp; Enhanced Focus
          </h2>
          <p>
            Oneura isn&apos;t only a sleep aid - it&apos;s a companion when you{" "}
            <strong>study</strong>, <strong>read</strong>, <strong>breathe</strong>, or{" "}
            <strong>dial in deep work</strong>. Immersive audio helps block out the
            world so you stay present where you intend to be.
          </p>
          <ul className="feature-list">
            <li>Stay centred during workouts, chores, creative sessions, or WFH stretches</li>
            <li>Lean on gentle rhythm and layering instead of juggling multiple apps</li>
            <li>
              Lose yourself in guided <strong>sleep stories &amp; narratives</strong> - many
              are included for everyone, while extended premium tales unlock with Oneura Plus
            </li>
            <li>
              Log <strong>mood snapshots</strong> and scan <strong>insight summaries</strong>{" "}
              that connect habits, evenings, and how you&apos;re trending over time
            </li>
            <li>
              Surface <strong>smart sleep &amp; recovery context</strong> when you&apos;ve
              opted into <strong>health + wearable integrations</strong> - pairing trends from
              your devices with how you unwind in Oneura, always framed as{" "}
              <strong>informational guidance</strong> for you to interpret
            </li>
            <li>Optional haptics and kinetic visuals amplify multi-sensory sessions</li>
          </ul>
          <p>
            Prefer to browse without syncing health data? Every integration stays{" "}
            <strong>optional and permission-led</strong> - the soundscape toolkit works on
            its own whenever you say so.
          </p>
        </section>

        <section className="about-section">
          <h2>
            <span className="about-section-icon" aria-hidden="true">✨</span>
            Premium Features
          </h2>
          <p>
            Ready to make Oneura your nightly ritual? Elevate the experience with{" "}
            <strong>Oneura Plus</strong>:
          </p>
          <ul className="feature-list">
            <li>
              <strong>Unlimited listening</strong>  -  no metering or daily caps inside the Plus tier
            </li>
            <li>
              <strong>Ad-free experience</strong>  -  stay in flow without interruptions
            </li>
            <li>
              <strong>Exclusive stories &amp; premium sounds</strong>  -  every item flagged in-app arrives unlocked
            </li>
            <li>
              <strong>Full-length ambience sessions</strong>  -  go beyond short previews
            </li>
            <li>
              <strong>Advanced layering &amp; playlists</strong>  -  build elaborate stacks and favourites
            </li>
            <li>
              <strong>Lifetime option</strong>  -  pay once on supported storefronts and keep Plus-style access
            </li>
          </ul>
          <p>
            Compare plans, trials, and pricing anytime on the{" "}
            <Link to={oneuraPagePath("subscription")}>subscription page</Link>.
          </p>
        </section>

        <section className="about-section">
          <h2>
            <span className="about-section-icon" aria-hidden="true">🆓</span>
            Free Tier
          </h2>
          <p>
            Start your journey with <strong>no credit card</strong>. The free experience
            includes a generous <strong>listening allowance</strong> that comes back after
            short pauses, plus the option to earn <strong>bonus time</strong> through
            rewarded videos when we surface them.
          </p>
          <ul className="feature-list">
            <li>Core soundscapes, ambience previews, and essential timers</li>
            <li>Mood logging, calendar views, and many insight cards</li>
            <li>Stories and sounds marked free - anything with a Plus badge waits for an upgrade</li>
            <li>Ideal for testing what calms you before committing to Plus</li>
          </ul>
          <p>
            What you see locked in the app mirrors what you&apos;ll unlock with Oneura
            Plus - no surprises at checkout.
          </p>
        </section>

        <section className="about-section">
          <h2>
            <span className="about-section-icon" aria-hidden="true">🎯</span>
            Our Mission
          </h2>
          <p>
            In a loud, always-on world, everyone deserves tools that help them rest,
            focus, and feel a little more human. Oneura brings together{" "}
            <strong>sound</strong>, <strong>story</strong>, and{" "}
            <strong>gentle guidance</strong> - including optional wearable-informed sleep
            context - without pretending to practise medicine or replace professional care.
          </p>
          <p>
            We keep a meaningful <strong>free tier</strong> alongside Oneura Plus because
            access matters - when you&apos;re ready to go deeper, we&apos;re here with the
            keys already built in.
          </p>
        </section>

        <section className="about-section">
          <h2>
            <span className="about-section-icon" aria-hidden="true">🚀</span>
            What&apos;s Coming Next
          </h2>
          <p>
            We ship updates often. On the horizon you&apos;ll see more of what you
            already love - just richer:
          </p>
          <ul className="feature-list">
            <li>More sleep narratives, seasonal packs, and affirmations wired into your flows</li>
            <li>Richer correlations between restorative audio, biometric trends you share, and the habits <em>you</em> choose to tweak - not prescriptions, just sharper mirrors</li>
            <li>Even more personalisation inside wind-down flows and playlists</li>
            <li>Wellness-connected views that stay explanatory: here&apos;s what we noticed, here&apos;s a gentle optimisation idea - always your call</li>
            <li>Community-requested staples - tell us via support reviews what you&apos;d vote for next</li>
          </ul>
          <p>Stay on the ride; the library and intelligence layer both keep growing.</p>
        </section>

        <section className="download-section">
          <h2>📲 Download Oneura Today</h2>
          <p>Bring calmer evenings and sharper focus pockets into your pocket - wherever life takes you.</p>
          <div className="app-download-buttons">
            <a
              href="https://play.google.com/store/apps/details?id=com.stratocraft.oneura&pli=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={googlePlay} alt="Get it on Google Play" className="store-button" />
            </a>
            <a
              href="https://apps.apple.com/app/oneura/id6754253306"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={appStore} alt="Download on the App Store" className="store-button" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OneuraAbout;
