import React from 'react';
import { 
  ShieldCheck, 
  Briefcase, 
  Home, 
  KeyRound, 
  Check, 
  ArrowRight, 
  X,
  Sparkles
} from 'lucide-react';

const DEMO_ROLES = [
  {
    id: 'admin',
    name: 'Roberto Valenzuela',
    email: 'admin@inmobify.com',
    role: 'admin',
    title: 'Admin Master / Director General',
    desc: 'Control total de la agencia: métricas financieras, altas/bajas de propiedades, gestión de asesores y aprobación de operaciones.',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    icon: ShieldCheck
  },
  {
    id: 'agent',
    name: 'Ignacio Valenzuela',
    email: 'ignacio.asesor@inmobify.com',
    role: 'agent',
    title: 'Asesor Inmobiliario Senior',
    desc: 'Gestión comercial: agenda de visitas a propiedades, atención de consultas/leads, carga de nuevas tasaciones y cartera de clientes.',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    icon: Briefcase
  },
  {
    id: 'buyer',
    name: 'Mariano López',
    email: 'mariano.inversor@gmail.com',
    role: 'buyer',
    title: 'Cliente Comprador / Inversor',
    desc: 'Panel de comprador: guardado de propiedades favoritas, simulador de crédito hipotecario, ofertas enviadas y visitas agendadas.',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    icon: Home
  },
  {
    id: 'tenant',
    name: 'Valeria Rossi',
    email: 'valeria.inquilino@gmail.com',
    role: 'tenant',
    title: 'Cliente Alquileres / Inquilina',
    desc: 'Panel de locación: seguimiento de contrato de alquiler activo, comprobantes de pago digital, tickets de mantenimiento y reservas de amenities.',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    icon: KeyRound
  }
];

export const LoginRoleModal = ({
  isOpen,
  onClose,
  currentUser,
  onSelectRole
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c26d38]/20 text-[#e08b52] text-[10px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3" />
              <span>PLATAFORMA MULTI-ROL</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Selecciona tu Perfil de Usuario
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DEMO_ROLES.map(roleItem => {
            const Icon = roleItem.icon;
            const isCurrent = currentUser.role === roleItem.role;

            return (
              <div
                key={roleItem.id}
                onClick={() => {
                  onSelectRole(roleItem);
                  onClose();
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  isCurrent
                    ? 'bg-slate-800/90 border-[#c26d38] ring-1 ring-[#c26d38] shadow-lg shadow-amber-950/40'
                    : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/70'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${roleItem.badgeColor} flex items-center gap-1`}>
                      <Icon className="w-3 h-3" />
                      {roleItem.title.split('/')[0]}
                    </span>

                    {isCurrent && (
                      <span className="w-5 h-5 rounded-full bg-[#c26d38] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <h4 className="font-heading text-base font-bold text-white mt-1">
                    {roleItem.name}
                  </h4>
                  <span className="text-xs text-slate-400 block -mt-1 font-mono">
                    {roleItem.email}
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                    {roleItem.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-bold text-[#c26d38]">
                  <span>Ingresar como {roleItem.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
