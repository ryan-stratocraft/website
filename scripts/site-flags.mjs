/**
 * Node-side reader for src/config/siteFlags.ts so the prerender and the app
 * share one switch. Flip SHOW_OHI in that file; do not duplicate it here.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const flagsPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/config/siteFlags.ts',
);
const source = fs.readFileSync(flagsPath, 'utf8');
const match = source.match(/export const SHOW_OHI\s*=\s*(true|false)/);

if (!match) {
  throw new Error(`Could not read SHOW_OHI from ${flagsPath}`);
}

export const SHOW_OHI = match[1] === 'true';
