import type { PersonalInfo } from '@/domain/types/portfolio';
import { TechStack } from './TechStack';

interface HeroProps {
  personalInfo: PersonalInfo;
}

export function Hero({ personalInfo }: HeroProps) {
  const { name, role, yearsOfExperience, technologies } = personalInfo;

  return (
    <section className="mb-16">
      <h1 className="text-4xl md:text-6xl font-bold text-[#EAEAEA] mb-4">
        {name}
      </h1>
      <p className="text-xl md:text-2xl text-[#2DD4BF] mb-2">{role}</p>
      <p className="text-[#A1A1AA] text-lg mb-8">
        {yearsOfExperience} {yearsOfExperience === 1 ? 'año' : 'años'} de experiencia
      </p>

      {/* Tech Stack Section */}
      {technologies && (
        <div className="mt-8">
          <TechStack technologies={technologies} />
        </div>
      )}
    </section>
  );
}
