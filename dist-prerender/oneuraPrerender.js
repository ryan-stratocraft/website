import { jsxs, jsx } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { Link, Routes, Route, MemoryRouter } from "react-router-dom";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { isSupported, getAnalytics, logEvent } from "firebase/analytics";
const logoColor = "/assets/logo-color-GtukZSPE.png";
const STRATO_CRAFT_ORIGIN = "https://strato-craft.com";
const STRATO_CRAFT_SUPPORT_URL = `${STRATO_CRAFT_ORIGIN}/support`;
function canonicalHostname(hostname) {
  return hostname.replace(/^www\./i, "").toLowerCase();
}
function isOneuraHostname(hostname) {
  return canonicalHostname(hostname) === "oneura.app";
}
function isLocalPreviewHostname(hostname) {
  const normalized = canonicalHostname(hostname);
  return normalized === "localhost" || normalized === "127.0.0.1" || normalized === "::1";
}
function normalizedPathname(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}
function isOneuraOnlyCleanPath(pathname) {
  return (/* @__PURE__ */ new Set([
    "/subscription",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cookie-policy",
    "/delete-data",
    "/sleep-sounds-white-noise",
    "/sensory-relaxation-app",
    "/sleep-app-for-busy-minds",
    "/neuro-friendly-sleep-app",
    "/mood-tracking-sleep-app",
    "/sleep-sounds-for-focus"
  ])).has(normalizedPathname(pathname));
}
function hasOneuraLocalPreviewOverride(hostname) {
  var _a;
  if (typeof window === "undefined") {
    return globalThis.__ONEURA_PRERENDER__ === true;
  }
  if (!isLocalPreviewHostname(hostname)) {
    return false;
  }
  const previewKey = "oneura-local-preview";
  const params = new URLSearchParams(window.location.search);
  const site = (_a = params.get("site")) == null ? void 0 : _a.toLowerCase();
  if (site === "oneura") {
    window.sessionStorage.setItem(previewKey, "true");
    return true;
  }
  if (site === "strato") {
    window.sessionStorage.removeItem(previewKey);
    return false;
  }
  return window.sessionStorage.getItem(previewKey) === "true";
}
function isOneuraProductSite(hostname, pathname = typeof window === "undefined" ? "" : window.location.pathname) {
  return isOneuraHostname(hostname) || hasOneuraLocalPreviewOverride(hostname) || isLocalPreviewHostname(hostname) && isOneuraOnlyCleanPath(pathname);
}
function onProductSite() {
  if (typeof window === "undefined") {
    return isOneuraProductSite("");
  }
  return isOneuraProductSite(window.location.hostname);
}
function oneuraPagePath(slug) {
  if (onProductSite()) return `/${slug}`;
  return `/oneura/${slug}`;
}
function oneuraHomePath() {
  if (onProductSite()) return "/";
  return "/oneura";
}
const OneuraNavbar = () => {
  return /* @__PURE__ */ jsxs("nav", { className: "navbar oneura-navbar", children: [
    /* @__PURE__ */ jsxs(Link, { to: oneuraHomePath(), className: "navbar-logo-link", children: [
      /* @__PURE__ */ jsx("img", { src: logoColor, alt: "Oneura", className: "navbar-logo" }),
      /* @__PURE__ */ jsx("span", { className: "brand-name", children: "Oneura" })
    ] }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraHomePath(), children: "Home" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("about"), children: "About" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("subscription"), children: "Subscription" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          href: STRATO_CRAFT_SUPPORT_URL,
          target: "_blank",
          rel: "noopener noreferrer",
          children: "Support"
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          href: STRATO_CRAFT_ORIGIN,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "oneura-studio-link",
          children: "Strato-Craft ↗"
        }
      ) })
    ] })
  ] });
};
const ONEURA_FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61578493060994";
const ONEURA_INSTAGRAM_URL = "https://www.instagram.com/oneura.sleep/";
function FacebookIcon() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M14 8.5h2.5l-.5 3H14v9h-3.5v-9H9v-3h1.5V7.2c0-2.2 1.3-3.7 3.6-3.7H16v3h-1.8c-.9 0-1.2.5-1.2 1.2V8.5z" }) });
}
function InstagramIcon() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm0 2.2A2.8 2.8 0 0 0 5.2 8v8A2.8 2.8 0 0 0 8 18.8h8a2.8 2.8 0 0 0 2.8-2.8V8A2.8 2.8 0 0 0 16 5.2H8zm9.2 1.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm0 2.2A1.3 1.3 0 1 0 13.3 12 1.3 1.3 0 0 0 12 10.7z" }) });
}
const OneuraFooter = () => {
  return /* @__PURE__ */ jsxs("footer", { className: "oneura-footer", children: [
    /* @__PURE__ */ jsxs("div", { className: "oneura-footer-social", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: ONEURA_FACEBOOK_URL,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "Follow Oneura on Facebook",
          children: /* @__PURE__ */ jsx(FacebookIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: ONEURA_INSTAGRAM_URL,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "Follow Oneura on Instagram",
          children: /* @__PURE__ */ jsx(InstagramIcon, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: "oneura-footer-links", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("about"), children: "About" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("subscription"), children: "Subscription" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("sleep-sounds-white-noise"), children: "Sleep Sounds" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("sensory-relaxation-app"), children: "Sensory Relaxation" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("sleep-app-for-busy-minds"), children: "Busy Minds" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("neuro-friendly-sleep-app"), children: "Neuro-Friendly Sleep" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("mood-tracking-sleep-app"), children: "Mood Tracking" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("sleep-sounds-for-focus"), children: "Focus Sounds" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("privacy-policy"), children: "Privacy Policy" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("terms-and-conditions"), children: "Terms & Conditions" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("cookie-policy"), children: "Cookie Policy" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          href: STRATO_CRAFT_SUPPORT_URL,
          target: "_blank",
          rel: "noopener noreferrer",
          children: "Support"
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("delete-data"), children: "Delete My Data" }) })
    ] })
  ] });
};
const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(!localStorage.getItem("cookieConsent"));
  }, []);
  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };
  return isVisible && /* @__PURE__ */ jsxs("div", { className: "cookie-banner", children: [
    /* @__PURE__ */ jsxs("p", { children: [
      "We use cookies to enhance your experience. By using our site, you agree to our",
      /* @__PURE__ */ jsx("a", { href: "/cookie-policy", children: " Cookie Policy" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("button", { onClick: handleAccept, children: "Accept" })
  ] });
};
const firebaseConfig = {
  apiKey: "AIzaSyCVsQpS08cYd2wXR_MbOStcoBDEDRg-dCs",
  authDomain: "strato-craft-6c348.firebaseapp.com",
  projectId: "strato-craft-6c348",
  storageBucket: "strato-craft-6c348.firebasestorage.app",
  messagingSenderId: "310764074898",
  appId: "1:310764074898:web:9384a4ed1131ec3421334b",
  measurementId: "G-W0J3P4QZCM"
};
const app = initializeApp(firebaseConfig);
getAuth(app);
getStorage(app);
void (async () => {
  try {
    if (!firebaseConfig.measurementId || typeof window === "undefined" || false) {
      return;
    }
    if (!await isSupported()) {
      return;
    }
    const analytics = getAnalytics(app);
    logEvent(analytics, "app_started");
  } catch {
  }
})();
const IMAGE_SHAPE_OPTIONS = [
  { id: "circle", label: "Circle" },
  { id: "square_sharp", label: "Square (sharp corners)" },
  { id: "square_rounded", label: "Square (rounded corners)" },
  { id: "rounded_large", label: "Square (heavy rounded)" },
  { id: "diamond", label: "Diamond" },
  { id: "diamond_wide", label: "Wide diamond (elongated rhombus)" },
  { id: "triangle_up", label: "Triangle (point up)" },
  { id: "triangle_down", label: "Triangle (point down)" },
  { id: "hexagon", label: "Hexagon" },
  { id: "octagon", label: "Octagon" }
];
const IMAGE_SHAPE_IDS = IMAGE_SHAPE_OPTIONS.map((o) => o.id);
new Set(IMAGE_SHAPE_IDS);
const PREVIEW_ANIM_OPTIONS = [
  { id: "none", label: "None" },
  { id: "fade_in", label: "Fade in" },
  { id: "fade_out", label: "Fade out" },
  { id: "slide_in", label: "Slide in" },
  { id: "slide_out", label: "Slide out" },
  { id: "pop_in", label: "Pop in" },
  { id: "pop_out", label: "Pop out" },
  { id: "blur_in", label: "Blur-ish in (soft pixel dissolve)" },
  { id: "blur_out", label: "Blur-ish out" },
  { id: "fracture_in", label: "Fracture-style in" },
  { id: "fracture_out", label: "Fracture-style out" },
  { id: "slice_in", label: "Sliced bands in" },
  { id: "slice_out", label: "Sliced bands out" }
];
const PREVIEW_SLIDE_DIR_OPTIONS = [
  { id: "left", label: "From left" },
  { id: "right", label: "From right" },
  { id: "up", label: "From top" },
  { id: "down", label: "From bottom" }
];
new Set(
  PREVIEW_ANIM_OPTIONS.map((o) => o.id)
);
new Set(
  PREVIEW_SLIDE_DIR_OPTIONS.map((o) => o.id)
);
const NotFound = () => {
  return /* @__PURE__ */ jsx("h1", { children: "404 - Page Not Found" });
};
const googlePlay = "/assets/google-play-BRwodeCL.png";
const appStore = "/assets/app-store-Bex_ljrS.png";
const previewCafe = "/assets/preview-cafe-optimized-g6L42Ndw.png";
const previewForest = "/assets/preview-forest-optimized-UKu42thK.png";
const previewOcean = "/assets/preview-ocean-optimized-BkWCt4xX.png";
const googlePlayUrl$1 = "https://play.google.com/store/apps/details?id=com.stratocraft.oneura";
const appStoreUrl$1 = "https://apps.apple.com/app/oneura/id6754253306";
const soundCategories = [
  "Rain and storms",
  "Ocean waves",
  "Forest ambience",
  "Streams and water",
  "White, pink, brown, and green noise",
  "Fans and steady air",
  "Cafe atmosphere",
  "Meditation and tonal beds"
];
const proofStats = [
  {
    value: "5,000+",
    label: "total installs"
  },
  {
    value: "5.0",
    label: "recent Google Play rating"
  },
  {
    value: "5.0",
    label: "App Store rating"
  },
  {
    value: "iOS + Android",
    label: "available platforms"
  }
];
const userReviews = [
  {
    name: "Ana L.",
    meta: "Google Play review, May 2026",
    quote: "Great app! It's nice to have all of my mindfulness stuff in one place (sounds, meditation, mood logs and more). It connects to my watch to give me insights, and I've been sleeping better since using both combined."
  },
  {
    name: "Jessica F.",
    meta: "Google Play review, May 2026",
    quote: "Finally an app that isn't too 'busy' like all other ones. The layout is not overwhelming and can use it easily. There's a huge variety of sounds and meditations - the free features are better than all other apps I've tried."
  },
  {
    name: "Vika S.",
    meta: "App Store review, February 2026",
    quote: "Real relaxation. Thanks for the app."
  }
];
const topicLinks = [
  {
    slug: "sleep-sounds-white-noise",
    title: "Sleep sounds and white noise",
    description: "A focused guide to Oneura as a sleep sounds app with white noise, brown noise, rain, ocean, fans, and timers."
  },
  {
    slug: "sensory-relaxation-app",
    title: "Sensory relaxation app",
    description: "How Oneura uses sound, ambience, optional haptics, and simple routines for overstimulated moments."
  },
  {
    slug: "sleep-app-for-busy-minds",
    title: "Sleep app for busy minds",
    description: "A calmer way to settle racing thoughts with soundscapes, sleep stories, and low-friction wind-downs."
  },
  {
    slug: "neuro-friendly-sleep-app",
    title: "Neuro-friendly sleep app",
    description: "Careful, non-medical language around sensory needs, busy minds, and flexible sleep support."
  },
  {
    slug: "mood-tracking-sleep-app",
    title: "Mood tracking sleep app",
    description: "How Oneura connects mood check-ins, sleep sounds, and gentle insight without heavy scoring."
  },
  {
    slug: "sleep-sounds-for-focus",
    title: "Sleep sounds for focus",
    description: "Use cafe ambience, fans, steady noise, and nature soundscapes for study, work, and transitions."
  }
];
const StoreDownloadButtons = () => /* @__PURE__ */ jsxs("div", { className: "store-buttons", "aria-label": "Download Oneura", children: [
  /* @__PURE__ */ jsx(
    "a",
    {
      href: googlePlayUrl$1,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "Download Oneura on Google Play",
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src: googlePlay,
          alt: "Get it on Google Play",
          className: "store-badge"
        }
      )
    }
  ),
  /* @__PURE__ */ jsx(
    "a",
    {
      href: appStoreUrl$1,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "Download Oneura on the App Store",
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src: appStore,
          alt: "Download on the App Store",
          className: "store-badge"
        }
      )
    }
  )
] });
const faqs = [
  {
    question: "What is Oneura?",
    answer: "Oneura is a sleep sounds and sensory relaxation app for iOS and Android. It combines calming soundscapes, white noise, sleep stories, mood tracking, and gentle wind-down insights for busy minds."
  },
  {
    question: "Is Oneura a free sleep app?",
    answer: "Oneura is free to download and includes a free listening tier. Oneura Plus adds unlimited listening, premium sounds, premium stories, ad-free use, and advanced playlists."
  },
  {
    question: "Can Oneura help with focus as well as sleep?",
    answer: "Yes. Oneura includes steady noise, cafe ambience, nature sounds, and layered mixes that can support reading, studying, deep work, and calmer transitions between tasks."
  },
  {
    question: "Does Oneura give medical advice?",
    answer: "No. Oneura is wellness software, not a medical device. Any mood or sleep insights are informational and reflective, and serious or persistent concerns should be discussed with a qualified professional."
  }
];
const OneuraHome = () => {
  return /* @__PURE__ */ jsxs("main", { className: "oneura-home-container", children: [
    /* @__PURE__ */ jsxs("section", { className: "oneura-hero", "aria-labelledby": "oneura-home-title", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: logoColor,
          alt: "Oneura app icon",
          className: "app-logo",
          fetchPriority: "high"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "hero-kicker", children: "Sleep sounds app for iOS and Android" }),
      /* @__PURE__ */ jsx("h1", { id: "oneura-home-title", children: "Oneura sleep sounds, sensory relaxation, and mood-aware wind-downs" }),
      /* @__PURE__ */ jsx("p", { children: "Build calmer evenings with relaxing soundscapes, sleep stories, focus-friendly ambience, mood tracking, and sensory support designed for busy minds, overstimulation, and your own wind-down routine." }),
      /* @__PURE__ */ jsx(StoreDownloadButtons, {}),
      /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("about"), className: "about-button", children: "Explore Oneura" })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "answer-summary", "aria-labelledby": "what-is-oneura", children: /* @__PURE__ */ jsxs("div", { className: "answer-summary-inner", children: [
      /* @__PURE__ */ jsx("h2", { id: "what-is-oneura", children: "What is Oneura?" }),
      /* @__PURE__ */ jsx("p", { className: "section-eyebrow", children: "Quick answer" }),
      /* @__PURE__ */ jsx("p", { children: "Oneura is a mobile sleep sounds and sensory relaxation app from Strato-Craft Ltd. It helps people relax, sleep, focus, and reflect with ambient audio, mood tracking, optional health-connected context, and a simple subscription called Oneura Plus." }),
      /* @__PURE__ */ jsxs("dl", { className: "answer-facts", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: "Best for" }),
          /* @__PURE__ */ jsx("dd", { children: "Sleep, sensory relaxation, focus, overstimulation, and wind-down routines" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: "Platforms" }),
          /* @__PURE__ */ jsx("dd", { children: "iOS and Android" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: "Price" }),
          /* @__PURE__ */ jsx("dd", { children: "Free download with optional Plus upgrade" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: "Publisher" }),
          /* @__PURE__ */ jsx("dd", { children: "Strato-Craft Ltd" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "positioning-section", "aria-labelledby": "busy-minds-title", children: /* @__PURE__ */ jsxs("div", { className: "positioning-inner", children: [
      /* @__PURE__ */ jsx("p", { className: "section-eyebrow", children: "Built for busy, overstimulated minds" }),
      /* @__PURE__ */ jsx("h2", { id: "busy-minds-title", children: "Sleep support when switching off does not feel simple" }),
      /* @__PURE__ */ jsx("p", { children: "Oneura is designed for people who struggle to settle after noisy, high-input days. Whether that means racing thoughts, sensory overload, focus fatigue, or needing a calmer evening routine, the app gives you sound, ambience, and reflection without turning relaxation into another performance." })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "topic-cluster-section", "aria-labelledby": "topic-cluster-title", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
        /* @__PURE__ */ jsx("p", { className: "section-eyebrow", children: "Built for the moments people search for" }),
        /* @__PURE__ */ jsx("h2", { id: "topic-cluster-title", children: "Sleep sounds, sensory calm, and neuro-friendly wind-downs" }),
        /* @__PURE__ */ jsx("p", { children: "Oneura is still a sleep app, but its sharper lane is calmer sensory support for busy, overstimulated minds that need a softer way into sleep, focus, or decompression." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "topic-link-grid", children: topicLinks.map((topic) => /* @__PURE__ */ jsxs(
        Link,
        {
          className: "topic-link-card",
          to: oneuraPagePath(topic.slug),
          children: [
            /* @__PURE__ */ jsx("h3", { children: topic.title }),
            /* @__PURE__ */ jsx("p", { children: topic.description })
          ]
        },
        topic.slug
      )) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "sound-category-section", "aria-labelledby": "sound-library", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
        /* @__PURE__ */ jsx("p", { className: "section-eyebrow", children: "Sound library" }),
        /* @__PURE__ */ jsx("h2", { id: "sound-library", children: "Calming sounds for sleep, focus, and rest" }),
        /* @__PURE__ */ jsx("p", { children: "Mix natural ambience, steady masking sounds, and gentle audio beds into a routine that fits the way you actually unwind." })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "sound-category-list", "aria-label": "Oneura sound categories", children: soundCategories.map((category) => /* @__PURE__ */ jsx("li", { children: category }, category)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "app-preview", "aria-labelledby": "preview-title", children: [
      /* @__PURE__ */ jsx("h2", { id: "preview-title", children: "Immersive soundscapes and visual moments" }),
      /* @__PURE__ */ jsxs("div", { className: "preview-container", children: [
        /* @__PURE__ */ jsxs("article", { className: "preview-box", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: previewOcean,
              alt: "Oneura ocean waves soundscape for sleep and relaxation",
              loading: "lazy",
              decoding: "async",
              className: "preview-image"
            }
          ),
          /* @__PURE__ */ jsx("h3", { children: "Sleep and relaxation" }),
          /* @__PURE__ */ jsx("p", { children: "Drift into rest with ocean waves, rain, and soothing soundscapes that make night routines easier to repeat." })
        ] }),
        /* @__PURE__ */ jsxs("article", { className: "preview-box", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: previewForest,
              alt: "Oneura sound library with forest ambience and nature sounds",
              loading: "lazy",
              decoding: "async",
              className: "preview-image"
            }
          ),
          /* @__PURE__ */ jsx("h3", { children: "Sound library and ambience" }),
          /* @__PURE__ */ jsx("p", { children: "Choose from nature ambience, noise colours, and curated soundscapes. Save favourites and build mixes around your mood." })
        ] }),
        /* @__PURE__ */ jsxs("article", { className: "preview-box", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: previewCafe,
              alt: "Oneura cafe atmosphere and focus sounds for productivity",
              loading: "lazy",
              decoding: "async",
              className: "preview-image"
            }
          ),
          /* @__PURE__ */ jsx("h3", { children: "Mindfulness and focus" }),
          /* @__PURE__ */ jsx("p", { children: "Create a calmer background for reading, journaling, study, breathwork, or quiet productivity." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "features-section", "aria-labelledby": "features-title", children: [
      /* @__PURE__ */ jsx("h2", { id: "features-title", children: "Key features" }),
      /* @__PURE__ */ jsxs("div", { className: "features-grid", children: [
        /* @__PURE__ */ jsxs("article", { className: "feature-item", children: [
          /* @__PURE__ */ jsx("div", { className: "feature-icon", "aria-hidden": "true", children: "Timer" }),
          /* @__PURE__ */ jsx("h3", { children: "Sleep timer" }),
          /* @__PURE__ */ jsx("p", { children: "Set a timer and let your soundscape fade into the background." })
        ] }),
        /* @__PURE__ */ jsxs("article", { className: "feature-item", children: [
          /* @__PURE__ */ jsx("div", { className: "feature-icon", "aria-hidden": "true", children: "Mix" }),
          /* @__PURE__ */ jsx("h3", { children: "Layered playlists" }),
          /* @__PURE__ */ jsx("p", { children: "Blend favourite sounds together for a personal ambience." })
        ] }),
        /* @__PURE__ */ jsxs("article", { className: "feature-item", children: [
          /* @__PURE__ */ jsx("div", { className: "feature-icon", "aria-hidden": "true", children: "Mood" }),
          /* @__PURE__ */ jsx("h3", { children: "Mood tracking" }),
          /* @__PURE__ */ jsx("p", { children: "Log simple reflections and notice patterns over time." })
        ] }),
        /* @__PURE__ */ jsxs("article", { className: "feature-item", children: [
          /* @__PURE__ */ jsx("div", { className: "feature-icon", "aria-hidden": "true", children: "Plus" }),
          /* @__PURE__ */ jsx("h3", { children: "Oneura Plus" }),
          /* @__PURE__ */ jsx("p", { children: "Unlock unlimited listening, premium audio, and ad-free use." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "proof-section", "aria-labelledby": "proof-title", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
        /* @__PURE__ */ jsx("p", { className: "section-eyebrow", children: "Early proof" }),
        /* @__PURE__ */ jsx("h2", { id: "proof-title", children: "Trusted by people building calmer routines" }),
        /* @__PURE__ */ jsx("p", { children: "Oneura is already helping users bring sounds, meditation, mood logs, and gentle insights together without making the app feel overwhelming." })
      ] }),
      /* @__PURE__ */ jsx("dl", { className: "proof-stat-grid", "aria-label": "Oneura proof points", children: proofStats.map((stat) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("dt", { children: stat.value }),
        /* @__PURE__ */ jsx("dd", { children: stat.label })
      ] }, stat.label)) }),
      /* @__PURE__ */ jsx("div", { className: "review-grid", children: userReviews.map((review) => /* @__PURE__ */ jsxs("figure", { className: "review-card", children: [
        /* @__PURE__ */ jsx("div", { className: "review-rating", "aria-label": "5 out of 5 stars", children: "5.0 stars" }),
        /* @__PURE__ */ jsx("blockquote", { children: review.quote }),
        /* @__PURE__ */ jsxs("figcaption", { children: [
          /* @__PURE__ */ jsx("strong", { children: review.name }),
          /* @__PURE__ */ jsx("span", { children: review.meta })
        ] })
      ] }, review.name)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "oneura-faq", "aria-labelledby": "oneura-faq-title", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
        /* @__PURE__ */ jsx("p", { className: "section-eyebrow", children: "FAQ" }),
        /* @__PURE__ */ jsx("h2", { id: "oneura-faq-title", children: "Questions people ask about Oneura" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "faq-list", children: faqs.map((faq) => /* @__PURE__ */ jsxs("article", { className: "faq-item", children: [
        /* @__PURE__ */ jsx("h3", { children: faq.question }),
        /* @__PURE__ */ jsx("p", { children: faq.answer })
      ] }, faq.question)) })
    ] }),
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "download-cta-section",
        "aria-labelledby": "download-cta-title",
        children: /* @__PURE__ */ jsxs("div", { className: "download-cta-inner", children: [
          /* @__PURE__ */ jsx("p", { className: "section-eyebrow", children: "Get the app" }),
          /* @__PURE__ */ jsx("h2", { id: "download-cta-title", children: "Download Oneura free on iOS and Android" }),
          /* @__PURE__ */ jsx("p", { children: "Start with calming soundscapes, sleep stories, and mood-aware wind-downs. Upgrade to Plus anytime for unlimited listening." }),
          /* @__PURE__ */ jsx(StoreDownloadButtons, {})
        ] })
      }
    )
  ] });
};
const OneuraAbout = () => {
  return /* @__PURE__ */ jsxs("div", { className: "oneura-about-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "about-hero", children: [
      /* @__PURE__ */ jsx("img", { src: logoColor, alt: "Oneura Logo", className: "about-logo" }),
      /* @__PURE__ */ jsx("h1", { children: "Welcome to Oneura" }),
      /* @__PURE__ */ jsx("p", { className: "tagline", children: "Your sanctuary for relaxation, sleep, and focus" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "about-content", children: [
      /* @__PURE__ */ jsxs("section", { className: "about-section about-founder", children: [
        /* @__PURE__ */ jsxs("h2", { children: [
          /* @__PURE__ */ jsx("span", { className: "about-section-icon", "aria-hidden": "true", children: "✨" }),
          "Why we built Oneura"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Oneura began at home. My wife and I had used well-known meditation and sleep apps, but for her - ",
          /* @__PURE__ */ jsx("strong", { children: "AuDHD" }),
          " - the structure often felt overwhelming: busy screens, too many paths, and pressure to subscribe. Evenings turned into decision fatigue and scrolling, then the same few “safe” sounds on repeat. We stayed on free tiers because premium plans were out of reach, and the choice never quite matched what she needed."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "I'm ",
          /* @__PURE__ */ jsx("strong", { children: "autistic" }),
          " as well, but I built Oneura for her first - calmer layout, real variety, and less noise so she could pick something quickly, sleep more easily, and use it when she felt overloaded. Our children loved it too. She was the one who said others must feel the same: in a world where calmness shouldn't depend on an expensive subscription, more people deserve a gentle escape. She encouraged me to release it publicly; ",
          /* @__PURE__ */ jsx("strong", { children: "Strato-Craft Ltd" }),
          " ",
          "is how we ship and support it properly."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "We still measure pricing against what we can afford ourselves, and we aim to stay below the big apps - even if, one day, Oneura grows to sit alongside them. The product stays simple: choose an atmosphere, set a timer, and let the app stay out of the way." }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Oneura is ",
          /* @__PURE__ */ jsx("strong", { children: "wellness software only" }),
          ". It does not diagnose conditions, provide therapy, or replace advice from a qualified professional. Questions? Use",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://strato-craft.com/support",
              target: "_blank",
              rel: "noopener noreferrer",
              children: "Strato-Craft support"
            }
          ),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "about-section", children: [
        /* @__PURE__ */ jsxs("h2", { children: [
          /* @__PURE__ */ jsx("span", { className: "about-section-icon", "aria-hidden": "true", children: "🌙" }),
          "Better Sleep & Deep Relaxation"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Drift into restorative rest with a broad palette of",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "calming soundscapes" }),
          " - ocean, rain, forests, gentle fans, streams, and curated noise colours when you need steady masking sound. Whether you're settling in after a long day or quieting a busy mind, Oneura is built to lower tension and make it easier to switch off."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Pair audio with optional",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "ambience and wind-down visuals" }),
          " where available, set a nightly wind-down reminder, and let layers of sound carry you through the evening without reaching for another screen."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "about-section", children: [
        /* @__PURE__ */ jsxs("h2", { children: [
          /* @__PURE__ */ jsx("span", { className: "about-section-icon", "aria-hidden": "true", children: "📊" }),
          "Smart sleep insights & wearables - guidance you steer"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "When you choose to link ",
          /* @__PURE__ */ jsx("strong", { children: "supported health and wearable apps" }),
          " ",
          "(permissions vary by device), Oneura can combine your listening habits with the sleep signals you already collect - things like bedtime consistency or duration trends - into a fuller picture than raw numbers alone."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "The goal isn't to overwhelm you with charts: it's to surface",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "clear, practical nudges" }),
          " - patterns you might optimise, rhythms to experiment with next week, cosy experiments with sound or wind-down timing - and ",
          /* @__PURE__ */ jsx("strong", { children: "you decide" }),
          " what fits your life and values. Think of it as reflective guidance for better habits,",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "not a diagnosis" }),
          ", not a verdict, and certainly not",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "medical advice" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "feature-list", children: [
          /* @__PURE__ */ jsx("li", { children: "Suggestions rooted in correlations you can see - not hidden scores or opaque “scores” pretending to judge your health" }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Friction-free language: optimise for ",
            /* @__PURE__ */ jsx("em", { children: "you" }),
            ", on ",
            /* @__PURE__ */ jsx("em", { children: "your" }),
            " terms"
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Open invitation to iterate: try small changes, revisit insights, iterate again" }),
          /* @__PURE__ */ jsx("li", { children: "Always steer serious or persistent concerns to qualified professionals - we're wellness software, not clinicians" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "about-section", children: [
        /* @__PURE__ */ jsxs("h2", { children: [
          /* @__PURE__ */ jsx("span", { className: "about-section-icon", "aria-hidden": "true", children: "🎵" }),
          "Immersive Sound Library"
        ] }),
        /* @__PURE__ */ jsx("p", { children: "Explore high-quality ambience and tones, including:" }),
        /* @__PURE__ */ jsxs("ul", { className: "feature-list", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Ocean & coastal" }),
            "  -  rolling surf and shoreline calm"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Rain & storms" }),
            "  -  from soft drizzle to steady downpour"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Forest & wildlife" }),
            "  -  birds, leaves, and woodland air"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Noise palettes" }),
            "  -  white, pink, green & brown noise for focus and sleep"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Café & chatter" }),
            "  -  gentle bustle for productive flow"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Wind chimes, fans, air, traffic cues & more" }),
            "  -  niche textures when you crave something specific"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Frequencies & tonal beds" }),
            "  -  simple carriers for masking and meditation"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Stack ambience with the floating player, save favourite mixes, and return to what worked last night. When you upgrade to Plus you unlock",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "longer ambience sessions" }),
          " and labelled",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "premium soundscapes" }),
          " right inside the explorer."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "about-section", children: [
        /* @__PURE__ */ jsxs("h2", { children: [
          /* @__PURE__ */ jsx("span", { className: "about-section-icon", "aria-hidden": "true", children: "🧘" }),
          "Mindfulness & Enhanced Focus"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Oneura isn't only a sleep aid - it's a companion when you",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "study" }),
          ", ",
          /* @__PURE__ */ jsx("strong", { children: "read" }),
          ", ",
          /* @__PURE__ */ jsx("strong", { children: "breathe" }),
          ", or",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "dial in deep work" }),
          ". Immersive audio helps block out the world so you stay present where you intend to be."
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "feature-list", children: [
          /* @__PURE__ */ jsx("li", { children: "Stay centred during workouts, chores, creative sessions, or WFH stretches" }),
          /* @__PURE__ */ jsx("li", { children: "Lean on gentle rhythm and layering instead of juggling multiple apps" }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Lose yourself in guided ",
            /* @__PURE__ */ jsx("strong", { children: "sleep stories & narratives" }),
            " - many are included for everyone, while extended premium tales unlock with Oneura Plus"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Log ",
            /* @__PURE__ */ jsx("strong", { children: "mood snapshots" }),
            " and scan ",
            /* @__PURE__ */ jsx("strong", { children: "insight summaries" }),
            " ",
            "that connect habits, evenings, and how you're trending over time"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Surface ",
            /* @__PURE__ */ jsx("strong", { children: "smart sleep & recovery context" }),
            " when you've opted into ",
            /* @__PURE__ */ jsx("strong", { children: "health + wearable integrations" }),
            " - pairing trends from your devices with how you unwind in Oneura, always framed as",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "informational guidance" }),
            " for you to interpret"
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Optional haptics and kinetic visuals amplify multi-sensory sessions" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Prefer to browse without syncing health data? Every integration stays",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "optional and permission-led" }),
          " - the soundscape toolkit works on its own whenever you say so."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "about-section", children: [
        /* @__PURE__ */ jsxs("h2", { children: [
          /* @__PURE__ */ jsx("span", { className: "about-section-icon", "aria-hidden": "true", children: "✨" }),
          "Premium Features"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Ready to make Oneura your nightly ritual? Elevate the experience with",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "Oneura Plus" }),
          ":"
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "feature-list", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Unlimited listening" }),
            "  -  no metering or daily caps inside the Plus tier"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Ad-free experience" }),
            "  -  stay in flow without interruptions"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Exclusive stories & premium sounds" }),
            "  -  every item flagged in-app arrives unlocked"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Full-length ambience sessions" }),
            "  -  go beyond short previews"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Advanced layering & playlists" }),
            "  -  build elaborate stacks and favourites"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Lifetime option" }),
            "  -  pay once on supported storefronts and keep Plus-style access"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Compare plans, trials, and pricing anytime on the",
          " ",
          /* @__PURE__ */ jsx(Link, { to: oneuraPagePath("subscription"), children: "subscription page" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "about-section", children: [
        /* @__PURE__ */ jsxs("h2", { children: [
          /* @__PURE__ */ jsx("span", { className: "about-section-icon", "aria-hidden": "true", children: "🆓" }),
          "Free Tier"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Start your journey with ",
          /* @__PURE__ */ jsx("strong", { children: "no credit card" }),
          ". The free experience includes a generous ",
          /* @__PURE__ */ jsx("strong", { children: "listening allowance" }),
          " that comes back after short pauses, plus the option to earn ",
          /* @__PURE__ */ jsx("strong", { children: "bonus time" }),
          " through rewarded videos when we surface them."
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "feature-list", children: [
          /* @__PURE__ */ jsx("li", { children: "Core soundscapes, ambience previews, and essential timers" }),
          /* @__PURE__ */ jsx("li", { children: "Mood logging, calendar views, and many insight cards" }),
          /* @__PURE__ */ jsx("li", { children: "Stories and sounds marked free - anything with a Plus badge waits for an upgrade" }),
          /* @__PURE__ */ jsx("li", { children: "Ideal for testing what calms you before committing to Plus" })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "What you see locked in the app mirrors what you'll unlock with Oneura Plus - no surprises at checkout." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "about-section", children: [
        /* @__PURE__ */ jsxs("h2", { children: [
          /* @__PURE__ */ jsx("span", { className: "about-section-icon", "aria-hidden": "true", children: "🎯" }),
          "Our Mission"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "In a loud, always-on world, everyone deserves tools that help them rest, focus, and feel a little more human. Oneura brings together",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "sound" }),
          ", ",
          /* @__PURE__ */ jsx("strong", { children: "story" }),
          ", and",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "gentle guidance" }),
          " - including optional wearable-informed sleep context - without pretending to practise medicine or replace professional care."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "We keep a meaningful ",
          /* @__PURE__ */ jsx("strong", { children: "free tier" }),
          " alongside Oneura Plus because access matters - when you're ready to go deeper, we're here with the keys already built in."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "about-section", children: [
        /* @__PURE__ */ jsxs("h2", { children: [
          /* @__PURE__ */ jsx("span", { className: "about-section-icon", "aria-hidden": "true", children: "🚀" }),
          "What's Coming Next"
        ] }),
        /* @__PURE__ */ jsx("p", { children: "We ship updates often. On the horizon you'll see more of what you already love - just richer:" }),
        /* @__PURE__ */ jsxs("ul", { className: "feature-list", children: [
          /* @__PURE__ */ jsx("li", { children: "More sleep narratives, seasonal packs, and affirmations wired into your flows" }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Richer correlations between restorative audio, biometric trends you share, and the habits ",
            /* @__PURE__ */ jsx("em", { children: "you" }),
            " choose to tweak - not prescriptions, just sharper mirrors"
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Even more personalisation inside wind-down flows and playlists" }),
          /* @__PURE__ */ jsx("li", { children: "Wellness-connected views that stay explanatory: here's what we noticed, here's a gentle optimisation idea - always your call" }),
          /* @__PURE__ */ jsx("li", { children: "Community-requested staples - tell us via support reviews what you'd vote for next" })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "Stay on the ride; the library and intelligence layer both keep growing." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "download-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "📲 Download Oneura Today" }),
        /* @__PURE__ */ jsx("p", { children: "Bring calmer evenings and sharper focus pockets into your pocket - wherever life takes you." }),
        /* @__PURE__ */ jsxs("div", { className: "app-download-buttons", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://play.google.com/store/apps/details?id=com.stratocraft.oneura&pli=1",
              target: "_blank",
              rel: "noopener noreferrer",
              children: /* @__PURE__ */ jsx("img", { src: googlePlay, alt: "Get it on Google Play", className: "store-button" })
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://apps.apple.com/app/oneura/id6754253306",
              target: "_blank",
              rel: "noopener noreferrer",
              children: /* @__PURE__ */ jsx("img", { src: appStore, alt: "Download on the App Store", className: "store-button" })
            }
          )
        ] })
      ] })
    ] })
  ] });
};
const OneuraCookiePolicy = () => {
  return /* @__PURE__ */ jsxs("div", { className: "policy-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "policy-hero", children: [
      /* @__PURE__ */ jsx("h1", { children: "Cookie Policy" }),
      /* @__PURE__ */ jsx("p", { className: "last-updated", children: "Last Updated: October 16, 2025" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "policy-content", children: [
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Introduction" }),
        /* @__PURE__ */ jsx("p", { children: "This Cookie Policy explains how Oneura, operated by Strato-Craft, uses cookies and similar tracking technologies in our mobile application and website." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "What Are Cookies?" }),
        /* @__PURE__ */ jsx("p", { children: "Cookies are small text files that are stored on your device when you visit a website or use an app. They help websites and apps remember your preferences and improve your experience." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Our Cookie Usage" }),
        /* @__PURE__ */ jsxs("p", { className: "highlight", children: [
          /* @__PURE__ */ jsx("strong", { children: "Good news!" }),
          " Oneura does ",
          /* @__PURE__ */ jsx("strong", { children: "NOT" }),
          " use traditional cookies for advertising or third-party tracking on our mobile app."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "We believe in respecting your privacy and keeping your experience clean and focused on relaxation." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Analytics We Use" }),
        /* @__PURE__ */ jsx("p", { children: "We do use Firebase Analytics to understand how users interact with Oneura. This helps us:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Understand which features are most popular" }),
          /* @__PURE__ */ jsx("li", { children: "Identify bugs and technical issues" }),
          /* @__PURE__ */ jsx("li", { children: "Improve app performance" }),
          /* @__PURE__ */ jsx("li", { children: "Make better decisions about new features" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Firebase Analytics collects ",
          /* @__PURE__ */ jsx("strong", { children: "anonymized data" }),
          " and does not personally identify you. This data includes:"
        ] }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Device type and operating system" }),
          /* @__PURE__ */ jsx("li", { children: "App screens visited" }),
          /* @__PURE__ */ jsx("li", { children: "Time spent in the app" }),
          /* @__PURE__ */ jsx("li", { children: "General location (country/region only)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Website Cookies" }),
        /* @__PURE__ */ jsx("p", { children: "Our website (strato-craft.com) may use minimal cookies to:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Remember your cookie consent preferences" }),
          /* @__PURE__ */ jsx("li", { children: "Keep you logged in if you have an account" }),
          /* @__PURE__ */ jsx("li", { children: "Understand basic website traffic (via Google Analytics)" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "We do ",
          /* @__PURE__ */ jsx("strong", { children: "NOT" }),
          " use cookies for:"
        ] }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Targeted advertising" }),
          /* @__PURE__ */ jsx("li", { children: "Selling your data to third parties" }),
          /* @__PURE__ */ jsx("li", { children: "Tracking you across other websites" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Third-Party Services" }),
        /* @__PURE__ */ jsx("p", { children: "Oneura uses the following third-party services that may collect data:" }),
        /* @__PURE__ */ jsx("h3", { children: "Firebase (Google)" }),
        /* @__PURE__ */ jsx("p", { children: "Used for backend services, authentication, and analytics. Firebase may store small amounts of data on your device to function properly." }),
        /* @__PURE__ */ jsx("h3", { children: "RevenueCat" }),
        /* @__PURE__ */ jsx("p", { children: "Used for managing subscriptions. RevenueCat may store subscription status information locally on your device." }),
        /* @__PURE__ */ jsx("h3", { children: "Google Play Services / App Store" }),
        /* @__PURE__ */ jsx("p", { children: "Your device's app store may collect data according to their own policies. We do not control their data collection practices." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Your Choices" }),
        /* @__PURE__ */ jsx("p", { children: "You have control over your data:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Disable Analytics:" }),
            ' You can disable analytics tracking in your device settings (usually under "Privacy" → "Analytics & Improvements")'
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Clear App Data:" }),
            " You can clear all locally stored data by uninstalling and reinstalling the app"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Opt Out of Targeted Ads:" }),
            " While Oneura doesn't use targeted ads, you can disable ad personalisation system-wide on your device in Settings → Privacy → Advertising"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Data Retention" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Analytics data collected through Firebase is automatically deleted after ",
          /* @__PURE__ */ jsx("strong", { children: "60 days" }),
          ". We do not store long-term user behavior data."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Children's Privacy" }),
        /* @__PURE__ */ jsx("p", { children: "Oneura is not intended for children under 13 (or 16 in the EU). We do not knowingly collect data from children. If we discover that a child's data has been collected, we will delete it immediately." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Changes to This Policy" }),
        /* @__PURE__ */ jsx("p", { children: 'We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Your continued use of Oneura after changes are made constitutes acceptance of the updated policy.' })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "More Information" }),
        /* @__PURE__ */ jsx("p", { children: "For more details about how we handle your data, please see our:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: oneuraPagePath("privacy-policy"), children: "Privacy Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: oneuraPagePath("terms-and-conditions"), children: "Terms & Conditions" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section contact-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Contact Us" }),
        /* @__PURE__ */ jsx("p", { children: "If you have questions about our use of cookies or tracking technologies, please contact us:" }),
        /* @__PURE__ */ jsxs("div", { className: "contact-box", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Email:" }),
            " ",
            /* @__PURE__ */ jsx("a", { href: "mailto:support@strato-craft.com", children: "support@strato-craft.com" })
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Company:" }),
            " Strato-Craft"
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Location:" }),
            " United Kingdom"
          ] })
        ] })
      ] })
    ] })
  ] });
};
const OneuraPrivacyPolicy = () => {
  return /* @__PURE__ */ jsxs("div", { className: "policy-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "policy-hero", children: [
      /* @__PURE__ */ jsx("h1", { children: "Privacy Policy" }),
      /* @__PURE__ */ jsx("p", { className: "last-updated", children: "Last Updated: May 7, 2026 (includes U.S. disclosures)" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "policy-content", children: [
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Introduction" }),
        /* @__PURE__ */ jsxs("p", { children: [
          'Strato-Craft Ltd ("Strato-Craft," "we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard personal information when you use the Oneura mobile application, our website at',
          " ",
          /* @__PURE__ */ jsx("a", { href: "https://oneura.app", target: "_blank", rel: "noopener noreferrer", children: "oneura.app" }),
          " ",
          '(and related Strato-Craft pages that describe Oneura), and related features and services we offer in connection with Oneura (collectively, the "Services").'
        ] }),
        /* @__PURE__ */ jsx("p", { children: "By using the Services, you agree to the collection, use, and disclosure practices described in this Privacy Policy. Your use of the Services is also subject to our Terms & Conditions." }),
        /* @__PURE__ */ jsx("p", { children: "Where the UK GDPR, EU GDPR, or other applicable laws grant you rights, we honor those rights as described below." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Personal Information We Collect" }),
        /* @__PURE__ */ jsx("p", { children: "We may collect personal information about you from various sources, including information you provide directly, information collected automatically when you use the Services, and information you choose to connect from other apps or devices, as described below." }),
        /* @__PURE__ */ jsx("h3", { children: "A. Information You Provide to Us" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Registration and account:" }),
            " When you create or manage an account, we may collect identifiers such as email address, display name (if you provide one), authentication identifiers, and account-related metadata (e.g. account creation date)."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "In-app content you choose to enter:" }),
            " If you use features such as mood check-ins, reflections, notes, or similar wellness journaling, we store the content you submit so we can display it back to you and power related features."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Communications with us:" }),
            " If you contact us (for example by email), we receive the information you send, such as your email address, the contents of your message, and attachments you choose to provide."
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "B. Information We Collect When You Use Our Services" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Device and technical information:" }),
            " We receive information about the device and software used to access the Services, such as device type, operating system version, app version, language settings, and diagnostic or crash information to help us maintain reliability and security."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Usage information:" }),
            " We collect information about how you interact with the Services, such as features used, session activity, listening activity (see below), aggregates and preferences you set in the app, and timestamps associated with your use. This helps us operate, maintain, and improve the Services."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Listening and audio-related usage:" }),
            " We process information about playback and listening (for example daily or session-level summaries and related metadata) to run core features (such as time allowances where applicable), show you history and insights inside the app, and improve the product. Where you use optional modes or features, additional metadata may be stored to support those features."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Optional health and wearable data:" }),
            " If you choose to connect Apple Health, Health Connect, or similar integrations supported on your device, we may sync and store certain health-related metrics and sleep-related records you authorize for use within Oneura (such as metrics you view in the app’s health areas). This data is processed to show you summaries and correlations inside the Services and is not intended as medical diagnosis or treatment."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Push notification tokens:" }),
            " If you enable push notifications, we process tokens and related data needed to deliver notifications you opt into."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Subscriptions and purchases:" }),
            " Subscription status and transaction metadata are processed through the app stores and our subscription tooling. We do not receive your full payment card details from those stores."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Cookies, Analytics, and Similar Technologies" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Mobile app:" }),
          " Oneura does not use traditional web cookies in the same way a browser does. We may use software development kits and analytics tools (such as Firebase Analytics) to collect usage information in accordance with this policy and to improve the Services."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Websites:" }),
          " Our websites (including oneura.app and strato-craft.com) may use cookies or similar technologies for essential functionality, to remember preferences (such as cookie consent where applicable), and to measure basic traffic and performance. Third-party analytics partners may use cookies or similar technologies; their use is subject to their own policies."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "You can control many cookies through your browser settings. If you disable or block certain cookies, parts of a website may not function properly." }),
        /* @__PURE__ */ jsxs("p", { className: "highlight", children: [
          "We do ",
          /* @__PURE__ */ jsx("strong", { children: "not" }),
          " sell your personal information. We do ",
          /* @__PURE__ */ jsx("strong", { children: "not" }),
          " use your personal information for third-party targeted advertising as described in many ad-tech models."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "How We Use the Information We Collect" }),
        /* @__PURE__ */ jsx("p", { children: "We use information for purposes including:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "To provide, maintain, secure, and operate the Services" }),
          /* @__PURE__ */ jsx("li", { children: "To personalize your experience within the Services (for example, preferences and relevant in-app content)" }),
          /* @__PURE__ */ jsx("li", { children: "To understand how the Services are used and to develop new features and improvements" }),
          /* @__PURE__ */ jsx("li", { children: "To communicate with you about service-related matters, respond to your requests, and provide customer support" }),
          /* @__PURE__ */ jsx("li", { children: "To send transactional or service messages (and, where permitted by law and your settings, notifications about the Services)" }),
          /* @__PURE__ */ jsx("li", { children: "To generate aggregated or de-identified statistics that do not identify you" }),
          /* @__PURE__ */ jsx("li", { children: "To detect, prevent, and address fraud, abuse, and security or technical issues" }),
          /* @__PURE__ */ jsx("li", { children: "To comply with legal obligations and enforce our terms and policies" }),
          /* @__PURE__ */ jsx("li", { children: "For other purposes explained at the point of collection, or with your consent where required" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "How We Share Information" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "We do ",
          /* @__PURE__ */ jsx("strong", { children: "not" }),
          ' sell, rent, or lease your personal information to data brokers, and we do not share it for cross-context behavioral advertising in the manner commonly called "selling" personal data under some US state laws.'
        ] }),
        /* @__PURE__ */ jsx("p", { children: "We may share information in the following circumstances:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Service providers and processors:" }),
            " We use providers to host data, run infrastructure, provide analytics, deliver notifications, process subscriptions, and operate our business. Examples include Google Firebase (backend, analytics, and related services), Apple and Google app distribution and in-app purchase infrastructure, and subscription management providers such as RevenueCat. These providers process information on our behalf under appropriate agreements."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Analytics partners:" }),
            " Analytics services may collect or receive information about how the Services are used, subject to their policies and our configuration. We use analytics to improve stability and product quality."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Corporate affiliates:" }),
            " We may share information with our corporate parent, subsidiaries, or affiliates for the purposes described in this Privacy Policy and consistent with applicable law."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Legal and safety:" }),
            " We may access, preserve, and disclose information if we believe it is reasonably necessary to comply with law, regulation, legal process, or governmental requests; to enforce our policies or agreements; or to protect the rights, property, or safety of Strato-Craft, our users, or others."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Business transfers:" }),
            " If we are involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of assets, information may be transferred as part of that transaction, subject to appropriate safeguards and notice where required."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "With your direction or consent:" }),
            " For example, if you choose to share using OS-level or third-party integrations, those third parties process information under their own policies and your settings."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Your Choices and Rights" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Account controls:" }),
            " You can review and update certain information in the app settings where available."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Optional features:" }),
            " You can disconnect optional integrations (such as health or wearable connections) using your device settings and in-app controls where provided."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Marketing:" }),
            " If we send optional promotional communications where permitted, you may opt out using the instructions in those messages. We may still send important service-related messages about your account or the Services."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Do Not Track:" }),
            ' There is no universally accepted standard for how to respond to "Do Not Track" signals. Our Services may not respond to such signals in a uniform way.'
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "UK & EU rights:" }),
            " If applicable, you may have rights to access, rectify, erase, restrict processing, object, data portability, and withdraw consent for processing based on consent. Contact us using the details below."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "U.S. state rights:" }),
            " If you live in the United States, you may have additional rights under state law (including access, deletion, correction, or opt-out rights in some states). See",
            " ",
            /* @__PURE__ */ jsx("em", { children: "United States Residents" }),
            " below and contact",
            " ",
            /* @__PURE__ */ jsx("a", { href: "mailto:support@strato-craft.com", children: "support@strato-craft.com" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "To exercise privacy rights, contact",
          " ",
          /* @__PURE__ */ jsx("a", { href: "mailto:support@strato-craft.com", children: "support@strato-craft.com" }),
          ". We will respond within the timeframe required by applicable law (often within 30 days for UK/EU requests, unless an extension applies)."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Third-Party Links and Services" }),
        /* @__PURE__ */ jsx("p", { children: "The Services may contain links to third-party websites, app stores, or services that we do not operate (for example, Google Play, the Apple App Store, or support pages). This Privacy Policy does not apply to those third parties. We encourage you to read their privacy policies and terms." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Security" }),
        /* @__PURE__ */ jsx("p", { children: "We implement reasonable technical and organizational measures designed to protect personal information. However, no method of transmission or storage is completely secure. We cannot guarantee absolute security of information transmitted through the internet or stored on our systems." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Data Retention" }),
        /* @__PURE__ */ jsx("p", { children: "We retain personal information only as long as reasonably necessary for the purposes described in this policy, including:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "While your account is active and for a short period afterward as needed for recovery, legal, or security reasons" }),
          /* @__PURE__ */ jsx("li", { children: "As required to comply with legal obligations, resolve disputes, and enforce agreements" })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "When you delete your account (subject to our deletion process), we work to delete or anonymize personal information associated with your account within a reasonable period, except where retention is required by law." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Children's Privacy" }),
        /* @__PURE__ */ jsx("p", { children: "The Services are not directed to children under 13 (or 16 where higher age thresholds apply in the EU). We do not knowingly collect personal information from children in that age group. If you believe we have collected information from a child, please contact us and we will take appropriate steps." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "International Data Transfers" }),
        /* @__PURE__ */ jsx("p", { children: "Strato-Craft is based in the United Kingdom. Your information may be processed in the UK, the European Economic Area, the United States, and other countries where we or our service providers operate. Where required, we use appropriate safeguards (such as Standard Contractual Clauses) for transfers from the UK/EEA to countries that have not received an adequacy decision." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "United States Residents" }),
        /* @__PURE__ */ jsx("h3", { children: "HIPAA and medical records" }),
        /* @__PURE__ */ jsx("p", { children: "The Health Insurance Portability and Accountability Act of 1996 (HIPAA) imposes specific rules on certain U.S. healthcare providers, health plans, and related entities, and their business associates, when they handle protected health information in those regulated contexts." }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Oneura is a consumer wellness application." }),
          " In providing the Services as described in this policy, Strato-Craft does ",
          /* @__PURE__ */ jsx("strong", { children: "not" }),
          " act as a HIPAA-covered health care provider or health plan, and the Services are ",
          /* @__PURE__ */ jsx("strong", { children: "not" }),
          " intended to operate as a HIPAA-compliant medical record, electronic health record, or clinical system. You should not rely on the Services as a substitute for records or treatment governed by HIPAA."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "If you are a patient seeking HIPAA protections for clinical information, please use channels provided by your clinician or insurer." }),
        /* @__PURE__ */ jsx("h3", { children: "U.S. state privacy laws" }),
        /* @__PURE__ */ jsx("p", { children: 'Depending on where you live in the United States, you may have additional rights under state privacy laws (for example, rights to access, delete, or correct personal information, or to opt out of certain types of processing or "sales" / sharing as those terms are defined in applicable state law).' }),
        /* @__PURE__ */ jsxs("p", { children: [
          "As described elsewhere in this policy, we do ",
          /* @__PURE__ */ jsx("strong", { children: "not" }),
          " sell your personal information for money, and we do ",
          /* @__PURE__ */ jsx("strong", { children: "not" }),
          " use your personal information for cross-context behavioral advertising in the manner described by some state laws. To exercise rights available to you under applicable U.S. state law, contact",
          " ",
          /* @__PURE__ */ jsx("a", { href: "mailto:support@strato-craft.com", children: "support@strato-craft.com" }),
          " and include enough detail for us to verify and process your request. We will not discriminate against you for exercising rights where such discrimination is prohibited by law."
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "California residents (summary)" }),
        /* @__PURE__ */ jsx("p", { children: "If you are a California resident, the California Consumer Privacy Act as amended (CCPA / CPRA) may grant you specific rights regarding personal information. This summary is provided under California law:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Categories collected:" }),
            " In the preceding 12 months, we may have collected the categories described in this Privacy Policy (such as identifiers, commercial information related to subscriptions, internet or network activity, geolocation at a coarse level, and, if you use optional features, health-adjacent information you choose to connect)."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Sensitive personal information:" }),
            " Where California law classifies certain data you optionally provide or sync (such as some wellness or health-related metrics) as sensitive personal information, we use it only for the purposes disclosed in this policy and as permitted by law."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "No sale / sharing for cross-context behavioral advertising:" }),
            " We do not sell your personal information or share it for cross-context behavioral advertising as those practices are commonly defined under the CPRA for our consumer app."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Requests:" }),
            " You may request access, deletion, or correction of personal information subject to exceptions under law. Submit requests to",
            " ",
            /* @__PURE__ */ jsx("a", { href: "mailto:support@strato-craft.com", children: "support@strato-craft.com" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { children: `California's "Shine the Light" law (Civil Code § 1798.83) may give California residents the right to ask about certain disclosures of personal information to third parties for their direct marketing purposes. We do not share personal information with third parties for their direct marketing purposes as described in that statute.` })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Changes to This Privacy Policy" }),
        /* @__PURE__ */ jsx("p", { children: 'We may update this Privacy Policy from time to time. We will post the revised version on this page and update the "Last Updated" date. If changes are material, we will provide additional notice as appropriate (such as through the Services or by email where we have your contact details). Your continued use of the Services after the effective date of the revised policy may indicate acceptance of the changes where permitted by law.' })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Supervisory Authority" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "If you are in the UK or EU and believe we have not addressed your concern, you may lodge a complaint with your local data protection authority. In the UK, this is the Information Commissioner's Office (ICO):",
          " ",
          /* @__PURE__ */ jsx("a", { href: "https://ico.org.uk", target: "_blank", rel: "noopener noreferrer", children: "ico.org.uk" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section contact-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Contact Us" }),
        /* @__PURE__ */ jsx("p", { children: "If you have questions, comments, or concerns about this Privacy Policy or our processing activities, contact us at:" }),
        /* @__PURE__ */ jsxs("div", { className: "contact-box", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Email:" }),
            " ",
            /* @__PURE__ */ jsx("a", { href: "mailto:support@strato-craft.com", children: "support@strato-craft.com" })
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Data controller:" }),
            " Strato-Craft Ltd"
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Location:" }),
            " United Kingdom"
          ] })
        ] })
      ] })
    ] })
  ] });
};
const OneuraDeleteData = () => {
  return /* @__PURE__ */ jsxs("div", { className: "policy-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "policy-hero", children: [
      /* @__PURE__ */ jsx("h1", { children: "Delete Your Data" }),
      /* @__PURE__ */ jsx("p", { className: "last-updated", children: "We respect your right to be forgotten" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "policy-content", children: [
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Your Right to Data Deletion" }),
        /* @__PURE__ */ jsx("p", { children: "Under UK GDPR and EU GDPR, you have the right to request deletion of your personal data at any time. We make this process simple and straightforward." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "How to Delete Your Account" }),
        /* @__PURE__ */ jsx("h3", { children: "Option 1: Delete Within the App" }),
        /* @__PURE__ */ jsxs("div", { className: "steps-container", children: [
          /* @__PURE__ */ jsxs("div", { className: "step", children: [
            /* @__PURE__ */ jsx("div", { className: "step-number", children: "1" }),
            /* @__PURE__ */ jsxs("div", { className: "step-content", children: [
              /* @__PURE__ */ jsx("h4", { children: "Open Oneura" }),
              /* @__PURE__ */ jsx("p", { children: "Launch the Oneura app on your device" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "step", children: [
            /* @__PURE__ */ jsx("div", { className: "step-number", children: "2" }),
            /* @__PURE__ */ jsxs("div", { className: "step-content", children: [
              /* @__PURE__ */ jsx("h4", { children: "Go to Settings" }),
              /* @__PURE__ */ jsx("p", { children: "Tap the profile icon or settings gear in the app" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "step", children: [
            /* @__PURE__ */ jsx("div", { className: "step-number", children: "3" }),
            /* @__PURE__ */ jsxs("div", { className: "step-content", children: [
              /* @__PURE__ */ jsx("h4", { children: "Find Account Settings" }),
              /* @__PURE__ */ jsx("p", { children: 'Scroll down to "Account Management" or "Privacy Settings"' })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "step", children: [
            /* @__PURE__ */ jsx("div", { className: "step-number", children: "4" }),
            /* @__PURE__ */ jsxs("div", { className: "step-content", children: [
              /* @__PURE__ */ jsx("h4", { children: 'Select "Delete Account"' }),
              /* @__PURE__ */ jsx("p", { children: 'Tap "Delete My Account" and confirm your choice' })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "Option 2: Contact Support" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "If you can't access the app or prefer personal assistance, email us at",
          " ",
          /* @__PURE__ */ jsx("a", { href: "mailto:support@strato-craft.com", children: "support@strato-craft.com" }),
          " with:"
        ] }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: 'Subject line: "Delete My Account"' }),
          /* @__PURE__ */ jsx("li", { children: "The email address associated with your Oneura account" }),
          /* @__PURE__ */ jsx("li", { children: "Confirmation that you want to permanently delete your account" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "We'll process your request within ",
          /* @__PURE__ */ jsx("strong", { children: "48 hours" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "What Gets Deleted" }),
        /* @__PURE__ */ jsx("p", { children: "When you delete your account, we will permanently remove:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Your email address and profile information" }),
          /* @__PURE__ */ jsx("li", { children: "Listening history and playlists" }),
          /* @__PURE__ */ jsx("li", { children: "Mood tracking entries and reflections" }),
          /* @__PURE__ */ jsx("li", { children: "App preferences and settings" }),
          /* @__PURE__ */ jsx("li", { children: "Any other personal data associated with your account" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "All data is deleted within ",
          /* @__PURE__ */ jsx("strong", { children: "30 days" }),
          " of your deletion request. Some anonymized usage statistics may be retained for analytics purposes, but these cannot be linked back to you."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "⚠️ Important: Subscription Cancellation" }),
        /* @__PURE__ */ jsxs("div", { className: "warning-box", children: [
          /* @__PURE__ */ jsx("p", { className: "highlight", children: /* @__PURE__ */ jsx("strong", { children: "Deleting your Oneura account does NOT automatically cancel your subscription!" }) }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Your subscription is managed by Google Play Store or Apple App Store, not by Oneura directly. To avoid future charges, you ",
            /* @__PURE__ */ jsx("strong", { children: "must" }),
            " cancel your subscription separately through your app store."
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "How to Cancel Your Subscription:" }),
        /* @__PURE__ */ jsx("h4", { children: "On Android (Google Play):" }),
        /* @__PURE__ */ jsxs("ol", { children: [
          /* @__PURE__ */ jsx("li", { children: "Open the Google Play Store app" }),
          /* @__PURE__ */ jsx("li", { children: 'Tap your profile icon → "Payments & subscriptions" → "Subscriptions"' }),
          /* @__PURE__ */ jsx("li", { children: 'Find "Oneura Plus" and tap it' }),
          /* @__PURE__ */ jsx("li", { children: 'Tap "Cancel subscription" and follow the prompts' })
        ] }),
        /* @__PURE__ */ jsx("h4", { children: "On iOS (Apple App Store):" }),
        /* @__PURE__ */ jsxs("ol", { children: [
          /* @__PURE__ */ jsx("li", { children: "Open Settings on your iPhone or iPad" }),
          /* @__PURE__ */ jsx("li", { children: 'Tap your name → "Subscriptions"' }),
          /* @__PURE__ */ jsx("li", { children: 'Find "Oneura Plus" and tap it' }),
          /* @__PURE__ */ jsx("li", { children: 'Tap "Cancel Subscription" and confirm' })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "After canceling, you'll keep access to Oneura Plus until the end of your current billing period." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "What Happens After Deletion" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "You will immediately lose access to your Oneura account" }),
          /* @__PURE__ */ jsx("li", { children: "All your personal data will be permanently deleted within 30 days" }),
          /* @__PURE__ */ jsx("li", { children: "You can create a new account at any time if you change your mind" }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Your previous data ",
            /* @__PURE__ */ jsx("strong", { children: "cannot" }),
            " be recovered after deletion"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Partial Data Deletion" }),
        /* @__PURE__ */ jsx("p", { children: "If you don't want to delete your entire account but want to remove specific data:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Mood entries:" }),
            " Delete individual entries within the app"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Playlists:" }),
            " Delete unwanted playlists in your library"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Listening history:" }),
            " Contact support to clear your history"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Email us at ",
          /* @__PURE__ */ jsx("a", { href: "mailto:support@strato-craft.com", children: "support@strato-craft.com" }),
          " if you need help with partial data deletion."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Legal Retention" }),
        /* @__PURE__ */ jsx("p", { children: "In some cases, we may be required by law to retain certain data even after account deletion, such as:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Transaction records (for tax and accounting purposes)" }),
          /* @__PURE__ */ jsx("li", { children: "Data related to ongoing legal disputes" }),
          /* @__PURE__ */ jsx("li", { children: "Fraud prevention records" })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "These records are kept securely and in compliance with applicable laws, and will be deleted as soon as the legal requirement expires." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Questions or Problems?" }),
        /* @__PURE__ */ jsx("p", { children: "If you're having trouble deleting your account, have questions about the process, or want to confirm your data has been deleted, please don't hesitate to reach out." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section contact-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Contact Us" }),
        /* @__PURE__ */ jsx("p", { children: "For assistance with account deletion or data privacy concerns:" }),
        /* @__PURE__ */ jsxs("div", { className: "contact-box", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Email:" }),
            " ",
            /* @__PURE__ */ jsx("a", { href: "mailto:support@strato-craft.com", children: "support@strato-craft.com" })
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Subject:" }),
            ' "Delete My Account" or "Data Privacy Request"'
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Response Time:" }),
            " Within 48 hours"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "small-text", children: "We take data privacy seriously and will always respond promptly to your requests." })
      ] })
    ] })
  ] });
};
const OneuraSubscription = () => {
  return /* @__PURE__ */ jsxs("div", { className: "oneura-subscription-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "subscription-hero", children: [
      /* @__PURE__ */ jsx("h1", { children: "Oneura Plus" }),
      /* @__PURE__ */ jsx("p", { children: "Unlock unlimited relaxation, sleep, and focus" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pricing-section", children: [
      /* @__PURE__ */ jsx("h2", { children: "Choose Your Plan" }),
      /* @__PURE__ */ jsx("p", { className: "pricing-subtitle", children: "Monthly and annual plans include a 7-day free trial (see app). Prices below match the UK store listing in GBP—your app store may show an equivalent in your local currency." }),
      /* @__PURE__ */ jsxs("div", { className: "pricing-cards", children: [
        /* @__PURE__ */ jsxs("div", { className: "pricing-card free-card", children: [
          /* @__PURE__ */ jsx("div", { className: "plan-badge", children: "FREE" }),
          /* @__PURE__ */ jsx("h3", { children: "Free Tier" }),
          /* @__PURE__ */ jsxs("div", { className: "price", children: [
            /* @__PURE__ */ jsx("span", { className: "amount", children: "£0" }),
            /* @__PURE__ */ jsx("span", { className: "period", children: "forever" })
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "features", children: [
            /* @__PURE__ */ jsx("li", { children: "✓ Listening allowance & cool-down refreshes (quota shown in app)" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Rewarded-video bonus time where offered" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Core ambiences and previews" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Mood, calendar & insight surfaces that stay on the free tier" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Stories & sounds marked Free in the catalogue" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "plan-description", children: "Try Oneura before you upgrade" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pricing-card popular-card", children: [
          /* @__PURE__ */ jsx("div", { className: "plan-badge popular-badge", children: "POPULAR" }),
          /* @__PURE__ */ jsx("h3", { children: "Annual" }),
          /* @__PURE__ */ jsx("p", { className: "plan-tagline", children: "Best value · Save 33% vs monthly" }),
          /* @__PURE__ */ jsxs("div", { className: "price", children: [
            /* @__PURE__ */ jsx("span", { className: "amount", children: "£2.00" }),
            /* @__PURE__ */ jsx("span", { className: "period", children: "/month" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "price-footnote", children: "£23.99 billed annually" }),
          /* @__PURE__ */ jsx("div", { className: "trial-badge", children: "7-day free trial" }),
          /* @__PURE__ */ jsxs("ul", { className: "features", children: [
            /* @__PURE__ */ jsx("li", { children: "✓ Unlimited listening" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Full ambience sessions & layered mixes" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Ad-free experience" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Premium catalogue: sounds & sleep stories marked Plus" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Sleep timers, looping & uninterrupted floating player" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Advanced playlists & premium personalisation where available" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "plan-description", children: "7-day free trial, then £23.99 per year. Auto-renews until cancelled." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pricing-card", children: [
          /* @__PURE__ */ jsx("h3", { children: "Monthly" }),
          /* @__PURE__ */ jsx("p", { className: "plan-tagline", children: "Perfect for trying out" }),
          /* @__PURE__ */ jsxs("div", { className: "price", children: [
            /* @__PURE__ */ jsx("span", { className: "amount", children: "£2.99" }),
            /* @__PURE__ */ jsx("span", { className: "period", children: "/month" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "trial-badge", children: "7-day free trial" }),
          /* @__PURE__ */ jsxs("ul", { className: "features", children: [
            /* @__PURE__ */ jsx("li", { children: "✓ Unlimited listening" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Full ambience sessions & layered mixes" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Ad-free experience" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Premium catalogue: sounds & sleep stories marked Plus" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Sleep timers, looping & uninterrupted floating player" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Advanced playlists & premium personalisation where available" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "plan-description", children: "7-day free trial, then £2.99 per month. Auto-renews until cancelled." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pricing-card lifetime-card", children: [
          /* @__PURE__ */ jsx("div", { className: "plan-badge best-value-badge", children: "BEST VALUE" }),
          /* @__PURE__ */ jsx("h3", { children: "Lifetime Access" }),
          /* @__PURE__ */ jsx("p", { className: "plan-tagline", children: "Pay once, enjoy forever" }),
          /* @__PURE__ */ jsxs("div", { className: "price", children: [
            /* @__PURE__ */ jsx("span", { className: "amount", children: "£149.99" }),
            /* @__PURE__ */ jsx("span", { className: "period", children: "one-time" })
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "features", children: [
            /* @__PURE__ */ jsx("li", { children: "✓ Everything in Oneura Plus, with no subscription" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Same premium catalogue and features as paying members" }),
            /* @__PURE__ */ jsx("li", { children: "✓ One-time purchase—no renewals" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Keep access for the life of the product / your account" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "plan-description", children: "One-time purchase. No subscription." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "pricing-footnote", children: [
        "After installing the app, use ",
        /* @__PURE__ */ jsx("strong", { children: "Restore Purchases" }),
        " on the Membership screen if you reinstall or change device."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "comparison-section", children: [
      /* @__PURE__ */ jsx("h2", { children: "What's Included in Oneura Plus?" }),
      /* @__PURE__ */ jsxs("div", { className: "comparison-grid", children: [
        /* @__PURE__ */ jsxs("div", { className: "comparison-item", children: [
          /* @__PURE__ */ jsx("div", { className: "comparison-icon", children: "⏰" }),
          /* @__PURE__ */ jsx("h3", { children: "Unlimited Listening" }),
          /* @__PURE__ */ jsx("p", { children: "Listen as long as you need—no daily limits, no restrictions. Fall asleep to 8+ hours of continuous sound." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "comparison-item", children: [
          /* @__PURE__ */ jsx("div", { className: "comparison-icon", children: "🎵" }),
          /* @__PURE__ */ jsx("h3", { children: "Premium Sound Library" }),
          /* @__PURE__ */ jsx("p", { children: "Unlock exclusive high-quality soundscapes and ambiences not available in the free tier." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "comparison-item", children: [
          /* @__PURE__ */ jsx("div", { className: "comparison-icon", children: "🚫" }),
          /* @__PURE__ */ jsx("h3", { children: "Ad-Free Experience" }),
          /* @__PURE__ */ jsx("p", { children: "Enjoy uninterrupted relaxation without ads breaking your peaceful state." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "comparison-item", children: [
          /* @__PURE__ */ jsx("div", { className: "comparison-icon", children: "📚" }),
          /* @__PURE__ */ jsx("h3", { children: "Premium stories & narratives" }),
          /* @__PURE__ */ jsx("p", { children: "Binge sleep stories and narratives marked Plus—including extended listens not available on the metered tier." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "comparison-item", children: [
          /* @__PURE__ */ jsx("div", { className: "comparison-icon", children: "🎨" }),
          /* @__PURE__ */ jsx("h3", { children: "Advanced Playlists" }),
          /* @__PURE__ */ jsx("p", { children: "Create unlimited custom soundscapes with multiple sounds mixed perfectly." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "comparison-item", children: [
          /* @__PURE__ */ jsx("div", { className: "comparison-icon", children: "🌟" }),
          /* @__PURE__ */ jsx("h3", { children: "What's next" }),
          /* @__PURE__ */ jsx("p", { children: "Guided packs, sharper sleep/mood correlations, and deeper personalisation—the Plus tier is where we unlock the biggest new experiences first." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "trial-info-section", children: [
      /* @__PURE__ */ jsx("h2", { children: "🎁 Start Your Free Trial" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Try Oneura Plus ",
        /* @__PURE__ */ jsx("strong", { children: "risk-free for 7 days" }),
        ". Experience unlimited listening, premium sounds, and all the features that make Oneura the perfect companion for sleep, relaxation, and focus."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Cancel anytime during your trial and you won't be charged. Subscriptions auto-renew unless you cancel at least ",
        /* @__PURE__ */ jsx("strong", { children: "24 hours" }),
        " before the trial or billing period ends (manage in Google Play or the App Store)."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "faq-section", children: [
      /* @__PURE__ */ jsx("h2", { children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsxs("div", { className: "faq-item", children: [
        /* @__PURE__ */ jsx("h3", { children: "How do I start my free trial?" }),
        /* @__PURE__ */ jsx("p", { children: "Download Oneura from the app store, create an account, and select a subscription plan. You'll get 7 days of full access before being charged." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "faq-item", children: [
        /* @__PURE__ */ jsx("h3", { children: "Can I cancel my subscription?" }),
        /* @__PURE__ */ jsx("p", { children: "Yes! You can cancel anytime through your device's subscription settings (Google Play or App Store). You'll keep access until the end of your billing period." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "faq-item", children: [
        /* @__PURE__ */ jsx("h3", { children: "What happens if I cancel?" }),
        /* @__PURE__ */ jsx("p", { children: "You'll return to the free tier listening allowance (metering & cool-down refreshes as shown in-app). Your preferences stay on device so you can resubscribe anytime." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "faq-item", children: [
        /* @__PURE__ */ jsx("h3", { children: "How does Lifetime Access work?" }),
        /* @__PURE__ */ jsx("p", { children: "Pay once (£149.99 in the UK listing) for the same Plus benefits as subscribers, with no renewals. Availability and price may vary slightly by storefront region. Use Restore Purchases if you reinstall the app." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "faq-item", children: [
        /* @__PURE__ */ jsx("h3", { children: "Can I switch between plans?" }),
        /* @__PURE__ */ jsx("p", { children: "Yes! You can upgrade or downgrade your plan at any time through your subscription settings. Changes take effect at the start of your next billing cycle." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "download-cta", children: [
      /* @__PURE__ */ jsx("h2", { children: "Ready to Get Started?" }),
      /* @__PURE__ */ jsx("p", { children: "Download Oneura and start your free trial today" }),
      /* @__PURE__ */ jsxs("div", { className: "store-buttons", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://play.google.com/store/apps/details?id=com.stratocraft.oneura&pli=1",
            target: "_blank",
            rel: "noopener noreferrer",
            children: /* @__PURE__ */ jsx("img", { src: googlePlay, alt: "Get it on Google Play", className: "store-badge" })
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://apps.apple.com/app/oneura/id6754253306",
            target: "_blank",
            rel: "noopener noreferrer",
            children: /* @__PURE__ */ jsx("img", { src: appStore, alt: "Download on the App Store", className: "store-badge" })
          }
        )
      ] })
    ] })
  ] });
};
const OneuraTermsAndConditions = () => {
  const privacyHref = oneuraPagePath("privacy-policy");
  const cookieHref = oneuraPagePath("cookie-policy");
  const deleteDataHref = oneuraPagePath("delete-data");
  return /* @__PURE__ */ jsxs("div", { className: "policy-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "policy-hero", children: [
      /* @__PURE__ */ jsx("h1", { children: "Terms & Conditions" }),
      /* @__PURE__ */ jsx("p", { className: "last-updated", children: "Last Updated: May 7, 2026" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "policy-content", children: [
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsxs("p", { className: "highlight", children: [
          /* @__PURE__ */ jsx("strong", { children: "PLEASE READ THESE TERMS CAREFULLY." }),
          ' They form a legally binding agreement between you and Strato-Craft Ltd ("Strato-Craft," "we," "us," or "our") regarding the Oneura mobile application, our website at',
          " ",
          /* @__PURE__ */ jsx("a", { href: "https://oneura.app", target: "_blank", rel: "noopener noreferrer", children: "oneura.app" }),
          ', related Strato-Craft pages, and other services we make available in connection with Oneura (collectively, the "Service").'
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "By tapping accept (where presented), creating an account, downloading or installing the app, or otherwise accessing or using the Service, you confirm that you have read and understood these Terms of Service and agree to be bound by them, together with our",
          " ",
          /* @__PURE__ */ jsx(Link, { to: privacyHref, children: "Privacy Policy" }),
          " and",
          " ",
          /* @__PURE__ */ jsx(Link, { to: cookieHref, children: "Cookie Policy" }),
          ' (where applicable), which are incorporated by reference (collectively, these "Terms"). If you do not agree, do not use the Service.'
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Arbitration notice for U.S. residents." }),
          " If you reside in the United States, Section 18 (Dispute resolution — United States) contains a binding arbitration provision and class-action waiver that affect your legal rights. Please read it carefully."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "1. Service overview" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Oneura is a consumer wellness and lifestyle application that offers ambient audio, routines, stories, mood and reflection tools, optional insights, and related features intended to support relaxation, focus, and personal wellbeing. The Service may also allow you to connect optional device or platform integrations — for example, optional health or wearable data where you grant permission — solely to display information and correlations within the app as described in our",
          " ",
          /* @__PURE__ */ jsx(Link, { to: privacyHref, children: "Privacy Policy" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "highlight", children: [
          /* @__PURE__ */ jsx("strong", { children: "The Service is not medical care." }),
          " Oneura is ",
          /* @__PURE__ */ jsx("strong", { children: "not" }),
          " a medical device, clinical service, or substitute for professional diagnosis, treatment, therapy, or emergency care. We do not provide medical advice. Nothing in the Service establishes a clinician–patient relationship with Strato-Craft."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "highlight", children: [
          /* @__PURE__ */ jsx("strong", { children: "Emergency." }),
          " If you believe you may be in crisis or need urgent help,",
          /* @__PURE__ */ jsx("strong", { children: " call your local emergency number" }),
          " (for example, ",
          /* @__PURE__ */ jsx("strong", { children: "911" }),
          " in the United States, ",
          /* @__PURE__ */ jsx("strong", { children: "999" }),
          " in the United Kingdom). In the U.S., you can dial ",
          /* @__PURE__ */ jsx("strong", { children: "988" }),
          " ",
          "for the Suicide & Crisis Lifeline or ",
          /* @__PURE__ */ jsx("strong", { children: "1-800-273-TALK (8255)" }),
          ". In the UK, you can contact ",
          /* @__PURE__ */ jsx("strong", { children: "Samaritans" }),
          " on ",
          /* @__PURE__ */ jsx("strong", { children: "116 123" }),
          ". Use the emergency and crisis options appropriate to your location."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "2. Eligibility" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "You may use the Service only if you can form a binding contract with us and meet the minimum age required in your region (typically at least ",
          /* @__PURE__ */ jsx("strong", { children: "13 years" }),
          " old, or older where the law requires a higher age for valid consent to online services or data processing). If you are not of legal age to consent on your own behalf, your parent or legal guardian must read and accept these Terms on your behalf and is responsible for your use of the Service."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "The Service is not directed to children under 13 (or under 16 where a higher threshold applies under local law), as further described in our ",
          /* @__PURE__ */ jsx(Link, { to: privacyHref, children: "Privacy Policy" }),
          ". Do not use the Service if you are prohibited from doing so under applicable law."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "3. Accounts and registration" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Certain features require an account. You agree that information you provide is accurate and complete, and that you will keep it up to date. You are responsible for safeguarding your login credentials and for all activity under your account. Notify us promptly at",
          " ",
          /* @__PURE__ */ jsx("a", { href: "mailto:support@strato-craft.com", children: "support@strato-craft.com" }),
          " if you believe your account has been compromised."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "4. Fees, billing, and subscriptions" }),
        /* @__PURE__ */ jsx("h3", { children: "4.1 Fees" }),
        /* @__PURE__ */ jsx("p", { children: "Parts of the Service are free; premium features may require payment. Fees, billing cycles, and taxes are shown before you confirm a purchase where the applicable app store or payment flow requires disclosure. Unless otherwise stated at purchase or required by law, fees are non-refundable." }),
        /* @__PURE__ */ jsx("h3", { children: "4.2 Payment processing" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Purchases made through Apple's App Store or Google Play are processed by those platforms. We do not receive your full payment card details. Your payment relationship is also governed by the applicable store's terms. Third-party subscription tools (such as subscription management platforms) may process entitlement status as described in our ",
          /* @__PURE__ */ jsx(Link, { to: privacyHref, children: "Privacy Policy" }),
          "."
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "4.3 Subscriptions and renewal" }),
        /* @__PURE__ */ jsx("p", { children: "If you subscribe, your subscription may renew automatically for successive periods unless you cancel through your app store account settings before the renewal date, or as otherwise explained at the point of purchase. You authorise us, our app store partners, and our payment/subscription processors to charge the applicable fees using the payment method on file. We may change fees or introduce new fees for new features with reasonable advance notice where required by law or platform rules." }),
        /* @__PURE__ */ jsx("h3", { children: "4.4 Delinquent accounts and failed payments" }),
        /* @__PURE__ */ jsx("p", { children: "We may suspend or limit access to fee-based features if payments fail. We are not responsible for losses arising from suspension, account deletion by a store, or failed renewals where your payment method is invalid — subject to applicable consumer rights that cannot be waived." }),
        /* @__PURE__ */ jsx("h3", { children: "4.5 Cancellation" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "You may cancel a subscription through your app store account. Cancelling the Service or deleting your account may ",
          /* @__PURE__ */ jsx("strong", { children: "not" }),
          " automatically stop a recurring subscription; you must cancel the subscription with the store. See ",
          /* @__PURE__ */ jsx(Link, { to: deleteDataHref, children: "Delete My Data" }),
          " for account deletion information."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "5. Health, wellness, and optional integrations" }),
        /* @__PURE__ */ jsx("h3", { children: "5.1 Not medical advice" }),
        /* @__PURE__ */ jsx("p", { children: "Content and features in the Service (including summaries, correlations, or optional AI-assisted outputs) are for general wellbeing and information only. They may be incomplete, inaccurate, or unsuitable for your situation. Always seek qualified professional advice for medical, mental health, or urgent safety concerns. Do not disregard professional advice because of something you see in the Service." }),
        /* @__PURE__ */ jsx("h3", { children: "5.2 Optional health and device data" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "If you connect optional health, sleep, or wearable integrations, you decide what to connect and can revoke permissions using your device or in-app controls where available. Strato-Craft does",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "not" }),
          " use the Service as a HIPAA-covered medical record system or a regulated clinical repository for U.S. users; see the",
          " ",
          /* @__PURE__ */ jsx(Link, { to: privacyHref, children: "Privacy Policy (United States Residents)" }),
          " for additional context."
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "5.3 No guarantee of results" }),
        /* @__PURE__ */ jsx("p", { children: "We do not guarantee any specific health, sleep, mood, or wellness outcome. Individual experiences vary." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "6. Licence to you" }),
        /* @__PURE__ */ jsx("h3", { children: "6.1 Limited licence" }),
        /* @__PURE__ */ jsx("p", { children: "Subject to your compliance with these Terms, we grant you a personal, non-exclusive, non-transferable, non-sublicensable, revocable licence to install and use the app (object code) on devices you own or control, and to access the Service, solely for your personal, non-commercial use." }),
        /* @__PURE__ */ jsx("h3", { children: "6.2 Restrictions" }),
        /* @__PURE__ */ jsx("p", { children: "Except where applicable law forbids such a restriction, you must not:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Copy, modify, distribute, publicly display, or create derivative works from the Service except as expressly permitted" }),
          /* @__PURE__ */ jsx("li", { children: "Reverse engineer, decompile, or attempt to extract source code except to the extent mandatory law allows" }),
          /* @__PURE__ */ jsx("li", { children: "Bypass, disable, or interfere with security or access controls" }),
          /* @__PURE__ */ jsx("li", { children: "Use the Service in violation of law or in a way that harms us or others" })
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "6.3 Feedback" }),
        /* @__PURE__ */ jsx("p", { children: 'If you send suggestions or feedback ("Feedback"), you grant us a perpetual, worldwide, royalty-free licence to use Feedback to improve the Service and our business, without obligation to compensate you or credit you (unless mandatory law requires otherwise).' })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "7. Our intellectual property" }),
        /* @__PURE__ */ jsx("p", { children: 'The Service, including software, branding, design, audio curation, text, and other materials ("Materials"), is owned by Strato-Craft or our licensors. Except for the limited licence above, no rights are granted. Sound content may include licensed or open-licensed sources used according to their respective terms. All rights not expressly granted are reserved.' })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "8. Third-party services" }),
        /* @__PURE__ */ jsx("p", { children: "The Service relies on or links to third parties — including app stores, hosting and analytics providers, authentication services, and optional integrations you enable. Those third parties have their own terms and privacy practices. We are not responsible for third-party services. Where you direct data to a third party or connect an integration, your relationship is with that third party." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "9. User content and permitted use" }),
        /* @__PURE__ */ jsx("h3", { children: "9.1 Your content" }),
        /* @__PURE__ */ jsxs("p", { children: [
          'The Service may allow you to enter material such as notes, mood check-ins, favorites, or similar ("User Content"). You retain ownership of your User Content subject to the licences below and our',
          " ",
          " ",
          /* @__PURE__ */ jsx(Link, { to: privacyHref, children: "Privacy Policy" }),
          "."
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "9.2 Licence to us" }),
        /* @__PURE__ */ jsx("p", { children: "To operate the Service, you grant Strato-Craft a worldwide, non-exclusive licence to host, store, process, display, and transmit User Content as needed to provide the Service to you and to maintain, secure, and improve the Service, including in encrypted or aggregated form where applicable." }),
        /* @__PURE__ */ jsx("h3", { children: "9.3 Your responsibilities" }),
        /* @__PURE__ */ jsx("p", { children: "You represent that you have the rights to your User Content and that it does not violate law or third-party rights. Do not submit content that is unlawful, abusive, hateful, harassing, or that infringes intellectual property or privacy rights of others." }),
        /* @__PURE__ */ jsx("h3", { children: "9.4 Monitoring and removal" }),
        /* @__PURE__ */ jsx("p", { children: "We are not obliged to monitor User Content but may review, remove, or restrict access where we reasonably believe it violates these Terms, poses a risk, or is required by law." }),
        /* @__PURE__ */ jsx("h3", { children: "9.5 Automated and AI-assisted features" }),
        /* @__PURE__ */ jsx("p", { children: "Some features may use automation or machine learning (for example, insight or analysis features). Outputs may be inaccurate or unsuitable. Outputs are not professional advice. You are responsible for how you interpret or act on them. You must not submit inputs that unlawfully include third-party personal data you are not authorised to share, or that you intend to use to violate law." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "10. Usage data" }),
        /* @__PURE__ */ jsxs("p", { children: [
          'We may create and use data derived from use of the Service ("Usage Data") for lawful business purposes such as operating, securing, improving, and measuring the Service, including in de-identified or aggregated form where we describe in the ',
          /* @__PURE__ */ jsx(Link, { to: privacyHref, children: "Privacy Policy" }),
          ". To the extent permitted by law, Strato-Craft owns Usage Data and analytical results derived from it, excluding your personal information where you retain rights under applicable data protection law."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "11. Communications" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "We may send service-related and transactional messages. If we send optional promotional messages where permitted, you may opt out as described in those messages. Push notifications can usually be disabled in your device settings. See our ",
          /* @__PURE__ */ jsx(Link, { to: privacyHref, children: "Privacy Policy" }),
          " for details on communications and choices."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "12. Prohibited conduct" }),
        /* @__PURE__ */ jsx("p", { children: "By using the Service, you agree not to:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Use the Service for any unlawful purpose or violate applicable laws or regulations" }),
          /* @__PURE__ */ jsx("li", { children: "Harass, threaten, harm, or impersonate others" }),
          /* @__PURE__ */ jsx("li", { children: "Infringe intellectual property or other rights" }),
          /* @__PURE__ */ jsx("li", { children: "Access or scrape the Service through automated means (including bots, scrapers, or unauthorised scripts) except as we expressly permit" }),
          /* @__PURE__ */ jsx("li", { children: "Interfere with or disrupt the Service, servers, or networks" }),
          /* @__PURE__ */ jsx("li", { children: "Upload malware or attempt to gain unauthorised access to accounts or systems" }),
          /* @__PURE__ */ jsx("li", { children: "Circumvent subscription, usage, or technical limits" }),
          /* @__PURE__ */ jsx("li", { children: "Use the Service to develop or train unrelated machine-learning models on our content or outputs where prohibited, or to misrepresent the origin of content" }),
          /* @__PURE__ */ jsx("li", { children: "Attempt any of the above or assist others in doing so" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "13. Copyright and intellectual property complaints (DMCA-style)" }),
        /* @__PURE__ */ jsx("p", { children: "We respect intellectual property rights. If you believe material on the Service infringes your copyright, you may send a notice to our designated contact with the information typically required under applicable law (for example, U.S. Digital Millennium Copyright Act procedures where they apply)." }),
        /* @__PURE__ */ jsx("div", { className: "contact-box", children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Strato-Craft Ltd" }),
          /* @__PURE__ */ jsx("br", {}),
          "Attn: Copyright / IP Notices",
          /* @__PURE__ */ jsx("br", {}),
          "Email:",
          " ",
          /* @__PURE__ */ jsx("a", { href: "mailto:support@strato-craft.com?subject=Copyright%20notice", children: "support@strato-craft.com" }),
          /* @__PURE__ */ jsx("br", {}),
          'Please include "Copyright notice" in the subject line and sufficient detail to locate the material and evaluate your claim.'
        ] }) }),
        /* @__PURE__ */ jsx("p", { children: "We may remove or disable access to material in appropriate circumstances. Repeat infringement may result in account termination. If you believe material was removed by mistake, you may submit a counter-notice as permitted by applicable law." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "14. Changes to these Terms" }),
        /* @__PURE__ */ jsx("p", { children: 'We may modify these Terms from time to time. We will post the updated Terms and revise the "Last Updated" date. If changes are material, we will provide additional notice where appropriate (for example, through the Service or by email if we have your address). Your continued use of the Service after the effective date may constitute acceptance of the revised Terms where permitted by law. If you do not agree, stop using the Service and cancel subscriptions as needed.' })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "15. Term, suspension, and termination" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "These Terms apply from your first use of the Service until terminated. We may suspend or terminate access if you materially breach these Terms, if we are required to do so by law, or for operational, security, or fraud-prevention reasons. You may stop using the Service at any time. Upon termination, your licence ends and you must cease use. Provisions that by their nature should survive (including intellectual property, disclaimers, limitations of liability, dispute resolution, and governing law) will survive. Account deletion is described on",
          " ",
          /* @__PURE__ */ jsx(Link, { to: deleteDataHref, children: "Delete My Data" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "16. Indemnity" }),
        /* @__PURE__ */ jsx("p", { children: "To the fullest extent permitted by law, you will defend and indemnify Strato-Craft and our affiliates, directors, officers, employees, and agents against third-party claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising from: (a) your User Content; (b) your misuse of the Service; (c) your breach of these Terms or applicable law; or (d) your dispute with a third party in connection with the Service." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "17. Disclaimers" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: 'THE SERVICE AND ALL MATERIALS ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.' }),
          " ",
          "Nothing in the Service creates a warranty not expressly stated in these Terms."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "Some jurisdictions do not allow certain disclaimers. In those jurisdictions, disclaimers apply to the maximum extent allowed." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "18. Limitation of liability" }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "TO THE FULLEST EXTENT PERMITTED BY LAW, STRATO-CRAFT AND OUR AFFILIATES WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, GOODWILL, OR OPPORTUNITY, ARISING OUT OF OR RELATED TO THE SERVICE OR THESE TERMS, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES." }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "TO THE FULLEST EXTENT PERMITTED BY LAW, OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE OR THESE TERMS WILL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID TO STRATO-CRAFT FOR THE SERVICE IN THE TWELVE (12) MONTHS BEFORE THE EVENT GIVING RISE TO LIABILITY, OR (B) ONE HUNDRED US DOLLARS (US$100) / ONE HUNDRED UK POUNDS (£100) EQUIVALENT (WE MAY APPLY THE CURRENCY THAT MATCHES YOUR PLACE OF PURCHASE)." }) }),
        /* @__PURE__ */ jsx("p", { children: "Some jurisdictions do not allow certain limitations. In those jurisdictions, our liability is limited to the maximum extent permitted. Nothing in these Terms excludes or limits liability that cannot legally be excluded or limited (including death or personal injury caused by negligence where applicable law forbids such a cap, or statutory rights for consumers)." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "19. Dispute resolution — United States" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "This Section 19 applies only if you reside in the United States." }),
          " It does not apply where prohibited by law. Nothing in this Section limits non-waivable rights you may have under federal, state, or local consumer protection laws."
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "19.1 Binding arbitration" }),
        /* @__PURE__ */ jsx("p", { children: 'Except for disputes that qualify for small claims court or that concern intellectual property injunctive relief (to the extent a court may hear such claims first), you and Strato-Craft agree that any dispute, claim, or controversy arising out of or relating to the Service or these Terms (including formation, breach, enforcement, or interpretation) will be resolved exclusively by binding arbitration administered by Judicial Arbitration and Mediation Services, Inc. ("JAMS") in accordance with its applicable consumer arbitration rules, as modified by these Terms. The Federal Arbitration Act governs this arbitration agreement.' }),
        /* @__PURE__ */ jsx("h3", { children: "19.2 Class action waiver" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "YOU AND STRATO-CRAFT AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN AN INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING." }),
          " ",
          "Unless both you and we agree otherwise, the arbitrator may not consolidate claims or preside over any form of representative or class proceeding."
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "19.3 Opt-out" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "You may opt out of this Section 19 within thirty (30) days after you first accept these Terms by emailing",
          " ",
          /* @__PURE__ */ jsx("a", { href: "mailto:support@strato-craft.com?subject=Arbitration%20opt-out", children: "support@strato-craft.com" }),
          " ",
          'from the email associated with your account (if any) with the subject line "Arbitration opt-out" and stating your full name and intent to opt out. If you opt out, this Section 19 does not apply to you, but other Terms still apply.'
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "19.4 Enforceability" }),
        /* @__PURE__ */ jsx("p", { children: "If any portion of this Section 19 is found unenforceable, the remainder may still apply, or the dispute may be brought in court as applicable law requires." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "20. Governing law, venue, and non-U.S. users" }),
        /* @__PURE__ */ jsx("h3", { children: "20.1 Governing law" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Subject to mandatory consumer protections that apply to you, these Terms are governed by the laws of",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "England and Wales" }),
          ", without regard to conflict-of-law principles."
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "20.2 Venue (court disputes)" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "If you are not subject to Section 19, or Section 19 does not apply or has been validly opted out, and a dispute may be heard in court, the courts of ",
          /* @__PURE__ */ jsx("strong", { children: "England and Wales" }),
          " will have exclusive jurisdiction, except where applicable consumer law requires a different court for consumers in the UK, EEA, or other regions — in which case you may also have rights to sue in your country of residence where such law requires."
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "20.3 European Economic Area and United Kingdom consumers" }),
        /* @__PURE__ */ jsx("p", { children: "If you are a consumer in the UK or EEA, you benefit from any mandatory provisions of the law of your country of residence. Nothing in these Terms limits those rights." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "21. Miscellaneous" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Entire agreement." }),
            " These Terms, together with the policies they reference, are the entire agreement between you and us regarding the Service."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Assignment." }),
            " You may not assign these Terms without our consent. We may assign in connection with a merger, acquisition, or sale of assets."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "No waiver." }),
            " Failure to enforce a provision is not a waiver."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Severability." }),
            " If any provision is invalid, the remainder remains in effect."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Language." }),
            " The English language version controls unless required otherwise by law."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Electronic communications." }),
            " You consent to receive notices electronically as described in our ",
            /* @__PURE__ */ jsx(Link, { to: privacyHref, children: "Privacy Policy" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "International use." }),
            " We operate from the United Kingdom. Access where prohibited is not authorised."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "22. California consumers" }),
        /* @__PURE__ */ jsx("p", { children: "Under California Civil Code § 1789.3, California users may contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 N. Market Blvd., Suite S-202, Sacramento, California 95834, or by telephone at +1 (800) 952-5210." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "23. Export" }),
        /* @__PURE__ */ jsx("p", { children: "You may not use or export the Service except as authorised by applicable export control and sanctions laws." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "policy-section contact-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "24. Contact" }),
        /* @__PURE__ */ jsx("p", { children: "For questions about these Terms:" }),
        /* @__PURE__ */ jsxs("div", { className: "contact-box", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Email:" }),
            " ",
            /* @__PURE__ */ jsx("a", { href: "mailto:support@strato-craft.com", children: "support@strato-craft.com" })
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Company:" }),
            " Strato-Craft Ltd"
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Location:" }),
            " United Kingdom"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "For privacy matters, see the ",
          /* @__PURE__ */ jsx(Link, { to: privacyHref, children: "Privacy Policy" }),
          " and contact details listed there."
        ] })
      ] })
    ] })
  ] });
};
const googlePlayUrl = "https://play.google.com/store/apps/details?id=com.stratocraft.oneura";
const appStoreUrl = "https://apps.apple.com/app/oneura/id6754253306";
const contentBySlug = {
  "sleep-sounds-white-noise": {
    kicker: "Sleep sounds and white noise",
    title: "Oneura is a sleep sounds app for calmer nights",
    intro: "Use white noise, brown noise, rain, ocean waves, forest ambience, cafe atmosphere, and gentle soundscapes to build a repeatable wind-down routine.",
    image: previewOcean,
    imageAlt: "Oneura ocean waves sleep soundscape for relaxation and rest",
    answerTitle: "What makes Oneura useful as a sleep sounds app?",
    answer: "Oneura focuses on quick, low-friction audio support: choose a calming sound, layer ambience where available, set a timer, and let the session support your night routine without turning bedtime into another task.",
    facts: [
      {
        label: "Best for",
        value: "Sleep sounds, white noise, brown noise, and wind-down routines"
      },
      {
        label: "Includes",
        value: "Rain, ocean, forest, fans, cafe ambience, noise colours, and stories"
      },
      {
        label: "Platforms",
        value: "iOS and Android"
      },
      {
        label: "Positioning",
        value: "A sleep app with sensory ambience and mood-aware reflection"
      }
    ],
    sections: [
      {
        title: "Sleep sounds without the ceremony",
        body: "Some nights do not need a long lesson or a full meditation course. They need a steady background that makes the room feel less sharp and the evening feel easier to close.",
        bullets: [
          "Start with nature sounds like rain, ocean, streams, and forest ambience",
          "Use steady noise colours for masking distracting room or street sound",
          "Keep the flow simple with favourites, timers, and recurring routines"
        ]
      },
      {
        title: "White noise, brown noise, and natural ambience",
        body: "Different minds settle with different textures. Oneura gives you a practical sound library so you can test what feels soft, steady, or grounding tonight.",
        bullets: [
          "White noise for bright, steady masking",
          "Brown and pink noise for deeper, softer backgrounds",
          "Cafe, fan, and air sounds for focus-friendly calm"
        ]
      },
      {
        title: "A sleep app that still leaves room for mood",
        body: "Sleep is not only about the sound playing in the background. Oneura also supports gentle reflection so you can notice what routines, times, and ambience types seem to work for you.",
        bullets: [
          "Mood check-ins help you reflect on patterns over time",
          "Oneura Plus unlocks longer sessions and premium audio",
          "Insights are informational and reflective, never medical advice"
        ]
      }
    ],
    faqs: [
      {
        question: "Is Oneura mainly a sleep app?",
        answer: "Yes. Oneura is built around sleep sounds, calming ambience, wind-down routines, and relaxation, while also supporting focus and mood reflection."
      },
      {
        question: "Does Oneura include white noise?",
        answer: "Oneura includes steady masking sounds and noise colour options such as white, pink, brown, and green noise where available in the app catalogue."
      },
      {
        question: "Can I use Oneura without a subscription?",
        answer: "Yes. Oneura is free to download with a free listening tier. Oneura Plus adds unlimited listening, premium sounds, premium stories, and ad-free use."
      }
    ],
    related: [
      {
        slug: "sleep-app-for-busy-minds",
        title: "Sleep app for busy minds",
        description: "A calmer wind-down for racing thoughts and restless evenings."
      },
      {
        slug: "sensory-relaxation-app",
        title: "Sensory relaxation app",
        description: "Sound, visual ambience, and simple tools for decompression."
      }
    ]
  },
  "sensory-relaxation-app": {
    kicker: "Sensory relaxation app",
    title: "A sensory relaxation app for overstimulated moments",
    intro: "Oneura combines calming soundscapes, simple visual ambience, optional haptics, and gentle routines for people who need to decompress without making relaxation complicated.",
    image: previewForest,
    imageAlt: "Oneura forest ambience used for sensory relaxation and calm",
    answerTitle: "What is a sensory relaxation app?",
    answer: "A sensory relaxation app uses sound, visuals, rhythm, and simple interaction to create a calmer environment. Oneura is designed to help busy, overstimulated minds find a softer background for rest, focus, or a wind-down break.",
    facts: [
      {
        label: "Best for",
        value: "Overstimulation, decompression, sleep preparation, and calm focus"
      },
      {
        label: "Sensory tools",
        value: "Soundscapes, ambience, timers, mood reflection, visuals, and haptics"
      },
      {
        label: "Use style",
        value: "Press play, settle in, and adjust the experience around your state"
      },
      {
        label: "Care note",
        value: "Wellness support only, not medical or clinical treatment"
      }
    ],
    sections: [
      {
        title: "Built for decompression, not performance",
        body: "Many wellness apps ask you to learn a method before you feel any relief. Oneura is designed for the moments when you simply need a calmer sensory environment first.",
        bullets: [
          "Use soundscapes as a soft background after a loud or demanding day",
          "Choose ambience that feels grounding instead of attention-grabbing",
          "Let timers and favourites reduce the number of decisions at night"
        ]
      },
      {
        title: "Audio, visuals, and gentle rhythm",
        body: "The sensory lane is where Oneura can stand apart from broad meditation apps: less pressure to meditate perfectly, more room to settle through atmosphere.",
        bullets: [
          "Natural ambience for a calmer room feel",
          "Simple visuals and haptics where available for body-level cues",
          "Layered mixes for people who need more than silence"
        ]
      },
      {
        title: "Calm for sleep, study, and transitions",
        body: "Sensory relaxation is not only for bedtime. Oneura can also be used between tasks, during reading, for focus backgrounds, or as a transition out of work mode.",
        bullets: [
          "Create a focus-friendly background with cafe, fan, or noise sounds",
          "Use slower ambience when preparing for sleep",
          "Reflect on mood without turning the app into a heavy tracker"
        ]
      }
    ],
    faqs: [
      {
        question: "Can Oneura help with overstimulation?",
        answer: "Oneura can support moments of overstimulation by giving you calming sounds, simple ambience, and low-friction routines. It is not a medical treatment."
      },
      {
        question: "Is sensory relaxation the same as meditation?",
        answer: "Not exactly. Meditation often asks for a specific mental practice. Sensory relaxation can be simpler: change the room's sound and feel so your body has a calmer place to land."
      },
      {
        question: "Who is Oneura best for?",
        answer: "Oneura is useful for people who want sleep sounds, focus ambience, sensory decompression, mood reflection, and a gentle wind-down routine in one app."
      }
    ],
    related: [
      {
        slug: "neuro-friendly-sleep-app",
        title: "Neuro-friendly sleep app",
        description: "Designed with busy minds and sensory needs in mind."
      },
      {
        slug: "sleep-sounds-white-noise",
        title: "Sleep sounds and white noise",
        description: "Sleep audio, masking sounds, and calming ambience."
      }
    ]
  },
  "sleep-app-for-busy-minds": {
    kicker: "Sleep app for busy minds",
    title: "A sleep app for busy minds that struggle to switch off",
    intro: "Oneura helps restless evenings feel less crowded with soundscapes, white noise, sleep stories, mood-aware wind-downs, and calm sensory cues.",
    image: previewCafe,
    imageAlt: "Oneura cafe ambience and focus soundscape for busy minds",
    answerTitle: "How does Oneura support busy minds at bedtime?",
    answer: "Oneura gives busy minds something simple and repeatable to return to: choose a sound, lower the sensory load, set a timer, and use mood reflection to notice which wind-down patterns seem to help.",
    facts: [
      {
        label: "Best for",
        value: "Racing thoughts, busy evenings, focus background, and bedtime routines"
      },
      {
        label: "Primary tools",
        value: "Soundscapes, sleep stories, timers, playlists, and mood check-ins"
      },
      {
        label: "Approach",
        value: "Less lesson-based, more immediate sensory support"
      },
      {
        label: "Safety",
        value: "Not medical advice and not a replacement for professional care"
      }
    ],
    sections: [
      {
        title: "When silence makes everything louder",
        body: "For some people, a quiet room is not relaxing. It gives thoughts more space to spin. Oneura gives the mind a softer background so bedtime can feel less abrupt.",
        bullets: [
          "Mask distracting sound with white noise, brown noise, or fans",
          "Use nature ambience when you want something less clinical",
          "Return to the same routine so sleep preparation feels familiar"
        ]
      },
      {
        title: "A wind-down without homework",
        body: "Oneura is made for people who do not always want a guided meditation or a long course. It is okay to press play and let ambience do the first part of the work.",
        bullets: [
          "Choose a sound in seconds",
          "Set a timer and step away from the screen",
          "Use mood-aware reflection when you want more context"
        ]
      },
      {
        title: "For focus as well as rest",
        body: "Busy minds often need support during the day too. Oneura can create a steady focus background for reading, study, journaling, or deep work.",
        bullets: [
          "Cafe ambience for gentle activity without interruption",
          "Noise colours for more consistent focus backgrounds",
          "Natural soundscapes for breaks and transitions"
        ]
      }
    ],
    faqs: [
      {
        question: "Is Oneura good if meditation feels difficult?",
        answer: "Oneura can be a helpful alternative when formal meditation feels like too much. You can start with sound and ambience, then add reflection when it feels useful."
      },
      {
        question: "Does Oneura treat insomnia or anxiety?",
        answer: "No. Oneura is wellness software and does not diagnose, treat, or prevent medical conditions. It can support routines, relaxation, and reflection."
      },
      {
        question: "Can I use Oneura for focus during the day?",
        answer: "Yes. Oneura includes focus-friendly ambience such as steady noise, cafe atmosphere, fan sounds, and natural soundscapes."
      }
    ],
    related: [
      {
        slug: "sensory-relaxation-app",
        title: "Sensory relaxation app",
        description: "A calmer sensory environment for decompression."
      },
      {
        slug: "neuro-friendly-sleep-app",
        title: "Neuro-friendly sleep app",
        description: "Careful, non-medical sleep support for sensory needs."
      }
    ]
  },
  "mood-tracking-sleep-app": {
    kicker: "Mood tracking sleep app",
    title: "A mood tracking sleep app for calmer wind-down routines",
    intro: "Oneura connects sleep sounds, gentle mood check-ins, and reflective insights so you can notice which evening routines feel easier to repeat.",
    image: previewOcean,
    imageAlt: "Oneura ocean ambience for sleep sounds and mood-aware wind-downs",
    answerTitle: "How does mood tracking fit into a sleep sounds app?",
    answer: "Mood tracking in Oneura is not about judging your night. It gives you a simple way to reflect on how you feel, what you listened to, and which wind-down habits may be worth repeating.",
    facts: [
      {
        label: "Best for",
        value: "Mood-aware wind-downs, routine building, sleep reflection, and calm evenings"
      },
      {
        label: "Primary tools",
        value: "Mood check-ins, calendar views, sound history, sleep sounds, and insights"
      },
      {
        label: "Tone",
        value: "Gentle reflection instead of heavy sleep scoring"
      },
      {
        label: "Care note",
        value: "Informational wellness support only, not medical or mental-health advice"
      }
    ],
    sections: [
      {
        title: "Reflect without turning bedtime into homework",
        body: "Some sleep tools become another dashboard to manage. Oneura keeps mood tracking light, so reflection supports your routine instead of making the evening feel more complicated.",
        bullets: [
          "Log how you feel with a simple mood snapshot",
          "Notice which sounds or routines seem to fit different evenings",
          "Use patterns as prompts for experimentation, not pressure"
        ]
      },
      {
        title: "Connect sound, mood, and routine",
        body: "A good wind-down is personal. Mood-aware context helps you understand whether rain, ocean, brown noise, stories, or a quieter focus background feels better for your state.",
        bullets: [
          "Pair soundscapes with mood reflection",
          "Use favourite mixes to make calmer routines easier to repeat",
          "Keep insights practical and easy to ignore when they are not useful"
        ]
      },
      {
        title: "Designed for non-medical insight",
        body: "Oneura can help you notice habits, but it does not diagnose sleep, mood, anxiety, ADHD, or any health condition. It is a wellness companion for reflection and routine.",
        bullets: [
          "Use insights as gentle observations",
          "Speak to a qualified professional for serious or persistent concerns",
          "Stay in control of what you track and how you use it"
        ]
      }
    ],
    faqs: [
      {
        question: "Is Oneura a mood tracker?",
        answer: "Oneura includes mood tracking and reflective insight features, but it is primarily a sleep sounds and sensory relaxation app."
      },
      {
        question: "Can mood tracking improve sleep?",
        answer: "Mood tracking can help some people notice patterns in routines and evenings. Oneura presents those reflections as informational wellness support, not medical advice."
      },
      {
        question: "Does Oneura score my mental health?",
        answer: "No. Oneura is designed for gentle reflection and habit awareness, not clinical scoring, diagnosis, or treatment."
      }
    ],
    related: [
      {
        slug: "sleep-app-for-busy-minds",
        title: "Sleep app for busy minds",
        description: "Low-friction wind-down support for racing thoughts."
      },
      {
        slug: "sleep-sounds-white-noise",
        title: "Sleep sounds and white noise",
        description: "Audio-first support for calmer nights."
      }
    ]
  },
  "sleep-sounds-for-focus": {
    kicker: "Sleep sounds for focus",
    title: "Focus sounds and calming ambience for busy work sessions",
    intro: "Oneura is not only for bedtime. Use cafe ambience, fans, steady noise, nature sounds, and layered soundscapes as a softer background for reading, study, and deep work.",
    image: previewCafe,
    imageAlt: "Oneura cafe ambience and focus sounds for study and work",
    answerTitle: "Can sleep sounds also help with focus?",
    answer: "Yes. Many calming sound textures also work as focus backgrounds. Oneura lets you use steady noise, cafe atmosphere, natural ambience, and gentle mixes when silence feels too empty or interruptions feel too sharp.",
    facts: [
      {
        label: "Best for",
        value: "Study, reading, writing, focus blocks, breaks, and transitions"
      },
      {
        label: "Includes",
        value: "Cafe ambience, fans, white noise, brown noise, forest, rain, and ocean sounds"
      },
      {
        label: "Use style",
        value: "Choose a background, lower distraction, and keep working"
      },
      {
        label: "Also useful for",
        value: "Evening decompression and sleep preparation"
      }
    ],
    sections: [
      {
        title: "A calmer background for focus fatigue",
        body: "When the day feels noisy, a consistent sound bed can make it easier to stay with one task. Oneura gives you backgrounds that feel calm rather than demanding.",
        bullets: [
          "Use cafe ambience when total silence feels too flat",
          "Try steady noise for a consistent focus layer",
          "Switch to nature sounds when you need a softer break"
        ]
      },
      {
        title: "From deep work to wind-down",
        body: "The same app can support both work and rest because the routine is simple: change the sound environment to match the state you want to move toward.",
        bullets: [
          "Use brighter sounds for focus blocks",
          "Use slower ambience for decompression",
          "Save favourites so the next session starts faster"
        ]
      },
      {
        title: "Focus support without productivity pressure",
        body: "Oneura is not a task manager or performance tracker. It gives you sensory support so work, study, and transitions can feel less abrasive.",
        bullets: [
          "No complicated productivity system required",
          "Helpful for reading, journaling, study, and quiet work",
          "Pairs naturally with mood-aware reflection after the session"
        ]
      }
    ],
    faqs: [
      {
        question: "Is Oneura a focus sounds app?",
        answer: "Oneura can be used as a focus sounds app, especially for cafe ambience, fan sounds, noise colours, and nature backgrounds."
      },
      {
        question: "What sounds are good for studying?",
        answer: "Many people prefer steady noise, cafe atmosphere, rain, forest ambience, or low-detail soundscapes. Oneura lets you experiment with what feels least distracting."
      },
      {
        question: "Can I use Oneura during work and at night?",
        answer: "Yes. Oneura supports focus backgrounds during the day and calming sleep sounds or stories at night."
      }
    ],
    related: [
      {
        slug: "sensory-relaxation-app",
        title: "Sensory relaxation app",
        description: "Sound and ambience for overstimulated moments."
      },
      {
        slug: "mood-tracking-sleep-app",
        title: "Mood tracking sleep app",
        description: "Reflect on which routines feel easier to repeat."
      }
    ]
  },
  "neuro-friendly-sleep-app": {
    kicker: "Neuro-friendly sleep app",
    title: "A neuro-friendly sleep app for sensory needs and busy minds",
    intro: "Oneura is designed with busy minds, sensory preferences, and gentle routines in mind, while staying careful: it supports wellness habits and does not claim to treat neurodevelopmental or medical conditions.",
    image: previewForest,
    imageAlt: "Oneura calming forest ambience for neuro-friendly wind-down routines",
    answerTitle: "What does neuro-friendly mean for Oneura?",
    answer: "For Oneura, neuro-friendly means low-friction choices, sensory-aware ambience, flexible routines, and clear language. It does not mean diagnosis, treatment, or a medical claim.",
    facts: [
      {
        label: "Best for",
        value: "Busy minds, sensory needs, overstimulation, and gentler sleep routines"
      },
      {
        label: "Neurodivergent features",
        value: "Low-stimulation layouts, sensory-safe ambience, optional haptics, no heavy sleep-scoring pressure"
      },
      {
        label: "Designed around",
        value: "Sound, visual ambience, simple flows, timers, and reflective mood tools"
      },
      {
        label: "Important note",
        value: "Not a clinical tool, therapy service, or medical device"
      }
    ],
    sections: [
      {
        title: "A calmer path into bedtime",
        body: "Neuro-friendly sleep support starts by reducing friction. Oneura aims to make the first step easy: open the app, choose an atmosphere, and let the room feel less demanding.",
        bullets: [
          "Clear sound categories instead of overwhelming menus",
          "Repeatable favourites and routines for familiar evenings",
          "Sensory ambience for people who need more than silence"
        ]
      },
      {
        title: "Designed for sensory preference, not a single correct method",
        body: "Some users settle with rain. Others prefer brown noise, a fan, cafe atmosphere, or layered ambience. Oneura treats preference as part of the routine.",
        bullets: [
          "Try different textures and save what works",
          "Use sound for sleep, breaks, focus, or transitions",
          "Keep insights reflective, practical, and easy to ignore when not needed"
        ]
      },
      {
        title: "Careful about ADHD and neurodivergent language",
        body: "Oneura can be useful for people who identify with ADHD-style busy minds or sensory needs, but the app does not diagnose ADHD, treat sleep disorders, or replace professional support.",
        bullets: [
          "Use Oneura as a wellness companion, not a treatment plan",
          "Speak to a qualified professional for persistent sleep or mental health concerns",
          "Choose the tools that fit your own body, mood, and evening"
        ]
      }
    ],
    faqs: [
      {
        question: "Is Oneura an ADHD sleep app?",
        answer: "Oneura may be helpful for people with busy minds or ADHD-style focus and wind-down challenges, but it is not an ADHD treatment and does not provide medical advice."
      },
      {
        question: "Why use the phrase neuro-friendly?",
        answer: "We use it to describe the design approach: simple choices, sensory-aware ambience, flexible routines, and no pressure to meditate perfectly."
      },
      {
        question: "Can Oneura support sensory needs?",
        answer: "Yes, Oneura is designed around soundscapes, ambience, optional haptics, and simple routines that can support sensory decompression for some users."
      }
    ],
    related: [
      {
        slug: "sleep-app-for-busy-minds",
        title: "Sleep app for busy minds",
        description: "Sleep support for racing thoughts and restless evenings."
      },
      {
        slug: "sensory-relaxation-app",
        title: "Sensory relaxation app",
        description: "Sound and ambience for overstimulated moments."
      }
    ]
  }
};
function TopicLandingPage({ content }) {
  return /* @__PURE__ */ jsxs("main", { className: "oneura-topic-container", children: [
    /* @__PURE__ */ jsxs("section", { className: "oneura-topic-hero", children: [
      /* @__PURE__ */ jsxs("div", { className: "oneura-topic-hero-copy", children: [
        /* @__PURE__ */ jsx("p", { className: "section-eyebrow", children: content.kicker }),
        /* @__PURE__ */ jsx("h1", { children: content.title }),
        /* @__PURE__ */ jsx("p", { children: content.intro }),
        /* @__PURE__ */ jsxs("div", { className: "oneura-topic-actions", "aria-label": "Download Oneura", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: googlePlayUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": "Download Oneura on Google Play",
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: googlePlay,
                  alt: "Get it on Google Play",
                  className: "store-badge"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: appStoreUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": "Download Oneura on the App Store",
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: appStore,
                  alt: "Download on the App Store",
                  className: "store-badge"
                }
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "oneura-topic-hero-media", children: /* @__PURE__ */ jsx("img", { src: content.image, alt: content.imageAlt }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "oneura-topic-answer", "aria-labelledby": "topic-answer", children: [
      /* @__PURE__ */ jsxs("div", { className: "oneura-topic-narrow", children: [
        /* @__PURE__ */ jsx("p", { className: "section-eyebrow", children: "Quick answer" }),
        /* @__PURE__ */ jsx("h2", { id: "topic-answer", children: content.answerTitle }),
        /* @__PURE__ */ jsx("p", { children: content.answer })
      ] }),
      /* @__PURE__ */ jsx("dl", { className: "oneura-topic-facts", children: content.facts.map((fact) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("dt", { children: fact.label }),
        /* @__PURE__ */ jsx("dd", { children: fact.value })
      ] }, fact.label)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "oneura-topic-sections", children: content.sections.map((section) => /* @__PURE__ */ jsxs("article", { className: "oneura-topic-section-card", children: [
      /* @__PURE__ */ jsx("h2", { children: section.title }),
      /* @__PURE__ */ jsx("p", { children: section.body }),
      /* @__PURE__ */ jsx("ul", { children: section.bullets.map((bullet) => /* @__PURE__ */ jsx("li", { children: bullet }, bullet)) })
    ] }, section.title)) }),
    /* @__PURE__ */ jsxs("section", { className: "oneura-topic-faq", "aria-labelledby": "topic-faq", children: [
      /* @__PURE__ */ jsxs("div", { className: "oneura-topic-narrow", children: [
        /* @__PURE__ */ jsx("p", { className: "section-eyebrow", children: "FAQ" }),
        /* @__PURE__ */ jsx("h2", { id: "topic-faq", children: "Questions people ask" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "oneura-topic-faq-grid", children: content.faqs.map((faq) => /* @__PURE__ */ jsxs("article", { className: "oneura-topic-faq-item", children: [
        /* @__PURE__ */ jsx("h3", { children: faq.question }),
        /* @__PURE__ */ jsx("p", { children: faq.answer })
      ] }, faq.question)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "oneura-topic-related", "aria-labelledby": "related-topics", children: [
      /* @__PURE__ */ jsxs("div", { className: "oneura-topic-narrow", children: [
        /* @__PURE__ */ jsx("p", { className: "section-eyebrow", children: "Related Oneura guides" }),
        /* @__PURE__ */ jsx("h2", { id: "related-topics", children: "Keep exploring" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "oneura-topic-related-grid", children: content.related.map((topic) => /* @__PURE__ */ jsxs(
        Link,
        {
          className: "oneura-topic-related-card",
          to: oneuraPagePath(topic.slug),
          children: [
            /* @__PURE__ */ jsx("h3", { children: topic.title }),
            /* @__PURE__ */ jsx("p", { children: topic.description })
          ]
        },
        topic.slug
      )) })
    ] })
  ] });
}
const SleepSoundsWhiteNoisePage = () => /* @__PURE__ */ jsx(TopicLandingPage, { content: contentBySlug["sleep-sounds-white-noise"] });
const SensoryRelaxationAppPage = () => /* @__PURE__ */ jsx(TopicLandingPage, { content: contentBySlug["sensory-relaxation-app"] });
const SleepAppForBusyMindsPage = () => /* @__PURE__ */ jsx(TopicLandingPage, { content: contentBySlug["sleep-app-for-busy-minds"] });
const NeuroFriendlySleepAppPage = () => /* @__PURE__ */ jsx(TopicLandingPage, { content: contentBySlug["neuro-friendly-sleep-app"] });
const MoodTrackingSleepAppPage = () => /* @__PURE__ */ jsx(TopicLandingPage, { content: contentBySlug["mood-tracking-sleep-app"] });
const SleepSoundsForFocusPage = () => /* @__PURE__ */ jsx(TopicLandingPage, { content: contentBySlug["sleep-sounds-for-focus"] });
const OneuraProductSiteRoutes = () => /* @__PURE__ */ jsxs(Routes, { children: [
  /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(OneuraHome, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(OneuraAbout, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/subscription", element: /* @__PURE__ */ jsx(OneuraSubscription, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/privacy-policy", element: /* @__PURE__ */ jsx(OneuraPrivacyPolicy, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/terms-and-conditions", element: /* @__PURE__ */ jsx(OneuraTermsAndConditions, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/cookie-policy", element: /* @__PURE__ */ jsx(OneuraCookiePolicy, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/delete-data", element: /* @__PURE__ */ jsx(OneuraDeleteData, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/sleep-sounds-white-noise", element: /* @__PURE__ */ jsx(SleepSoundsWhiteNoisePage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/sensory-relaxation-app", element: /* @__PURE__ */ jsx(SensoryRelaxationAppPage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/sleep-app-for-busy-minds", element: /* @__PURE__ */ jsx(SleepAppForBusyMindsPage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/neuro-friendly-sleep-app", element: /* @__PURE__ */ jsx(NeuroFriendlySleepAppPage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/mood-tracking-sleep-app", element: /* @__PURE__ */ jsx(MoodTrackingSleepAppPage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/sleep-sounds-for-focus", element: /* @__PURE__ */ jsx(SleepSoundsForFocusPage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
] });
function renderOneuraRoute(pathname) {
  globalThis.__ONEURA_PRERENDER__ = true;
  return renderToString(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(MemoryRouter, { initialEntries: [pathname], children: /* @__PURE__ */ jsxs("div", { className: "site-shell oneura-site", children: [
      /* @__PURE__ */ jsx(OneuraNavbar, {}),
      /* @__PURE__ */ jsx("div", { className: "page-container", children: /* @__PURE__ */ jsx(OneuraProductSiteRoutes, {}) }),
      /* @__PURE__ */ jsx(OneuraFooter, {}),
      /* @__PURE__ */ jsx(CookieConsent, {})
    ] }) }) })
  );
}
export {
  renderOneuraRoute
};
