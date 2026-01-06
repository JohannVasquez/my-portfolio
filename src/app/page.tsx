import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { Contact } from '@/components/Contact';
import { getPersonalInfo, getSocialLinks, getProjects } from '@/data/portfolio';

export default async function Home() {
  // Server-side data fetching
  const [personalInfo, socialLinks, projects] = await Promise.all([
    getPersonalInfo(),
    getSocialLinks(),
    getProjects(),
  ]);

  return (
    <div className="min-h-screen" itemScope itemType="https://schema.org/WebPage">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#2DD4BF] focus:text-[#0A0A0A] focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Saltar al contenido principal
      </a>

      <Header socialLinks={socialLinks} />

      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        role="main"
        aria-label="Contenido principal del portafolio"
      >
        {/* Hero Section - About */}
        <section
          id="inicio"
          className="pt-16 scroll-mt-16"
          aria-labelledby="hero-heading"
          itemScope
          itemType="https://schema.org/Person"
        >
          <Hero personalInfo={personalInfo} />
        </section>

        {/* Projects Section */}
        <section
          id="proyectos"
          className="mb-24 scroll-mt-16"
          aria-labelledby="projects-heading"
        >
          <h2
            id="projects-heading"
            className="text-3xl font-bold text-[#EAEAEA] mb-8"
          >
            Proyectos Destacados
          </h2>
          <ProjectsGrid projects={projects} />
        </section>

        {/* Contact Section */}
        <section
          id="contacto"
          className="scroll-mt-16"
          aria-labelledby="contact-heading"
        >
          <Contact socialLinks={socialLinks} email={personalInfo.email} />
        </section>
      </main>

      {/* Footer for SEO */}
      <footer className="border-t border-[#27272A] mt-16 py-8 text-center text-[#A1A1AA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p itemProp="copyrightHolder">
            © {new Date().getFullYear()} Johann Vásquez. Todos los derechos reservados.
          </p>
          <p className="mt-2 text-sm">
            Software Engineer | React, Next.js, Go, Python
          </p>
        </div>
      </footer>
    </div>
  );
}
