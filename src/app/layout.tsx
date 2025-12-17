import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Portafolio - Desarrollador Full Stack",
  description: "Portafolio profesional de desarrollador con experiencia en desarrollo web moderno. Explora mis proyectos y habilidades.",
  keywords: ["desarrollador", "portafolio", "web developer", "full stack", "react", "next.js"],
  authors: [{ name: "Tu Nombre" }],
  openGraph: {
    title: "Portafolio - Desarrollador Full Stack",
    description: "Portafolio profesional de desarrollador con experiencia en desarrollo web moderno.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portafolio - Desarrollador Full Stack",
    description: "Portafolio profesional de desarrollador con experiencia en desarrollo web moderno.",
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
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
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
