'use client';

import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Crear el mailto link con los datos del formulario
    const subject = encodeURIComponent(`Contacto de ${formData.name}`);
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
    );
    
    window.location.href = `mailto:tu-email@ejemplo.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          className="w-full px-4 py-3 bg-[#181B23] border border-[#2DD4BF]/20 rounded-lg text-[#EAEAEA] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent transition-all duration-200"
          placeholder="Tu nombre"
        />
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
          className="w-full px-4 py-3 bg-[#181B23] border border-[#2DD4BF]/20 rounded-lg text-[#EAEAEA] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent transition-all duration-200"
          placeholder="tu@email.com"
        />
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
          className="w-full px-4 py-3 bg-[#181B23] border border-[#2DD4BF]/20 rounded-lg text-[#EAEAEA] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Tu mensaje..."
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-[#2DD4BF] text-[#0F1115] font-semibold rounded-lg hover:bg-[#5EEAD4] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:ring-offset-2 focus:ring-offset-[#0F1115]"
      >
        Enviar mensaje
      </button>
    </form>
  );
}
