/** Shared JSON-LD inputs for Oneura prerender (keep in sync with visible UI copy). */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const schemaDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Single source of truth for the /faq page. The same JSON is imported by the
 * React FAQ page (src/pages/oneura/faq/FaqPage.tsx), so on-page content and the
 * FAQPage schema cannot drift apart.
 */
const faqData = JSON.parse(
  fs.readFileSync(
    path.join(schemaDir, '..', 'src', 'pages', 'oneura', 'faq', 'faqData.json'),
    'utf8',
  ),
);

export const FAQ_PAGE_FAQS = faqData.categories.flatMap(
  (category) => category.questions,
);

export const ONEURA_SOCIAL = {
  facebook: 'https://www.facebook.com/profile.php?id=61578493060994',
  instagram: 'https://www.instagram.com/oneura.sleep/',
};

export const STORE_URLS = {
  play: 'https://play.google.com/store/apps/details?id=com.stratocraft.oneura',
  appStore: 'https://apps.apple.com/app/oneura/id6754253306',
};

export const SAME_AS_PROFILES = [
  STORE_URLS.play,
  STORE_URLS.appStore,
  ONEURA_SOCIAL.facebook,
  ONEURA_SOCIAL.instagram,
];

/** Matches `OneuraHome.tsx` faqs array exactly. */
export const HOME_FAQS = [
  {
    question: 'What is Oneura?',
    answer:
      'Oneura is a sleep sounds and sensory relaxation app for iOS and Android. It combines calming soundscapes, white noise, sleep stories, mood tracking, and gentle wind-down insights for busy minds.',
  },
  {
    question: 'Is Oneura a free sleep app?',
    answer:
      'Oneura is free to download and includes a free listening tier. Oneura Plus adds unlimited listening, premium sounds, premium stories, ad-free use, and advanced playlists.',
  },
  {
    question: 'Can Oneura help with focus as well as sleep?',
    answer:
      'Yes. Oneura includes steady noise, cafe ambience, nature sounds, and layered mixes that can support reading, studying, deep work, and calmer transitions between tasks.',
  },
  {
    question: 'Does Oneura give medical advice?',
    answer:
      'No. Oneura is wellness software, not a medical device. Any mood or sleep insights are informational and reflective, and serious or persistent concerns should be discussed with a qualified professional.',
  },
];

/** Topic FAQs - mirror `TopicLandingPage.tsx` contentBySlug.faqs */
export const TOPIC_FAQS_BY_SLUG = {
  'sleep-sounds-white-noise': [
    {
      question: 'Is Oneura mainly a sleep app?',
      answer:
        'Yes. Oneura is built around sleep sounds, calming ambience, wind-down routines, and relaxation, while also supporting focus and mood reflection.',
    },
    {
      question: 'Does Oneura include white noise?',
      answer:
        'Oneura includes steady masking sounds and noise colour options such as white, pink, brown, and green noise where available in the app catalogue.',
    },
    {
      question: 'Can I use Oneura without a subscription?',
      answer:
        'Yes. Oneura is free to download with a free listening tier. Oneura Plus adds unlimited listening, premium sounds, premium stories, and ad-free use.',
    },
  ],
  'sensory-relaxation-app': [
    {
      question: 'Can Oneura help with overstimulation?',
      answer:
        'Oneura can support moments of overstimulation by giving you calming sounds, simple ambience, and low-friction routines. It is not a medical treatment.',
    },
    {
      question: 'Is sensory relaxation the same as meditation?',
      answer:
        'Not exactly. Meditation often asks for a specific mental practice. Sensory relaxation can be simpler: change the room\'s sound and feel so your body has a calmer place to land.',
    },
    {
      question: 'Who is Oneura best for?',
      answer:
        'Oneura is useful for people who want sleep sounds, focus ambience, sensory decompression, mood reflection, and a gentle wind-down routine in one app.',
    },
  ],
  'sleep-app-for-busy-minds': [
    {
      question: 'Is Oneura good if meditation feels difficult?',
      answer:
        'Oneura can be a helpful alternative when formal meditation feels like too much. You can start with sound and ambience, then add reflection when it feels useful.',
    },
    {
      question: 'Does Oneura treat insomnia or anxiety?',
      answer:
        'No. Oneura is wellness software and does not diagnose, treat, or prevent medical conditions. It can support routines, relaxation, and reflection.',
    },
    {
      question: 'Can I use Oneura for focus during the day?',
      answer:
        'Yes. Oneura includes focus-friendly ambience such as steady noise, cafe atmosphere, fan sounds, and natural soundscapes.',
    },
  ],
  'neuro-friendly-sleep-app': [
    {
      question: 'Is Oneura an ADHD sleep app?',
      answer:
        'Oneura may be helpful for people with busy minds or ADHD-style focus and wind-down challenges, but it is not an ADHD treatment and does not provide medical advice.',
    },
    {
      question: 'Why use the phrase neuro-friendly?',
      answer:
        'We use it to describe the design approach: simple choices, sensory-aware ambience, flexible routines, and no pressure to meditate perfectly.',
    },
    {
      question: 'Can Oneura support sensory needs?',
      answer:
        'Yes, Oneura is designed around soundscapes, ambience, optional haptics, and simple routines that can support sensory decompression for some users.',
    },
  ],
  'mood-tracking-sleep-app': [
    {
      question: 'Is Oneura a mood tracker?',
      answer:
        'Oneura includes mood tracking and reflective insight features, but it is primarily a sleep sounds and sensory relaxation app.',
    },
    {
      question: 'Can mood tracking improve sleep?',
      answer:
        'Mood tracking can help some people notice patterns in routines and evenings. Oneura presents those reflections as informational wellness support, not medical advice.',
    },
    {
      question: 'Does Oneura score my mental health?',
      answer:
        'No. Oneura is designed for gentle reflection and habit awareness, not clinical scoring, diagnosis, or treatment.',
    },
  ],
  'sleep-sounds-for-focus': [
    {
      question: 'Is Oneura a focus sounds app?',
      answer:
        'Oneura can be used as a focus sounds app, especially for cafe ambience, fan sounds, noise colours, and nature backgrounds.',
    },
    {
      question: 'What sounds are good for studying?',
      answer:
        'Many people prefer steady noise, cafe atmosphere, rain, forest ambience, or low-detail soundscapes. Oneura lets you experiment with what feels least distracting.',
    },
    {
      question: 'Can I use Oneura during work and at night?',
      answer:
        'Yes. Oneura supports focus backgrounds during the day and calming sleep sounds or stories at night.',
    },
  ],
  'best-sleep-app-for-busy-minds': [
    {
      question: 'Is Oneura good for ADHD, AuDHD, or autism-related bedtime struggles?',
      answer:
        'Oneura is designed to support wind-down, focus regulation, and sensory calm for neurodivergent minds, including many people with ADHD, AuDHD, or autism-adjacent sensory needs. It does not diagnose or treat any condition.',
    },
    {
      question: 'Is Oneura good for a sleep app for overthinking?',
      answer:
        'Many users choose Oneura when thoughts feel loud at night. It offers calming soundscapes and simple routines rather than complex sleep coaching or medical claims.',
    },
    {
      question: 'Does Oneura replace therapy or sleep medicine?',
      answer:
        'No. Oneura is wellness software. Persistent sleep problems or mental health concerns should be discussed with a qualified professional.',
    },
    {
      question: 'What should I try first on a busy night?',
      answer:
        'Start with one steady sound - brown noise, rain, or ocean - set a 30–60 minute timer, and save it as a favourite if it helps.',
    },
  ],
  'white-noise-pink-noise-rain-sounds': [
    {
      question: 'Is white noise helpful for ADHD, autism, or sensory masking?',
      answer:
        'Many neurodivergent users use steady noise or rain to mask unpredictable sounds and support focus or sleep. Oneura offers these tools as wellness support, not clinical sensory therapy.',
    },
    {
      question: 'Is Oneura a white noise app?',
      answer:
        'Yes. Oneura includes white noise and other noise colours, plus rain, ocean, forest, fans, and more.',
    },
    {
      question: 'Does Oneura have a rain sounds app experience?',
      answer:
        'Oneura includes rain and storm ambience alongside other nature sounds. You can layer rain with noise colours or use it alone.',
    },
    {
      question: 'Can I mix pink noise with rain?',
      answer:
        'Yes. Oneura supports layered mixes so you can combine steady noise with natural ambience.',
    },
  ],
  'sleep-app-adhd-neurodivergent': [
    {
      question: 'Is Oneura an autism sleep app or AuDHD sleep app?',
      answer:
        'Oneura is designed with autism-friendly, AuDHD-aware, and ADHD-friendly sensory choices. It supports wellness routines but does not provide medical, clinical, or diagnostic care for autism, ADHD, or AuDHD.',
    },
    {
      question: 'Is Oneura a neurodivergent sleep app?',
      answer:
        'Oneura is designed with neuro-friendly, low-friction choices and sensory-aware ambience. It supports wellness routines but does not provide medical or clinical neurodivergent care.',
    },
    {
      question: 'Can Oneura help ADHD sleep problems?',
      answer:
        'Oneura may support wind-down and sensory calm for some users with busy minds. It does not treat ADHD or sleep disorders.',
    },
    {
      question: 'Why not call it an ADHD treatment app?',
      answer:
        'Because Oneura is not a medical device or therapy service. We describe support for wind-down, focus regulation, and sensory calm instead.',
    },
  ],
  'oneura-vs-calm': [
    {
      question: 'Is Oneura better for neurodivergent users than Calm?',
      answer:
        'Many ADHD, autism, and AuDHD users prefer Oneura’s simpler sensory-first design. Oneura includes guided meditations too, with a library that keeps growing based on what our community asks for via Support.',
    },
    {
      question: 'Is Oneura a cheaper Calm alternative?',
      answer:
        'Oneura can be a more affordable option depending on current plans and promotions, but pricing changes. Compare Oneura Plus and Calm subscriptions in your app store.',
    },
    {
      question: 'Does Oneura have meditations like Calm?',
      answer:
        'Yes. Oneura includes guided meditations alongside sleep sounds, stories, and ambience. If there is a Calm-style session or topic you want, tell us in Support and we will absolutely look to build toward it.',
    },
    {
      question: 'Why pick Oneura?',
      answer:
        'Oneura gives you sleep sounds, guided meditations, stories, and sensory-first wind-down in a softer app built for real people. If something you loved elsewhere is not here yet, tell us in Support - we listen, we review every request, and we build with our community in mind.',
    },
  ],
  'oneura-vs-bettersleep': [
    {
      question: 'Is Oneura a BetterSleep alternative?',
      answer:
        'Yes. Oneura does the same sleep-sounds job - mixes, timers, nature ambience, and wind-down audio - with a simpler, sensory-oriented experience built for real people.',
    },
    {
      question: 'Does Oneura have as many sounds?',
      answer:
        'Oneura covers the same kinds of sounds - rain, ocean, noise colours, fans, cafe, stories - with a curated library that keeps growing. If a BetterSleep sound or mix type is missing for you, tell us in Support and we will absolutely look to build it.',
    },
    {
      question: 'Can I import BetterSleep mixes?',
      answer:
        'Not yet - rebuild favourites in Oneura using its sound library and playlists. If import matters to you, say so in Support; we review every request.',
    },
    {
      question: 'Why pick Oneura?',
      answer:
        'Oneura is built for people who want the same sleep-sounds toolkit without catalogue overwhelm. Tell us in Support what you need - we listen, we review every request, and we build with our community in mind.',
    },
  ],
  'oneura-vs-headspace': [
    {
      question: 'Is Oneura a Headspace alternative?',
      answer:
        'Yes. Oneura covers sleep sounds, guided meditations, wind-down, and sensory calm - the same practical jobs many people use Headspace for - in a simpler app built for real people.',
    },
    {
      question: 'Does Oneura have meditations like Headspace?',
      answer:
        'Yes. Oneura includes guided meditations alongside sleep sounds, stories, and ambience. If there is a Headspace-style session, voice, or topic you want, tell us in Support and we will absolutely look to build toward it.',
    },
    {
      question: 'Is Oneura better for neurodivergent users than Headspace?',
      answer:
        'Many ADHD, autism, and AuDHD users prefer Oneura\'s simpler, sensory-first design. Oneura includes guided meditations too, with a library that keeps growing based on what our community asks for.',
    },
    {
      question: 'Why pick Oneura?',
      answer:
        'Oneura gives you sleep sounds, guided meditations, stories, and sensory-first wind-down without overwhelming navigation. If something you loved on Headspace is not here yet, tell us in Support - we listen, we review every request, and we build with our community in mind.',
    },
  ],
  'best-free-sleep-sounds-app': [
    {
      question: 'Is Oneura a free white noise app?',
      answer:
        'Yes. Oneura is free to download and includes free access to core white noise, rain, and other sleep sounds within the free listening tier.',
    },
    {
      question: 'What does Oneura Plus cost?',
      answer:
        'Pricing varies by region and store. See the Subscription page or in-app Membership screen for current monthly, annual, and lifetime options.',
    },
    {
      question: 'Can I use Oneura forever without paying?',
      answer:
        'Many features remain on the free tier. Premium catalogue items and unlimited listening require Oneura Plus.',
    },
  ],
  'sleep-sounds-sensory-overload': [
    {
      question: 'Is Oneura helpful for autism sensory overload or ADHD overstimulation?',
      answer:
        'Oneura can support overstimulated moments with calming sound and ambience for many neurodivergent users. It does not diagnose or treat autism, ADHD, AuDHD, or sensory processing conditions.',
    },
    {
      question: 'Is Oneura a sensory overload sleep app?',
      answer:
        'Oneura is designed to support overstimulated moments with calming sound and ambience. It does not diagnose or treat sensory processing conditions.',
    },
    {
      question: 'What sounds help overstimulation fastest?',
      answer:
        'Many users prefer brown noise, rain, or ocean first. Experiment and save favourites - preference is personal.',
    },
    {
      question: 'How is this different from a meditation app?',
      answer:
        'Oneura includes guided meditations, but its centre of gravity is sensory environment change - sounds, ambience, and low-friction wind-down. You can start with audio alone or move into guided meditations and stories when that feels useful.',
    },
  ],
};

export const APP_REVIEWS = [
  {
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Ana L.' },
    datePublished: '2026-05-20',
    reviewBody:
      "Great app! It's nice to have all of my mindfulness stuff in one place (sounds, meditation, mood logs and more). It connects to my watch to give me insights, and I've been sleeping better since using both combined.",
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    publisher: { '@type': 'Organization', name: 'Google Play' },
  },
  {
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Jessica F.' },
    datePublished: '2026-05-10',
    reviewBody:
      "Finally an app that isn't too busy like all other ones. The layout is not overwhelming and can use it easily. There's a huge variety of sounds and meditations - the free features are better than all other apps I've tried.",
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    publisher: { '@type': 'Organization', name: 'Google Play' },
  },
  {
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Vika S.' },
    datePublished: '2026-02-17',
    reviewBody: 'Real relaxation. Thanks for the app.',
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    publisher: { '@type': 'Organization', name: 'App Store' },
  },
];

/**
 * Derived from APP_REVIEWS so the aggregate stays honest and in sync. These are
 * currently the only ratings Oneura has; replace with the real store aggregate
 * (average + total count across Google Play and the App Store) once it accrues.
 */
const ratingValues = APP_REVIEWS.map((r) => Number(r.reviewRating.ratingValue));
export const APP_AGGREGATE_RATING = {
  '@type': 'AggregateRating',
  ratingValue: (
    ratingValues.reduce((sum, value) => sum + value, 0) / ratingValues.length
  ).toFixed(1),
  ratingCount: String(APP_REVIEWS.length),
  reviewCount: String(APP_REVIEWS.length),
  bestRating: '5',
  worstRating: '1',
};

/** UK store listing prices - keep in sync with Subscription.tsx. */
export const PRODUCT_OFFERS = [
  {
    '@type': 'Offer',
    name: 'Oneura free download',
    price: '0',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/InStock',
    url: STORE_URLS.play,
    seller: { '@id': 'https://strato-craft.com/#organization' },
  },
  {
    '@type': 'Offer',
    name: 'Oneura Plus monthly (UK listing)',
    price: '2.99',
    priceCurrency: 'GBP',
    description:
      '7-day free trial, then £2.99 per month. UK store listing; app store may show local currency.',
    availability: 'https://schema.org/InStock',
    url: 'https://oneura.app/subscription',
    seller: { '@id': 'https://strato-craft.com/#organization' },
  },
  {
    '@type': 'Offer',
    name: 'Oneura Plus annual (UK listing)',
    price: '23.99',
    priceCurrency: 'GBP',
    description:
      '7-day free trial, then £23.99 per year (£2.00/month equivalent). UK store listing.',
    availability: 'https://schema.org/InStock',
    url: 'https://oneura.app/subscription',
    seller: { '@id': 'https://strato-craft.com/#organization' },
  },
  {
    '@type': 'Offer',
    name: 'Oneura Plus lifetime (UK listing)',
    price: '149.99',
    priceCurrency: 'GBP',
    description: 'One-time purchase. UK store listing; availability may vary by region.',
    availability: 'https://schema.org/InStock',
    url: 'https://oneura.app/subscription',
    seller: { '@id': 'https://strato-craft.com/#organization' },
  },
];

export function faqPageEntity(pageUrl, faqs, idSuffix = 'faq') {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#${idSuffix}`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export const COMPARISON_GUIDE_URLS = [
  {
    name: 'Oneura vs Calm',
    url: 'https://oneura.app/oneura-vs-calm',
  },
  {
    name: 'Oneura vs BetterSleep',
    url: 'https://oneura.app/oneura-vs-bettersleep',
  },
  {
    name: 'Oneura vs Headspace',
    url: 'https://oneura.app/oneura-vs-headspace',
  },
];

export function buildSchemaGraph({
  pageUrl,
  pageTitle,
  pageDescription,
  routePath,
}) {
  const slug = routePath === '/' ? '' : routePath.slice(1);
  const topicFaqs = TOPIC_FAQS_BY_SLUG[slug];
  const pageName = pageTitle.split(' | ')[0];

  const graph = [
    {
      '@type': 'Organization',
      '@id': 'https://strato-craft.com/#organization',
      name: 'Strato-Craft Ltd',
      url: 'https://strato-craft.com',
      logo: 'https://oneura.app/android-chrome-512x512.png',
      sameAs: [
        'https://strato-craft.com',
        ONEURA_SOCIAL.facebook,
        ONEURA_SOCIAL.instagram,
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@strato-craft.com',
        contactType: 'customer support',
        availableLanguage: 'en',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://oneura.app/#website',
      name: 'Oneura',
      url: 'https://oneura.app/',
      publisher: { '@id': 'https://strato-craft.com/#organization' },
      inLanguage: 'en-GB',
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      ...(pageDescription ? { description: pageDescription } : {}),
      isPartOf: { '@id': 'https://oneura.app/#website' },
      about: [
        { '@id': 'https://oneura.app/#app' },
        { '@id': 'https://oneura.app/#product' },
      ],
      inLanguage: 'en-GB',
    },
    {
      '@type': ['MobileApplication', 'SoftwareApplication'],
      '@id': 'https://oneura.app/#app',
      name: 'Oneura',
      alternateName: 'Oneura - Relax, Sleep & Focus',
      description:
        'Oneura is a sleep sounds and sensory relaxation app for white noise, calming ambience, busy minds, mood tracking, and gentle wind-down insights.',
      url: 'https://oneura.app/',
      image: 'https://oneura.app/oneura-og.png',
      applicationCategory: 'HealthApplication',
      applicationSubCategory: 'Sleep, relaxation, mindfulness, mood tracking',
      operatingSystem: 'Android, iOS',
      publisher: { '@id': 'https://strato-craft.com/#organization' },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'GBP',
        description:
          'Free download with optional Oneura Plus subscription and lifetime purchase.',
      },
      featureList: [
        'Sleep sounds and calming soundscapes',
        'White, pink, brown, and green noise',
        'Rain, ocean, forest, stream, fan, cafe, and meditation ambience',
        'Sensory relaxation and neuro-friendly wind-down routines',
        'Sleep stories and wind-down audio',
        'Mood tracking and reflective insights',
        'Sleep timers, playlists, favourites, and layered mixes',
        'Optional health and wearable-informed sleep context',
      ],
      downloadUrl: [STORE_URLS.play, STORE_URLS.appStore],
      sameAs: SAME_AS_PROFILES,
      aggregateRating: APP_AGGREGATE_RATING,
      review: APP_REVIEWS,
    },
    {
      '@type': 'Product',
      '@id': 'https://oneura.app/#product',
      name: 'Oneura',
      description:
        'Sleep sounds and sensory relaxation app for iOS and Android - white noise, rain sounds, calming ambience, mood tracking, sleep stories, and wind-down support.',
      url: 'https://oneura.app/',
      image: 'https://oneura.app/oneura-og.png',
      category: 'Sleep and sensory relaxation mobile app',
      brand: {
        '@type': 'Brand',
        name: 'Oneura',
      },
      manufacturer: { '@id': 'https://strato-craft.com/#organization' },
      isRelatedTo: { '@id': 'https://oneura.app/#app' },
      aggregateRating: APP_AGGREGATE_RATING,
      review: APP_REVIEWS,
      offers: PRODUCT_OFFERS,
    },
  ];

  if (routePath === '/') {
    graph.push(faqPageEntity(pageUrl, HOME_FAQS));
    graph.push({
      '@type': 'ItemList',
      '@id': 'https://oneura.app/#comparison-guides',
      name: 'Oneura app comparison guides',
      description:
        'Official Oneura comparison pages for Calm, BetterSleep, and Headspace.',
      itemListElement: COMPARISON_GUIDE_URLS.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    });
  } else if (routePath === '/faq') {
    graph.push(faqPageEntity(pageUrl, FAQ_PAGE_FAQS));
  } else if (topicFaqs) {
    graph.push(faqPageEntity(pageUrl, topicFaqs));
  }

  if (routePath !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Oneura',
          item: 'https://oneura.app/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: pageName,
          item: pageUrl,
        },
      ],
    });
  }

  if (slug.startsWith('oneura-vs-')) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${pageUrl}#related-comparisons`,
      name: 'Related Oneura comparison guides',
      itemListElement: COMPARISON_GUIDE_URLS.filter((item) => item.url !== pageUrl).map(
        (item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: item.url,
        }),
      ),
    });
  }

  return graph;
}
