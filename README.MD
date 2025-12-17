# Portafolio Personal

Portafolio profesional moderno construido con Next.js 15, TypeScript y Tailwind CSS, siguiendo principios de Clean Architecture. Incluye formulario de contacto seguro con reCAPTCHA v3, rate limiting y protección contra bots.

## 🚀 Tecnologías Utilizadas

### Frontend
- **Next.js 16** - Framework de React con App Router y Server Components
- **TypeScript** - Tipado estático para mayor seguridad
- **Tailwind CSS** - Framework de utilidades CSS
- **@iconify/react** - Iconos de tecnologías con soporte de brand colors

### Backend & Servicios
- **Resend** - Servicio de envío de emails
- **Google reCAPTCHA v3** - Protección invisible contra bots
- **Next.js API Routes** - Endpoints serverless

### Seguridad
- Rate limiting (3 requests/min por IP)
- Honeypot fields para detectar bots
- Validación y sanitización de inputs
- Escape de HTML para prevenir XSS
- Verificación de reCAPTCHA con score mínimo 0.5

### Arquitectura
- **Clean Architecture** - Separación en capas (domain/data/presentation/app)
- **Server-Side Rendering** - Renderizado en el servidor para mejor SEO
- **SEO optimizado** - Metadata completa y estructura semántica

## 📋 Requisitos Previos

- Node.js 18+ instalado
- pnpm (recomendado) o npm
- Cuenta en [Resend](https://resend.com) para envío de emails
- Google reCAPTCHA v3 site key y secret key

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd portafolio
```

### 2. Instalar dependencias

```bash
pnpm install
# o
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Resend API Key (obtener en https://resend.com/api-keys)
RESEND_API_KEY=re_tu_api_key_aqui

# Google reCAPTCHA v3 (obtener en https://www.google.com/recaptcha/admin)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key_aqui
RECAPTCHA_SECRET_KEY=tu_secret_key_aqui
```

#### Cómo obtener las API Keys:

**Resend:**
1. Ve a [resend.com](https://resend.com) y crea una cuenta
2. Ve a API Keys y crea una nueva key
3. Copia la key y pégala en `RESEND_API_KEY`

**Google reCAPTCHA v3:**
1. Ve a [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Registra un nuevo sitio con tipo "reCAPTCHA v3"
3. Copia el "Site Key" a `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
4. Copia el "Secret Key" a `RECAPTCHA_SECRET_KEY`

### 4. Correr el proyecto

```bash
# Modo desarrollo
pnpm dev

# Abrir en el navegador: http://localhost:3000
```

### 5. Build para producción

```bash
# Crear build optimizado
pnpm build

# Ejecutar en producción
pnpm start
```

## 🎨 Personalización

### Información Personal

Edita [src/data/portfolio.ts](src/data/portfolio.ts):

```typescript
export async function getPersonalInfo(): Promise<PersonalInfo> {
  return {
    name: 'Tu Nombre',
    role: 'Tu Título Profesional',
    email: 'tu@email.com',
    // Los años de experiencia se calculan automáticamente desde 2025-01-01
    // Puedes cambiar la fecha en calculateYearsOfExperience('2025-01-01')
    yearsOfExperience: calculateYearsOfExperience('2025-01-01'),
    technologies: {
      // Personaliza tus tecnologías aquí
    }
  };
}
```

### Foto de Perfil

1. Coloca tu foto en `/public/` (ej: `Foto perfil2.jpg`)
2. Actualiza la ruta en [src/components/Hero.tsx](src/components/Hero.tsx):

```tsx
<Image
  src="/tu-foto.jpg"  // ← Cambia aquí
  alt={name}
  fill
  className="object-cover"
  priority
/>
```

### Redes Sociales

En [src/data/portfolio.ts](src/data/portfolio.ts):

```typescript
export async function getSocialLinks(): Promise<SocialLink[]> {
  return [
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/tu-usuario/',
      ariaLabel: 'Visita mi perfil de LinkedIn',
      username: '@tu-usuario',
    },
    {
      platform: 'github',
      url: 'https://github.com/tu-usuario',
      ariaLabel: 'Visita mi perfil de GitHub',
      username: '@tu-usuario',
    },
  ];
}
```

### Proyectos

Actualiza la función `getProjects()`:

```typescript
export async function getProjects(): Promise<Project[]> {
  return [
    {
      id: '1',
      title: 'Nombre del Proyecto',
      description: 'Descripción detallada del proyecto...',
      imageUrl: '/proyecto-demo.png',      // Imagen en /public
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      projectUrl: 'https://tu-proyecto.com',
      githubUrl: 'https://github.com/usuario/repo',
    },
    // Agrega más proyectos...
  ];
}
```

### Stack de Tecnologías

Edita las tecnologías en [src/data/portfolio.ts](src/data/portfolio.ts) dentro de `getPersonalInfo()`:

```typescript
technologies: {
  languages: [
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'Python', icon: 'python' },
  ],
  frameworks: [
    { name: 'React', icon: 'react' },
    { name: 'Next.js', icon: 'nextjs' },
  ],
  databases: [
    { name: 'PostgreSQL', icon: 'postgresql' },
  ],
  tools: [
    { name: 'Git', icon: 'git' },
    { name: 'Docker', icon: 'docker' },
  ],
}
```

Ver todos los iconos disponibles en [Iconify](https://icon-sets.iconify.design/).

### Colores del Tema

Edita [src/app/globals.css](src/app/globals.css):

```css
:root {
  --bg-primary: #0F1115;      /* Fondo principal */
  --bg-secondary: #181B23;    /* Fondo secundario */
  --text-primary: #EAEAEA;    /* Texto principal */
  --text-secondary: #A1A1AA;  /* Texto secundario */
  --accent: #2DD4BF;          /* Color de acento */
  --accent-soft: #5EEAD4;     /* Acento suave */
}
```

### Metadata SEO

Edita [src/app/layout.tsx](src/app/layout.tsx):

```typescript
export const metadata: Metadata = {
  title: "Tu Título - Tu Rol",
  description: "Tu descripción personalizada...",
  keywords: ["tus", "palabras", "clave"],
  authors: [{ name: "Tu Nombre" }],
  // ... más configuración
};
```

## 📁 Estructura del Proyecto

```
portafolio/
├── src/
│   ├── app/              # App Router de Next.js
│   │   ├── api/          # API Routes
│   │   │   └── contact/  # Endpoint de contacto
│   │   ├── globals.css   # Estilos globales
│   │   ├── layout.tsx    # Layout principal
│   │   ├── page.tsx      # Página de inicio
│   │   └── icon.tsx      # Favicon dinámico
│   ├── components/       # Componentes React
│   │   ├── Contact.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectsGrid.tsx
│   │   └── TechStack.tsx
│   ├── config/           # Configuración
│   │   └── env.ts        # Variables de entorno centralizadas
│   ├── data/             # Capa de datos
│   │   └── portfolio.ts  # Datos del portafolio
│   ├── domain/           # Capa de dominio
│   │   └── types/        # Tipos TypeScript
│   └── utils/            # Utilidades
│       └── date.ts       # Funciones de fechas
├── public/               # Archivos estáticos
│   ├── Foto perfil2.jpg
│   └── Validocu-demo.png
├── .env.local           # Variables de entorno (NO subir a git)
├── next.config.ts       # Configuración de Next.js
├── tailwind.config.ts   # Configuración de Tailwind
└── tsconfig.json        # Configuración de TypeScript
```

## 🎨 Características del Diseño

- **Patrón de cuadros sutil** en el fondo (estilo cuaderno)
- **Header fijo** con scroll suave entre secciones
- **Diseño responsive** optimizado para móviles, tablets y desktop
- **Animaciones suaves** en hover y transiciones
- **Tema oscuro** con paleta de colores profesional
- **Iconos de tecnologías** con tooltips informativos
- **Proyectos con layout alternado** (imagen izquierda/derecha)
- **Formulario de contacto** con validación en tiempo real
- **Contador de caracteres** en campos del formulario
- **Copiar email** con tooltip de confirmación

## 🔒 Seguridad

El formulario de contacto incluye múltiples capas de seguridad:

1. **Rate Limiting**: Máximo 3 solicitudes por minuto por IP
2. **Honeypot Field**: Campo oculto para detectar bots
3. **reCAPTCHA v3**: Verificación invisible con score mínimo de 0.5
4. **Validación de Inputs**: Límites de caracteres y formato de email
5. **Sanitización**: Escape de HTML para prevenir XSS
6. **Validación Backend**: Todas las validaciones se replican en el servidor

## 📝 Scripts Disponibles

```bash
pnpm dev        # Desarrollo en localhost:3000
pnpm build      # Build de producción
pnpm start      # Servidor de producción
pnpm lint       # Linter de código
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Push tu código a GitHub
2. Importa el proyecto en [vercel.com](https://vercel.com)
3. Configura las variables de entorno en Vercel:
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `RECAPTCHA_SECRET_KEY`
4. Deploy automático

### Otras plataformas

El proyecto es compatible con cualquier plataforma que soporte Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

---

Desarrollado con ❤️ usando Next.js 15
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
