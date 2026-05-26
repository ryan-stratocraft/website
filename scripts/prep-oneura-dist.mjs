/**
 * After `vite build`, creates dist-oneura/ with index.html replaced by oneura.html
 * so crawlers and social previews get Oneura-only <head> on oneura.app Hosting.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const out = path.join(root, 'dist-oneura');
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
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/subscription', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.4', changefreq: 'yearly' },
  { path: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/delete-data', priority: '0.3', changefreq: 'yearly' },
];

if (!fs.existsSync(dist)) {
  console.error('prep-oneura-dist: dist/ missing — run vite build first');
  process.exit(1);
}
if (!fs.existsSync(oneuraHtml)) {
  console.error('prep-oneura-dist: dist/oneura.html missing');
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

fs.writeFileSync(
  path.join(out, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: https://oneura.app/sitemap.xml
`,
);
fs.writeFileSync(path.join(out, 'sitemap.xml'), sitemap);

if (fs.existsSync(logoSrc)) {
  fs.copyFileSync(logoSrc, ogDstDist);
  fs.copyFileSync(logoSrc, ogDstOneura);
} else {
  console.warn('prep-oneura-dist: logo-color.png not found; add public oneura-og.png manually');
}

// Override Strato-Craft-branded fallback files at well-known paths so iOS
// Safari, Chrome's PWA install flow, and cached browser lookups all see
// Oneura imagery on oneura.app. The HTML head references the right Oneura
// assets, but browsers probe defaults like /apple-touch-icon.png and
// /site.webmanifest directly — and may have those URLs cached from prior
// visits. Without this step, the cached/probed paths still serve
// Strato-Craft assets, producing a white splash with the Strato-Craft
// square logo before React mounts.
const oneuraIcon = path.join(out, 'oneura-touch-icon.png');
if (fs.existsSync(oneuraIcon)) {
  const fallbackPngs = [
    'apple-touch-icon.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'web-app-manifest-192x192.png',
    'web-app-manifest-512x512.png',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon-96x96.png',
  ];
  for (const f of fallbackPngs) {
    const dst = path.join(out, f);
    if (fs.existsSync(dst)) {
      fs.copyFileSync(oneuraIcon, dst);
    }
  }
}

// Mirror oneura.webmanifest content over site.webmanifest so cached
// requests to /site.webmanifest (the Strato-Craft default location) also
// return Oneura branding instead of the empty-name, #ffffff-background
// manifest that produces the white splash.
const oneuraManifest = path.join(out, 'oneura.webmanifest');
const siteManifest = path.join(out, 'site.webmanifest');
if (fs.existsSync(oneuraManifest) && fs.existsSync(siteManifest)) {
  fs.copyFileSync(oneuraManifest, siteManifest);
}

// Replace the Strato-Craft favicon.ico with the Oneura one. The .ico
// file is committed at public/oneura-favicon.ico (generated once via
// png-to-ico from oneura-touch-icon.png) so no extra build-time tool is
// needed. strato-craft.com's build (dist/) keeps the original
// favicon.ico — only dist-oneura/ gets swapped.
const oneuraIco = path.join(out, 'oneura-favicon.ico');
const faviconIco = path.join(out, 'favicon.ico');
if (fs.existsSync(oneuraIco) && fs.existsSync(faviconIco)) {
  fs.copyFileSync(oneuraIco, faviconIco);
}

// Drop the raw Strato-Craft logo image entirely — nothing on oneura.app
// should ever reference it.
const stratoJpg = path.join(out, 'stratocraftlogo.jpg');
if (fs.existsSync(stratoJpg)) {
  fs.rmSync(stratoJpg);
}

console.log('prep-oneura-dist: wrote dist-oneura/ with Oneura index, oneura-og.png, and Oneura-branded fallback assets');
