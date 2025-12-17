import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { SocialLinks } from '@/components/SocialLinks';
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
    <div className="min-h-screen bg-[#0F1115]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section id="inicio" className="pt-16 scroll-mt-16">
          <Hero personalInfo={personalInfo} />
        </section>

        {/* Tech Stack Section */}
        <section id="tecnologias" className="mb-16 pt-24 scroll-mt-24">
          <SocialLinks links={socialLinks} />
        </section>

        {/* Projects Section */}
        <section id="proyectos" className="mb-24 scroll-mt-16">
          <h2 className="text-3xl font-bold text-[#EAEAEA] mb-8">
            Proyectos
          </h2>
          <ProjectsGrid projects={projects} />
        </section>

        {/* Contact Section */}
        <section id="contacto" className="scroll-mt-16">
          <Contact socialLinks={socialLinks} />
        </section>
      </main>
    </div>
  );
}
