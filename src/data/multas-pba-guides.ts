export interface PBAGuideStep {
  title: string;
  body: string;
}

export interface PBAGuideFAQ {
  q: string;
  a: string;
}

export interface PBAGuide {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  h1: string;
  intro: string;
  steps: PBAGuideStep[];
  extraSections?: { title: string; body: string }[];
  faq: PBAGuideFAQ[];
}

export const MULTAS_PBA_GUIDES: Record<string, PBAGuide> = {
  'como-consultar': {
    slug: 'como-consultar',
    seoTitle: 'Cómo Consultar Multas en Provincia de Buenos Aires | carChecking',
    seoDescription: 'Guía paso a paso para consultar multas e infracciones en la Provincia de Buenos Aires por patente vía InfraccionesBA. Qué portal usa, cuánto tarda y qué muestra.',
    seoKeywords: 'como consultar multas provincia buenos aires, consultar infracciones buenos aires por patente, infraccionesba consulta, multas pba por patente, verificar multas bonaerenses',
    h1: 'Cómo consultar multas en la Provincia de Buenos Aires por patente',
    intro: 'Verificar si un vehículo tiene infracciones en la Provincia de Buenos Aires es rápido con carChecking. Consultamos el portal provincial InfraccionesBA, que centraliza las multas de los 135 municipios bonaerenses, y te mostramos el resultado por patente sin formularios ni registros.',
    steps: [
      {
        title: 'Ingresá la patente del vehículo',
        body: 'Escribí la patente en formato antiguo (ABC123) o Mercosur (AB123CD). No hace falta escribir guiones ni espacios, ni datos del titular.',
      },
      {
        title: 'Seleccioná "Provincia de Buenos Aires" como jurisdicción',
        body: 'Elegí "Provincia de Buenos Aires" en el selector de fuentes. Podés activar varias jurisdicciones a la vez para verificar también ANSV / SINAI y CABA en una sola búsqueda.',
      },
      {
        title: 'Esperá la verificación del portal InfraccionesBA',
        body: 'Consultamos en tiempo real el sistema provincial infraccionesba.gba.gob.ar. La consulta suele resolverse en segundos.',
      },
      {
        title: 'Revisá las infracciones registradas',
        body: 'Verás las infracciones labradas en la provincia con su fecha, importe y el organismo o municipio que las registró. Recordá que la deuda de patentes (ARBA) es un registro aparte que conviene verificar por separado.',
      },
    ],
    extraSections: [
      {
        title: 'Qué cubre el portal InfraccionesBA',
        body: 'InfraccionesBA (infraccionesba.gba.gob.ar) centraliza las infracciones de tránsito de toda la Provincia de Buenos Aires: multas labradas por la Policía Bonaerense, organismos de tránsito municipales y juzgados de paz de los 135 municipios. Incluye fotomultas en autopistas y rutas provinciales del conurbano y del interior.',
      },
      {
        title: 'Diferencia entre Provincia de Buenos Aires y CABA',
        body: 'La Provincia de Buenos Aires y la Ciudad Autónoma de Buenos Aires (CABA) tienen registros completamente independientes. Una multa labrada en CABA no aparece en InfraccionesBA, y viceversa. Si el vehículo circuló por ambas jurisdicciones, consultá las dos por separado para tener el panorama completo.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas de la Provincia de Buenos Aires por patente?',
        a: 'Ingresá la patente en el buscador y seleccioná "Provincia de Buenos Aires". Accedemos en tiempo real al portal InfraccionesBA y te mostramos las infracciones registradas, gratis y sin necesidad de crear una cuenta.',
      },
      {
        q: '¿Qué datos necesito para consultar?',
        a: 'Solo la patente del vehículo, en formato antiguo (ABC123) o Mercosur (AB123CD). No necesitás DNI ni datos del titular.',
      },
      {
        q: '¿La consulta es gratis?',
        a: 'Sí. La consulta de multas de la Provincia de Buenos Aires en carChecking es gratuita.',
      },
      {
        q: '¿Aparecen las multas de CABA en este registro?',
        a: 'No. CABA y la Provincia de Buenos Aires son registros independientes. Las infracciones del GCBA se consultan en buenosaires.gob.ar, no en InfraccionesBA.',
      },
      {
        q: '¿Cuánto tardan en aparecer las multas en el sistema provincial?',
        a: 'Generalmente entre 48 y 72 horas hábiles desde que se labró la infracción, aunque puede demorar más en municipios del interior provincial.',
      },
    ],
  },

  'como-pagar': {
    slug: 'como-pagar',
    seoTitle: 'Cómo Pagar Multas en Provincia de Buenos Aires | carChecking',
    seoDescription: 'Medios para pagar multas de tránsito en la Provincia de Buenos Aires: portal InfraccionesBA, juzgados municipales, Pago Fácil y Rapipago. Descuento por pronto pago.',
    seoKeywords: 'como pagar multas provincia buenos aires, pagar infracciones buenos aires online, pago multas infraccionesba, descuento multas pba, pago facil multas buenos aires',
    h1: 'Cómo pagar multas en la Provincia de Buenos Aires',
    intro: 'Una vez que verificaste que el vehículo tiene infracciones en la Provincia de Buenos Aires, el siguiente paso es regularizar la deuda. Según el municipio, hay canales online y presenciales, y muchos partidos ofrecen descuento por pronto pago y planes en cuotas.',
    steps: [
      {
        title: 'Verificá el monto actualizado de cada infracción',
        body: 'Antes de pagar, consultá el importe actualizado en InfraccionesBA o con el buscador de carChecking. El monto puede incluir intereses si venció el plazo de pronto pago.',
      },
      {
        title: 'Identificá el municipio o juzgado que labró la multa',
        body: 'En la Provincia de Buenos Aires el cobro puede gestionarlo el municipio o el juzgado de faltas correspondiente. El detalle de cada infracción indica el organismo, lo que determina dónde y cómo abonar.',
      },
      {
        title: 'Elegí el medio de pago',
        body: 'Las opciones habituales son: pago online a través del portal InfraccionesBA o del sitio del municipio, bocas de cobro como Pago Fácil y Rapipago con el código de la infracción, o la tesorería municipal de forma presencial.',
      },
      {
        title: 'Guardá el comprobante y verificá la cancelación',
        body: 'Conservá el comprobante de pago. Luego de 48 a 72 horas hábiles, volvé a consultar la patente para confirmar que la infracción figura como pagada o ya no aparece en el registro.',
      },
    ],
    extraSections: [
      {
        title: 'Descuento por pronto pago',
        body: 'Muchos municipios bonaerenses aplican un descuento si abonás la infracción dentro del plazo de notificación. El porcentaje y el plazo varían según el partido. Pasado ese período, el importe original se incrementa con intereses, por lo que conviene no dejar acumular las multas.',
      },
      {
        title: 'Qué pasa si no pagás una multa en PBA',
        body: 'Las infracciones impagas se acumulan en el dominio del vehículo y pueden pasar a instancia del juzgado de faltas. Junto con una eventual deuda de patentes de ARBA, las multas pendientes pueden generar trabas al momento de transferir el vehículo en algunos municipios.',
      },
    ],
    faq: [
      {
        q: '¿Puedo pagar multas de la Provincia de Buenos Aires online?',
        a: 'Sí. Muchas infracciones se pueden abonar a través del portal InfraccionesBA o del sitio web del municipio que las labró, con tarjeta o medios electrónicos. Otras requieren gestión en el juzgado de faltas del partido.',
      },
      {
        q: '¿Hay descuento por pagar rápido?',
        a: 'En varios municipios sí: si pagás dentro del plazo de notificación accedés a un descuento por pronto pago. El porcentaje y el plazo dependen de cada partido.',
      },
      {
        q: '¿Puedo pagar en Pago Fácil o Rapipago?',
        a: 'En general sí, usando el código de pago de la infracción que figura en la consulta online. Verificá en el detalle de la multa si el municipio habilita ese canal.',
      },
      {
        q: '¿Por qué sigue apareciendo la multa después de pagarla?',
        a: 'Es normal que tarde entre 48 y 72 horas hábiles en actualizarse. Si después de ese plazo sigue figurando, contactá al municipio o juzgado correspondiente presentando el comprobante de pago.',
      },
    ],
  },

  'deuda-patentes-arba': {
    slug: 'deuda-patentes-arba',
    seoTitle: 'Deuda de Patentes ARBA por Dominio: Cómo Consultarla | carChecking',
    seoDescription: 'Cómo consultar la deuda de patente automotor de ARBA en la Provincia de Buenos Aires por dominio. Diferencia con las multas, cómo pagar y por qué importa al transferir.',
    seoKeywords: 'deuda patentes arba, consultar patente arba por dominio, impuesto automotor buenos aires, deuda patente provincia buenos aires, arba automotor, patentes bonaerenses',
    h1: 'Deuda de patentes (ARBA) en la Provincia de Buenos Aires',
    intro: 'En la Provincia de Buenos Aires, el impuesto a la patente automotor lo administra ARBA (Agencia de Recaudación bonaerense) y es independiente de las multas de tránsito. Verificar la deuda de patente por dominio es clave antes de comprar o transferir un vehículo bonaerense.',
    steps: [
      {
        title: 'Identificá el dominio del vehículo',
        body: 'Necesitás la patente del auto. El impuesto automotor en PBA se asocia al dominio, no al titular, por lo que la deuda viaja con el vehículo aunque cambie de dueño.',
      },
      {
        title: 'Consultá la deuda en ARBA',
        body: 'La deuda de patente automotor se consulta por dominio en el sitio oficial de ARBA (arba.gov.ar), en la sección de Automotores. Allí figura el saldo del impuesto, las cuotas vencidas y los planes vigentes.',
      },
      {
        title: 'Diferenciá la deuda de patente de las multas',
        body: 'La patente (impuesto) y las multas de tránsito (InfraccionesBA) son dos registros distintos. Un vehículo puede no tener multas pero sí deuda de patente, o al revés. Conviene revisar ambos antes de una operación de compraventa.',
      },
      {
        title: 'Regularizá antes de transferir',
        body: 'Una deuda de patente impaga puede frenar la transferencia del dominio o derivar en intimaciones y embargos. Si vas a comprar, exigí los libres de deuda; si vas a vender, regularizá o acordá la situación por escrito.',
      },
    ],
    extraSections: [
      {
        title: 'Por qué la deuda de patente viaja con el auto',
        body: 'El impuesto a la patente automotor recae sobre el vehículo (el dominio), de modo que la deuda acumulada no se "borra" al venderlo: el nuevo titular puede encontrarse con saldos impagos de períodos anteriores. Por eso, al comprar un usado bonaerense, verificar la patente de ARBA es tan importante como revisar las multas y la situación registral del dominio.',
      },
      {
        title: 'Planes de pago de ARBA',
        body: 'ARBA suele ofrecer planes de regularización y financiación para la deuda de patente automotor, con distintas cantidades de cuotas según el saldo. Las condiciones cambian periódicamente; el detalle vigente se consulta en el portal de ARBA al momento de adherir.',
      },
    ],
    faq: [
      {
        q: '¿La deuda de patente de ARBA aparece al consultar multas?',
        a: 'No. Las multas de tránsito (InfraccionesBA) y el impuesto a la patente (ARBA) son registros separados. La deuda de patente se consulta por dominio en arba.gov.ar.',
      },
      {
        q: '¿La deuda de patente se transfiere al comprar un auto usado?',
        a: 'Sí. El impuesto automotor recae sobre el dominio, así que la deuda acumulada acompaña al vehículo. Antes de comprar, verificá que no haya saldos impagos de ARBA.',
      },
      {
        q: '¿Puede frenar la transferencia una deuda de patente?',
        a: 'Sí. Una deuda de patente impaga puede generar trabas en la transferencia del dominio y, en casos de mora prolongada, intimaciones o embargos. Conviene regularizarla antes del trámite.',
      },
      {
        q: '¿Dónde consulto y pago la patente de ARBA?',
        a: 'En el sitio oficial de ARBA (arba.gov.ar), sección Automotores, ingresando el dominio. Desde allí podés ver el saldo, generar boletas y adherir a planes de pago.',
      },
    ],
  },
};

export const PBA_GUIDE_RELATED_LINKS: Record<string, { title: string; url: string; description: string }[]> = {
  'como-consultar': [
    { title: 'Cómo pagar multas en PBA', url: '/multas-pba/como-pagar', description: 'Canales de pago, descuentos y juzgados municipales.' },
    { title: 'Deuda de patentes ARBA', url: '/multas-pba/deuda-patentes-arba', description: 'Consultá el impuesto automotor por dominio.' },
    { title: 'Consultar multas en PBA', url: '/consultar-multa/multas-provincia-buenos-aires', description: 'Buscá la patente y verificá en tiempo real.' },
  ],
  'como-pagar': [
    { title: 'Cómo consultar multas en PBA', url: '/multas-pba/como-consultar', description: 'Guía paso a paso para verificar infracciones.' },
    { title: 'Deuda de patentes ARBA', url: '/multas-pba/deuda-patentes-arba', description: 'Consultá el impuesto automotor por dominio.' },
    { title: 'Consultar multas en PBA', url: '/consultar-multa/multas-provincia-buenos-aires', description: 'Buscá la patente y verificá en tiempo real.' },
  ],
  'deuda-patentes-arba': [
    { title: 'Cómo consultar multas en PBA', url: '/multas-pba/como-consultar', description: 'Guía paso a paso para verificar infracciones.' },
    { title: 'Cómo pagar multas en PBA', url: '/multas-pba/como-pagar', description: 'Canales de pago, descuentos y juzgados municipales.' },
    { title: 'Consultar multas en PBA', url: '/consultar-multa/multas-provincia-buenos-aires', description: 'Buscá la patente y verificá en tiempo real.' },
  ],
};
