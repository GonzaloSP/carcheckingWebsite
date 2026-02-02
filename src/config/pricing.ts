export const PRICING = {
  serviceName: 'Servicio Premium a Domicilio',
  currencySymbol: '$',
  amount: 84999,
  locale: 'es-AR',
  includedLine: 'Incluye revisión completa + escaneo computarizado + informe escrito',
} as const;

export function formatPrice(amount: number, locale = PRICING.locale) {
  // es-AR formats 84999 as 84.999
  return new Intl.NumberFormat(locale).format(amount);
}

export function servicePriceText() {
  return `${PRICING.currencySymbol}${formatPrice(PRICING.amount)}`;
}
