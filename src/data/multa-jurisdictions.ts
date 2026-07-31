export interface JurisdiccionMulta {
  value: string;
  label: string;
  sub: string;
  slug: string;
  manualUrl: string | null;
  /** If true, this entry exists only for its SEO page — excluded from the main query list. */
  hideFromList?: boolean;
  /** Override the auto-generated <title> tag for this page. */
  metaTitle?: string;
  /** Override the auto-generated meta description for this page. */
  metaDescription?: string;
}

export const JURISDICCIONES_MULTA: JurisdiccionMulta[] = [
  { value: 'ansv',           label: 'ANSV / SINAI',              sub: 'Nacional',             slug: 'multas-ansv-sinai',             manualUrl: null },
  { value: 'pba',            label: 'Provincia de Buenos Aires', sub: 'Buenos Aires',          slug: 'multas-provincia-buenos-aires',  manualUrl: null, metaTitle: 'Consultar Multas Provincia de Buenos Aires por Patente en Tiempo Real | carChecking', metaDescription: '¿Tenés multas en la Provincia de Buenos Aires? Consultá infracciones por patente en segundos — cubrimos los 135 municipios bonaerenses, conurbano e interior. Gratis, sin registro.' },
  { value: 'pba',            label: 'La Plata',                  sub: 'Buenos Aires',          slug: 'multas-la-plata',                manualUrl: null, hideFromList: true },
  { value: 'caba',           label: 'CABA',                      sub: 'Ciudad Autónoma',       slug: 'multas-caba',                    manualUrl: null, metaTitle: 'Consultar Multas CABA por Patente en Tiempo Real | carChecking', metaDescription: 'Consultá multas e infracciones de tránsito en CABA por patente. Accedemos al portal oficial del GCBA en tiempo real. Resultado en 60 segundos. Gratis, sin registro.' },
  { value: 'cordoba',        label: 'Córdoba Caminera',          sub: 'Córdoba',               slug: 'multas-cordoba',                 manualUrl: null },
  { value: 'santafe',        label: 'Santa Fe',                  sub: 'Juzgado Virtual',       slug: 'multas-santa-fe',                manualUrl: null, metaTitle: 'Multas Santa Fe por Patente: Juzgado Virtual | carChecking', metaDescription: 'Consultá multas en Santa Fe por patente vía el Juzgado Virtual provincial. Infracciones de toda la provincia. Resultado en segundos, sin registro.' },
  { value: 'rosario',        label: 'Rosario',                   sub: 'Municipalidad',         slug: 'multas-rosario',                 manualUrl: 'https://www.rosario.gob.ar/gdm/patente.do?accion=ir', metaTitle: 'Multas en Rosario por Patente: Fotomultas, GUM y Juzgados | carChecking', metaDescription: '¿Tu auto tiene multas en Rosario? Consultá fotomultas, Guardia Urbana Municipal y juzgados de tránsito por patente. Acceso directo al portal oficial de la Municipalidad de Rosario.' },
  { value: 'mendoza',        label: 'Mendoza Ciudad',            sub: 'Juzgados de Tránsito',  slug: 'multas-mendoza',                 manualUrl: null, metaTitle: 'Multas Mendoza por Patente: Tránsito y Caminera | carChecking', metaDescription: 'Consultá multas de tránsito de Mendoza por patente o dominio: Juzgados de Tránsito de la ciudad y Policía Caminera provincial. Gratis, online y en segundos.' },
  { value: 'mendozacaminera',label: 'Mendoza Caminera',          sub: 'Policía Caminera',      slug: 'multas-mendoza-caminera',        manualUrl: 'https://www.mendoza.gov.ar/policia-caminera/consulta-de-infracciones/' },
  { value: 'salta',          label: 'Salta Capital',             sub: 'DGR Salta',             slug: 'multas-salta',                   manualUrl: 'https://rentas.dgrmsalta.gov.ar/automotores/emision-boletas/historial-multas-transito' },
  { value: 'neuquen',        label: 'Neuquén Capital',           sub: 'Fotomultas',            slug: 'multas-neuquen',                 manualUrl: null, metaTitle: 'Multas Neuquén por Patente: Fotomultas Municipales | carChecking', metaDescription: 'Consultá fotomultas e infracciones de Neuquén Capital por patente o dominio. Acceso directo al registro municipal, gratis y en segundos.' },
  { value: 'santarosa',      label: 'Santa Rosa',                sub: 'La Pampa',              slug: 'multas-santa-rosa',              manualUrl: null },
  { value: 'corrientes',     label: 'Corrientes',                sub: 'SIGEIN',                slug: 'multas-corrientes',              manualUrl: null },
  { value: 'entrerios',      label: 'Entre Ríos',                sub: 'Monitoreo Vial',        slug: 'multas-entre-rios',              manualUrl: null },
  { value: 'misiones',       label: 'Misiones',                  sub: 'Provincia',             slug: 'multas-misiones',                manualUrl: null, metaTitle: 'Multas Misiones por Patente: Monitoreo Vial | carChecking', metaDescription: 'Consultá multas e infracciones de Misiones por patente o dominio vía el sistema de Monitoreo Vial provincial. Resultado en segundos, gratis y sin registro.' },
  { value: 'posadas',        label: 'Posadas',                   sub: 'Municipio Misiones',    slug: 'multas-posadas',                 manualUrl: null },
  { value: 'chaco',          label: 'Chaco',                     sub: 'Policía Caminera',      slug: 'multas-chaco',                   manualUrl: null },
  { value: 'avellaneda',     label: 'Avellaneda',                sub: 'SIAC',                  slug: 'multas-avellaneda',              manualUrl: null, metaTitle: 'Multas Avellaneda por Patente: Consulta Online Gratis | carChecking', metaDescription: 'Consultá multas e infracciones de Avellaneda por patente o dominio vía el sistema SIAC municipal. Resultado al instante, gratis y sin registro.' },
  { value: 'lanus',          label: 'Lanús',                     sub: 'Infratrack',            slug: 'multas-lanus',                   manualUrl: null, metaTitle: 'Multas Lanús por Patente: Consultá Infracciones Gratis | carChecking', metaDescription: 'Consultá multas e infracciones del municipio de Lanús por patente o dominio. Verificación online del sistema Infratrack, gratis y en segundos.' },
  { value: 'berisso',        label: 'Berisso',                   sub: 'Infratrack',            slug: 'multas-berisso',                 manualUrl: null },
  { value: 'ezeiza',         label: 'Ezeiza',                    sub: 'Infratrack',            slug: 'multas-ezeiza',                  manualUrl: null },
  { value: 'lomasdezamora',  label: 'Lomas de Zamora',           sub: 'Municipalidad',         slug: 'multas-lomas-de-zamora',         manualUrl: null, metaTitle: 'Multas Lomas de Zamora por Patente: Consulta Gratis | carChecking', metaDescription: 'Consultá multas e infracciones del partido de Lomas de Zamora por patente o dominio. Verificación online directa, gratis y en segundos.' },
  { value: 'tresdefebrero',  label: 'Tres de Febrero',           sub: 'Municipalidad',         slug: 'multas-tres-de-febrero',         manualUrl: null },
  { value: 'hurlingham',     label: 'Hurlingham',                sub: 'GobDigital',            slug: 'multas-hurlingham',              manualUrl: null },
  { value: 'canuelas',       label: 'Cañuelas',                  sub: 'SIGEIN',                slug: 'multas-canuelas',                manualUrl: null },
  { value: 'sanvicente',     label: 'San Vicente',               sub: 'SIGEIN',                slug: 'multas-san-vicente',             manualUrl: null },
  { value: 'roquesaenzpena', label: 'Roque Sáenz Peña',          sub: 'SIGEIN',                slug: 'multas-roque-saenz-pena',        manualUrl: null },
  { value: 'villaangostura', label: 'Villa La Angostura',        sub: 'SIGEIN',                slug: 'multas-villa-la-angostura',      manualUrl: null },
  { value: 'riotercero',     label: 'Río Tercero',               sub: 'SIGEIN',                slug: 'multas-rio-tercero',             manualUrl: null },
];
