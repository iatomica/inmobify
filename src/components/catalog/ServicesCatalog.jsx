import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Layers, 
  Sparkles, 
  Building2, 
  Wrench, 
  Hammer, 
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { ServiceCard } from './ServiceCard';

export const ServicesCatalog = ({
  services = [],
  activeFilters,
  onFilterChange,
  onOpenDetails,
  onOpenQuote
}) => {
  const [selectedCategory, setSelectedCategory] = useState(activeFilters?.category || 'Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Todos',
    'Gestión Integral',
    'Limpieza',
    'Mantenimiento',
    'Reformas'
  ];

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      // Category filter
      if (selectedCategory !== 'Todos' && service.category !== selectedCategory) {
        return false;
      }
      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = service.title?.toLowerCase().includes(q);
        const inDesc = service.shortDesc?.toLowerCase().includes(q) || service.fullDesc?.toLowerCase().includes(q);
        const inSectors = service.sectors?.some(s => s.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inSectors) return false;
      }
      return true;
    });
  }, [services, selectedCategory, searchQuery]);

  return (
    <section id="servicios" className="py-24 px-6 md:px-12 bg-white border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Portafolio de Especialidades</span>
          </div>
          
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Servicios Integrales y Gestión
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            Unificamos en una única empresa de confianza la administración de propiedades turísticas, la limpieza técnica ecológica, el mantenimiento preventivo y las reformas llave en mano en Buenos Aires y CABA.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                    : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar servicio, sector o avería..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Results Counter */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Mostrando {filteredServices.length} de {services.length} servicios de gestión</span>
          {selectedCategory !== 'Todos' && (
            <button 
              onClick={() => setSelectedCategory('Todos')}
              className="text-sky-600 hover:underline font-semibold"
            >
              Restablecer filtros
            </button>
          )}
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onOpenDetails={onOpenDetails}
                onOpenQuote={onOpenQuote}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 py-16 px-6 text-center bg-white rounded-2xl border border-dashed border-slate-300 max-w-xl mx-auto">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="font-heading text-lg font-bold text-slate-900">No encontramos servicios que coincidan</h3>
            <p className="text-xs text-slate-500 mt-1">Prueba seleccionando otra categoría o borrando los términos de búsqueda.</p>
            <button
              onClick={() => { setSelectedCategory('Todos'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold"
            >
              Ver todos los servicios
            </button>
          </div>
        )}

        {/* Bottom Banner for Custom Consultation */}
        <div className="mt-16 bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">¿Necesitas un plan de gestión a medida?</span>
            <h3 className="font-heading text-2xl font-bold text-slate-900">
              Combinamos varios servicios con tarifa unificada y descuento por volumen
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Si gestionas varias viviendas vacacionales, una comunidad de propietarios o una empresa corporativa, diseñamos un acuerdo operativo con soporte dedicado y guardias 24 horas.
            </p>
          </div>

          <button
            onClick={() => onOpenQuote({ title: 'Plan Integral a Medida Multi-servicio' })}
            className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-heading font-extrabold text-sm tracking-wide shadow-md whitespace-nowrap transition-transform hover:scale-102 cursor-pointer"
          >
            Configurar Plan Personalizado
          </button>
        </div>

      </div>
    </section>
  );
};
