import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Optimización de imágenes para mejor SEO y performance
  images: {
    // Priorizar formatos modernos: AVIF es más pequeño que WebP
    formats: ["image/avif", "image/webp"],

    // Tamaños de dispositivos para srcset responsive
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],

    // Tamaños de imágenes para srcset
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Calidad de compresión (80% es buen balance entre calidad y tamaño)
    // Puedes ajustar entre 60-85 según tus preferencias
    minimumCacheTTL: 60 * 60 * 24 * 365, // Cache por 1 año
  },

  // Habilitar compresión gzip/brotli
  compress: true,

  // Optimizaciones de producción
  poweredByHeader: false, // Remover header X-Powered-By por seguridad
};

export default nextConfig;

