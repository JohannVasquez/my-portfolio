'use client';

import { useState } from 'react';
import type { TechStack as TechStackType } from '@/domain/types/portfolio';
import { Icon } from '@iconify/react';

interface TechStackProps {
  technologies: TechStackType;
}

const iconMap: Record<string, string> = {
  go: 'logos:go',
  python: 'logos:python',
  javascript: 'logos:javascript',
  typescript: 'logos:typescript-icon',
  sql: 'logos:mysql',
  html: 'logos:html-5',
  css: 'logos:css-3',
  php: 'logos:php',
  react: 'logos:react',
  'react-native': 'logos:react',
  nextjs: 'logos:nextjs-icon',
  fastapi: 'logos:fastapi-icon',
  grpc: 'logos:grpc',
  laravel: 'logos:laravel',
  git: 'logos:git-icon',
  postman: 'logos:postman-icon',
  docker: 'logos:docker-icon',
  'c++': 'logos:c-plusplus',
};

type TechItem = {
  name: string;
  icon: string;
};

function mergeReactTech(items: TechItem[]) {
  const hasReact = items.find((t) => t.icon.toLowerCase() === 'react');
  const hasReactNative = items.find((t) => t.icon.toLowerCase() === 'react-native');

  if (!hasReact && !hasReactNative) {
    return items;
  }

  const mergedItem: TechItem = {
    name: 'React · React Native',
    icon: 'react',
  };

  return [
    mergedItem,
    ...items.filter(
      (t) =>
        t.icon.toLowerCase() !== 'react' &&
        t.icon.toLowerCase() !== 'react-native'
    ),
  ];
}


function TechIcon({ name, icon }: { name: string; icon: string }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const iconKey = icon.toLowerCase();
  const iconName = iconMap[iconKey];

  if (!iconName) return null;

  return (
    <div
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="p-3 bg-[#181B23] rounded-lg hover:bg-[#1F2937] transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-[#2DD4BF]/20 cursor-pointer">
        <Icon icon={iconName} width={32} height={32} />
      </div>

      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 px-3 py-1 bg-[#0F1115] border border-[#2DD4BF] rounded-md whitespace-nowrap z-10">
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
      {sections.map((section) => {
        const mergedItems = mergeReactTech(section.items);

        return (
          <div key={section.title}>
            <h3 className="text-sm font-semibold text-[#5EEAD4] mb-3 uppercase tracking-wider">
              {section.title}
            </h3>

            <div className="flex flex-wrap gap-3">
              {mergedItems.map((tech) => (
                <TechIcon
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
