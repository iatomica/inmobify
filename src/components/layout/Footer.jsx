import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ArrowRight,
  LayoutDashboard
} from 'lucide-react';

export const Footer = ({ companyConfig, onNavigateToPanel }) => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 py-16 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src="/logo-valmay.png" 
              alt="Valmay Group Logo" 
              className="h-10 w-auto object-contain"
            />
            <div>
              <span className="font-heading text-xl font-bold text-slate-900 tracking-wide block uppercase">
                {companyConfig?.name || 'Valmay Group'}
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-sky-600 uppercase">
                {companyConfig?.tagline || 'Servicios Integrales y Gestión'}
              </span>
            </div>
          </div>

          <p className="text-xs leading-relaxed max-w-sm text-slate-500 font-sans">
            Un equipo, todas tus soluciones. Especialistas en gestión de viviendas turísticas, alquiler temporario, blanquería, mantenimiento multioficio 24/7 y reformas en Buenos Aires.
          </p>

          <div className="pt-2 flex items-center gap-4 text-[11px] text-slate-500">
            <span>&copy; {new Date().getFullYear()} Valmay Group. Sede Central Buenos Aires.</span>
            <button 
              onClick={onNavigateToPanel} 
              className="text-sky-600 hover:text-sky-700 font-semibold inline-flex items-center gap-1 underline transition-colors cursor-pointer"
            >
              <LayoutDashboard className="w-3 h-3" />
              Acceso Panel /panel
            </button>
          </div>
        </div>

        {/* Cobertura & Sede */}
        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            Sede & Cobertura
          </h4>
          <ul className="space-y-2">
            <li className="text-slate-900 font-bold">{companyConfig?.address || 'Maipú 204, Piso 3, Oficina 4, Buenos Aires'}</li>
            <li>Microcentro & Retiro (Base Central)</li>
            <li>Palermo (Soho & Hollywood)</li>
            <li>Recoleta & Barrio Norte</li>
            <li>Puerto Madero</li>
            <li>Belgrano & Colegiales</li>
            <li>San Telmo & Montserrat</li>
          </ul>
        </div>

        {/* Servicios */}
        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Servicios Principales
          </h4>
          <ul className="space-y-2 text-slate-600">
            <li><a href="#propietarios-airbnb" className="hover:text-sky-600 transition-colors font-semibold text-emerald-700">Gestión Airbnb Propietarios</a></li>
            <li><a href="#unidades-disponibles" className="hover:text-sky-600 transition-colors">Viviendas Gestionadas</a></li>
            <li><a href="#servicios" className="hover:text-sky-600 transition-colors">Limpieza Técnica & Lavandería</a></li>
            <li><a href="#servicios" className="hover:text-sky-600 transition-colors">Mantenimiento Multioficio 24/7</a></li>
            <li><a href="#servicios" className="hover:text-sky-600 transition-colors">Reformas Llave en Mano</a></li>
            <li><a href="#servicios" className="hover:text-sky-600 transition-colors">Mantenimiento de Consorcios</a></li>
          </ul>
        </div>

        {/* Contacto Directo */}
        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-sky-600" />
            Contacto Valmay
          </h4>
          <div className="space-y-2">
            <a 
              href={`tel:${companyConfig?.phone || '+34688846797'}`}
              className="flex items-center gap-2 text-slate-700 hover:text-sky-600 font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>{companyConfig?.phoneFormatted || '+34 688 84 67 97'}</span>
            </a>
            <a 
              href={`mailto:${companyConfig?.email || 'info@valmaygroup.com'}`}
              className="flex items-center gap-2 text-slate-700 hover:text-sky-600 font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>{companyConfig?.email || 'info@valmaygroup.com'}</span>
            </a>
            <div className="flex items-start gap-2 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
              <span>{companyConfig?.schedule || 'Lunes a Domingo: 08:00 - 18:00 (Guardias 24hs)'}</span>
            </div>
          </div>

          <div className="pt-2">
            <a 
              href={`https://wa.me/${companyConfig?.whatsapp || '34688846797'}?text=Hola%20Valmay%20Group,%20solicito%20presupuesto`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <span>Contactar por WhatsApp (+34 688 84 67 97)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
