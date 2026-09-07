import React from 'react';
import { 
  Heart, 
  MapPin, 
  Maximize2, 
  Bed, 
  Bath, 
  ArrowUpRight, 
  Sparkles,
  Tag
} from 'lucide-react';

export const PropertyCard = ({
  property,
  currency,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  onScheduleVisit
}) => {
  const formattedPrice = currency === 'USD'
    ? `USD $${property.priceUSD.toLocaleString()}`
    : `$${property.priceARS.toLocaleString()} ARS`;

  const getOperationBadgeColor = (op) => {
    switch (op) {
      case 'Venta':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Alquiler Temporal':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Alquiler Anual':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  return (
    <div className="group relative bg-slate-900/90 border border-slate-800 hover:border-[#c26d38]/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/60 flex flex-col">
      
      {/* Property Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-md ${getOperationBadgeColor(property.operation)}`}>
            {property.operation} {property.pricePeriod || ''}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className="p-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-red-400 hover:border-red-400/40 transition-all shadow-md"
            title="Guardar en favoritos"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-400 text-red-400' : ''}`} />
          </button>
        </div>

        {/* Category Pill on Image Bottom */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md text-[11px] font-semibold text-slate-200 border border-slate-700/60">
          <Tag className="w-3 h-3 text-[#c26d38]" />
          <span>{property.category}</span>
        </div>
      </div>

      {/* Property Details Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#c26d38] shrink-0" />
            <span className="truncate">{property.location.zone}, {property.location.city}</span>
          </div>

          {/* Property Title */}
          <h3 
            onClick={() => onOpenDetails(property)}
            className="font-heading text-xl font-bold text-white group-hover:text-[#c26d38] transition-colors cursor-pointer line-clamp-1"
          >
            {property.title}
          </h3>

          {/* Tagline / Brief Excerpt */}
          <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
            {property.tagline}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs text-slate-300">
          <div className="bg-slate-800/50 rounded-lg p-2 flex flex-col items-center justify-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Maximize2 className="w-3 h-3 text-[#c26d38]" />
              Cubiertos
            </span>
            <span className="font-bold text-white mt-0.5">{property.specs.coveredM2 > 0 ? `${property.specs.coveredM2} m²` : `${property.specs.totalM2} m²`}</span>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-2 flex flex-col items-center justify-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Bed className="w-3 h-3 text-[#c26d38]" />
              Dorms
            </span>
            <span className="font-bold text-white mt-0.5">{property.specs.bedrooms > 0 ? property.specs.bedrooms : '-'}</span>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-2 flex flex-col items-center justify-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Bath className="w-3 h-3 text-[#c26d38]" />
              Baños
            </span>
            <span className="font-bold text-white mt-0.5">{property.specs.bathrooms > 0 ? property.specs.bathrooms : '-'}</span>
          </div>
        </div>

        {/* Price & Action Strip */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {property.operation === 'Venta' ? 'Precio de Venta' : 'Canon Locativo'}
            </span>
            <span className="font-heading text-lg sm:text-xl font-bold text-white">
              {formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDetails(property)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-[#c26d38] text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center gap-1 shadow"
            >
              <span>Ver Ficha</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
