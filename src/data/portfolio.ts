import type { PersonalInfo, Project, SocialLink } from '@/domain/types/portfolio';
import { calculateYearsOfExperience } from '@/utils/date';

// Mock data - Replace with real data or fetch from API/Database
export async function getPersonalInfo(): Promise<PersonalInfo> {
  return {
    name: 'Johann Vásquez',
    role: 'Software Engineer',
    email: 'johannvasquez101@gmail.com',
    yearsOfExperience: calculateYearsOfExperience('2025-01-01'), // Calculado dinámicamente desde enero 2025
    technologies: {
      languages: [
        { name: 'Go', icon: 'go' },
        { name: 'Python', icon: 'python' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'HTML', icon: 'html' },
        { name: 'CSS', icon: 'css' },
        { name: 'PHP', icon: 'php' },
      ],
      frameworks: [
        { name: 'React Native', icon: 'react-native' },
        { name: 'React', icon: 'react' },
        { name: 'Next.js', icon: 'nextjs' },
        { name: 'FastAPI', icon: 'fastapi' },
        { name: 'gRPC', icon: 'grpc' },
        { name: 'Laravel', icon: 'laravel' },
      ],
      tools: [
        { name: 'Git', icon: 'git' },
        { name: 'Postman', icon: 'postman' },
        { name: 'Docker', icon: 'docker' },
      ],
      databases: [
        { name: 'MySQL', icon: 'mysql' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'MongoDB', icon: 'mongodb' },
      ],
      other: [
        // { name: 'C++', icon: 'c++', category: 'Programación competitiva' },
      ],
    },
  };
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  return [
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/johann-vasquez-bello/',
      ariaLabel: 'Visita mi perfil de LinkedIn',
      username: '@johann-vasquez-bello',
    },
    {
      platform: 'github',
      url: 'https://github.com/JohannVasquez',
      ariaLabel: 'Visita mi perfil de GitHub',
      username: '@JohannVasquez',
    },
  ];
}

export async function getProjects(): Promise<Project[]> {
  return [
    {
      id: '1',
      title: 'Validocu',
      description: 'Plataforma para automatizar la validación de documentos como contratos mediante inteligencia artificial. Desarrollado entre abril y mediados de noviembre de 2025, fue presentado en la Feria de Software 2025 de la Universidad Técnica Federico Santa María en Valparaíso.',
      imageUrl: '/Validocu-demo.png',
      technologies: ['React', 'Laravel', 'FastAPI', 'PostgreSQL'],
      projectUrl: 'https://validocu.feriadesoftware.cl',
      // githubUrl: 'https://github.com/tu-usuario/validocu',
    },
  ];
}
