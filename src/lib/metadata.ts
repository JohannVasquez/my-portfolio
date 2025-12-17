import type { Metadata } from 'next';

export function generateMetadata(params: {
  name?: string;
  role?: string;
}): Metadata {
  const title = params.name 
    ? `${params.name} - ${params.role || 'Desarrollador'}` 
    : 'Portafolio Profesional';
  
  const description = params.role
    ? `Portafolio profesional de ${params.name || 'desarrollador'}, ${params.role}. Explora mis proyectos y experiencia.`
    : 'Portafolio profesional de desarrollador con experiencia en desarrollo web moderno.';

  return {
    title,
    description,
    keywords: [
      'desarrollador',
      'portafolio',
      'web developer',
      'full stack',
      'react',
      'next.js',
      params.role || '',
    ].filter(Boolean),
    authors: [{ name: params.name || 'Desarrollador' }],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
