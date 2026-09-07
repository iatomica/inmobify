import React, { useState } from 'react';
import { 
  Building2, 
  Heart, 
  User, 
  DollarSign, 
  Menu, 
  X, 
  ShieldCheck, 
  Briefcase, 
  KeyRound, 
  Home
} from 'lucide-react';

export const Header = ({
  currentUser,
  onOpenLoginModal,
  onOpenDashboard,
  favoritesCount,
  onOpenFavorites,
  currency,
  onToggleCurrency
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return { label: 'Admin Master', icon: ShieldCheck, color: 'bg-red-500/20 text-red-300 border-red-500/40' };
      case 'agent':
        return { label: 'Asesor', icon: Briefcase, color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'tenant':
        return { label: 'Inquilino', icon: KeyRound, color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      default:
        return { label: 'Cliente Inversor', icon: Home, color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
    }
  };

  const badgeInfo = getRoleBadge(currentUser.role);
  const BadgeIcon = badgeInfo.icon;

  return (
    <header className="sticky top-0 z-40 bg-[#0f172a]/85 backdrop-blur-md border-b border-slate-800 transition-all">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c26d38] to-[#8c5828] p-2 flex items-center justify-center shadow-lg shadow-amber-950/40 group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading text-2xl font-bold tracking-tight text-white group-hover:text-[#c26d38] transition-colors">
              INMOBIFY
            </span>
            <span className="font-sans text-[10px] font-semibold tracking-[0.25em] text-[#c26d38] uppercase -mt-1">
              ANDES LUXURY REAL ESTATE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#catalogo" className="hover:text-white transition-colors">Propiedades</a>
          <a href="#zonas" className="hover:text-white transition-colors">Zonas Andinas</a>
          <a href="#arquitectura" className="hover:text-white transition-colors">Consultoría & Tasaciones</a>
          <a href="#inversion" className="hover:text-white transition-colors">Inversiones</a>
        </nav>

        {/* Actions Strip */}
        <div className="hidden sm:flex items-center gap-4">
          
          {/* Currency Toggle (USD / ARS) */}
          <button
            onClick={onToggleCurrency}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200 hover:border-[#c26d38] hover:text-white transition-all shadow-inner"
            title="Cambiar moneda de visualización"
          >
            <DollarSign className="w-3.5 h-3.5 text-[#c26d38]" />
            <span>{currency}</span>
          </button>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-red-400 hover:border-red-400/40 transition-all"
            title="Ver favoritos guardados"
          >
            <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-red-400 text-red-400' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* User Account / Role Switcher */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <button
              onClick={onOpenDashboard}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:border-[#c26d38]/60 text-left transition-all group shadow-md"
            >
              <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 group-hover:bg-[#c26d38] group-hover:text-white transition-colors">
                <User className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white leading-tight">
                  {currentUser.name.split(' ')[0]}
                </span>
                <span className={`text-[10px] font-medium border px-1.5 py-0.2 rounded mt-0.5 inline-flex items-center gap-1 ${badgeInfo.color}`}>
                  <BadgeIcon className="w-2.5 h-2.5" />
                  {badgeInfo.label}
                </span>
              </div>
            </button>

            <button
              onClick={onOpenLoginModal}
              className="px-3 py-2 rounded-xl bg-[#c26d38]/20 hover:bg-[#c26d38] text-[#e08b52] hover:text-white border border-[#c26d38]/40 text-xs font-semibold tracking-wide transition-all"
              title="Cambiar de Rol (Demo)"
            >
              Cambiar Rol
            </button>
          </div>

        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
            <a href="#catalogo" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Propiedades</a>
            <a href="#zonas" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Zonas Andinas</a>
            <a href="#arquitectura" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Consultoría & Tasaciones</a>
            <a href="#inversion" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Inversiones</a>
          </nav>
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
            <button
              onClick={onToggleCurrency}
              className="px-3 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700"
            >
              Moneda: {currency}
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenDashboard(); }}
              className="px-4 py-2 rounded-lg bg-[#c26d38] text-white text-xs font-semibold"
            >
              Panel ({badgeInfo.label})
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenLoginModal(); }}
              className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700"
            >
              Cambiar Rol
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
