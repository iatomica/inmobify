import React from 'react';
import { Building2, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#080d1a] border-t border-slate-800 text-slate-400 py-16 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c26d38] to-[#8c5828] p-2 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-heading text-2xl font-bold text-white tracking-tight block">INMOBIFY</span>
              <span className="font-sans text-[10px] font-semibold tracking-[0.25em] text-[#c26d38] uppercase">ANDES LUXURY REAL ESTATE</span>
            </div>
          </div>

          <p className="text-xs leading-relaxed max-w-sm text-slate-400 font-sans">
            Líderes en comercialización y desarrollo de propiedades de alta gama en la cordillera patagónica. Especialistas en arquitectura de autor, cabañas nórdicas, lotes de montaña y locales comerciales.
          </p>

          <div className="pt-2 text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} INMOBIFY Patagonia S.A. Matrícula C.I. 482 RN. Todos los derechos reservados.
          </div>
        </div>

        {/* Offices */}
        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs">Sedes Andinas</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#c26d38] shrink-0 mt-0.5" /> <span>Bariloche: Av. Bustillo Km 4.8</span></li>
            <li className="flex items-start gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#c26d38] shrink-0 mt-0.5" /> <span>Villa La Angostura: Av. Arrayanes 180</span></li>
            <li className="flex items-start gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#c26d38] shrink-0 mt-0.5" /> <span>San Martín de los Andes: San Martín 820</span></li>
            <li className="flex items-start gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#c26d38] shrink-0 mt-0.5" /> <span>Ushuaia: Av. San Martín 450</span></li>
          </ul>
        </div>

        {/* Links */}
        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs">Navegación</h4>
          <ul className="space-y-2">
            <li><a href="#catalogo" className="hover:text-white transition-colors">Catálogo de Propiedades</a></li>
            <li><a href="#zonas" className="hover:text-white transition-colors">Micro-regiones Andinas</a></li>
            <li><a href="#arquitectura" className="hover:text-white transition-colors">Tasaciones Oficiales</a></li>
            <li><a href="#arquitectura" className="hover:text-white transition-colors">Consultoría de Suelos</a></li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs">Contacto Directo</h4>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#c26d38]" /> <span>+54 9 294 482-1940</span></div>
            <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#c26d38]" /> <span>contacto@inmobify.com</span></div>
          </div>
          <div className="pt-2">
            <span className="text-[11px] text-slate-400 block mb-1 font-semibold">Informe Trimestral del Mercado</span>
            <div className="flex gap-1.5">
              <input type="email" placeholder="Tu email..." className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white" />
              <button className="px-3 py-1.5 rounded-lg bg-[#c26d38] text-white font-bold text-xs">Unirse</button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
