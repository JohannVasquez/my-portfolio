import type { PersonalInfo, Project, SocialLink } from '@/domain/types/portfolio';

// Mock data - Replace with real data or fetch from API/Database
export async function getPersonalInfo(): Promise<PersonalInfo> {
  return {
    name: 'Tu Nombre',
    role: 'Tu Oficio',
    yearsOfExperience: 0, // Cambia este valor
    technologies: {
      languages: [
        { name: 'Go', icon: 'go' },
        { name: 'Python', icon: 'python' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'SQL', icon: 'sql' },
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
      other: [
        { name: 'C++', icon: 'c++', category: 'Programación competitiva' },
      ],
    },
  };
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  return [
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/tu-usuario', // Cambia este URL
      ariaLabel: 'Visita mi perfil de LinkedIn',
    },
    {
      platform: 'github',
      url: 'https://github.com/tu-usuario', // Cambia este URL
      ariaLabel: 'Visita mi perfil de GitHub',
    },
  ];
}

export async function getProjects(): Promise<Project[]> {
  // Replace with real data from API, CMS, or database
  return [
    {
      id: '1',
      title: 'Proyecto 1',
      description: 'Descripción del proyecto 1. Una aplicación web moderna desarrollada con las últimas tecnologías.',
      imageUrl: '/placeholder-project.svg',
      technologies: ['React', 'TypeScript', 'Next.js'],
      projectUrl: 'https://ejemplo.com',
      githubUrl: 'https://github.com/usuario/proyecto1',
    },
    {
      id: '2',
      title: 'Proyecto 2',
      description: 'Descripción del proyecto 2. Sistema de gestión con backend robusto y UI intuitiva.',
      imageUrl: '/placeholder-project.svg',
      // videoUrl: '/placeholder-video.mp4', // Opcional: video demo
      technologies: ['Node.js', 'PostgreSQL', 'Docker'],
      projectUrl: 'https://ejemplo.com',
      githubUrl: 'https://github.com/usuario/proyecto2',
    },
    {
      id: '3',
      title: 'Proyecto 3',
      description: 'Descripción del proyecto 3. Aplicación móvil multiplataforma con diseño responsivo.',
      imageUrl: '/placeholder-project.svg',
      technologies: ['React Native', 'Firebase', 'Redux'],
      projectUrl: 'https://ejemplo.com',
    },
  ];
}
