'use client';

import { useState } from 'react';
import type { TechStack as TechStackType } from '@/domain/types/portfolio';
import {
  SiGo,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiMysql,
  SiHtml5,
  SiCss3,
  SiPhp,
  SiReact,
  SiNextdotjs,
  SiFastapi,
  SiLaravel,
  SiGit,
  SiPostman,
  SiDocker,
  SiCplusplus,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

interface TechStackProps {
  technologies: TechStackType;
}

// Custom gRPC icon component
function GrpcIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6s-4.298 9.6-9.6 9.6-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4zm0 3.6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 2.4c1.988 0 3.6 1.612 3.6 3.6s-1.612 3.6-3.6 3.6-3.6-1.612-3.6-3.6S10.012 8.4 12 8.4z"/>
    </svg>
  );
}

const iconMap: Record<string, IconType | React.FC<{ className?: string }>> = {
  go: SiGo,
  python: SiPython,
  javascript: SiJavascript,
  typescript: SiTypescript,
  sql: SiMysql,
  html: SiHtml5,
  css: SiCss3,
  php: SiPhp,
  'react-native': SiReact,
  react: SiReact,
  nextjs: SiNextdotjs,
  fastapi: SiFastapi,
  grpc: GrpcIcon,
  laravel: SiLaravel,
  git: SiGit,
  postman: SiPostman,
  docker: SiDocker,
  'c++': SiCplusplus,
};

function TechIcon({ name, icon }: { name: string; icon: string }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const Icon = iconMap[icon.toLowerCase()];

  if (!Icon) return null;

  return (
    <div
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="p-3 bg-[#181B23] rounded-lg hover:bg-[#1F2937] transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-[#2DD4BF]/20 cursor-pointer">
        <Icon className="w-6 h-6 text-[#A1A1AA] group-hover:text-[#2DD4BF] transition-colors duration-200" />
      </div>
      
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 px-3 py-1 bg-[#0F1115] border border-[#2DD4BF] rounded-md whitespace-nowrap z-10 animate-fadeIn">
          <span className="text-xs text-[#EAEAEA] font-medium">{name}</span>
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#2DD4BF]" />
        </div>
      )}
    </div>
  );
}

export function TechStack({ technologies }: TechStackProps) {
  const sections = [
    { title: 'Lenguajes', items: technologies.languages },
    { title: 'Tecnologías', items: technologies.frameworks },
    { title: 'Herramientas', items: technologies.tools },
  ];

  if (technologies.other && technologies.other.length > 0) {
    sections.push({ title: 'Además', items: technologies.other });
  }

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="text-sm font-semibold text-[#5EEAD4] mb-3 uppercase tracking-wider">
            {section.title}
          </h3>
          <div className="flex flex-wrap gap-3">
            {section.items.map((tech) => (
              <TechIcon key={tech.name} name={tech.name} icon={tech.icon} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
