import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  Phone, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Plus, 
  Sparkles,
  MapPin,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AgentDashboard = ({ isOpen, onClose, properties }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('visits'); // 'visits', 'leads'

  const [visits, setVisits] = useState([
    {
      id: 'v1',
      client: 'Federico Gómez',
      phone: '+54 9 11 5566-7788',
      property: 'Residencia Volcán & Lago (Bariloche)',
      date: 'Mañana, 15:30 hs',
      type: 'Presencial',
      status: 'Confirmada'
    },
    {
      id: 'v2',
      client: 'Lucía Santoro',
      phone: '+54 9 294 433-2211',
      property: 'Cabaña Refugio A-Frame Nórdico (San Martín)',
      date: 'Jueves 11:00 hs',
      type: 'Tour 3D Virtual',
      status: 'Pendiente'
    },
    {
      id: 'v3',
      client: 'Esteban Morales',
      phone: '+54 9 11 9988-1122',
      property: 'Villa Espejo de Agua (Angostura)',
      date: 'Sábado 17:00 hs',
      type: 'Presencial',
      status: 'Confirmada'
    }
  ]);

  const handleConfirmVisit = (id) => {
    setVisits(prev => prev.map(v => v.id === id ? { ...v, status: 'Confirmada' } : v));
    confetti({ particleCount: 40, spread: 50 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">PANEL DEL ASESOR INMOBILIARIO</span>
              <h3 className="font-heading text-xl font-bold text-white">Ignacio Valenzuela &bull; Asesor Senior</h3>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-slate-900">
          <button
            onClick={() => setActiveTab('visits')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'visits' ? 'border-[#c26d38] text-[#e08b52]' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Agenda de Visitas ({visits.length})
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'leads' ? 'border-[#c26d38] text-[#e08b52]' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Consultas & Leads Nuevos
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {activeTab === 'visits' && (
            <div className="space-y-3">
              {visits.map(v => (
                <div key={v.id} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-base font-bold text-white">{v.client}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border ${
                        v.status === 'Confirmada' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}>
                        {v.status}
                      </span>
                      <span className="text-[10px] text-slate-400">({v.type})</span>
                    </div>
                    <p className="text-xs text-[#c26d38] font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {v.property}
                    </p>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {v.date} &bull; Tel: {v.phone}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={`https://wa.me/5491155667788?text=Hola%20${encodeURIComponent(v.client)},%20te%20escribo%20de%20Inmobify`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    {v.status !== 'Confirmada' && (
                      <button
                        onClick={() => handleConfirmVisit(v.id)}
                        className="px-3 py-2 rounded-xl bg-[#c26d38] hover:bg-[#e08b52] text-white text-xs font-bold"
                      >
                        Confirmar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300 space-y-1.5">
                <div className="flex justify-between font-bold text-white">
                  <span>Martín D'Alessandro</span>
                  <span className="text-[#c26d38]">Interesado en Lote Altos de Chapelco</span>
                </div>
                <p className="text-slate-400">"Quisiera saber si el lote acepta permuta o financiación directa del propietario hasta 24 cuotas."</p>
                <div className="pt-2 flex gap-2">
                  <a href="mailto:martin.d@gmail.com" className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold">Responder Email</a>
                  <a href="tel:+5491122334455" className="px-3 py-1.5 rounded-lg bg-[#c26d38] hover:bg-[#e08b52] text-white font-semibold">Llamar</a>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
