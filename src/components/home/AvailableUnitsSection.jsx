import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Star, 
  Users, 
  BedDouble, 
  Bath, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';

export const AvailableUnitsSection = ({ properties = [], onSelectProperty }) => {
  const [selectedZone, setSelectedZone] = useState('Todas');

  const zones = ['Todas', 'Retiro', 'Palermo', 'Recoleta', 'Puerto Madero', 'Belgrano', 'San Telmo'];

  const filtered = useMemo(() => {
    if (selectedZone === 'Todas') return properties;
    return properties.filter(p => p.zone.toLowerCase().includes(selectedZone.toLowerCase()));
  }, [properties, selectedZone]);

  return (
    <section id="unidades-disponibles" className="py-24 px-6 md:px-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-widest">
              <Building2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Portafolio Temporario & Residencial</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Unidades Gestionadas por Valmay
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Descubre los departamentos y lofts que confían en nuestro equipo para su mantenimiento, limpieza y comercialización de alquiler temporario en Buenos Aires.
            </p>
          </div>

          {/* Zone Selector Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {zones.map(z => (
              <button
                key={z}
                onClick={() => setSelectedZone(z)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedZone === z
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {z}
              </button>
            ))}
          </div>
        </div>

        {/* Units Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(property => (
            <div
              key={property.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-sky-400 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Image & Badge */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-200">
                <img
                  src={property.image || '/assets/images/services_valmay.jpeg'}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{property.rating}</span>
                    <span className="text-slate-500 font-normal">({property.reviewsCount})</span>
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-sky-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                    {property.status || 'Disponible'}
                  </span>
                </div>

                {/* Nightly price overlay */}
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="font-heading text-2xl font-black drop-shadow">
                    USD {property.nightPrice}
                  </span>
                  <span className="text-xs text-slate-200 font-medium ml-1">/ noche</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-sky-600 font-bold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{property.zone}</span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
                    {property.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {property.description}
                  </p>

                  {/* Specs */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {property.guests} huéspedes
                    </span>
                    <span className="flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5 text-slate-400" />
                      {property.rooms} hab.
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-slate-400" />
                      {property.bathrooms} baños
                    </span>
                  </div>

                </div>

                {/* Card Button */}
                <button
                  type="button"
                  onClick={() => onSelectProperty && onSelectProperty(property)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-heading font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Ficha & Disponibilidad</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div>
            <h4 className="font-heading font-bold text-slate-900 text-base">¿Tienes una vivienda turística en alquiler?</h4>
            <p className="text-xs text-slate-500">Unimos tu propiedad a nuestro catálogo y nos encargamos de todo con garantía de satisfacción.</p>
          </div>
          <a
            href="#propietarios-airbnb"
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold whitespace-nowrap shadow-sm"
          >
            Quiero que gestionen mi vivienda
          </a>
        </div>

      </div>
    </section>
  );
};
