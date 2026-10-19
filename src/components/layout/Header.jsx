import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  MessageCircle, 
  LayoutDashboard, 
  Globe, 
  Menu, 
  X, 
  Sparkles,
  MapPin,
  ChevronRight
} from 'lucide-react';

export const Header = ({
  currentRoute = 'home',
  onNavigateRoute,
  companyConfig,
  leadsCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPanel = currentRoute === 'panel';

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (isPanel) {
      onNavigateRoute('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top micro bar for quick contact & location (Light Theme) */}
      <div className="hidden md:block bg-slate-50 border-b border-slate-200/70 text-[11px] text-slate-600 py-1.5 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              Sede Central: Maipú 204, Piso 3, Oficina 4, Buenos Aires
            </span>
            <span className="hidden lg:inline text-slate-300">|</span>
            <span className="hidden lg:inline text-slate-500">
              Cobertura 24/7 en Buenos Aires
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`https://wa.me/${companyConfig?.whatsapp || '34688846797'}?text=Hola%20Valmay%20Group,%20solicito%20informaci%C3%B3n`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              WhatsApp Directo: +34 688 84 67 97
            </a>
            <span className="text-slate-300">&bull;</span>
            <a 
              href={`tel:${companyConfig?.phone || '+34688846797'}`}
              className="flex items-center gap-1.5 text-slate-700 hover:text-sky-600 font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              {companyConfig?.phoneFormatted || '+34 688 84 67 97'}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo (Transparent Logo on White Background) */}
        <button 
          onClick={() => onNavigateRoute('home')}
          className="flex items-center gap-3.5 group text-left focus:outline-none cursor-pointer"
        >
          <div className="relative flex items-center">
            <img 
              src="/logo-valmay.png" 
              alt="Valmay Group Logo" 
              className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </div>
          <div className="hidden sm:flex flex-col text-left pl-1 border-l border-slate-300">
            <span className="font-heading text-lg font-bold tracking-wider text-slate-900 group-hover:text-sky-600 transition-colors uppercase leading-tight">
              Valmay Group
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-sky-600 uppercase">
              Servicios & Gestión
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <button 
            onClick={() => handleNavClick('propietarios-airbnb')} 
            className="hover:text-sky-600 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">Para Dueños</span>
            <span>Gestión Airbnb</span>
          </button>
          <button 
            onClick={() => handleNavClick('unidades-disponibles')} 
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Viviendas
          </button>
          <button 
            onClick={() => handleNavClick('servicios')} 
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Servicios
          </button>
          <button 
            onClick={() => handleNavClick('zonas')} 
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Zonas
          </button>
          <button 
            onClick={() => handleNavClick('por-que-valmay')} 
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Por Qué Valmay
          </button>
        </nav>

        {/* Actions Strip */}
        <div className="flex items-center gap-3">
          
          {/* Quick quote button */}
          {!isPanel && (
            <button
              onClick={() => handleNavClick('contacto')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold tracking-wide transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Solicitar Presupuesto</span>
            </button>
          )}

          {/* Toggle Panel Button (/panel) */}
          {isPanel ? (
            <button
              onClick={() => onNavigateRoute('home')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-heading font-semibold text-xs tracking-wide shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>Ver Web Principal</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigateRoute('panel')}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-heading font-semibold text-xs tracking-wide shadow-md hover:shadow-lg shadow-sky-950/20 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4 text-sky-100" />
              <span>Panel de Control</span>
              {leadsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold animate-pulse">
                  {leadsCount}
                </span>
              )}
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer (Light Theme) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-slate-700">
            <button 
              onClick={() => handleNavClick('propietarios-airbnb')} 
              className="text-left hover:text-sky-600 py-1 flex items-center justify-between text-emerald-700 font-bold"
            >
              <span>Gestión Airbnb (Propietarios)</span>
              <ChevronRight className="w-4 h-4 text-emerald-600" />
            </button>
            <button 
              onClick={() => handleNavClick('unidades-disponibles')} 
              className="text-left hover:text-sky-600 py-1 flex items-center justify-between"
            >
              <span>Viviendas Gestionadas</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => handleNavClick('servicios')} 
              className="text-left hover:text-sky-600 py-1 flex items-center justify-between"
            >
              <span>Servicios de Gestión</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => handleNavClick('zonas')} 
              className="text-left hover:text-sky-600 py-1 flex items-center justify-between"
            >
              <span>Zonas de Cobertura</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => handleNavClick('por-que-valmay')} 
              className="text-left hover:text-sky-600 py-1 flex items-center justify-between"
            >
              <span>Por Qué Valmay</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </nav>
          
          <div className="pt-4 border-t border-slate-200 space-y-2.5">
            <div className="text-xs text-slate-600 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>{companyConfig?.phoneFormatted || '+34 688 84 67 97'}</span>
            </div>
            <div className="text-xs text-emerald-600 flex items-center gap-2 font-medium">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Maipú 204, Piso 3, Of. 4, Buenos Aires</span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {isPanel ? (
                <button
                  onClick={() => { setMobileMenuOpen(false); onNavigateRoute('home'); }}
                  className="w-full py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  Ver Sitio Web
                </button>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); onNavigateRoute('panel'); }}
                  className="w-full py-2.5 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Ir al Panel de Control (/panel)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
