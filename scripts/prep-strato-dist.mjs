/**
 * After `vite build` and the Strato SSR build, prerenders the Strato-Craft
 * company-site routes in place inside dist/ so crawlers and AI readers get real
 * HTML instead of an empty SPA shell. Also writes a branded OG card and llms.txt.
 *
 * Runs AFTER prep-oneura-dist.mjs so the clean dist/ is copied into dist-oneura/
 * before any Strato route directories are created here.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {
  STRATO_ORIGIN,
  ONEURA_ORIGIN,
  STRATO_OG_IMAGE,
  STRATO_ROUTES,
  buildStratoSchema,
  routeUrl,
} from './strato-site-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const indexHtml = path.join(dist, 'index.html');
const prerenderBundle = path.join(
  root,
  'dist-prerender-strato',
  'stratoPrerender.js',
);
const logoSrc = path.join(
  root,
  'src',
  'assets',
  'images',
  'strato-craft',
  'stratocraftlogo.jpg',
);
const ogDst = path.join(dist, 'strato-craft-og.png');

if (!fs.existsSync(indexHtml)) {
  console.error('prep-strato-dist: dist/index.html missing - run vite build first');
  process.exit(1);
}
if (!fs.existsSync(prerenderBundle)) {
  console.error(
    'prep-strato-dist: dist-prerender-strato/stratoPrerender.js missing - run the Strato SSR build first',
  );
  process.exit(1);
}

function escapeHtmlAttribute(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function applyRouteMetadata(html, route) {
  const url = routeUrl(route.path);
  const title = escapeHtmlAttribute(route.title);
  const description = escapeHtmlAttribute(route.description);
  const ogTitle = escapeHtmlAttribute(route.title.replace(' | ', ' - '));
  const schemaJson = JSON.stringify(buildStratoSchema(route), null, 2);

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
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
    )
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${schemaJson}\n    </script>`,
    );
}

function outputFileForRoute(routePath) {
  if (routePath === '/') return indexHtml;
  const slug = routePath.replace(/^\//, '');
  return path.join(dist, slug, 'index.html');
}

async function prerenderStratoRoutes() {
  const { renderStratoRoute } = await import(
    `file:///${prerenderBundle.replace(/\\/g, '/')}`
  );
  // Read the pristine shell once so the home injection does not leak into
  // the other routes.
  const template = fs.readFileSync(indexHtml, 'utf8');

  for (const route of STRATO_ROUTES) {
    const appHtml = renderStratoRoute(route.path);
    const pageHtml = applyRouteMetadata(
      template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`),
      route,
    );
    const outputFile = outputFileForRoute(route.path);
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, pageHtml);
  }
}

function writeLlmsTxt() {
  const pages = STRATO_ROUTES.map(
    (route) => `- ${route.title.split(' | ')[0]}: ${routeUrl(route.path)}`,
  ).join('\n');

  const llms = `# Strato-Craft Ltd

> Strato-Craft Ltd is a UK-based mobile app studio that builds and ships its own AI-powered consumer products.

## Key facts

- Official website: ${STRATO_ORIGIN}/
- Type: UK mobile app development studio (builds its own products, not a consultancy)
- Flagship product: Oneura (sleep sounds and sensory relaxation app) - ${ONEURA_ORIGIN}/
- Other products: Oh-i (personality- and location-based dating app); IAC Platform (cloud infrastructure visualisation, coming soon)
- Platforms: iOS and Android

## Important pages

${pages}

## Products

- Oneura (sleep, relaxation, focus): ${ONEURA_ORIGIN}/
- Oh-i (dating): ${STRATO_ORIGIN}/oh-i
- IAC Platform (cloud infrastructure in VR): ${STRATO_ORIGIN}/iac-vr
`;

  fs.writeFileSync(path.join(dist, 'llms.txt'), llms);
}

async function writeStratoOgImage() {
  if (!fs.existsSync(logoSrc)) {
    console.warn('prep-strato-dist: stratocraftlogo.jpg not found; skipping strato-craft-og.png');
    return;
  }

  const logo = await sharp(logoSrc)
    .resize(120, 120, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const svg = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#0B1220"/>
          <stop offset="60%" stop-color="#111C33"/>
          <stop offset="100%" stop-color="#1E3A5F"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect x="64" y="64" width="1072" height="502" rx="28" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.16)"/>
      <text x="232" y="150" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="800">Strato-Craft</text>
      <text x="232" y="198" fill="#7DD3FC" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700">UK mobile app studio</text>
      <text x="96" y="332" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="800">We build and ship our own</text>
      <text x="96" y="398" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="800">AI-powered mobile products.</text>
      <text x="96" y="476" fill="#CBD5E1" font-family="Arial, Helvetica, sans-serif" font-size="28">Makers of Oneura and Oh-i, for iOS and Android.</text>
      <text x="96" y="526" fill="#F8D27A" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700">strato-craft.com</text>
    </svg>
  `);

  const image = await sharp(svg)
    .composite([{ input: logo, left: 92, top: 84 }])
    .png()
    .toBuffer();

  fs.writeFileSync(ogDst, image);
}

await writeStratoOgImage();
await prerenderStratoRoutes();
writeLlmsTxt();

console.log(
  `prep-strato-dist: prerendered ${STRATO_ROUTES.length} Strato routes, wrote llms.txt and ${path.basename(STRATO_OG_IMAGE)}`,
);
