import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/home/Hero';
import { PropertyCatalog } from './components/catalog/PropertyCatalog';
import { PropertyDetailModal } from './components/catalog/PropertyDetailModal';
import { AndeanZones } from './components/home/AndeanZones';
import { ConsultingSection } from './components/home/ConsultingSection';
import { Footer } from './components/layout/Footer';
import { LoginRoleModal } from './components/auth/LoginRoleModal';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { AgentDashboard } from './components/dashboard/AgentDashboard';
import { BuyerDashboard } from './components/dashboard/BuyerDashboard';
import { TenantDashboard } from './components/dashboard/TenantDashboard';
import { PROPERTIES_DATA } from './data/propertiesData';

export function App() {
  // Global Properties State (Editable in real-time by Admin / Agent)
  const [properties, setProperties] = useState(PROPERTIES_DATA);

  // Global Favorites State
  const [favorites, setFavorites] = useState(['residencia-nahuel-huapi', 'cabana-nordica-san-martin']);

  // Currency State (USD / ARS)
  const [currency, setCurrency] = useState('USD');

  // Active User Profile / Role State
  const [currentUser, setCurrentUser] = useState({
    id: 'admin',
    name: 'Roberto Valenzuela',
    email: 'admin@inmobify.com',
    role: 'admin',
    title: 'Admin Master / Director General'
  });

  // Modal Visibility States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAgentDashboardOpen, setIsAgentDashboardOpen] = useState(false);
  const [isBuyerDashboardOpen, setIsBuyerDashboardOpen] = useState(false);
  const [isTenantDashboardOpen, setIsTenantDashboardOpen] = useState(false);
  const [selectedPropertyDetail, setSelectedPropertyDetail] = useState(null);

  // Hero Search Filter State passed to catalog
  const [heroFilters, setHeroFilters] = useState(null);

  const handleToggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'ARS' : 'USD');
  };

  const handleOpenDashboardForRole = () => {
    switch (currentUser.role) {
      case 'admin':
        setIsAdminDashboardOpen(true);
        break;
      case 'agent':
        setIsAgentDashboardOpen(true);
        break;
      case 'tenant':
        setIsTenantDashboardOpen(true);
        break;
      default:
        setIsBuyerDashboardOpen(true);
        break;
    }
  };

  const handleAddProperty = (newProp) => {
    setProperties(prev => [newProp, ...prev]);
  };

  const handleUpdatePrice = (id, newPriceUSD) => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          priceUSD: newPriceUSD,
          priceARS: newPriceUSD * 1250
        };
      }
      return p;
    }));
  };

  const handleDeleteProperty = (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const handleSelectZone = (zoneName) => {
    setHeroFilters({ location: zoneName });
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] font-sans">
      
      {/* Navigation Header */}
      <Header
        currentUser={currentUser}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenDashboard={handleOpenDashboardForRole}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsBuyerDashboardOpen(true)}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
      />

      {/* Hero Section with Advanced Search */}
      <Hero onFilterChange={(filters) => setHeroFilters(filters)} />

      {/* Main Property Catalog */}
      <PropertyCatalog
        properties={properties}
        currency={currency}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onOpenDetails={(prop) => setSelectedPropertyDetail(prop)}
        onScheduleVisit={(prop) => setSelectedPropertyDetail(prop)}
        activeFilters={heroFilters}
        onFilterChange={setHeroFilters}
      />

      {/* Andean Strategic Micro-Zones */}
      <AndeanZones onSelectZone={handleSelectZone} />

      {/* Architectural & Valuation Consulting */}
      <ConsultingSection />

      {/* Footer */}
      <Footer />

      {/* Property Detail Modal */}
      {selectedPropertyDetail && (
        <PropertyDetailModal
          property={selectedPropertyDetail}
          onClose={() => setSelectedPropertyDetail(null)}
          currency={currency}
          isFavorite={favorites.includes(selectedPropertyDetail.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Role Switcher Login Modal */}
      <LoginRoleModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onSelectRole={(roleObj) => {
          setCurrentUser(roleObj);
          if (roleObj.role === 'admin') setIsAdminDashboardOpen(true);
          else if (roleObj.role === 'agent') setIsAgentDashboardOpen(true);
          else if (roleObj.role === 'tenant') setIsTenantDashboardOpen(true);
          else setIsBuyerDashboardOpen(true);
        }}
      />

      {/* Role 1: Admin Master Dashboard */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        properties={properties}
        onAddProperty={handleAddProperty}
        onUpdatePrice={handleUpdatePrice}
        onDeleteProperty={handleDeleteProperty}
        currency={currency}
      />

      {/* Role 2: Asesor Inmobiliario Dashboard */}
      <AgentDashboard
        isOpen={isAgentDashboardOpen}
        onClose={() => setIsAgentDashboardOpen(false)}
        properties={properties}
      />

      {/* Role 3: Cliente Comprador / Inversor Dashboard */}
      <BuyerDashboard
        isOpen={isBuyerDashboardOpen}
        onClose={() => setIsBuyerDashboardOpen(false)}
        properties={properties}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onOpenDetails={(prop) => setSelectedPropertyDetail(prop)}
        currency={currency}
      />

      {/* Role 4: Cliente Alquileres / Inquilino Dashboard */}
      <TenantDashboard
        isOpen={isTenantDashboardOpen}
        onClose={() => setIsTenantDashboardOpen(false)}
      />

    </div>
  );
}

export default App;
