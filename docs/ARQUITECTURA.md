# 📂 Estructura del Proyecto

## Arquitectura Implementada

Este portafolio sigue los principios de **Clean Architecture**, separando las responsabilidades en capas claramente definidas:

```
src/
├── domain/              # 🏛️ CAPA DE DOMINIO
│   └── types/
│       └── portfolio.ts # Interfaces y tipos TypeScript
│
├── data/                # 📊 CAPA DE DATOS
│   └── portfolio.ts     # Funciones de obtención de datos (SSR)
│
├── components/          # 🎨 CAPA DE PRESENTACIÓN
│   ├── Hero.tsx        # Componente de sección hero
│   ├── SocialLinks.tsx # Componente de enlaces sociales
│   ├── ProjectCard.tsx # Componente de tarjeta de proyecto
│   └── ProjectsGrid.tsx# Grid de proyectos
│
├── app/                 # 🚀 CAPA DE APLICACIÓN
│   ├── layout.tsx      # Layout raíz con metadata SEO
│   ├── page.tsx        # Página principal (Server Component)
│   └── globals.css     # Estilos globales con variables CSS
│
└── lib/                 # 🛠️ UTILIDADES
    └── metadata.ts     # Helper para metadata dinámica
```

## 🔄 Flujo de Datos (Server-Side Rendering)

```
1. Usuario solicita página
        ↓
2. Next.js ejecuta page.tsx en el servidor
        ↓
3. getPersonalInfo(), getSocialLinks(), getProjects()
   obtienen datos (podrían ser de API/DB)
        ↓
4. Componentes reciben datos como props
        ↓
5. HTML renderizado es enviado al cliente
        ↓
6. Navegador muestra la página completa
```

## 📋 Responsabilidades por Capa

### Domain Layer (`src/domain/`)
- Define las interfaces y tipos de datos
- No depende de ninguna otra capa
- Representa las entidades del negocio:
  - `PersonalInfo`: Información personal
  - `SocialLink`: Enlaces a redes sociales
  - `Project`: Estructura de un proyecto

### Data Layer (`src/data/`)
- Maneja la obtención de datos
- Podría conectarse a APIs, databases, CMS
- Actualmente retorna datos mock
- Funciones async preparadas para SSR
- **Para producción**: Reemplaza con llamadas reales a APIs

```typescript
// Ejemplo: Obtener de API
export async function getProjects(): Promise<Project[]> {
  const res = await fetch('https://api.ejemplo.com/projects');
  return res.json();
}

// Ejemplo: Obtener de Database
export async function getProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany();
  return projects;
}
```

### Presentation Layer (`src/components/`)
- Componentes React reutilizables
- Reciben datos vía props
- No tienen lógica de negocio
- Server Components por defecto (más rápidos)

**Componentes creados:**
- `Hero`: Muestra nombre, rol y experiencia
- `SocialLinks`: Iconos de LinkedIn y GitHub
- `ProjectCard`: Card individual con imagen/video
- `ProjectsGrid`: Grid responsivo de proyectos

### Application Layer (`src/app/`)
- Orquesta la aplicación
- `page.tsx`: Obtiene datos y pasa a componentes
- `layout.tsx`: Metadata SEO y estructura HTML
- `globals.css`: Tema oscuro y variables CSS

## 🎨 Sistema de Diseño

### Variables CSS (globals.css)
```css
--bg-primary: #0F1115      → Fondo principal
--bg-secondary: #181B23    → Cards y secciones
--text-primary: #EAEAEA    → Títulos y texto importante
--text-secondary: #A1A1AA  → Texto descriptivo
--accent: #2DD4BF          → Enlaces y highlights
--accent-soft: #5EEAD4     → Hover states
```

### Tailwind CSS
- Configurado en `tailwind.config.ts`
- Clases de utilidad para estilos
- Sistema de diseño consistente
- Responsive por defecto

## ✅ Buenas Prácticas Implementadas

### SEO
- ✅ Metadata completa en `layout.tsx`
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Semantic HTML (`<main>`, `<section>`, `<article>`)
- ✅ `lang="es"` en HTML
- ✅ Alt text en imágenes
- ✅ Aria labels en enlaces

### Performance
- ✅ Server-Side Rendering (SSR)
- ✅ Server Components por defecto
- ✅ Optimización de imágenes con `next/image`
- ✅ Carga paralela de datos con `Promise.all()`
- ✅ CSS moderno con variables nativas

### Accesibilidad
- ✅ Contraste de colores adecuado
- ✅ Aria labels en enlaces sociales
- ✅ Semantic HTML
- ✅ Focus states visibles

### TypeScript
- ✅ Type safety completo
- ✅ Interfaces bien definidas
- ✅ Props tipadas en componentes
- ✅ Async/await con tipos

### Clean Architecture
- ✅ Separación de responsabilidades
- ✅ Capas independientes
- ✅ Fácil de testear
- ✅ Fácil de mantener y escalar

## 🚀 Próximos Pasos

### Para Desarrollo
1. Reemplazar datos mock con APIs reales
2. Agregar animaciones con Framer Motion
3. Implementar filtros de proyectos
4. Agregar sección de habilidades
5. Crear página de detalle de proyecto

### Para Producción
1. Optimizar imágenes (WebP, AVIF)
2. Agregar analytics (Google Analytics, Vercel Analytics)
3. Implementar sitemap.xml
4. Agregar robots.txt
5. Configurar dominio personalizado

## 📚 Tecnologías Utilizadas

- **Next.js 15**: Framework React con SSR
- **React 19**: Librería UI
- **TypeScript**: Type safety
- **Tailwind CSS v3**: Utilidad-first CSS
- **Clean Architecture**: Patrón arquitectónico

## 🎓 Conceptos Aplicados

- Server-Side Rendering (SSR)
- Server Components
- Clean Architecture
- SOLID Principles
- Separation of Concerns
- Dependency Injection
- Type Safety
- Semantic HTML
- Responsive Design
- Mobile First
