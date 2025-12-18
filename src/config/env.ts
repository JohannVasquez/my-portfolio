/**
 * Configuración centralizada de variables de entorno
 * Siguiendo principios de Clean Architecture
 */

// Variables públicas (disponibles en el cliente)
export const publicEnv = {
  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
} as const;

// Variables privadas (solo disponibles en el servidor)
export const serverEnv = {
  resendApiKey: process.env.RESEND_API_KEY || '',
  recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY || '',
} as const;

// Validación de variables de entorno requeridas
export function validateEnv() {
  const errors: string[] = [];

  // Validar variables públicas
  if (!publicEnv.recaptchaSiteKey) {
    errors.push('NEXT_PUBLIC_RECAPTCHA_SITE_KEY no está configurada');
  }

  // Validar variables privadas (solo en servidor)
  if (typeof window === 'undefined') {
    if (!serverEnv.resendApiKey) {
      errors.push('RESEND_API_KEY no está configurada');
    }
    if (!serverEnv.recaptchaSecretKey) {
      errors.push('RECAPTCHA_SECRET_KEY no está configurada');
    }
  }

  if (errors.length > 0) {
    console.warn('⚠️ Variables de entorno faltantes:', errors);
  }

  return errors.length === 0;
}
