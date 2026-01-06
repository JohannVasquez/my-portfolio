import type { PersonalInfo } from '@/domain/types/portfolio';
import { TechStack } from './TechStack';
import { DownloadCVButton } from './DownloadCVButton';
import Image from 'next/image';
import { formatYearsOfExperience } from '@/utils/date';

interface HeroProps {
  personalInfo: PersonalInfo;
}

export function Hero({ personalInfo }: HeroProps) {
  const { name, role, yearsOfExperience, technologies } = personalInfo;

  return (
    <section className="mb-16" aria-label="Información personal">
      {/* Hidden h1 for SEO - visually the name serves as h1 */}
      <h1 id="hero-heading" className="sr-only">
        {name} - {role} | Portafolio Profesional
      </h1>

      <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8 md:gap-12 mb-8">
        {/* Profile Image */}
        <figure className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-[#2DD4BF] shadow-lg shadow-[#2DD4BF]/20 flex-shrink-0">
          <Image
            src="/profile.jpg"
            alt={`Foto de perfil de ${name}, ${role}`}
            fill
            className="object-cover"
            priority
            itemProp="image"
          />
        </figure>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <p
            className="text-4xl md:text-6xl font-bold text-[#EAEAEA] mb-4"
            itemProp="name"
            aria-label={`Nombre: ${name}`}
          >
            {name}
          </p>
          <p
            className="text-xl md:text-2xl text-[#2DD4BF] mb-2"
            itemProp="jobTitle"
          >
            {role}
          </p>
          <p className="text-[#A1A1AA] text-lg mb-4">
            <span itemProp="description">
              {formatYearsOfExperience(yearsOfExperience)} de experiencia
            </span>
          </p>
          <div className="text-[#A1A1AA] space-y-2 max-w-2xl" itemProp="description">
            <p>
              Estudiante de último semestre en la{' '}
              <span itemProp="alumniOf">Universidad Técnica Federico Santa María</span>.
              Me destaco principalmente en Next.js, Express y PostgreSQL,
              con capacidad de adaptación a cualquier tecnología o framework.
            </p>
            <p className="text-[#5EEAD4]">
              <strong>Abierto a nuevos proyectos y colaboraciones.</strong>
            </p>
          </div>

          {/* Download CV Button */}
          <div className="mt-6 flex justify-center md:justify-start">
            <DownloadCVButton />
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      {technologies && (
        <aside className="mt-8" aria-label="Stack tecnológico">
          <TechStack technologies={technologies} />
        </aside>
      )}
    </section>
  );
}
