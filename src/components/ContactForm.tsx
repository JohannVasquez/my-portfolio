'use client';

import { useState } from 'react';

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Campo oculto para detectar bots
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Validación adicional en el cliente
    if (formData.name.length > MAX_NAME_LENGTH) {
      setStatus('error');
      setErrorMessage(`El nombre no puede exceder ${MAX_NAME_LENGTH} caracteres`);
      return;
    }

    if (formData.email.length > MAX_EMAIL_LENGTH) {
      setStatus('error');
      setErrorMessage(`El email no puede exceder ${MAX_EMAIL_LENGTH} caracteres`);
      return;
    }

    if (formData.message.length > MAX_MESSAGE_LENGTH) {
      setStatus('error');
      setErrorMessage(`El mensaje no puede exceder ${MAX_MESSAGE_LENGTH} caracteres`);
      return;
    }

    try {
      // Obtener token de reCAPTCHA v3 (OBLIGATORIO)
      let recaptchaToken = '';
      if (typeof window !== 'undefined' && (window as any).grecaptcha) {
        try {
          recaptchaToken = await (window as any).grecaptcha.execute(
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
            { action: 'submit_contact' }
          );
        } catch (error) {
          console.error('❌ Error al obtener token de reCAPTCHA:', error);
          setStatus('error');
          setErrorMessage('Error de seguridad: No se pudo verificar reCAPTCHA. Por favor, recarga la página.');
          return;
        }
      } else {
        console.error('❌ reCAPTCHA no disponible (grecaptcha no cargado)');
        setStatus('error');
        setErrorMessage('Error de seguridad: reCAPTCHA no está disponible. Por favor, recarga la página.');
        return;
      }

      // Validar que se obtuvo el token
      if (!recaptchaToken) {
        setStatus('error');
        setErrorMessage('Error de seguridad: No se pudo obtener el token de verificación.');
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
      
      // Resetear estado después de 5 segundos
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Error al enviar el mensaje');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - campo oculto para detectar bots */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#EAEAEA] mb-2">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          maxLength={MAX_NAME_LENGTH}
          className="w-full px-4 py-3 bg-[#181B23] border border-[#2DD4BF]/20 rounded-lg text-[#EAEAEA] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent transition-all duration-200"
          placeholder="Tu nombre"
        />
        <p className="text-xs text-[#A1A1AA] mt-1">
          {formData.name.length}/{MAX_NAME_LENGTH}
        </p>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#EAEAEA] mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          maxLength={MAX_EMAIL_LENGTH}
          className="w-full px-4 py-3 bg-[#181B23] border border-[#2DD4BF]/20 rounded-lg text-[#EAEAEA] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent transition-all duration-200"
          placeholder="tu@email.com"
        />
        <p className="text-xs text-[#A1A1AA] mt-1">
          {formData.email.length}/{MAX_EMAIL_LENGTH}
        </p>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#EAEAEA] mb-2">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          maxLength={MAX_MESSAGE_LENGTH}
          className="w-full px-4 py-3 bg-[#181B23] border border-[#2DD4BF]/20 rounded-lg text-[#EAEAEA] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Tu mensaje..."
        />
        <p className="text-xs text-[#A1A1AA] mt-1">
          {formData.message.length}/{MAX_MESSAGE_LENGTH}
        </p>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 bg-[#2DD4BF] text-[#0F1115] font-semibold rounded-lg hover:bg-[#5EEAD4] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:ring-offset-2 focus:ring-offset-[#0F1115] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {status === 'success' && (
        <div className="p-4 bg-[#2DD4BF]/10 border border-[#2DD4BF] rounded-lg">
          <p className="text-[#2DD4BF] text-sm font-medium">
            ¡Mensaje enviado con éxito! Te responderé pronto.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
          <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
