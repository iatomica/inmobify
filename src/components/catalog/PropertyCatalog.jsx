import React, { useState, useMemo } from 'react';
import { PropertyCard } from './PropertyCard';
import { CATEGORIES, OPERATIONS, LOCATIONS } from '../../data/propertiesData';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const PropertyCatalog = ({
  properties,
  currency,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  onScheduleVisit,
  activeFilters,
  onFilterChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedOperation, setSelectedOperation] = useState('Todos');
  const [selectedLocation, setSelectedLocation] = useState('Todas las Zonas');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'surface-desc'

  // Apply parent filters if passed
  React.useEffect(() => {
    if (activeFilters) {
      if (activeFilters.category) setSelectedCategory(activeFilters.category);
      if (activeFilters.operation) setSelectedOperation(activeFilters.operation);
      if (activeFilters.location) setSelectedLocation(activeFilters.location);
    }
  }, [activeFilters]);

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties.filter(item => {
      const matchCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
      const matchOperation = selectedOperation === 'Todos' || item.operation === selectedOperation;
      const matchLocation = selectedLocation === 'Todas las Zonas' || item.location.city === selectedLocation;
      return matchCategory && matchOperation && matchLocation;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
      if (sortBy === 'surface-desc') return (b.specs.coveredM2 || b.specs.totalM2) - (a.specs.coveredM2 || a.specs.totalM2);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [properties, selectedCategory, selectedOperation, selectedLocation, sortBy]);

  return (
    <section id="catalogo" className="py-24 px-6 md:px-12 bg-[#0b1120] border-t border-slate-800 relative">
      
      <div className="max-w-[1440px] mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div>
            <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#c26d38] uppercase block mb-2">
              PORTAFOLIO EXCLUSIVO DE MONTAÑA
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Propiedades Destacadas
            </h2>
          </div>

          <p className="font-sans text-sm text-slate-400 max-w-md">
            Selección curada de residencias de autor, cabañas nórdicas, fracciones de bosque y locales comerciales en las ubicaciones más codiciadas de la Patagonia.
          </p>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="space-y-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#c26d38] text-white shadow-lg shadow-amber-950/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Filter Dropdowns & Sorting Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Operation Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 hidden sm:inline">Operación:</span>
                <select
                  value={selectedOperation}
                  onChange={(e) => setSelectedOperation(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                >
                  {OPERATIONS.map(op => (
                    <option key={op} value={op}>{op === 'Todos' ? 'Todas las operaciones' : op}</option>
                  ))}
                </select>
              </div>

              {/* Location Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 hidden sm:inline">Zona:</span>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                >
                  {LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#c26d38]" />
              <span className="text-xs text-slate-400">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c26d38]"
              >
                <option value="featured">Destacadas Primero</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="surface-desc">Mayor Superficie (m²)</option>
              </select>
            </div>

          </div>

        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                currency={currency}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onOpenDetails={onOpenDetails}
                onScheduleVisit={onScheduleVisit}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
            <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="font-heading text-lg font-bold text-slate-200">No encontramos propiedades con los filtros seleccionados</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Intenta restablecer los filtros de tipo, operación o ubicación para descubrir más oportunidades en la Patagonia.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSelectedOperation('Todos');
                setSelectedLocation('Todas las Zonas');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#c26d38] text-white text-xs font-bold"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

      </div>

    </section>
  );
};
