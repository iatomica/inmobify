import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  MapPin, 
  Inbox, 
  Settings, 
  Globe, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  RotateCcw,
  CheckCircle2,
  Clock,
  Eye,
  Building2,
  TrendingUp,
  BedDouble,
  Bath,
  Users,
  DollarSign
} from 'lucide-react';

export const AdminPanelPage = ({
  heroConfig,
  onUpdateHeroConfig,
  services,
  onUpdateServices,
  properties = [],
  onUpdateProperties,
  zones,
  onUpdateZones,
  companyConfig,
  onUpdateCompanyConfig,
  leads,
  onUpdateLeads,
  onResetDefaults,
  onNavigateHome
}) => {
  const [activeTab, setActiveTab] = useState('home-editor'); // 'home-editor' | 'services' | 'properties' | 'zones' | 'leads' | 'settings'
  const [toastMessage, setToastMessage] = useState(null);

  // Home Editor Local State
  const [localHero, setLocalHero] = useState({ ...heroConfig });
  
  // Services Management State
  const [editingService, setEditingService] = useState(null);
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);
  const [newServiceForm, setNewServiceForm] = useState({
    title: '',
    category: 'Gestión Integral',
    priceType: 'Desde',
    priceAmount: 50,
    priceUnit: 'USD/mes',
    tagline: '',
    shortDesc: '',
    featuresText: 'Check-in y supervisión\nLimpieza y desinfección\nMantenimiento preventivo',
    badge: 'Nuevo',
    icon: 'Sparkles',
    image: '/assets/images/services_valmay.jpeg'
  });

  // Properties / Airbnb Management State
  const [editingProperty, setEditingProperty] = useState(null);
  const [isNewPropertyModalOpen, setIsNewPropertyModalOpen] = useState(false);
  const [newPropertyForm, setNewPropertyForm] = useState({
    title: '',
    zone: 'Recoleta',
    address: 'Maipú 204, Piso 3, Oficina 4',
    rooms: 2,
    bathrooms: 1,
    guests: 4,
    nightPrice: 120,
    monthlyYieldEstimate: 2400,
    occupancyRate: 90,
    rating: 4.95,
    reviewsCount: 15,
    status: 'Disponible',
    image: '/assets/images/services_valmay.jpeg',
    description: 'Vivienda turística con servicio de gestión integral por Valmay Group en Buenos Aires. Incluye limpieza técnica textil, cerradura inteligente y supervisión 24/7.'
  });

  // Company Local State
  const [localCompany, setLocalCompany] = useState({ ...companyConfig });

  React.useEffect(() => {
    setLocalCompany({ ...companyConfig });
  }, [companyConfig]);

  React.useEffect(() => {
    setLocalHero({ ...heroConfig });
  }, [heroConfig]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Handlers for Home Editor ---
  const handleSaveHero = (e) => {
    e.preventDefault();
    onUpdateHeroConfig(localHero);
    showToast('¡Contenido del Home guardado y sincronizado correctamente!');
  };

  const handleStatChange = (index, field, value) => {
    const updatedStats = [...localHero.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setLocalHero({ ...localHero, stats: updatedStats });
  };

  // --- Handlers for Services ---
  const handleDeleteService = (id) => {
    if (window.confirm('¿Confirmas que deseas eliminar este servicio del catálogo?')) {
      const updated = services.filter(s => s.id !== id);
      onUpdateServices(updated);
      showToast('Servicio eliminado.');
    }
  };

  const handleSaveServiceEdit = (e) => {
    e.preventDefault();
    const updated = services.map(s => s.id === editingService.id ? editingService : s);
    onUpdateServices(updated);
    setEditingService(null);
    showToast('Servicio actualizado.');
  };

  const handleCreateService = (e) => {
    e.preventDefault();
    const featuresArray = newServiceForm.featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const created = {
      id: `service-${Date.now()}`,
      title: newServiceForm.title,
      category: newServiceForm.category,
      tagline: newServiceForm.tagline,
      shortDesc: newServiceForm.shortDesc,
      fullDesc: newServiceForm.shortDesc,
      priceType: newServiceForm.priceType,
      priceAmount: Number(newServiceForm.priceAmount) || 0,
      priceUnit: newServiceForm.priceUnit,
      badge: newServiceForm.badge,
      icon: newServiceForm.icon,
      image: newServiceForm.image,
      features: featuresArray.length > 0 ? featuresArray : ['Servicio técnico integral', 'Garantía Valmay'],
      sectors: ['Viviendas', 'Empresas', 'Comunidades'],
      responseTime: 'Menos de 2 horas',
      guarantee: '100% Satisfacción'
    };

    onUpdateServices([created, ...services]);
    setIsNewServiceModalOpen(false);
    setNewServiceForm({
      title: '',
      category: 'Gestión Integral',
      priceType: 'Desde',
      priceAmount: 50,
      priceUnit: 'USD/mes',
      tagline: '',
      shortDesc: '',
      featuresText: '',
      badge: 'Nuevo',
      icon: 'Sparkles',
      image: '/assets/images/services_valmay.jpeg'
    });
    showToast('Nuevo servicio agregado al Home.');
  };

  // --- Handlers for Properties (Airbnb Management) ---
  const handleDeleteProperty = (id) => {
    if (window.confirm('¿Confirmas que deseas eliminar esta vivienda del catálogo de unidades gestionadas?')) {
      const updated = properties.filter(p => p.id !== id);
      if (onUpdateProperties) onUpdateProperties(updated);
      showToast('Vivienda eliminada.');
    }
  };

  const handleSavePropertyEdit = (e) => {
    e.preventDefault();
    const updated = properties.map(p => p.id === editingProperty.id ? editingProperty : p);
    if (onUpdateProperties) onUpdateProperties(updated);
    setEditingProperty(null);
    showToast('Vivienda actualizada correctamente.');
  };

  const handleCreateProperty = (e) => {
    e.preventDefault();
    const createdProp = {
      id: `prop-${Date.now()}`,
      title: newPropertyForm.title,
      zone: newPropertyForm.zone,
      address: newPropertyForm.address,
      rooms: Number(newPropertyForm.rooms) || 1,
      bathrooms: Number(newPropertyForm.bathrooms) || 1,
      guests: Number(newPropertyForm.guests) || 2,
      nightPrice: Number(newPropertyForm.nightPrice) || 100,
      monthlyYieldEstimate: Number(newPropertyForm.monthlyYieldEstimate) || 2000,
      occupancyRate: Number(newPropertyForm.occupancyRate) || 90,
      rating: 4.95,
      reviewsCount: 1,
      status: newPropertyForm.status,
      featured: true,
      image: newPropertyForm.image || '/assets/images/services_valmay.jpeg',
      description: newPropertyForm.description,
      amenities: ["Gestión Valmay 24h", "Wifi Alta Velocidad", "Check-in Inteligente", "Limpieza Textil"]
    };

    if (onUpdateProperties) {
      onUpdateProperties([createdProp, ...properties]);
    }

    setIsNewPropertyModalOpen(false);
    showToast('Nueva vivienda turística añadida al catálogo.');
  };

  const handleTogglePropertyStatus = (propId, newStatus) => {
    const updated = properties.map(p => p.id === propId ? { ...p, status: newStatus } : p);
    if (onUpdateProperties) onUpdateProperties(updated);
    showToast(`Estado cambiado a ${newStatus}`);
  };

  // --- Handlers for Leads ---
  const handleUpdateLeadStatus = (leadId, newStatus) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
    onUpdateLeads(updated);
    showToast(`Solicitud actualizada a "${newStatus}"`);
  };

  const handleDeleteLead = (leadId) => {
    const updated = leads.filter(l => l.id !== leadId);
    onUpdateLeads(updated);
    showToast('Solicitud eliminada.');
  };

  // --- Handlers for Company ---
  const handleSaveCompany = (e) => {
    e.preventDefault();
    onUpdateCompanyConfig(localCompany);
    showToast('Datos de la empresa actualizados.');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-100" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar of Admin Panel (Light Theme) */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 lg:px-12 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <img 
            src="/logo-valmay.png" 
            alt="Valmay Group Logo" 
            className="h-9 w-auto object-contain"
          />
          <div className="border-l border-slate-300 pl-4 hidden sm:block">
            <span className="font-heading text-base font-bold text-slate-900 block">
              Panel de Administración Valmay
            </span>
            <span className="text-[11px] text-sky-600 font-bold">
              Gestor de Contenido, Viviendas & Operaciones (/panel)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sincronización en vivo activa</span>
          </div>

          <button
            onClick={onNavigateHome}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Globe className="w-4 h-4 text-sky-600" />
            <span>Ver Sitio Web (Home)</span>
          </button>
        </div>
      </header>

      {/* Main Panel Content with Sidebar Navigation */}
      <div className="flex-1 max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Navigation Tabs (Light Cards) */}
        <aside className="lg:col-span-3 space-y-3">
          <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 block">
              Módulos de Gestión
            </span>

            <button
              onClick={() => setActiveTab('home-editor')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'home-editor'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Editor del Home & Hero</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* NEW MODULE: GESTION DE VIVIENDAS AIRBNB */}
            <button
              onClick={() => setActiveTab('properties')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'properties'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4" />
                <span>Viviendas Airbnb</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-sky-700 font-bold">
                {properties.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4" />
                <span>Gestor de Servicios</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-sky-700 font-bold">
                {services.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('zones')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'zones'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" />
                <span>Zonas de Cobertura</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-sky-700 font-bold">
                {zones.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4" />
                <span>Bandeja de Solicitudes</span>
              </div>
              {leads.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                  {leads.filter(l => l.status === 'Pendiente').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>Datos de Empresa</span>
              </div>
            </button>
          </div>

          {/* Quick Info Box */}
          <div className="p-5 bg-white rounded-3xl border border-slate-200 text-xs text-slate-600 space-y-2 shadow-xs">
            <span className="font-bold text-slate-900 block">Sede Central Buenos Aires</span>
            <p>Maipú 204, Piso 3, Oficina 4, Buenos Aires.</p>
            <p className="text-sky-600 font-bold">WhatsApp: +34 688 84 67 97</p>
          </div>
        </aside>

        {/* Right Main Content Panel (Light Card) */}
        <main className="lg:col-span-9 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          
          {/* TAB 1: HOME & HERO EDITOR */}
          {activeTab === 'home-editor' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900">
                    Editor del Home y Portada
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Modifica los textos principales, botones y cifras destacadas que ven los visitantes al entrar.
                  </p>
                </div>

                <button
                  onClick={handleSaveHero}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios</span>
                </button>
              </div>

              <form onSubmit={handleSaveHero} className="space-y-5">
                
                {/* Badge text */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Etiqueta Superior (Badge del Hero)
                  </label>
                  <input
                    type="text"
                    value={localHero.badge || ''}
                    onChange={(e) => setLocalHero({ ...localHero, badge: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500 font-medium"
                  />
                </div>

                {/* Main Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Titular Principal del Home
                  </label>
                  <input
                    type="text"
                    value={localHero.title || ''}
                    onChange={(e) => setLocalHero({ ...localHero, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-bold focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Párrafo Descriptivo (Subtítulo)
                  </label>
                  <textarea
                    rows={3}
                    value={localHero.subtitle || ''}
                    onChange={(e) => setLocalHero({ ...localHero, subtitle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500 resize-none leading-relaxed"
                  />
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Texto Botón Primario
                    </label>
                    <input
                      type="text"
                      value={localHero.ctaPrimary || ''}
                      onChange={(e) => setLocalHero({ ...localHero, ctaPrimary: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Texto Botón Secundario
                    </label>
                    <input
                      type="text"
                      value={localHero.ctaSecondary || ''}
                      onChange={(e) => setLocalHero({ ...localHero, ctaSecondary: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Background Image Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Imagen de Fondo del Hero
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={localHero.backgroundImage || ''}
                      onChange={(e) => setLocalHero({ ...localHero, backgroundImage: e.target.value })}
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => setLocalHero({ ...localHero, backgroundImage: '/assets/images/hero_valmay.jpg' })}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-xs text-sky-700 font-semibold rounded-xl border border-slate-300"
                    >
                      Usar Oficial Valmay
                    </button>
                  </div>
                </div>

                {/* 4 Stats Editor */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <h3 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Cifras y Estadísticas Destacadas
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(localHero.stats || []).map((stat, i) => (
                      <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                        <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest block">
                          Cifra {i + 1}
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Valor (ej: 99%)"
                            value={stat.value}
                            onChange={(e) => handleStatChange(i, 'value', e.target.value)}
                            className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                          />
                          <input
                            type="text"
                            placeholder="Etiqueta"
                            value={stat.label}
                            onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                            className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Detalle inferior"
                          value={stat.detail || ''}
                          onChange={(e) => handleStatChange(i, 'detail', e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-[11px] text-slate-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar y Publicar en el Home</span>
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB 2: VIVIENDAS / AIRBNB PROPERTIES MANAGER */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900">
                    Gestor de Viviendas Airbnb & Turísticas
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Administra las unidades vacacionales publicadas en la sección de alojamientos disponibles y propuestas para propietarios.
                  </p>
                </div>

                <button
                  onClick={() => setIsNewPropertyModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir Vivienda</span>
                </button>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {properties.map(property => (
                  <div
                    key={property.id}
                    className="p-5 bg-slate-50 border border-slate-200 rounded-3xl flex flex-col justify-between space-y-4 hover:border-sky-400 hover:bg-white hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-start gap-4">
                        <img 
                          src={property.image || '/assets/images/services_valmay.jpeg'} 
                          alt={property.title}
                          className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-sky-600 truncate block">
                              {property.zone}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              property.status === 'Disponible' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {property.status}
                            </span>
                          </div>
                          
                          <h4 className="font-heading text-base font-bold text-slate-900 truncate mt-0.5">
                            {property.title}
                          </h4>

                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {property.address}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-slate-600 mt-2 font-medium">
                            <span>{property.rooms} Hab.</span>
                            <span>&bull;</span>
                            <span>{property.guests} Huéspedes</span>
                            <span>&bull;</span>
                            <span className="text-slate-900 font-bold">USD {property.nightPrice}/noche</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Rendimiento Propietario:</span>
                        <span className="font-bold text-emerald-700">~USD {property.monthlyYieldEstimate}/mes</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <select
                        value={property.status}
                        onChange={(e) => handleTogglePropertyStatus(property.id, e.target.value)}
                        className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-medium"
                      >
                        <option value="Disponible">Disponible</option>
                        <option value="Ocupada">Ocupada</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                      </select>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProperty({ ...property })}
                          className="p-2 rounded-xl bg-slate-200 hover:bg-sky-600 hover:text-white text-slate-700 transition-colors"
                          title="Editar vivienda"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          className="p-2 rounded-xl bg-slate-200 hover:bg-red-600 hover:text-white text-slate-700 transition-colors"
                          title="Eliminar vivienda"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES MANAGER */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900">
                    Gestor de Servicios de Gestión
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Añade, edita precios o descripciones de los servicios que se muestran en el catálogo público.
                  </p>
                </div>

                <button
                  onClick={() => setIsNewServiceModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Nuevo Servicio</span>
                </button>
              </div>

              {/* Service Cards List */}
              <div className="space-y-3">
                {services.map(service => (
                  <div
                    key={service.id}
                    className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-sky-400 hover:bg-white transition-all shadow-xs"
                  >
                    <div className="flex items-start gap-4">
                      <img 
                        src={service.image || '/assets/images/services_valmay.jpeg'} 
                        alt={service.title}
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold uppercase">
                            {service.category}
                          </span>
                          {service.badge && (
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                              {service.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="font-heading text-base font-bold text-slate-900 mt-1">
                          {service.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {service.shortDesc}
                        </p>
                        <span className="text-xs font-bold text-sky-700 block mt-1">
                          Precio: {service.priceType} {service.priceAmount > 0 ? service.priceAmount : ''} {service.priceUnit}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => setEditingService({ ...service })}
                        className="p-2 rounded-xl bg-slate-200 hover:bg-sky-600 hover:text-white text-slate-700 transition-colors cursor-pointer"
                        title="Editar servicio"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="p-2 rounded-xl bg-slate-200 hover:bg-red-600 hover:text-white text-slate-700 transition-colors cursor-pointer"
                        title="Eliminar servicio"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ZONES */}
          {activeTab === 'zones' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-200">
                <h2 className="font-heading text-2xl font-bold text-slate-900">
                  Zonas de Cobertura en Buenos Aires & CABA
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Barrios y sectores donde Valmay Group ofrece intervención presencial y tiempos medios de respuesta con sede central en Maipú 204.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {zones.map(zone => (
                  <div key={zone.id} className="p-5 bg-slate-50 border border-slate-200 rounded-3xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-base font-bold text-slate-900">{zone.name}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold">
                        {zone.timeMinutes}
                      </span>
                    </div>
                    <span className="text-xs text-sky-600 font-bold block">{zone.role}</span>
                    <p className="text-xs text-slate-600">{zone.highlight}</p>
                    <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                      Cobertura: {zone.coverageType}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: LEADS INBOX */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900">
                    Bandeja de Presupuestos & Peticiones
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Solicitudes de presupuesto y estudios de rentabilidad de propietarios recibidas a través de la web.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-sky-800 text-xs font-bold border border-slate-200">
                  {leads.length} solicitudes totales
                </span>
              </div>

              {leads.length > 0 ? (
                <div className="space-y-4">
                  {leads.map(lead => (
                    <div key={lead.id} className="p-5 bg-slate-50 border border-slate-200 rounded-3xl space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-heading text-base font-bold text-slate-900">{lead.name}</h4>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              lead.status === 'Pendiente' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                              lead.status === 'Presupuestado' ? 'bg-sky-100 text-sky-900 border border-sky-300' :
                              'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            }`}>
                              {lead.status}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">{lead.date} &bull; Zona: <strong className="text-slate-700">{lead.zone}</strong></span>
                        </div>

                        {/* Status Switcher & WhatsApp */}
                        <div className="flex items-center gap-2">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-medium"
                          >
                            <option value="Pendiente">Pendiente</option>
                            <option value="Contactado">Contactado</option>
                            <option value="Presupuestado">Presupuestado</option>
                            <option value="Completado">Completado</option>
                          </select>

                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(lead.name)},%20te%20contactamos%20desde%20Valmay%20Group%20respecto%20a%20tu%20solicitud%20de%20gesti%C3%B3n`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                              title="Contactar por WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              WhatsApp
                            </a>
                          )}

                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 rounded-lg bg-slate-200 hover:bg-red-600 hover:text-white text-slate-700"
                            title="Eliminar solicitud"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-white p-3 rounded-2xl border border-slate-200">
                        <div>
                          <span className="text-slate-400 block font-medium">Teléfono:</span>
                          <span className="text-slate-900 font-semibold">{lead.phone}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Email / Tipo:</span>
                          <span className="text-slate-900 font-semibold">{lead.email}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Servicio / Solicitud:</span>
                          <span className="text-sky-700 font-bold">{lead.service}</span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-700 bg-white p-3 rounded-2xl border border-slate-100">
                        <span className="font-bold text-slate-500 block mb-1">Detalle del requerimiento:</span>
                        {lead.message}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
                  No hay solicitudes registradas actualmente.
                </div>
              )}
            </div>
          )}

          {/* TAB 6: COMPANY SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900">
                    Datos Corporativos & Sede
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Información oficial de contacto, dirección central en Maipú 204 (Buenos Aires) y datos legales.
                  </p>
                </div>

                <button
                  onClick={onResetDefaults}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-amber-800 border border-amber-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  title="Restablecer valores oficiales de valmaygroup.com"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restablecer Valores Valmay</span>
                </button>
              </div>

              <form onSubmit={handleSaveCompany} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Comercial</label>
                    <input
                      type="text"
                      value={localCompany.name || ''}
                      onChange={(e) => setLocalCompany({ ...localCompany, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Eslogan</label>
                    <input
                      type="text"
                      value={localCompany.tagline || ''}
                      onChange={(e) => setLocalCompany({ ...localCompany, tagline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono Directo</label>
                    <input
                      type="text"
                      value={localCompany.phone || ''}
                      onChange={(e) => setLocalCompany({ ...localCompany, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono Formateado</label>
                    <input
                      type="text"
                      value={localCompany.phoneFormatted || ''}
                      onChange={(e) => setLocalCompany({ ...localCompany, phoneFormatted: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp</label>
                    <input
                      type="text"
                      value={localCompany.whatsapp || ''}
                      onChange={(e) => setLocalCompany({ ...localCompany, whatsapp: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dirección Sede Física</label>
                  <input
                    type="text"
                    value={localCompany.address || ''}
                    onChange={(e) => setLocalCompany({ ...localCompany, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs sm:text-sm text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email de Contacto</label>
                    <input
                      type="email"
                      value={localCompany.email || ''}
                      onChange={(e) => setLocalCompany({ ...localCompany, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Horarios y Guardias</label>
                    <input
                      type="text"
                      value={localCompany.schedule || ''}
                      onChange={(e) => setLocalCompany({ ...localCompany, schedule: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Datos de Empresa</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: EDIT PROPERTY */}
      {editingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="font-heading text-xl font-bold text-slate-900">Editar Vivienda: {editingProperty.title}</h3>
            
            <form onSubmit={handleSavePropertyEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre / Título de la Vivienda</label>
                <input
                  type="text"
                  required
                  value={editingProperty.title}
                  onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Zona</label>
                  <input
                    type="text"
                    value={editingProperty.zone}
                    onChange={(e) => setEditingProperty({ ...editingProperty, zone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dirección Completa</label>
                  <input
                    type="text"
                    value={editingProperty.address}
                    onChange={(e) => setEditingProperty({ ...editingProperty, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dormitorios</label>
                  <input
                    type="number"
                    value={editingProperty.rooms}
                    onChange={(e) => setEditingProperty({ ...editingProperty, rooms: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Baños</label>
                  <input
                    type="number"
                    value={editingProperty.bathrooms}
                    onChange={(e) => setEditingProperty({ ...editingProperty, bathrooms: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Huéspedes</label>
                  <input
                    type="number"
                    value={editingProperty.guests}
                    onChange={(e) => setEditingProperty({ ...editingProperty, guests: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Precio Noche (USD)</label>
                  <input
                    type="number"
                    value={editingProperty.nightPrice}
                    onChange={(e) => setEditingProperty({ ...editingProperty, nightPrice: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rendimiento Mensual Propietario (USD/mes)</label>
                  <input
                    type="number"
                    value={editingProperty.monthlyYieldEstimate}
                    onChange={(e) => setEditingProperty({ ...editingProperty, monthlyYieldEstimate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estado</label>
                  <select
                    value={editingProperty.status}
                    onChange={(e) => setEditingProperty({ ...editingProperty, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Ocupada">Ocupada</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descripción</label>
                <textarea
                  rows={2}
                  value={editingProperty.description || ''}
                  onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE NEW PROPERTY */}
      {isNewPropertyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="font-heading text-xl font-bold text-slate-900">Registrar Nueva Vivienda Turística</h3>
            
            <form onSubmit={handleCreateProperty} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título / Nombre de la Vivienda *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Penthouse con Terraza y Parrilla Recoleta"
                  value={newPropertyForm.title}
                  onChange={(e) => setNewPropertyForm({ ...newPropertyForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Zona</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Recoleta, Palermo, Microcentro..."
                    value={newPropertyForm.zone}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, zone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dirección</label>
                  <input
                    type="text"
                    required
                    placeholder="Maipú 204, Piso 3, Oficina 4"
                    value={newPropertyForm.address}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dormitorios</label>
                  <input
                    type="number"
                    value={newPropertyForm.rooms}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, rooms: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Baños</label>
                  <input
                    type="number"
                    value={newPropertyForm.bathrooms}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, bathrooms: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Huéspedes</label>
                  <input
                    type="number"
                    value={newPropertyForm.guests}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, guests: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Noche (USD)</label>
                  <input
                    type="number"
                    value={newPropertyForm.nightPrice}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, nightPrice: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dividendo Estimado Propietario (USD/mes)</label>
                  <input
                    type="number"
                    value={newPropertyForm.monthlyYieldEstimate}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, monthlyYieldEstimate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estado</label>
                  <select
                    value={newPropertyForm.status}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Ocupada">Ocupada</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descripción de la Propiedad</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Comodidades, vistas, cercanía a la playa o transporte..."
                  value={newPropertyForm.description}
                  onChange={(e) => setNewPropertyForm({ ...newPropertyForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewPropertyModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                >
                  Publicar Vivienda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT SERVICE */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="font-heading text-xl font-bold text-slate-900">Editar Servicio: {editingService.title}</h3>
            
            <form onSubmit={handleSaveServiceEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título del Servicio</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
                  <select
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                  >
                    <option value="Gestión Integral">Gestión Integral</option>
                    <option value="Limpieza">Limpieza</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                    <option value="Reformas">Reformas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Insignia (Badge)</label>
                  <input
                    type="text"
                    value={editingService.badge || ''}
                    onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tipo Precio</label>
                  <input
                    type="text"
                    value={editingService.priceType || ''}
                    onChange={(e) => setEditingService({ ...editingService, priceType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Monto (USD)</label>
                  <input
                    type="number"
                    value={editingService.priceAmount || 0}
                    onChange={(e) => setEditingService({ ...editingService, priceAmount: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Unidad</label>
                  <input
                    type="text"
                    value={editingService.priceUnit || ''}
                    onChange={(e) => setEditingService({ ...editingService, priceUnit: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descripción Breve</label>
                <textarea
                  rows={2}
                  value={editingService.shortDesc || ''}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE NEW SERVICE */}
      {isNewServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="font-heading text-xl font-bold text-slate-900">Publicar Nuevo Servicio en el Home</h3>
            
            <form onSubmit={handleCreateService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título del Servicio *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Pintura de Fachadas y Tratamiento Antihumedad"
                  value={newServiceForm.title}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
                  <select
                    value={newServiceForm.category}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                  >
                    <option value="Gestión Integral">Gestión Integral</option>
                    <option value="Limpieza">Limpieza</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                    <option value="Reformas">Reformas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Insignia (Badge)</label>
                  <input
                    type="text"
                    placeholder="Ej: Novedad / Más Solicitado"
                    value={newServiceForm.badge}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, badge: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tipo Precio</label>
                  <input
                    type="text"
                    value={newServiceForm.priceType}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, priceType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Monto (USD)</label>
                  <input
                    type="number"
                    value={newServiceForm.priceAmount}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, priceAmount: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Unidad</label>
                  <input
                    type="text"
                    value={newServiceForm.priceUnit}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, priceUnit: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descripción Breve</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Explica en 1 o 2 líneas el servicio para la tarjeta pública..."
                  value={newServiceForm.shortDesc}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, shortDesc: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Características o Tareas (1 por línea)
                </label>
                <textarea
                  rows={3}
                  value={newServiceForm.featuresText}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, featuresText: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                >
                  Publicar Servicio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
