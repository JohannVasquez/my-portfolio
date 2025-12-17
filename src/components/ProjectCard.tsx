import type { Project } from '@/domain/types/portfolio';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="bg-[#181B23] rounded-lg overflow-hidden shadow-lg hover:shadow-[#2DD4BF]/20 transition-shadow duration-300">
      <div className="relative w-full h-48">
        {project.videoUrl ? (
          <video
            className="w-full h-full object-cover"
            src={project.videoUrl}
            autoPlay
            loop
            muted
            playsInline
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
            />
          </video>
        ) : (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#EAEAEA] mb-2">
          {project.title}
        </h3>
        <p className="text-[#A1A1AA] mb-4">{project.description}</p>
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 bg-[#0F1115] text-[#5EEAD4] rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-4">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2DD4BF] hover:text-[#5EEAD4] transition-colors duration-200 text-sm font-medium"
            >
              Ver proyecto →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A1A1AA] hover:text-[#2DD4BF] transition-colors duration-200 text-sm font-medium"
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
