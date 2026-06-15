# Oneura website - structure, schema & content review pack

**Domain:** https://oneura.app  
**Publisher:** Strato-Craft Ltd  
**Generated from:** `dist-oneura/` build output + source (`src/pages/oneura/`, `scripts/prep-oneura-dist.mjs`)  
**Purpose:** Share with SEO / AEO / GEO / content reviewers.

---

## 1. Technical overview

| Item | Value |
|------|--------|
| Stack | React + Vite SPA, **prerendered** HTML per route for crawlers |
| Primary locale | `en-GB` (`<html lang="en-GB">`) |
| Hosting output | `dist-oneura/` → Firebase Hosting on `oneura.app` |
| Crawl policy | `robots.txt` - `User-agent: *` / `Allow: /` (does **not** block AI bots) |
| Sitemap | https://oneura.app/sitemap.xml (12 URLs) |
| AEO helper | https://oneura.app/llms.txt (LLM-oriented site summary) |
| Font | Comfortaa (Google Fonts) |

**Store links (sitewide):**

- Google Play: https://play.google.com/store/apps/details?id=com.stratocraft.oneura  
- App Store: https://apps.apple.com/app/oneura/id6754253306  

**Support (external):** https://strato-craft.com/support  
**Company site:** https://strato-craft.com  

---

## 2. Site map (all public URLs)

| URL | Priority | Title (meta) | Meta description |
|-----|----------|--------------|------------------|
| `/` | 1.0 | Oneura \| Sleep Sounds, Sensory Relaxation & Wind-Down App | Oneura is an iOS and Android sleep sounds and sensory relaxation app for white noise, calming ambience, busy minds, mood tracking, and wind-down routines. |
| `/about` | 0.8 | About Oneura \| Sleep Sounds, Mood Tracking & Wellness App | Learn how Oneura supports relaxation, sleep, focus, mood tracking, sleep stories, and optional wearable-informed wellness insights. |
| `/sleep-sounds-white-noise` | 0.8 | Sleep Sounds & White Noise App \| Oneura for Calmer Nights | Use Oneura for sleep sounds, white noise, brown noise, rain, ocean waves, forest ambience, sleep stories, timers, and calmer wind-down routines. |
| `/sensory-relaxation-app` | 0.8 | Sensory Relaxation App \| Oneura for Overstimulation & Calm | Oneura is a sensory relaxation app for overstimulated moments, with calming soundscapes, ambience, optional haptics, and simple wind-down routines. |
| `/sleep-app-for-busy-minds` | 0.8 | Sleep App for Busy Minds \| Oneura Wind-Down Sounds | Oneura helps busy minds wind down with sleep sounds, white noise, sleep stories, sensory ambience, mood reflection, and low-friction bedtime routines. |
| `/neuro-friendly-sleep-app` | 0.8 | Neuro-Friendly Sleep App \| Oneura for Sensory Wind-Downs | Oneura is designed with busy minds and sensory needs in mind, offering non-medical sleep sounds, ambience, mood reflection, and gentle routines. |
| `/mood-tracking-sleep-app` | 0.7 | Mood Tracking Sleep App \| Oneura Wind-Down Reflection | Oneura combines mood tracking, sleep sounds, white noise, gentle insights, and wind-down routines to help you reflect without heavy sleep scoring. |
| `/sleep-sounds-for-focus` | 0.7 | Sleep Sounds for Focus \| Oneura Study & Work Ambience | Use Oneura focus sounds, cafe ambience, fans, steady noise, nature soundscapes, and calming audio for study, work, breaks, and transitions. |
| `/subscription` | 0.7 | Oneura Plus Pricing \| Premium Sleep Sounds & Unlimited Listening | Compare Oneura Free and Oneura Plus, including unlimited listening, premium sleep sounds, stories, ad-free use, and lifetime access. |
| `/privacy-policy` | 0.4 | Oneura Privacy Policy \| Strato-Craft Ltd | Read how Oneura and Strato-Craft Ltd collect, use, protect, and delete personal information for the Oneura app and website. |
| `/terms-and-conditions` | 0.4 | Oneura Terms & Conditions \| Strato-Craft Ltd | Read the terms that govern use of the Oneura app, Oneura Plus, subscriptions, wellness content, and related services. |
| `/cookie-policy` | 0.3 | Oneura Cookie Policy \| Website Cookies & Analytics | Learn how Oneura uses cookies, analytics, and similar technologies on the website and in related services. |
| `/delete-data` | 0.3 | Delete Oneura Data \| Account & Privacy Requests | Find out how to delete your Oneura account data, request privacy support, and cancel app store subscriptions separately. |

Each route is emitted as both `/slug/index.html` and `/slug.html` (duplicate URL pattern - canonical tags point to clean paths).

---

## 3. robots.txt

```
User-agent: *
Allow: /

Sitemap: https://oneura.app/sitemap.xml
```

---

## 4. JSON-LD schema (`@graph` on every prerendered page)

The same structured-data graph is embedded in `<head>` on all routes (from `oneura.html`). Per-page `<title>`, `canonical`, and Open Graph URLs are swapped per route; **schema body is currently shared site-wide**.

### 4.1 Organization

```json
{
  "@type": "Organization",
  "@id": "https://strato-craft.com/#organization",
  "name": "Strato-Craft Ltd",
  "url": "https://strato-craft.com",
  "logo": "https://oneura.app/android-chrome-512x512.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "support@strato-craft.com",
    "contactType": "customer support",
    "availableLanguage": "en"
  }
}
```

### 4.2 WebSite

```json
{
  "@type": "WebSite",
  "@id": "https://oneura.app/#website",
  "name": "Oneura",
  "url": "https://oneura.app/",
  "publisher": { "@id": "https://strato-craft.com/#organization" },
  "inLanguage": "en-GB"
}
```

### 4.3 MobileApplication

```json
{
  "@type": "MobileApplication",
  "@id": "https://oneura.app/#app",
  "name": "Oneura",
  "alternateName": "Oneura - Relax, Sleep & Focus",
  "description": "Oneura is a sleep sounds and sensory relaxation app for white noise, calming ambience, busy minds, mood tracking, and gentle wind-down insights.",
  "url": "https://oneura.app/",
  "image": "https://oneura.app/oneura-og.png",
  "applicationCategory": "HealthApplication",
  "applicationSubCategory": "Sleep, relaxation, mindfulness, mood tracking",
  "operatingSystem": "Android, iOS",
  "publisher": { "@id": "https://strato-craft.com/#organization" },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "GBP",
    "description": "Free download with optional Oneura Plus subscription and lifetime purchase."
  },
  "featureList": [
    "Sleep sounds and calming soundscapes",
    "White, pink, brown, and green noise",
    "Rain, ocean, forest, stream, fan, cafe, and meditation ambience",
    "Sensory relaxation and neuro-friendly wind-down routines",
    "Sleep stories and wind-down audio",
    "Mood tracking and reflective insights",
    "Sleep timers, playlists, favourites, and layered mixes",
    "Optional health and wearable-informed sleep context"
  ],
  "downloadUrl": [
    "https://play.google.com/store/apps/details?id=com.stratocraft.oneura",
    "https://apps.apple.com/app/oneura/id6754253306"
  ],
  "sameAs": [
    "https://play.google.com/store/apps/details?id=com.stratocraft.oneura",
    "https://apps.apple.com/app/oneura/id6754253306"
  ],
  "review": [ /* 3 reviews - see §6 */ ]
}
```

### 4.4 FAQPage (schema - home-oriented)

```json
{
  "@type": "FAQPage",
  "@id": "https://oneura.app/#faq",
  "mainEntity": [
    {
      "name": "What is Oneura?",
      "acceptedAnswer": "Oneura is an iOS and Android sleep sounds and sensory relaxation app for white noise, calming ambience, busy minds, mood tracking, sleep stories, and gentle wind-down insights."
    },
    {
      "name": "Is Oneura free?",
      "acceptedAnswer": "Oneura is free to download with a free listening tier. Oneura Plus adds unlimited listening, premium sounds, premium stories, ad-free use, and advanced playlists."
    },
    {
      "name": "What sounds are included in Oneura?",
      "acceptedAnswer": "Oneura includes rain, ocean waves, forest ambience, streams, fans, cafe ambience, chimes, meditation beds, space ambience, traffic cues, and white, pink, brown, and green noise."
    },
    {
      "name": "Does Oneura provide medical advice?",
      "acceptedAnswer": "No. Oneura is wellness software, not a medical device. Its insights are informational and reflective, and serious or persistent health concerns should be discussed with a qualified professional."
    }
  ]
}
```

**Reviewer note:** Visible home FAQ copy uses slightly different question wording (e.g. “Is Oneura a free sleep app?” vs schema “Is Oneura free?”). Topic pages have **additional** on-page FAQs not reflected in this global FAQPage block.

---

## 5. HTML document shell (all pages)

```html
<!DOCTYPE html>
<html lang="en-GB">
  <head>
    <!-- charset, viewport -->
    <!-- title, meta title/description/keywords/author -->
    <!-- robots: index, follow, max-image-preview:large -->
    <!-- theme-color, application-name, apple-itunes-app -->
    <!-- canonical (per-route) -->
    <!-- favicons, manifest, Comfortaa font -->
    <!-- Open Graph + Twitter Card (per-route title/url) -->
    <!-- application/ld+json @graph (§4) -->
    <!-- Vite JS + CSS bundles -->
  </head>
  <body>
    <div id="root">
      <div class="site-shell oneura-site">
        <nav class="navbar oneura-navbar">…</nav>
        <div class="page-container">
          <!-- route-specific <main> content (prerendered) -->
        </div>
        <!-- CookieConsent (client) -->
      </div>
    </div>
  </body>
</html>
```

### Global chrome (navbar)

- Logo → Home (`/`)
- Links: Home, About, Subscription, Support (external), Strato-Craft ↗ (external)
- **Note:** Navbar contains `<h1>Oneura</h1>` on every page - home also has its own `<h1 id="oneura-home-title">` (duplicate H1 on homepage).

---

## 6. Homepage HTML structure & copy (`/`)

```
<main class="oneura-home-container">

  <section class="oneura-hero">
    H1: Oneura sleep sounds, sensory relaxation, and mood-aware wind-downs
    Kicker: Sleep sounds app for iOS and Android
    Body: Build calmer evenings with relaxing soundscapes, sleep stories…
    [Google Play] [App Store]
    CTA link: Explore Oneura → /about
  </section>

  <section class="answer-summary">
    H2: What is Oneura?
    Eyebrow: Quick answer
    Body: Oneura is a mobile sleep sounds and sensory relaxation app from Strato-Craft Ltd…
    <dl class="answer-facts">
      Best for | Sleep, sensory relaxation, focus, overstimulation, wind-down routines
      Platforms | iOS and Android
      Price | Free download with optional Plus upgrade
      Publisher | Strato-Craft Ltd
    </dl>
  </section>

  <section class="positioning-section">
    Eyebrow: Built for busy, overstimulated minds
    H2: Sleep support when switching off does not feel simple
    Body: …racing thoughts, sensory overload, focus fatigue…
  </section>

  <section class="topic-cluster-section">
    H2: Sleep sounds, sensory calm, and neuro-friendly wind-downs
    Grid of 6 internal links → topic landing pages (see §7)
  </section>

  <section class="sound-category-section">
    H2: Calming sounds for sleep, focus, and rest
    <ul> Rain and storms | Ocean waves | Forest ambience | Streams and water |
         White, pink, brown, and green noise | Fans and steady air |
         Cafe atmosphere | Meditation and tonal beds
    </ul>
  </section>

  <section class="app-preview">
    H2: Immersive soundscapes and visual moments
    3 cards: Sleep and relaxation | Sound library and ambience | Mindfulness and focus
  </section>

  <section class="features-section">
    H2: Key features
    Sleep timer | Layered playlists | Mood tracking | Oneura Plus
  </section>

  <section class="proof-section">
    Eyebrow: Early proof
    H2: Trusted by people building calmer routines
    Stats: 5,000+ installs | 5.0 Google Play | 5.0 App Store | iOS + Android
    3 user review cards (Ana L., Jessica F., Vika S.)
  </section>

  <section class="oneura-faq">
    H2: Questions people ask about Oneura
    FAQ 1: What is Oneura?
    FAQ 2: Is Oneura a free sleep app?
    FAQ 3: Can Oneura help with focus as well as sleep?
    FAQ 4: Does Oneura give medical advice?
  </section>

  <section class="download-cta-section">
    H2: Download Oneura free on iOS and Android
    [Google Play] [App Store]
  </section>

  <footer class="footer">
    Links: About, Subscription, 6 topic pages, Privacy, Terms, Cookies, Support, Delete My Data
  </footer>

</main>
```

### Homepage meta keywords (head)

`Oneura, sleep sounds app, white noise app, sensory relaxation app, sleep app for busy minds, neuro-friendly sleep app, relaxation app, mood tracker, wind-down app, sleep stories, ambient sounds, rain sounds, ocean sounds, forest sounds, focus sounds, overstimulation app`

### Embedded reviews (schema + visible)

| Author | Source | Date (schema) | Rating | Quote (abridged) |
|--------|--------|---------------|--------|------------------|
| Ana L. | Google Play | 2026-05-20 | 5 | Mindfulness in one place; watch insights; sleeping better |
| Jessica F. | Google Play | 2026-05-10 | 5 | Not too busy; huge variety; free features better than other apps |
| Vika S. | App Store | 2026-02-17 | 5 | Real relaxation. Thanks for the app. |

---

## 7. Topic landing pages (shared template)

Each topic URL uses `TopicLandingPage` with unique copy in `contentBySlug`. Typical structure:

```
<main class="topic-landing">
  Hero: kicker, H1 title, intro, hero image, store badges
  Quick answer: H2 answerTitle + answer paragraph
  Facts grid (4 items: Best for, Includes, Platforms, Positioning)
  2–3 content sections (H2 + body + bullet list)
  Topic-specific FAQ block (2–4 Q&As)
  Related topics (links to other slugs)
  Download CTA + footer links
</main>
```

| Slug | H1 (page title theme) |
|------|------------------------|
| `sleep-sounds-white-noise` | Oneura is a sleep sounds app for calmer nights |
| `sensory-relaxation-app` | (sensory / overstimulation positioning) |
| `sleep-app-for-busy-minds` | (busy minds / racing thoughts) |
| `neuro-friendly-sleep-app` | (non-medical, sensory needs) |
| `mood-tracking-sleep-app` | (mood + sleep reflection) |
| `sleep-sounds-for-focus` | (study / work ambience) |

Full long-form copy lives in `src/pages/oneura/topics/TopicLandingPage.tsx` (`contentBySlug`).

---

## 8. Other key pages (summary)

### `/about`

Product-focused sections (no founder story): Better Sleep & Deep Relaxation; Smart sleep insights & wearables; Immersive Sound Library; Mood tracking; Oneura Plus; store badges. **No dedicated founder / team narrative.**

### `/subscription`

Oneura Free vs Oneura Plus comparison, pricing positioning, feature lists, store download CTAs.

### Legal

- `/privacy-policy` - Strato-Craft Ltd, data collection, health/wearable context, retention, rights  
- `/terms-and-conditions` - wellness disclaimer, subscriptions, arbitration (UK-oriented)  
- `/cookie-policy` - website cookies / analytics  
- `/delete-data` - account deletion and privacy requests  

---

## 9. llms.txt (AEO / GEO summary file)

Published at https://oneura.app/llms.txt - markdown summary with key facts, features, important URLs, store links, and medical positioning (“wellness software only; not medical advice”).

---

## 10. Open Graph / social defaults

| Property | Home value |
|----------|------------|
| og:type | website |
| og:image | https://oneura.app/oneura-og.png (1200×630) |
| og:locale | en_GB |
| twitter:card | summary_large_image |

---

## 11. Known gaps / review flags (updated after SEO pass)

1. ~~**Duplicate H1**~~ - Navbar brand is now `<span class="brand-name">`; one H1 per page content.  
2. ~~**FAQ schema vs visible FAQ**~~ - Home JSON-LD matches visible FAQ copy; topic pages get per-slug `FAQPage` at build time.  
3. ~~**Global schema on all routes**~~ - `prep-oneura-dist.mjs` injects route-specific `FAQPage` + `WebPage`; shared `Organization` / `MobileApplication` only.  
4. ~~**No founder story**~~ - “Why we built Oneura” section on `/about`.  
5. **Authority / backlinks:** External signal issue; not fixable in HTML alone.  
6. **`sameAs`:** Facebook + Instagram + stores (+ Strato-Craft on Organization).  
7. **Prerender + SPA:** Body HTML is in initial response; JS hydrates for interactions (cookie banner, routing).  
8. **Duplicate URL files** (`/slug.html` + `/slug/index.html`) still emitted; canonicals protect SEO.  

---

## 12. Source file reference

| Asset | Path |
|-------|------|
| Home React | `src/pages/oneura/home/OneuraHome.tsx` |
| Home styles | `src/pages/oneura/home/OneuraHome.css` |
| Topics | `src/pages/oneura/topics/TopicLandingPage.tsx` |
| About | `src/pages/oneura/about/About.tsx` |
| Head + JSON-LD template | `oneura.html` |
| Build / sitemap / llms.txt | `scripts/prep-oneura-dist.mjs` |
| Deployed output | `dist-oneura/` |

---

*End of review pack.*
