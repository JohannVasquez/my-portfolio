import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { serverEnv } from '@/config/env';
import { render } from '@react-email/render';
import ContactEmail from '@/emails/ContactEmail';
import ConfirmationEmail from '@/emails/ConfirmationEmail';

const resend = new Resend(serverEnv.resendApiKey);

// Rate limiting simple: almacenar timestamps de requests por IP
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 3;

// Validación de email con regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Límites de longitud
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;

// Escapar HTML para prevenir XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Verificar rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];

  // Filtrar requests dentro de la ventana de tiempo
  const recentRequests = requests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  // Agregar nuevo timestamp
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);

  // Limpiar entradas antiguas cada cierto tiempo
  if (rateLimitMap.size > 1000) {
    const oldestAllowed = now - RATE_LIMIT_WINDOW;
    for (const [key, timestamps] of rateLimitMap.entries()) {
      const valid = timestamps.filter((t) => t > oldestAllowed);
      if (valid.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, valid);
      }
    }
  }

  return true;
}

export async function POST(request: Request) {
  try {
    // Obtener IP del cliente
    const ip = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Verificar rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Por favor, espera un momento.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, message, honeypot, recaptchaToken } = body;

    // Verificar reCAPTCHA v3 (OBLIGATORIO)
    if (!serverEnv.recaptchaSecretKey) {
      console.error('❌ RECAPTCHA_SECRET_KEY no configurado en el servidor');
      return NextResponse.json(
        { error: 'Error de configuración del servidor. Contacto temporalmente no disponible.' },
        { status: 500 }
      );
    }

    if (!recaptchaToken) {
      console.error('❌ Token de reCAPTCHA no recibido');
      return NextResponse.json(
        { error: 'Token de verificación requerido. Por favor, recarga la página.' },
        { status: 400 }
      );
    }

    try {
      const recaptchaResponse = await fetch(
        'https://www.google.com/recaptcha/api/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${serverEnv.recaptchaSecretKey}&response=${recaptchaToken}`,
        }
      );

      const recaptchaData = await recaptchaResponse.json();

      // Score de 0.0 a 1.0 (mayor = más humano)
      // Rechazar si el score es menor a 0.5
      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.error('❌ reCAPTCHA verificación fallida:', recaptchaData);
        return NextResponse.json(
          { error: 'Verificación de seguridad fallida. Por favor, intenta nuevamente.' },
          { status: 403 }
        );
      }

      console.log('✅ reCAPTCHA verificado exitosamente. Score:', recaptchaData.score);
    } catch (error) {
      console.error('❌ Error al verificar reCAPTCHA:', error);
      return NextResponse.json(
        { error: 'Error al verificar la seguridad. Por favor, intenta nuevamente.' },
        { status: 500 }
      );
    }

    // Honeypot: si viene con valor, es un bot
    if (honeypot) {
      // Silenciosamente rechazar sin dar pistas al bot
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validación de campos requeridos
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validación de tipos
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Formato de datos inválido' },
        { status: 400 }
      );
    }

    // Validación de longitudes
    if (name.length === 0 || name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `El nombre debe tener entre 1 y ${MAX_NAME_LENGTH} caracteres` },
        { status: 400 }
      );
    }

    if (email.length === 0 || email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    if (message.length === 0 || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `El mensaje debe tener entre 1 y ${MAX_MESSAGE_LENGTH} caracteres` },
        { status: 400 }
      );
    }

    // Validación de formato de email
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Sanitizar datos (trim y escapar)
    const sanitizedName = escapeHtml(name.trim());
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = escapeHtml(message.trim());

    // Verificar que la API key esté configurada
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada');
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    // Renderizar las plantillas de React Email
    const [notificationEmailHtml, confirmationEmailHtml] = await Promise.all([
      render(
        ContactEmail({
          name: sanitizedName,
          email: sanitizedEmail,
          message: sanitizedMessage,
        })
      ),
      render(
        ConfirmationEmail({
          name: sanitizedName,
        })
      ),
    ]);

    // Enviar ambos correos simultáneamente con Promise.all
    const [notificationResult, confirmationResult] = await Promise.all([
      // Correo de notificación (para mí)
      resend.emails.send({
        from: 'Portafolio Contact <contacto@jvdev.cl>',
        to: ['johann@jvdev.cl'],
        replyTo: sanitizedEmail,
        subject: `Nuevo mensaje de ${sanitizedName}`,
        html: notificationEmailHtml,
      }),
      // Correo de confirmación (para el usuario)
      resend.emails.send({
        from: 'Johann Vásquez <johann@jvdev.cl>',
        to: [sanitizedEmail],
        subject: '¡Recibí tu mensaje!',
        html: confirmationEmailHtml,
      }),
    ]);

    // Verificar errores en ambos correos
    if (notificationResult.error || confirmationResult.error) {
      console.error('Error al enviar emails:', {
        notification: notificationResult.error,
        confirmation: confirmationResult.error,
      });
      return NextResponse.json(
        { error: 'Error al enviar el mensaje. Por favor, intenta nuevamente.' },
        { status: 500 }
      );
    }

    console.log('✅ Correos enviados exitosamente:', {
      notificationId: notificationResult.data?.id,
      confirmationId: confirmationResult.data?.id,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // Log interno sin exponer stack trace
    console.error('Error en API de contacto:', error instanceof Error ? error.message : 'Error desconocido');
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
