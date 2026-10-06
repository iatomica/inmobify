import React, { useState } from 'react';
import { 
  Building2, Users, LayoutDashboard, Home, Search, Compass, 
  ShieldCheck, UserCheck, UserX, Clock, Calendar, CheckSquare, 
  ArrowRight, Phone, Mail, MessageSquare, ChevronRight, Filter,
  Layers, ExternalLink, RefreshCw, BarChart3, Plus, Eye, Edit3, Trash2, 
  CheckCircle2, XCircle, AlertCircle, Bookmark, Star, ArrowUpRight,
  TrendingUp, Activity, Globe, Send, Share2, Inbox, KeyRound, UserPlus,
  Briefcase, FileText, Lock, Unlock, EyeOff, Image as ImageIcon,
  Check, X, Link, SlidersHorizontal, Sparkles, MapPin, Bed, Bath, Maximize
} from 'lucide-react';
import { WaveDB, LEAD_STAGES, PORTAL_CHANNELS } from '../data/WaveDB';
import { MediaLibraryModal } from './MediaLibraryModal';
import { ConfirmModal } from './ConfirmModal';

export function BackofficeApp({ onSwitchToPublic }) {
  const [currentUser, setCurrentUser] = useState(() => WaveDB.getCurrentUser());
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'bucket' | 'properties' | 'owners' | 'tasks' | 'analytics' | 'users' | 'portals' | 'audit'
  const [dbVersion, setDbVersion] = useState(0);

  // State for Global Confirm Modal
  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirmar',
    isDestructive: false,
    onConfirm: () => {}
  });

  const triggerConfirm = ({ title, message, confirmText = 'Confirmar', isDestructive = false, onConfirm }) => {
    setConfirmConfig({
      isOpen: true,
      title,
      message,
      confirmText,
      isDestructive,
      onConfirm
    });
  };

  // Cross-component state sync
  React.useEffect(() => {
    WaveDB.init();
    const handleUpdate = () => setDbVersion(v => v + 1);
    window.addEventListener('wave_db_update', handleUpdate);
    return () => window.removeEventListener('wave_db_update', handleUpdate);
  }, []);

  const users = WaveDB.getUsers();
  const properties = WaveDB.getProperties();
  const leads = WaveDB.getLeads();
  const owners = WaveDB.getOwners();
  const unassignedBucket = WaveDB.getInquiriesBucket();
  const tasks = WaveDB.getTasks(currentUser.role === 'AGENT' ? currentUser.id : null);
  const visits = WaveDB.getVisits(currentUser.role === 'AGENT' ? currentUser.id : null);
  const auditLogs = WaveDB.getAuditLogs();

  const handleUserChange = (u) => {
    WaveDB.setCurrentUser(u);
    setCurrentUser(u);
    if (u.role === 'AGENT' && (activeTab === 'bucket' || activeTab === 'users' || activeTab === 'analytics')) {
      setActiveTab('pipeline');
    }
  };

  const boardTickets = React.useMemo(() => {
    if (currentUser.role === 'AGENT') {
      return leads.filter(l => l.assignedToId === currentUser.id);
    }
    return leads.filter(l => l.assignedToId);
  }, [leads, currentUser]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0D2137] flex items-center justify-center text-white font-extrabold text-base tracking-wider shadow-sm">
              W
            </div>
            <div>
              <div className="font-extrabold text-slate-900 leading-none text-sm tracking-tight">WAVE CRM</div>
              <div className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">Operaciones & Broker</div>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

          {/* Module Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'pipeline' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Board Tickets ({boardTickets.length})
            </button>

            {currentUser.role !== 'AGENT' && (
              <button
                onClick={() => setActiveTab('bucket')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all relative ${
                  activeTab === 'bucket' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Inbox className="w-3.5 h-3.5 text-amber-500" />
                Bucket Consultas
                {unassignedBucket.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-white text-[10px] font-black rounded-full animate-pulse">
                    {unassignedBucket.length}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => setActiveTab('properties')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'properties' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Propiedades ({properties.length})
            </button>

            <button
              onClick={() => setActiveTab('owners')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'owners' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Propietarios ({owners.length})
            </button>

            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'tasks' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              Tareas ({tasks.filter(t => !t.isCompleted).length})
            </button>

            {currentUser.role !== 'AGENT' && (
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'analytics' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Métricas & Actividades
              </button>
            )}

            {currentUser.role === 'SUPER_ADMIN' && (
              <button
                onClick={() => setActiveTab('users')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'users' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Usuarios & RBAC
              </button>
            )}

            <button
              onClick={() => setActiveTab('portals')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'portals' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Portales
            </button>

            {currentUser.role === 'SUPER_ADMIN' && (
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'audit' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Auditoría
              </button>
            )}
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Actuar como:</span>
            <select
              value={currentUser.id}
              onChange={(e) => {
                const sel = users.find(u => u.id === e.target.value);
                if (sel) handleUserChange(sel);
              }}
              className="text-xs font-bold bg-white border border-slate-300 rounded-md px-2 py-0.5 text-slate-800 shadow-2xs focus:outline-hidden cursor-pointer"
            >
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} — [{u.role}]
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onSwitchToPublic}
            className="flex items-center gap-1.5 bg-[#0D2137] hover:bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Ver Portal Web</span>
          </button>
        </div>
      </header>

      {/* Main Backoffice Content View */}
      <main className="flex-1 p-6 overflow-x-auto">
        {activeTab === 'pipeline' && (
          <BoardTicketsView tickets={boardTickets} currentUser={currentUser} />
        )}

        {activeTab === 'bucket' && currentUser.role !== 'AGENT' && (
          <InquiriesBucketView 
            bucket={unassignedBucket} 
            users={users} 
            properties={properties}
            currentUser={currentUser} 
          />
        )}

        {activeTab === 'properties' && (
          <PropertiesCMSView 
            properties={properties} 
            currentUser={currentUser} 
            triggerConfirm={triggerConfirm}
          />
        )}

        {activeTab === 'owners' && (
          <OwnersView owners={owners} properties={properties} users={users} currentUser={currentUser} />
        )}

        {activeTab === 'tasks' && (
          <TasksView tasks={tasks} currentUser={currentUser} />
        )}

        {activeTab === 'analytics' && currentUser.role !== 'AGENT' && (
          <AnalyticsDashboardView 
            properties={properties} 
            leads={leads} 
            users={users} 
            owners={owners} 
            visits={visits}
          />
        )}

        {activeTab === 'users' && currentUser.role === 'SUPER_ADMIN' && (
          <UsersRBACView 
            users={users} 
            currentUser={currentUser} 
            triggerConfirm={triggerConfirm}
          />
        )}

        {activeTab === 'portals' && (
          <PortalsSyncView properties={properties} />
        )}

        {activeTab === 'audit' && currentUser.role === 'SUPER_ADMIN' && (
          <AuditLogView logs={auditLogs} />
        )}
      </main>

      {/* Reusable Confirm Modal for All Actions */}
      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmText={confirmConfig.confirmText}
        isDestructive={confirmConfig.isDestructive}
        onConfirm={confirmConfig.onConfirm}
        onClose={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}

// -------------------------------------------------------------
// 1. INQUIRIES BUCKET (SUPERADMIN & MANAGER: PREVISUALIZAR, CONFIGURAR Y DERIVAR)
// -------------------------------------------------------------
function InquiriesBucketView({ bucket, users, properties, currentUser }) {
  const [selectedLeadForSetup, setSelectedLeadForSetup] = useState(null);
  const activeAgents = users.filter(u => u.status === 'ACTIVE');

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Inbox className="w-6 h-6 text-amber-500" />
            <span>Bucket de Consultas Entrantes (Triage para Manager & Super Admin)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Previsualizá la consulta, configurá parámetros clave y derivala al asesor correspondiente para que aparezca como Ticket activo en su Board.
          </p>
        </div>

        <div className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-lg">
          {bucket.length} consultas por derivar
        </div>
      </div>

      <div className="space-y-4">
        {bucket.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-200 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <div className="text-sm font-bold text-slate-700">¡Bucket al día!</div>
            <p className="text-xs text-slate-400">Todas las consultas han sido configuradas y derivadas a los asesores.</p>
          </div>
        ) : (
          bucket.map(lead => {
            const prop = lead.propertyRef ? WaveDB.getPropertyByRef(lead.propertyRef) : null;
            return (
              <div key={lead.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 hover:border-amber-400 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-base">{lead.firstName} {lead.lastName || ''}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        Canal: {lead.source}
                      </span>
                      {lead.priority === 'URGENT' && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 uppercase">
                          Urgente
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-4 mt-1">
                      <span>Email: <strong className="text-slate-700">{lead.email || 's/d'}</strong></span>
                      <span>Tel / WhatsApp: <strong className="text-slate-700">{lead.phone || 's/d'}</strong></span>
                      <span>Fecha Ingreso: <strong className="text-slate-700">{new Date(lead.createdAt).toLocaleString()}</strong></span>
                    </div>
                  </div>

                  {prop ? (
                    <div className="text-right text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Propiedad Vinculada</div>
                      <div className="font-bold text-blue-600">Ref {prop.reference}: {prop.title}</div>
                      <div className="text-slate-600 font-semibold">USD {prop.price.toLocaleString()} • {prop.location}</div>
                    </div>
                  ) : (
                    <div className="text-right text-xs bg-amber-50 border border-amber-200 rounded-xl p-2.5">
                      <div className="text-[10px] font-bold text-amber-700 uppercase">Consulta General</div>
                      <span className="text-slate-600">Sin propiedad vinculada</span>
                    </div>
                  )}
                </div>

                <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80 text-xs text-slate-700 font-medium">
                  "{lead.notes}"
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-medium">
                    Configurá los parámetros de nutrición del prospecto antes de derivar:
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedLeadForSetup(lead)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-200"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                      <span>Configurar Parámetros</span>
                    </button>

                    <select
                      id={`quick-assign-${lead.id}`}
                      defaultValue=""
                      className="text-xs font-semibold border border-slate-300 rounded-lg px-3 py-1.5 bg-white text-slate-800 focus:outline-hidden"
                    >
                      <option value="" disabled>Seleccionar asesor...</option>
                      {activeAgents.map(ag => (
                        <option key={ag.id} value={ag.id}>
                          {ag.name} ({ag.title})
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => {
                        const sel = document.getElementById(`quick-assign-${lead.id}`).value;
                        if (!sel) return alert('Por favor seleccioná un asesor para derivar la consulta.');
                        WaveDB.assignLead(lead.id, sel);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Derivar a Board</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedLeadForSetup && (
        <ConfigureAndDeriveModal
          lead={selectedLeadForSetup}
          users={activeAgents}
          properties={properties}
          onClose={() => setSelectedLeadForSetup(null)}
          onDerive={(updatedLead, targetAgentId) => {
            WaveDB.updateLead(updatedLead);
            WaveDB.assignLead(updatedLead.id, targetAgentId);
            setSelectedLeadForSetup(null);
          }}
        />
      )}
    </div>
  );
}

function ConfigureAndDeriveModal({ lead, users, properties, onClose, onDerive }) {
  const [targetPropRef, setTargetPropRef] = useState(lead.propertyRef || '');
  const [budget, setBudget] = useState(lead.budget || '');
  const [priority, setPriority] = useState(lead.priority || 'MEDIUM');
  const [prefLocation, setPrefLocation] = useState(lead.prefLocation || 'Brava');
  const [prefCategory, setPrefCategory] = useState(lead.prefCategory || 'Apartamento');
  const [targetAgentId, setTargetAgentId] = useState(users[0]?.id || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!targetAgentId) return alert('Seleccioná un asesor para derivar.');

    const updatedLead = {
      ...lead,
      propertyRef: targetPropRef || null,
      budget: Number(budget) || null,
      priority,
      prefLocation,
      prefCategory
    };

    onDerive(updatedLead, targetAgentId);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Configurar Consulta & Derivar a Ticket</h3>
            <p className="text-xs text-slate-500">Prospecto: {lead.firstName} {lead.lastName || ''}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500">Vincular a Propiedad de Interés</label>
            <select
              value={targetPropRef}
              onChange={(e) => setTargetPropRef(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1 bg-white font-semibold"
            >
              <option value="">-- Consulta Abierta / Sin Propiedad Específica --</option>
              {properties.map(p => (
                <option key={p.reference} value={p.reference}>
                  Ref {p.reference} - {p.title} (USD {p.price.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Presupuesto Estimado (USD)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ej. 1500000"
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1 font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Prioridad Comercial</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1 bg-white font-bold"
              >
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
                <option value="URGENT">Urgente</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Zona Preferida</label>
              <input
                type="text"
                value={prefLocation}
                onChange={(e) => setPrefLocation(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Categoría Buscada</label>
              <select
                value={prefCategory}
                onChange={(e) => setPrefCategory(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1 bg-white"
              >
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Campo">Campo / Chacra</option>
                <option value="Terreno">Terreno</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200">
            <label className="text-[10px] uppercase font-bold text-blue-800">Derivar a Asesor Responsable:</label>
            <select
              value={targetAgentId}
              onChange={(e) => setTargetAgentId(e.target.value)}
              className="w-full text-xs border border-blue-300 rounded-lg p-2 mt-1 bg-white font-bold text-slate-900"
            >
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} — {u.title}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100">
              Cancelar
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs">
              Guardar y Derivar a Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. BOARD COMERCIAL (TICKETS CON TICKER PROPIO & TRATATIVAS)
// -------------------------------------------------------------
function BoardTicketsView({ tickets, currentUser }) {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleDrop = (leadId, targetStageId) => {
    WaveDB.updateLeadStage(leadId, targetStageId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Board Comercial de Tickets</h2>
          <p className="text-xs text-slate-500">
            {currentUser.role === 'AGENT' 
              ? `Tickets asignados a ${currentUser.name} con ticker propio de tratativas y tareas.`
              : 'Supervisión de tickets derivados en proceso comercial.'}
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Total: <strong>{tickets.length} tickets en board</strong></span>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-6 pt-2">
        {LEAD_STAGES.slice(1, 9).map(stage => {
          const stageTickets = tickets.filter(t => t.stage === stage.id);
          return (
            <div 
              key={stage.id} 
              className="w-72 shrink-0 bg-slate-100/90 rounded-2xl border border-slate-200/80 p-3 flex flex-col max-h-[calc(100vh-170px)]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const leadId = e.dataTransfer.getData('text/plain');
                if (leadId) handleDrop(leadId, stage.id);
              }}
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">{stage.label}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                  {stageTickets.length}
                </span>
              </div>

              <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
                {stageTickets.length === 0 ? (
                  <div className="border border-dashed border-slate-300 rounded-xl p-6 text-center text-xs text-slate-400">
                    Sin tickets
                  </div>
                ) : (
                  stageTickets.map(ticket => {
                    const prop = ticket.propertyRef ? WaveDB.getPropertyByRef(ticket.propertyRef) : null;
                    const ticketTasks = WaveDB.getTasks().filter(tsk => tsk.leadId === ticket.id && !tsk.isCompleted);
                    const pendingReminders = ticket.reminders ? ticket.reminders.filter(r => !r.done) : [];

                    return (
                      <div
                        key={ticket.id}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', ticket.id)}
                        onClick={() => setSelectedTicket(ticket)}
                        className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-400 cursor-pointer transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                              Ticket #{ticket.id.slice(-4)}
                            </div>
                            <div className="font-semibold text-slate-900 text-sm leading-tight mt-0.5">
                              {ticket.firstName} {ticket.lastName}
                            </div>
                          </div>
                          {ticket.priority === 'HIGH' && (
                            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                              Alta
                            </span>
                          )}
                        </div>

                        {prop && (
                          <div className="text-xs bg-slate-50 border border-slate-100 rounded-lg p-2 flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <div className="truncate font-medium text-slate-700">
                              Ref {prop.reference}: {prop.title}
                            </div>
                          </div>
                        )}

                        {ticketTasks.length > 0 && (
                          <div className="text-[11px] bg-blue-50 text-blue-800 border border-blue-200 rounded-md px-2 py-1 flex items-center justify-between font-semibold">
                            <div className="flex items-center gap-1.5">
                              <CheckSquare className="w-3 h-3 text-blue-600" />
                              <span>{ticketTasks.length} tarea{ticketTasks.length > 1 ? 's' : ''} pendiente{ticketTasks.length > 1 ? 's' : ''}</span>
                            </div>
                          </div>
                        )}

                        {pendingReminders.length > 0 && (
                          <div className="text-[11px] bg-amber-50 text-amber-800 border border-amber-200 rounded-md px-2 py-1 flex items-center gap-1.5 font-medium">
                            <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                            <span className="truncate">{pendingReminders[0].text}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                          <span className="font-medium text-slate-700">
                            {ticket.budget ? `USD ${ticket.budget.toLocaleString()}` : 'Presupuesto s/d'}
                          </span>
                          <span className="text-slate-400 font-mono">{ticket.source}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedTicket && (
        <TicketDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// TICKET DETAIL MODAL (TICKER PROPIO DE TRATATIVAS)
// -------------------------------------------------------------
function TicketDetailModal({ ticket, onClose }) {
  const [stage, setStage] = useState(ticket.stage);
  const [newTreatyNote, setNewTreatyNote] = useState('');
  const [treatyCategory, setTreatyCategory] = useState('Hito de Tratativa');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskType, setTaskType] = useState('LLAMADA');
  const [reminderText, setReminderText] = useState('');
  
  const [budget, setBudget] = useState(ticket.budget || '');
  const [prefLocation, setPrefLocation] = useState(ticket.prefLocation || '');
  const [prefCategory, setPrefCategory] = useState(ticket.prefCategory || '');

  const [activitiesList, setActivitiesList] = useState(() => WaveDB.getActivities(ticket.id));
  const [tasksList, setTasksList] = useState(() => WaveDB.getTasks().filter(t => t.leadId === ticket.id));
  const [remindersList, setRemindersList] = useState(() => ticket.reminders || []);

  const refreshTicketData = React.useCallback(() => {
    setActivitiesList(WaveDB.getActivities(ticket.id));
    setTasksList(WaveDB.getTasks().filter(t => t.leadId === ticket.id));
    const freshLead = WaveDB.getLeads().find(l => l.id === ticket.id);
    if (freshLead) {
      setRemindersList(freshLead.reminders || []);
    }
  }, [ticket.id]);

  React.useEffect(() => {
    refreshTicketData();
    const handler = () => refreshTicketData();
    window.addEventListener('wave_db_update', handler);
    return () => window.removeEventListener('wave_db_update', handler);
  }, [ticket.id, refreshTicketData]);

  const handleSaveNurturing = () => {
    WaveDB.updateLead({
      ...ticket,
      budget: Number(budget) || null,
      prefLocation,
      prefCategory
    });
    refreshTicketData();
  };

  const handleStageChange = (e) => {
    const s = e.target.value;
    setStage(s);
    WaveDB.updateLeadStage(ticket.id, s);
    refreshTicketData();
  };

  // Add event into this Ticket's specific Ticker
  const handleAddTreaty = (e) => {
    e.preventDefault();
    if (!newTreatyNote.trim()) return;

    WaveDB.addActivity({
      leadId: ticket.id,
      userId: WaveDB.getCurrentUser().id,
      type: 'TREATY_RECORDED',
      title: treatyCategory,
      description: newTreatyNote.trim()
    });

    setNewTreatyNote('');
    refreshTicketData();
  };

  const handleCreateEmbeddedTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    WaveDB.createTask({
      title: taskTitle.trim(),
      type: taskType,
      priority: 'MEDIUM',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      userId: WaveDB.getCurrentUser().id,
      leadId: ticket.id,
      propertyRef: ticket.propertyRef
    });

    setTaskTitle('');
    refreshTicketData();
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!reminderText.trim()) return;

    WaveDB.addReminderToLead(ticket.id, reminderText.trim());
    setReminderText('');
    refreshTicketData();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Ticket #{ticket.id.slice(-4)}
              </span>
              <h3 className="text-lg font-bold text-slate-900">{ticket.firstName} {ticket.lastName}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Capturado desde {ticket.source} • {new Date(ticket.createdAt).toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={stage}
              onChange={handleStageChange}
              className="text-xs font-bold border border-slate-300 rounded-lg px-3 py-1.5 bg-white text-slate-800"
            >
              {LEAD_STAGES.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold">
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Col 1 */}
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Datos del Interesado</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-slate-700">{ticket.email || 'Sin email'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-slate-700">{ticket.phone || 'Sin teléfono'}</span>
                  {ticket.phone && (
                    <a 
                      href={`https://wa.me/${ticket.phone.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="ml-auto text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold hover:bg-emerald-100"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Nutrición de Datos del Prospecto
              </h4>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Presupuesto Máximo (USD)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Ej. 1800000"
                    className="w-full text-xs border border-slate-200 rounded-lg p-2 mt-1 font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Zona de Búsqueda</label>
                  <input
                    type="text"
                    value={prefLocation}
                    onChange={(e) => setPrefLocation(e.target.value)}
                    placeholder="Brava, Manantiales..."
                    className="w-full text-xs border border-slate-200 rounded-lg p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Categoría</label>
                  <input
                    type="text"
                    value={prefCategory}
                    onChange={(e) => setPrefCategory(e.target.value)}
                    placeholder="Casa, Penthouse..."
                    className="w-full text-xs border border-slate-200 rounded-lg p-2 mt-1"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveNurturing}
                  className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-2xs mt-2"
                >
                  Guardar Nutrición
                </button>
              </div>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-blue-600" />
                Tareas Embebidas del Ticket ({tasksList.length})
              </h4>

              <form onSubmit={handleCreateEmbeddedTask} className="flex gap-2">
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Nueva tarea..."
                  className="flex-1 text-xs border border-slate-300 rounded-lg px-2.5 py-1.5"
                />
                <select
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value)}
                  className="text-xs border border-slate-300 rounded-lg px-2 py-1.5 bg-white"
                >
                  <option value="LLAMADA">Llamada</option>
                  <option value="WHATSAPP">WhatsApp</option>
                  <option value="VISITA">Visita</option>
                </select>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs">
                  +
                </button>
              </form>

              <div className="space-y-2">
                {tasksList.map(t => (
                  <div key={t.id} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={t.isCompleted}
                        onChange={() => {
                          WaveDB.toggleTask(t.id);
                          refreshTicketData();
                        }}
                        className="w-3.5 h-3.5 text-blue-600 rounded"
                      />
                      <span className={t.isCompleted ? 'line-through text-slate-400' : 'font-medium text-slate-800'}>
                        {t.title}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
                      {t.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-500" />
                Recordatorios CRM
              </h4>

              <form onSubmit={handleAddReminder} className="flex gap-2">
                <input
                  type="text"
                  value={reminderText}
                  onChange={(e) => setReminderText(e.target.value)}
                  placeholder="Recordatorio..."
                  className="flex-1 text-xs border border-slate-300 rounded-lg px-2.5 py-1.5"
                />
                <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs">
                  Agregar
                </button>
              </form>

              <div className="space-y-1.5">
                {remindersList.map(rem => (
                  <div key={rem.id} className="text-xs bg-amber-50 border border-amber-200 rounded-lg p-2 flex items-center justify-between">
                    <span className={rem.done ? 'line-through text-slate-400' : 'font-medium text-amber-900'}>
                      {rem.text}
                    </span>
                    <button 
                      onClick={() => {
                        WaveDB.toggleLeadReminder(ticket.id, rem.id);
                        refreshTicketData();
                      }}
                      className="text-[10px] font-bold text-amber-700 hover:underline"
                    >
                      {rem.done ? 'Completado' : 'Marcar'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 3: TICKER PROPIO DEL TICKET / TRATATIVAS */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                Ticker Propio de Tratativas ({activitiesList.length})
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Cada hito queda registrado en la consulta y replica en la ficha de propiedad.
              </p>
            </div>

            <form onSubmit={handleAddTreaty} className="space-y-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <div className="flex gap-2">
                <select
                  value={treatyCategory}
                  onChange={(e) => setTreatyCategory(e.target.value)}
                  className="text-xs font-semibold border border-slate-300 rounded-lg px-2 py-1 bg-white"
                >
                  <option value="Hito de Tratativa">Hito General</option>
                  <option value="Llamada Telefónica">Llamada</option>
                  <option value="Mensaje WhatsApp">WhatsApp</option>
                  <option value="Visita Realizada">Visita</option>
                  <option value="Contraoferta Recibida">Contraoferta</option>
                  <option value="Reserva / Compromiso">Reserva</option>
                </select>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTreatyNote}
                  onChange={(e) => setNewTreatyNote(e.target.value)}
                  placeholder="Detalle del avance comercial..."
                  className="flex-1 text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white"
                />
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs shrink-0">
                  Registrar
                </button>
              </div>
            </form>

            <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 max-h-72 overflow-y-auto pr-1">
              {activitiesList.length === 0 ? (
                <p className="text-xs text-slate-400 italic pl-6 py-2">Sin tratativas registradas aún.</p>
              ) : (
                activitiesList.map(act => (
                  <div key={act.id} className="relative pl-6 space-y-1">
                    <span className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-100"></span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{act.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-100">{act.description}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. DASHBOARD ANALYTICS DINÁMICO CON FILTRADO REAL DE ACTIVIDADES
// -------------------------------------------------------------
// 3. DASHBOARD ANALYTICS DINÁMICO MULTI-PARÁMETROS
// -------------------------------------------------------------
function AnalyticsDashboardView({ properties, leads, users, owners, visits }) {
  const [filterAgentId, setFilterAgentId] = useState('ALL');
  const [filterPropertyRef, setFilterPropertyRef] = useState('ALL');
  const [filterStage, setFilterStage] = useState('ALL');
  const [filterSource, setFilterSource] = useState('ALL');
  const [filterPeriod, setFilterPeriod] = useState('ALL'); // 'ALL' | '7D' | '30D'
  const [inspectingTicket, setInspectingTicket] = useState(null);

  // Filtered Leads strictly reacting to all active parameters
  const filteredLeads = React.useMemo(() => {
    return leads.filter(l => {
      // 1. Agent Filter
      let matchAgent = true;
      if (filterAgentId === 'UNASSIGNED') {
        matchAgent = !l.assignedToId;
      } else if (filterAgentId !== 'ALL') {
        matchAgent = l.assignedToId === filterAgentId;
      }

      // 2. Property Filter
      const matchProp = filterPropertyRef === 'ALL' || String(l.propertyRef) === String(filterPropertyRef);

      // 3. Stage Filter
      let matchStage = true;
      if (filterStage !== 'ALL') {
        if (filterStage === 'NUEVO') matchStage = l.stage === 'NUEVO';
        else if (filterStage === 'CONTACTO') matchStage = ['SIN_CONTACTAR', 'CONTACTADO', 'CALIFICADO'].includes(l.stage);
        else if (filterStage === 'VISITA') matchStage = ['VISITA_AGENDADA', 'VISITA_REALIZADA'].includes(l.stage);
        else if (filterStage === 'NEGOCIACION') matchStage = l.stage === 'NEGOCIACION';
        else if (filterStage === 'CIERRE') matchStage = ['RESERVA', 'CERRADO_GANADO'].includes(l.stage);
        else matchStage = l.stage === filterStage;
      }

      // 4. Source / Channel Filter
      const matchSource = filterSource === 'ALL' || l.source === filterSource;

      // 5. Time Period Filter
      let matchPeriod = true;
      if (filterPeriod === '7D') {
        const sevenDaysAgo = Date.now() - 86400000 * 7;
        matchPeriod = new Date(l.createdAt).getTime() >= sevenDaysAgo;
      } else if (filterPeriod === '30D') {
        const thirtyDaysAgo = Date.now() - 86400000 * 30;
        matchPeriod = new Date(l.createdAt).getTime() >= thirtyDaysAgo;
      }

      return matchAgent && matchProp && matchStage && matchSource && matchPeriod;
    });
  }, [leads, filterAgentId, filterPropertyRef, filterStage, filterSource, filterPeriod]);

  // Filtered Visits reacting to agent and property
  const filteredVisits = React.useMemo(() => {
    return visits.filter(v => {
      const matchAgent = filterAgentId === 'ALL' || v.agentId === filterAgentId;
      const matchProp = filterPropertyRef === 'ALL' || String(v.propertyRef) === String(filterPropertyRef);
      return matchAgent && matchProp;
    });
  }, [visits, filterAgentId, filterPropertyRef]);

  // Volume USD Calculation
  const totalVolumeUSD = React.useMemo(() => {
    return filteredLeads.reduce((acc, curr) => acc + (Number(curr.budget) || 0), 0);
  }, [filteredLeads]);

  // Average Ticket USD
  const averageTicketUSD = React.useMemo(() => {
    const valid = filteredLeads.filter(l => Number(l.budget) > 0);
    return valid.length > 0 ? Math.round(totalVolumeUSD / valid.length) : 0;
  }, [filteredLeads, totalVolumeUSD]);

  // Conversion rate (reservas + ganados sobre total)
  const conversionRate = React.useMemo(() => {
    if (filteredLeads.length === 0) return 0;
    const closed = filteredLeads.filter(l => l.stage === 'RESERVA' || l.stage === 'CERRADO_GANADO').length;
    return Math.round((closed / filteredLeads.length) * 100);
  }, [filteredLeads]);

  // Dynamic ranking of inquiries per property according to selected filters
  const inquiriesPerProperty = React.useMemo(() => {
    const map = {};
    for (const p of properties) {
      if (filterPropertyRef !== 'ALL' && String(p.reference) !== String(filterPropertyRef)) continue;
      const count = filteredLeads.filter(l => String(l.propertyRef) === String(p.reference)).length;
      if (count > 0 || filterPropertyRef !== 'ALL') {
        map[p.reference] = {
          property: p,
          count
        };
      }
    }
    return Object.values(map).sort((a, b) => b.count - a.count);
  }, [properties, filteredLeads, filterPropertyRef]);

  // Dynamic agent stats based on selected property & stage filters
  const dynamicAgentStats = React.useMemo(() => {
    const agents = users.filter(u => u.role === 'AGENT' || u.role === 'MANAGER' || u.role === 'SUPER_ADMIN');
    return agents
      .filter(ag => filterAgentId === 'ALL' || ag.id === filterAgentId)
      .map(ag => {
        const assignedTickets = filteredLeads.filter(l => l.assignedToId === ag.id);
        const visitsCount = filteredVisits.filter(v => v.agentId === ag.id).length;
        const volume = assignedTickets.reduce((acc, curr) => acc + (Number(curr.budget) || 0), 0);
        return {
          agent: ag,
          ticketsCount: assignedTickets.length,
          visitsCount,
          volume
        };
      })
      .filter(st => filterAgentId !== 'ALL' || st.ticketsCount > 0 || st.visitsCount > 0);
  }, [users, filteredLeads, filteredVisits, filterAgentId]);

  // Funnel breakdown across stages
  const stageFunnel = React.useMemo(() => {
    return [
      { key: 'NUEVO', label: 'Nuevos / Bucket', count: filteredLeads.filter(l => l.stage === 'NUEVO').length, color: 'bg-blue-500' },
      { key: 'CONTACTO', label: 'En Contacto / Calificados', count: filteredLeads.filter(l => ['SIN_CONTACTAR', 'CONTACTADO', 'CALIFICADO'].includes(l.stage)).length, color: 'bg-indigo-500' },
      { key: 'VISITA', label: 'Visitas', count: filteredLeads.filter(l => ['VISITA_AGENDADA', 'VISITA_REALIZADA'].includes(l.stage)).length, color: 'bg-amber-500' },
      { key: 'NEGOCIACION', label: 'Negociación', count: filteredLeads.filter(l => l.stage === 'NEGOCIACION').length, color: 'bg-rose-500' },
      { key: 'CIERRE', label: 'Reserva / Cierre', count: filteredLeads.filter(l => ['RESERVA', 'CERRADO_GANADO'].includes(l.stage)).length, color: 'bg-emerald-500' }
    ];
  }, [filteredLeads]);

  const hasActiveFilters = filterAgentId !== 'ALL' || filterPropertyRef !== 'ALL' || filterStage !== 'ALL' || filterSource !== 'ALL' || filterPeriod !== 'ALL';

  const resetAllFilters = () => {
    setFilterAgentId('ALL');
    setFilterPropertyRef('ALL');
    setFilterStage('ALL');
    setFilterSource('ALL');
    setFilterPeriod('ALL');
  };

  return (
    <div className="max-w-6xl space-y-6">
      {/* Title & Filter Control Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <span>Dashboard Dinámico de Métricas & Actividades</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cambiá cualquiera de los parámetros para recalcular en tiempo real consultas, volumen USD, funnel y desempeño.
            </p>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 self-start md:self-auto"
            >
              <X className="w-3.5 h-3.5" />
              <span>Limpiar Filtros Activos</span>
            </button>
          )}
        </div>

        {/* Multi-parameter Filter Bar */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          {/* 1. Asesor Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Asesor / Asignado</label>
            <select
              value={filterAgentId}
              onChange={(e) => setFilterAgentId(e.target.value)}
              className="w-full font-bold border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 text-slate-800 focus:outline-hidden focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">Todos los Asesores</option>
              <option value="UNASSIGNED">Sin Asignar (Bucket)</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
              ))}
            </select>
          </div>

          {/* 2. Propiedad Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Propiedad Asociada</label>
            <select
              value={filterPropertyRef}
              onChange={(e) => setFilterPropertyRef(e.target.value)}
              className="w-full font-bold border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 text-slate-800 focus:outline-hidden focus:border-blue-500 cursor-pointer truncate"
            >
              <option value="ALL">Todas las Propiedades</option>
              {properties.map(p => (
                <option key={p.reference} value={p.reference}>Ref {p.reference} - {p.title.slice(0, 22)}...</option>
              ))}
            </select>
          </div>

          {/* 3. Etapa Pipeline Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Etapa del Ticket</label>
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="w-full font-bold border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 text-slate-800 focus:outline-hidden focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">Todas las Etapas</option>
              <option value="NUEVO">Nuevos / En Bucket</option>
              <option value="CONTACTO">En Contacto / Calificados</option>
              <option value="VISITA">Con Visitas (Agendadas/Hechas)</option>
              <option value="NEGOCIACION">En Negociación Activa</option>
              <option value="CIERRE">Reserva / Cierre Ganado</option>
            </select>
          </div>

          {/* 4. Origen / Canal Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Canal de Captura</label>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="w-full font-bold border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 text-slate-800 focus:outline-hidden focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">Todos los Canales</option>
              <option value="Website">Website Wave</option>
              <option value="WhatsApp">WhatsApp Broker</option>
              <option value="MercadoLibre">Mercado Libre</option>
              <option value="InfoCasas">InfoCasas</option>
              <option value="Zonaprop">Zonaprop</option>
            </select>
          </div>

          {/* 5. Período Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Rango Temporal</label>
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="w-full font-bold border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 text-slate-800 focus:outline-hidden focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">Histórico Completo</option>
              <option value="7D">Últimos 7 Días</option>
              <option value="30D">Últimos 30 Días</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Filtros activos:</span>
            {filterAgentId !== 'ALL' && (
              <span className="bg-blue-50 text-blue-700 border border-blue-200 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                Asesor: {filterAgentId === 'UNASSIGNED' ? 'Sin Asignar (Bucket)' : (users.find(u => u.id === filterAgentId)?.name || filterAgentId)}
                <button onClick={() => setFilterAgentId('ALL')} className="hover:text-blue-900 font-black">✕</button>
              </span>
            )}
            {filterPropertyRef !== 'ALL' && (
              <span className="bg-blue-50 text-blue-700 border border-blue-200 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                Propiedad: Ref {filterPropertyRef}
                <button onClick={() => setFilterPropertyRef('ALL')} className="hover:text-blue-900 font-black">✕</button>
              </span>
            )}
            {filterStage !== 'ALL' && (
              <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                Etapa: {filterStage}
                <button onClick={() => setFilterStage('ALL')} className="hover:text-indigo-900 font-black">✕</button>
              </span>
            )}
            {filterSource !== 'ALL' && (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                Canal: {filterSource}
                <button onClick={() => setFilterSource('ALL')} className="hover:text-emerald-900 font-black">✕</button>
              </span>
            )}
            {filterPeriod !== 'ALL' && (
              <span className="bg-amber-50 text-amber-700 border border-amber-200 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                Período: {filterPeriod === '7D' ? 'Últimos 7 días' : 'Últimos 30 días'}
                <button onClick={() => setFilterPeriod('ALL')} className="hover:text-amber-900 font-black">✕</button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Dynamic KPI Cards (Recalculan al instante) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Consultas Filtradas</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{filteredLeads.length}</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">
            {filteredLeads.filter(l => !l.assignedToId).length} en bucket sin asignar
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Volumen en Cartera</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            USD {totalVolumeUSD > 1000000 ? `${(totalVolumeUSD / 1000000).toFixed(1)}M` : totalVolumeUSD.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Suma presupuestos activos</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Visitas Coordinadas</div>
          <div className="text-2xl font-black text-purple-700 mt-1">{filteredVisits.length}</div>
          <div className="text-[11px] text-purple-600 font-semibold mt-1">
            {filteredVisits.filter(v => v.status === 'REALIZADA').length} ya realizadas
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Conversión a Cierre</div>
          <div className="text-2xl font-black text-indigo-700 mt-1">{conversionRate}%</div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">Reservas sobre consultas</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs col-span-2 md:col-span-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Ticket Promedio</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            USD {averageTicketUSD > 1000 ? `${Math.round(averageTicketUSD / 1000)}k` : averageTicketUSD.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">Por consulta calificada</div>
        </div>
      </div>

      {/* Visual Pipeline Funnel Breakdown */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>Distribución de Consultas por Etapa (Funnel Dinámico)</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-semibold">
            {filteredLeads.length} tickets evaluados
          </span>
        </div>

        {/* Funnel Progress Segments */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
          {stageFunnel.map(st => {
            const pct = filteredLeads.length > 0 ? Math.round((st.count / filteredLeads.length) * 100) : 0;
            return (
              <button
                key={st.key}
                onClick={() => setFilterStage(filterStage === st.key ? 'ALL' : st.key)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  filterStage === st.key 
                    ? 'border-blue-600 bg-blue-50/50 shadow-2xs ring-2 ring-blue-500/20' 
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{st.label}</span>
                  <span className="text-xs font-black text-slate-900">{st.count}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className={`h-full ${st.color}`} style={{ width: `${pct}%` }}></div>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">{pct}% del total</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2 Columns: Ranking per Property & Advisor Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dynamic Ranking of Properties */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Consultas por Propiedad (Dinámico)</span>
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">
              {inquiriesPerProperty.length} fichas con actividad
            </span>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {inquiriesPerProperty.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center">
                No hay consultas registradas para los filtros activos.
              </p>
            ) : (
              inquiriesPerProperty.map(({ property: p, count }) => (
                <div 
                  key={p.reference} 
                  onClick={() => setFilterPropertyRef(filterPropertyRef === p.reference ? 'ALL' : p.reference)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    filterPropertyRef === p.reference
                      ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20'
                      : 'bg-slate-50 border-slate-100 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="truncate max-w-[280px]">
                    <div className="font-bold text-xs text-slate-900 truncate flex items-center gap-1.5">
                      <span className="text-blue-600">Ref {p.reference}:</span>
                      <span>{p.title}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      USD {Number(p.price).toLocaleString()} • {p.type} en {p.location}
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <span className="text-sm font-black text-blue-600">{count}</span>
                    <span className="text-[10px] text-slate-400 block">consultas</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dynamic Advisor Performance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Desempeño y Asignación por Asesor</span>
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">
              {dynamicAgentStats.length} miembros activos
            </span>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {dynamicAgentStats.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center">
                Sin asesores asociados al filtro actual.
              </p>
            ) : (
              dynamicAgentStats.map(({ agent, ticketsCount, visitsCount, volume }) => (
                <div 
                  key={agent.id} 
                  onClick={() => setFilterAgentId(filterAgentId === agent.id ? 'ALL' : agent.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    filterAgentId === agent.id
                      ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20'
                      : 'bg-slate-50 border-slate-100 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{agent.name}</div>
                      <div className="text-[10px] text-slate-500">{agent.title}</div>
                    </div>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      Comisión: {agent.commissionRate}%
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Tickets:</span>
                      <strong className="text-slate-800 text-sm">{ticketsCount}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Visitas:</span>
                      <strong className="text-purple-700 text-sm">{visitsCount}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Volumen:</span>
                      <strong className="text-emerald-700 text-xs">
                        {volume > 1000000 ? `USD ${(volume / 1000000).toFixed(1)}M` : `USD ${volume.toLocaleString()}`}
                      </strong>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Interactive Filtered Inquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden space-y-0">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Listado de Consultas Filtradas ({filteredLeads.length} tickets)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Hacé clic en cualquier ticket para abrir su ficha completa con su ticker de tratativas comercial.
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            Mostrando {filteredLeads.length} de {leads.length} totales
          </span>
        </div>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-[10px] text-slate-500 tracking-wider sticky top-0 z-10">
              <tr>
                <th className="py-2.5 px-4">Ticket & Interesado</th>
                <th className="py-2.5 px-4">Propiedad Asociada</th>
                <th className="py-2.5 px-4">Asesor Asignado</th>
                <th className="py-2.5 px-4">Presupuesto USD</th>
                <th className="py-2.5 px-4">Etapa Comercial</th>
                <th className="py-2.5 px-4">Canal</th>
                <th className="py-2.5 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-xs text-slate-400 italic">
                    No se encontraron consultas coincidentes con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredLeads.map(l => {
                  const prop = l.propertyRef ? properties.find(p => String(p.reference) === String(l.propertyRef)) : null;
                  const agent = users.find(u => u.id === l.assignedToId);
                  const stageObj = LEAD_STAGES.find(s => s.id === l.stage);

                  return (
                    <tr 
                      key={l.id} 
                      onClick={() => setInspectingTicket(l)}
                      className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{l.firstName} {l.lastName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{l.email || l.phone}</div>
                      </td>

                      <td className="py-3 px-4">
                        {prop ? (
                          <div className="truncate max-w-[200px]">
                            <div className="font-semibold text-slate-800 truncate">Ref {prop.reference}: {prop.title}</div>
                            <div className="text-[10px] text-slate-400">{prop.type} • {prop.location}</div>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Consulta General</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {agent ? (
                          <div>
                            <span className="font-semibold text-slate-800">{agent.name}</span>
                            <span className="text-[10px] text-slate-400 block">{agent.title}</span>
                          </div>
                        ) : (
                          <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[10px]">
                            En Bucket (Sin Asignar)
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-900">
                        {l.budget ? `USD ${Number(l.budget).toLocaleString()}` : 's/d'}
                      </td>

                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${stageObj ? stageObj.color : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                          {stageObj ? stageObj.label : l.stage}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono text-[10px] text-slate-500">
                        {l.source}
                      </td>

                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setInspectingTicket(l)}
                          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-[11px] font-bold transition-colors"
                        >
                          Ver Ticket
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Ticket con su Ticker propio al hacer clic desde el Dashboard */}
      {inspectingTicket && (
        <TicketDetailModal 
          ticket={inspectingTicket} 
          onClose={() => setInspectingTicket(null)} 
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 4. CMS DE PROPIEDADES (CLIC ABRE MODAL PERFIL/VISTA COMPLETA + TICKER FILTRABLE POR CONSULTA)
// -------------------------------------------------------------
function PropertiesCMSView({ properties, currentUser, triggerConfirm }) {
  const [profileProperty, setProfileProperty] = useState(null);
  const [editingProp, setEditingProp] = useState(null);

  const owners = WaveDB.getOwners();

  const handleToggleVisibility = (prop) => {
    const nextVal = !prop.isVisibleInWeb;
    triggerConfirm({
      title: nextVal ? '¿Hacer Visible en la Web Pública?' : '¿Ocultar de la Web Pública?',
      message: nextVal 
        ? `La propiedad Ref ${prop.reference} pasará a ser visible de inmediato en el portal para todos los visitantes.`
        : `La propiedad Ref ${prop.reference} será ocultada del buscador público pero se mantendrá activa en el CMS interno.`,
      confirmText: nextVal ? 'Sí, hacer visible' : 'Sí, ocultar',
      isDestructive: !nextVal,
      onConfirm: () => {
        WaveDB.updateProperty({
          ...prop,
          isVisibleInWeb: nextVal
        });
      }
    });
  };

  const handleToggleStatus = (prop) => {
    const nextStatus = prop.status === 'PUBLISHED' ? 'PAUSED' : 'PUBLISHED';
    triggerConfirm({
      title: `¿Cambiar estado a ${nextStatus}?`,
      message: `El estado comercial de la ficha Ref ${prop.reference} se actualizará a ${nextStatus}.`,
      confirmText: 'Confirmar cambio',
      onConfirm: () => {
        WaveDB.updateProperty({
          ...prop,
          status: nextStatus
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">CMS de Propiedades Wave</h2>
          <p className="text-xs text-slate-500">
            Hacé clic en cualquier fila para abrir el modal de perfil completo con su Ticker filtrable por consulta.
          </p>
        </div>

        <button 
          onClick={() => {
            const newRef = String(Math.floor(1000 + Math.random() * 9000));
            setEditingProp({
              reference: newRef,
              title: 'Nueva Propiedad en Wave',
              description: '',
              price: 250000,
              currency: 'USD',
              operation: 'Venta',
              type: 'Apartamento',
              location: 'Brava',
              bedrooms: 2,
              bathrooms: 2,
              builtArea: 90,
              status: 'PUBLISHED',
              isVisibleInWeb: true,
              ownerId: owners[0]?.id || null,
              images: ['https://ri.com.uy/f/234/0/1200/0/0/0/fbc249c6796358b1ffc5427fba5b3b7c.jpg']
            });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          Nueva Ficha de Propiedad
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-[10px] text-slate-500 tracking-wider">
            <tr>
              <th className="py-3 px-4">Ref & Foto</th>
              <th className="py-3 px-4">Título & Zona</th>
              <th className="py-3 px-4">Propietario Asociado</th>
              <th className="py-3 px-4">Precio (USD)</th>
              <th className="py-3 px-4">Visible Web</th>
              <th className="py-3 px-4">Estado CMS</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {properties.map(p => {
              const owner = owners.find(o => o.id === p.ownerId);
              const imgCount = p.images ? p.images.length : 0;

              return (
                <tr 
                  key={p.reference} 
                  onClick={() => setProfileProperty(p)}
                  className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="w-12 h-10 rounded-lg bg-slate-200 overflow-hidden shrink-0 border border-slate-200 relative">
                      {p.images && p.images[0] ? (
                        <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">Sin foto</div>
                      )}
                      <span className="absolute bottom-0 right-0 bg-slate-900/80 text-white text-[8px] font-bold px-1">
                        {imgCount}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">ID {p.reference}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{p.operation}</div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900 truncate max-w-xs">{p.title}</div>
                    <div className="text-[11px] text-slate-500">{p.type} • {p.location}</div>
                  </td>

                  <td className="py-3 px-4">
                    {owner ? (
                      <div>
                        <span className="font-semibold text-slate-800">{owner.name}</span>
                        <div className="text-[10px] text-slate-400">{owner.phone || owner.email}</div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Sin propietario</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 text-sm">
                      USD {Number(p.price).toLocaleString()}
                    </span>
                  </td>

                  {/* Toggle con Submodal de Confirmación */}
                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleToggleVisibility(p)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                        p.isVisibleInWeb !== false 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100' 
                          : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {p.isVisibleInWeb !== false ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-blue-600" />
                          <span>Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                          <span>Oculta</span>
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleToggleStatus(p)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status === 'PUBLISHED' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {p.status === 'PUBLISHED' ? 'Publicada' : 'Pausada'}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setProfileProperty(p)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-lg text-slate-700 font-bold text-[11px] inline-flex items-center gap-1 transition-colors border border-slate-200"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      <span>Ver Ficha</span>
                    </button>

                    <button
                      onClick={() => setEditingProp(p)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors inline-block"
                      title="Editar Propiedad"
                    >
                      <Edit3 className="w-4 h-4 inline" />
                    </button>

                    {currentUser.role === 'SUPER_ADMIN' && (
                      <button
                        onClick={() => {
                          triggerConfirm({
                            title: `¿Eliminar propiedad Ref ${p.reference}?`,
                            message: `Esta acción dará de baja definitiva la ficha "${p.title}" de la base de datos.`,
                            confirmText: 'Sí, eliminar',
                            isDestructive: true,
                            onConfirm: () => WaveDB.deleteProperty(p.reference)
                          });
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors inline-block"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL DE PERFIL DE PROPIEDAD (VER TODO + EDITAR + TICKER FILTRABLE POR CONSULTA) */}
      {profileProperty && (
        <PropertyProfileModal
          property={profileProperty}
          properties={properties}
          owners={owners}
          onClose={() => setProfileProperty(null)}
          onEdit={() => {
            const target = profileProperty;
            setProfileProperty(null);
            setEditingProp(target);
          }}
        />
      )}

      {/* MODAL DE EDICIÓN CON OPCIÓN DE GALERÍA AL FINAL */}
      {editingProp && (
        <PropertyEditModal
          property={editingProp}
          properties={properties}
          owners={owners}
          onClose={() => setEditingProp(null)}
          onSave={(saved) => {
            WaveDB.updateProperty(saved);
            setEditingProp(null);
          }}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// MODAL DE PERFIL DE PROPIEDAD (VER TODO, OPCIÓN EDITAR EN ESQUINA & TICKER CON FILTRO DE CONSULTA)
// -------------------------------------------------------------
function PropertyProfileModal({ property, properties, owners, onClose, onEdit }) {
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'ticker'
  const [filterInquiryId, setFilterInquiryId] = useState('ALL');

  const owner = owners.find(o => o.id === property.ownerId);
  const events = WaveDB.getPropertyEvents(property.reference, filterInquiryId === 'ALL' ? null : filterInquiryId);
  const propertyLeads = WaveDB.getLeads().filter(l => String(l.propertyRef) === String(property.reference));

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header con opción Editar y X de Cerrar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Perfil de Propiedad • Ref {property.reference}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">{property.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Propiedad</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center font-bold transition-colors ml-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab switcher: Detalles vs Ticker */}
        <div className="px-6 py-2 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'details' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ficha & Especificaciones
          </button>
          <button
            onClick={() => setActiveTab('ticker')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ticker' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ticker de Eventos ({events.length})
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'details' ? (
            <div className="space-y-6">
              {/* Image Preview strip */}
              <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden h-36 bg-slate-100">
                {(property.images || []).slice(0, 4).map((img, i) => (
                  <div key={i} className="h-full bg-slate-200">
                    <img src={img} alt="Foto" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Precio</span>
                  <strong className="text-base text-slate-900">USD {Number(property.price).toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Operación / Categoría</span>
                  <strong className="text-slate-800">{property.operation} • {property.type}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Ubicación</span>
                  <strong className="text-slate-800">{property.location}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Dormitorios / Baños</span>
                  <strong className="text-slate-800">{property.bedrooms} dorms • {property.bathrooms} baños</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Superficie</span>
                  <strong className="text-slate-800">{property.builtArea} m² edificados</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Propietario</span>
                  <strong className="text-blue-600">{owner ? owner.name : 'Sin propietario'}</strong>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Descripción</h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200">
                  {property.description || 'Sin descripción cargada.'}
                </p>
              </div>
            </div>
          ) : (
            /* TAB TICKER CON FILTRO POR CONSULTA REFERIDA */
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-700">Filtrar Ticker por Consulta:</span>
                </div>

                <select
                  value={filterInquiryId}
                  onChange={(e) => setFilterInquiryId(e.target.value)}
                  className="text-xs font-semibold border border-slate-300 rounded-lg px-3 py-1.5 bg-white text-slate-800 focus:outline-hidden"
                >
                  <option value="ALL">Todas las Consultas / Eventos Generales</option>
                  {propertyLeads.map(l => (
                    <option key={l.id} value={l.id}>
                      Consulta de {l.firstName} {l.lastName || ''} ({new Date(l.createdAt).toLocaleDateString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 pt-2">
                {events.length === 0 ? (
                  <p className="text-xs text-slate-400 italic pl-6">Sin eventos registrados para este filtro.</p>
                ) : (
                  events.map(evt => (
                    <div key={evt.id} className="relative pl-7 space-y-1">
                      <span className={`absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white ring-2 ring-slate-100 ${
                        evt.type === 'PRICE_CHANGE' ? 'bg-amber-500' :
                        evt.type === 'INQUIRY_RECEIVED' ? 'bg-blue-500' :
                        evt.type === 'VISIT_RECORDED' ? 'bg-emerald-500' : 'bg-slate-600'
                      }`}></span>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{evt.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(evt.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {evt.description}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// PROPERTY EDIT MODAL CON OPCIÓN GALERÍA CASI AL FINAL (QUE ABRE MODAL DEDICADO)
// -------------------------------------------------------------
function PropertyEditModal({ property, properties, owners, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...property });
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      builtArea: Number(formData.builtArea),
      images: formData.images || []
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Edición de Ficha</div>
            <h3 className="text-lg font-bold text-slate-900">Ref {property.reference}: {property.title}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center font-bold">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Título de la Propiedad</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Propietario Asociado</label>
              <select
                value={formData.ownerId || ''}
                onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1 bg-white focus:outline-hidden"
              >
                <option value="">-- Sin propietario asignado --</option>
                {owners.map(o => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Precio (USD)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1 font-bold"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Operación</label>
              <select
                value={formData.operation}
                onChange={(e) => setFormData({ ...formData, operation: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1 bg-white"
              >
                <option value="Venta">Venta</option>
                <option value="Alquiler">Alquiler</option>
                <option value="Alquiler Temporal">Alquiler Temporal</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Tipo de Inmueble</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1 bg-white"
              >
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Campo">Campo</option>
                <option value="Terreno">Terreno</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Dormitorios</label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Baños</label>
              <input
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Superficie (m²)</label>
              <input
                type="number"
                value={formData.builtArea}
                onChange={(e) => setFormData({ ...formData, builtArea: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500">Descripción Completa</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1 focus:outline-hidden"
            />
          </div>

          {/* OPCIÓN GALERÍA CASI AL FINAL (ABRE MODAL DE GALERÍA Y CARPETAS) */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                Galería de Imágenes de la Propiedad ({(formData.images || []).length} fotos seleccionadas)
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Organizá las fotos por carpetas de cada propiedad, reordená la secuencia y definí la portada con vista previa.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsGalleryModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
            >
              <Layers className="w-4 h-4" />
              <span>Abrir Galería & Carpetas</span>
            </button>
          </div>

          {/* Miniatura previa de imágenes seleccionadas en la ficha */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(formData.images || []).map((img, i) => (
              <div key={i} className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                <img src={img} alt="Foto" className="w-full h-full object-cover" />
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-[8px] font-bold px-1 rounded">
                    Portada
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={formData.isVisibleInWeb !== false}
                onChange={(e) => setFormData({ ...formData, isVisibleInWeb: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span>Visible en la Web Pública de Wave</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={formData.status === 'PUBLISHED'}
                onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'PUBLISHED' : 'PAUSED' })}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span>Publicada Activa (CMS)</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
            >
              Guardar Cambios
            </button>
          </div>
        </form>

        {/* Modal de Galería y Carpetas dedicado */}
        <MediaLibraryModal
          isOpen={isGalleryModalOpen}
          onClose={() => setIsGalleryModalOpen(false)}
          currentImages={formData.images || []}
          properties={properties}
          activePropertyRef={formData.reference}
          onSaveGallery={(orderedImages) => {
            setFormData(prev => ({ ...prev, images: orderedImages }));
          }}
        />
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. PROPIETARIOS
// -------------------------------------------------------------
function OwnersView({ owners, properties, users, currentUser }) {
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <span>Base de Propietarios (Dueños de Inmuebles)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Entidad independiente con ficha legal, datos bancarios, contrato de exclusividad y cartera de propiedades asociadas.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          Nuevo Propietario
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {owners.map(owner => {
          const ownerProps = properties.filter(p => p.ownerId === owner.id || (owner.propertyRefs && owner.propertyRefs.includes(String(p.reference))));
          const agent = users.find(u => u.id === owner.assignedAgentId);

          return (
            <div
              key={owner.id}
              onClick={() => setSelectedOwner(owner)}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-400 cursor-pointer transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-tight">{owner.name}</h3>
                    <div className="text-[11px] text-slate-500 mt-0.5">{owner.documentId}</div>
                  </div>
                  {owner.exclusiveContract && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Exclusividad
                    </span>
                  )}
                </div>

                <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{owner.phone || 'Sin teléfono'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{owner.email || 'Sin email'}</span>
                  </div>
                  {agent && (
                    <div className="text-[11px] text-blue-600 font-semibold pt-1">
                      Asesor Wave: {agent.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  Propiedades en Cartera ({ownerProps.length})
                </div>
                <div className="space-y-1">
                  {ownerProps.map(p => (
                    <div key={p.reference} className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-1.5 flex items-center justify-between">
                      <span className="font-semibold text-slate-800 truncate max-w-[170px]">
                        Ref {p.reference}: {p.title}
                      </span>
                      <span className="font-bold text-blue-600 text-[11px]">
                        USD {Number(p.price).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedOwner && (
        <OwnerDetailModal
          owner={selectedOwner}
          properties={properties}
          users={users}
          onClose={() => setSelectedOwner(null)}
          onSave={(updated) => {
            WaveDB.updateOwner(updated);
            setSelectedOwner(null);
          }}
        />
      )}

      {isCreateOpen && (
        <CreateOwnerModal
          properties={properties}
          users={users}
          onClose={() => setIsCreateOpen(false)}
          onSave={(newO) => {
            WaveDB.createOwner(newO);
            setIsCreateOpen(false);
          }}
        />
      )}
    </div>
  );
}

function OwnerDetailModal({ owner, properties, users, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...owner });
  const ownerProps = properties.filter(p => p.ownerId === owner.id || (owner.propertyRefs && owner.propertyRefs.includes(String(p.reference))));

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Ficha de Propietario</div>
            <h3 className="text-lg font-bold text-slate-900">{owner.name}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center font-bold">
            ✕
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Nombre / Razón Social</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Documento / C.I. / RUT</label>
              <input
                type="text"
                value={formData.documentId}
                onChange={(e) => setFormData({ ...formData, documentId: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Teléfono / WhatsApp</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Correo Electrónico</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500">Datos Bancarios para Liquidaciones</label>
            <input
              type="text"
              value={formData.bankInfo || ''}
              onChange={(e) => setFormData({ ...formData, bankInfo: e.target.value })}
              placeholder="Banco, tipo de cuenta, número..."
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500">Notas Internas & Condiciones Comerciales</label>
            <textarea
              rows={3}
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
            />
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-800">Propiedades Vinculadas ({ownerProps.length})</div>
            {ownerProps.map(p => (
              <div key={p.reference} className="text-xs bg-white p-2 rounded-lg border border-slate-200 flex justify-between">
                <span>Ref {p.reference}: {p.title}</span>
                <span className="font-bold text-blue-600">USD {p.price.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100">
              Cerrar
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs">
              Actualizar Propietario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CreateOwnerModal({ properties, users, onClose, onSave }) {
  const [name, setName] = useState('');
  const [doc, setDoc] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPropRef, setSelectedPropRef] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name,
      documentId: doc,
      phone,
      email,
      exclusiveContract: true,
      propertyRefs: selectedPropRef ? [selectedPropRef] : []
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900">Dar de Alta Propietario</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500">Nombre / Razón Social *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500">Documento / C.I. / RUT</label>
            <input
              type="text"
              value={doc}
              onChange={(e) => setDoc(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Teléfono</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500">Asociar con Propiedad Inicial</label>
            <select
              value={selectedPropRef}
              onChange={(e) => setSelectedPropRef(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1 bg-white"
            >
              <option value="">-- Sin vincular todavía --</option>
              {properties.map(p => (
                <option key={p.reference} value={p.reference}>Ref {p.reference} - {p.title}</option>
              ))}
            </select>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100">
              Cancelar
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs">
              Crear Propietario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. GESTIÓN USUARIOS & RBAC (CON SUBMODAL DE CONFIRMACIÓN)
// -------------------------------------------------------------
function UsersRBACView({ users, currentUser, triggerConfirm }) {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('AGENT');
  const [newUserTitle, setNewUserTitle] = useState('');

  const handleToggleStatus = (user) => {
    const nextStatus = user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
    triggerConfirm({
      title: nextStatus === 'BLOCKED' ? `¿Bloquear usuario ${user.name}?` : `¿Desbloquear usuario ${user.name}?`,
      message: nextStatus === 'BLOCKED'
        ? `El usuario perderá el acceso a la plataforma de forma inmediata hasta que sea reactivado.`
        : `El usuario recuperará sus permisos y podrá ingresar nuevamente al sistema.`,
      confirmText: nextStatus === 'BLOCKED' ? 'Sí, bloquear' : 'Sí, desbloquear',
      isDestructive: nextStatus === 'BLOCKED',
      onConfirm: () => WaveDB.updateUser({ ...user, status: nextStatus })
    });
  };

  const handleRoleChange = (user, role) => {
    triggerConfirm({
      title: `¿Cambiar rol de ${user.name} a ${role}?`,
      message: `Esta acción reconfigurará los permisos granulares y el alcance comercial del usuario.`,
      confirmText: 'Confirmar nuevo rol',
      onConfirm: () => {
        WaveDB.updateUser({
          ...user,
          role,
          permissions: {
            canEditProperties: role !== 'AGENT',
            canDeleteProperties: role === 'SUPER_ADMIN',
            canManageUsers: role === 'SUPER_ADMIN',
            canReassignLeads: role !== 'AGENT',
            canViewAudit: role === 'SUPER_ADMIN',
            canManageOwners: role !== 'AGENT'
          }
        });
      }
    });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    WaveDB.createUser({
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      title: newUserTitle.trim() || (newUserRole === 'AGENT' ? 'Real Estate Advisor' : 'Commercial Manager'),
      phone: '+598 99 000 000'
    });

    setIsAddUserOpen(false);
    setNewUserName('');
    setNewUserEmail('');
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <span>Administración de Usuarios & Permisos RBAC</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Exclusivo Super Admin. Configuración jerárquica con confirmación de seguridad para roles y bloqueos.
          </p>
        </div>

        <button
          onClick={() => setIsAddUserOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs"
        >
          <UserPlus className="w-4 h-4" />
          Nuevo Usuario
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-[10px] text-slate-500 tracking-wider">
            <tr>
              <th className="py-3 px-4">Usuario</th>
              <th className="py-3 px-4">Rol Asignado</th>
              <th className="py-3 px-4">Permisos Granulares</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50/80">
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-900">{u.name}</div>
                  <div className="text-[11px] text-slate-500">{u.email} • {u.title}</div>
                </td>

                <td className="py-3 px-4">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u, e.target.value)}
                    disabled={u.id === currentUser.id}
                    className="text-xs font-bold border border-slate-300 rounded-md px-2 py-1 bg-white text-slate-800 disabled:opacity-50 cursor-pointer"
                  >
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="AGENT">AGENT</option>
                  </select>
                </td>

                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {u.permissions?.canEditProperties && (
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">Editar CMS</span>
                    )}
                    {u.permissions?.canDeleteProperties && (
                      <span className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded">Eliminar Fichas</span>
                    )}
                    {u.permissions?.canManageUsers && (
                      <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">Gestionar Usuarios</span>
                    )}
                    {u.permissions?.canReassignLeads && (
                      <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded">Asignar Leads</span>
                    )}
                  </div>
                </td>

                <td className="py-3 px-4">
                  <button
                    onClick={() => handleToggleStatus(u)}
                    disabled={u.id === currentUser.id}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.status === 'ACTIVE' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    } disabled:opacity-50`}
                  >
                    {u.status === 'ACTIVE' ? 'Activo' : 'Bloqueado'}
                  </button>
                </td>

                <td className="py-3 px-4 text-right">
                  {u.id === currentUser.id ? (
                    <span className="text-[10px] text-slate-400 italic">Sesión actual</span>
                  ) : (
                    <button
                      onClick={() => handleToggleStatus(u)}
                      className="text-slate-500 hover:text-rose-600 font-semibold text-[11px]"
                    >
                      {u.status === 'ACTIVE' ? 'Bloquear' : 'Desbloquear'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Crear Nuevo Miembro del Equipo</h3>
            <form onSubmit={handleCreateUser} className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Correo Corporativo</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Rol Jerárquico</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1 bg-white"
                >
                  <option value="AGENT">AGENT (Asesor de Ventas)</option>
                  <option value="MANAGER">MANAGER (Líder Comercial)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Control Total)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Cargo / Título</label>
                <input
                  type="text"
                  value={newUserTitle}
                  onChange={(e) => setNewUserTitle(e.target.value)}
                  placeholder="Ej: Senior Luxury Advisor"
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 mt-1"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddUserOpen(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100">
                  Cancelar
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs">
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 7. TASKS VIEW
// -------------------------------------------------------------
function TasksView({ tasks, currentUser }) {
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('LLAMADA');

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    WaveDB.createTask({
      title: newTitle.trim(),
      type: newType,
      priority: 'MEDIUM',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      userId: currentUser.id
    });
    setNewTitle('');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Tareas & Recordatorios Comerciales</h2>
          <p className="text-xs text-slate-500">Gestión de llamadas, seguimientos y visitas pendientes.</p>
        </div>
      </div>

      <form onSubmit={handleCreateTask} className="bg-white p-4 rounded-xl border border-slate-200 flex gap-3 shadow-2xs">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Ej: Llamar a cliente por oferta en Acqua Ref 815..."
          className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-2"
        />
        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          className="text-xs border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700"
        >
          <option value="LLAMADA">Llamada</option>
          <option value="WHATSAPP">WhatsApp</option>
          <option value="VISITA">Visita</option>
          <option value="SEGUIMIENTO">Seguimiento</option>
        </select>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg">
          Crear Tarea
        </button>
      </form>

      <div className="space-y-2">
        {tasks.map(t => (
          <div
            key={t.id}
            className={`p-3.5 rounded-xl border flex items-center justify-between transition-all bg-white ${
              t.isCompleted ? 'border-slate-200 opacity-60' : 'border-slate-200 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.isCompleted}
                onChange={() => WaveDB.toggleTask(t.id)}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
              <div>
                <div className={`text-xs font-bold text-slate-900 ${t.isCompleted ? 'line-through text-slate-400' : ''}`}>
                  {t.title}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  <span className="font-semibold text-blue-600 uppercase text-[10px]">{t.type}</span> • Vence: {new Date(t.dueDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
              t.priority === 'HIGH' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600'
            }`}>
              {t.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 8. PORTALES
// -------------------------------------------------------------
function PortalsSyncView({ properties }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Sincronización Multicanal de Portales</h2>
        <p className="text-xs text-slate-500">
          Publicación unificada de inventario hacia Mercado Libre, InfoCasas, Gallito Luis y red Tera Networking.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-[10px] text-slate-500 tracking-wider">
            <tr>
              <th className="py-3 px-4">Propiedad</th>
              {PORTAL_CHANNELS.map(ch => (
                <th key={ch.id} className="py-3 px-4 text-center">{ch.name}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {properties.slice(0, 8).map(p => {
              const pubs = WaveDB.getPublications(p.reference);
              return (
                <tr key={p.reference} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    Ref {p.reference} - {p.title.slice(0, 30)}...
                  </td>
                  {PORTAL_CHANNELS.map(ch => {
                    const pub = pubs[ch.id] || { status: 'NOT_CONFIGURED' };
                    return (
                      <td key={ch.id} className="py-3 px-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          pub.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          pub.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {pub.status === 'PUBLISHED' ? '✓ Publicado' :
                           pub.status === 'PENDING' ? '⏳ Pendiente' : 'No Configurado'}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 9. AUDIT LOG (SUPER ADMIN)
// -------------------------------------------------------------
function AuditLogView({ logs }) {
  return (
    <div className="space-y-4 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Registro de Auditoría de Operaciones</h2>
        <p className="text-xs text-slate-500">Historial inmutable de cambios de precios, estados, asignaciones y usuarios.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="divide-y divide-slate-100">
          {logs.map(log => (
            <div key={log.id} className="p-3 text-xs flex items-center justify-between hover:bg-slate-50">
              <div>
                <span className="font-bold text-slate-900">{log.action}</span>
                <span className="text-slate-500 mx-2">•</span>
                <span className="text-slate-600">{log.entityType} ID: {log.entityId}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
