import type { Project } from '@/domain/types/portfolio';
import { ProjectCard } from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <p className="text-[#A1A1AA] text-center">
        No hay proyectos disponibles en este momento.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {projects.map((project, index) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          reversed={index % 2 !== 0}
        />
      ))}
    </div>
  );
}
