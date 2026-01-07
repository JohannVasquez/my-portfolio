/**
 * Script para optimizar imágenes del portafolio
 * Convierte imágenes a WebP para mejor rendimiento
 *
 * Ejecutar: node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { readdir, stat, mkdir } from "fs/promises";
import { join, parse } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = join(__dirname, "..", "public");
const OPTIMIZED_DIR = join(PUBLIC_DIR, "optimized");

// Configuración de calidad
const WEBP_QUALITY = 85;
const AVIF_QUALITY = 80;

// Extensiones a procesar
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

// Archivos a ignorar (ya optimizados o especiales)
const IGNORE_FILES = [
    "favicon.ico",
    "favicon.svg",
    "apple-touch-icon.png", // iOS requiere PNG
];

async function ensureDir(dir) {
    try {
        await mkdir(dir, { recursive: true });
    } catch (error) {
        // Directorio ya existe
    }
}

async function getImageFiles() {
    const files = await readdir(PUBLIC_DIR);
    return files.filter((file) => {
        const ext = parse(file).ext.toLowerCase();
        return IMAGE_EXTENSIONS.includes(ext) && !IGNORE_FILES.includes(file);
    });
}

async function optimizeImage(filename) {
    const inputPath = join(PUBLIC_DIR, filename);
    const { name } = parse(filename);

    // Obtener tamaño original
    const originalStats = await stat(inputPath);
    const originalSize = originalStats.size;

    console.log(`\n📸 Procesando: ${filename} (${formatSize(originalSize)})`);

    // Cargar imagen con sharp
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Generar WebP
    const webpPath = join(PUBLIC_DIR, `${name}.webp`);
    await image.webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(webpPath);
    const webpStats = await stat(webpPath);

    console.log(`   ✅ WebP: ${formatSize(webpStats.size)} (${calculateSavings(originalSize, webpStats.size)})`);

    // Generar AVIF (más lento pero más pequeño)
    try {
        const avifPath = join(PUBLIC_DIR, `${name}.avif`);
        await sharp(inputPath)
            .avif({ quality: AVIF_QUALITY, effort: 6 })
            .toFile(avifPath);
        const avifStats = await stat(avifPath);
        console.log(`   ✅ AVIF: ${formatSize(avifStats.size)} (${calculateSavings(originalSize, avifStats.size)})`);
    } catch (error) {
        console.log(`   ⚠️  AVIF: Error al generar (${error.message})`);
    }

    return {
        original: originalSize,
        webp: webpStats.size,
    };
}

function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function calculateSavings(original, optimized) {
    const savings = ((original - optimized) / original) * 100;
    return savings > 0 ? `-${savings.toFixed(1)}%` : `+${Math.abs(savings).toFixed(1)}%`;
}

async function main() {
    console.log("🖼️  Optimizador de Imágenes - Portafolio\n");
    console.log("=".repeat(50));

    const images = await getImageFiles();

    if (images.length === 0) {
        console.log("No se encontraron imágenes para optimizar.");
        return;
    }

    console.log(`\nImágenes encontradas: ${images.join(", ")}`);

    let totalOriginal = 0;
    let totalWebp = 0;

    for (const image of images) {
        const result = await optimizeImage(image);
        totalOriginal += result.original;
        totalWebp += result.webp;
    }

    console.log("\n" + "=".repeat(50));
    console.log(`\n📊 Resumen:`);
    console.log(`   Original total: ${formatSize(totalOriginal)}`);
    console.log(`   WebP total: ${formatSize(totalWebp)}`);
    console.log(`   Ahorro: ${calculateSavings(totalOriginal, totalWebp)}`);
    console.log("\n✨ ¡Optimización completada!");
    console.log("\n💡 Tip: Next.js servirá automáticamente WebP/AVIF a navegadores compatibles.");
}

main().catch(console.error);
