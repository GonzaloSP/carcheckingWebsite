// Datos oficiales de la VTV de la Provincia de Buenos Aires.
// Fuente: listado de plantas, tarifas, plazos y preguntas frecuentes de vtv.gba.gob.ar
// (API pública vtv-web-api.transporte.gba.gob.ar), leídos el 2026-11-14.
// Las tarifas cambian varias veces por año: al actualizarlas, cambiar también VTV_TARIFF_SINCE.
// No agregar plantas ni horarios que no figuren en el listado oficial.

export interface VtvPlant {
  /** Nombre de la planta como la identifica la Provincia. */
  name: string;
  address: string;
  hours: string;
}

export const VTV_BOOKING_URL = 'https://portal.vtv.gba.gob.ar/cpanel/login';
export const VTV_COSTS_URL = 'https://vtv.gba.gob.ar/costos';
export const VTV_PLANTS_URL = 'https://www.vtv.gba.gob.ar/plantas';

export const VTV_TARIFF_SINCE = 'octubre de 2026';
export const VTV_TARIFFS: { label: string; price: string }[] = [
  { label: 'Autos y vehículos de hasta 2.500 kg', price: '$114.105,99' },
  { label: 'Vehículos de más de 2.500 kg', price: '$205.390,78' },
  { label: 'Motos de más de 50 cc y hasta 200 cc', price: '$45.642,40' },
  { label: 'Motos de más de 200 cc y hasta 600 cc', price: '$68.463,59' },
  { label: 'Motos de más de 600 cc', price: '$91.284,79' },
];

/** Mes de vencimiento según el último número de la patente (igual todos los años). */
export const VTV_DUE_MONTHS: { digit: string; month: string }[] = [
  { digit: '1', month: 'Noviembre' },
  { digit: '2', month: 'Febrero' },
  { digit: '3', month: 'Marzo' },
  { digit: '4', month: 'Abril' },
  { digit: '5', month: 'Mayo' },
  { digit: '6', month: 'Junio' },
  { digit: '7', month: 'Julio' },
  { digit: '8', month: 'Agosto' },
  { digit: '9', month: 'Septiembre' },
  { digit: '0', month: 'Octubre' },
];

const STD = 'Lunes a viernes de 7 a 17 h, sábados de 8 a 13 h';

const P = {
  generalRodriguez: { name: 'General Rodríguez', address: 'Brigadier Juan Facundo Quiroga 3480, General Rodríguez', hours: STD },
  moreno: { name: 'Moreno', address: 'Darwin Passaponti 4798, Moreno', hours: 'Lunes a viernes de 7 a 19 h, sábados de 7 a 13 h' },
  ezeiza: { name: 'Ezeiza', address: 'Presidente Néstor Carlos Kirchner 3270, Ezeiza', hours: 'Lunes a viernes de 7 a 17 h, sábados de 7 a 12 h' },
  sanMartin: { name: 'San Martín', address: 'Av. Ricardo Balbín 5094, General San Martín', hours: 'Lunes a viernes de 7:30 a 17:30 h, sábados de 7:30 a 13 h' },
  villaLynch: { name: 'Villa Lynch (San Martín)', address: 'Alsina 1935 y Av. Ricardo Balbín 1930, Villa Lynch, General San Martín', hours: 'Lunes a jueves de 8 a 17 h, viernes de 7:30 a 17 h, sábados de 7:30 a 13 h' },
  lanus: { name: 'Lanús', address: 'Río de Janeiro 3375, Lanús', hours: STD },
  sanJusto: { name: 'San Justo (La Matanza)', address: 'Av. Presidente Perón 3267, San Justo, La Matanza', hours: STD },
  pontevedra: { name: 'Pontevedra (Merlo)', address: 'Av. Otero 2762 y Nicasio Oroño, Pontevedra, Merlo', hours: STD },
  lujan: { name: 'Luján', address: 'Ruta 7 km 78, Luján', hours: 'Lunes a viernes de 7 a 17 h, sábados de 7 a 12 h' },
  malvinas: { name: 'Malvinas Argentinas', address: 'Av. Presidente Arturo Illia 7032, Malvinas Argentinas', hours: STD },
  munro: { name: 'Munro (Vicente López)', address: 'Capitán Bermúdez 4651, Munro, Vicente López', hours: 'Lunes a viernes de 7:30 a 18 h, sábados de 7 a 13 h' },
  ituzaingo: { name: 'Ituzaingó', address: 'Presidente Perón 9372, Ituzaingó', hours: STD },
  moron: { name: 'Morón', address: 'Av. Irigoyen s/n esquina Finlandia, Castelar, Morón', hours: STD },
  longchamps: { name: 'Longchamps (Almirante Brown)', address: 'Av. Hipólito Yrigoyen 16359, Longchamps', hours: STD },
  boulogne: { name: 'Boulogne (San Isidro)', address: 'Camino Real Morón 2056, Boulogne, San Isidro', hours: 'Lunes a jueves de 8 a 17 h, viernes de 7:30 a 17 h, sábados de 7:30 a 13 h' },
  marcosPaz: { name: 'Marcos Paz', address: 'Av. Marcos Paz y San Luis, Marcos Paz', hours: 'Lunes a viernes de 7 a 17 h, sábados de 7 a 12 h' },
  varela: { name: 'Florencio Varela', address: 'Av. Eva Perón 6528, Florencio Varela', hours: STD },
  zeballos: { name: 'Zeballos (Florencio Varela)', address: 'San José 1632, Zeballos, Florencio Varela', hours: STD },
  escobar: { name: 'Escobar', address: 'Arquímedes 1500, Belén de Escobar', hours: 'Lunes a viernes de 7:30 a 17 h, sábados de 7:30 a 13 h' },
  ramosMejia: { name: 'Ramos Mejía (La Matanza)', address: 'Av. Rivadavia 15050, Ramos Mejía', hours: 'Lunes a viernes de 7 a 19 h, sábados de 8 a 13 h' },
  llavallol: { name: 'Llavallol (Lomas de Zamora)', address: 'Ascasubi 1901, Llavallol, Lomas de Zamora', hours: STD },
  burzaco: { name: 'Burzaco (Almirante Brown)', address: 'Av. Hipólito Yrigoyen 13713, Burzaco', hours: STD },
} satisfies Record<string, VtvPlant>;

export interface VtvLocalInfo {
  plants: VtvPlant[];
  /** Aclaración cuando la planta no está en la localidad misma sino en otra del partido. */
  note?: string;
}

/** Plantas por slug de /vtv-en/[slug]. Sólo localidades verificadas contra el listado oficial. */
export const VTV_LOCAL: Record<string, VtvLocalInfo> = {
  'general-rodriguez': { plants: [P.generalRodriguez] },
  moreno: { plants: [P.moreno] },
  ezeiza: { plants: [P.ezeiza] },
  'san-martin': { plants: [P.sanMartin, P.villaLynch], note: 'El partido de General San Martín tiene dos plantas.' },
  'villa-lynch': { plants: [P.villaLynch, P.sanMartin], note: 'El partido de General San Martín tiene dos plantas.' },
  lanus: { plants: [P.lanus] },
  'lanus-oeste': { plants: [P.lanus], note: 'Es la única planta del partido de Lanús.' },
  'san-justo': { plants: [P.sanJusto], note: 'En La Matanza también hay planta en Ramos Mejía (Av. Rivadavia 15050).' },
  pontevedra: { plants: [P.pontevedra], note: 'Es la planta del partido de Merlo.' },
  lujan: { plants: [P.lujan] },
  'malvinas-argentinas': { plants: [P.malvinas] },
  'vicente-lopez': { plants: [P.munro], note: 'La planta del partido de Vicente López está en Munro.' },
  munro: { plants: [P.munro] },
  ituzaingo: { plants: [P.ituzaingo] },
  moron: { plants: [P.moron], note: 'La planta del partido de Morón está en Castelar.' },
  castelar: { plants: [P.moron] },
  longchamps: { plants: [P.longchamps], note: 'Almirante Brown tiene otra planta en Burzaco (Av. Hipólito Yrigoyen 13713).' },
  'san-isidro': { plants: [P.boulogne], note: 'La planta del partido de San Isidro está en Boulogne.' },
  boulogne: { plants: [P.boulogne] },
  'marcos-paz': { plants: [P.marcosPaz] },
  'florencio-varela': { plants: [P.varela, P.zeballos], note: 'El partido de Florencio Varela tiene dos plantas.' },
  zeballos: { plants: [P.zeballos, P.varela], note: 'El partido de Florencio Varela tiene dos plantas.' },
  escobar: { plants: [P.escobar] },
  'ramos-mejia': { plants: [P.ramosMejia], note: 'En La Matanza también hay planta en San Justo (Av. Presidente Perón 3267).' },
  'lomas-de-zamora': { plants: [P.llavallol], note: 'La planta del partido de Lomas de Zamora está en Llavallol.' },
  llavallol: { plants: [P.llavallol] },
  burzaco: { plants: [P.burzaco], note: 'Almirante Brown tiene otra planta en Longchamps (Av. Hipólito Yrigoyen 16359).' },
};

export function vtvMeta(place: string, slug: string): { title: string; description: string } {
  const local = VTV_LOCAL[slug];
  if (local) {
    return {
      title: `VTV en ${place}: dirección, horarios, turno y precio 2026 | carChecking`,
      description: `Planta VTV de ${place}: ${local.plants[0].address}. Horarios, cómo sacar turno, precio vigente y en qué mes vence según tu patente.`,
    };
  }
  return {
    title: `VTV en ${place} – Turno, requisitos y costos 2026 | carChecking`,
    description: `Guía 2026 para hacer la VTV en ${place}: cómo sacar turno, precio oficial vigente, mes de vencimiento según la patente, requisitos y qué te revisan.`,
  };
}
