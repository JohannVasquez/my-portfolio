# Portafolio Personal

Portafolio profesional construido con Next.js 15, TypeScript, Tailwind CSS siguiendo principios de Clean Architecture.

## 🎨 Características

- ✅ Server-Side Rendering (SSR)
- ✅ SEO optimizado con metadata
- ✅ Clean Architecture
- ✅ Tema oscuro personalizado
- ✅ Responsive design
- ✅ TypeScript para type safety
- ✅ Componentes reutilizables

## 🎯 Configuración Inicial

### 1. Información Personal

Edita el archivo [src/data/portfolio.ts](src/data/portfolio.ts):

```typescript
export async function getPersonalInfo(): Promise<PersonalInfo> {
  return {
    name: 'Tu Nombre',           // ← Cambia aquí
    role: 'Tu Oficio',            // ← Cambia aquí
    yearsOfExperience: 0,         // ← Cambia aquí
  };
}
```

### 2. Links Sociales

En el mismo archivo, actualiza tus URLs:

```typescript
export async function getSocialLinks(): Promise<SocialLink[]> {
  return [
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/tu-usuario', // ← Cambia aquí
      ariaLabel: 'Visita mi perfil de LinkedIn',
    },
    {
      platform: 'github',
      url: 'https://github.com/tu-usuario',      // ← Cambia aquí
      ariaLabel: 'Visita mi perfil de GitHub',
    },
  ];
}
```

### 3. Proyectos

Actualiza la función `getProjects()` con tus proyectos reales:

```typescript
{
  id: '1',
  title: 'Nombre del Proyecto',
  description: 'Descripción detallada...',
  imageUrl: '/mi-proyecto.jpg',          // Imagen en /public
  videoUrl: '/demo.mp4',                 // Opcional
  technologies: ['React', 'TypeScript'],
  projectUrl: 'https://...',             // URL del proyecto
  githubUrl: 'https://github.com/...',   // URL del repositorio
}
```

### 4. Imágenes

Coloca las imágenes de tus proyectos en la carpeta `/public`:
- `/public/proyecto1.jpg`
- `/public/proyecto2.png`
- etc.

## 🚀 Comandos

```bash
# Instalar dependencias
pnpm install

# Modo desarrollo
pnpm dev

# Build para producción
pnpm build

# Iniciar servidor de producción
pnpm start

# Linting
pnpm lint

# Formatear código
pnpm format
```

## 🎨 Colores del Tema

| Color | Hex | Uso |
|-------|-----|-----|
| Fondo principal | `#0F1115` | Background principal |
| Fondo secundario | `#181B23` | Cards, secciones |
| Texto principal | `#EAEAEA` | Títulos, texto importante |
| Texto secundario | `#A1A1AA` | Texto descriptivo |
| Acento | `#2DD4BF` | Enlaces, highlights |
| Acento suave | `#5EEAD4` | Hover states |

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal con metadata SEO
│   ├── page.tsx            # Página de inicio (SSR)
│   └── globals.css         # Estilos globales
├── components/
│   ├── Hero.tsx            # Sección hero
│   ├── SocialLinks.tsx     # Links sociales con iconos
│   ├── ProjectCard.tsx     # Card individual de proyecto
│   └── ProjectsGrid.tsx    # Grid de proyectos
├── domain/
│   └── types/
│       └── portfolio.ts    # TypeScript interfaces
└── data/
    └── portfolio.ts        # Data layer (SSR functions)
```

## 🏗️ Arquitectura

Este proyecto sigue principios de Clean Architecture:

- **Domain Layer** (`src/domain`): Tipos e interfaces
- **Data Layer** (`src/data`): Lógica de obtención de datos
- **Presentation Layer** (`src/components`, `src/app`): UI y componentes

## 📱 Responsive

El portafolio es completamente responsive:
- Mobile first design
- Grid adaptativo para proyectos
- Tipografía escalable

## 🔍 SEO

- Metadata optimizada en `layout.tsx`
- Semantic HTML
- Open Graph tags
- Twitter Card tags
- Lang attribute configurado

## 📝 Licencia

MIT
