import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  Users, 
  BedDouble, 
  Bath, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Send, 
  Calendar,
  Sparkles,
  Phone
} from 'lucide-react';

export const PropertyDetailModal = ({ property, onClose, onAddLead }) => {
  if (!property) return null;

  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userDates, setUserDates] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !userPhone) return;

    if (onAddLead) {
      onAddLead({
        id: `lead-prop-${Date.now()}`,
        date: new Date().toLocaleDateString('es-ES') + ' ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        name: userName,
        phone: userPhone,
        email: 'Consulta directa propiedad',
        service: `Alquiler / Reserva: ${property.title}`,
        zone: property.zone,
        status: 'Pendiente',
        budget: `USD ${property.nightPrice}/noche`,
        message: `Interés en reservar o consultar disponibilidad para fechas: ${userDates || 'A concretar'}. Propiedad: ${property.title} (${property.address}).`
      });
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
        <div className="relative h-64 w-full overflow-hidden bg-slate-100">
          <img
            src={property.image || '/assets/images/services_valmay.jpeg'}
            alt={property.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-600 text-white text-xs font-bold uppercase">
                {property.status || 'Disponible'}
              </span>
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 text-slate-900 text-xs font-bold">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{property.rating} ({property.reviewsCount} reseñas)</span>
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow">
              {property.title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-sky-200 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{property.address} &bull; {property.zone}</span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* Key Specs Row */}
          <div className="grid grid-cols-4 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Capacidad</span>
              <span className="text-sm font-bold text-slate-900">{property.guests} Huéspedes</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Dormitorios</span>
              <span className="text-sm font-bold text-slate-900">{property.rooms} Hab.</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Baños</span>
              <span className="text-sm font-bold text-slate-900">{property.bathrooms} Baños</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Tarifa Noche</span>
              <span className="text-sm font-bold text-sky-600">USD {property.nightPrice}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Descripción de la Vivienda</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          {property.amenities && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Comodidades & Servicios Valmay</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {property.amenities.map((am, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span className="line-clamp-1">{am}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booking Inquiry Form */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="font-heading text-lg font-bold text-slate-900 mb-1">
              Consultar Disponibilidad o Reserva
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Indica tus datos para que el equipo de gestión turística te confirme disponibilidad inmediata.
            </p>

            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-center text-xs text-emerald-800 font-bold">
                ¡Solicitud enviada correctamente! Nos comunicaremos contigo en breve.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Tu Nombre completo *"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Teléfono móvil *"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                  <input
                    type="text"
                    placeholder="Fechas aproximadas (ej: 10-17 Julio)"
                    value={userDates}
                    onChange={(e) => setUserDates(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
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
                    <span>Consultar Fechas</span>
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
