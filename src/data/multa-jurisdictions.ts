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
  { value: 'pba',            label: 'Provincia de Buenos Aires', sub: 'Buenos Aires',          slug: 'multas-provincia-buenos-aires',  manualUrl: null, metaTitle: 'Multas Provincia Buenos Aires por Patente: InfraccionesBA | carChecking', metaDescription: 'Consultá multas en Provincia de Buenos Aires por patente vía InfraccionesBA. Cubre todo el Conurbano y principales municipios bonaerenses. Resultado en segundos.' },
  { value: 'pba',            label: 'La Plata',                  sub: 'Buenos Aires',          slug: 'multas-la-plata',                manualUrl: null, hideFromList: true },
  { value: 'caba',           label: 'CABA',                      sub: 'Ciudad Autónoma',       slug: 'multas-caba',                    manualUrl: null },
  { value: 'cordoba',        label: 'Córdoba Caminera',          sub: 'Córdoba',               slug: 'multas-cordoba',                 manualUrl: null },
  { value: 'santafe',        label: 'Santa Fe',                  sub: 'Juzgado Virtual',       slug: 'multas-santa-fe',                manualUrl: null, metaTitle: 'Multas Santa Fe por Patente: Juzgado Virtual | carChecking', metaDescription: 'Consultá multas en Santa Fe por patente vía el Juzgado Virtual provincial. Infracciones de toda la provincia. Resultado en segundos, sin registro.' },
  { value: 'rosario',        label: 'Rosario',                   sub: 'Municipalidad',         slug: 'multas-rosario',                 manualUrl: 'https://www.rosario.gob.ar/gdm/patente.do?accion=ir', metaTitle: 'Multas en Rosario por Patente: Fotomultas y Juzgados | carChecking', metaDescription: 'Consultá fotomultas, Guardia Urbana y juzgados de tránsito de Rosario por patente en segundos. Verificación en tiempo real del portal municipal. Gratis, sin registro.' },
  { value: 'mendoza',        label: 'Mendoza Ciudad',            sub: 'Juzgados de Tránsito',  slug: 'multas-mendoza',                 manualUrl: null },
  { value: 'mendozacaminera',label: 'Mendoza Caminera',          sub: 'Policía Caminera',      slug: 'multas-mendoza-caminera',        manualUrl: 'https://www.mendoza.gov.ar/policia-caminera/consulta-de-infracciones/' },
  { value: 'salta',          label: 'Salta Capital',             sub: 'DGR Salta',             slug: 'multas-salta',                   manualUrl: null },
  { value: 'neuquen',        label: 'Neuquén Capital',           sub: 'Fotomultas',            slug: 'multas-neuquen',                 manualUrl: null },
  { value: 'santarosa',      label: 'Santa Rosa',                sub: 'La Pampa',              slug: 'multas-santa-rosa',              manualUrl: null },
  { value: 'corrientes',     label: 'Corrientes',                sub: 'SIGEIN',                slug: 'multas-corrientes',              manualUrl: null },
  { value: 'entrerios',      label: 'Entre Ríos',                sub: 'Monitoreo Vial',        slug: 'multas-entre-rios',              manualUrl: null },
  { value: 'misiones',       label: 'Misiones',                  sub: 'Provincia',             slug: 'multas-misiones',                manualUrl: null },
  { value: 'posadas',        label: 'Posadas',                   sub: 'Municipio Misiones',    slug: 'multas-posadas',                 manualUrl: null },
  { value: 'chaco',          label: 'Chaco',                     sub: 'Policía Caminera',      slug: 'multas-chaco',                   manualUrl: null },
  { value: 'avellaneda',     label: 'Avellaneda',                sub: 'SIAC',                  slug: 'multas-avellaneda',              manualUrl: null },
  { value: 'lanus',          label: 'Lanús',                     sub: 'Infratrack',            slug: 'multas-lanus',                   manualUrl: null },
  { value: 'berisso',        label: 'Berisso',                   sub: 'Infratrack',            slug: 'multas-berisso',                 manualUrl: null },
  { value: 'ezeiza',         label: 'Ezeiza',                    sub: 'Infratrack',            slug: 'multas-ezeiza',                  manualUrl: null },
  { value: 'lomasdezamora',  label: 'Lomas de Zamora',           sub: 'Municipalidad',         slug: 'multas-lomas-de-zamora',         manualUrl: null },
  { value: 'tresdefebrero',  label: 'Tres de Febrero',           sub: 'Municipalidad',         slug: 'multas-tres-de-febrero',         manualUrl: null },
  { value: 'hurlingham',     label: 'Hurlingham',                sub: 'GobDigital',            slug: 'multas-hurlingham',              manualUrl: null },
  { value: 'canuelas',       label: 'Cañuelas',                  sub: 'SIGEIN',                slug: 'multas-canuelas',                manualUrl: null },
  { value: 'sanvicente',     label: 'San Vicente',               sub: 'SIGEIN',                slug: 'multas-san-vicente',             manualUrl: null },
  { value: 'roquesaenzpena', label: 'Roque Sáenz Peña',          sub: 'SIGEIN',                slug: 'multas-roque-saenz-pena',        manualUrl: null },
  { value: 'villaangostura', label: 'Villa La Angostura',        sub: 'SIGEIN',                slug: 'multas-villa-la-angostura',      manualUrl: null },
  { value: 'riotercero',     label: 'Río Tercero',               sub: 'SIGEIN',                slug: 'multas-rio-tercero',             manualUrl: null },
];
