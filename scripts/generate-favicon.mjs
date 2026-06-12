/**
 * generate-favicon.mjs
 * Creates favicon.ico (32x32 PNG, renamed to .ico — browsers accept this)
 */
import sharp from 'sharp';

await sharp('public/logo-504-catracha.png')
  .resize(32, 32, {
    fit: 'contain',
    background: { r: 253, g: 250, b: 243, alpha: 1 },
  })
  .png()
  .toFile('public/favicon-32.png');

// Copy as favicon.ico (modern browsers accept PNG renamed to .ico)
import { copyFile } from 'fs/promises';
await copyFile('public/favicon-32.png', 'public/favicon.ico');

console.log('favicon.ico  OK (32x32)');
