import React from 'react';
import { PublicPortal } from './components/PublicPortal';
import { BackofficeApp } from './components/BackofficeApp';
import { WaveDB } from './data/WaveDB';

export default function App() {
  const [viewMode, setViewMode] = React.useState('public'); // 'public' | 'backoffice'

  React.useEffect(() => {
    WaveDB.init();
  }, []);

  return (
    <div className="min-h-screen">
      {viewMode === 'public' ? (
        <PublicPortal onSwitchToBackoffice={() => setViewMode('backoffice')} />
      ) : (
        <BackofficeApp onSwitchToPublic={() => setViewMode('public')} />
      )}
    </div>
  );
}
