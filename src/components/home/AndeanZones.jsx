import React from 'react';
import { MapPin, ArrowRight, Mountain, Trees, Compass } from 'lucide-react';

const ZONES = [
  {
    id: 'bariloche',
    name: 'San Carlos de Bariloche',
    province: 'Río Negro',
    badge: 'Capital de Lagos & Montañas',
    propertiesCount: 48,
    highlight: 'Circuito Chico, Arelauquen Golf & Country Club, Bahía Serena',
    image: '/assets/images/hero_residencia_andina.webp'
  },
  {
    id: 'villa-la-angostura',
    name: 'Villa La Angostura',
    province: 'Neuquén',
    badge: 'Jardín de la Patagonia',
    propertiesCount: 32,
    highlight: 'Country Club Cumelén, Puerto Manzano, Lago Correntoso',
    image: '/assets/images/casa_moderna_lago.webp'
  },
  {
    id: 'san-martin-de-los-andes',
    name: 'San Martín de los Andes',
    province: 'Neuquén',
    badge: 'Refugio Andino de Autor',
    propertiesCount: 39,
    highlight: 'Cerro Chapelco Golf & Resort, Lago Lácar, Los Riscos',
    image: '/assets/images/cabana_alpina_bosque.webp'
  },
  {
    id: 'ushuaia',
    name: 'Ushuaia & Canal Beagle',
    province: 'Tierra del Fuego',
    badge: 'Fin del Mundo & Vistas Glaciares',
    propertiesCount: 21,
    highlight: 'Glaciar Martial, Paseo Costero del Beagle, Valle de Lobos',
    image: '/assets/images/departamento_penthouse_andino.webp'
  }
];

export const AndeanZones = ({ onSelectZone }) => {
  return (
    <section id="zonas" className="py-24 px-6 md:px-12 bg-[#0f172a] border-t border-slate-800 relative">
      <div className="max-w-[1440px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c26d38]/10 text-[#c26d38] border border-[#c26d38]/30 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>UBICACIONES PRIVILEGIADAS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Zonas Andinas Estratégicas
          </h2>
          <p className="text-sm text-slate-400">
            Descubre las micro-regiones con mayor plusvalía, belleza natural y desarrollo arquitectónico sustentable de los Andes.
          </p>
        </div>

        {/* 4 Zones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ZONES.map(zone => (
            <div
              key={zone.id}
              onClick={() => onSelectZone && onSelectZone(zone.name)}
              className="group cursor-pointer relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-[#c26d38]/60 transition-all duration-500 hover:shadow-2xl flex flex-col"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src={zone.image}
                  alt={zone.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-slate-200 border border-slate-700">
                  {zone.propertiesCount} Propiedades
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-slate-900">
                <div>
                  <span className="text-[10px] font-bold text-[#c26d38] uppercase tracking-wider block">
                    {zone.badge}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#c26d38] transition-colors mt-0.5">
                    {zone.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {zone.highlight}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-[#c26d38] group-hover:text-white transition-colors">
                  <span>Ver inmuebles</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
