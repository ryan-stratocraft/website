declare module "gifenc" {
  export type GifWriteFrameOptions = {
    palette: Uint8Array;
    delay: number;
    repeat?: number;
  };

  export function GIFEncoder(): {
    writeFrame(
      index: Uint8Array,
      width: number,
      height: number,
      options: GifWriteFrameOptions,
    ): void;
    finish(): void;
    bytes(): Uint8Array;
  };

  export function quantize(
    rgba: Uint8ClampedArray,
    maxColors: number,
  ): Uint8Array;

  export function applyPalette(
    rgba: Uint8ClampedArray,
    palette: Uint8Array,
  ): Uint8Array;
}
