import type { PersonalInfo } from '@/domain/types/portfolio';
import { TechStack } from './TechStack';
import Image from 'next/image';

interface HeroProps {
  personalInfo: PersonalInfo;
}

export function Hero({ personalInfo }: HeroProps) {
  const { name, role, yearsOfExperience, technologies } = personalInfo;

  return (
    <section className="mb-16">
      <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8 md:gap-12 mb-8">
        {/* Profile Image */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-[#2DD4BF] shadow-lg shadow-[#2DD4BF]/20 flex-shrink-0">
          <Image
            src="/Foto perfil2.jpg"
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-[#EAEAEA] mb-4">
            {name}
          </h1>
          <p className="text-xl md:text-2xl text-[#2DD4BF] mb-2">{role}</p>
          <p className="text-[#A1A1AA] text-lg mb-4">
            {yearsOfExperience} {yearsOfExperience === 1 ? 'año' : 'años'} de experiencia
          </p>
          <div className="text-[#A1A1AA] space-y-2 max-w-2xl">
            <p>
              Egresado de la Universidad Técnica Federico Santa María. Me destaco principalmente en Next.js, Express y PostgreSQL, 
              con capacidad de adaptación a cualquier tecnología o framework.
            </p>
            <p className="text-[#5EEAD4]">
              Abierto a nuevos proyectos y colaboraciones.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      {technologies && (
        <div className="mt-8">
          <TechStack technologies={technologies} />
        </div>
      )}
    </section>
  );
}
