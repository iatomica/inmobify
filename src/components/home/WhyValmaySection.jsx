import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Clock, 
  Send, 
  CheckCircle2, 
  Phone, 
  Building2, 
  FileCheck2
} from 'lucide-react';

export const WhyValmaySection = ({ companyConfig, onAddLead, defaultService = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService || 'Gestión Integral de Inmuebles y Apartamentos Turísticos',
    zone: 'Buenos Aires (Sede Central)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const newLead = {
      id: `lead-${Date.now()}`,
      date: new Date().toLocaleDateString('es-ES') + ' ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      name: formData.name,
      email: formData.email || 'No proporcionado',
      phone: formData.phone,
      service: formData.service,
      zone: formData.zone,
      status: 'Pendiente',
      budget: 'Solicitud web directa',
      message: formData.message || 'Sin observaciones adicionales'
    };

    if (onAddLead) {
      onAddLead(newLead);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'Gestión Integral de Inmuebles y Apartamentos Turísticos',
        zone: 'Buenos Aires (Sede Central)',
        message: ''
      });
    }, 5000);
  };

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Gestión Integral Sin Intermediarios",
      desc: "Centralizas en un único proveedor de confianza la custodia de llaves, limpieza técnica, mantenimiento preventivo y reformas completas."
    },
    {
      icon: Clock,
      title: "Respuesta Rápida y Guardias Operativas",
      desc: "Sede central en Maipú 204, Piso 3, Oficina 4 (Buenos Aires) con personal y vehículos equipados para resolver urgencias en menos de 60 minutos."
    },
    {
      icon: Users,
      title: "Personal Propio y Cualificado",
      desc: "No subcontratamos al azar. Nuestro equipo técnico cuenta con contrato laboral, seguro de responsabilidad civil y formación continua."
    },
    {
      icon: FileCheck2,
      title: "Garantía Escrita y Presupuestos Claros",
      desc: "Transparencia sin sorpresas ni costes ocultos. Entregamos partes de trabajo detallados con fotografías antes y después de cada actuación."
    }
  ];

  return (
    <section id="por-que-valmay" className="py-24 px-6 md:px-12 bg-white border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Main Grid: Left Value Proposition & Right Quote Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Why Valmay Details */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Compromiso de Excelencia</span>
              </div>
              
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Un Equipo, Todas Tus Soluciones en Gestión
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                Sabemos lo agotador que resulta coordinar fontaneros, limpiadores, pintores y administradores por separado. En Valmay Group simplificamos tu día a día gestionando tus propiedades con rigor profesional y trato cercano.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {pillars.map((pil, idx) => {
                const IconComponent = pil.icon;
                return (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-500 hover:bg-white hover:shadow-lg transition-all">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-3">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-slate-900 mb-1.5">
                      {pil.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pil.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Direct Contact Bar */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200 flex flex-wrap items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block font-medium">¿Prefieres consultarnos por teléfono o WhatsApp?</span>
                  <span className="text-base font-heading font-extrabold text-slate-900">{companyConfig?.phoneFormatted || '+34 688 84 67 97'}</span>
                </div>
              </div>
              <a
                href={`https://wa.me/${companyConfig?.whatsapp || '34688846797'}?text=Hola%20Valmay%20Group,%20solicito%20presupuesto`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-sky-700 font-bold border border-sky-300 text-xs shadow-xs"
              >
                Contactar Ahora
              </a>
            </div>

          </div>

          {/* Right Column: Lead Request Form */}
          <div id="contacto" className="lg:col-span-5 bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="space-y-2 mb-6">
              <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest">
                Presupuesto Sin Compromiso
              </span>
              <h3 className="font-heading text-2xl font-bold text-slate-900">
                Solicita tu Propuesta a Medida
              </h3>
              <p className="text-xs text-slate-500">
                Respuesta en menos de 2 horas laborables. Te asesoramos sin ningún coste.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 px-4 text-center space-y-3 bg-emerald-50 border border-emerald-300 rounded-2xl animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-heading text-lg font-bold text-slate-900">¡Solicitud Registrada con Éxito!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Hemos transferido tu petición al equipo técnico de Valmay Group y puedes verla sincronizada en el <strong>Panel de Control (/panel)</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre o Empresa *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Roberto García / Propietario Recoleta"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono Móvil *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+34 688 84 67 97"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email de Contacto</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nombre@correo.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Servicio Requerido</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
                    >
                      <option value="Gestión Integral de Viviendas y Apartamentos Airbnb">Gestión Airbnb Propietarios</option>
                      <option value="Gestión Integral de Inmuebles y Apartamentos Turísticos">Gestión de Alojamientos</option>
                      <option value="Excelencia en Limpieza Técnica y Desinfección">Limpieza Técnica & Lavandería</option>
                      <option value="Mantenimiento Técnico y Asistencia Multioficio">Mantenimiento Multioficio 24/7</option>
                      <option value="Reformas Integrales y Adecuación de Espacios">Reformas Llave en Mano</option>
                      <option value="Mantenimiento Integral de Comunidades y Fincas">Comunidades de Propietarios</option>
                      <option value="Apoyo Operativo y Multiservicio para Empresas">Servicios para Empresas (B2B)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Zona</label>
                    <select
                      value={formData.zone}
                      onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
                    >
                      <option value="Microcentro & Retiro (Sede Maipú 204)">Microcentro & Retiro (Sede Maipú 204)</option>
                      <option value="Palermo">Palermo</option>
                      <option value="Recoleta">Recoleta</option>
                      <option value="Puerto Madero">Puerto Madero</option>
                      <option value="Belgrano">Belgrano</option>
                      <option value="San Telmo">San Telmo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción de la necesidad o inmueble</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntanos m², tipo de avería, frecuencia de limpieza o detalles para ajustar el presupuesto..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Solicitud de Presupuesto</span>
                </button>

                <p className="text-[10px] text-slate-500 text-center">
                  Al enviar aceptas ser contactado por Valmay Group para la emisión del presupuesto. Sin spam.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
