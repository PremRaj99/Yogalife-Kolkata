// Compresses every image in src/assets/gallery to ~8-10 KB and groups them
// into date folders (YYYY-MM-DD) in src/assets/gallery-optimized.
// Originals are never modified.
//
// Usage (from /client):  npm run optimize:gallery

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(__dirname, "../src/assets/gallery");
const OUT_DIR = path.resolve(__dirname, "../src/assets/gallery-optimized");

const MAX_BYTES = 10 * 1024;
const START_WIDTH = 800;
const MIN_WIDTH = 200;
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

// WhatsApp strips EXIF, so the date comes from the file name first,
// then EXIF DateTimeOriginal, then the file's modified time.
async function getDate(filePath, fileName) {
  const match = fileName.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (match) return `${match[1]}-${match[2]}-${match[3]}`;

  const { exif } = await sharp(filePath).metadata();
  const exifDate = exif?.toString("latin1").match(/(\d{4}):(\d{2}):(\d{2}) \d{2}:\d{2}:\d{2}/);
  if (exifDate) return `${exifDate[1]}-${exifDate[2]}-${exifDate[3]}`;

  const { mtime } = await fs.stat(filePath);
  return mtime.toISOString().slice(0, 10);
}

const encode = (input, width, quality) =>
  sharp(input)
    .rotate() // respect orientation
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

// Find the highest quality that fits under MAX_BYTES; shrink width if needed.
async function compress(input) {
  for (let width = START_WIDTH; width >= MIN_WIDTH; width = Math.round(width * 0.85)) {
    let lo = 20, hi = 85, best = null;
    while (lo <= hi) {
      const q = Math.floor((lo + hi) / 2);
      const buf = await encode(input, width, q);
      if (buf.length <= MAX_BYTES) { best = buf; lo = q + 1; } else { hi = q - 1; }
    }
    if (best) return best;
  }
  return encode(input, MIN_WIDTH, 20); // fallback: smallest possible
}

async function main() {
  const files = (await fs.readdir(SRC_DIR)).filter((f) =>
    IMAGE_EXT.has(path.extname(f).toLowerCase())
  );

  console.log(`Processing ${files.length} images...`);
  for (const file of files) {
    const input = path.join(SRC_DIR, file);
    const date = await getDate(input, file);
    const outFolder = path.join(OUT_DIR, date);
    await fs.mkdir(outFolder, { recursive: true });

    const buf = await compress(input);
    const outName = path.parse(file).name + ".jpg";
    await fs.writeFile(path.join(outFolder, outName), buf);
    console.log(`${date}/${outName}  ${(buf.length / 1024).toFixed(1)} KB`);
  }
  console.log(`Done. Output: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
