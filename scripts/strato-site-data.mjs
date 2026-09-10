/**
 * Shared metadata + JSON-LD inputs for the Strato-Craft company-site prerender.
 * Keep route copy in sync with the visible page content. Oneura is intentionally
 * represented only as a lightweight reference here - its rich schema lives on its
 * own canonical domain (oneura.app). See scripts/prep-strato-dist.mjs.
 */

export const STRATO_ORIGIN = 'https://strato-craft.com';
export const ONEURA_ORIGIN = 'https://oneura.app';

export const STRATO_PROFILES = [
  'https://play.google.com/store/apps/dev?id=6109497756704463260',
  'https://apps.apple.com/developer/strato-craft-ltd/id-placeholder',
];

export const STRATO_OG_IMAGE = `${STRATO_ORIGIN}/strato-craft-og.png`;

/**
 * Routes that are prerendered for crawlers/AI. Interactive tool routes
 * (/support, /signature, /oh-i/personality-quiz, /oh-i/verify-business) and
 * boilerplate legal pages are intentionally excluded - they stay client-rendered.
 */
export const STRATO_ROUTES = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    title: 'Strato-Craft | UK App Studio Behind Oneura & Oh-i',
    description:
      'Strato-Craft Ltd is a UK mobile app studio that builds and ships its own AI-powered consumer products, including the Oneura sleep and relaxation app and the Oh-i dating app.',
    breadcrumb: [{ name: 'Home', path: '/' }],
  },
  {
    path: '/about',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'About Strato-Craft | UK Mobile App Development Studio',
    description:
      'Learn about Strato-Craft Ltd, a UK studio building its own AI-powered mobile products for sleep, relaxation, dating, and cloud infrastructure visualisation.',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  },
  {
    path: '/platform',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Strato-Craft Platform | Licensed Branded Wellness Apps',
    description:
      'License the Strato-Craft wellness operating model as your own branded app. You own the store listing, content and memberships. We operate the platform.',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Platform', path: '/platform' },
    ],
  },
  {
    path: '/platform/capabilities',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'Platform Capabilities | Strato-Craft Licensed Modules',
    description:
      'See which wellness capabilities are platform-core, licensable, or reserved for Oneura.',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Platform', path: '/platform' },
      { name: 'Capabilities', path: '/platform/capabilities' },
    ],
  },
  {
    path: '/platform/content',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'Platform Content Catalogue | Licensed Sounds and Stories',
    description:
      'Launch with licensed sleep sounds and stories, add your own content, or keep Oneura-exclusive media off the catalogue.',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Platform', path: '/platform' },
      { name: 'Content', path: '/platform/content' },
    ],
  },
  {
    path: '/platform/how-it-works',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'How the Strato-Craft Platform Works | App Studio and Managed Ops',
    description:
      'A licensed app is a branded shell on shared packages. Marketing uses App Studio. Strato-Craft operates infrastructure and releases.',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Platform', path: '/platform' },
      { name: 'How it works', path: '/platform/how-it-works' },
    ],
  },
  {
    path: '/oh-i',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Oh-i | Personality & Location-Based Dating App by Strato-Craft',
    description:
      'Oh-i is a next-generation dating app from Strato-Craft that matches people on personality and location rather than swipes alone.',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Oh-i', path: '/oh-i' },
    ],
    product: {
      type: 'MobileApplication',
      name: 'Oh-i',
      category: 'SocialNetworkingApplication',
      operatingSystem: 'Android, iOS',
      description:
        'A personality- and location-based dating app that reimagines how people match and connect.',
    },
  },
  {
    path: '/oh-i/about',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'About Oh-i | Personality-Based Dating App',
    description:
      'How Oh-i approaches dating through personality and location matching, designed and built by Strato-Craft Ltd.',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Oh-i', path: '/oh-i' },
      { name: 'About', path: '/oh-i/about' },
    ],
  },
  {
    path: '/oh-i/subscription',
    priority: '0.5',
    changefreq: 'monthly',
    title: 'Oh-i Subscription | Plans & Premium Features',
    description:
      'Compare Oh-i free and premium plans, including the features that help you match and connect on personality and location.',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Oh-i', path: '/oh-i' },
      { name: 'Subscription', path: '/oh-i/subscription' },
    ],
  },
  {
    path: '/iac-vr',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'IAC Platform | Cloud Infrastructure Visualisation in VR',
    description:
      'IAC Platform is a Strato-Craft project for visualising cloud infrastructure in an intuitive, VR-ready way for developers, teams, and learners. Coming soon.',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'IAC Platform', path: '/iac-vr' },
    ],
    product: {
      type: 'SoftwareApplication',
      name: 'IAC Platform',
      category: 'DeveloperApplication',
      operatingSystem: 'VR, Web',
      description:
        'A visual, intuitive way to understand cloud infrastructure - for developers, teams, and curious learners.',
    },
  },
  {
    path: '/iac-vr/about',
    priority: '0.5',
    changefreq: 'monthly',
    title: 'About IAC Platform | Visual Cloud Infrastructure Learning',
    description:
      'Learn how the IAC Platform makes cloud infrastructure easier to understand through visual, VR-ready exploration. A Strato-Craft project.',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'IAC Platform', path: '/iac-vr' },
      { name: 'About', path: '/iac-vr/about' },
    ],
  },
];

function routeUrl(routePath) {
  return `${STRATO_ORIGIN}${routePath === '/' ? '/' : routePath}`;
}

function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': `${STRATO_ORIGIN}/#organization`,
    name: 'Strato-Craft Ltd',
    url: STRATO_ORIGIN,
    logo: `${STRATO_ORIGIN}/android-chrome-512x512.png`,
    description:
      'UK-based mobile app development company building consumer apps including Oneura and Oh-i.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressRegion: 'England',
    },
    sameAs: STRATO_PROFILES,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@strato-craft.com',
      contactType: 'Customer Support',
    },
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${STRATO_ORIGIN}/#website`,
    name: 'Strato-Craft',
    url: STRATO_ORIGIN,
    publisher: { '@id': `${STRATO_ORIGIN}/#organization` },
    inLanguage: 'en-GB',
  };
}

function breadcrumbNode(breadcrumb) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumb.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: routeUrl(crumb.path),
    })),
  };
}

/** Build the per-route JSON-LD @graph for a Strato page. */
export function buildStratoSchema(route) {
  const url = routeUrl(route.path);
  const graph = [
    organizationNode(),
    websiteNode(),
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: route.title,
      description: route.description,
      isPartOf: { '@id': `${STRATO_ORIGIN}/#website` },
      inLanguage: 'en-GB',
    },
  ];

  if (route.breadcrumb && route.breadcrumb.length > 1) {
    graph.push(breadcrumbNode(route.breadcrumb));
  }

  // Home references Oneura (canonical detail lives on oneura.app).
  if (route.path === '/') {
    graph.push({
      '@type': 'MobileApplication',
      name: 'Oneura',
      url: `${ONEURA_ORIGIN}/`,
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Android, iOS',
      publisher: { '@id': `${STRATO_ORIGIN}/#organization` },
    });
  }

  if (route.product) {
    graph.push({
      '@type': route.product.type || 'MobileApplication',
      name: route.product.name,
      url,
      applicationCategory: route.product.category,
      operatingSystem: route.product.operatingSystem || 'Android, iOS',
      description: route.product.description,
      publisher: { '@id': `${STRATO_ORIGIN}/#organization` },
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export { routeUrl };
