export interface JurisdiccionMulta {
  value: string;
  label: string;
  sub: string;
  slug: string;
  manualUrl: string | null;
}

export const JURISDICCIONES_MULTA: JurisdiccionMulta[] = [
  { value: 'ansv',           label: 'ANSV / SINAI',              sub: 'Nacional',             slug: 'multas-ansv-sinai',             manualUrl: null },
  { value: 'pba',            label: 'Provincia de Buenos Aires', sub: 'Buenos Aires',          slug: 'multas-provincia-buenos-aires',  manualUrl: null },
  { value: 'pba',            label: 'La Plata',                  sub: 'Buenos Aires',          slug: 'multas-la-plata',                manualUrl: null },
  { value: 'caba',           label: 'CABA',                      sub: 'Ciudad Autónoma',       slug: 'multas-caba',                    manualUrl: null },
  { value: 'cordoba',        label: 'Córdoba Caminera',          sub: 'Córdoba',               slug: 'multas-cordoba',                 manualUrl: null },
  { value: 'santafe',        label: 'Santa Fe',                  sub: 'Juzgado Virtual',       slug: 'multas-santa-fe',                manualUrl: null },
  { value: 'rosario',        label: 'Rosario',                   sub: 'Municipalidad',         slug: 'multas-rosario',                 manualUrl: 'https://www.rosario.gob.ar/gdm/patente.do?accion=ir' },
  { value: 'mendoza',        label: 'Mendoza Ciudad',            sub: 'Juzgados de Tránsito',  slug: 'multas-mendoza',                 manualUrl: null },
  { value: 'mendozacaminera',label: 'Mendoza Caminera',          sub: 'Policía Caminera',      slug: 'multas-mendoza-caminera',        manualUrl: null },
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
  { value: 'venadotuerto',   label: 'Venado Tuerto',             sub: 'Boldt',                 slug: 'multas-venado-tuerto',           manualUrl: 'https://venadotuerto-infracciones.boldt.com.ar/secretariavirtual/' },
  { value: 'almirantebrown', label: 'Almirante Brown',           sub: 'Boldt',                 slug: 'multas-almirante-brown',         manualUrl: 'https://almirantebrown-infracciones.boldt.com.ar/secretariavirtual/' },
  { value: 'escobar',        label: 'Escobar',                   sub: 'Boldt',                 slug: 'multas-escobar',                 manualUrl: 'https://escobar.gob.ar/tramites/' },
];
