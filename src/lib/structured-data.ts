import { publicEnv } from '@/config/env';

/**
 * JSON-LD Structured Data para SEO
 * Siguiendo especificaciones de Schema.org
 */

export interface PersonData {
    name: string;
    role: string;
    email: string;
    description: string;
    image: string;
    sameAs: string[];
}

export function generatePersonJsonLd(person: PersonData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: person.name,
        jobTitle: person.role,
        email: `mailto:${person.email}`,
        description: person.description,
        image: `${publicEnv.siteUrl}${person.image}`,
        url: publicEnv.siteUrl,
        sameAs: person.sameAs,
        alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Universidad Técnica Federico Santa María',
            url: 'https://usm.cl',
        },
        knowsAbout: [
            'Desarrollo Web',
            'React',
            'Next.js',
            'TypeScript',
            'Node.js',
            'Go',
            'Python',
            'PostgreSQL',
            'MongoDB',
            'Docker',
            'Git',
        ],
    };
}

export function generateWebSiteJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Johann Vásquez - Portafolio',
        alternateName: 'Johann Vásquez Portfolio',
        url: publicEnv.siteUrl,
        description: 'Portafolio profesional de Johann Vásquez, Software Engineer especializado en desarrollo web moderno con React, Next.js, Go y Python.',
        inLanguage: 'es-CL',
        author: {
            '@type': 'Person',
            name: 'Johann Vásquez',
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: `${publicEnv.siteUrl}/?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };
}

export function generateBreadcrumbJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Inicio',
                item: publicEnv.siteUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Proyectos',
                item: `${publicEnv.siteUrl}/#proyectos`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'Contacto',
                item: `${publicEnv.siteUrl}/#contacto`,
            },
        ],
    };
}

export function generateProfilePageJsonLd(person: PersonData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: generatePersonJsonLd(person),
        dateCreated: '2025-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        breadcrumb: generateBreadcrumbJsonLd(),
    };
}
