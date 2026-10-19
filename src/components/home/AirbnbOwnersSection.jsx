import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  KeyRound, 
  Sparkles, 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  CalendarCheck, 
  FileCheck, 
  Coins,
  Send,
  BedDouble,
  DollarSign
} from 'lucide-react';

export const AirbnbOwnersSection = ({ onOpenLeadForm, onAddLead }) => {
  const [selectedZone, setSelectedZone] = useState('Palermo (Soho & Hollywood)');
  const [selectedRooms, setSelectedRooms] = useState(2);
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitOwnerStudy = (e) => {
    e.preventDefault();
    if (!ownerName || !ownerPhone) return;

    if (onAddLead) {
      onAddLead({
        id: `lead-owner-${Date.now()}`,
        date: new Date().toLocaleDateString('es-ES') + ' ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        name: ownerName,
        phone: ownerPhone,
        email: 'Solicitud Estudio Inmueble',
        service: 'Gestión Integral Airbnb para Propietarios',
        zone: selectedZone,
        status: 'Pendiente',
        budget: `Tipología: ${selectedRooms} hab. en ${selectedZone}`,
        message: `Propietario interesado en gestión Airbnb y evaluación para vivienda de ${selectedRooms} habitaciones en ${selectedZone}.`
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOwnerName('');
      setOwnerPhone('');
    }, 4000);
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Hasta +40% de Rentabilidad Neta",
      desc: "Algoritmos de fijación dinámica de precios que maximizan el ingreso por noche según temporada, demanda y eventos en Buenos Aires."
    },
    {
      icon: ShieldCheck,
      title: "Filtrado Riguroso de Huéspedes",
      desc: "Validación de identidad, perfil verificado, seguro de cobertura integral y fianza previa para tu absoluta tranquilidad."
    },
    {
      icon: KeyRound,
      title: "Operativa Integral 360°",
      desc: "Check-in 24/7 multilingüe, cerraduras electrónicas inteligentes, limpieza técnica con lavandería industrial y reposición de amenities."
    },
    {
      icon: Coins,
      title: "Liquidación Mensual de Dividendos",
      desc: "Transparencia absoluta. Transferencia de tus dividendos el día 1 de cada mes con informe detallado de ocupación e ingresos."
    }
  ];

  return (
    <section id="propietarios-airbnb" className="py-24 px-6 md:px-12 bg-white border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Eyebrow and Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Propuesta Exclusiva para Propietarios</span>
          </div>
          
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Convierte tu Vivienda en una Fuente de Dividendos sin Preocupaciones
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            ¿Tienes un departamento o piso en Buenos Aires? En Valmay Group nos encargamos de absolutamente todo: desde la sesión fotográfica profesional, optimización del anuncio en Airbnb y Booking, hasta el check-in 24h, blanquería textil de calidad y mantenimiento técnico.
          </p>
        </div>

        {/* 4 Key Pillars for Owners */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const IconComp = b.icon;
            return (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-sky-500 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Dividend Calculator & Proposal Box */}
        <div className="mt-16 bg-gradient-to-br from-sky-50 via-white to-blue-50 border border-sky-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Interactive Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
                <img 
                  src="/logo-valmay-icon.png" 
                  alt="Valmay Group Logo" 
                  className="w-5 h-5 rounded-full object-contain" 
                />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">Asesoramiento y Plan de Gestión para Propietarios</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
                Solicita una propuesta personalizada para tu propiedad
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Selecciona la ubicación de tu inmueble en Buenos Aires y su tipología para que nuestro equipo realice una evaluación real según el estado y características particulares de tu unidad.
              </p>

              {/* Selector 1: Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Ubicación del Inmueble (Buenos Aires)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Palermo (Soho & Hollywood)', 'Recoleta & Barrio Norte', 'Puerto Madero', 'Retiro (Maipú 204)', 'Belgrano & Colegiales'].map(loc => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setSelectedZone(loc)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        selectedZone === loc 
                          ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/30' 
                          : 'bg-white text-slate-700 border-slate-300 hover:border-sky-400'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 2: Bedrooms */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tipología / Dormitorios
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 1, label: '1 Dormitorio / Estudio' },
                    { id: 2, label: '2 Dormitorios' },
                    { id: 3, label: '3+ Dormitorios / Piso' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedRooms(item.id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        selectedRooms === item.id 
                          ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/30' 
                          : 'bg-white text-slate-700 border-slate-300 hover:border-sky-400'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Trust Checks */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sin compromiso de permanencia obligada</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Disfruta de tu casa cuando tú quieras</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mantenimiento y averías cubiertas</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Seguro y cobertura contra daños</span>
                </span>
              </div>
            </div>

            {/* Right: Direct Study Request Card */}
            <div className="lg:col-span-5 bg-white border-2 border-sky-500 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-extrabold uppercase tracking-wider inline-block">
                    Evaluación y Diagnóstico Sin Costo
                  </span>
                  <img 
                    src="/logo-valmay-icon.png" 
                    alt="Valmay Group" 
                    className="w-8 h-8 rounded-full shadow-sm object-contain" 
                  />
                </div>

                <div>
                  <h4 className="font-heading text-xl font-black text-slate-900 tracking-tight">
                    Plan Integral de Gestión Airbnb
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Evaluamos tu propiedad en <strong>{selectedZone}</strong> con visita técnica y estudio de mercado individualizado.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>Publicación profesional en Airbnb, Booking y canales clave</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>Atención de huéspedes, check-in 24/7 y limpieza técnica</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>Liquidación mensual directa con reporte de ocupación</span>
                  </div>
                </div>

                {/* Instant Study Form */}
                <div className="pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-900 block mb-2">
                    Déjanos tus datos para coordinar una evaluación:
                  </span>

                  {submitted ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center text-xs text-emerald-800 font-bold animate-fade-in">
                      ¡Solicitud recibida! Te contactaremos para coordinar la evaluación de tu propiedad.
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitOwnerStudy} className="space-y-2.5">
                      <input
                        type="text"
                        required
                        placeholder="Tu Nombre completo *"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Teléfono móvil *"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                      />
                      <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-102"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Solicitar Diagnóstico Sin Costo</span>
                      </button>

                      <a
                        href="https://wa.me/34688846797?text=Hola%20Valmay%20Group,%20quiero%20consultar%20por%20la%20gesti%C3%B3n%20de%20mi%20propiedad%20Airbnb%20en%20Buenos%20Aires"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-heading font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                      >
                        <Coins className="w-4 h-4 text-emerald-600" />
                        <span>Consultar por WhatsApp (+34 688 84 67 97)</span>
                      </a>
                    </form>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
