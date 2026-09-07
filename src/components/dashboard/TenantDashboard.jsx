import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  FileText, 
  DollarSign, 
  Wrench, 
  CheckCircle, 
  Calendar, 
  Plus, 
  Download,
  Clock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TenantDashboard = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('lease'); // 'lease', 'payments', 'maintenance'

  // Maintenance tickets state
  const [tickets, setTickets] = useState([
    {
      id: 't-1',
      title: 'Mantenimiento Preventivo de Caldera & Losa Radiante',
      category: 'Calefacción',
      date: '02 Sep 2026',
      status: 'Programado (Jueves 10:00 hs)',
      priority: 'Media'
    },
    {
      id: 't-2',
      title: 'Limpieza estacional de conducto de chimenea',
      category: 'Hogar a Leña',
      date: '15 Ago 2026',
      status: 'Completado',
      priority: 'Baja'
    }
  ]);

  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketCat, setNewTicketCat] = useState('Plomería / Agua');

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicketTitle) return;
    const newT = {
      id: `t-${Date.now()}`,
      title: newTicketTitle,
      category: newTicketCat,
      date: 'Hoy',
      status: 'En Revisión por Administración',
      priority: 'Media'
    };
    setTickets([newT, ...tickets]);
    setNewTicketTitle('');
    confetti({ particleCount: 40, spread: 50 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">PORTAL DEL INQUILINO &bull; ALQUILERES</span>
              <h3 className="font-heading text-xl font-bold text-white">Valeria Rossi &bull; Cabaña Refugio A-Frame</h3>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-slate-900">
          <button
            onClick={() => setActiveTab('lease')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'lease' ? 'border-[#c26d38] text-[#e08b52]' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Contrato Activo
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'payments' ? 'border-[#c26d38] text-[#e08b52]' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            Recibos & Pagos
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'maintenance' ? 'border-[#c26d38] text-[#e08b52]' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            Tickets de Mantenimiento ({tickets.length})
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Tab 1: Lease */}
          {activeTab === 'lease' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">CONTRATO DE LOCACIÓN VIGENTE</span>
                    <h4 className="font-heading text-lg font-bold text-white">Cabaña Refugio A-Frame Nórdico (San Martín de los Andes)</h4>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 self-start">
                    Al Día
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold">Canon Mensual</span>
                    <span className="font-bold text-white text-sm">USD $1,850 /mes</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Vencimiento</span>
                    <span className="font-bold text-white text-sm">10 de cada mes</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Vigencia</span>
                    <span className="font-bold text-white text-sm">01/01/2026 - 31/12/2027</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Garantía</span>
                    <span className="font-bold text-white text-sm">Seguro de Caución Finaer</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Payments */}
          {activeTab === 'payments' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">Alquiler Septiembre 2026</span>
                  <span className="text-slate-400">Abonado el 05/09/2026 &bull; Transferencia Bancaria</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-emerald-400">USD $1,850</span>
                  <button
                    onClick={() => alert('Descargando comprobante fiscal en PDF...')}
                    className="p-2 rounded-lg bg-slate-700 hover:bg-[#c26d38] text-white transition-colors"
                    title="Descargar Recibo"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Maintenance */}
          {activeTab === 'maintenance' && (
            <div className="space-y-6">
              <form onSubmit={handleCreateTicket} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 space-y-3">
                <h5 className="font-heading font-bold text-white text-sm">Abrir Nuevo Ticket de Mantenimiento</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      required
                      placeholder="Descripción breve (ej: Revisión de bomba presurizadora)"
                      value={newTicketTitle}
                      onChange={(e) => setNewTicketTitle(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                    />
                  </div>
                  <div>
                    <select
                      value={newTicketCat}
                      onChange={(e) => setNewTicketCat(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                    >
                      <option value="Plomería / Agua">Plomería / Agua</option>
                      <option value="Calefacción">Calefacción / Losa</option>
                      <option value="Electricidad">Electricidad / Generador</option>
                      <option value="Carpintería">Carpintería / Deck</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#c26d38] hover:bg-[#e08b52] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Enviar Ticket</span>
                </button>
              </form>

              <div className="space-y-3">
                {tickets.map(t => (
                  <div key={t.id} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-[#c26d38] uppercase block">{t.category}</span>
                      <h5 className="font-bold text-white text-sm mt-0.5">{t.title}</h5>
                      <span className="text-slate-400 text-[11px] block mt-0.5">Fecha: {t.date}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-semibold self-start sm:self-auto">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
