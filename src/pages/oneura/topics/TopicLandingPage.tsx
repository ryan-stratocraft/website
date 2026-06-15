import React from "react";
import { Link } from "react-router-dom";
import { oneuraPagePath } from "../../../routes/oneuraPaths";
import googlePlay from "../../../assets/images/google-play.png";
import appStore from "../../../assets/images/app-store.png";
import {
  topicAdhdBusyMindGirl,
  topicBusyMindGirl,
  topicSleepingMan,
  topicSleepingWomanStars,
  topicWorkingFocused,
} from "./topicImages";
import { agentTopicContent } from "./agentTopicContent";
import type { TopicPageContent } from "./topicTypes";
import { topicTextWithLinks } from "./topicTextWithLinks";
import "./TopicLandingPage.css";

const googlePlayUrl =
  "https://play.google.com/store/apps/details?id=com.stratocraft.oneura";
const appStoreUrl = "https://apps.apple.com/app/oneura/id6754253306";

const contentBySlug: Record<string, TopicPageContent> = {
  "sleep-sounds-white-noise": {
    kicker: "Sleep sounds and white noise",
    title: "Oneura sleep sounds and white noise for ADHD, autism, and calmer nights",
    intro:
      "Use white noise, brown noise, rain, ocean waves, forest ambience, cafe atmosphere, and gentle soundscapes to build a repeatable wind-down routine - especially helpful for neurodivergent, ADHD, and AuDHD sensory masking at night.",
    image: topicSleepingMan,
    imageAlt:
      "Man sleeping peacefully - Oneura sleep sounds and white noise for neurodivergent nights",
    answerTitle: "What makes Oneura useful as a sleep sounds app?",
    answer:
      "Oneura focuses on quick, low-friction audio support: choose a calming sound, layer ambience where available, set a timer, and let the session support your night routine without turning bedtime into another task.",
    facts: [
      {
        label: "Best for",
        value: "Sleep sounds, white noise, brown noise, and wind-down routines",
      },
      {
        label: "Includes",
        value: "Rain, ocean, forest, fans, cafe ambience, noise colours, and stories",
      },
      {
        label: "Platforms",
        value: "iOS and Android",
      },
      {
        label: "Positioning",
        value: "A sleep app with sensory ambience and mood-aware reflection",
      },
    ],
    sections: [
      {
        title: "Sleep sounds without the ceremony",
        body:
          "Some nights do not need a long lesson or a full meditation course. They need a steady background that makes the room feel less sharp and the evening feel easier to close.",
        bullets: [
          "Start with nature sounds like rain, ocean, streams, and forest ambience",
          "Use steady noise colours for masking distracting room or street sound",
          "Keep the flow simple with favourites, timers, and recurring routines",
        ],
      },
      {
        title: "White noise, brown noise, and natural ambience",
        body:
          "Different minds settle with different textures. Oneura gives you a practical sound library so you can test what feels soft, steady, or grounding tonight.",
        bullets: [
          "White noise for bright, steady masking",
          "Brown and pink noise for deeper, softer backgrounds",
          "Cafe, fan, and air sounds for focus-friendly calm",
        ],
      },
      {
        title: "A sleep app that still leaves room for mood",
        body:
          "Sleep is not only about the sound playing in the background. Oneura also supports gentle reflection so you can notice what routines, times, and ambience types seem to work for you.",
        bullets: [
          "Mood check-ins help you reflect on patterns over time",
          "Oneura Plus unlocks longer sessions and premium audio",
          "Insights are informational and reflective, never medical advice",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Oneura mainly a sleep app?",
        answer:
          "Yes. Oneura is built around sleep sounds, calming ambience, wind-down routines, and relaxation, while also supporting focus and mood reflection.",
      },
      {
        question: "Does Oneura include white noise?",
        answer:
          "Oneura includes steady masking sounds and noise colour options such as white, pink, brown, and green noise where available in the app catalogue.",
      },
      {
        question: "Can I use Oneura without a subscription?",
        answer:
          "Yes. Oneura is free to download with a free listening tier. Oneura Plus adds unlimited listening, premium sounds, premium stories, and ad-free use.",
      },
    ],
    related: [
      {
        slug: "sleep-app-for-busy-minds",
        title: "Sleep app for busy minds",
        description: "A calmer wind-down for racing thoughts and restless evenings.",
      },
      {
        slug: "sensory-relaxation-app",
        title: "Sensory relaxation app",
        description: "Sound, visual ambience, and simple tools for decompression.",
      },
    ],
  },
  "sensory-relaxation-app": {
    kicker: "Sensory relaxation app",
    title: "A sensory relaxation app for overstimulated moments",
    intro:
      "Oneura combines calming soundscapes, simple visual ambience, optional haptics, and gentle routines for people who need to decompress - including many ADHD, autism, AuDHD, and neurodivergent users - without making relaxation complicated.",
    image: topicSleepingWomanStars,
    imageAlt:
      "Peaceful sleep under stars - Oneura sensory relaxation app for autism, ADHD, and AuDHD overstimulation",
    answerTitle: "What is a sensory relaxation app?",
    answer:
      "A sensory relaxation app uses sound, visuals, rhythm, and simple interaction to create a calmer environment. Oneura is designed to help busy, overstimulated minds find a softer background for rest, focus, or a wind-down break.",
    facts: [
      {
        label: "Best for",
        value: "Overstimulation, autism/ADHD/AuDHD decompression, sleep preparation, and calm focus",
      },
      {
        label: "Sensory tools",
        value: "Soundscapes, ambience, timers, mood reflection, visuals, and haptics",
      },
      {
        label: "Use style",
        value: "Press play, settle in, and adjust the experience around your state",
      },
      {
        label: "Care note",
        value: "Wellness support only, not medical or clinical treatment",
      },
    ],
    sections: [
      {
        title: "Built for decompression, not performance",
        body:
          "Many wellness apps ask you to learn a method before you feel any relief. Oneura is designed for the moments when you simply need a calmer sensory environment first.",
        bullets: [
          "Use soundscapes as a soft background after a loud or demanding day",
          "Choose ambience that feels grounding instead of attention-grabbing",
          "Let timers and favourites reduce the number of decisions at night",
        ],
      },
      {
        title: "Audio, visuals, and gentle rhythm",
        body:
          "The sensory lane is where Oneura can stand apart from broad meditation apps: less pressure to meditate perfectly, more room to settle through atmosphere.",
        bullets: [
          "Natural ambience for a calmer room feel",
          "Simple visuals and haptics where available for body-level cues",
          "Layered mixes for people who need more than silence",
        ],
      },
      {
        title: "Calm for sleep, study, and transitions",
        body:
          "Sensory relaxation is not only for bedtime. Oneura can also be used between tasks, during reading, for focus backgrounds, or as a transition out of work mode.",
        bullets: [
          "Create a focus-friendly background with cafe, fan, or noise sounds",
          "Use slower ambience when preparing for sleep",
          "Reflect on mood without turning the app into a heavy tracker",
        ],
      },
    ],
    faqs: [
      {
        question: "Can Oneura help with overstimulation?",
        answer:
          "Oneura can support moments of overstimulation by giving you calming sounds, simple ambience, and low-friction routines. It is not a medical treatment.",
      },
      {
        question: "Is sensory relaxation the same as meditation?",
        answer:
          "Not exactly. Meditation often asks for a specific mental practice. Sensory relaxation can be simpler: change the room's sound and feel so your body has a calmer place to land.",
      },
      {
        question: "Who is Oneura best for?",
        answer:
          "Oneura is useful for people who want sleep sounds, focus ambience, sensory decompression, mood reflection, and a gentle wind-down routine in one app.",
      },
    ],
    related: [
      {
        slug: "neuro-friendly-sleep-app",
        title: "Neuro-friendly sleep app",
        description: "Designed with busy minds and sensory needs in mind.",
      },
      {
        slug: "sleep-sounds-white-noise",
        title: "Sleep sounds and white noise",
        description: "Sleep audio, masking sounds, and calming ambience.",
      },
    ],
  },
  "sleep-app-for-busy-minds": {
    kicker: "Sleep app for busy minds",
    title: "A sleep app for busy minds, ADHD, AuDHD, and racing thoughts",
    intro:
      "Oneura helps restless evenings feel less crowded with soundscapes, white noise, sleep stories, mood-aware wind-downs, and calm sensory cues - designed for busy, neurodivergent, ADHD, and AuDHD minds.",
    image: topicBusyMindGirl,
    imageAlt:
      "Woman with racing thoughts - Oneura sleep app for busy minds, ADHD, and AuDHD overthinking",
    answerTitle: "How does Oneura support busy minds at bedtime?",
    answer:
      "Oneura gives busy minds something simple and repeatable to return to: choose a sound, lower the sensory load, set a timer, and use mood reflection to notice which wind-down patterns seem to help.",
    facts: [
      {
        label: "Best for",
        value:
          "Racing thoughts, ADHD, AuDHD, autism-friendly wind-downs, focus background, and bedtime routines",
      },
      {
        label: "Primary tools",
        value: "Soundscapes, sleep stories, timers, playlists, and mood check-ins",
      },
      {
        label: "Approach",
        value: "Less lesson-based, more immediate sensory support",
      },
      {
        label: "Safety",
        value: "Not medical advice and not a replacement for professional care",
      },
    ],
    sections: [
      {
        title: "When silence makes everything louder",
        body:
          "For some people, a quiet room is not relaxing. It gives thoughts more space to spin. Oneura gives the mind a softer background so bedtime can feel less abrupt.",
        bullets: [
          "Mask distracting sound with white noise, brown noise, or fans",
          "Use nature ambience when you want something less clinical",
          "Return to the same routine so sleep preparation feels familiar",
        ],
      },
      {
        title: "A wind-down without homework",
        body:
          "Oneura is made for people who do not always want a guided meditation or a long course. It is okay to press play and let ambience do the first part of the work.",
        bullets: [
          "Choose a sound in seconds",
          "Set a timer and step away from the screen",
          "Use mood-aware reflection when you want more context",
        ],
      },
      {
        title: "For focus as well as rest",
        body:
          "Busy minds often need support during the day too. Oneura can create a steady focus background for reading, study, journaling, or deep work.",
        bullets: [
          "Cafe ambience for gentle activity without interruption",
          "Noise colours for more consistent focus backgrounds",
          "Natural soundscapes for breaks and transitions",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Oneura good if meditation feels difficult?",
        answer:
          "Oneura can be a helpful alternative when formal meditation feels like too much. You can start with sound and ambience, then add reflection when it feels useful.",
      },
      {
        question: "Does Oneura treat insomnia or anxiety?",
        answer:
          "No. Oneura is wellness software and does not diagnose, treat, or prevent medical conditions. It can support routines, relaxation, and reflection.",
      },
      {
        question: "Can I use Oneura for focus during the day?",
        answer:
          "Yes. Oneura includes focus-friendly ambience such as steady noise, cafe atmosphere, fan sounds, and natural soundscapes.",
      },
    ],
    related: [
      {
        slug: "sensory-relaxation-app",
        title: "Sensory relaxation app",
        description: "A calmer sensory environment for decompression.",
      },
      {
        slug: "neuro-friendly-sleep-app",
        title: "Neuro-friendly sleep app",
        description: "Careful, non-medical sleep support for sensory needs.",
      },
    ],
  },
  "mood-tracking-sleep-app": {
    kicker: "Mood tracking sleep app",
    title: "A mood tracking sleep app for ADHD, AuDHD, and neurodivergent wind-downs",
    intro:
      "Oneura connects sleep sounds, gentle mood check-ins, and reflective insights so ADHD, autism, AuDHD, and neurodivergent users can notice which evening routines feel easier to repeat.",
    image: topicSleepingWomanStars,
    imageAlt:
      "Woman sleeping peacefully under stars - Oneura mood tracking sleep app for neurodivergent wind-down",
    answerTitle: "How does mood tracking fit into a sleep sounds app?",
    answer:
      "Mood tracking in Oneura is not about judging your night. It gives you a simple way to reflect on how you feel, what you listened to, and which wind-down habits may be worth repeating.",
    facts: [
      {
        label: "Best for",
        value: "Mood-aware wind-downs, routine building, sleep reflection, and calm evenings",
      },
      {
        label: "Primary tools",
        value: "Mood check-ins, calendar views, sound history, sleep sounds, and insights",
      },
      {
        label: "Tone",
        value: "Gentle reflection instead of heavy sleep scoring",
      },
      {
        label: "Care note",
        value: "Informational wellness support only, not medical or mental-health advice",
      },
    ],
    sections: [
      {
        title: "Reflect without turning bedtime into homework",
        body:
          "Some sleep tools become another dashboard to manage. Oneura keeps mood tracking light, so reflection supports your routine instead of making the evening feel more complicated.",
        bullets: [
          "Log how you feel with a simple mood snapshot",
          "Notice which sounds or routines seem to fit different evenings",
          "Use patterns as prompts for experimentation, not pressure",
        ],
      },
      {
        title: "Connect sound, mood, and routine",
        body:
          "A good wind-down is personal. Mood-aware context helps you understand whether rain, ocean, brown noise, stories, or a quieter focus background feels better for your state.",
        bullets: [
          "Pair soundscapes with mood reflection",
          "Use favourite mixes to make calmer routines easier to repeat",
          "Keep insights practical and easy to ignore when they are not useful",
        ],
      },
      {
        title: "Designed for non-medical insight",
        body:
          "Oneura can help you notice habits, but it does not diagnose sleep, mood, anxiety, ADHD, or any health condition. It is a wellness companion for reflection and routine.",
        bullets: [
          "Use insights as gentle observations",
          "Speak to a qualified professional for serious or persistent concerns",
          "Stay in control of what you track and how you use it",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Oneura a mood tracker?",
        answer:
          "Oneura includes mood tracking and reflective insight features, but it is primarily a sleep sounds and sensory relaxation app.",
      },
      {
        question: "Can mood tracking improve sleep?",
        answer:
          "Mood tracking can help some people notice patterns in routines and evenings. Oneura presents those reflections as informational wellness support, not medical advice.",
      },
      {
        question: "Does Oneura score my mental health?",
        answer:
          "No. Oneura is designed for gentle reflection and habit awareness, not clinical scoring, diagnosis, or treatment.",
      },
    ],
    related: [
      {
        slug: "sleep-app-for-busy-minds",
        title: "Sleep app for busy minds",
        description: "Low-friction wind-down support for racing thoughts.",
      },
      {
        slug: "sleep-sounds-white-noise",
        title: "Sleep sounds and white noise",
        description: "Audio-first support for calmer nights.",
      },
    ],
  },
  "sleep-sounds-for-focus": {
    kicker: "Sleep sounds for focus",
    title: "Focus sounds for ADHD, AuDHD, and neurodivergent study sessions",
    intro:
      "Oneura is not only for bedtime. Use cafe ambience, fans, steady noise, nature sounds, and layered soundscapes as a softer background for reading, study, and deep work - especially when ADHD, AuDHD, or autism-related sensory needs make open spaces feel abrasive.",
    image: topicWorkingFocused,
    imageAlt:
      "Focused student with headphones - Oneura focus sounds for ADHD and neurodivergent work",
    answerTitle: "Can sleep sounds also help with focus?",
    answer:
      "Yes. Many calming sound textures also work as focus backgrounds. Oneura lets you use steady noise, cafe atmosphere, natural ambience, and gentle mixes when silence feels too empty or interruptions feel too sharp.",
    facts: [
      {
        label: "Best for",
        value: "Study, reading, writing, focus blocks, breaks, and transitions",
      },
      {
        label: "Includes",
        value: "Cafe ambience, fans, white noise, brown noise, forest, rain, and ocean sounds",
      },
      {
        label: "Use style",
        value: "Choose a background, lower distraction, and keep working",
      },
      {
        label: "Also useful for",
        value: "Evening decompression and sleep preparation",
      },
    ],
    sections: [
      {
        title: "A calmer background for focus fatigue",
        body:
          "When the day feels noisy, a consistent sound bed can make it easier to stay with one task. Oneura gives you backgrounds that feel calm rather than demanding.",
        bullets: [
          "Use cafe ambience when total silence feels too flat",
          "Try steady noise for a consistent focus layer",
          "Switch to nature sounds when you need a softer break",
        ],
      },
      {
        title: "From deep work to wind-down",
        body:
          "The same app can support both work and rest because the routine is simple: change the sound environment to match the state you want to move toward.",
        bullets: [
          "Use brighter sounds for focus blocks",
          "Use slower ambience for decompression",
          "Save favourites so the next session starts faster",
        ],
      },
      {
        title: "Focus support without productivity pressure",
        body:
          "Oneura is not a task manager or performance tracker. It gives you sensory support so work, study, and transitions can feel less abrasive.",
        bullets: [
          "No complicated productivity system required",
          "Helpful for reading, journaling, study, and quiet work",
          "Pairs naturally with mood-aware reflection after the session",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Oneura a focus sounds app?",
        answer:
          "Oneura can be used as a focus sounds app, especially for cafe ambience, fan sounds, noise colours, and nature backgrounds.",
      },
      {
        question: "What sounds are good for studying?",
        answer:
          "Many people prefer steady noise, cafe atmosphere, rain, forest ambience, or low-detail soundscapes. Oneura lets you experiment with what feels least distracting.",
      },
      {
        question: "Can I use Oneura during work and at night?",
        answer:
          "Yes. Oneura supports focus backgrounds during the day and calming sleep sounds or stories at night.",
      },
    ],
    related: [
      {
        slug: "sensory-relaxation-app",
        title: "Sensory relaxation app",
        description: "Sound and ambience for overstimulated moments.",
      },
      {
        slug: "mood-tracking-sleep-app",
        title: "Mood tracking sleep app",
        description: "Reflect on which routines feel easier to repeat.",
      },
    ],
  },
  "neuro-friendly-sleep-app": {
    kicker: "Neuro-friendly sleep app",
    title: "A neuro-friendly sleep app for ADHD, autism, AuDHD, and sensory needs",
    intro:
      "Oneura is designed with ADHD, autism, AuDHD, busy minds, and sensory preferences in mind, while staying careful: it supports wind-down, focus regulation, and sensory calm - not diagnosis, treatment, or medical claims.",
    image: topicAdhdBusyMindGirl,
    imageAlt:
      "Child with a busy mind - Oneura neuro-friendly sleep app for ADHD, autism, and AuDHD",
    answerTitle: "What does neuro-friendly mean for Oneura?",
    answer:
      "For Oneura, neuro-friendly means low-friction choices, sensory-aware ambience, flexible routines, and clear language. It does not mean diagnosis, treatment, or a medical claim.",
    facts: [
      {
        label: "Best for",
        value:
          "ADHD, autism, AuDHD, busy minds, sensory needs, overstimulation, and gentler sleep routines",
      },
      {
        label: "Neurodivergent features",
        value:
          "Low-stimulation layouts, sensory-safe ambience, optional haptics, no heavy sleep-scoring pressure",
      },
      {
        label: "Designed around",
        value: "Sound, visual ambience, simple flows, timers, and reflective mood tools",
      },
      {
        label: "Important note",
        value: "Not a clinical tool, therapy service, or medical device",
      },
    ],
    sections: [
      {
        title: "A calmer path into bedtime",
        body:
          "Neuro-friendly sleep support starts by reducing friction. Oneura aims to make the first step easy: open the app, choose an atmosphere, and let the room feel less demanding.",
        bullets: [
          "Clear sound categories instead of overwhelming menus",
          "Repeatable favourites and routines for familiar evenings",
          "Sensory ambience for people who need more than silence",
        ],
      },
      {
        title: "Designed for sensory preference, not a single correct method",
        body:
          "Some users settle with rain. Others prefer brown noise, a fan, cafe atmosphere, or layered ambience. Oneura treats preference as part of the routine.",
        bullets: [
          "Try different textures and save what works",
          "Use sound for sleep, breaks, focus, or transitions",
          "Keep insights reflective, practical, and easy to ignore when not needed",
        ],
      },
      {
        title: "Careful about ADHD, autism, AuDHD, and neurodivergent language",
        body:
          "Oneura can be useful for people with ADHD, autism, AuDHD, or broader neurodivergent sensory and wind-down needs, but the app does not diagnose any condition, treat sleep disorders, or replace professional support.",
        bullets: [
          "Use Oneura as a wellness companion, not a treatment plan",
          "Speak to a qualified professional for persistent sleep or mental health concerns",
          "Choose the tools that fit your own body, mood, and evening",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Oneura an ADHD, autism, or AuDHD sleep app?",
        answer:
          "Oneura is designed to support wind-down, focus regulation, and sensory calm for many neurodivergent users, including people with ADHD, autism, or AuDHD. It is not a treatment and does not provide medical advice.",
      },
      {
        question: "Why use the phrase neuro-friendly?",
        answer:
          "We use it to describe the design approach: simple choices, sensory-aware ambience, flexible routines, and no pressure to meditate perfectly.",
      },
      {
        question: "Can Oneura support sensory needs?",
        answer:
          "Yes, Oneura is designed around soundscapes, ambience, optional haptics, and simple routines that can support sensory decompression for some users.",
      },
    ],
    related: [
      {
        slug: "sleep-app-for-busy-minds",
        title: "Sleep app for busy minds",
        description: "Sleep support for racing thoughts and restless evenings.",
      },
      {
        slug: "sensory-relaxation-app",
        title: "Sensory relaxation app",
        description: "Sound and ambience for overstimulated moments.",
      },
    ],
  },
  ...agentTopicContent,
};

function TopicLandingPage({ content }: { content: TopicPageContent }) {
  return (
    <main className="oneura-topic-container">
      <section className="oneura-topic-hero">
        <div className="oneura-topic-hero-copy">
          <p className="section-eyebrow">{content.kicker}</p>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>

          <div className="oneura-topic-actions" aria-label="Download Oneura">
            <a
              href={googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Oneura on Google Play"
            >
              <img
                src={googlePlay}
                alt="Get it on Google Play"
                className="store-badge"
              />
            </a>
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Oneura on the App Store"
            >
              <img
                src={appStore}
                alt="Download on the App Store"
                className="store-badge"
              />
            </a>
          </div>
        </div>

        <div className="oneura-topic-hero-media">
          <img src={content.image} alt={content.imageAlt} />
        </div>
      </section>

      <section className="oneura-topic-answer" aria-labelledby="topic-answer">
        <div className="oneura-topic-narrow">
          <p className="section-eyebrow">Quick answer</p>
          <h2 id="topic-answer">{content.answerTitle}</h2>
          <p>{content.answer}</p>
        </div>

        <dl className="oneura-topic-facts">
          {content.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{topicTextWithLinks(fact.value)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="oneura-topic-sections">
        {content.sections.map((section) => (
          <article className="oneura-topic-section-card" key={section.title}>
            <h2>{section.title}</h2>
            <p>{topicTextWithLinks(section.body)}</p>
            <ul>
              {section.bullets.map((bullet) => (
                <li key={bullet}>{topicTextWithLinks(bullet)}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="oneura-topic-faq" aria-labelledby="topic-faq">
        <div className="oneura-topic-narrow">
          <p className="section-eyebrow">FAQ</p>
          <h2 id="topic-faq">Questions people ask</h2>
        </div>

        <div className="oneura-topic-faq-grid">
          {content.faqs.map((faq) => (
            <article className="oneura-topic-faq-item" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{topicTextWithLinks(faq.answer)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="oneura-topic-related" aria-labelledby="related-topics">
        <div className="oneura-topic-narrow">
          <p className="section-eyebrow">Related Oneura guides</p>
          <h2 id="related-topics">Keep exploring</h2>
        </div>

        <div className="oneura-topic-related-grid">
          {content.related.map((topic) => (
            <Link
              className="oneura-topic-related-card"
              to={oneuraPagePath(topic.slug)}
              key={topic.slug}
            >
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export const SleepSoundsWhiteNoisePage: React.FC = () => (
  <TopicLandingPage content={contentBySlug["sleep-sounds-white-noise"]} />
);

export const SensoryRelaxationAppPage: React.FC = () => (
  <TopicLandingPage content={contentBySlug["sensory-relaxation-app"]} />
);

export const SleepAppForBusyMindsPage: React.FC = () => (
  <TopicLandingPage content={contentBySlug["sleep-app-for-busy-minds"]} />
);

export const NeuroFriendlySleepAppPage: React.FC = () => (
  <TopicLandingPage content={contentBySlug["neuro-friendly-sleep-app"]} />
);

export const MoodTrackingSleepAppPage: React.FC = () => (
  <TopicLandingPage content={contentBySlug["mood-tracking-sleep-app"]} />
);

export const SleepSoundsForFocusPage: React.FC = () => (
  <TopicLandingPage content={contentBySlug["sleep-sounds-for-focus"]} />
);

export const BestSleepAppForBusyMindsPage: React.FC = () => (
  <TopicLandingPage content={contentBySlug["best-sleep-app-for-busy-minds"]} />
);

export const WhiteNoisePinkNoiseRainSoundsPage: React.FC = () => (
  <TopicLandingPage
    content={contentBySlug["white-noise-pink-noise-rain-sounds"]}
  />
);

export const SleepAppAdhdNeurodivergentPage: React.FC = () => (
  <TopicLandingPage content={contentBySlug["sleep-app-adhd-neurodivergent"]} />
);

export const OneuraVsCalmPage: React.FC = () => (
  <TopicLandingPage content={contentBySlug["oneura-vs-calm"]} />
);

export const OneuraVsBetterSleepPage: React.FC = () => (
  <TopicLandingPage content={contentBySlug["oneura-vs-bettersleep"]} />
);

export const OneuraVsHeadspacePage: React.FC = () => (
  <TopicLandingPage content={contentBySlug["oneura-vs-headspace"]} />
);

export const BestFreeSleepSoundsAppPage: React.FC = () => (
  <TopicLandingPage content={contentBySlug["best-free-sleep-sounds-app"]} />
);

export const SleepSoundsSensoryOverloadPage: React.FC = () => (
  <TopicLandingPage content={contentBySlug["sleep-sounds-sensory-overload"]} />
);
