/**
 * After `vite build`, creates dist-oneura/ with index.html replaced by
 * oneura.html so crawlers and social previews get a Oneura-only <head> on
 * oneura.app Hosting.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {
  ONEURA_SOCIAL,
  STORE_URLS,
  buildSchemaGraph,
} from './oneura-schema-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const out = path.join(root, 'dist-oneura');
const prerenderBundle = path.join(root, 'dist-prerender', 'oneuraPrerender.js');
const oneuraHtml = path.join(dist, 'oneura.html');
const logoSrc = path.join(
  root,
  'src',
  'assets',
  'images',
  'oneura',
  'logo-color.png',
);
const ogDstDist = path.join(dist, 'oneura-og.png');
const ogDstOneura = path.join(out, 'oneura-og.png');
const oneuraRoutes = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    title: 'Oneura | Sleep Sounds, Sensory Relaxation & Wind-Down App',
    description:
      'Oneura is an iOS and Android sleep sounds and sensory relaxation app for white noise, calming ambience, busy minds, mood tracking, and wind-down routines.',
  },
  {
    path: '/about',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'About Oneura | Sleep Sounds, Mood Tracking & Wellness App',
    description:
      'Learn how Oneura supports relaxation, sleep, focus, mood tracking, sleep stories, and optional wearable-informed wellness insights.',
  },
  {
    path: '/faq',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Oneura FAQ | Sleep Sounds, Noise Colours, ADHD & Focus',
    description:
      'Answers about Oneura sleep sounds, white, pink, brown, and green noise, sensory relaxation for busy and neurodivergent minds (including ADHD and AuDHD), focus audio, mood tracking, and the Oneura Plus subscription.',
  },
  {
    path: '/sleep-sounds-white-noise',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Sleep Sounds & White Noise App | Oneura for Calmer Nights',
    description:
      'Use Oneura for sleep sounds, white noise, brown noise, rain, ocean waves, forest ambience, sleep stories, timers, and calmer wind-down routines.',
  },
  {
    path: '/sensory-relaxation-app',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Sensory Relaxation App | Oneura for Overstimulation & Calm',
    description:
      'Oneura is a sensory relaxation app for overstimulated moments, with calming soundscapes, ambience, optional haptics, and simple wind-down routines.',
  },
  {
    path: '/sleep-app-for-busy-minds',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Sleep App for Busy Minds | Oneura Wind-Down Sounds',
    description:
      'Oneura helps busy minds wind down with sleep sounds, white noise, sleep stories, sensory ambience, mood reflection, and low-friction bedtime routines.',
  },
  {
    path: '/neuro-friendly-sleep-app',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Neuro-Friendly Sleep App | Oneura for Sensory Wind-Downs',
    description:
      'Oneura is designed with busy minds and sensory needs in mind, offering non-medical sleep sounds, ambience, mood reflection, and gentle routines.',
  },
  {
    path: '/mood-tracking-sleep-app',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Mood Tracking Sleep App | Oneura Wind-Down Reflection',
    description:
      'Oneura combines mood tracking, sleep sounds, white noise, gentle insights, and wind-down routines to help you reflect without heavy sleep scoring.',
  },
  {
    path: '/sleep-sounds-for-focus',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Sleep Sounds for Focus | Oneura Study & Work Ambience',
    description:
      'Use Oneura focus sounds, cafe ambience, fans, steady noise, nature soundscapes, and calming audio for study, work, breaks, and transitions.',
  },
  {
    path: '/subscription',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Oneura Plus Pricing | Premium Sleep Sounds & Unlimited Listening',
    description:
      'Compare Oneura Free and Oneura Plus, including unlimited listening, premium sleep sounds, stories, ad-free use, and lifetime access.',
  },
  {
    path: '/privacy-policy',
    priority: '0.4',
    changefreq: 'yearly',
    title: 'Oneura Privacy Policy | Strato-Craft Ltd',
    description:
      'Read how Oneura and Strato-Craft Ltd collect, use, protect, and delete personal information for the Oneura app and website.',
  },
  {
    path: '/terms-and-conditions',
    priority: '0.4',
    changefreq: 'yearly',
    title: 'Oneura Terms & Conditions | Strato-Craft Ltd',
    description:
      'Read the terms that govern use of the Oneura app, Oneura Plus, subscriptions, wellness content, and related services.',
  },
  {
    path: '/cookie-policy',
    priority: '0.3',
    changefreq: 'yearly',
    title: 'Oneura Cookie Policy | Website Cookies & Analytics',
    description:
      'Learn how Oneura uses cookies, analytics, and similar technologies on the website and in related services.',
  },
  {
    path: '/delete-data',
    priority: '0.3',
    changefreq: 'yearly',
    title: 'Delete Oneura Data | Account & Privacy Requests',
    description:
      'Find out how to delete your Oneura account data, request privacy support, and cancel app store subscriptions separately.',
  },
];

if (!fs.existsSync(dist)) {
  console.error('prep-oneura-dist: dist/ missing - run vite build first');
  process.exit(1);
}
if (!fs.existsSync(oneuraHtml)) {
  console.error('prep-oneura-dist: dist/oneura.html missing');
  process.exit(1);
}
if (!fs.existsSync(prerenderBundle)) {
  console.error('prep-oneura-dist: dist-prerender/oneuraPrerender.js missing');
  process.exit(1);
}

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(dist, out, { recursive: true });
fs.copyFileSync(oneuraHtml, path.join(out, 'index.html'));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${oneuraRoutes
  .map(
    (route) => `  <url>
    <loc>https://oneura.app${route.path === '/' ? '/' : route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: https://oneura.app/sitemap.xml
`;

const manifest = {
  name: 'Oneura',
  short_name: 'Oneura',
  description:
    'Sleep sounds, white noise, sensory relaxation, mood tracking, and gentle wind-down insights.',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'portrait-primary',
  background_color: '#0B132B',
  theme_color: '#0B132B',
  categories: ['health', 'lifestyle', 'music'],
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
};

const llmsTxt = `# Oneura

> Oneura is an iOS and Android sleep sounds and sensory relaxation app for white noise, calming ambience, busy minds, mood tracking, sleep stories, and gentle wind-down insights.

## Key facts

- Official website: https://oneura.app/
- Publisher: Strato-Craft Ltd
- Platforms: iOS and Android
- Pricing: free download with optional Oneura Plus subscription and lifetime purchase
- App category: sleep, relaxation, focus, mindfulness, mood tracking, and wellness
- Medical positioning: wellness software only; not a medical device and not medical advice
- Differentiation: sensory relaxation, sleep support for busy minds, and neuro-friendly wind-down design

## Core features

- Sleep sounds and calming soundscapes
- White, pink, brown, and green noise
- Rain, ocean, forest, stream, fan, cafe, chimes, space, and meditation ambience
- Sleep stories and wind-down audio
- Mood tracking and reflective insights
- Sleep timers, favourites, playlists, and layered mixes
- Optional health and wearable-informed sleep context
- Sensory ambience, optional haptics, and low-friction routines for overstimulated moments
- Focus backgrounds for study, reading, work, and transitions

## Important pages

- Home: https://oneura.app/
- About: https://oneura.app/about
- FAQ (sleep sounds, noise colours, focus, mood, subscription): https://oneura.app/faq
- Sleep sounds and white noise: https://oneura.app/sleep-sounds-white-noise
- Sensory relaxation app: https://oneura.app/sensory-relaxation-app
- Sleep app for busy minds: https://oneura.app/sleep-app-for-busy-minds
- Neuro-friendly sleep app: https://oneura.app/neuro-friendly-sleep-app
- Mood tracking sleep app: https://oneura.app/mood-tracking-sleep-app
- Sleep sounds for focus: https://oneura.app/sleep-sounds-for-focus
- Subscription: https://oneura.app/subscription
- Privacy policy: https://oneura.app/privacy-policy
- Terms: https://oneura.app/terms-and-conditions
- Data deletion: https://oneura.app/delete-data

## App store links

- Google Play: ${STORE_URLS.play}
- App Store: ${STORE_URLS.appStore}

## Social

- Facebook: ${ONEURA_SOCIAL.facebook}
- Instagram: ${ONEURA_SOCIAL.instagram}
`;

fs.writeFileSync(path.join(out, 'robots.txt'), robots);
fs.writeFileSync(path.join(out, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(out, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);
fs.writeFileSync(path.join(out, 'llms.txt'), llmsTxt);

function escapeHtmlAttribute(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function routeUrl(routePath) {
  return `https://oneura.app${routePath === '/' ? '/' : routePath}`;
}

function routeOutputFiles(routePath) {
  if (routePath === '/') return path.join(out, 'index.html');
  const slug = routePath.slice(1);
  return [path.join(out, slug, 'index.html'), path.join(out, `${slug}.html`)];
}

function applyRouteSchema(html, route) {
  const url = routeUrl(route.path);
  const graph = buildSchemaGraph({
    pageUrl: url,
    pageTitle: route.title,
    routePath: route.path,
  });
  const json = JSON.stringify(
    { '@context': 'https://schema.org', '@graph': graph },
    null,
    2,
  );
  return html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${json}\n    </script>`,
  );
}

function applyRouteMetadata(html, route) {
  const url = routeUrl(route.path);
  const title = escapeHtmlAttribute(route.title);
  const description = escapeHtmlAttribute(route.description);
  const ogTitle = escapeHtmlAttribute(route.title.replace(' | ', ' - '));

  return applyRouteSchema(html, route)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
    .replace(
      /<meta\s+name="title"\s+content="[^"]*"\s*\/>/,
      `<meta name="title" content="${title}" />`,
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${url}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${url}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${ogTitle}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:url" content="${url}" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${ogTitle}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${description}" />`,
    );
}

async function prerenderOneuraRoutes() {
  const { renderOneuraRoute } = await import(`file:///${prerenderBundle.replace(/\\/g, '/')}`);
  const template = fs.readFileSync(path.join(out, 'index.html'), 'utf8');

  for (const route of oneuraRoutes) {
    const appHtml = renderOneuraRoute(route.path);
    const pageHtml = applyRouteMetadata(
      template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`),
      route,
    );
    const outputFiles = routeOutputFiles(route.path);
    for (const outputFile of Array.isArray(outputFiles) ? outputFiles : [outputFiles]) {
      fs.mkdirSync(path.dirname(outputFile), { recursive: true });
      fs.writeFileSync(outputFile, pageHtml);
    }
  }
}

async function writeOneuraOgImage() {
  if (!fs.existsSync(logoSrc)) {
    console.warn('prep-oneura-dist: logo-color.png not found; skipping oneura-og.png');
    return;
  }

  const logo = await sharp(logoSrc)
    .resize(132, 132, { fit: 'contain' })
    .png()
    .toBuffer();

  const svg = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#07111F"/>
          <stop offset="58%" stop-color="#0B132B"/>
          <stop offset="100%" stop-color="#134E4A"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect x="64" y="64" width="1072" height="502" rx="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)"/>
      <text x="230" y="145" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800">Oneura</text>
      <text x="230" y="198" fill="#5EEAD4" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700">Sleep sounds, sensory relaxation, busy minds</text>
      <text x="96" y="330" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800">Relax, sleep, focus, and</text>
      <text x="96" y="398" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800">wind down with sound.</text>
      <text x="96" y="476" fill="#CBD5E1" font-family="Arial, Helvetica, sans-serif" font-size="30">Available on iOS and Android from Strato-Craft Ltd.</text>
      <text x="96" y="526" fill="#F8D27A" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700">oneura.app</text>
    </svg>
  `);

  const image = await sharp(svg)
    .composite([{ input: logo, left: 88, top: 91 }])
    .png()
    .toBuffer();

  fs.writeFileSync(ogDstDist, image);
  fs.writeFileSync(ogDstOneura, image);
}

await writeOneuraOgImage();
await prerenderOneuraRoutes();

console.log(
  'prep-oneura-dist: wrote dist-oneura/ with prerendered Oneura routes, crawl files, llms.txt, and oneura-og.png',
);
