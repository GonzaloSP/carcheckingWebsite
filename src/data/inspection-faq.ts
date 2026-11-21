import { PRICING, servicePriceText } from '../config/pricing';

// Homepage FAQ for the pre-purchase inspection service. Rendered by RevisionFaqSection and
// emitted as FAQPage JSON-LD from app/page.tsx — keep both in sync by editing only this list.
// Every answer restates something the site already commits to (pricing.ts, HowItWorksSection,
// the inspección pre compra guide); don't add promises the service can't back up.
export type FaqItem = { q: string; a: string };

export const INSPECTION_FAQ: FaqItem[] = [
  {
    q: '¿Cuánto cuesta la revisión de un auto usado?',
    a: `La revisión precompra a domicilio cuesta ${servicePriceText()}. ${PRICING.services.inspection.includedLine}.`,
  },
  {
    q: '¿Qué incluye la revisión precompra?',
    a: 'Más de 350 puntos: revisión mecánica (motor, caja y embrague, suspensión, dirección y frenos), carrocería, chasis y pintura (repintados, choques reparados, señales de inundación), interior y coherencia con el kilometraje, escaneo computarizado OBD de la ECU y prueba dinámica si el vendedor lo permite. Al final recibís un informe escrito con fotos y recomendaciones.',
  },
  {
    q: '¿Cuánto tarda la revisión?',
    a: 'Una revisión completa lleva entre 60 y 120 minutos, según el vehículo y las condiciones del lugar (luz, espacio, posibilidad de prueba de manejo).',
  },
  {
    q: '¿Dónde se hace la revisión?',
    a: 'A domicilio: el mecánico va con el escáner al lugar donde está el auto, ya sea la casa del vendedor, una concesionaria o una cochera, en Capital Federal y Gran Buenos Aires. No hace falta llevar el auto a un taller.',
  },
  {
    q: '¿Cómo pido un turno y con cuánta anticipación?',
    a: 'Reservás online o por WhatsApp y coordinamos la visita en 24 a 48 horas.',
  },
  {
    q: '¿Vale la pena revisar un auto que parece impecable?',
    a: 'Sí. Las fallas más caras (recalentadas, fallas electrónicas, choques bien disimulados) no se ven en una visita rápida. Y si aparecen hallazgos, el informe te da argumentos para negociar el precio o para no avanzar con la compra.',
  },
  {
    q: '¿Es lo mismo que la VTV?',
    a: 'No. La VTV verifica ítems de seguridad vial reglamentados. La revisión precompra es mucho más exhaustiva: mecánica, electrónica y carrocería, pensada para decidir si conviene comprar ese auto usado.',
  },
  {
    q: '¿Qué no incluye una revisión a domicilio?',
    a: 'No reemplaza un desarme profundo ni abrir el motor. Sí detecta la mayoría de los problemas típicos que convierten a un usado en una mala compra.',
  },
];
