import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Calendar, 
  Maximize2, 
  Check, 
  Calculator, 
  CalendarDays, 
  Phone, 
  Mail, 
  Share2, 
  Heart,
  Sparkles,
  ShieldCheck,
  Building,
  TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PropertyDetailModal = ({
  property,
  onClose,
  currency,
  isFavorite,
  onToggleFavorite
}) => {
  if (!property) return null;

  const [activeImage, setActiveImage] = useState(property.image);
  const [activeTab, setActiveTab] = useState('info'); // 'info', 'simulator', 'visit'

  // Mortgage / Investment Simulator State
  const propertyPrice = property.priceUSD;
  const [downPaymentPercent, setDownPaymentPercent] = useState(30); // 30%
  const [loanTermYears, setLoanTermYears] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;
  
  const monthlyMortgage = monthlyInterestRate > 0 && numberOfPayments > 0
    ? (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
    : 0;

  // Estimated annual rental income & ROI
  const estimatedMonthlyRent = property.operation === 'Alquiler Temporal' 
    ? property.priceUSD * 20 // 20 nights occupancy
    : propertyPrice * 0.007; // 0.7% monthly standard yield
  const annualRentIncome = estimatedMonthlyRent * 12;
  const estimatedROI = ((annualRentIncome / propertyPrice) * 100).toFixed(1);

  // Visit Booking State
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('11:00');
  const [visitType, setVisitType] = useState('presencial'); // 'presencial', 'virtual'
  const [visitName, setVisitName] = useState('');
  const [visitPhone, setVisitPhone] = useState('');
  const [visitBooked, setVisitBooked] = useState(false);

  const handleBookVisit = (e) => {
    e.preventDefault();
    setVisitBooked(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const formattedPrice = currency === 'USD'
    ? `USD $${property.priceUSD.toLocaleString()}`
    : `$${property.priceARS.toLocaleString()} ARS`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#c26d38]/20 text-[#e08b52] border border-[#c26d38]/40">
              {property.category}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#c26d38]" />
              {property.location.zone}, {property.location.city}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-red-400 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-400 text-red-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          {/* Main Photo Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black border border-slate-800">
              <img
                src={activeImage}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-xs font-bold text-white border border-slate-700">
                Operación: {property.operation}
              </div>
            </div>

            {/* Thumbnail Switcher */}
            {property.gallery && property.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {property.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img ? 'border-[#c26d38] scale-105 shadow-md' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                {property.title}
              </h2>
              <p className="font-sans text-sm text-[#c26d38] font-medium mt-1">
                {property.tagline}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block uppercase font-semibold">
                {property.operation === 'Venta' ? 'Valor de Publicación' : 'Valor Locativo'}
              </span>
              <span className="font-heading text-2xl sm:text-3xl font-bold text-white">
                {formattedPrice} {property.pricePeriod || ''}
              </span>
              {property.expensesUSD > 0 && (
                <span className="text-xs text-slate-400 block mt-0.5">
                  Expensas: USD ${property.expensesUSD}/mes
                </span>
              )}
            </div>
          </div>

          {/* Navigation Tabs (Información, Simulador Financiero, Agendar Visita) */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'info' ? 'bg-[#c26d38] text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Ficha & Características
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'simulator' ? 'bg-[#c26d38] text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Simulador Hipotecario & ROI
            </button>
            <button
              onClick={() => setActiveTab('visit')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'visit' ? 'bg-[#c26d38] text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              Agendar Visita
            </button>
          </div>

          {/* Tab 1: Info & Specs */}
          {activeTab === 'info' && (
            <div className="space-y-8">
              
              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                  <Maximize2 className="w-5 h-5 text-[#c26d38] mx-auto mb-1" />
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Sup. Cubierta</span>
                  <span className="font-heading text-lg font-bold text-white">{property.specs.coveredM2 || '-'} m²</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                  <Building className="w-5 h-5 text-[#c26d38] mx-auto mb-1" />
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Lote Total</span>
                  <span className="font-heading text-lg font-bold text-white">{property.specs.totalM2} m²</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                  <Bed className="w-5 h-5 text-[#c26d38] mx-auto mb-1" />
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Dormitorios</span>
                  <span className="font-heading text-lg font-bold text-white">{property.specs.bedrooms || '-'}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                  <Bath className="w-5 h-5 text-[#c26d38] mx-auto mb-1" />
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Baños</span>
                  <span className="font-heading text-lg font-bold text-white">{property.specs.bathrooms || '-'}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="font-heading text-lg font-bold text-white">Memoria Descriptiva</h3>
                <p className="font-sans text-sm text-slate-300 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <h3 className="font-heading text-lg font-bold text-white">Equipamiento & Atributos Andinos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-xs text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-[#c26d38]/20 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#c26d38]" />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent Contact Card */}
              {property.agent && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-800/90 to-slate-900 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-[#c26d38] text-white font-heading font-bold text-lg flex items-center justify-center shadow-lg">
                      {property.agent.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs text-[#c26d38] font-bold uppercase tracking-wider block">{property.agent.role}</span>
                      <h4 className="font-heading font-bold text-white text-base">{property.agent.name}</h4>
                      <span className="text-xs text-slate-400">{property.agent.email}</span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/5492944821940?text=Hola,%20me%20interesa%20la%20propiedad%20${encodeURIComponent(property.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#c26d38] hover:bg-[#e08b52] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Contactar Asesor</span>
                  </a>
                </div>
              )}

            </div>
          )}

          {/* Tab 2: Financial & Mortgage Simulator */}
          {activeTab === 'simulator' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-6">
                
                <div>
                  <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#c26d38]" />
                    Simulador de Financiación Hipotecaria
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Calcula la cuota mensual estimada según el anticipo y plazo de amortización para la compra de esta propiedad.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Down Payment */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>Anticipo ({downPaymentPercent}%)</span>
                      <span className="text-[#c26d38]">USD ${downPaymentAmount.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      step="5"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-[#c26d38] cursor-pointer"
                    />
                  </div>

                  {/* Loan Term */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>Plazo del Crédito</span>
                      <span className="text-[#c26d38]">{loanTermYears} años</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="5"
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(Number(e.target.value))}
                      className="w-full accent-[#c26d38] cursor-pointer"
                    />
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>Tasa Anual Estimada</span>
                      <span className="text-[#c26d38]">{interestRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="3.0"
                      max="12.0"
                      step="0.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full accent-[#c26d38] cursor-pointer"
                    />
                  </div>

                </div>

                {/* Simulation Output Pill */}
                <div className="p-5 rounded-xl bg-slate-900 border border-[#c26d38]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase block">Cuota Mensual Estimada</span>
                    <span className="font-heading text-3xl font-bold text-white">
                      USD ${monthlyMortgage.toLocaleString(undefined, { maximumFractionDigits: 0 })} /mes
                    </span>
                    <span className="text-[11px] text-slate-500 block">Monto a financiar: USD ${loanAmount.toLocaleString()}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-left">
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <TrendingUp className="w-4 h-4" />
                      <span>Rendimiento Proyectado (ROI)</span>
                    </div>
                    <span className="text-sm font-heading font-extrabold mt-1 block">~{estimatedROI}% Anual en USD</span>
                    <span className="text-[10px] text-emerald-400/80">Alquiler estimado: USD ${estimatedMonthlyRent.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mes</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 3: Schedule Visit */}
          {activeTab === 'visit' && (
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-6">
              {visitBooked ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">¡Visita Agendada con Éxito!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Hemos confirmado tu solicitud para el día <strong className="text-[#c26d38]">{visitDate || 'próximamente'}</strong> a las <strong>{visitTime} hs</strong> ({visitType.toUpperCase()}). Nuestro asesor {property.agent?.name} se comunicará contigo.
                  </p>
                  <button
                    onClick={() => setVisitBooked(false)}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white"
                  >
                    Agendar otra fecha
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookVisit} className="space-y-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-[#c26d38]" />
                      Coordinar Visita a la Propiedad
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Elige el día y modalidad (presencial con nuestro asesor en la propiedad o tour virtual guiado 3D).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Modalidad de Visita</label>
                      <select
                        value={visitType}
                        onChange={(e) => setVisitType(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                      >
                        <option value="presencial">Presencial en la Propiedad</option>
                        <option value="virtual">Tour Virtual 3D en Vivo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Fecha Preferida</label>
                      <input
                        type="date"
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Franja Horaria</label>
                      <select
                        value={visitTime}
                        onChange={(e) => setVisitTime(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                      >
                        <option value="10:00">10:00 hs (Mañana)</option>
                        <option value="12:00">12:00 hs (Mediodía)</option>
                        <option value="15:30">15:30 hs (Tarde)</option>
                        <option value="18:00">18:00 hs (Atardecer)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Mariano López"
                        value={visitName}
                        onChange={(e) => setVisitName(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Teléfono / WhatsApp de Contacto</label>
                      <input
                        type="tel"
                        required
                        placeholder="+54 9 11 4455-6677"
                        value={visitPhone}
                        onChange={(e) => setVisitPhone(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c26d38] to-[#9e4f21] hover:from-[#e08b52] hover:to-[#c26d38] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-950/40"
                  >
                    Confirmar Solicitud de Visita
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
