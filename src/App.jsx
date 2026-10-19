import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/home/Hero';
import { AirbnbOwnersSection } from './components/home/AirbnbOwnersSection';
import { AvailableUnitsSection } from './components/home/AvailableUnitsSection';
import { ServicesCatalog } from './components/catalog/ServicesCatalog';
import { ServiceDetailModal } from './components/catalog/ServiceDetailModal';
import { PropertyDetailModal } from './components/catalog/PropertyDetailModal';
import { CoverageZones } from './components/home/CoverageZones';
import { WhyValmaySection } from './components/home/WhyValmaySection';
import { Footer } from './components/layout/Footer';
import { AdminPanelPage } from './components/panel/AdminPanelPage';

import {
  INITIAL_HERO_CONFIG,
  INITIAL_COMPANY_CONFIG,
  INITIAL_SERVICES_DATA,
  INITIAL_COVERAGE_ZONES,
  INITIAL_LEADS_DATA,
  INITIAL_AIRBNB_PROPERTIES,
  STORAGE_KEYS
} from './data/valmayData';

export function App() {
  // Routing state ('home' | 'panel')
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/panel') {
      return 'panel';
    }
    return 'home';
  });

  // Sync route changes with browser history
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/panel') {
        setCurrentRoute('panel');
      } else {
        setCurrentRoute('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToRoute = (route) => {
    setCurrentRoute(route);
    const path = route === 'panel' ? '/panel' : '/';
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Persistent State from LocalStorage ---
  const [heroConfig, setHeroConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HERO);
      return saved ? JSON.parse(saved) : INITIAL_HERO_CONFIG;
    } catch {
      return INITIAL_HERO_CONFIG;
    }
  });

  const [companyConfig, setCompanyConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPANY);
      return saved ? JSON.parse(saved) : INITIAL_COMPANY_CONFIG;
    } catch {
      return INITIAL_COMPANY_CONFIG;
    }
  });

  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : INITIAL_SERVICES_DATA;
    } catch {
      return INITIAL_SERVICES_DATA;
    }
  });

  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      return saved ? JSON.parse(saved) : INITIAL_AIRBNB_PROPERTIES;
    } catch {
      return INITIAL_AIRBNB_PROPERTIES;
    }
  });

  const [zones, setZones] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ZONES);
      return saved ? JSON.parse(saved) : INITIAL_COVERAGE_ZONES;
    } catch {
      return INITIAL_COVERAGE_ZONES;
    }
  });

  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
      return saved ? JSON.parse(saved) : INITIAL_LEADS_DATA;
    } catch {
      return INITIAL_LEADS_DATA;
    }
  });

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(heroConfig));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [heroConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(companyConfig));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [companyConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(zones));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [zones]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [leads]);

  // Modal Detail States
  const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);
  const [selectedPropertyDetail, setSelectedPropertyDetail] = useState(null);
  
  // Hero Filters State
  const [catalogFilters, setCatalogFilters] = useState(null);

  const handleAddLead = (newLead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const handleResetDefaults = () => {
    if (window.confirm('¿Restablecer los datos originales de valmaygroup.com? Se reiniciarán textos, viviendas y servicios a la configuración por defecto.')) {
      setHeroConfig(INITIAL_HERO_CONFIG);
      setCompanyConfig(INITIAL_COMPANY_CONFIG);
      setServices(INITIAL_SERVICES_DATA);
      setProperties(INITIAL_AIRBNB_PROPERTIES);
      setZones(INITIAL_COVERAGE_ZONES);
      setLeads(INITIAL_LEADS_DATA);
      localStorage.removeItem(STORAGE_KEYS.HERO);
      localStorage.removeItem(STORAGE_KEYS.COMPANY);
      localStorage.removeItem(STORAGE_KEYS.SERVICES);
      localStorage.removeItem(STORAGE_KEYS.PROPERTIES);
      localStorage.removeItem(STORAGE_KEYS.ZONES);
      localStorage.removeItem(STORAGE_KEYS.LEADS);
      alert('Datos restablecidos a los valores oficiales de Valmay Group.');
    }
  };

  const handleSelectZone = (zoneName) => {
    setCatalogFilters({ zone: zoneName });
    const el = document.getElementById('servicios');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenQuoteModal = (service) => {
    if (service && service.title) {
      setSelectedServiceDetail(service);
    } else {
      const el = document.getElementById('contacto');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If viewing the Admin Panel (/panel)
  if (currentRoute === 'panel') {
    return (
      <AdminPanelPage
        heroConfig={heroConfig}
        onUpdateHeroConfig={setHeroConfig}
        services={services}
        onUpdateServices={setServices}
        properties={properties}
        onUpdateProperties={setProperties}
        zones={zones}
        onUpdateZones={setZones}
        companyConfig={companyConfig}
        onUpdateCompanyConfig={setCompanyConfig}
        leads={leads}
        onUpdateLeads={setLeads}
        onResetDefaults={handleResetDefaults}
        onNavigateHome={() => navigateToRoute('home')}
      />
    );
  }

  // Otherwise, Home Page (Light Theme)
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-sky-600 selection:text-white">
      
      {/* Navigation Header */}
      <Header
        currentRoute={currentRoute}
        onNavigateRoute={navigateToRoute}
        companyConfig={companyConfig}
        leadsCount={leads.filter(l => l.status === 'Pendiente').length}
      />

      {/* Hero Section */}
      <Hero
        heroConfig={heroConfig}
        onFilterChange={setCatalogFilters}
        onOpenQuote={handleOpenQuoteModal}
        zones={zones}
      />

      {/* NEW SECTION 1: Airbnb & Vacation Rental Management for Property Owners (Dividend Calculator) */}
      <AirbnbOwnersSection
        onAddLead={handleAddLead}
      />

      {/* NEW SECTION 2: Available & Managed Units */}
      <AvailableUnitsSection
        properties={properties}
        onSelectProperty={(prop) => setSelectedPropertyDetail(prop)}
      />

      {/* Services Catalog */}
      <ServicesCatalog
        services={services}
        activeFilters={catalogFilters}
        onFilterChange={setCatalogFilters}
        onOpenDetails={(service) => setSelectedServiceDetail(service)}
        onOpenQuote={handleOpenQuoteModal}
      />

      {/* Coverage Zones in Buenos Aires */}
      <CoverageZones
        zones={zones}
        onSelectZone={handleSelectZone}
      />

      {/* Why Valmay Section & Lead Quote Form */}
      <WhyValmaySection
        companyConfig={companyConfig}
        onAddLead={handleAddLead}
      />

      {/* Footer */}
      <Footer
        companyConfig={companyConfig}
        onNavigateToPanel={() => navigateToRoute('panel')}
      />

      {/* Service Detail Modal */}
      {selectedServiceDetail && (
        <ServiceDetailModal
          service={selectedServiceDetail}
          onClose={() => setSelectedServiceDetail(null)}
          onAddLead={handleAddLead}
          companyConfig={companyConfig}
        />
      )}

      {/* Property Detail Modal */}
      {selectedPropertyDetail && (
        <PropertyDetailModal
          property={selectedPropertyDetail}
          onClose={() => setSelectedPropertyDetail(null)}
          onAddLead={handleAddLead}
        />
      )}

    </div>
  );
}

export default App;
