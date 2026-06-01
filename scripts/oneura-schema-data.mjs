/** Shared JSON-LD inputs for Oneura prerender (keep in sync with visible UI copy). */

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

/** Topic FAQs — mirror `TopicLandingPage.tsx` contentBySlug.faqs */
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

export function buildSchemaGraph({ pageUrl, pageTitle, routePath }) {
  const slug = routePath === '/' ? '' : routePath.slice(1);
  const topicFaqs = TOPIC_FAQS_BY_SLUG[slug];

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
      isPartOf: { '@id': 'https://oneura.app/#website' },
      about: { '@id': 'https://oneura.app/#app' },
      inLanguage: 'en-GB',
    },
    {
      '@type': 'MobileApplication',
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
      review: APP_REVIEWS,
    },
  ];

  if (routePath === '/') {
    graph.push(faqPageEntity(pageUrl, HOME_FAQS));
  } else if (topicFaqs) {
    graph.push(faqPageEntity(pageUrl, topicFaqs));
  }

  return graph;
}
