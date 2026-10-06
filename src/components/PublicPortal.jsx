import React from 'react';
import { 
  Search, SlidersHorizontal, MapPin, Bed, Bath, Maximize, 
  Phone, Mail, MessageSquare, ArrowRight, Share2, Heart, 
  Check, Shield, ChevronDown, CheckCircle2, Building, Eye,
  Compass, Waves, ExternalLink, Calendar
} from 'lucide-react';
import { WaveDB } from '../data/WaveDB';

export function PublicPortal({ onSwitchToBackoffice }) {
  const [properties, setProperties] = React.useState(() => WaveDB.getProperties());
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedOperation, setSelectedOperation] = React.useState('ALL');
  const [selectedType, setSelectedType] = React.useState('ALL');
  const [selectedLocation, setSelectedLocation] = React.useState('ALL');
  const [priceMax, setPriceMax] = React.useState('');
  
  const [selectedProperty, setSelectedProperty] = React.useState(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [inquirySent, setInquirySent] = React.useState(false);

  // Form inputs for real lead capture
  const [inqName, setInqName] = React.useState('');
  const [inqEmail, setInqEmail] = React.useState('');
  const [inqPhone, setInqPhone] = React.useState('');
  const [inqMessage, setInqMessage] = React.useState('');

  // Sync with Single Source of Truth
  React.useEffect(() => {
    WaveDB.init();
    const handleUpdate = () => {
      setProperties(WaveDB.getProperties());
    };
    window.addEventListener('wave_db_update', handleUpdate);
    return () => window.removeEventListener('wave_db_update', handleUpdate);
  }, []);

  // Filter properties (strictly published)
  const filteredProperties = React.useMemo(() => {
    return properties.filter(p => {
      if (p.status !== 'PUBLISHED') return false;
      if (selectedOperation !== 'ALL' && p.operation.toUpperCase() !== selectedOperation.toUpperCase()) return false;
      if (selectedType !== 'ALL' && p.type.toUpperCase() !== selectedType.toUpperCase()) return false;
      if (selectedLocation !== 'ALL' && !p.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
      if (priceMax && Number(p.price) > Number(priceMax)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchRef = String(p.reference).includes(q);
        const matchLoc = p.location.toLowerCase().includes(q);
        if (!matchTitle && !matchRef && !matchLoc) return false;
      }
      return true;
    });
  }, [properties, selectedOperation, selectedType, selectedLocation, priceMax, searchQuery]);

  const handleOpenDetail = (prop) => {
    setSelectedProperty(prop);
    setIsDetailOpen(true);
    setInquirySent(false);
  };

  const handleSendInquiry = (e) => {
    e.preventDefault();
    if (!inqName.trim()) return;

    // Real DB insertion into Leads
    WaveDB.createLeadFromInquiry({
      name: inqName.trim(),
      email: inqEmail.trim(),
      phone: inqPhone.trim(),
      propertyRef: selectedProperty ? selectedProperty.reference : null,
      message: inqMessage.trim() || 'Consulta enviada desde el portal web de Wave Real Estate.',
      source: 'Website',
      campaign: 'Ficha Web Ref ' + (selectedProperty ? selectedProperty.reference : 'General')
    });

    setInquirySent(true);
    setInqName('');
    setInqEmail('');
    setInqPhone('');
    setInqMessage('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Wave Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#0D2137] flex items-center justify-center text-white font-bold text-xl tracking-wider shadow-sm">
              W
            </div>
            <div>
              <div className="font-extrabold text-[#0D2137] text-lg tracking-tight leading-none">WAVE</div>
              <div className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">Real Estate Uruguay</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <button 
              onClick={() => { setSelectedOperation('ALL'); setSelectedType('ALL'); }}
              className="hover:text-blue-600 transition-colors"
            >
              Propiedades
            </button>
            <button 
              onClick={() => setSelectedOperation('VENTA')}
              className="hover:text-blue-600 transition-colors"
            >
              Comprar
            </button>
            <button 
              onClick={() => setSelectedOperation('ALQUILER')}
              className="hover:text-blue-600 transition-colors"
            >
              Alquilar
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400 font-normal">Punta del Este • La Barra • José Ignacio</span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSwitchToBackoffice}
            className="flex items-center gap-2 bg-[#0D2137] hover:bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Acceso Agentes / CRM</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[#0D2137] text-white py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1A56DB_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
            <Waves className="w-3.5 h-3.5" />
            <span>Propiedades Exclusivas en la Costa Este</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Encontrá tu próxima propiedad en Punta del Este con Wave.
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
            Apartamentos frente al mar, residencias privadas en barrios cerrados y campos de categoría con asesoramiento personalizado.
          </p>

          {/* Functional Search Bar */}
          <div className="bg-white p-3 rounded-2xl shadow-xl max-w-4xl mx-auto mt-6 text-slate-800 grid grid-cols-1 md:grid-cols-4 gap-2 border border-slate-100">
            {/* Operation */}
            <div className="flex flex-col text-left px-3 py-1.5 border-b md:border-b-0 md:border-r border-slate-100">
              <label className="text-[10px] uppercase font-bold text-slate-400">Operación</label>
              <select
                value={selectedOperation}
                onChange={(e) => setSelectedOperation(e.target.value)}
                className="text-xs font-bold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value="ALL">Todas</option>
                <option value="VENTA">Venta</option>
                <option value="ALQUILER">Alquiler</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="flex flex-col text-left px-3 py-1.5 border-b md:border-b-0 md:border-r border-slate-100">
              <label className="text-[10px] uppercase font-bold text-slate-400">Tipo de Inmueble</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="text-xs font-bold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value="ALL">Todos los tipos</option>
                <option value="APARTAMENTO">Apartamentos</option>
                <option value="CASA">Casas</option>
                <option value="CAMPO">Campos & Chacras</option>
              </select>
            </div>

            {/* Keyword / Reference */}
            <div className="flex flex-col text-left px-3 py-1.5 border-b md:border-b-0 md:border-r border-slate-100">
              <label className="text-[10px] uppercase font-bold text-slate-400">Buscar por Ref / Zona</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ej. Acqua, 815, Brava..."
                className="text-xs font-medium text-slate-800 bg-transparent focus:outline-hidden"
              />
            </div>

            {/* Action Button */}
            <div className="flex items-center">
              <button 
                onClick={() => {}}
                className="w-full h-full min-h-[42px] bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Search className="w-4 h-4" />
                <span>Ver {filteredProperties.length} Resultados</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Propiedades Destacadas</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Inventario real extraído de Wave Real Estate sincronizado en tiempo real.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
            Mostrando <strong>{filteredProperties.length} propiedades</strong>
          </div>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(prop => (
            <div
              key={prop.reference}
              onClick={() => handleOpenDetail(prop)}
              className="wave-card rounded-2xl overflow-hidden cursor-pointer flex flex-col group"
            >
              {/* Image Preview & Badges */}
              <div className="relative h-60 bg-slate-100 overflow-hidden">
                {prop.images && prop.images[0] ? (
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">Sin foto</div>
                )}
                
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-[#0D2137]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                    {prop.operation}
                  </span>
                  <span className="bg-white/90 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                    ID {prop.reference}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 text-slate-900 text-xs font-bold px-2 py-0.5 rounded shadow-xs">
                  {prop.images ? `${prop.images.length} fotos` : '1 foto'}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {prop.type} • {prop.location}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {prop.title}
                  </h3>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-4 text-xs text-slate-600 py-3 border-y border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-slate-400" />
                    <span>{prop.bedrooms || '-'} habs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4 text-slate-400" />
                    <span>{prop.bathrooms || '-'} baños</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize className="w-4 h-4 text-slate-400" />
                    <span>{prop.builtArea ? `${prop.builtArea} m²` : (prop.totalArea ? `${prop.totalArea} m²` : 'Consultar')}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block leading-none">Precio</span>
                    <span className="text-lg font-extrabold text-slate-900">
                      {prop.price > 0 ? `USD ${prop.price.toLocaleString()}` : 'Consultar precio'}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Ver ficha</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Property Detail Modal & Ingestion Form */}
      {isDetailOpen && selectedProperty && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {selectedProperty.operation} • Ref {selectedProperty.reference}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedProperty.title}</h3>
              </div>

              <button 
                onClick={() => setIsDetailOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left 2 Cols: Media Gallery & Full Specs */}
              <div className="md:col-span-2 space-y-6">
                {/* Image Gallery */}
                <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
                  {selectedProperty.images && selectedProperty.images.slice(0, 4).map((img, i) => (
                    <div key={i} className="h-44 bg-slate-100 overflow-hidden">
                      <img src={img} alt="Foto" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Descripción de la Propiedad</h4>
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {selectedProperty.description || 'Sin descripción detallada.'}
                  </p>
                </div>

                {/* Amenities */}
                {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Equipamiento & Amenities</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProperty.amenities.slice(0, 18).map((am, i) => (
                        <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Col: Price Box & Lead Ingestion Form */}
              <div className="space-y-6">
                {/* Price Box */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Valor de la Propiedad</div>
                  <div className="text-3xl font-black text-slate-900">
                    {selectedProperty.price > 0 ? `USD ${selectedProperty.price.toLocaleString()}` : 'Consultar'}
                  </div>
                  <div className="text-xs text-slate-500">
                    Ubicación: <strong>{selectedProperty.location}</strong>
                  </div>
                </div>

                {/* Real Lead Capture Form (Single Source of Truth) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Consultar a un Asesor Wave</h4>
                    <p className="text-[11px] text-slate-500">Tu consulta ingresa directamente al CRM comercial de la inmobiliaria.</p>
                  </div>

                  {inquirySent ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                      <div className="font-bold text-emerald-800 text-xs">¡Consulta enviada con éxito!</div>
                      <p className="text-[11px] text-emerald-700">Un agente comercial te responderá a la brevedad.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSendInquiry} className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Nombre completo *</label>
                        <input
                          type="text"
                          required
                          value={inqName}
                          onChange={(e) => setInqName(e.target.value)}
                          placeholder="Tu nombre y apellido"
                          className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Email *</label>
                        <input
                          type="email"
                          required
                          value={inqEmail}
                          onChange={(e) => setInqEmail(e.target.value)}
                          placeholder="ejemplo@correo.com"
                          className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Teléfono / WhatsApp</label>
                        <input
                          type="tel"
                          value={inqPhone}
                          onChange={(e) => setInqPhone(e.target.value)}
                          placeholder="+598 99 123 456"
                          className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Mensaje</label>
                        <textarea
                          rows={2}
                          value={inqMessage}
                          onChange={(e) => setInqMessage(e.target.value)}
                          placeholder={`Hola, quisiera coordinar una visita para la propiedad Ref ${selectedProperty.reference}...`}
                          className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 focus:outline-hidden"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md"
                      >
                        Enviar Consulta al CRM
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
