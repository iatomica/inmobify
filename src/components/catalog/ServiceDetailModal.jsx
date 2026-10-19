import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Send, 
  Sparkles
} from 'lucide-react';

export const ServiceDetailModal = ({
  service,
  onClose,
  onAddLead,
  companyConfig
}) => {
  if (!service) return null;

  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;

    const newLead = {
      id: `lead-${Date.now()}`,
      date: new Date().toLocaleDateString('es-ES') + ' ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      name: contactName,
      email: contactEmail || 'No especificado',
      phone: contactPhone,
      service: service.title,
      zone: 'Buenos Aires (CABA)',
      status: 'Pendiente',
      budget: `${service.priceType || 'Desde'} ${service.priceAmount || ''} ${service.priceUnit || ''}`,
      message: notes || `Solicita información detallada sobre ${service.title}`
    };

    if (onAddLead) {
      onAddLead(newLead);
    }

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-100">
          <img
            src={service.image || '/assets/images/services_valmay.jpeg'}
            alt={service.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="px-3 py-1 rounded-full bg-sky-600 text-white text-xs font-bold uppercase tracking-wider inline-block mb-2 shadow">
              {service.category}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow">
              {service.title}
            </h2>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* Subtitle / Tagline */}
          <p className="text-sm text-sky-800 font-semibold leading-relaxed">
            {service.tagline}
          </p>

          {/* Full Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Descripción del Servicio</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {service.fullDesc || service.shortDesc}
            </p>
          </div>

          {/* Scope of Work / Features */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alcance y Tareas Incluidas</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(service.features || []).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantees & Response Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <Clock className="w-5 h-5 text-sky-600 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Tiempo de Respuesta</span>
                <span className="text-xs font-bold text-slate-900">{service.responseTime || 'Inmediata (< 2 horas)'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Garantía Valmay</span>
                <span className="text-xs font-bold text-slate-900">{service.guarantee || '100% Satisfacción garantizada'}</span>
              </div>
            </div>
          </div>

          {/* Direct Lead Form inside Modal */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="font-heading text-lg font-bold text-slate-900 mb-1">
              Solicitar Presupuesto para este Servicio
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Completa tus datos y un gestor técnico de Valmay Group te enviará la propuesta detallada.
            </p>

            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs text-center font-bold">
                ¡Solicitud enviada con éxito! La verás registrada en el panel de control.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre o empresa *"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Teléfono móvil *"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    placeholder="Email (opcional)"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                  />
                  <input
                    type="text"
                    placeholder="Ubicación (ej: Recoleta, Palermo, Microcentro)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Petición</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
