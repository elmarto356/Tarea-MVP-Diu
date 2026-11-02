// Ofertas de práctica de ejemplo. Las empresas son ficticias, pero los cargos,
// tecnologías, comunas y montos se basan en publicaciones reales de prácticas
// de informática en Chile (temporada de verano 2027).

export const ofertas = [
  {
    id: 'andes-pay-backend',
    cargo: 'Práctica Profesional Desarrollo Backend',
    empresa: { nombre: 'Andes Pay', rubro: 'Fintech · Medios de pago', tamano: '120 personas', color: '#1f4fd1' },
    contacto: { nombre: 'Valentina Soto', cargo: 'Talent Acquisition' },
    comuna: 'Las Condes',
    region: 'Metropolitana',
    modalidad: 'Híbrido',
    area: 'Backend',
    tipoPractica: 'Profesional',
    tecnologias: ['Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
    duracionMeses: 3,
    jornada: 'Completa · 44 h semanales',
    inicio: 'Enero 2027',
    publicada: '2026-10-29',
    cierre: '2026-11-22',
    vacantes: 2,
    descripcion: 'Te sumarás al equipo de Pagos Recurrentes, que procesa más de 2 millones de cobros al mes para comercios en Chile y Perú. Trabajarás en el servicio que concilia transacciones con los bancos y en nuevas APIs para comercios.',
    responsabilidades: [
      'Desarrollar endpoints REST para el panel de comercios.',
      'Escribir pruebas unitarias y de integración (Jest).',
      'Participar en code reviews y ceremonias Scrum del equipo.',
      'Documentar servicios en el portal interno de desarrolladores.'
    ],
    requisitos: [
      'Estudiante de Ing. Civil Informática desde 8° semestre.',
      'Experiencia con algún lenguaje backend (JavaScript, Python o Java).',
      'Conocimientos de SQL y modelado de datos.',
      'Uso de Git en proyectos de equipo.'
    ],
    deseables: ['TypeScript', 'Docker', 'Haber usado AWS o GCP en algún ramo o proyecto.'],
    sueldoBruto: 650000,
    preguntas: [
      { id: 'p1', autor: 'Estudiante de 9° semestre', pregunta: '¿Cuántos días a la semana hay que ir a la oficina?', respuesta: 'Martes y jueves son presenciales en nuestra oficina de El Golf. El resto de la semana es remoto.', fecha: '2026-10-30', fechaRespuesta: '2026-10-30' },
      { id: 'p2', autor: 'Estudiante de 8° semestre', pregunta: '¿Existe posibilidad de quedar contratado al terminar?', respuesta: 'Sí. En la temporada pasada contratamos a 3 de los 5 practicantes. Se evalúa en la última semana de práctica.', fecha: '2026-10-31', fechaRespuesta: '2026-11-01' }
    ]
  },
  {
    id: 'mercado-austral-frontend',
    cargo: 'Práctica Desarrollo Frontend (React)',
    empresa: { nombre: 'Mercado Austral', rubro: 'Retail · E-commerce', tamano: '+2.000 personas', color: '#e0572a' },
    contacto: { nombre: 'Ignacio Fuentes', cargo: 'Tech Lead Frontend' },
    comuna: 'Providencia',
    region: 'Metropolitana',
    modalidad: 'Híbrido',
    area: 'Frontend',
    tipoPractica: 'Profesional',
    tecnologias: ['React', 'JavaScript', 'CSS', 'Figma', 'Jest'],
    duracionMeses: 2,
    jornada: 'Completa · 44 h semanales',
    inicio: 'Enero 2027',
    publicada: '2026-10-27',
    cierre: '2026-11-15',
    vacantes: 3,
    descripcion: 'Trabajarás en el sitio web de Mercado Austral, que recibe más de 8 millones de visitas mensuales. El equipo de Checkout está rediseñando el flujo de pago y necesita apoyo en la implementación de nuevos componentes.',
    responsabilidades: [
      'Construir componentes React a partir de diseños en Figma.',
      'Mejorar la accesibilidad y el rendimiento del checkout.',
      'Escribir pruebas de componentes con Jest y Testing Library.'
    ],
    requisitos: [
      'Estudiante de Ing. Civil Informática o Ing. Ejecución en Informática.',
      'Conocimientos de HTML, CSS y JavaScript.',
      'Haber hecho al menos un proyecto en React (ramo o personal).'
    ],
    deseables: ['Experiencia con Figma', 'Nociones de accesibilidad web (WCAG).'],
    sueldoBruto: 500000,
    preguntas: [
      { id: 'p1', autor: 'Estudiante de 7° semestre', pregunta: '¿Sirve como práctica 1 o solo como práctica profesional?', respuesta: 'Esta vacante es para práctica profesional. Para práctica 1 publicamos otra oferta en diciembre.', fecha: '2026-10-28', fechaRespuesta: '2026-10-29' },
      { id: 'p2', autor: 'Estudiante de 9° semestre', pregunta: '¿Se usa TypeScript o solo JavaScript?', respuesta: 'El checkout nuevo está en TypeScript. Si sabes JavaScript te adaptas en pocos días; hacemos pair programming la primera semana.', fecha: '2026-10-30', fechaRespuesta: '2026-10-31' }
    ]
  },
  {
    id: 'banco-pacifico-data',
    cargo: 'Práctica Analista de Datos',
    empresa: { nombre: 'Banco del Pacífico', rubro: 'Banca', tamano: '+5.000 personas', color: '#0b7a75' },
    contacto: { nombre: 'Francisca Morales', cargo: 'Jefa de Inteligencia de Negocios' },
    comuna: 'Santiago',
    region: 'Metropolitana',
    modalidad: 'Presencial',
    area: 'Data',
    tipoPractica: 'Profesional',
    tecnologias: ['Python', 'SQL', 'Power BI', 'Excel'],
    duracionMeses: 2,
    jornada: 'Completa · 44 h semanales',
    inicio: 'Enero 2027',
    publicada: '2026-10-25',
    cierre: '2026-11-18',
    vacantes: 4,
    descripcion: 'Apoyarás al área de Inteligencia de Negocios en la construcción de dashboards de riesgo de crédito y en la automatización de reportes que hoy se generan a mano en Excel.',
    responsabilidades: [
      'Automatizar reportes semanales con Python.',
      'Construir y mantener dashboards en Power BI.',
      'Escribir consultas SQL sobre el data warehouse del banco.'
    ],
    requisitos: [
      'Estudiante de Ing. Civil Informática o Industrial desde 7° semestre.',
      'Manejo de SQL (joins, agregaciones).',
      'Conocimientos básicos de Python (pandas).'
    ],
    deseables: ['Power BI o Tableau', 'Ramo de estadística aprobado.'],
    sueldoBruto: 550000,
    preguntas: [
      { id: 'p1', autor: 'Estudiante de 8° semestre', pregunta: '¿Los datos con los que se trabaja son reales o anonimizados?', respuesta: 'Trabajarás con datos anonimizados en un ambiente de desarrollo. Antes de empezar firmas un acuerdo de confidencialidad.', fecha: '2026-10-26', fechaRespuesta: '2026-10-27' },
      { id: 'p2', autor: 'Estudiante de 7° semestre', pregunta: '¿Es necesario saber Power BI o lo enseñan?', respuesta: 'No es obligatorio. La primera semana tienes una capacitación interna de Power BI con el equipo.', fecha: '2026-10-29', fechaRespuesta: '2026-10-29' }
    ]
  },
  {
    id: 'cordillera-labs-ml',
    cargo: 'Práctica Machine Learning',
    empresa: { nombre: 'Cordillera Labs', rubro: 'Startup · Inteligencia artificial', tamano: '25 personas', color: '#7b3fe4' },
    contacto: { nombre: 'Tomás Riquelme', cargo: 'CTO' },
    comuna: 'Ñuñoa',
    region: 'Metropolitana',
    modalidad: 'Remoto',
    area: 'Data',
    tipoPractica: 'Profesional',
    tecnologias: ['Python', 'PyTorch', 'SQL', 'Git', 'Docker'],
    duracionMeses: 3,
    jornada: 'Completa · 40 h semanales',
    inicio: 'Diciembre 2026',
    publicada: '2026-10-30',
    cierre: '2026-11-25',
    vacantes: 1,
    descripcion: 'Desarrollamos modelos de visión por computador para detectar fallas en paneles solares del norte de Chile. Buscamos un practicante para mejorar el pipeline de entrenamiento y evaluación de modelos.',
    responsabilidades: [
      'Preparar y etiquetar datasets de imágenes.',
      'Entrenar y evaluar modelos de clasificación en PyTorch.',
      'Automatizar experimentos y reportar métricas al equipo.'
    ],
    requisitos: [
      'Estudiante de Ing. Civil Informática desde 9° semestre.',
      'Buen manejo de Python.',
      'Haber cursado un ramo de aprendizaje de máquinas o similar.'
    ],
    deseables: ['PyTorch o TensorFlow', 'Docker'],
    sueldoBruto: 470000,
    preguntas: [
      { id: 'p1', autor: 'Estudiante de 10° semestre', pregunta: '¿Se trabaja con GPU propia o en la nube?', respuesta: 'Usamos instancias con GPU en GCP. No necesitas tener hardware propio.', fecha: '2026-10-31', fechaRespuesta: '2026-10-31' },
      { id: 'p2', autor: 'Estudiante de 9° semestre', pregunta: '¿Puedo empezar en enero en vez de diciembre?', respuesta: 'Sí, podemos partir la primera semana de enero. Indícalo en tu postulación.', fecha: '2026-11-01', fechaRespuesta: '2026-11-01' }
    ]
  },
  {
    id: 'ciberdefensa-sur-seguridad',
    cargo: 'Práctica Analista de Ciberseguridad (SOC)',
    empresa: { nombre: 'Ciberdefensa Sur', rubro: 'Ciberseguridad', tamano: '80 personas', color: '#c0263f' },
    contacto: { nombre: 'Rodrigo Pizarro', cargo: 'Líder SOC' },
    comuna: 'Providencia',
    region: 'Metropolitana',
    modalidad: 'Híbrido',
    area: 'Ciberseguridad',
    tipoPractica: 'Profesional',
    tecnologias: ['Linux', 'Python', 'Wireshark', 'Redes'],
    duracionMeses: 2,
    jornada: 'Completa · 44 h semanales',
    inicio: 'Enero 2027',
    publicada: '2026-10-22',
    cierre: '2026-11-12',
    vacantes: 2,
    descripcion: 'Formarás parte del Centro de Operaciones de Seguridad (SOC) que monitorea a clientes del sector salud y retail. Aprenderás a analizar alertas, investigar incidentes y documentar hallazgos.',
    responsabilidades: [
      'Revisar y clasificar alertas del SIEM.',
      'Apoyar en análisis de tráfico de red con Wireshark.',
      'Escribir scripts en Python para automatizar tareas repetitivas.'
    ],
    requisitos: [
      'Estudiante de Ing. Civil Informática desde 8° semestre.',
      'Conocimientos de redes (modelo OSI, TCP/IP).',
      'Manejo básico de terminal Linux.'
    ],
    deseables: ['Haber participado en CTFs', 'Certificación introductoria (por ejemplo, Security+).'],
    sueldoBruto: 550000,
    preguntas: [
      { id: 'p1', autor: 'Estudiante de 9° semestre', pregunta: '¿Hay turnos de noche o fines de semana?', respuesta: 'No. Los practicantes trabajan de lunes a viernes en horario de oficina. Los turnos nocturnos los cubre el equipo de planta.', fecha: '2026-10-23', fechaRespuesta: '2026-10-24' },
      { id: 'p2', autor: 'Estudiante de 8° semestre', pregunta: '¿Necesito alguna certificación para postular?', respuesta: 'No es requisito. Valoramos haber participado en CTFs o tener proyectos propios de seguridad en GitHub.', fecha: '2026-10-25', fechaRespuesta: '2026-10-25' }
    ]
  },
  {
    id: 'conecta-telco-devops',
    cargo: 'Práctica DevOps / Plataforma',
    empresa: { nombre: 'Conecta Telecomunicaciones', rubro: 'Telecomunicaciones', tamano: '+3.000 personas', color: '#0a86c9' },
    contacto: { nombre: 'Daniela Castro', cargo: 'Gerente de Plataforma' },
    comuna: 'Las Condes',
    region: 'Metropolitana',
    modalidad: 'Híbrido',
    area: 'DevOps',
    tipoPractica: 'Profesional',
    tecnologias: ['Docker', 'Kubernetes', 'GitLab CI', 'Linux', 'Terraform'],
    duracionMeses: 3,
    jornada: 'Completa · 44 h semanales',
    inicio: 'Enero 2027',
    publicada: '2026-10-24',
    cierre: '2026-11-20',
    vacantes: 2,
    descripcion: 'El equipo de Plataforma mantiene los clústeres de Kubernetes donde corren más de 300 microservicios. Apoyarás la migración de pipelines de Jenkins a GitLab CI.',
    responsabilidades: [
      'Migrar pipelines de despliegue a GitLab CI.',
      'Escribir módulos de Terraform para nuevos ambientes.',
      'Monitorear servicios con Grafana y Prometheus.'
    ],
    requisitos: [
      'Estudiante de Ing. Civil Informática desde 8° semestre.',
      'Manejo de Linux y línea de comandos.',
      'Conocimientos básicos de Docker.'
    ],
    deseables: ['Kubernetes', 'Terraform'],
    sueldoBruto: 600000,
    preguntas: [
      { id: 'p1', autor: 'Estudiante de 9° semestre', pregunta: '¿Tendría acceso a ambientes de producción?', respuesta: 'Trabajarás en ambientes de desarrollo y staging. Los cambios a producción los aprueba siempre un ingeniero del equipo.', fecha: '2026-10-25', fechaRespuesta: '2026-10-26' },
      { id: 'p2', autor: 'Estudiante de 8° semestre', pregunta: '¿Pagan alguna certificación de Kubernetes?', respuesta: 'Sí, al terminar la práctica financiamos el examen CKAD a quienes completen el plan de estudio interno.', fecha: '2026-10-28', fechaRespuesta: '2026-10-28' }
    ]
  },
  {
    id: 'minera-altamira-ti',
    cargo: 'Práctica Ingeniería TI en Faena',
    empresa: { nombre: 'Minera Altamira', rubro: 'Minería', tamano: '+4.000 personas', color: '#b8741a' },
    contacto: { nombre: 'Claudio Araya', cargo: 'Superintendente TI' },
    comuna: 'Antofagasta',
    region: 'Antofagasta',
    modalidad: 'Presencial',
    area: 'Infraestructura TI',
    tipoPractica: 'Profesional',
    tecnologias: ['Redes', 'Windows Server', 'Python', 'SQL'],
    duracionMeses: 2,
    jornada: 'Turno 7x7',
    inicio: 'Enero 2027',
    publicada: '2026-10-21',
    cierre: '2026-11-10',
    vacantes: 2,
    descripcion: 'Apoyarás al equipo TI de faena en la renovación de la red industrial y en la digitalización de los reportes de mantención de equipos.',
    responsabilidades: [
      'Levantar inventario de equipos de red en faena.',
      'Desarrollar scripts para consolidar reportes de mantención.',
      'Apoyar a usuarios en soporte de segundo nivel.'
    ],
    requisitos: [
      'Estudiante de Ing. Civil Informática desde 8° semestre.',
      'Disponibilidad para trabajar en turno 7x7 en faena.',
      'Conocimientos de redes.'
    ],
    deseables: ['Licencia de conducir clase B'],
    sueldoBruto: 700000,
    preguntas: [
      { id: 'p1', autor: 'Estudiante de 8° semestre', pregunta: '¿Quién paga los pasajes si vivo en Santiago?', respuesta: 'La empresa paga los pasajes aéreos Santiago–Antofagasta de cada turno y el traslado en bus hasta la faena.', fecha: '2026-10-22', fechaRespuesta: '2026-10-22' },
      { id: 'p2', autor: 'Estudiante de 10° semestre', pregunta: '¿Hay que hacer exámenes médicos antes de entrar?', respuesta: 'Sí, se hace un examen preocupacional de altura geográfica. Lo coordinamos y pagamos nosotros una vez que quedas seleccionado.', fecha: '2026-10-24', fechaRespuesta: '2026-10-25' }
    ]
  },
  {
    id: 'salud-integra-fullstack',
    cargo: 'Práctica Desarrollo Full Stack',
    empresa: { nombre: 'Salud Integra', rubro: 'Healthtech', tamano: '45 personas', color: '#12a150' },
    contacto: { nombre: 'Josefina Bravo', cargo: 'Engineering Manager' },
    comuna: 'Concepción',
    region: 'Biobío',
    modalidad: 'Remoto',
    area: 'Full Stack',
    tipoPractica: 'Profesional',
    tecnologias: ['React', 'Python', 'Django', 'PostgreSQL', 'Git'],
    duracionMeses: 3,
    jornada: 'Completa · 40 h semanales',
    inicio: 'Enero 2027',
    publicada: '2026-10-31',
    cierre: '2026-11-28',
    vacantes: 2,
    descripcion: 'Desarrollamos una plataforma de agendamiento y ficha clínica usada por 60 centros médicos. Trabajarás en el módulo de telemedicina, desde la API en Django hasta la interfaz en React.',
    responsabilidades: [
      'Implementar funcionalidades de punta a punta (API y frontend).',
      'Corregir bugs reportados por centros médicos.',
      'Participar en reuniones diarias y planificación de sprint.'
    ],
    requisitos: [
      'Estudiante de Ing. Civil Informática desde 8° semestre.',
      'Conocimientos de React o algún framework frontend.',
      'Conocimientos de Python.'
    ],
    deseables: ['Django', 'Experiencia trabajando de forma remota.'],
    sueldoBruto: 520000,
    preguntas: [
      { id: 'p1', autor: 'Estudiante de 8° semestre', pregunta: '¿Puedo hacer la práctica desde regiones?', respuesta: 'Sí, el equipo es 100% remoto y hay personas en Concepción, Valdivia y Santiago.', fecha: '2026-11-01', fechaRespuesta: '2026-11-01' },
      { id: 'p2', autor: 'Estudiante de 8° semestre', pregunta: '¿Entregan computador?', respuesta: 'Sí, te enviamos un notebook antes del primer día y lo devuelves al terminar la práctica.', fecha: '2026-11-01', fechaRespuesta: '2026-11-02' }
    ]
  },
  {
    id: 'rutas-logistica-qa',
    cargo: 'Práctica QA Automation',
    empresa: { nombre: 'Rutas Logística', rubro: 'Logística · Última milla', tamano: '600 personas', color: '#d97706' },
    contacto: { nombre: 'Matías Vergara', cargo: 'QA Lead' },
    comuna: 'Quilicura',
    region: 'Metropolitana',
    modalidad: 'Híbrido',
    area: 'QA',
    tipoPractica: 'Profesional',
    tecnologias: ['Cypress', 'JavaScript', 'Java', 'Selenium', 'Git'],
    duracionMeses: 2,
    jornada: 'Completa · 44 h semanales',
    inicio: 'Enero 2027',
    publicada: '2026-10-26',
    cierre: '2026-11-16',
    vacantes: 1,
    descripcion: 'Nuestra app de seguimiento de despachos se usa en más de 40 comunas. Apoyarás al equipo de QA a aumentar la cobertura de pruebas automatizadas end-to-end.',
    responsabilidades: [
      'Escribir pruebas end-to-end en Cypress.',
      'Mantener la suite de regresión en Selenium.',
      'Reportar y priorizar bugs junto al equipo de producto.'
    ],
    requisitos: [
      'Estudiante de Ing. Civil Informática o Ing. Ejecución en Informática.',
      'Conocimientos de JavaScript o Java.',
      'Interés en calidad de software.'
    ],
    deseables: ['Cypress', 'Conocimientos de metodologías ágiles.'],
    sueldoBruto: 480000,
    preguntas: [
      { id: 'p1', autor: 'Estudiante de 7° semestre', pregunta: '¿Sirve si nunca he usado Cypress?', respuesta: 'Sí. Basta con que sepas JavaScript; las primeras dos semanas aprendes Cypress con el equipo de QA.', fecha: '2026-10-27', fechaRespuesta: '2026-10-28' },
      { id: 'p2', autor: 'Estudiante de 8° semestre', pregunta: '¿Cuántos días son presenciales en Quilicura?', respuesta: 'Lunes y miércoles son presenciales. Hay bus de acercamiento desde metro Los Libertadores.', fecha: '2026-10-29', fechaRespuesta: '2026-10-29' }
    ]
  },
  {
    id: 'puerto-digital-java',
    cargo: 'Práctica Desarrollo Backend Java',
    empresa: { nombre: 'Puerto Digital Valparaíso', rubro: 'Logística portuaria', tamano: '350 personas', color: '#2a5d9f' },
    contacto: { nombre: 'Paula Henríquez', cargo: 'Jefa de Desarrollo' },
    comuna: 'Valparaíso',
    region: 'Valparaíso',
    modalidad: 'Presencial',
    area: 'Backend',
    tipoPractica: 'Profesional',
    tecnologias: ['Java', 'Spring Boot', 'Oracle', 'Git'],
    duracionMeses: 2,
    jornada: 'Completa · 44 h semanales',
    inicio: 'Enero 2027',
    publicada: '2026-10-23',
    cierre: '2026-11-14',
    vacantes: 2,
    descripcion: 'Apoyarás el desarrollo del sistema que coordina la entrada de camiones al terminal portuario, integrándolo con servicios de Aduanas.',
    responsabilidades: [
      'Desarrollar servicios REST con Spring Boot.',
      'Optimizar consultas sobre la base de datos Oracle.',
      'Escribir pruebas unitarias con JUnit.'
    ],
    requisitos: [
      'Estudiante de Ing. Civil Informática desde 8° semestre.',
      'Programación orientada a objetos en Java.',
      'Conocimientos de SQL.'
    ],
    deseables: ['Spring Boot'],
    sueldoBruto: 500000,
    preguntas: [
      { id: 'p1', autor: 'Estudiante de 9° semestre', pregunta: '¿La oficina está en el puerto o en el centro de Valparaíso?', respuesta: 'Estamos en el edificio de Avenida Errázuriz, frente al terminal. Queda a dos cuadras de la estación Bellavista del Metro Valparaíso.', fecha: '2026-10-24', fechaRespuesta: '2026-10-24' },
      { id: 'p2', autor: 'Estudiante de 8° semestre', pregunta: '¿Hay que saber Oracle o sirve con otro motor SQL?', respuesta: 'Sirve con cualquier motor SQL. Si has usado PostgreSQL o MySQL en los ramos, aprendes lo específico de Oracle rápido.', fecha: '2026-10-27', fechaRespuesta: '2026-10-28' }
    ]
  },
  {
    id: 'valle-central-movil',
    cargo: 'Práctica Desarrollo Móvil (Flutter)',
    empresa: { nombre: 'AgroValle Tech', rubro: 'Agrotech', tamano: '30 personas', color: '#4d7c0f' },
    contacto: { nombre: 'Felipe Contreras', cargo: 'Líder de Producto' },
    comuna: 'Talca',
    region: 'Maule',
    modalidad: 'Híbrido',
    area: 'Móvil',
    tipoPractica: 'Inicial',
    tecnologias: ['Flutter', 'Dart', 'Firebase', 'Git'],
    duracionMeses: 2,
    jornada: 'Completa · 44 h semanales',
    inicio: 'Enero 2027',
    publicada: '2026-10-28',
    cierre: '2026-11-30',
    vacantes: 1,
    descripcion: 'Desarrollamos una app para que pequeños productores registren riego y cosecha sin conexión a internet. Buscamos apoyo para nuevas pantallas y sincronización offline.',
    responsabilidades: [
      'Implementar pantallas en Flutter a partir de mockups.',
      'Apoyar la sincronización offline con Firebase.',
      'Probar la app en terreno con productores.'
    ],
    requisitos: [
      'Estudiante de Ing. Civil Informática desde 5° semestre.',
      'Haber programado en algún lenguaje orientado a objetos.'
    ],
    deseables: ['Flutter o React Native'],
    sueldoBruto: 350000,
    preguntas: [
      { id: 'p1', autor: 'Estudiante de 6° semestre', pregunta: '¿Puedo postular si nunca he usado Flutter?', respuesta: 'Sí. Esta vacante es para práctica inicial, así que te enseñamos Flutter. Lo importante es que hayas programado orientado a objetos.', fecha: '2026-10-29', fechaRespuesta: '2026-10-30' },
      { id: 'p2', autor: 'Estudiante de 7° semestre', pregunta: '¿Cada cuánto se va a terreno?', respuesta: 'Una vez a la semana visitamos productores en Talca o San Clemente para probar la app. El traslado es en vehículo de la empresa.', fecha: '2026-10-31', fechaRespuesta: '2026-11-01' }
    ]
  },
  {
    id: 'hospital-soporte-ti',
    cargo: 'Práctica Soporte y Sistemas Clínicos',
    empresa: { nombre: 'Hospital Clínico del Sur', rubro: 'Salud pública', tamano: '+1.500 personas', color: '#5b6577' },
    contacto: { nombre: 'Marcela Tapia', cargo: 'Jefa Unidad de Informática' },
    comuna: 'San Miguel',
    region: 'Metropolitana',
    modalidad: 'Presencial',
    area: 'Infraestructura TI',
    tipoPractica: 'Inicial',
    tecnologias: ['Windows', 'Redes', 'SQL'],
    duracionMeses: 1,
    jornada: 'Completa · 44 h semanales',
    inicio: 'Enero 2027',
    publicada: '2026-10-20',
    cierre: '2026-11-08',
    vacantes: 3,
    descripcion: 'Apoyarás a la Unidad de Informática en la mantención de equipos clínicos y administrativos, y en la actualización del inventario de sistemas del hospital.',
    responsabilidades: [
      'Atender solicitudes de soporte de primer nivel.',
      'Actualizar el inventario de equipos y licencias.',
      'Apoyar la instalación de estaciones de trabajo.'
    ],
    requisitos: [
      'Estudiante de Ing. Civil Informática o Ing. Ejecución, práctica inicial.',
      'Buena disposición para atención de usuarios.'
    ],
    deseables: [],
    sueldoBruto: 0,
    preguntas: [
      { id: 'p1', autor: 'Estudiante de 5° semestre', pregunta: '¿Por qué la práctica no es remunerada?', respuesta: 'Como servicio público no podemos pagar sueldo a practicantes, pero entregamos almuerzo diario y $40.000 mensuales de movilización.', fecha: '2026-10-21', fechaRespuesta: '2026-10-22' },
      { id: 'p2', autor: 'Estudiante de 6° semestre', pregunta: '¿Sirve para la práctica industrial de la USM?', respuesta: 'Sí, hemos recibido practicantes de la USM los últimos años. Firmamos el convenio y la evaluación que pida la universidad.', fecha: '2026-10-23', fechaRespuesta: '2026-10-23' }
    ]
  }
]

export default ofertas
