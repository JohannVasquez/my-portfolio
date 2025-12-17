import type { Project } from '@/domain/types/portfolio';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
  reversed?: boolean;
}

export function ProjectCard({ project, reversed = false }: ProjectCardProps) {
  return (
    <article className="bg-[#181B23] rounded-lg overflow-hidden shadow-lg hover:shadow-[#2DD4BF]/20 transition-shadow duration-300">
      <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 lg:gap-8`}>
        {/* Image Section */}
        <div className="relative w-full lg:w-1/2 h-64 lg:h-96 flex-shrink-0">
          {project.videoUrl ? (
            <video
              className="w-full h-full object-contain bg-[#0F1115]"
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
                className="object-contain bg-[#0F1115]"
              />
            </video>
          ) : (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-contain bg-[#0F1115]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 lg:p-8 flex flex-col justify-center w-full lg:w-1/2">
          <h3 className="text-2xl lg:text-3xl font-bold text-[#EAEAEA] mb-4">
            {project.title}
          </h3>
          <p className="text-[#A1A1AA] mb-6 leading-relaxed text-base lg:text-lg">{project.description}</p>
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs lg:text-sm px-3 py-1.5 bg-[#0F1115] text-[#5EEAD4] rounded-full"
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
                className="text-[#2DD4BF] hover:text-[#5EEAD4] transition-colors duration-200 text-sm lg:text-base font-medium"
              >
                Ver proyecto →
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-[#2DD4BF] transition-colors duration-200 text-sm lg:text-base font-medium"
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
