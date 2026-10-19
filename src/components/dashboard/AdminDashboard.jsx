import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  TrendingUp, 
  Building2, 
  Users, 
  DollarSign, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Sparkles,
  Search,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminDashboard = ({
  isOpen,
  onClose,
  properties,
  onAddProperty,
  onUpdatePrice,
  onDeleteProperty,
  currency
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory', 'new-property', 'metrics'
  const [searchTerm, setSearchTerm] = useState('');

  // Form for New Property
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Casas Modernas');
  const [newOperation, setNewOperation] = useState('Venta');
  const [newPriceUSD, setNewPriceUSD] = useState('');
  const [newCity, setNewCity] = useState('San Carlos de Bariloche');
  const [newZone, setNewZone] = useState('');
  const [newCoveredM2, setNewCoveredM2] = useState('');
  const [newTotalM2, setNewTotalM2] = useState('');
  const [newBedrooms, setNewBedrooms] = useState('3');
  const [newBathrooms, setNewBathrooms] = useState('2');
  const [newDescription, setNewDescription] = useState('');
  const [createdSuccess, setCreatedSuccess] = useState(false);

  const handleCreateProperty = (e) => {
    e.preventDefault();
    const createdItem = {
      id: `prop-${Date.now()}`,
      title: newTitle,
      tagline: `${newCategory} de diseño en ${newCity}`,
      category: newCategory,
      operation: newOperation,
      featured: true,
      priceUSD: Number(newPriceUSD),
      priceARS: Number(newPriceUSD) * 1250,
      expensesUSD: 200,
      location: {
        city: newCity,
        zone: newZone || 'Zona Residencial Andina',
        province: newCity === 'Ushuaia' ? 'Tierra del Fuego' : (newCity === 'San Carlos de Bariloche' ? 'Río Negro' : 'Neuquén')
      },
      specs: {
        coveredM2: Number(newCoveredM2) || 200,
        totalM2: Number(newTotalM2) || 1200,
        bedrooms: Number(newBedrooms) || 3,
        bathrooms: Number(newBathrooms) || 2,
        parking: 2,
        yearBuilt: 2024
      },
      image: '/assets/images/hero_residencia_andina.webp',
      gallery: ['/assets/images/hero_residencia_andina.webp'],
      description: newDescription || 'Propiedad de autor con vistas privilegiadas a los lagos y cordillera andina.',
      amenities: ['Vista Panorámica', 'Losa Radiante', 'Seguridad 24hs', 'Bosque Nativo'],
      agent: {
        name: 'Ignacio Valenzuela',
        role: 'Socio & Asesor Senior',
        phone: '+54 9 294 482-1940',
        email: 'ignacio.valenzuela@inmobify.com'
      }
    };

    onAddProperty(createdItem);
    setCreatedSuccess(true);
    confetti({ particleCount: 60, spread: 60 });
    setTimeout(() => {
      setCreatedSuccess(false);
      setActiveTab('inventory');
      setNewTitle('');
      setNewPriceUSD('');
    }, 1500);
  };

  const filteredProps = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block">PANEL DE CONTROL GENERAL</span>
              <h3 className="font-heading text-xl font-bold text-white">Admin Master &bull; Gestión Inmobiliaria</h3>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-slate-900">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'inventory' ? 'border-[#c26d38] text-[#e08b52]' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Inventario ({properties.length})
          </button>
          <button
            onClick={() => setActiveTab('new-property')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'new-property' ? 'border-[#c26d38] text-[#e08b52]' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Publicar Propiedad
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'metrics' ? 'border-[#c26d38] text-[#e08b52]' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Métricas de Agencia
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Tab 1: Inventory Table */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              
              {/* Search Bar in Table */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Buscar por título o ciudad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#c26d38]"
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Inmueble</th>
                      <th className="p-3">Tipo / Operación</th>
                      <th className="p-3">Ubicación</th>
                      <th className="p-3">Precio (USD)</th>
                      <th className="p-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                    {filteredProps.map(p => (
                      <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 font-semibold text-white flex items-center gap-2">
                          <img src={p.image} alt={p.title} className="w-10 h-8 rounded object-cover" />
                          <span className="truncate max-w-[200px]">{p.title}</span>
                        </td>
                        <td className="p-3">
                          <span className="text-slate-300 block">{p.category}</span>
                          <span className="text-[10px] text-slate-400 uppercase">{p.operation}</span>
                        </td>
                        <td className="p-3">{p.location.city}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white">USD ${p.priceUSD.toLocaleString()}</span>
                            <button
                              onClick={() => {
                                const newP = prompt(`Nuevo precio para ${p.title} (USD):`, p.priceUSD);
                                if (newP && !isNaN(Number(newP))) {
                                  onUpdatePrice(p.id, Number(newP));
                                }
                              }}
                              className="p-1 hover:text-[#c26d38]"
                              title="Editar precio"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => onDeleteProperty(p.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                            title="Eliminar del catálogo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* Tab 2: Create Property Form */}
          {activeTab === 'new-property' && (
            <form onSubmit={handleCreateProperty} className="space-y-4 max-w-2xl mx-auto bg-slate-800/40 p-6 rounded-2xl border border-slate-700/60">
              <h4 className="font-heading text-lg font-bold text-white">Cargar Nueva Propiedad al Catálogo</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Título de la Publicación</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Residencia Altos del Nahuel"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tipo de Propiedad</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                  >
                    <option value="Casas Modernas">Casas Modernas</option>
                    <option value="Cabañas">Cabañas</option>
                    <option value="Lotes de Montaña">Lotes de Montaña</option>
                    <option value="Locales Comerciales">Locales Comerciales</option>
                    <option value="Departamentos">Departamentos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Operación</label>
                  <select
                    value={newOperation}
                    onChange={(e) => setNewOperation(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                  >
                    <option value="Venta">Venta</option>
                    <option value="Alquiler Temporal">Alquiler Temporal</option>
                    <option value="Alquiler Anual">Alquiler Anual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Precio (USD)</label>
                  <input
                    type="number"
                    required
                    placeholder="Ej: 450000"
                    value={newPriceUSD}
                    onChange={(e) => setNewPriceUSD(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Ciudad Andina</label>
                  <select
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                  >
                    <option value="San Carlos de Bariloche">San Carlos de Bariloche</option>
                    <option value="Villa La Angostura">Villa La Angostura</option>
                    <option value="San Martín de los Andes">San Martín de los Andes</option>
                    <option value="Ushuaia">Ushuaia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">M² Cubiertos</label>
                  <input
                    type="number"
                    placeholder="Ej: 280"
                    value={newCoveredM2}
                    onChange={(e) => setNewCoveredM2(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">M² Totales / Terreno</label>
                  <input
                    type="number"
                    placeholder="Ej: 1500"
                    value={newTotalM2}
                    onChange={(e) => setNewTotalM2(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c26d38]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c26d38] to-[#9e4f21] hover:from-[#e08b52] hover:to-[#c26d38] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md mt-4 flex items-center justify-center gap-2"
              >
                {createdSuccess ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{createdSuccess ? '¡Propiedad Publicada!' : 'Publicar Inmueble'}</span>
              </button>
            </form>
          )}

          {/* Tab 3: Metrics */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Volumen Total Catálogo</span>
                  <span className="font-heading text-2xl font-bold text-white block mt-1">USD $4,840,000</span>
                  <span className="text-[10px] text-emerald-400 mt-1 block">+12% vs trimestre anterior</span>
                </div>
                <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Comisiones Estimadas</span>
                  <span className="font-heading text-2xl font-bold text-[#c26d38] block mt-1">USD $193,600</span>
                  <span className="text-[10px] text-slate-400 mt-1 block">Tasa media 4% de honorarios</span>
                </div>
                <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Visitas Agendadas Mes</span>
                  <span className="font-heading text-2xl font-bold text-emerald-400 block mt-1">38 Visitas</span>
                  <span className="text-[10px] text-slate-400 mt-1 block">94% de asistencia presencial</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
