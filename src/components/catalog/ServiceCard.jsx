import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Wrench, 
  Hammer, 
  ShieldCheck, 
  Briefcase, 
  Clock, 
  ArrowRight,
  Check
} from 'lucide-react';

const ICON_MAP = {
  Building2: Building2,
  Sparkles: Sparkles,
  Wrench: Wrench,
  Hammer: Hammer,
  ShieldCheck: ShieldCheck,
  Briefcase: Briefcase
};

export const ServiceCard = ({ 
  service, 
  onOpenDetails, 
  onOpenQuote 
}) => {
  const IconComponent = ICON_MAP[service.icon] || Sparkles;

  const formatPrice = () => {
    if (!service.priceAmount || service.priceAmount === 0) {
      return service.priceUnit || 'Presupuesto a Medida';
    }
    return `${service.priceType || 'Desde'} ${service.priceAmount} ${service.priceUnit || 'USD'}`;
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl border border-slate-200 hover:border-sky-500 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      
      {/* Card Header & Image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img 
          src={service.image || '/assets/images/services_valmay.jpeg'} 
          alt={service.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-white/95 text-sky-800 text-xs font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-sm border border-slate-200/60">
            <IconComponent className="w-3.5 h-3.5 text-sky-600" />
            {service.category}
          </span>
          {service.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider shadow">
              {service.badge}
            </span>
          )}
        </div>

        {/* Price Tag Overlay at Bottom Left */}
        <div className="absolute bottom-3 left-3">
          <div className="px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 font-heading font-extrabold text-xs shadow-md">
            {formatPrice()}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
            {service.title}
          </h3>
          
          <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {service.shortDesc || service.tagline}
          </p>

          {/* Key Bullet Features */}
          <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100">
            {(service.features || []).slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>

          {/* Sector Badges */}
          {service.sectors && service.sectors.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {service.sectors.slice(0, 3).map((sec, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200/60">
                  {sec}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={() => onOpenQuote(service)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-sm shadow-sky-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Pedir Presupuesto</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onOpenDetails(service)}
            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
            title="Ver detalles completos del servicio"
          >
            Detalles
          </button>
        </div>

      </div>

    </div>
  );
};
