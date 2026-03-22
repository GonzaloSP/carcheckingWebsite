export interface CABAGuideStep {
  title: string;
  body: string;
}

export interface CABAGuideFAQ {
  q: string;
  a: string;
}

export interface CABAGuide {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  h1: string;
  intro: string;
  steps: CABAGuideStep[];
  extraSections?: { title: string; body: string }[];
  faq: CABAGuideFAQ[];
}

export const MULTAS_CABA_GUIDES: Record<string, CABAGuide> = {
  'como-consultar': {
    slug: 'como-consultar',
    seoTitle: 'Cómo Consultar Multas en CABA por Patente | carChecking',
    seoDescription: 'Guía paso a paso para consultar multas e infracciones de tránsito en CABA. Accedemos al portal oficial del GCBA e informamos el resultado en minutos. Gratis.',
    seoKeywords: 'como consultar multas caba, consultar infracciones caba por patente, verificar multas gcba, multas ciudad buenos aires consulta, buenosaires.gob.ar infracciones',
    h1: 'Cómo consultar multas en CABA por patente',
    intro: 'Verificar si un vehículo tiene multas en la Ciudad Autónoma de Buenos Aires es sencillo usando carChecking. Accedemos directamente al portal oficial del Gobierno de la Ciudad (GCBA) y te mostramos el resultado sin que tengas que completar formularios ni resolver captchas.',
    steps: [
      {
        title: 'Ingresá la patente del vehículo',
        body: 'Escribí la patente en el buscador — formato antiguo (ABC123) o Mercosur (AB123CD). No hace falta escribir guiones ni espacios.',
      },
      {
        title: 'Seleccioná "CABA" como jurisdicción',
        body: 'En el selector de fuentes elegí "CABA". También podés activar múltiples jurisdicciones para verificar ANSV, Provincia de Buenos Aires y CABA en una sola búsqueda.',
      },
      {
        title: 'Esperá mientras consultamos el portal del GCBA',
        body: 'El portal oficial del GCBA utiliza un sistema de verificación automática (captcha). Nuestro sistema lo resuelve por vos. La consulta toma entre 60 y 90 segundos.',
      },
      {
        title: 'Revisá las infracciones registradas',
        body: 'Verás el número de infracciones, el importe total adeudado, la fecha de cada multa y el organismo que la labró (Policía de la Ciudad, controlador de tránsito o fotomulta automática).',
      },
    ],
    extraSections: [
      {
        title: 'Qué información muestra la consulta',
        body: 'El resultado incluye todas las infracciones registradas en el sistema del GCBA: fotomultas de velocidad y semáforo en rojo, multas de estacionamiento, infracciones por uso de celular al conducir y cualquier otra sanción labrada por la Policía de la Ciudad o por inspectores de tránsito del Gobierno porteño. Cada infracción muestra su fecha, importe y estado (pendiente de pago, en juicio o prescripta).',
      },
      {
        title: 'Diferencia entre CABA y Provincia de Buenos Aires',
        body: 'CABA y la Provincia de Buenos Aires tienen registros completamente independientes. Si un vehículo circuló por rutas provinciales o municipios del conurbano, esas infracciones no aparecen en la consulta de CABA. Para una verificación completa, consultá también "Provincia de Buenos Aires" y "ANSV / SINAI".',
      },
    ],
    faq: [
      {
        q: '¿Cuánto tarda la consulta de multas en CABA?',
        a: 'Entre 60 y 90 segundos. El portal del GCBA requiere resolver un captcha automático, lo que añade tiempo respecto de otras jurisdicciones. Mientras esperás, podés ver el indicador de progreso en la pantalla.',
      },
      {
        q: '¿Es gratis consultar multas en CABA?',
        a: 'Sí. La consulta de multas en carChecking es completamente gratuita para la jurisdicción CABA.',
      },
      {
        q: '¿Qué datos necesito para consultar multas en CABA?',
        a: 'Solo la patente del vehículo, tanto en formato antiguo (ABC123) como en formato Mercosur (AB123CD). No necesitás número de DNI ni datos del titular.',
      },
      {
        q: '¿La consulta accede al portal oficial del GCBA?',
        a: 'Sí. Consultamos directamente el sistema de infracciones oficial de buenosaires.gob.ar. Los datos que ves son los mismos que obtendrías consultando manualmente en el portal del Gobierno de la Ciudad.',
      },
    ],
  },

  'como-pagar': {
    slug: 'como-pagar',
    seoTitle: 'Cómo Pagar Multas en CABA: Medios de Pago y Descuentos | carChecking',
    seoDescription: 'Todos los medios para pagar multas de tránsito en CABA: portal online del GCBA, Banco Ciudad, Pago Fácil y Rapipago. Descuento por pronto pago dentro de los 30 días.',
    seoKeywords: 'como pagar multas caba, pagar infracciones caba online, pago multas gcba, banco ciudad multas, pago facil multas caba, descuento multas caba, multas caba portal',
    h1: 'Cómo pagar multas en CABA: medios de pago y descuentos',
    intro: 'Una vez que verificaste que tu vehículo tiene multas en CABA, el siguiente paso es regularizar la deuda. El GCBA ofrece varios canales de pago, tanto online como presenciales, y aplica un descuento por pronto pago si abonás dentro de los primeros 30 días desde la notificación.',
    steps: [
      {
        title: 'Consultá el estado actualizado de la infracción',
        body: 'Antes de pagar, verificá el monto actualizado de cada infracción en el portal del GCBA (buenosaires.gob.ar/licenciasdeconducir/consulta-de-infracciones) o usando el buscador de carChecking. El importe puede incluir intereses si venció el plazo de pronto pago.',
      },
      {
        title: 'Elegí el medio de pago',
        body: 'Tenés cuatro opciones principales: portal online del GCBA con tarjeta de crédito o débito, cualquier sucursal del Banco Ciudad, Pago Fácil y Rapipago con el código de barras de la infracción, o la app oficial BA Ciudad.',
      },
      {
        title: 'Completá el pago y guardá el comprobante',
        body: 'Al finalizar el pago online recibirás un comprobante en pantalla y por email. Guardalo: es la prueba de cancelación en caso de que la infracción tarde en actualizarse en el sistema. Si pagás en ventanilla, pedí el sellado.',
      },
      {
        title: 'Verificá que la infracción quedó cancelada',
        body: 'Luego de 48 a 72 horas hábiles, consultá nuevamente la patente para confirmar que la infracción aparece como "pagada" o ya no figura en el registro. Si persiste, contactá a la Mesa de Ayuda del GCBA con tu comprobante.',
      },
    ],
    extraSections: [
      {
        title: 'Descuento por pronto pago en CABA',
        body: 'Si abonás la infracción dentro de los 30 días desde la fecha de notificación, podés acceder al descuento por pronto pago. El porcentaje varía según el tipo de infracción, pero habitualmente ronda el 20 al 30 %. Pasado el plazo, el importe original se incrementa con intereses moratorios calculados mensualmente según la tasa oficial del GCBA.',
      },
      {
        title: 'Qué pasa si no pagás una multa en CABA',
        body: 'Las infracciones impagas se acumulan en el dominio del vehículo. Superado el plazo de prescripción (2 años) sin que el GCBA realice actos interruptorios, la deuda prescribe. Sin embargo, durante ese período el GCBA puede iniciar gestiones de cobro, reportar la deuda a registros de morosos o trabar la renovación del registro de conducir.',
      },
    ],
    faq: [
      {
        q: '¿Puedo pagar multas de CABA con tarjeta de crédito?',
        a: 'Sí. El portal online del GCBA acepta tarjetas de crédito y débito de las principales redes (Visa, Mastercard, American Express). El pago se acredita en 48 a 72 horas hábiles.',
      },
      {
        q: '¿Dónde consigo el código de barras para pagar en Pago Fácil o Rapipago?',
        a: 'En la consulta online de infracciones en buenosaires.gob.ar. Cada infracción tiene un código de pago que podés imprimir o mostrar desde el celular en el local de cobro.',
      },
      {
        q: '¿Cuántos días tengo para pagar con descuento en CABA?',
        a: '30 días corridos desde la fecha de notificación. Pasado ese plazo se aplican intereses moratorios y se pierde el beneficio del descuento.',
      },
      {
        q: '¿Qué pasa si pago una multa de CABA pero sigue apareciendo en el sistema?',
        a: 'Es normal que tarde entre 48 y 72 horas hábiles en actualizarse. Si después de ese plazo sigue figurando, contactá a la Mesa de Ayuda del GCBA presentando el comprobante de pago.',
      },
    ],
  },

  'plan-de-pagos': {
    slug: 'plan-de-pagos',
    seoTitle: 'Plan de Pagos de Multas CABA: Cuotas y Requisitos | carChecking',
    seoDescription: 'Cómo solicitar un plan de pagos en cuotas para multas de CABA. Requisitos, dónde gestionarlo, montos y tasas de interés. Portal GCBA y Banco Ciudad.',
    seoKeywords: 'plan de pagos multas caba, multas caba en cuotas, refinanciar multas gcba, cuotas infracciones caba, banco ciudad plan de pago multas, multas caba financiamiento',
    h1: 'Plan de pagos de multas en CABA: cómo solicitarlo y requisitos',
    intro: 'Si el importe total de tus multas en CABA es elevado y no podés cancelarlo en un solo pago, el GCBA ofrece planes de financiamiento en cuotas. A continuación explicamos cómo solicitarlo, dónde gestionarlo y qué condiciones aplican.',
    steps: [
      {
        title: 'Verificá el monto total de infracciones',
        body: 'Consultá la patente en carChecking o en el portal del GCBA para conocer el importe actualizado de todas las infracciones. Recordá que los montos ya incluyen los intereses acumulados si venció el plazo de pronto pago.',
      },
      {
        title: 'Accedé al portal o visitá una sucursal del Banco Ciudad',
        body: 'Podés iniciar el plan de pagos online en buenosaires.gob.ar/licenciasdeconducir/consulta-de-infracciones o de forma presencial en cualquier sucursal del Banco Ciudad. En ambos casos necesitás el número de la infracción o el código de pago.',
      },
      {
        title: 'Elegí la cantidad de cuotas',
        body: 'El número de cuotas disponible depende del monto total adeudado. Generalmente se ofrecen planes de 3, 6, 12 y hasta 18 cuotas. Cada cuota incluye la tasa de interés vigente establecida por el GCBA para ese período.',
      },
      {
        title: 'Aceptá el plan y abonás la primera cuota',
        body: 'Una vez aceptado el plan, la infracción queda registrada como "en plan de pagos". Abonás las cuotas en los vencimientos acordados. Si omitís una cuota, el plan puede caducar y el saldo restante pasa a deuda en mora.',
      },
    ],
    extraSections: [
      {
        title: 'Condiciones del plan de pagos CABA',
        body: 'Los planes de pago aplican una tasa de interés oficial que el GCBA actualiza periódicamente. El importe de cada cuota resulta del saldo adeudado dividido por la cantidad de cuotas más los intereses calculados sobre saldo. Es conveniente comparar el costo total del plan vs. pagar al contado para evaluar si conviene financiar o cancelar de una vez.',
      },
      {
        title: 'Plan de pagos vs. prescripción',
        body: 'Adherirse a un plan de pagos interrumpe el plazo de prescripción de la infracción, reiniciándolo desde cero. Si estás cerca del plazo de prescripción (2 años desde la infracción sin actos interruptorios), consultá con un asesor antes de ingresar a un plan, ya que el reconocimiento de la deuda elimina la posibilidad de prescripción.',
      },
    ],
    faq: [
      {
        q: '¿Cuántas cuotas puedo pedir para pagar multas de CABA?',
        a: 'Depende del monto total adeudado. Habitualmente el GCBA ofrece planes de 3, 6, 12 y hasta 18 cuotas. A mayor importe, mayor cantidad de cuotas disponibles.',
      },
      {
        q: '¿El plan de pagos de multas CABA tiene intereses?',
        a: 'Sí. Cada cuota incluye una tasa de interés oficial establecida por el GCBA. El porcentaje se actualiza periódicamente; al momento de solicitar el plan, el sistema te muestra el importe exacto de cada cuota.',
      },
      {
        q: '¿Puedo solicitar el plan de pagos online?',
        a: 'Sí. Podés gestionarlo directamente en buenosaires.gob.ar/licenciasdeconducir/consulta-de-infracciones o en la app BA Ciudad. Si preferís atención personalizada, también podés hacerlo en cualquier sucursal del Banco Ciudad.',
      },
      {
        q: '¿Qué pasa si no pago una cuota del plan?',
        a: 'Si incumplís una cuota, el plan puede caducar y el saldo restante vuelve a estar en mora con intereses. El GCBA puede enviar una intimación de pago o iniciar gestiones de cobro.',
      },
    ],
  },
};

export const CABA_GUIDE_RELATED_LINKS: Record<string, { title: string; url: string; description: string }[]> = {
  'como-consultar': [
    { title: 'Cómo pagar multas en CABA', url: '/multas-caba/como-pagar', description: 'Medios de pago, descuentos y canales oficiales.' },
    { title: 'Plan de pagos de multas CABA', url: '/multas-caba/plan-de-pagos', description: 'Cuotas para infracciones de alto importe.' },
    { title: 'Consultar multas en CABA', url: '/consultar-multa/multas-caba', description: 'Buscá la patente y verificá en tiempo real.' },
  ],
  'como-pagar': [
    { title: 'Cómo consultar multas en CABA', url: '/multas-caba/como-consultar', description: 'Guía paso a paso para verificar infracciones.' },
    { title: 'Plan de pagos de multas CABA', url: '/multas-caba/plan-de-pagos', description: 'Cuotas para infracciones de alto importe.' },
    { title: 'Consultar multas en CABA', url: '/consultar-multa/multas-caba', description: 'Buscá la patente y verificá en tiempo real.' },
  ],
  'plan-de-pagos': [
    { title: 'Cómo consultar multas en CABA', url: '/multas-caba/como-consultar', description: 'Guía paso a paso para verificar infracciones.' },
    { title: 'Cómo pagar multas en CABA', url: '/multas-caba/como-pagar', description: 'Medios de pago, descuentos y canales oficiales.' },
    { title: 'Consultar multas en CABA', url: '/consultar-multa/multas-caba', description: 'Buscá la patente y verificá en tiempo real.' },
  ],
};
