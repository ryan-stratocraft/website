import html2canvas from "html2canvas";
import { GIFEncoder, quantize, applyPalette } from "gifenc";

export type RecordGifOptions = {
  durationMs: number;
  fps: number;
  /** Cap CSS width before capture (helps email-safe file sizes). */
  maxCssWidthPx: number;
  /**
   * Limit longest canvas side (pixels) after scale — keeps quantize/GIF encode
   * from freezing the tab when the preview is tall/wide.
   */
  maxCaptureSidePx?: number;
  /** Reject each html2canvas if it hangs (common with bad fonts/CORS quirks). */
  frameCaptureTimeoutMs?: number;
  /** Called between frames while the UI can still paint (main thread yielded). */
  onProgress?: (currentFrame: number, totalFrames: number) => void;
};

function clampNum(n: number, min: number, max: number, fallback: number): number {
  if (typeof n !== "number" || !Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.round(n)));
}

function yieldToUi(): Promise<void> {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      window.setTimeout(resolve, 0);
    });
  });
}

function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const tid = window.setTimeout(() => {
      reject(new Error(`${label} timed out after ${ms}ms — try lowering duration or FPS, or simplify the preview.`));
    }, ms);
    promise.then(
      (v) => {
        window.clearTimeout(tid);
        resolve(v);
      },
      (e) => {
        window.clearTimeout(tid);
        reject(e);
      },
    );
  });
}

/**
 * Rasterises `element` over time while CSS animations run, then builds an animated GIF.
 * Requires remote images on the signature to permit CORS; otherwise canvas may reject reads.
 */
export async function recordElementToGif(
  element: HTMLElement,
  opts: RecordGifOptions,
): Promise<Uint8Array> {
  const fps = clampNum(opts.fps, 4, 24, 10);
  const durationMs = clampNum(opts.durationMs, 600, 10_000, 2400);
  const maxW = clampNum(opts.maxCssWidthPx, 240, 800, 560);
  const maxCaptureSidePx = clampNum(opts.maxCaptureSidePx ?? 640, 320, 1200, 640);
  const frameCaptureTimeoutMs = clampNum(
    opts.frameCaptureTimeoutMs ?? 45_000,
    10_000,
    120_000,
    45_000,
  );
  const onProgress = opts.onProgress;

  const rect = element.getBoundingClientRect();
  const cssW = Math.max(1, rect.width);
  const cssH = Math.max(1, rect.height);
  let scale = cssW > maxW ? maxW / cssW : 1;

  let capW = cssW * scale;
  let capH = cssH * scale;
  const longest = Math.max(capW, capH);
  if (longest > maxCaptureSidePx) {
    scale *= maxCaptureSidePx / longest;
  }

  const frameDelayMs = Math.round(1000 / fps);
  const frameCount = Math.max(2, Math.ceil((durationMs / 1000) * fps));

  const gif = GIFEncoder();

  for (let i = 0; i < frameCount; i++) {
    if (i > 0) {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, frameDelayMs);
      });
    }

    onProgress?.(i + 1, frameCount);
    await yieldToUi();

    const canvas = await withTimeout(
      html2canvas(element, {
        scale,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        foreignObjectRendering: false,
      }),
      frameCaptureTimeoutMs,
      `html2canvas (frame ${i + 1}/${frameCount})`,
    );

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      throw new Error("Could not read the screenshot canvas.");
    }

    const w = canvas.width;
    const h = canvas.height;
    const img = ctx.getImageData(0, 0, w, h);
    const palette = quantize(img.data, 256);
    const index = applyPalette(img.data, palette);

    gif.writeFrame(index, w, h, {
      palette,
      delay: frameDelayMs,
      ...(i === 0 ? { repeat: 0 as const } : {}),
    });

    await yieldToUi();
  }

  gif.finish();
  return gif.bytes();
}

export function downloadUint8Gif(bytes: Uint8Array, filename: string): void {
  const blob = new Blob([bytes], { type: "image/gif" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
