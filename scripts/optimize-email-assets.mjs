/**
 * Builds email-signature-friendly copies (<= 400KB) next to the originals.
 * Strategy: cap pixel dimensions (more than enough for ~28–88px display + retina),
 * then mozjpeg / PNG compression; only lowers JPEG Q if still over budget.
 *
 * Usage (from website/):
 *   node scripts/optimize-email-assets.mjs
 */
import { writeFile } from "fs/promises";
import sharp from "sharp";

const MAX_BYTES = 400 * 1024;

async function optimizeJpeg(inputPath, outputPath) {
  const meta = await sharp(inputPath).metadata();
  let maxSide = Math.min(1200, Math.max(meta.width ?? 0, meta.height ?? 0) || 1200);
  let quality = 92;

  const render = async () => {
    let p = sharp(inputPath).rotate();
    const w = meta.width ?? 1;
    const h = meta.height ?? 1;
    const long = Math.max(w, h);
    if (long > maxSide) {
      p = p.resize(maxSide, maxSide, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }
    return p.jpeg({ mozjpeg: true, quality, chromaSubsampling: "4:4:4" }).toBuffer();
  };

  let buf = await render();
  while (buf.length > MAX_BYTES && quality > 72) {
    quality -= 2;
    buf = await render();
  }
  while (buf.length > MAX_BYTES && maxSide > 360) {
    maxSide -= 80;
    quality = 88;
    buf = await render();
    while (buf.length > MAX_BYTES && quality > 68) {
      quality -= 2;
      buf = await render();
    }
  }

  await writeFile(outputPath, buf);
  console.log(
    `OK  ${outputPath}  (${(buf.length / 1024).toFixed(1)} KB, maxSide≈${maxSide}, q≈${quality})`,
  );
}

async function optimizePngTransparent(inputPath, outputPath) {
  let maxSide = 720;

  const renderLossless = async () =>
    sharp(inputPath)
      .rotate()
      .resize(maxSide, maxSide, { fit: "inside", withoutEnlargement: true })
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true,
        effort: 10,
      })
      .toBuffer();

  let buf = await renderLossless();
  while (buf.length > MAX_BYTES && maxSide > 280) {
    maxSide -= 80;
    buf = await renderLossless();
  }

  if (buf.length > MAX_BYTES) {
    buf = await sharp(inputPath)
      .rotate()
      .resize(320, 320, { fit: "inside", withoutEnlargement: true })
      .png({
        compressionLevel: 9,
        effort: 10,
        palette: true,
        colours: 256,
      })
      .toBuffer();
  }

  await writeFile(outputPath, buf);
  console.log(
    `OK  ${outputPath}  (${(buf.length / 1024).toFixed(1)} KB, last maxSide≈${maxSide})`,
  );
}

const jobs = [
  {
    kind: "jpeg",
    inPath: `D:\\Strato-Craft\\website\\src\\assets\\images\\strato-craft\\stratocraftlogo.jpg`,
    outPath: `D:\\Strato-Craft\\website\\src\\assets\\images\\strato-craft\\stratocraftlogo-email.jpg`,
  },
  {
    kind: "png",
    inPath: `C:\\Users\\fazza\\StudioProjects\\onuera\\onuera_app\\assets\\branding\\splashlogocolor.png`,
    outPath: `C:\\Users\\fazza\\StudioProjects\\onuera\\onuera_app\\assets\\branding\\splashlogocolor-email.png`,
  },
];

for (const j of jobs) {
  try {
    if (j.kind === "jpeg") {
      await optimizeJpeg(j.inPath, j.outPath);
    } else {
      await optimizePngTransparent(j.inPath, j.outPath);
    }
  } catch (e) {
    console.error(`FAIL ${j.inPath}`, e);
    process.exitCode = 1;
  }
}
