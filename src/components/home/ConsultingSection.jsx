import React, { useState } from 'react';
import { Shield, Sparkles, CheckCircle2, Send, FileText, Compass, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ConsultingSection = () => {
  const [valuationSubmitted, setValuationSubmitted] = useState(false);
  const [propertyType, setPropertyType] = useState('Casa Moderna');
  const [zone, setZone] = useState('San Carlos de Bariloche');

  const handleValuationSubmit = (e) => {
    e.preventDefault();
    setValuationSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <section id="arquitectura" className="py-24 px-6 md:px-12 bg-[#0b1120] border-t border-slate-800 relative overflow-hidden">
      
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Value Pillars (60% width) */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>EXPERTOS EN TERRITORIO ANDINO</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Consultoría Integral de Arquitectura, Tasación & Desarrollo.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Comprar o construir en la cordillera exige entender factores críticos: orientación solar, pendientes de montaña, impacto de nieve, reglamentos de construcción sustentable y títulos de dominio con muelle o bosque protegido.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#c26d38]" />
                <span>Tasaciones Oficiales</span>
              </div>
              <p className="text-xs text-slate-400">Valuación rigurosa basada en transacciones reales de lotes y residencias en la cordillera.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#c26d38]" />
                <span>Auditoría Legal de Títulos</span>
              </div>
              <p className="text-xs text-slate-400">100% de expedientes municipales, amojonamientos y dominios verificados antes de publicar.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#c26d38]" />
                <span>Arquitectura & Dirección</span>
              </div>
              <p className="text-xs text-slate-400">Alianzas con los mejores estudios de arquitectura bioclimática de la Patagonia.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#c26d38]" />
                <span>Gestión de Alquiler Temporal</span>
              </div>
              <p className="text-xs text-slate-400">Maximización de renta en USD con servicio integral de check-in, mantenimiento y concierge.</p>
            </div>

          </div>

        </div>

        {/* Right Column: Interactive Valuation Request Box (40% width) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {valuationSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white">Solicitud de Tasación Recibida</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                Un tasador matriculado de nuestro equipo para la zona de <strong className="text-[#c26d38]">{zone}</strong> te contactará en menos de 24hs hábiles para coordinar la inspección o relevamiento documental.
              </p>
              <button
                onClick={() => setValuationSubmitted(false)}
                className="mt-2 px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 font-bold border border-slate-700 hover:text-white"
              >
                Solicitar otra tasación
              </button>
            </div>
          ) : (
            <form onSubmit={handleValuationSubmit} className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-[#c26d38] uppercase tracking-wider block">SIN COSTO &bull; 100% CONFIDENCIAL</span>
                <h3 className="font-heading text-xl font-bold text-white mt-1">
                  Solicitar Tasación de Propiedad
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ingresa los datos de tu inmueble o lote para recibir un informe de mercado comparativo.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tipo de Inmueble</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                >
                  <option value="Casa Moderna">Casa Moderna / Residencia</option>
                  <option value="Cabaña">Cabaña Alpina / Refugio</option>
                  <option value="Lote de Montaña">Lote de Montaña / Fracción</option>
                  <option value="Local Comercial">Local Comercial / Edificio</option>
                  <option value="Departamento">Departamento / Penthouse</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Ubicación Andina</label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                >
                  <option value="San Carlos de Bariloche">San Carlos de Bariloche</option>
                  <option value="Villa La Angostura">Villa La Angostura</option>
                  <option value="San Martín de los Andes">San Martín de los Andes</option>
                  <option value="Ushuaia">Ushuaia</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Superficie Aproximada (m² cubiertos o lote)</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 320 m² cubiertos / 1800 m² lote"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tu Nombre</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Carlos Rossi"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+54 9 294..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c26d38] to-[#9e4f21] hover:from-[#e08b52] hover:to-[#c26d38] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg mt-2"
              >
                Solicitar Informe de Tasación
              </button>
            </form>
          )}
        </div>

      </div>

    </section>
  );
};
