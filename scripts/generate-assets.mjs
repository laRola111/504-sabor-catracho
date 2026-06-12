/**
 * generate-assets.mjs
 * Generates OG image + icons from the logo.
 */
import sharp from 'sharp';
import { readFile } from 'fs/promises';

const LOGO_SRC   = 'public/logo-504-catracha.png';
const LOGO_DEST  = 'public/og-image.jpg';
const ICON_DEST  = 'public/icon-192.png';
const APPLE_DEST = 'public/apple-touch-icon.png';

async function main() {
  // ── Logo at 380px height ─────────────────────────────────────────────────
  const logoBuffer = await sharp(LOGO_SRC)
    .resize({ height: 380, withoutEnlargement: true })
    .png()
    .toBuffer();

  const meta = await sharp(logoBuffer).metadata();
  const lw   = meta.width  ?? 400;
  const lh   = meta.height ?? 380;
  const left = Math.round((1200 - lw) / 2);
  const top  = Math.round((630  - lh) / 2) - 20;

  // ── SVG background 1200×630 ──────────────────────────────────────────────
  const svgStr = [
    '<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">',
    '<defs>',
    '<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">',
    '<stop offset="0%"   stop-color="#FDFAF3"/>',
    '<stop offset="40%"  stop-color="#A8CCEA"/>',
    '<stop offset="100%" stop-color="#1B4F8A"/>',
    '</linearGradient>',
    '</defs>',
    '<rect width="1200" height="630" fill="url(#bg)"/>',
    '<text x="600" y="580" font-family="Arial,sans-serif" font-size="26"',
    '  font-weight="bold" fill="rgba(27,79,138,0.75)" text-anchor="middle"',
    '  letter-spacing="2">907 Kramer Ln - Austin, TX 78758 - (512) 783-0737</text>',
    '</svg>',
  ].join('\n');

  const svgBuf = Buffer.from(svgStr);

  // ── OG image ─────────────────────────────────────────────────────────────
  await sharp(svgBuf)
    .composite([{ input: logoBuffer, left, top }])
    .jpeg({ quality: 90 })
    .toFile(LOGO_DEST);
  console.log('og-image.jpg  OK');

  // ── Icon 192×192 ─────────────────────────────────────────────────────────
  await sharp(LOGO_SRC)
    .resize(192, 192, {
      fit: 'contain',
      background: { r: 253, g: 250, b: 243, alpha: 1 },
    })
    .png()
    .toFile(ICON_DEST);
  console.log('icon-192.png  OK');

  // ── Apple touch icon 180×180 ─────────────────────────────────────────────
  await sharp(LOGO_SRC)
    .resize(180, 180, {
      fit: 'contain',
      background: { r: 27, g: 79, b: 138, alpha: 1 },
    })
    .png()
    .toFile(APPLE_DEST);
  console.log('apple-touch-icon.png  OK');
}

main().catch(console.error);
