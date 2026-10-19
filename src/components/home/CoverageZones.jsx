import React from 'react';
import { 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Building, 
  Sun, 
  Compass, 
  Crown, 
  Anchor,
  Navigation
} from 'lucide-react';

const ICON_MAP = {
  MapPin: MapPin,
  Building: Building,
  Sun: Sun,
  Compass: Compass,
  Crown: Crown,
  Anchor: Anchor
};

export const CoverageZones = ({ zones = [], onSelectZone }) => {
  return (
    <section id="zonas" className="py-24 px-6 md:px-12 bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-12 border-b border-slate-200">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-widest">
              <Navigation className="w-3.5 h-3.5 text-sky-600" />
              <span>Red de Cobertura Inmediata</span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Buenos Aires & Zonas de Cobertura
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Con sede central operativa en Microcentro (Maipú 204, Piso 3, Oficina 4), desplegamos equipos técnicos para mantenimiento de consorcios, limpieza de departamentos temporarios y reformas en toda la Ciudad de Buenos Aires.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <span className="text-slate-500 block font-medium">Tiempo medio de respuesta</span>
              <span className="text-slate-900 font-heading font-extrabold text-base">Menos de 25 minutos</span>
            </div>
          </div>
        </div>

        {/* Zones Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map(zone => {
            const ZoneIcon = ICON_MAP[zone.icon] || MapPin;
            const isHeadquarters = zone.id === 'microcentro-retiro' || zone.isHeadquarters;

            return (
              <div 
                key={zone.id}
                onClick={() => onSelectZone && onSelectZone(zone.name)}
                className={`group relative p-6 rounded-3xl transition-all duration-300 cursor-pointer ${
                  isHeadquarters 
                    ? 'bg-gradient-to-br from-sky-50 via-white to-white border-2 border-sky-500 shadow-md' 
                    : 'bg-white border border-slate-200 hover:border-sky-400 hover:shadow-xl shadow-xs'
                }`}
              >
                {/* Badge if HQ */}
                {isHeadquarters && (
                  <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-sky-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                    Sede Central
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    isHeadquarters 
                      ? 'bg-sky-600 text-white shadow-md' 
                      : 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors'
                  }`}>
                    <ZoneIcon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {zone.name}
                    </h3>
                    <span className="text-xs text-sky-700 font-bold block">
                      {zone.role}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-600 leading-relaxed font-sans">
                  {zone.highlight}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold flex items-center gap-1.5 text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    Respuesta: {zone.timeMinutes}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-[11px] font-bold text-slate-700">
                    {zone.coverageType}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Buenos Aires Trust Seal */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 shadow-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Equipos técnicos y vehículos propios para atención inmediata en toda la Ciudad de Buenos Aires.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-700 font-semibold">
            <span>&bull; Facturación formal</span>
            <span>&bull; Cobertura y seguro integral</span>
            <span>&bull; Contratos sin permanencia obligatoria</span>
          </div>
        </div>

      </div>
    </section>
  );
};
