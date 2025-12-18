import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { publicEnv } from "@/config/env";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: "Portafolio - Software Engineer",
  description: "Portafolio de desarrollador con experiencia en desarrollo web moderno. Explora mis proyectos y habilidades.",
  keywords: ["desarrollador", "portafolio", "web developer", "full stack", "react", "next.js"],
  authors: [{ name: "Johann Vásquez" }],
  openGraph: {
    title: "Portafolio - Software Engineer",
    description: "Portafolio de desarrollador con experiencia en desarrollo web moderno.",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'JV - Portafolio Software Engineer',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portafolio - Software Engineer",
    description: "Portafolio de desarrollador con experiencia en desarrollo web moderno.",
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${publicEnv.recaptchaSiteKey}`}
          async
          defer
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
