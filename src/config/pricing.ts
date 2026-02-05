type PricedItem = {
  name: string;
  amount?: number;
  description: string;
  includedLine: string;
  ctaText: string;
};

type GestoriaPricing = {
  name: string;
  description: string;
  // Two sub-services (as in www.carchecking.com.ar/servicio-gestoria)
  options: {
    informeDominio: PricedItem;
    transferencia: PricedItem;
  };
};

type InspectionPricing = PricedItem;

type PricingConfig = {
  currencySymbol: string;
  locale: string;
  services: {
    inspection: InspectionPricing;
    gestoria: GestoriaPricing;
  };
  // Backwards-compatible aliases (existing pages use these today)
  serviceName: string;
  amount: number;
  includedLine: string;
};

export const PRICING: PricingConfig = {
  currencySymbol: '$',
  locale: 'es-AR',

  services: {
    inspection: {
      name: 'Servicio Premium a Domicilio',
      amount: 84999,
      description:
        'Inspección profesional del vehículo antes de comprar: mecánica, electrónica y carrocería.',
      includedLine:
        'Incluye revisión completa + escaneo computarizado + informe escrito',
      ctaText: 'Solicitar turno',
    },

    gestoria: {
      name: 'Servicio de Gestoría',
      description:
        'Gestión y asesoramiento para chequear documentación y transferir el vehículo de forma segura.',
      options: {
        informeDominio: {
          name: 'Obtención de informe de dominio',
          amount: 24999,
          description:
            'Reciba desde la comodidad de su casa el estado de la documentación del vehículo.',
          includedLine: 'Incluye impuestos. Urgente: 48hs (post acreditación).',
          ctaText: 'Solicitar',
        },
        transferencia: {
          name: 'Servicio de transferencia del automotor',
          amount: 69999,
          description:
            'Nuestro gestor certifica la validez de la documentación y lo acompaña en el trámite.',
          includedLine: 'Ahorre tiempo y dolores de cabeza durante la transferencia.',
          ctaText: 'Solicitar',
        },
      },
    },
  },

  // aliases
  serviceName: 'Servicio Premium a Domicilio',
  amount: 84999,
  includedLine: 'Incluye revisión completa + escaneo computarizado + informe escrito',
};

export function formatPrice(amount: number, locale = PRICING.locale) {
  // es-AR formats 84999 as 84.999
  return new Intl.NumberFormat(locale).format(amount);
}

export function priceText(amount?: number) {
  if (typeof amount !== 'number') return 'Consultar';
  return `${PRICING.currencySymbol}${formatPrice(amount)}`;
}

export function servicePriceText() {
  return priceText(PRICING.services.inspection.amount);
}

export function gestoriaPriceText(
  optionKey: keyof typeof PRICING.services.gestoria.options
) {
  return priceText(PRICING.services.gestoria.options[optionKey].amount);
}
