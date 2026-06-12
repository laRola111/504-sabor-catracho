/**
 * compress-images.mjs
 * Compresses all PNGs in public/images to WebP (≤200KB each)
 * and also creates an optimized OG image from the logo.
 * Run: node scripts/compress-images.mjs
 */

import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT      = join(__dirname, '..');
const INPUT_DIR = join(ROOT, 'public', 'images');
const OUT_DIR   = join(ROOT, 'public', 'images');   // overwrite with .webp
const LOGO_SRC  = join(ROOT, 'public', 'logo-504-catracha.png');
const LOGO_DEST = join(ROOT, 'public', 'og-image.jpg');
const ICON_DEST = join(ROOT, 'public', 'icon-192.png');
const APPLE_DEST= join(ROOT, 'public', 'apple-touch-icon.png');

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const files = await readdir(INPUT_DIR);
  const images = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

  console.log(`\n📸 Compressing ${images.length} images to WebP...\n`);

  for (const file of images) {
    const src  = join(INPUT_DIR, file);
    const name = basename(file, extname(file));
    const dest = join(OUT_DIR, `${name}.webp`);

    const before = (await stat(src)).size;

    await sharp(src)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(dest);

    const after = (await stat(dest)).size;
    const saved = (((before - after) / before) * 100).toFixed(0);
    console.log(`  ✅ ${file}  →  ${name}.webp  (${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB, -${saved}%)`);
  }

  // ── OG image: logo on blue gradient background (1200×630) ──────────────
  console.log('\n🖼️  Generating OG image (1200×630)...');
  const logoBuffer = await sharp(LOGO_SRC)
    .resize({ height: 380, withoutEnlargement: true })
    .png()
    .toBuffer();

  const ogSvgOverlay = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stop-color="#FDFAF3"/>
          <stop offset="40%"  stop-color="#A8CCEA"/>
          <stop offset="100%" stop-color="#1B4F8A"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <text x="600" y="570" font-family="Arial,sans-serif" font-size="28" font-weight="bold"
        fill="rgba(27,79,138,0.7)" text-anchor="middle" letter-spacing="3">
        907 Kramer Ln  •  Austin, TX 78758  •  (512) 783-0737
      </text>
    </svg>
  `);

  // Get logo dimensions to center it
  const logoMeta = await sharp(logoBuffer).metadata();
  const logoW = logoMeta.width ?? 400;
  const logoH = logoMeta.height ?? 380;
  const left  = Math.round((1200 - logoW) / 2);
  const top   = Math.round((630  - logoH) / 2) - 20;

  await sharp(ogSvgOverlay)
    .composite([{ input: logoBuffer, left, top }])
    .jpeg({ quality: 90 })
    .toFile(LOGO_DEST);
  console.log(`  ✅ og-image.jpg`);

  // ── Icon 192×192 (for manifest / PWA) ──────────────────────────────────
  console.log('\n🔷 Generating icons...');
  await sharp(LOGO_SRC)
    .resize(192, 192, { fit: 'contain', background: { r: 253, g: 250, b: 243, alpha: 1 } })
    .png()
    .toFile(ICON_DEST);
  console.log(`  ✅ icon-192.png`);

  // ── Apple touch icon 180×180 ────────────────────────────────────────────
  await sharp(LOGO_SRC)
    .resize(180, 180, { fit: 'contain', background: { r: 27, g: 79, b: 138, alpha: 1 } })
    .png()
    .toFile(APPLE_DEST);
  console.log(`  ✅ apple-touch-icon.png`);

  console.log('\n🎉 All done!\n');
}

main().catch(console.error);
