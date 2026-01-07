import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { publicEnv } from "@/config/env";
import {
  generateWebSiteJsonLd,
  generateProfilePageJsonLd,
} from "@/lib/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Información del autor para SEO
const authorInfo = {
  name: "Johann Vásquez",
  role: "Software Engineer",
  email: "johannvasquez101@gmail.com",
  description:
    "Software Engineer especializado en desarrollo web moderno. Estudiante de último semestre en la Universidad Técnica Federico Santa María, experto en React, Next.js, Go, Python y PostgreSQL.",
  image: "/profile.webp",
  sameAs: [
    "https://www.linkedin.com/in/johann-vasquez-bello/",
    "https://github.com/JohannVasquez",
  ],
};

// Metadata optimizada para SEO
export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),

  // Título dinámico con template
  title: {
    default: "Johann Vásquez | Software Engineer - Portafolio Profesional",
    template: "%s | Johann Vásquez - Software Engineer",
  },

  // Descripción optimizada con keywords naturales
  description:
    "Portafolio de Johann Vásquez, Software Engineer especializado en React, Next.js, Go y Python. Desarrollo web full-stack, aplicaciones modernas y soluciones escalables. Valparaíso, Chile.",

  // Keywords específicas y relevantes
  keywords: [
    "Johann Vásquez",
    "Software Engineer",
    "Desarrollador Web",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Go Developer",
    "Python Developer",
    "Portafolio Desarrollador",
    "Desarrollo Web Chile",
    "Programador Valparaíso",
    "Universidad Técnica Federico Santa María",
    "TypeScript",
    "PostgreSQL",
    "FastAPI",
    "Docker",
  ],

  // Información del autor
  authors: [{ name: authorInfo.name, url: publicEnv.siteUrl }],
  creator: authorInfo.name,
  publisher: authorInfo.name,

  // URLs canónicas y alternativas
  alternates: {
    canonical: publicEnv.siteUrl,
    languages: {
      "es-CL": publicEnv.siteUrl,
      "es": publicEnv.siteUrl,
    },
  },

  // Clasificación y categoría
  category: "Technology",
  classification: "Portfolio",

  // Robots avanzados
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph optimizado
  openGraph: {
    type: "profile",
    locale: "es_CL",
    alternateLocale: "es_ES",
    url: publicEnv.siteUrl,
    siteName: "Johann Vásquez - Portafolio",
    title: "Johann Vásquez | Software Engineer - Portafolio Profesional",
    description:
      "Portafolio de Johann Vásquez, Software Engineer especializado en React, Next.js, Go y Python. Desarrollo web full-stack y soluciones escalables.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Johann Vásquez - Software Engineer Portfolio",
        type: "image/png",
      },
      {
        url: "/profile.webp",
        width: 800,
        height: 800,
        alt: "Johann Vásquez - Foto de perfil",
        type: "image/jpeg",
      },
    ],
    firstName: "Johann",
    lastName: "Vásquez",
    username: "johannvasquez",
  },

  // Twitter Card optimizado
  twitter: {
    card: "summary_large_image",
    site: "@johannvasquez",
    creator: "@johannvasquez",
    title: "Johann Vásquez | Software Engineer",
    description:
      "Software Engineer especializado en React, Next.js, Go y Python. Portafolio profesional con proyectos modernos.",
    images: {
      url: "/og-image.png",
      alt: "Johann Vásquez - Software Engineer Portfolio",
    },
  },

  // Verificación de plataformas (agregar tus IDs reales)
  verification: {
    // google: "tu-google-verification-code",
    // yandex: "tu-yandex-verification-code",
    // bing: "tu-bing-verification-code",
  },

  // Manifest para PWA
  manifest: "/manifest.json",

  // App links
  appLinks: {
    web: {
      url: publicEnv.siteUrl,
      should_fallback: true,
    },
  },

  // Otros metadatos
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
};

// Viewport optimizado
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generar datos estructurados JSON-LD
  const websiteJsonLd = generateWebSiteJsonLd();
  const profileJsonLd = generateProfilePageJsonLd(authorInfo);

  return (
    <html lang="es" dir="ltr">
      <head>
        {/* Favicon y iconos */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preconexiones para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.google.com" />

        {/* reCAPTCHA */}
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${publicEnv.recaptchaSiteKey}`}
          async
          defer
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profileJsonLd),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
