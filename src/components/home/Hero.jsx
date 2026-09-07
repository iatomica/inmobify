import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Home, 
  Layers, 
  ArrowRight,
  Shield,
  Sparkles,
  Compass
} from 'lucide-react';
import { CATEGORIES, LOCATIONS, OPERATIONS } from '../../data/propertiesData';

export const Hero = ({ onFilterChange }) => {
  const [selectedOperation, setSelectedOperation] = useState('Todos');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLocation, setSelectedLocation] = useState('Todas las Zonas');

  const handleSearch = () => {
    if (onFilterChange) {
      onFilterChange({
        operation: selectedOperation,
        category: selectedCategory,
        location: selectedLocation
      });
    }
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-[#0f172a] overflow-hidden">
      
      {/* Background Hero Photography with Cinematic Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/hero_residencia_andina.webp"
          alt="Residencia moderna de montaña en los Andes Patagónicos"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
        />
        {/* Deep Slate / Alpine Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/70 to-[#0f172a]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/80 via-transparent to-[#0f172a]/50" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 py-28 text-center flex flex-col items-center">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-[#c26d38]/40 backdrop-blur-md mb-6 shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-[#c26d38]" />
          <span className="font-sans text-xs font-bold tracking-[0.2em] text-slate-200 uppercase">
            PATAGONIA ANDINA &bull; REAL ESTATE BOUTIQUE
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] max-w-4xl drop-shadow-2xl">
          Arquitectura de autor en <br />
          <span className="bg-gradient-to-r from-[#c26d38] via-[#e08b52] to-amber-200 bg-clip-text text-transparent">
            el corazón de los Andes.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 font-sans text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed drop-shadow">
          Cabañas alpinas contemporáneas, residencias con costa de lago, lotes de montaña y locales comerciales exclusivos en Bariloche, Angostura, San Martín y Ushuaia.
        </p>

        {/* Glassmorphic Search Container */}
        <div className="w-full max-w-4xl mt-12 bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-2xl">
          
          {/* Operation Selector Tabs (Comprar, Alquiler Temp, Alquiler Anual) */}
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-800 overflow-x-auto">
            {OPERATIONS.map(op => (
              <button
                key={op}
                onClick={() => setSelectedOperation(op)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedOperation === op
                    ? 'bg-[#c26d38] text-white shadow-lg shadow-amber-950/50'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {op === 'Todos' ? 'Todas las Operaciones' : op}
              </button>
            ))}
          </div>

          {/* Form Filter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Category Filter */}
            <div className="text-left">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-[#c26d38]" />
                Tipo de Propiedad
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-[#c26d38] transition-colors cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat === 'Todos' ? 'Todos los Tipos' : cat}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="text-left">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c26d38]" />
                Ubicación Andina
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-[#c26d38] transition-colors cursor-pointer"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Search Submit Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full h-[46px] flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#c26d38] to-[#9e4f21] hover:from-[#e08b52] hover:to-[#c26d38] text-white font-heading font-bold text-sm tracking-wide uppercase shadow-xl hover:shadow-amber-900/40 transition-all hover:translate-y-[-1px]"
              >
                <Search className="w-4 h-4" />
                <span>Explorar Catálogo</span>
              </button>
            </div>

          </div>

        </div>

        {/* High-Impact Statistics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 mt-16 pt-8 border-t border-slate-800/80 w-full max-w-4xl text-center">
          <div>
            <span className="font-heading text-2xl sm:text-3xl font-bold text-white block">+140</span>
            <span className="font-sans text-xs text-slate-400 uppercase tracking-wider">Propiedades Exclusivas</span>
          </div>
          <div>
            <span className="font-heading text-2xl sm:text-3xl font-bold text-[#c26d38] block">4 Zonas</span>
            <span className="font-sans text-xs text-slate-400 uppercase tracking-wider">Patagonia Andina</span>
          </div>
          <div>
            <span className="font-heading text-2xl sm:text-3xl font-bold text-white block">USD $48M+</span>
            <span className="font-sans text-xs text-slate-400 uppercase tracking-wider">Volumen Transaccionado</span>
          </div>
          <div>
            <span className="font-heading text-2xl sm:text-3xl font-bold text-emerald-400 block">100%</span>
            <span className="font-sans text-xs text-slate-400 uppercase tracking-wider">Títulos Auditados</span>
          </div>
        </div>

      </div>

    </section>
  );
};
