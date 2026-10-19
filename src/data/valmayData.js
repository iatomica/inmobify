export const INITIAL_HERO_CONFIG = {
  badge: "UN EQUIPO, TODAS TUS SOLUCIONES",
  title: "Servicios Integrales y Gestión para Espacios en Buenos Aires",
  subtitle: "Unimos experiencia, compromiso y versatilidad para ofrecer soluciones integrales que transforman espacios, simplifican tu día a día y garantizan resultados de máxima excelencia en reformas, limpiezas y mantenimiento.",
  ctaPrimary: "Solicitar Presupuesto Inmediato",
  ctaSecondary: "Explorar Servicios de Gestión",
  backgroundImage: "/assets/images/hero_valmay.jpg",
  stats: [
    { value: "99%", label: "Satisfacción Clientes", detail: "Garantía de calidad Valmay" },
    { value: "+450", label: "Espacios Gestionados", detail: "Departamentos, oficinas y consorcios" },
    { value: "24/7", label: "Atención Urgencias", detail: "Respuesta rápida en CABA" },
    { value: "15+", label: "Años de Experiencia", detail: "Equipo técnico especializado" }
  ]
};

export const INITIAL_COMPANY_CONFIG = {
  name: "Valmay Group",
  tagline: "Empresa de Servicios Integrales y Gestión",
  phone: "+34 688 84 67 97",
  phoneFormatted: "+34 688 84 67 97",
  whatsapp: "34688846797",
  email: "info@valmaygroup.com",
  address: "Maipú 204, Piso 3, Oficina 4, Buenos Aires",
  mapsUrl: "https://maps.google.com/maps?q=Maip%C3%BA+204%2C+Buenos+Aires",
  schedule: "Lunes a Domingo: 08:00 - 18:00 (Guardias 24hs)",
  cuit: "30-71829045-8"
};

export const INITIAL_SERVICES_DATA = [
  {
    id: "gestion-inmuebles-alojamientos",
    title: "Gestión Integral de Inmuebles y Apartamentos Turísticos",
    tagline: "Centralización operativa completa, custodia de llaves, check-in y supervisión técnica",
    category: "Gestión Integral",
    featured: true,
    priceType: "Desde",
    priceAmount: 89,
    priceUnit: "USD/mes o por servicio",
    badge: "Más Demandado",
    image: "/assets/images/services_valmay.jpeg",
    icon: "Building2",
    shortDesc: "Modelo multiservicios que centraliza la administración operativa de viviendas turísticas, comunidades y oficinas.",
    fullDesc: "Nuestro servicio de gestión integral te permite tener un único aliado de confianza en Buenos Aires. Nos encargamos de la custodia de llaves, supervisión de accesos, inspecciones preventivas periódicas, gestión de check-in / check-out de huéspedes con atención multilingüe, y coordinación inmediata de cualquier avería o necesidad operativa.",
    features: [
      "Check-in presencial y digital de huéspedes con verificación de identidad",
      "Custodia segura de llaves y gestión de cerraduras inteligentes",
      "Inspección detallada con reporte fotográfico post-estancia",
      "Coordinación ágil de limpiezas exprés y reposición de amenities",
      "Resolución de incidencias 24/7 sin intermediarios molestos",
      "Panel de control para propietarios con historial de actuaciones"
    ],
    sectors: ["Viviendas Turísticas", "Propietarios en el Extranjero", "Comunidades", "Edificios de Oficinas"],
    responseTime: "Inmediata (< 45 minutos en CABA)",
    guarantee: "100% Satisfacción o reintervención sin coste"
  },
  {
    id: "limpieza-tecnica-profesional",
    title: "Excelencia en Limpieza Técnica y Desinfección",
    tagline: "Limpieza avanzada con productos ecológicos y lavandería industrial para apartamentos y empresas",
    category: "Limpieza",
    featured: true,
    priceType: "Desde",
    priceAmount: 18,
    priceUnit: "USD/hora o presupuesto cerrado",
    badge: "Eco-Responsable",
    image: "/assets/images/hero_valmay.jpg",
    icon: "Sparkles",
    shortDesc: "Técnica avanzada, personal cualificado y productos ecológicos para oficinas, hogares y apartamentos turísticos.",
    fullDesc: "Combinamos maquinaria de última generación, protocolos de desinfección hospitalaria y productos ecológicos certificados. Atendemos oficinas corporativas, fin de obras, locales comerciales, residencias privadas y departamentos temporarios con retiro, lavado, planchado y entrega de ropa blanca de cama y toallas de alta gama.",
    features: [
      "Limpieza de fin de obra y post-reforma con aspiración industrial de partículas",
      "Limpieza y desinfección periódica de oficinas y despachos",
      "Servicio especializado para apartamentos turísticos con rotación intensiva",
      "Servicio de lavandería de sábanas y toallas con entrega empaquetada",
      "Tratamiento y abrillantado de pisos de mármol, gres y microcemento",
      "Limpieza de cristales en altura y fachadas vidriadas"
    ],
    sectors: ["Departamentos Temporarios", "Oficinas & Coworkings", "Locales Comerciales", "Particulares"],
    responseTime: "Servicio programado o urgente en el mismo día",
    guarantee: "Protocolo de higiene certificado Valmay"
  },
  {
    id: "mantenimiento-preventivo-correctivo",
    title: "Mantenimiento Técnico y Asistencia Multioficio",
    tagline: "Electricidad, climatización, plomería, cerrajería y reparaciones con respuesta prioritaria",
    category: "Mantenimiento",
    featured: true,
    priceType: "Desde",
    priceAmount: 45,
    priceUnit: "USD/intervención técnica",
    badge: "Asistencia Rápida",
    image: "/assets/images/services_valmay.jpeg",
    icon: "Wrench",
    shortDesc: "Mantenimiento preventivo y correctivo para instalaciones eléctricas, climatización, plomería y cerraduras.",
    fullDesc: "Evita paradas operativas y quejas de inquilinos. Nuestro equipo multidisciplinar cubre todas las áreas de mantenimiento de edificios e inmuebles: tableros eléctricos, sistemas de aire acondicionado, destapes, filtraciones, termotanques y cerrajería de seguridad.",
    features: [
      "Revisiones preventivas de sistemas de climatización y recargas de gas refrigerante",
      "Detección y reparación urgente de fugas de agua y humedades",
      "Actualización de tableros eléctricos y certificaciones técnicas",
      "Reparación y sustitución de cerraduras de seguridad y cerraduras inteligentes",
      "Mantenimiento de bombas de agua, grupos de presión y tanques",
      "Informes técnicos periciales para aseguradoras"
    ],
    sectors: ["Consorcios de Propietarios", "Hoteles & Hostels", "Restaurantes", "Casas y Departamentos"],
    responseTime: "Urgencias en menos de 90 minutos",
    guarantee: "12 meses de garantía en piezas y mano de obra"
  },
  {
    id: "reformas-integrales-adecuacion",
    title: "Reformas Integrales y Adecuación de Espacios",
    tagline: "Proyectos llave en mano, reformas de baños, cocinas, locales comerciales y vivienda residencial",
    category: "Reformas",
    featured: true,
    priceType: "Presupuesto",
    priceAmount: 0,
    priceUnit: "Personalizado sin compromiso",
    badge: "Llave en Mano",
    image: "/assets/images/hero_valmay.jpg",
    icon: "Hammer",
    shortDesc: "Transformación integral de viviendas, baños, cocinas y locales comerciales con estricto cumplimiento de plazos.",
    fullDesc: "Llevamos a cabo reformas integrales y parciales con un único gestor de proyecto asignado. Nos ocupamos desde la demolición inicial, albañilería, plomería y electricidad hasta la instalación de carpinterías, revestimientos porcelánicos, pintura de diseño y acabados de primera línea.",
    features: [
      "Reformas completas de departamentos para revalorización inmobiliaria o alquiler",
      "Remodelación integral de cocinas con muebles a medida y mesadas de cuarzo o granito",
      "Renovación de baños con receptáculos antideslizantes y grifería monocomando",
      "Adecuación de locales comerciales para apertura de negocio (habilitaciones y obra)",
      "Aislamiento térmico y acústico con lana de roca y placas de yeso Durlock",
      "Pintura látex lavable, esmaltes y aplicaciones decorativas de microcemento"
    ],
    sectors: ["Propietarios Inversores", "Vivienda Habitual", "Comercios", "Desarrolladores"],
    responseTime: "Visita técnica y presupuesto en 48 horas",
    guarantee: "Contrato formal con penalización por día de retraso"
  },
  {
    id: "mantenimiento-comunidades-urbanizaciones",
    title: "Mantenimiento Integral de Consorcios y Edificios",
    tagline: "Conservación continua de halls, palieres, terrazas, cocheras y espacios comunes",
    category: "Mantenimiento",
    featured: false,
    priceType: "Planes desde",
    priceAmount: 240,
    priceUnit: "USD/mes por consorcio",
    badge: "Consorcios",
    image: "/assets/images/services_valmay.jpeg",
    icon: "ShieldCheck",
    shortDesc: "Planes a medida para administradores de fincas y presidentes de comunidad con informe mensual.",
    fullDesc: "Servicio continuado de conserjería, limpieza de escaleras y cristales, mantenimiento de alumbrado LED, control de amenities comunitarios y cuidado de espacios comunes en toda la Ciudad de Buenos Aires.",
    features: [
      "Limpieza programada de escaleras, descansillos, ascensores y cristales",
      "Mantenimiento de zonas comunes y terrazas",
      "Cuidado de áreas verdes y sistemas de iluminación inteligente",
      "Limpieza y baldeo de cocheras con barredora-fregadora mecánica",
      "Sustitución inmediata de luminarias por LED de bajo consumo",
      "Canal directo con el administrador de consorcio para incidencias"
    ],
    sectors: ["Consorcios de Propietarios", "Edificios Residenciales", "Complejos Urbanos"],
    responseTime: "Atención continuada diaria",
    guarantee: "Supervisión semanal por jefe de equipo"
  },
  {
    id: "apoyo-operativo-empresas",
    title: "Apoyo Operativo y Multiservicio para Empresas",
    tagline: "Outsourcing de servicios auxiliares, logística interna y acondicionamiento rápido de sedes",
    category: "Gestión Integral",
    featured: false,
    priceType: "A medida",
    priceAmount: 0,
    priceUnit: "Según volumen de horas",
    badge: "B2B Corporativo",
    image: "/assets/images/hero_valmay.jpg",
    icon: "Briefcase",
    shortDesc: "El aliado operativo que tu negocio necesita para no desviar recursos de su actividad principal.",
    fullDesc: "Permite a las empresas externalizar mudanzas internas, armado de puestos de trabajo, mantenimiento de instalaciones, recepción de insumos y limpieza técnica continua en Buenos Aires y distritos corporativos.",
    features: [
      "Montaje y reconfiguración de puestos de trabajo y mobiliario de oficina",
      "Pintura y adecuación estética corporativa fuera del horario comercial",
      "Mantenimiento integral de redes sanitarias y eléctricas de oficinas",
      "Gestión de residuos y reciclaje certificado de material informático y enseres",
      "Servicio de conserjería auxiliar y sustituciones temporales",
      "Facturación mensual unificada con desglose por centros de coste"
    ],
    sectors: ["Sedes Corporativas", "Clínicas & Consultorios", "Centros Educativos", "Concesionarios"],
    responseTime: "Flexibilidad horaria 365 días al año",
    guarantee: "Seguro de Responsabilidad Civil de alta cobertura"
  }
];

export const INITIAL_COVERAGE_ZONES = [
  {
    id: "microcentro-retiro",
    name: "Microcentro & Retiro",
    role: "Sede Central (Maipú 204, Piso 3, Of. 4)",
    address: "Maipú 204, Piso 3, Oficina 4, Buenos Aires",
    coverageType: "Atención Inmediata",
    timeMinutes: "15 min",
    icon: "MapPin",
    highlight: "Sede central corporativa, centro de operaciones y base técnica"
  },
  {
    id: "palermo",
    name: "Palermo (Soho & Hollywood)",
    role: "Polo Turístico & Residencial",
    address: "Plaza Serrano, Palermo Chico, Las Cañitas",
    coverageType: "Cobertura Diaria",
    timeMinutes: "20 min",
    icon: "Building",
    highlight: "Departamentos turísticos de diseño, alquiler temporario y oficinas"
  },
  {
    id: "recoleta",
    name: "Recoleta & Barrio Norte",
    role: "Zona de Categoría",
    address: "Av. Alvear, Av. Callao, Plaza Francia",
    coverageType: "Gestión Preferente",
    timeMinutes: "20 min",
    icon: "Crown",
    highlight: "Edificios emblemáticos, residencias de época y departamentos de alta gama"
  },
  {
    id: "puerto-madero",
    name: "Puerto Madero",
    role: "Torres & Diques",
    address: "Diques 1 al 4, Juana Manso, Aimé Painé",
    coverageType: "Gestión Premium",
    timeMinutes: "15 min",
    icon: "Anchor",
    highlight: "Torres residenciales modernas, oficinas corporativas y vistas abiertas"
  },
  {
    id: "belgrano",
    name: "Belgrano & Colegiales",
    role: "Residencial Norte",
    address: "Belgrano R, Av. Cabildo, Barrancas",
    coverageType: "Cobertura Completa",
    timeMinutes: "25 min",
    icon: "Compass",
    highlight: "Consorcios de edificios, casas residenciales y reformas integrales"
  },
  {
    id: "san-telmo",
    name: "San Telmo & Montserrat",
    role: "Casco Histórico",
    address: "Plaza Dorrego, Calle Defensa, Av. de Mayo",
    coverageType: "Atención Continua",
    timeMinutes: "20 min",
    icon: "Sun",
    highlight: "Lofts históricos, turismo cultural y mantenimiento de propiedades clásicas"
  }
];

export const INITIAL_LEADS_DATA = [
  {
    id: "lead-1",
    date: "19/10/2026 10:14",
    name: "Carmen Morales",
    email: "carmen.morales@suitesba.com",
    phone: "+34 688 84 67 97",
    service: "Gestión Integral de Inmuebles y Apartamentos Airbnb",
    zone: "Palermo Soho",
    status: "Pendiente",
    budget: "Plan mensual (2 departamentos)",
    message: "Hola, tengo 2 departamentos temporarios en Palermo y busco empresa seria para check-in, limpieza textil y mantenimiento."
  },
  {
    id: "lead-2",
    date: "18/10/2026 18:32",
    name: "Javier Aranguren",
    email: "aranguren.arquitectura@gmail.com",
    phone: "+34 688 84 67 97",
    service: "Reformas Integrales y Adecuación de Espacios",
    zone: "Recoleta",
    status: "Presupuestado",
    budget: "Reforma integral departamento 110m²",
    message: "Necesito presupuesto para reforma completa de departamento clásico sobre Av. Alvear: cocina integrada y baños."
  },
  {
    id: "lead-3",
    date: "18/10/2026 12:05",
    name: "Consorcio Edificio Torre Madero",
    email: "administracion@torresmadero.com",
    phone: "+34 688 84 67 97",
    service: "Mantenimiento Integral de Comunidades y Fincas",
    zone: "Puerto Madero",
    status: "Contactado",
    budget: "Contrato de mantenimiento preventivo y limpieza",
    message: "Buscamos empresa de servicios integrales para mantenimiento y control de instalaciones en torre de oficinas."
  }
];

export const INITIAL_AIRBNB_PROPERTIES = [
  {
    id: "prop-1",
    title: "Loft Exclusivo Plaza San Martín & Retiro",
    zone: "Retiro / Microcentro (Maipú 204)",
    address: "Maipú 204, Piso 3, Oficina 4, Buenos Aires",
    rooms: 2,
    bathrooms: 2,
    guests: 4,
    nightPrice: 125,
    monthlyYieldEstimate: 2550,
    occupancyRate: 93,
    rating: 4.96,
    reviewsCount: 78,
    status: "Disponible",
    featured: true,
    image: "/assets/images/services_valmay.jpeg",
    description: "Elegante piso de techos altos y diseño moderno a pasos de Plaza San Martín y Galerías Pacífico. Gestión integral Valmay: cerradura digital, servicio de blanquería premium y asistencia 24 horas.",
    amenities: ["Ubicación Central", "Aire Acondicionado", "Wifi 500Mb", "Check-in 24h", "Balcón Francés", "Limpieza Textil"]
  },
  {
    id: "prop-2",
    title: "Palermo Soho Designer Suite & Balcón",
    zone: "Palermo (Soho)",
    address: "Honduras y Armenia, Palermo Soho",
    rooms: 1,
    bathrooms: 1,
    guests: 3,
    nightPrice: 110,
    monthlyYieldEstimate: 2200,
    occupancyRate: 95,
    rating: 4.98,
    reviewsCount: 124,
    status: "Disponible",
    featured: true,
    image: "/assets/images/hero_valmay.jpg",
    description: "Vivienda turística de alto rendimiento en el corazón de Palermo Soho. Récord de ocupación continua, decoración nórdica y cocina abierta.",
    amenities: ["Polo Gastronómico", "Smart TV 55\"", "Balcón Aterrazado", "Superhost", "Cerradura Inteligente"]
  },
  {
    id: "prop-3",
    title: "Apartamento Alvear Palace View",
    zone: "Recoleta & Barrio Norte",
    address: "Avenida Alvear 1750",
    rooms: 2,
    bathrooms: 2,
    guests: 5,
    nightPrice: 155,
    monthlyYieldEstimate: 3100,
    occupancyRate: 91,
    rating: 4.97,
    reviewsCount: 62,
    status: "Disponible",
    featured: true,
    image: "/assets/images/services_valmay.jpeg",
    description: "Semipiso de gran categoría en la zona más señorial de Buenos Aires. Suelos de roble de Eslavonia pulidos y comodidades de hotel 5 estrellas.",
    amenities: ["Zona Exclusiva", "Seguridad 24h", "Baño en Suite", "Check-in Bilingüe", "Balcón", "A/C Frío-Calor"]
  },
  {
    id: "prop-4",
    title: "Puerto Madero Marina Tower & Pool",
    zone: "Puerto Madero (Dique 3)",
    address: "Juana Manso 1100",
    rooms: 1,
    bathrooms: 1,
    guests: 2,
    nightPrice: 140,
    monthlyYieldEstimate: 2750,
    occupancyRate: 92,
    rating: 4.92,
    reviewsCount: 88,
    status: "Disponible",
    featured: false,
    image: "/assets/images/hero_valmay.jpg",
    description: "Vistas panorámicas a los diques de Puerto Madero y puente de la Mujer. Incluye piscina climatizada, gimnasio y cochera cubierta.",
    amenities: ["Piscina Climatizada", "Gimnasio", "Seguridad Privada", "Cochera", "Vistas Panorámicas"]
  },
  {
    id: "prop-5",
    title: "Penthouse Belgrano R con Terraza & Parrilla",
    zone: "Belgrano & Colegiales",
    address: "Zapiola y Echeverría, Belgrano R",
    rooms: 3,
    bathrooms: 2,
    guests: 6,
    nightPrice: 185,
    monthlyYieldEstimate: 3700,
    occupancyRate: 89,
    rating: 4.95,
    reviewsCount: 45,
    status: "Disponible",
    featured: false,
    image: "/assets/images/services_valmay.jpeg",
    description: "Penthouse con terraza privada y parrilla en el barrio más verde de Belgrano R. Cero preocupación para el dueño con liquidación mensual garantizada.",
    amenities: ["Terraza con Parrilla", "Residencial Verde", "Lavandería Valmay", "Cochera 2 autos", "Atención 24/7"]
  },
  {
    id: "prop-6",
    title: "Loft Histórico Plaza Dorrego",
    zone: "San Telmo & Montserrat",
    address: "Calle Defensa 900",
    rooms: 1,
    bathrooms: 1,
    guests: 2,
    nightPrice: 95,
    monthlyYieldEstimate: 1900,
    occupancyRate: 93,
    rating: 4.90,
    reviewsCount: 56,
    status: "Disponible",
    featured: false,
    image: "/assets/images/hero_valmay.jpg",
    description: "Paredes de ladrillo a la vista, techos bovedilla y pisos de pinotea en la histórica calle Defensa. Muy buscado por turistas internacionales.",
    amenities: ["Diseño Histórico", "Wifi Rápido", "A 100m Plaza Dorrego", "Supervisión Valmay"]
  }
];

export const STORAGE_KEYS = {
  HERO: "valmay_hero_config_v4_ba",
  SERVICES: "valmay_services_data_v4_ba",
  ZONES: "valmay_coverage_zones_v4_ba",
  COMPANY: "valmay_company_config_v4_ba",
  LEADS: "valmay_leads_data_v4_ba",
  PROPERTIES: "valmay_airbnb_properties_v4_ba"
};
