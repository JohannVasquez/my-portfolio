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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <Hero personalInfo={personalInfo} />

        {/* Social Links */}
        <div className="mb-16">
          <SocialLinks links={socialLinks} />
        </div>

        {/* Projects Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-[#EAEAEA] mb-8">
            Proyectos
          </h2>
          <ProjectsGrid projects={projects} />
        </section>

        {/* Contact Section */}
        <Contact socialLinks={socialLinks} />
      </main>
    </div>
  );
}
