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

console.log('prep-oneura-dist: wrote dist-oneura/ with Oneura index + oneura-og.png');
