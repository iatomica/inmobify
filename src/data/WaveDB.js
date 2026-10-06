import rawProperties from './wave_properties.json';

const STORAGE_KEYS = {
  PROPERTIES: 'wave_db_properties_v3',
  PROPERTY_EVENTS: 'wave_db_prop_events_v3',
  OWNERS: 'wave_db_owners_v3',
  LEADS: 'wave_db_leads_v3',
  ACTIVITIES: 'wave_db_activities_v3',
  TASKS: 'wave_db_tasks_v3',
  VISITS: 'wave_db_visits_v3',
  USERS: 'wave_db_users_v3',
  AUDIT: 'wave_db_audit_v3',
  PUBLICATIONS: 'wave_db_publications_v3',
  CURRENT_USER: 'wave_current_user_v3'
};

// Initial Seed Users (Real RBAC with Granular Permissions)
const INITIAL_USERS = [
  {
    id: 'usr_superadmin',
    name: 'Sebastián Wave',
    email: 'admin@waveuy.com',
    role: 'SUPER_ADMIN',
    title: 'Director General & Broker Inmobiliario',
    phone: '+598 99 123 456',
    status: 'ACTIVE',
    commissionRate: 5.0,
    permissions: {
      canEditProperties: true,
      canDeleteProperties: true,
      canManageUsers: true,
      canReassignLeads: true,
      canViewAudit: true,
      canManageOwners: true
    }
  },
  {
    id: 'usr_manager',
    name: 'Carolina Morales',
    email: 'carolina@waveuy.com',
    role: 'MANAGER',
    title: 'Commercial Team Leader',
    phone: '+598 98 456 789',
    status: 'ACTIVE',
    commissionRate: 4.0,
    permissions: {
      canEditProperties: true,
      canDeleteProperties: false,
      canManageUsers: false,
      canReassignLeads: true,
      canViewAudit: false,
      canManageOwners: true
    }
  },
  {
    id: 'usr_agent_1',
    name: 'Martín Rodríguez',
    email: 'martin@waveuy.com',
    role: 'AGENT',
    title: 'Senior Luxury Advisor',
    phone: '+598 94 789 123',
    status: 'ACTIVE',
    commissionRate: 3.0,
    permissions: {
      canEditProperties: false,
      canDeleteProperties: false,
      canManageUsers: false,
      canReassignLeads: false,
      canViewAudit: false,
      canManageOwners: false
    }
  },
  {
    id: 'usr_agent_2',
    name: 'Lucía Fernández',
    email: 'lucia@waveuy.com',
    role: 'AGENT',
    title: 'Coastal Properties Specialist',
    phone: '+598 95 321 654',
    status: 'ACTIVE',
    commissionRate: 3.0,
    permissions: {
      canEditProperties: false,
      canDeleteProperties: false,
      canManageUsers: false,
      canReassignLeads: false,
      canViewAudit: false,
      canManageOwners: false
    }
  }
];

// Initial Seed Owners (Real profile data associated with properties)
const INITIAL_OWNERS = [
  {
    id: 'own_1',
    name: 'Gonzalo Berazategui',
    documentId: 'CI 3.842.119-4',
    email: 'gberazategui@holding.uy',
    phone: '+598 99 443 211',
    whatsapp: '+59899443211',
    address: 'Rambla Lorenzo Batlle Pacheco, Edificio Acqua, Parada 19 Brava',
    bankInfo: 'Banco Santander UY - Caja Ahorro USD 0012-984421-99',
    assignedAgentId: 'usr_superadmin',
    exclusiveContract: true,
    contractExpiration: '2027-12-31',
    notes: 'Propietario original de Acqua Penthouse. Acepta ofertas al contado o permuta de departamento menor en Montevideo.',
    propertyRefs: ['815'],
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString()
  },
  {
    id: 'own_2',
    name: 'Inversiones Punta Este S.A. (Representada por Ing. Rafael Soler)',
    documentId: 'RUT 21.849.201.0018',
    email: 'rsoler@inversionespunta.com',
    phone: '+54 9 11 3322 1100',
    whatsapp: '+5491133221100',
    address: 'Av. Chiverta y Francia, Punta del Este',
    bankInfo: 'Itaú Uruguay - Cta Cte USD 448-19028',
    assignedAgentId: 'usr_agent_1',
    exclusiveContract: true,
    contractExpiration: '2027-06-30',
    notes: 'Desarrolladora con múltiples unidades en Brava y Manantiales. Prioridad vender unidades Eve Tower y Manantiales.',
    propertyRefs: ['4088', '4061', '4090'],
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString()
  },
  {
    id: 'own_3',
    name: 'Familia Larreta Durán',
    documentId: 'CI 1.954.238-0',
    email: 'larretaduran@agroeste.com.uy',
    phone: '+598 98 776 544',
    whatsapp: '+59898776544',
    address: 'Barrio Privado La Arbolada, Lote 42',
    bankInfo: 'BBVA Uruguay - Cta Cte 2291048',
    assignedAgentId: 'usr_agent_2',
    exclusiveContract: false,
    contractExpiration: '2026-11-30',
    notes: 'Casa familiar en La Arbolada y fracción en El Chorro. Disponibles para visitas con 24hs de aviso.',
    propertyRefs: ['3971', '4373'],
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString()
  }
];

export const LEAD_STAGES = [
  { id: 'NUEVO', label: 'Nuevo / Sin Asignar', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'SIN_CONTACTAR', label: 'Sin contactar', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'CONTACTADO', label: 'Contactado', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'CALIFICADO', label: 'Calificado', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'BUSCANDO_OPCIONES', label: 'Buscando opciones', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { id: 'PROPIEDADES_ENVIADAS', label: 'Propiedades enviadas', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { id: 'VISITA_AGENDADA', label: 'Visita agendada', color: 'bg-yellow-50 text-yellow-800 border-yellow-200' },
  { id: 'VISITA_REALIZADA', label: 'Visita realizada', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'NEGOCIACION', label: 'Negociación', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'RESERVA', label: 'Reserva', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'CERRADO_GANADO', label: 'Cerrado ganado', color: 'bg-green-100 text-green-800 border-green-300' },
  { id: 'CERRADO_PERDIDO', label: 'Cerrado perdido', color: 'bg-gray-100 text-gray-700 border-gray-300' }
];

export const PORTAL_CHANNELS = [
  { id: 'MERCADO_LIBRE', name: 'Mercado Libre Uruguay', logo: 'ML' },
  { id: 'INFOCASAS', name: 'InfoCasas', logo: 'IC' },
  { id: 'GALLITO_LUIS', name: 'Gallito Luis', logo: 'GL' },
  { id: 'ZONAPROP', name: 'Zonaprop / Argenprop', logo: 'ZP' },
  { id: 'TERA_NETWORKING', name: 'Tera Networking Red', logo: 'TN' }
];

function getStored(key, defaultValue) {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStored(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('wave_db_update'));
  } catch (err) {
    console.error('Storage write error:', err);
  }
}

export const WaveDB = {
  init() {
    // 1. Seed Properties with owner connections
    const existingProps = getStored(STORAGE_KEYS.PROPERTIES, null);
    if (!existingProps || existingProps.length === 0) {
      const initialWithOwners = rawProperties.map(p => {
        let ownerId = null;
        if (p.reference === '815') ownerId = 'own_1';
        else if (['4088', '4061', '4090'].includes(String(p.reference))) ownerId = 'own_2';
        else if (['3971', '4373'].includes(String(p.reference))) ownerId = 'own_3';
        return {
          ...p,
          ownerId,
          isVisibleInWeb: true,
          status: p.status || 'PUBLISHED',
          viewsCount: 142,
          inquiriesCount: 8
        };
      });
      setStored(STORAGE_KEYS.PROPERTIES, initialWithOwners);
    }

    // 2. Seed Users
    const existingUsers = getStored(STORAGE_KEYS.USERS, null);
    if (!existingUsers || existingUsers.length === 0) {
      setStored(STORAGE_KEYS.USERS, INITIAL_USERS);
    }

    // 3. Current User
    const currentUser = getStored(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) {
      setStored(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]);
    }

    // 4. Seed Owners
    const existingOwners = getStored(STORAGE_KEYS.OWNERS, null);
    if (!existingOwners || existingOwners.length === 0) {
      setStored(STORAGE_KEYS.OWNERS, INITIAL_OWNERS);
    }

    // 5. Seed Property Event History (Ticker / Timeline)
    const existingPropEvents = getStored(STORAGE_KEYS.PROPERTY_EVENTS, null);
    if (!existingPropEvents) {
      setStored(STORAGE_KEYS.PROPERTY_EVENTS, [
        {
          id: 'pevt_1',
          propertyRef: '815',
          type: 'PRICE_CHANGE',
          title: 'Ajuste de precio comercial',
          description: 'Precio modificado de USD 3.600.000 a USD 3.400.000 autorizado por propietario Gonzalo Berazategui.',
          oldValue: 'USD 3.600.000',
          newValue: 'USD 3.400.000',
          userId: 'usr_superadmin',
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
        },
        {
          id: 'pevt_2',
          propertyRef: '815',
          type: 'VISIT_RECORDED',
          title: 'Visita presencial realizada',
          description: 'Visita con cliente Alejandro Pérez y su arquitecto. Recorrieron terraza y amenities de Acqua.',
          oldValue: null,
          newValue: null,
          userId: 'usr_agent_1',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          id: 'pevt_3',
          propertyRef: '815',
          type: 'PORTAL_SYNC',
          title: 'Sincronización en Mercado Libre y Tera',
          description: 'Ficha enviada y validada en red inmobiliaria multicanal.',
          oldValue: null,
          newValue: 'Publicado',
          userId: 'system',
          createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
        },
        {
          id: 'pevt_4',
          propertyRef: '4088',
          type: 'STATUS_CHANGE',
          title: 'Propiedad publicada en portal Wave',
          description: 'Eve Tower Ref 4088 dada de alta en Venta con 15 fotos de alta resolución.',
          oldValue: 'Borrador',
          newValue: 'Publicada',
          userId: 'usr_manager',
          createdAt: new Date(Date.now() - 86400000 * 8).toISOString()
        }
      ]);
    }

    // 6. Seed Leads (Prospectos / Compradores)
    const existingLeads = getStored(STORAGE_KEYS.LEADS, null);
    if (!existingLeads || existingLeads.length === 0) {
      setStored(STORAGE_KEYS.LEADS, [
        {
          id: 'lead_1',
          firstName: 'Alejandro',
          lastName: 'Pérez Garmendia',
          email: 'aperez@inversiones.com.uy',
          phone: '+598 99 876 543',
          whatsapp: '+59899876543',
          source: 'Website',
          campaign: 'Google Ads - Brava Front',
          stage: 'VISITA_AGENDADA',
          priority: 'HIGH',
          assignedToId: 'usr_agent_1',
          propertyRef: '815',
          budget: 3500000,
          currency: 'USD',
          prefLocation: 'Brava',
          prefCategory: 'Apartamento',
          notes: 'Interesado en Edificio Acqua con terraza y vista franca al mar. Quiere coordinar visita el fin de semana.',
          reminders: [
            { id: 'rem_1', text: 'Confirmar con garita de Acqua para ingreso vehicular.', dueDate: new Date(Date.now() + 86400000).toISOString(), done: false }
          ],
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
        },
        {
          id: 'lead_2',
          firstName: 'María José',
          lastName: 'Vázquez',
          email: 'mjvazquez@gmail.com',
          phone: '+54 9 11 4567 8901',
          whatsapp: '+5491145678901',
          source: 'WhatsApp',
          campaign: 'Instagram Stories Wave',
          stage: 'CALIFICADO',
          priority: 'MEDIUM',
          assignedToId: 'usr_agent_2',
          propertyRef: '3971',
          budget: 1900000,
          currency: 'USD',
          prefLocation: 'La Arbolada',
          prefCategory: 'Casa',
          notes: 'Busca residencia familiar permanente en La Arbolada o San Rafael con mínimo 4 dormitorios y jardín privado.',
          reminders: [
            { id: 'rem_2', text: 'Enviar comparativa de gastos comunes y contribución inmobiliaria.', dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), done: false }
          ],
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 1).toISOString()
        },
        {
          id: 'lead_3',
          firstName: 'Diego',
          lastName: 'Rossi',
          email: 'diegorossi@techcorp.io',
          phone: '+598 94 111 222',
          whatsapp: '+59894111222',
          source: 'Website',
          campaign: 'Bucket Consultas Ficha 4088',
          stage: 'NUEVO',
          priority: 'HIGH',
          assignedToId: null, // EN BUCKET DE CONSULTAS SIN ASIGNAR
          propertyRef: '4088',
          budget: 150000,
          currency: 'USD',
          prefLocation: 'Brava',
          prefCategory: 'Apartamento',
          notes: 'Consulta directa desde la web: "Hola, ¿sigue disponible la unidad en Eve Tower? Quisiera detalles de renta estimada."',
          reminders: [],
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
        },
        {
          id: 'lead_4',
          firstName: 'Fernando',
          lastName: 'Gutiérrez Arana',
          email: 'fgutierrez@agrogroup.com.ar',
          phone: '+54 9 11 6543 2199',
          whatsapp: '+5491165432199',
          source: 'MercadoLibre',
          campaign: 'Campaña Chacras del Este',
          stage: 'CONTACTADO',
          priority: 'HIGH',
          assignedToId: 'usr_superadmin',
          propertyRef: '1831',
          budget: 2500000,
          currency: 'USD',
          prefLocation: 'Campo',
          prefCategory: 'Campo',
          notes: 'Consulta desde Mercado Libre: "Busco chacra o establecimiento con costa o tajamar para producción y recreación. Pago contado."',
          reminders: [],
          createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 5).toISOString()
        },
        {
          id: 'lead_5',
          firstName: 'Sofía',
          lastName: 'Castiglioni',
          email: 'scastiglioni@estudiojuridico.uy',
          phone: '+598 99 333 444',
          whatsapp: '+59899333444',
          source: 'InfoCasas',
          campaign: 'Lanzamiento Eve Tower',
          stage: 'NEGOCIACION',
          priority: 'HIGH',
          assignedToId: 'usr_agent_1',
          propertyRef: '4061',
          budget: 185000,
          currency: 'USD',
          prefLocation: 'Brava',
          prefCategory: 'Apartamento',
          notes: 'Oferta presentada por USD 178.000 sujeta a plazo de entrega de llaves. En revisión con desarrollador.',
          reminders: [],
          createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
        },
        {
          id: 'lead_6',
          firstName: 'Carlos',
          lastName: 'Méndez Rivas',
          email: 'cmendez@riverplate.com.ar',
          phone: '+54 9 11 9988 7766',
          whatsapp: '+5491199887766',
          source: 'Zonaprop',
          campaign: 'Penthouses Punta del Este',
          stage: 'RESERVA',
          priority: 'HIGH',
          assignedToId: 'usr_manager',
          propertyRef: '4090',
          budget: 390000,
          currency: 'USD',
          prefLocation: 'Brava',
          prefCategory: 'Apartamento',
          notes: 'Seña de reserva USD 20.000 depositada en cuenta fiduciaria. Escribana designada: Dra. Valeria Gómez.',
          reminders: [],
          createdAt: new Date(Date.now() - 86400000 * 9).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
        },
        {
          id: 'lead_7',
          firstName: 'Valeria',
          lastName: 'Benítez',
          email: 'valeriabenitez@diseno.com',
          phone: '+598 98 122 344',
          whatsapp: '+59898122344',
          source: 'Website',
          campaign: 'Terrenos Costa',
          stage: 'BUSCANDO_OPCIONES',
          priority: 'MEDIUM',
          assignedToId: 'usr_agent_2',
          propertyRef: '4373',
          budget: 480000,
          currency: 'USD',
          prefLocation: 'El Chorro',
          prefCategory: 'Terreno',
          notes: 'Interesada en solar con vista franca en El Chorro o Manantiales para construir proyecto de autor.',
          reminders: [],
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          id: 'lead_8',
          firstName: 'Marcelo',
          lastName: 'Fontana',
          email: 'mfontana@investments.ch',
          phone: '+41 79 123 4567',
          whatsapp: '+41791234567',
          source: 'WhatsApp',
          campaign: 'Referido Directo',
          stage: 'PROPIEDADES_ENVIADAS',
          priority: 'HIGH',
          assignedToId: 'usr_superadmin',
          propertyRef: '3944',
          budget: 4200000,
          currency: 'USD',
          prefLocation: 'Beverly Hills',
          prefCategory: 'Casa',
          notes: 'Inversor europeo buscando mansión de gran porte con parque cerrado en Beverly Hills o Cantegril.',
          reminders: [],
          createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 3).toISOString()
        },
        {
          id: 'lead_9',
          firstName: 'Patricia',
          lastName: 'Albarracín',
          email: 'palbarracin@luxuryliving.ar',
          phone: '+54 9 11 8765 4321',
          whatsapp: '+5491187654321',
          source: 'MercadoLibre',
          campaign: 'Brava Primera Línea',
          stage: 'VISITA_REALIZADA',
          priority: 'HIGH',
          assignedToId: 'usr_agent_2',
          propertyRef: '4200',
          budget: 1650000,
          currency: 'USD',
          prefLocation: 'Brava',
          prefCategory: 'Casa',
          notes: 'Visita presencial muy positiva. Solicitó plano catastral y reglamento de copropiedad.',
          reminders: [],
          createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
        },
        {
          id: 'lead_10',
          firstName: 'Gastón',
          lastName: 'Echeverría',
          email: 'gaston.echeverria@montevideo.com.uy',
          phone: '+598 94 888 999',
          whatsapp: '+59894888999',
          source: 'Website',
          campaign: 'Buscador Wave Home',
          stage: 'NUEVO',
          priority: 'MEDIUM',
          assignedToId: null, // EN BUCKET DE CONSULTAS
          propertyRef: '3890',
          budget: 920000,
          currency: 'USD',
          prefLocation: 'San Rafael',
          prefCategory: 'Casa',
          notes: 'Consulta directa: "Buenas tardes, quisiéramos saber si la casa de San Rafael acepta permuta de un apartamento en Pocitos."',
          reminders: [],
          createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 6).toISOString()
        },
        {
          id: 'lead_11',
          firstName: 'Federico',
          lastName: 'Larrosa',
          email: 'flarrosa@agronegocios.uy',
          phone: '+598 99 777 111',
          whatsapp: '+59899777111',
          source: 'WhatsApp',
          campaign: 'Cliente Cartera',
          stage: 'NEGOCIACION',
          priority: 'HIGH',
          assignedToId: 'usr_agent_1',
          propertyRef: '815',
          budget: 3300000,
          currency: 'USD',
          prefLocation: 'Brava',
          prefCategory: 'Apartamento',
          notes: 'Negociando precio final de Acqua Penthouse. Contraoferta de USD 3.250.000 enviada a Gonzalo Berazategui.',
          reminders: [],
          createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          id: 'lead_12',
          firstName: 'Andrea',
          lastName: 'Soria de Quintana',
          email: 'asoria@quintana.com.ar',
          phone: '+54 9 11 5544 3322',
          whatsapp: '+5491155443322',
          source: 'InfoCasas',
          campaign: 'Oportunidades Brava',
          stage: 'CERRADO_GANADO',
          priority: 'HIGH',
          assignedToId: 'usr_manager',
          propertyRef: '4088',
          budget: 160000,
          currency: 'USD',
          prefLocation: 'Brava',
          prefCategory: 'Apartamento',
          notes: 'Operación escriturada con éxito. Comisión cobrada 3% comprador + 3% desarrollador.',
          reminders: [],
          createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 4).toISOString()
        }
      ]);
    }

    // 7. Seed Tasks
    const existingTasks = getStored(STORAGE_KEYS.TASKS, null);
    if (!existingTasks || existingTasks.length === 0) {
      setStored(STORAGE_KEYS.TASKS, [
        {
          id: 'tsk_1',
          title: 'Confirmar visita Edificio Acqua (Ref 815)',
          description: 'Llamar a Alejandro para confirmar llegada a garita de seguridad de Acqua.',
          dueDate: new Date(Date.now() + 86400000).toISOString(),
          type: 'LLAMADA',
          priority: 'HIGH',
          isCompleted: false,
          userId: 'usr_agent_1',
          leadId: 'lead_1',
          propertyRef: '815'
        },
        {
          id: 'tsk_2',
          title: 'Enviar brochure digital Eve Tower a Diego Rossi',
          description: 'Adjuntar plano de planta y detalle de rentabilidad esperada.',
          dueDate: new Date(Date.now() + 3600000 * 4).toISOString(),
          type: 'WHATSAPP',
          priority: 'MEDIUM',
          isCompleted: false,
          userId: 'usr_agent_1',
          leadId: 'lead_3',
          propertyRef: '4088'
        },
        {
          id: 'tsk_3',
          title: 'Preparar borrador de compromiso de compraventa Ref 4090',
          description: 'Coordinar con la escribana los certificados de BPS y DGI para reserva.',
          dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
          type: 'DOCUMENTACION',
          priority: 'HIGH',
          isCompleted: false,
          userId: 'usr_manager',
          leadId: 'lead_6',
          propertyRef: '4090'
        },
        {
          id: 'tsk_4',
          title: 'Seguimiento de visita con Patricia Albarracín (Ref 4200)',
          description: 'Enviar respuestas del propietario sobre gastos de mantenimiento y piscina.',
          dueDate: new Date(Date.now() + 3600000 * 8).toISOString(),
          type: 'WHATSAPP',
          priority: 'MEDIUM',
          isCompleted: false,
          userId: 'usr_agent_2',
          leadId: 'lead_9',
          propertyRef: '4200'
        }
      ]);
    }

    // 8. Seed Visits
    const existingVisits = getStored(STORAGE_KEYS.VISITS, null);
    if (!existingVisits || existingVisits.length === 0) {
      setStored(STORAGE_KEYS.VISITS, [
        {
          id: 'vis_1',
          leadId: 'lead_1',
          propertyRef: '815',
          agentId: 'usr_agent_1',
          scheduledAt: new Date(Date.now() + 86400000).toISOString(),
          status: 'CONFIRMADA',
          feedback: null
        },
        {
          id: 'vis_2',
          leadId: 'lead_9',
          propertyRef: '4200',
          agentId: 'usr_agent_2',
          scheduledAt: new Date(Date.now() - 86400000 * 1).toISOString(),
          status: 'REALIZADA',
          feedback: 'Cliente muy interesada en la ubicación frente al mar.'
        },
        {
          id: 'vis_3',
          leadId: 'lead_11',
          propertyRef: '815',
          agentId: 'usr_agent_1',
          scheduledAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          status: 'REALIZADA',
          feedback: 'Recorrida completa por amenities y cochera privada.'
        },
        {
          id: 'vis_4',
          leadId: 'lead_2',
          propertyRef: '3971',
          agentId: 'usr_agent_2',
          scheduledAt: new Date(Date.now() + 86400000 * 3).toISOString(),
          status: 'PENDIENTE',
          feedback: null
        }
      ]);
    }
  },

  // -------------------------------------------------------------
  // USERS & RBAC MANAGEMENT (SUPER ADMIN)
  // -------------------------------------------------------------
  getCurrentUser() {
    return getStored(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]);
  },
  setCurrentUser(user) {
    setStored(STORAGE_KEYS.CURRENT_USER, user);
    this.logAudit(user.id, 'AUTH_SWITCH_USER', 'User', user.id, null, JSON.stringify(user));
  },
  getUsers() {
    return getStored(STORAGE_KEYS.USERS, INITIAL_USERS);
  },
  createUser(newUser) {
    const users = this.getUsers();
    const created = {
      id: 'usr_' + Date.now(),
      status: 'ACTIVE',
      commissionRate: 3.0,
      permissions: {
        canEditProperties: newUser.role !== 'AGENT',
        canDeleteProperties: newUser.role === 'SUPER_ADMIN',
        canManageUsers: newUser.role === 'SUPER_ADMIN',
        canReassignLeads: newUser.role !== 'AGENT',
        canViewAudit: newUser.role === 'SUPER_ADMIN',
        canManageOwners: newUser.role !== 'AGENT'
      },
      ...newUser
    };
    users.push(created);
    setStored(STORAGE_KEYS.USERS, users);
    this.logAudit(this.getCurrentUser().id, 'USER_CREATED', 'User', created.id, null, JSON.stringify(created));
    return created;
  },
  updateUser(updated) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx !== -1) {
      const old = users[idx];
      users[idx] = { ...users[idx], ...updated };
      setStored(STORAGE_KEYS.USERS, users);
      this.logAudit(this.getCurrentUser().id, 'USER_UPDATED', 'User', updated.id, JSON.stringify(old), JSON.stringify(updated));
    }
    return users;
  },

  // -------------------------------------------------------------
  // OWNERS MANAGEMENT (PROPIETARIOS)
  // -------------------------------------------------------------
  getOwners() {
    return getStored(STORAGE_KEYS.OWNERS, INITIAL_OWNERS);
  },
  getOwnerById(id) {
    return this.getOwners().find(o => o.id === id) || null;
  },
  createOwner(newOwner) {
    const owners = this.getOwners();
    const created = {
      id: 'own_' + Date.now(),
      propertyRefs: [],
      createdAt: new Date().toISOString(),
      ...newOwner
    };
    owners.unshift(created);
    setStored(STORAGE_KEYS.OWNERS, owners);
    this.logAudit(this.getCurrentUser().id, 'OWNER_CREATED', 'Owner', created.id, null, JSON.stringify(created));
    return created;
  },
  updateOwner(updated) {
    const owners = this.getOwners();
    const idx = owners.findIndex(o => o.id === updated.id);
    if (idx !== -1) {
      const old = owners[idx];
      owners[idx] = { ...owners[idx], ...updated };
      setStored(STORAGE_KEYS.OWNERS, owners);
      this.logAudit(this.getCurrentUser().id, 'OWNER_UPDATED', 'Owner', updated.id, JSON.stringify(old), JSON.stringify(updated));
    }
    return owners;
  },
  associatePropertyToOwner(ownerId, propertyRef) {
    const owners = this.getOwners();
    const owner = owners.find(o => o.id === ownerId);
    if (owner && !owner.propertyRefs.includes(String(propertyRef))) {
      owner.propertyRefs.push(String(propertyRef));
      setStored(STORAGE_KEYS.OWNERS, owners);
    }
    // Also update property ownerId
    const prop = this.getPropertyByRef(propertyRef);
    if (prop) {
      prop.ownerId = ownerId;
      this.updateProperty(prop);
    }
  },

  // -------------------------------------------------------------
  // PROPERTIES & TICKER / EVENT HISTORY
  // -------------------------------------------------------------
  getProperties() {
    return getStored(STORAGE_KEYS.PROPERTIES, rawProperties);
  },
  getPropertyByRef(ref) {
    return this.getProperties().find(p => String(p.reference) === String(ref)) || null;
  },
  updateProperty(updatedProp) {
    const list = this.getProperties();
    const idx = list.findIndex(p => String(p.reference) === String(updatedProp.reference));
    const user = this.getCurrentUser();
    let oldProp = null;
    
    if (idx !== -1) {
      oldProp = list[idx];
      list[idx] = { ...list[idx], ...updatedProp, updatedAt: new Date().toISOString() };
      
      // Auto-record Property Event History if price or visibility changed
      if (oldProp.price !== updatedProp.price) {
        this.addPropertyEvent({
          propertyRef: updatedProp.reference,
          type: 'PRICE_CHANGE',
          title: 'Ajuste de Precio',
          description: `Precio modificado de USD ${Number(oldProp.price).toLocaleString()} a USD ${Number(updatedProp.price).toLocaleString()}`,
          oldValue: `USD ${oldProp.price}`,
          newValue: `USD ${updatedProp.price}`,
          userId: user.id
        });
      }

      if (oldProp.status !== updatedProp.status) {
        this.addPropertyEvent({
          propertyRef: updatedProp.reference,
          type: 'STATUS_CHANGE',
          title: 'Cambio de Estado',
          description: `Estado modificado de "${oldProp.status}" a "${updatedProp.status}"`,
          oldValue: oldProp.status,
          newValue: updatedProp.status,
          userId: user.id
        });
      }

      if (oldProp.isVisibleInWeb !== updatedProp.isVisibleInWeb) {
        this.addPropertyEvent({
          propertyRef: updatedProp.reference,
          type: 'VISIBILITY_CHANGE',
          title: updatedProp.isVisibleInWeb ? 'Propiedad Visibilizada en Web' : 'Propiedad Ocultada en Web',
          description: updatedProp.isVisibleInWeb ? 'La ficha ahora es pública en el portal' : 'La ficha fue ocultada del buscador público',
          oldValue: String(oldProp.isVisibleInWeb),
          newValue: String(updatedProp.isVisibleInWeb),
          userId: user.id
        });
      }
    } else {
      list.unshift({ ...updatedProp, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      this.addPropertyEvent({
        propertyRef: updatedProp.reference,
        type: 'CREATED',
        title: 'Propiedad Creada',
        description: `Ficha creada por ${user.name}`,
        userId: user.id
      });
    }
    
    setStored(STORAGE_KEYS.PROPERTIES, list);
    this.logAudit(user.id, 'PROPERTY_UPDATED', 'Property', updatedProp.reference, oldProp ? JSON.stringify(oldProp) : null, JSON.stringify(updatedProp));
    return list;
  },
  getPropertyEvents(ref, inquiryId = null) {
    const all = getStored(STORAGE_KEYS.PROPERTY_EVENTS, []);
    return all.filter(e => {
      const matchRef = !ref || String(e.propertyRef) === String(ref);
      const matchInquiry = !inquiryId || String(e.inquiryId) === String(inquiryId);
      return matchRef && matchInquiry;
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  addPropertyEvent(event) {
    const all = getStored(STORAGE_KEYS.PROPERTY_EVENTS, []);
    const newEvt = {
      id: 'pevt_' + Date.now() + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString(),
      ...event
    };
    all.unshift(newEvt);
    setStored(STORAGE_KEYS.PROPERTY_EVENTS, all);
    return newEvt;
  },

  // -------------------------------------------------------------
  // LEADS & INQUIRIES BUCKET (CONSULTAS SIN ASIGNAR & ASIGNACIÓN)
  // -------------------------------------------------------------
  getLeads() {
    return getStored(STORAGE_KEYS.LEADS, []);
  },
  getInquiriesBucket() {
    // Unassigned inquiries / leads
    return this.getLeads().filter(l => !l.assignedToId);
  },
  assignLead(leadId, targetUserId) {
    const leads = this.getLeads();
    const lead = leads.find(l => l.id === leadId);
    const currentUser = this.getCurrentUser();
    const targetUser = this.getUsers().find(u => u.id === targetUserId);

    if (lead && targetUser) {
      const oldAssigned = lead.assignedToId;
      lead.assignedToId = targetUserId;
      lead.stage = lead.stage === 'NUEVO' ? 'SIN_CONTACTAR' : lead.stage;
      lead.updatedAt = new Date().toISOString();
      setStored(STORAGE_KEYS.LEADS, leads);

      this.addActivity({
        leadId,
        userId: currentUser.id,
        type: 'ASSIGNMENT_CHANGED',
        title: 'Lead Asignado a Asesor',
        description: `Asignado a ${targetUser.name} (${targetUser.title}) por ${currentUser.name}.`
      });

      // Also create a welcome task for the assigned agent
      this.createTask({
        title: `Contactar nuevo lead: ${lead.firstName} ${lead.lastName || ''}`,
        description: `Lead asignado desde el Bucket de Consultas. Interesado en Ref ${lead.propertyRef || 'General'}.`,
        dueDate: new Date(Date.now() + 3600000 * 3).toISOString(), // 3 hours deadline
        type: 'WHATSAPP',
        priority: 'HIGH',
        userId: targetUserId,
        leadId: lead.id,
        propertyRef: lead.propertyRef
      });

      this.logAudit(currentUser.id, 'LEAD_REASSIGNED', 'Lead', leadId, oldAssigned, targetUserId);
    }
    return leads;
  },
  createLeadFromInquiry({ name, email, phone, propertyRef, message, source = 'Website', campaign = 'Inquiry Form' }) {
    const leads = this.getLeads();
    const normalizedPhone = (phone || '').replace(/[^0-9]/g, '');
    const normalizedEmail = (email || '').trim().toLowerCase();

    // Deduplication check
    let existing = leads.find(l => 
      (normalizedEmail && l.email && l.email.toLowerCase() === normalizedEmail) ||
      (normalizedPhone && l.phone && l.phone.replace(/[^0-9]/g, '') === normalizedPhone)
    );

    const prop = this.getPropertyByRef(propertyRef);

    if (existing) {
      existing.updatedAt = new Date().toISOString();
      existing.notes = (existing.notes ? existing.notes + '\n---\n' : '') + `Nueva consulta (${new Date().toLocaleDateString()}): ${message} (Ref: ${propertyRef})`;
      if (propertyRef && (!existing.propertyRef || existing.propertyRef !== propertyRef)) {
        existing.propertyRef = propertyRef;
      }
      setStored(STORAGE_KEYS.LEADS, leads);

      this.addActivity({
        leadId: existing.id,
        userId: existing.assignedToId || 'system',
        type: 'INQUIRY_RECEIVED',
        title: 'Nueva consulta en propiedad',
        description: `Consulta recibida para Ref ${propertyRef}: "${message}"`
      });

      return { lead: existing, isNew: false };
    }

    // New inquiry goes directly to the INQUIRIES BUCKET (assignedToId: null) so Managers/SuperAdmins can triage and assign
    const newLead = {
      id: 'lead_' + Date.now(),
      firstName: name,
      lastName: '',
      email: normalizedEmail,
      phone: phone,
      whatsapp: phone ? (phone.startsWith('+') ? phone : '+598' + phone) : null,
      source,
      campaign,
      stage: 'NUEVO',
      priority: prop && prop.price > 1000000 ? 'HIGH' : 'MEDIUM',
      assignedToId: null, // PENDING IN BUCKET
      propertyRef: propertyRef || null,
      budget: prop ? prop.price : null,
      currency: prop ? prop.currency : 'USD',
      prefLocation: prop ? prop.location : null,
      prefCategory: prop ? prop.type : null,
      notes: message ? `Consulta: ${message}` : 'Ingreso directo por formulario web.',
      reminders: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    leads.unshift(newLead);
    setStored(STORAGE_KEYS.LEADS, leads);

    // Record in property ticker as well!
    if (propertyRef) {
      this.addPropertyEvent({
        propertyRef,
        inquiryId: newLead.id,
        type: 'INQUIRY_RECEIVED',
        title: 'Nueva consulta web recibida',
        description: `Interesado: ${name} (${email || phone}). Mensaje: "${message}"`,
        userId: 'system'
      });
    }

    this.addActivity({
      leadId: newLead.id,
      userId: 'system',
      type: 'INQUIRY_RECEIVED',
      title: 'Consulta ingresada al Bucket',
      description: `Lead capturado desde ${source} para propiedad Ref ${propertyRef || 'General'}. Esperando asignación.`
    });

    this.logAudit('system', 'LEAD_CREATED', 'Lead', newLead.id, null, JSON.stringify(newLead));
    return { lead: newLead, isNew: true };
  },
  addReminderToLead(leadId, text, dueDate) {
    const leads = this.getLeads();
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      if (!lead.reminders) lead.reminders = [];
      const newRem = {
        id: 'rem_' + Date.now(),
        text,
        dueDate: dueDate || new Date(Date.now() + 86400000).toISOString(),
        done: false,
        createdAt: new Date().toISOString()
      };
      lead.reminders.push(newRem);
      setStored(STORAGE_KEYS.LEADS, leads);

      this.addActivity({
        leadId,
        userId: this.getCurrentUser().id,
        type: 'NOTE_ADDED',
        title: 'Recordatorio programado',
        description: `Recordatorio: "${text}" para el ${new Date(newRem.dueDate).toLocaleDateString()}`
      });

      return newRem;
    }
    return null;
  },
  toggleLeadReminder(leadId, reminderId) {
    const leads = this.getLeads();
    const lead = leads.find(l => l.id === leadId);
    if (lead && lead.reminders) {
      const rem = lead.reminders.find(r => r.id === reminderId);
      if (rem) {
        rem.done = !rem.done;
        setStored(STORAGE_KEYS.LEADS, leads);
      }
    }
  },
  updateLeadStage(leadId, newStage) {
    const leads = this.getLeads();
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return null;

    const oldStage = lead.stage;
    lead.stage = newStage;
    lead.updatedAt = new Date().toISOString();
    setStored(STORAGE_KEYS.LEADS, leads);

    const user = this.getCurrentUser();
    this.addActivity({
      leadId,
      userId: user.id,
      type: 'STAGE_CHANGED',
      title: 'Cambio de estado comercial',
      description: `Etapa modificada de "${oldStage}" a "${newStage}" por ${user.name}.`
    });

    this.logAudit(user.id, 'LEAD_STAGE_UPDATED', 'Lead', leadId, oldStage, newStage);
    return lead;
  },
  updateLead(updatedLead) {
    const leads = this.getLeads();
    const idx = leads.findIndex(l => l.id === updatedLead.id);
    const user = this.getCurrentUser();
    if (idx !== -1) {
      const old = leads[idx];
      leads[idx] = { ...leads[idx], ...updatedLead, updatedAt: new Date().toISOString() };
      setStored(STORAGE_KEYS.LEADS, leads);
      this.logAudit(user.id, 'LEAD_UPDATED', 'Lead', updatedLead.id, JSON.stringify(old), JSON.stringify(updatedLead));
    }
    return leads;
  },

  // -------------------------------------------------------------
  // ACTIVITIES & TIMELINE
  // -------------------------------------------------------------
  getActivities(leadId) {
    const all = getStored(STORAGE_KEYS.ACTIVITIES, []);
    return leadId ? all.filter(a => a.leadId === leadId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : all;
  },
  addActivity(act) {
    const all = getStored(STORAGE_KEYS.ACTIVITIES, []);
    const newAct = {
      id: 'act_' + Date.now() + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString(),
      ...act
    };
    all.unshift(newAct);
    setStored(STORAGE_KEYS.ACTIVITIES, all);

    // Link treaty / activity directly into the property event ticker if associated with a property
    if (newAct.leadId) {
      const leads = getStored(STORAGE_KEYS.LEADS, []);
      const lead = leads.find(l => l.id === newAct.leadId);
      if (lead && lead.propertyRef) {
        this.addPropertyEvent({
          propertyRef: lead.propertyRef,
          inquiryId: lead.id,
          type: newAct.type || 'TREATY_UPDATE',
          title: newAct.title || 'Avance de Tratativa Comercial',
          description: newAct.description || '',
          userId: newAct.userId || 'system'
        });
      }
    }

    return newAct;
  },

  // -------------------------------------------------------------
  // TASKS
  // -------------------------------------------------------------
  getTasks(userId) {
    const all = getStored(STORAGE_KEYS.TASKS, []);
    return userId ? all.filter(t => t.userId === userId) : all;
  },
  createTask(task) {
    const all = getStored(STORAGE_KEYS.TASKS, []);
    const newTask = {
      id: 'tsk_' + Date.now(),
      createdAt: new Date().toISOString(),
      isCompleted: false,
      ...task
    };
    all.unshift(newTask);
    setStored(STORAGE_KEYS.TASKS, all);
    return newTask;
  },
  toggleTask(taskId) {
    const all = getStored(STORAGE_KEYS.TASKS, []);
    const t = all.find(item => item.id === taskId);
    if (t) {
      t.isCompleted = !t.isCompleted;
      t.completedAt = t.isCompleted ? new Date().toISOString() : null;
      setStored(STORAGE_KEYS.TASKS, all);
    }
    return all;
  },

  // -------------------------------------------------------------
  // VISITS
  // -------------------------------------------------------------
  getVisits(agentId) {
    const all = getStored(STORAGE_KEYS.VISITS, []);
    return agentId ? all.filter(v => v.agentId === agentId) : all;
  },
  createVisit(visit) {
    const all = getStored(STORAGE_KEYS.VISITS, []);
    const newVisit = {
      id: 'vis_' + Date.now(),
      status: 'SOLICITADA',
      createdAt: new Date().toISOString(),
      ...visit
    };
    all.unshift(newVisit);
    setStored(STORAGE_KEYS.VISITS, all);
    
    this.addActivity({
      leadId: visit.leadId,
      userId: visit.agentId,
      type: 'VISIT_SCHEDULED',
      title: 'Visita inmobiliaria agendada',
      description: `Visita programada para la propiedad Ref ${visit.propertyRef} el día ${new Date(visit.scheduledAt).toLocaleString()}.`
    });

    this.addPropertyEvent({
      propertyRef: visit.propertyRef,
      type: 'VISIT_SCHEDULED',
      title: 'Visita agendada',
      description: `Coordinada por asesor con cliente. Fecha: ${new Date(visit.scheduledAt).toLocaleString()}`,
      userId: visit.agentId
    });

    return newVisit;
  },
  updateVisitStatus(visitId, status, feedback) {
    const all = getStored(STORAGE_KEYS.VISITS, []);
    const v = all.find(item => item.id === visitId);
    if (v) {
      v.status = status;
      if (feedback) v.feedback = feedback;
      v.updatedAt = new Date().toISOString();
      setStored(STORAGE_KEYS.VISITS, all);

      this.addActivity({
        leadId: v.leadId,
        userId: v.agentId,
        type: 'VISIT_COMPLETED',
        title: `Visita ${status}`,
        description: feedback ? `Notas post-visita: ${feedback}` : `Estado actualizado a ${status}`
      });

      this.addPropertyEvent({
        propertyRef: v.propertyRef,
        type: 'VISIT_RECORDED',
        title: `Visita presencial ${status}`,
        description: feedback || `Visita actualizada a ${status}`,
        userId: v.agentId
      });
    }
    return all;
  },

  // -------------------------------------------------------------
  // AUDIT LOG
  // -------------------------------------------------------------
  getAuditLogs() {
    return getStored(STORAGE_KEYS.AUDIT, []);
  },
  logAudit(userId, action, entityType, entityId, oldValue, newValue) {
    const logs = getStored(STORAGE_KEYS.AUDIT, []);
    logs.unshift({
      id: 'audit_' + Date.now(),
      userId: userId || 'system',
      action,
      entityType,
      entityId: String(entityId),
      oldValue,
      newValue,
      timestamp: new Date().toISOString()
    });
    setStored(STORAGE_KEYS.AUDIT, logs.slice(0, 300));
  },

  // -------------------------------------------------------------
  // MULTI-CHANNEL PUBLICATIONS
  // -------------------------------------------------------------
  getPublications(propRef) {
    const pubs = getStored(STORAGE_KEYS.PUBLICATIONS, {});
    return pubs[propRef] || {};
  },
  updatePublicationChannel(propRef, channel, status, externalUrl) {
    const pubs = getStored(STORAGE_KEYS.PUBLICATIONS, {});
    if (!pubs[propRef]) pubs[propRef] = {};
    pubs[propRef][channel] = {
      status,
      externalUrl: externalUrl || null,
      lastSyncAt: new Date().toISOString()
    };
    setStored(STORAGE_KEYS.PUBLICATIONS, pubs);
    this.logAudit(this.getCurrentUser().id, 'PORTAL_SYNC_UPDATE', 'PropertyPublication', `${propRef}_${channel}`, null, status);
    return pubs[propRef];
  },

  // -------------------------------------------------------------
  // SMART MATCHING ALGORITHM (LEAD <-> PROPERTIES)
  // -------------------------------------------------------------
  getMatchedPropertiesForLead(lead) {
    const properties = this.getProperties().filter(p => p.status === 'PUBLISHED' && p.isVisibleInWeb);
    if (!lead) return [];

    return properties.map(prop => {
      let score = 0;
      let reasons = [];

      if (lead.prefOperation && prop.operation.toLowerCase() === lead.prefOperation.toLowerCase()) {
        score += 30;
        reasons.push('Misma operación');
      }

      if (lead.prefCategory && prop.type.toLowerCase() === lead.prefCategory.toLowerCase()) {
        score += 25;
        reasons.push('Misma categoría');
      }

      if (lead.prefLocation && prop.location.toLowerCase().includes(lead.prefLocation.toLowerCase())) {
        score += 20;
        reasons.push('Zona coincidente');
      }

      if (lead.budget && prop.price > 0) {
        const diff = Math.abs(prop.price - lead.budget) / lead.budget;
        if (diff <= 0.15) {
          score += 25;
          reasons.push('Presupuesto ideal (±15%)');
        } else if (diff <= 0.3) {
          score += 15;
          reasons.push('Presupuesto cercano (±30%)');
        }
      }

      if (lead.propertyRef && String(prop.reference) === String(lead.propertyRef)) {
        score = 100;
        reasons = ['Propiedad directamente consultada'];
      }

      return {
        property: prop,
        score: Math.min(100, score),
        reasons
      };
    }).filter(item => item.score >= 30).sort((a, b) => b.score - a.score);
  }
};
