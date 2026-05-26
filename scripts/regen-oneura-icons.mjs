/**
 * Regenerates Oneura's branded icon assets from the source logo:
 *   - public/oneura-touch-icon.png  (512x512 PNG, navy background)
 *   - public/oneura-favicon.ico     (multi-resolution ICO)
 *
 * Run after editing the source logo so the touch icon + favicon stay
 * in sync. The `prep-oneura-dist.mjs` build step then mirrors these
 * generated assets onto every well-known fallback path inside
 * `dist-oneura/` (apple-touch-icon, android-chrome-*, site.webmanifest,
 * favicon.ico, etc.), so every URL a browser probes on oneura.app
 * returns the current Oneura branding.
 *
 * Usage:
 *   npm run regen:oneura-icons
 *   # or: node scripts/regen-oneura-icons.mjs
 *
 * Source file: `src/assets/images/oneura/logo-color.png`
 *   - Square or non-square accepted; non-square is padded to a square
 *     with the navy brand background (#0B132B) before downscaling.
 *   - Replace this file with the new logo and re-run to update.
 */

import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const SOURCE_LOGO = path.join(root, 'src/assets/images/oneura/logo-color.png');
const TOUCH_ICON = path.join(root, 'public/oneura-touch-icon.png');
const FAVICON_ICO = path.join(root, 'public/oneura-favicon.ico');

// Brand navy. Keep in sync with `app_colors.dart` (Brand.navy) and the
// `background_color` field in `public/oneura.webmanifest`.
const NAVY = { r: 11, g: 19, b: 43, alpha: 1 };

// Final touch-icon edge length. 512 is large enough for every modern
// "apple-touch-icon" / "android-chrome" / web-app-manifest size browsers
// request, and downscales cleanly to 16x16 favicon variants.
const ICON_SIZE = 512;

async function main() {
  await assertReadable(SOURCE_LOGO);

  // 1. Touch icon — pad to a square (if needed) then resize to 512.
  const meta = await sharp(SOURCE_LOGO).metadata();
  const longerEdge = Math.max(meta.width, meta.height);

  console.log(`source: ${path.relative(root, SOURCE_LOGO)} (${meta.width}x${meta.height})`);

  const touchIconBuf = await sharp(SOURCE_LOGO)
      .resize({
        width: longerEdge,
        height: longerEdge,
        fit: 'contain',
        background: NAVY,
      })
      .resize(ICON_SIZE, ICON_SIZE, { fit: 'cover' })
      .png()
      .toBuffer();
  await fs.writeFile(TOUCH_ICON, touchIconBuf);
  console.log(
      `wrote ${path.relative(root, TOUCH_ICON)} (${ICON_SIZE}x${ICON_SIZE}, ${touchIconBuf.length} bytes)`,
  );

  // 2. Favicon ICO — multi-resolution, generated from the freshly-written
  // touch icon so the two stay visually identical.
  const icoBuf = await pngToIco(TOUCH_ICON);
  await fs.writeFile(FAVICON_ICO, icoBuf);
  console.log(`wrote ${path.relative(root, FAVICON_ICO)} (${icoBuf.length} bytes)`);

  console.log('\nDone. Run `npm run build:all` next to propagate into dist-oneura/.');
}

/** @param {string} file */
async function assertReadable(file) {
  try {
    await fs.access(file, fs.constants.R_OK);
  } catch {
    console.error(`source logo not found or unreadable: ${file}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('regen-oneura-icons failed:', err);
  process.exit(1);
});
