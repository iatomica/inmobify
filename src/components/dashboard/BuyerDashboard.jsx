import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Trash2, 
  ArrowUpRight, 
  TrendingUp, 
  DollarSign, 
  FileText,
  Home,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BuyerDashboard = ({
  isOpen,
  onClose,
  properties,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  currency
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('favorites'); // 'favorites', 'offers'
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [selectedPropertyId, setSelectedPropertyId] = useState(properties[0]?.id || '');

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  const handleSendOffer = (e) => {
    e.preventDefault();
    setOfferSubmitted(true);
    confetti({ particleCount: 50, spread: 60 });
    setTimeout(() => {
      setOfferSubmitted(false);
      setOfferAmount('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 flex items-center justify-center">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">PORTAL DEL COMPRADOR &bull; INVERSOR</span>
              <h3 className="font-heading text-xl font-bold text-white">Mariano López &bull; Inversiones Andinas</h3>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-slate-900">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'favorites' ? 'border-[#c26d38] text-[#e08b52]' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Favoritos Guardados ({favoriteProperties.length})
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'offers' ? 'border-[#c26d38] text-[#e08b52]' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            Enviar Oferta Formal
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {activeTab === 'favorites' && (
            <div>
              {favoriteProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteProperties.map(p => (
                    <div key={p.id} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.title} className="w-14 h-14 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-heading font-bold text-white text-sm line-clamp-1">{p.title}</h4>
                          <span className="text-xs text-[#c26d38] font-bold block">USD ${p.priceUSD.toLocaleString()}</span>
                          <span className="text-[10px] text-slate-400">{p.location.city}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { onClose(); onOpenDetails(p); }}
                          className="p-2 rounded-xl bg-slate-700 hover:bg-[#c26d38] text-white transition-colors"
                          title="Ver Ficha"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onToggleFavorite(p.id)}
                          className="p-2 rounded-xl bg-slate-700 hover:bg-red-500 text-slate-300 hover:text-white transition-colors"
                          title="Quitar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <Heart className="w-10 h-10 mx-auto text-slate-600" />
                  <p className="text-sm">Aún no has guardado propiedades favoritas.</p>
                  <p className="text-xs text-slate-500">Haz clic en el icono de corazón de cualquier propiedad para tenerla a mano.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'offers' && (
            <form onSubmit={handleSendOffer} className="max-w-xl mx-auto space-y-4 bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
              <h4 className="font-heading text-lg font-bold text-white">Presentar Propuesta de Compra</h4>
              
              {offerSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center text-xs font-semibold">
                  ¡Oferta enviada al Asesor! Se pondrán en contacto para confeccionar la reserva formal.
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Propiedad Seleccionada</label>
                    <select
                      value={selectedPropertyId}
                      onChange={(e) => setSelectedPropertyId(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                    >
                      {properties.map(p => (
                        <option key={p.id} value={p.id}>{p.title} (USD ${p.priceUSD.toLocaleString()})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Monto Ofrecido (USD)</label>
                    <input
                      type="number"
                      required
                      placeholder="Ej: 820000"
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Condiciones de Pago & Notas</label>
                    <textarea
                      rows="3"
                      placeholder="Ej: 50% al boleto, 50% a la escritura traslatoria de dominio dentro de los 45 días..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c26d38] to-[#9e4f21] hover:from-[#e08b52] hover:to-[#c26d38] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                  >
                    Enviar Oferta al Directorio
                  </button>
                </>
              )}
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
