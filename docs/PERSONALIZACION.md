# 🚀 Guía Rápida de Personalización

## Paso 1: Información Personal

Abre el archivo [src/data/portfolio.ts](../src/data/portfolio.ts) y edita:

```typescript
export async function getPersonalInfo(): Promise<PersonalInfo> {
  return {
    name: 'Juan Pérez',              // ← Tu nombre completo
    role: 'Desarrollador Full Stack', // ← Tu cargo/oficio
    yearsOfExperience: 5,             // ← Años de experiencia
  };
}
```

## Paso 2: Links Sociales

En el mismo archivo, actualiza tus URLs:

```typescript
export async function getSocialLinks(): Promise<SocialLink[]> {
  return [
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/juanperez', // ← Tu perfil de LinkedIn
      ariaLabel: 'Visita mi perfil de LinkedIn',
    },
    {
      platform: 'github',
      url: 'https://github.com/juanperez',      // ← Tu perfil de GitHub
      ariaLabel: 'Visita mi perfil de GitHub',
    },
  ];
}
```

## Paso 3: Agregar tus Proyectos

### 3.1 Agregar imágenes

1. Coloca las imágenes de tus proyectos en la carpeta `/public/`
2. Usa nombres descriptivos: `proyecto-ecommerce.jpg`, `app-tareas.png`, etc.

### 3.2 Configurar proyectos

Edita la función `getProjects()` en [src/data/portfolio.ts](../src/data/portfolio.ts):

```typescript
export async function getProjects(): Promise<Project[]> {
  return [
    {
      id: '1',
      title: 'E-commerce Moderno',
      description: 'Tienda online con carrito de compras y pasarela de pagos integrada.',
      imageUrl: '/proyecto-ecommerce.jpg',  // ← Tu imagen en /public
      technologies: ['React', 'Node.js', 'Stripe'],
      projectUrl: 'https://mi-ecommerce.com',
      githubUrl: 'https://github.com/tuusuario/ecommerce',
    },
    // ... más proyectos
  ];
}
```

### 3.3 Agregar video (opcional)

```typescript
{
  id: '2',
  title: 'Dashboard Analytics',
  description: 'Panel de control con gráficos en tiempo real.',
  imageUrl: '/dashboard.jpg',
  videoUrl: '/dashboard-demo.mp4', // ← Video opcional
  technologies: ['Next.js', 'D3.js', 'WebSocket'],
  projectUrl: 'https://mi-dashboard.com',
}
```

## Paso 4: Personalizar Metadata SEO

Edita [src/app/layout.tsx](../src/app/layout.tsx):

```typescript
export const metadata: Metadata = {
  title: "Juan Pérez - Desarrollador Full Stack",
  description: "Portafolio de Juan Pérez, desarrollador full stack con 5 años de experiencia...",
  // ... más configuración
};
```

## ✅ Checklist Final

- [ ] Actualizar nombre, oficio y años de experiencia
- [ ] Cambiar URLs de LinkedIn y GitHub
- [ ] Agregar imágenes de proyectos en `/public/`
- [ ] Actualizar información de proyectos
- [ ] Personalizar metadata SEO
- [ ] Probar en `http://localhost:3000`

## 🎨 Personalización Avanzada

### Cambiar colores

Edita [src/app/globals.css](../src/app/globals.css):

```css
:root {
  --bg-primary: #0F1115;      /* Fondo principal */
  --bg-secondary: #181B23;    /* Fondo de cards */
  --text-primary: #EAEAEA;    /* Texto principal */
  --text-secondary: #A1A1AA;  /* Texto secundario */
  --accent: #2DD4BF;          /* Color de acento */
  --accent-soft: #5EEAD4;     /* Acento suave */
}
```

### Agregar más secciones

Crea nuevos componentes en [src/components/](../src/components/) y agrégalos en [src/app/page.tsx](../src/app/page.tsx)

## 📦 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Otros servicios

- **Netlify**: Conecta tu repositorio de GitHub
- **Railway**: `railway up`
- **Cloudflare Pages**: Conecta tu repo

## 🆘 Problemas Comunes

**Error: Imagen no se muestra**
- Verifica que la imagen esté en `/public/`
- Asegúrate de usar `/nombre-imagen.jpg` (con `/` al inicio)

**Error de compilación**
- Ejecuta `pnpm install` nuevamente
- Verifica que no haya errores de sintaxis en TypeScript

**Cambios no se reflejan**
- Guarda todos los archivos (Ctrl+S)
- Recarga el navegador (F5)
- Reinicia el servidor: Ctrl+C y luego `pnpm dev`
