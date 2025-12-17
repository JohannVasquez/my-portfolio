'use client';

import { useState } from 'react';
import type { SocialLink } from '@/domain/types/portfolio';
import { ContactForm } from './ContactForm';

interface ContactProps {
  socialLinks: SocialLink[];
  email: string;
}

export function Contact({ socialLinks, email }: ContactProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#EAEAEA] mb-4">
          Contacto
        </h2>
        <p className="text-[#A1A1AA] text-lg">
          ¿Tienes algún proyecto en mente? Envíame un mensaje
        </p>
      </div>

      {/* Email con botón de copiar */}
      <div className="mb-8 p-4 bg-[#181B23] rounded-lg group hover:bg-[#1F2937] transition-all duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#A1A1AA] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div className="min-w-0 flex-1">
              <p className="text-[#EAEAEA] font-medium text-sm sm:text-base">Email</p>
              <p className="text-[#A1A1AA] text-xs sm:text-sm truncate">{email}</p>
            </div>
          </div>
          <div className="relative flex-shrink-0 sm:ml-4">
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto px-4 py-2 bg-[#2DD4BF]/10 text-[#2DD4BF] rounded-lg hover:bg-[#2DD4BF]/20 transition-colors duration-200 text-sm font-medium"
            >
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
            {copied && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-[#0F1115] border border-[#2DD4BF] rounded-md whitespace-nowrap z-10 animate-fadeIn">
                <span className="text-xs text-[#EAEAEA] font-medium">Correo copiado al portapapeles</span>
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#2DD4BF]" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-[#181B23] rounded-lg p-8 shadow-lg mb-12">
        <h3 className="text-xl font-semibold text-[#EAEAEA] mb-6">
          Envíame un mensaje
        </h3>
        <ContactForm />
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-xl font-semibold text-[#EAEAEA] mb-6 text-center">
          Encuéntrame en
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-[#181B23] rounded-lg hover:bg-[#1F2937] transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#2DD4BF]/20 group"
              aria-label={link.ariaLabel}
            >
              {link.platform === 'linkedin' && (
                <svg
                  className="w-6 h-6 text-[#A1A1AA] group-hover:text-[#2DD4BF] transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              )}
              {link.platform === 'github' && (
                <svg
                  className="w-8 h-8 text-[#A1A1AA] group-hover:text-[#2DD4BF] transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <div>
                <p className="text-[#EAEAEA] font-medium capitalize">
                  {link.platform}
                </p>
                <p className="text-[#A1A1AA] text-sm">
                  {link.username || `Visita mi perfil de ${link.platform}`}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
