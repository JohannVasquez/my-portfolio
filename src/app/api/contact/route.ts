import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Verificar reCAPTCHA v3 si está configurado
    if (process.env.RECAPTCHA_SECRET_KEY && recaptchaToken) {
      try {
        console.log('🔒 Verificando reCAPTCHA...');
        const recaptchaResponse = await fetch(
          'https://www.google.com/recaptcha/api/siteverify',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
          }
        );

        const recaptchaData = await recaptchaResponse.json();
        console.log('📊 reCAPTCHA resultado:', {
          success: recaptchaData.success,
          score: recaptchaData.score,
          action: recaptchaData.action,
          hostname: recaptchaData.hostname,
        });

        // Score de 0.0 a 1.0 (mayor = más humano)
        // Rechazar si el score es menor a 0.5
        if (!recaptchaData.success || recaptchaData.score < 0.5) {
          console.log('❌ reCAPTCHA fail - Score:', recaptchaData.score);
          return NextResponse.json(
            { error: 'Verificación de seguridad fallida. Por favor, intenta nuevamente.' },
            { status: 403 }
          );
        }
        console.log('✅ reCAPTCHA pass - Score:', recaptchaData.score);
      } catch (error) {
        console.error('❌ Error al verificar reCAPTCHA:', error);
        // Continuar sin bloquear si hay error en la verificación
      }
    } else {
      console.warn('⚠️ reCAPTCHA no configurado o token no recibido');
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

    const { data, error } = await resend.emails.send({
      from: 'Portafolio <onboarding@resend.dev>',
      to: ['johannvasquez101@gmail.com'],
      replyTo: sanitizedEmail,
      subject: `Contacto de ${sanitizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2DD4BF;">Nuevo mensaje de contacto</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${sanitizedMessage}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">Este mensaje fue enviado desde tu portafolio web</p>
        </div>
      `,
    });

    if (error) {
      // Log interno sin exponer detalles al cliente
      console.error('Error al enviar email:', error);
      return NextResponse.json(
        { error: 'Error al enviar el mensaje. Por favor, intenta nuevamente.' },
        { status: 500 }
      );
    }

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
