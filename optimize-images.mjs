/**
 * optimize-images.mjs
 *
 * Genera variantes optimizadas de img1.jpg → img16.jpg
 * desde public/styles/ hacia public/stylesoptimized/
 *
 * Variantes generadas por imagen:
 *   img1.desktop.webp  — 1920px, WebP  (slider desktop)
 *   img1.desktop.jpg   — 1920px, JPEG  (fallback desktop)
 *   img1.mobile.webp   —  900px, WebP  (slider mobile)
 *   img1.mobile.jpg    —  900px, JPEG  (fallback mobile)
 *   img1.thumb.webp    —  300px, WebP  (previews/thumbnails)
 *   img1.thumb.jpg     —  300px, JPEG  (fallback thumbnails)
 *
 * Uso:
 *   node optimize-images.mjs
 *
 * Requiere:
 *   npm install sharp
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Configuración ────────────────────────────────────────────────────────────

const INPUT_DIR  = path.join(__dirname, "public", "styles");
const OUTPUT_DIR = path.join(__dirname, "public", "stylesoptimized");
const TOTAL      = 16;

const VARIANTS = [
  {
    suffix: "desktop",
    width:  1920,
    webpQuality:  82,
    jpegQuality:  85,
  },
  {
    suffix: "mobile",
    width:  900,
    webpQuality:  80,
    jpegQuality:  82,
  },
  {
    suffix: "thumb",
    width:  300,
    webpQuality:  75,
    jpegQuality:  78,
  },
];

// ─── Manifest ────────────────────────────────────────────────────────────────

const manifest = { images: [] };

// ─── Helpers ─────────────────────────────────────────────────────────────────

const toKB = (bytes) => (bytes / 1024).toFixed(1) + " KB";

function log(msg) {
  process.stdout.write(msg + "\n");
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function processImage(index) {
  const name      = `img${index}`;
  const inputPath = path.join(INPUT_DIR, `${name}.jpg`);

  if (!fs.existsSync(inputPath)) {
    log(`  ⚠️  No encontrado: ${inputPath} — saltando`);
    return null;
  }

  const originalSize = fs.statSync(inputPath).size;
  const entry = {
    name,
    original: `/styles/${name}.jpg`,
  };

  log(`\n📸 ${name}.jpg (${toKB(originalSize)})`);

  for (const variant of VARIANTS) {
    const { suffix, width, webpQuality, jpegQuality } = variant;
    const pipeline = sharp(inputPath).resize({ width, withoutEnlargement: true });

    // WebP
    const webpFile = `${name}.${suffix}.webp`;
    const webpPath = path.join(OUTPUT_DIR, webpFile);
    await pipeline.clone().webp({ quality: webpQuality }).toFile(webpPath);
    const webpSize = fs.statSync(webpPath).size;
    entry[`${suffix}_webp`] = `/stylesoptimized/${webpFile}`;
    log(`  ✅ ${webpFile.padEnd(28)} ${toKB(webpSize).padStart(10)}`);

    // JPEG
    const jpgFile = `${name}.${suffix}.jpg`;
    const jpgPath = path.join(OUTPUT_DIR, jpgFile);
    await pipeline.clone().jpeg({ quality: jpegQuality, progressive: true }).toFile(jpgPath);
    const jpgSize = fs.statSync(jpgPath).size;
    entry[`${suffix}_jpg`] = `/stylesoptimized/${jpgFile}`;
    log(`  ✅ ${jpgFile.padEnd(28)} ${toKB(jpgSize).padStart(10)}`);
  }

  // Ahorro total vs original
  const desktopWebpSize = fs.statSync(path.join(OUTPUT_DIR, `${name}.desktop.webp`)).size;
  const saving = (((originalSize - desktopWebpSize) / originalSize) * 100).toFixed(1);
  log(`  💾 Ahorro desktop WebP vs original: ${saving}%`);

  return entry;
}

async function run() {
  log("\n🚀 Vilarnau — Optimización de imágenes\n");
  log(`   Input:  ${INPUT_DIR}`);
  log(`   Output: ${OUTPUT_DIR}`);
  log(`   Imágenes: img1.jpg → img${TOTAL}.jpg\n`);

  // Crear carpeta output si no existe
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const startTime = Date.now();

  for (let i = 1; i <= TOTAL; i++) {
    const entry = await processImage(i);
    if (entry) manifest.images.push(entry);
  }

  // Escribir manifest en /public
  const manifestPath = path.join(__dirname, "public", "media-manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  log(`\n📄 Manifest generado: public/media-manifest.json`);

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  log(`\n✨ Listo en ${elapsed}s — ${manifest.images.length} imágenes procesadas\n`);
}

run().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});