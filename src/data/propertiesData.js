export const PROPERTIES_DATA = [
  {
    id: 'residencia-nahuel-huapi',
    title: 'Residencia Volcán & Lago',
    tagline: 'Arquitectura voladiza moderna con vistas infinitas al Nahuel Huapi',
    category: 'Casas Modernas',
    operation: 'Venta',
    featured: true,
    priceUSD: 890000,
    priceARS: 1112500000,
    expensesUSD: 320,
    location: {
      city: 'San Carlos de Bariloche',
      zone: 'Circuito Chico / Bahía López',
      province: 'Río Negro'
    },
    specs: {
      coveredM2: 460,
      totalM2: 2400,
      bedrooms: 4,
      bathrooms: 5,
      parking: 3,
      yearBuilt: 2023
    },
    image: '/assets/images/hero_residencia_andina.webp',
    gallery: [
      '/assets/images/hero_residencia_andina.webp',
      '/assets/images/casa_moderna_lago.webp',
      '/assets/images/departamento_penthouse_andino.webp'
    ],
    description: 'Imponente obra de autor diseñada con estructura de acero negro mate, piedra volcánica basáltica y revestimiento en madera de lenga patagónica estacionada. Posee ventanales de piso a techo con vidrio triple termoacústico, terraza voladiza con fogonero a gas, muelle privado con bajada para lancha y master suite con vista panorámica de 180 grados a la cordillera.',
    amenities: [
      'Vista Panorámica al Lago',
      'Muelle & Bajada Náutica',
      'Fogonero Exterior en Deck',
      'Losa Radiante Geotérmica',
      'Cava Subterránea Climatizada',
      'Generador Automático Diésel',
      'Fibra Óptica de Alta Velocidad',
      'Seguridad Privada 24hs'
    ],
    agent: {
      name: 'Ignacio Valenzuela',
      role: 'Socio & Asesor Senior',
      phone: '+54 9 294 482-1940',
      email: 'ignacio.valenzuela@inmobify.com'
    }
  },
  {
    id: 'cabana-nordica-san-martin',
    title: 'Cabaña Refugio A-Frame Nórdico',
    tagline: 'Diseño alpino contemporáneo inmerso en bosque nativo de lengas',
    category: 'Cabañas',
    operation: 'Alquiler Temporal',
    featured: true,
    priceUSD: 380, // por noche
    priceARS: 475000,
    pricePeriod: '/noche',
    expensesUSD: 0,
    location: {
      city: 'San Martín de los Andes',
      zone: 'Cerro Chapelco / Los Riscos',
      province: 'Neuquén'
    },
    specs: {
      coveredM2: 210,
      totalM2: 1800,
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      yearBuilt: 2022
    },
    image: '/assets/images/cabana_alpina_bosque.webp',
    gallery: [
      '/assets/images/cabana_alpina_bosque.webp',
      '/assets/images/hero_residencia_andina.webp'
    ],
    description: 'Refugio contemporáneo de montaña con estética escandinava y calidez andina. Fachada acristalada de doble altura con chimenea central revestida en piedra bocha de río, hot tub exterior de cedro con hidromasaje bajo las estrellas y cocina gourmet integrada con barra de roble macizo.',
    amenities: [
      'Chimenea Central de Piedra',
      'Hot Tub Exterior Nórdico',
      'Bosque Nativo Protegido',
      'Guarda Esquís Calefaccionado',
      'Parrilla & Asador Patagónico',
      'Internet Satelital Starlink',
      'Servicio de Mucama Opcional'
    ],
    agent: {
      name: 'Camila Rossi',
      role: 'Especialista en Alquileres Temporales',
      phone: '+54 9 297 241-8833',
      email: 'camila.rossi@inmobify.com'
    }
  },
  {
    id: 'villa-cumelen-angostura',
    title: 'Villa Espejo de Agua',
    tagline: 'Residencia de vanguardia con costa de lago y piscina climatizada in-out',
    category: 'Casas Modernas',
    operation: 'Venta',
    featured: true,
    priceUSD: 1250000,
    priceARS: 1562500000,
    expensesUSD: 450,
    location: {
      city: 'Villa La Angostura',
      zone: 'Country Club Cumelén / Puerto Manzano',
      province: 'Neuquén'
    },
    specs: {
      coveredM2: 520,
      totalM2: 3600,
      bedrooms: 5,
      bathrooms: 6,
      parking: 4,
      yearBuilt: 2024
    },
    image: '/assets/images/casa_moderna_lago.webp',
    gallery: [
      '/assets/images/casa_moderna_lago.webp',
      '/assets/images/departamento_penthouse_andino.webp'
    ],
    description: 'Exclusiva propiedad sobre la ladera sur con acceso directo a playa de arena volcánica y muelle habilitado. Construida con hormigón visto texturado, ciprés cordillerano y cerramientos alemanes Schuco. Incluye spa con sauna seco, sala de cine acústica y domótica integral Crestron.',
    amenities: [
      'Playa Privada & Muelle Propio',
      'Piscina Climatizada In/Out',
      'Sauna Seco & Spa Panorámico',
      'Domótica Integral Smart Home',
      'Microcine Profesional 4K',
      'Cancha de Tenis del Barrio',
      'Club House & Amarras'
    ],
    agent: {
      name: 'Ignacio Valenzuela',
      role: 'Socio & Asesor Senior',
      phone: '+54 9 294 482-1940',
      email: 'ignacio.valenzuela@inmobify.com'
    }
  },
  {
    id: 'lote-altos-chapelco',
    title: 'Lote Panorámico Altos de Chapelco',
    tagline: 'Parcela de montaña virgen con orientación norte y servicios subterráneos',
    category: 'Lotes de Montaña',
    operation: 'Venta',
    featured: false,
    priceUSD: 240000,
    priceARS: 300000000,
    expensesUSD: 180,
    location: {
      city: 'San Martín de los Andes',
      zone: 'Chapelco Golf & Resort',
      province: 'Neuquén'
    },
    specs: {
      coveredM2: 0,
      totalM2: 3200,
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      yearBuilt: null
    },
    image: '/assets/images/lote_montana_panoramico.webp',
    gallery: [
      '/assets/images/lote_montana_panoramico.webp'
    ],
    description: 'Lote premium en exclusivo barrio cerrado con cancha de golf Jack Nicklaus Signature. Suave pendiente ideal para implantación de proyecto arquitectónico aterrazado sin desmonte invasivo. Vistas directas al Cordón Chapelco y Lago Lácar con todos los servicios subterráneos listos para conectar.',
    amenities: [
      'Campo de Golf 18 Hoyos Jack Nicklaus',
      'Servicios Subterráneos (Gas, Luz, Agua)',
      'Escrituración Inmediata Apta Crédito',
      'Control de Acceso & Seguridad',
      'Reglamento de Construcción Sustentable',
      'Club House & Restaurante Gourmet'
    ],
    agent: {
      name: 'Marcos Benítez',
      role: 'Consultor de Inversiones & Suelos',
      phone: '+54 9 297 266-1020',
      email: 'marcos.benitez@inmobify.com'
    }
  },
  {
    id: 'local-boutique-san-martin',
    title: 'Edificio Comercial Alma de Montaña',
    tagline: 'Local comercial en esquina neurálgica peatonal con renta activa',
    category: 'Locales Comerciales',
    operation: 'Alquiler Anual',
    featured: false,
    priceUSD: 2800, // mensual
    priceARS: 3500000,
    pricePeriod: '/mes',
    expensesUSD: 120,
    location: {
      city: 'San Martín de los Andes',
      zone: 'Av. San Martín & Calle Villegas (Centro Cívico)',
      province: 'Neuquén'
    },
    specs: {
      coveredM2: 185,
      totalM2: 220,
      bedrooms: 0,
      bathrooms: 2,
      parking: 2,
      yearBuilt: 2021
    },
    image: '/assets/images/local_comercial_andino.webp',
    gallery: [
      '/assets/images/local_comercial_andino.webp'
    ],
    description: 'Excepcional local en dos plantas con imponente fachada en madera de coihue y piedra pórfido. Doble vidriera de alto impacto visual hacia arteria turística de máxima afluencia comercial. Apto gastronomía boutique, chocolatería de alta gama, indumentaria outdoor o galería de arte.',
    amenities: [
      'Doble Vidriera Panorámica',
      'Habilitación Comercial Vigente',
      'Sistema de Climatización Central',
      'Depósito & Área de Carga/Descarga',
      'Batería de Sanitarios de Diseño',
      'Alarma Monitoreada & Circuito CCTV'
    ],
    agent: {
      name: 'Marcos Benítez',
      role: 'Consultor de Inversiones & Suelos',
      phone: '+54 9 297 266-1020',
      email: 'marcos.benitez@inmobify.com'
    }
  },
  {
    id: 'penthouse-canal-beagle',
    title: 'Penthouse Austral & Canal Beagle',
    tagline: 'Tríplex de ultra lujo en el confín del mundo con vistas glaciares',
    category: 'Departamentos',
    operation: 'Venta',
    featured: true,
    priceUSD: 540000,
    priceARS: 675000000,
    expensesUSD: 260,
    location: {
      city: 'Ushuaia',
      zone: 'Paseo de la Costa / Glaciar Martial',
      province: 'Tierra del Fuego'
    },
    specs: {
      coveredM2: 290,
      totalM2: 340,
      bedrooms: 3,
      bathrooms: 4,
      parking: 2,
      yearBuilt: 2023
    },
    image: '/assets/images/departamento_penthouse_andino.webp',
    gallery: [
      '/assets/images/departamento_penthouse_andino.webp',
      '/assets/images/hero_residencia_andina.webp'
    ],
    description: 'Exclusivo penthouse en última planta con techos a dos aguas de madera a la vista, chimenea suspendida Focus de diseño francés y terraza perimetral calefaccionada con vista abierta al Canal Beagle y los montes Olivia y Cinco Hermanos.',
    amenities: [
      'Vistas Abiertas al Canal Beagle',
      'Chimenea de Diseño Francés',
      'Balcón Terraza Calefaccionado',
      'Doble Cochera Subterránea + Baulera',
      'Edificio con Piscina & Cava Común',
      'Ascensor Privado con Código'
    ],
    agent: {
      name: 'Camila Rossi',
      role: 'Especialista en Alquileres Temporales',
      phone: '+54 9 297 241-8833',
      email: 'camila.rossi@inmobify.com'
    }
  }
];

export const CATEGORIES = [
  'Todos',
  'Casas Modernas',
  'Cabañas',
  'Lotes de Montaña',
  'Locales Comerciales',
  'Departamentos'
];

export const OPERATIONS = ['Todos', 'Venta', 'Alquiler Temporal', 'Alquiler Anual'];

export const LOCATIONS = [
  'Todas las Zonas',
  'San Carlos de Bariloche',
  'Villa La Angostura',
  'San Martín de los Andes',
  'Ushuaia'
];
