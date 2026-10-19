import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Clock,
  TrendingUp,
  Building2
} from 'lucide-react';

export const Hero = ({ 
  heroConfig, 
  onFilterChange, 
  onOpenQuote,
  zones = [] 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedZone, setSelectedZone] = useState('Todas');

  const categories = [
    'Todos',
    'Gestión Integral',
    'Limpieza',
    'Mantenimiento',
    'Reformas'
  ];

  const handleSearch = () => {
    if (onFilterChange) {
      onFilterChange({
        category: selectedCategory,
        zone: selectedZone
      });
    }
    const targetEl = document.getElementById('servicios');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bgImage = heroConfig?.backgroundImage || '/assets/images/hero_valmay.jpg';

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center bg-slate-900 overflow-hidden">
      
      {/* Background Photography Clearly Visible with Crystal-Clear Contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Servicios y Gestión Integral Valmay Group"
          className="w-full h-full object-cover object-center brightness-95 contrast-105"
        />
        {/* Soft, crystal-clear gradient overlay so the image is fully vivid and visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/20 to-black/30 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 py-20 text-center flex flex-col items-center">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-sky-400 text-sky-800 text-xs font-black uppercase tracking-widest shadow-lg mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>{heroConfig?.badge || 'UN EQUIPO, TODAS TUS SOLUCIONES'}</span>
        </div>

        {/* Main Headline with High Contrast on Glass Container */}
        <div className="backdrop-blur-md bg-slate-950/40 border border-white/20 p-6 sm:p-10 rounded-3xl max-w-4xl shadow-2xl">
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-lg">
            {heroConfig?.title || 'Servicios Integrales y Gestión para Espacios en Buenos Aires'}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 font-sans text-base sm:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow">
            {heroConfig?.subtitle || 'Unimos experiencia, compromiso y versatilidad para ofrecer soluciones integrales que transforman espacios, simplifican tu día a día y garantizan resultados de máxima excelencia en reformas, limpiezas y mantenimiento.'}
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => onOpenQuote ? onOpenQuote() : handleSearch()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-heading font-bold text-sm tracking-wide shadow-xl shadow-sky-950/50 transition-all hover:scale-102 flex items-center gap-2.5 cursor-pointer"
            >
              <span>{heroConfig?.ctaPrimary || 'Solicitar Presupuesto Inmediato'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <a
              href="#propietarios-airbnb"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-heading font-bold text-sm transition-all shadow-md flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Gestión Viviendas Airbnb</span>
            </a>

            <a
              href="#unidades-disponibles"
              className="px-5 py-3.5 rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/30 font-heading font-semibold text-sm transition-all backdrop-blur-sm"
            >
              Ver Unidades Gestionadas
            </a>
          </div>
        </div>

        {/* Interactive Search & Filter Card (Clean Light Floating Card) */}
        <div className="w-full max-w-3xl mt-8 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-end">
            
            {/* Category Filter */}
            <div className="sm:col-span-5 text-left">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-600" />
                Tipo de Servicio
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'Todos' ? 'Todos los Servicios' : cat}</option>
                ))}
              </select>
            </div>

            {/* Zone Filter */}
            <div className="sm:col-span-4 text-left">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                Zona de Intervención
              </label>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
              >
                <option value="Todas">Todas las Zonas (Buenos Aires)</option>
                {zones.map(z => (
                  <option key={z.id} value={z.name}>{z.name}</option>
                ))}
              </select>
            </div>

            {/* Filter Action Button */}
            <div className="sm:col-span-3">
              <button
                onClick={handleSearch}
                className="w-full h-[42px] flex items-center justify-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-heading font-bold text-xs tracking-wider uppercase shadow-md shadow-sky-600/30 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Consultar</span>
              </button>
            </div>

          </div>
        </div>

        {/* Dynamic High-Impact Statistics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 w-full max-w-4xl text-center">
          {(heroConfig?.stats || []).map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-md">
              <span className="font-heading text-2xl sm:text-3xl font-black text-slate-900 block">
                {stat.value}
              </span>
              <span className="font-sans text-xs text-sky-700 font-bold uppercase tracking-wider block mt-0.5">
                {stat.label}
              </span>
              {stat.detail && (
                <span className="font-sans text-[11px] text-slate-500 block mt-0.5">
                  {stat.detail}
                </span>
              )}
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
