export interface MultaContent {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  intro: string;
  sections: { title: string; body: string }[];
  faq: { q: string; a: string }[];
}

/** Keyed by jurisdiction slug (unique). */
export const MULTA_CONTENT: Record<string, MultaContent> = {

  'multas-rosario': {
    seoTitle: 'Multas en Rosario: Consultar Infracciones por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de tránsito en Rosario por patente. Accedemos al portal oficial de la Municipalidad de Rosario — fotomultas, Guardia Urbana y más. Gratis.',
    seoKeywords: 'multas rosario, consultar multas rosario, infracciones rosario, multas patente rosario, fotomultas rosario, guardia urbana rosario, municipalidad rosario multas',
    intro: 'Verificamos en tiempo real el portal de la Municipalidad de Rosario: fotomultas, Guardia Urbana Municipal y juzgados de tránsito.',
    sections: [
      {
        title: 'Quién labra las multas en Rosario',
        body: 'La Municipalidad de Rosario centraliza las infracciones a través de la Dirección de Tránsito y la Guardia Urbana Municipal (GUM). Las fotomultas son capturadas por cámaras de velocidad y semáforos instalados en los principales corredores viales: Bulevar Oroño, Avenida Pellegrini, Av. Francia y los accesos a la ciudad. Las infracciones quedan registradas a nombre del titular del vehículo.',
      },
      {
        title: 'Fotomultas en Rosario: cómo funcionan',
        body: 'El sistema de fotomultas de Rosario registra infracciones de velocidad y cruce en rojo de forma automática. La notificación llega al titular del vehículo por carta certificada y también puede consultarse online ingresando la patente en el portal oficial. Las multas se valúan en UMA (Unidades de Multa Argentina), cuyo valor se actualiza periódicamente.',
      },
      {
        title: 'Cómo pagar una multa en Rosario',
        body: 'Podés abonar online en el portal de la Municipalidad de Rosario (rosario.gob.ar/gdm), o presencialmente en sucursales del Banco Credicoop, Nuevo Banco de Santa Fe, Rapipago y Pago Fácil. El pago con descuento (generalmente 20–30 %) aplica dentro de los primeros 30 días desde la notificación.',
      },
    ],
    faq: [
      {
        q: '¿Cuánto tiempo tengo para pagar una multa en Rosario sin recargo?',
        a: 'Rosario ofrece un descuento de hasta el 30 % si abonás dentro de los 30 días desde la notificación. Pasado ese plazo se aplican recargos por mora e intereses.',
      },
      {
        q: '¿Las fotomultas de Rosario quedan a nombre del titular del vehículo?',
        a: 'Sí. Las infracciones se registran en el dominio del vehículo, independientemente de quién conducía. Por eso es importante verificar multas antes de comprar un auto usado.',
      },
      {
        q: '¿Rosario tiene un sistema propio de infracciones o usa el provincial?',
        a: 'Rosario tiene un sistema municipal independiente del Juzgado Virtual de Santa Fe. Las infracciones labradas en la ciudad van al registro municipal; las de rutas provinciales van al sistema provincial.',
      },
      {
        q: '¿Puedo impugnar una fotomulta de Rosario?',
        a: 'Sí. Podés presentar un recurso en el Juzgado de Tránsito de Rosario o iniciar el trámite online en el portal municipal dentro del plazo establecido en la notificación.',
      },
    ],
  },

  'multas-cordoba': {
    seoTitle: 'Multas en Córdoba: Consultar Infracciones de Tránsito por Patente | carChecking',
    seoDescription: 'Consultá infracciones de la Policía Caminera de Córdoba por patente. Verificamos si tu vehículo registra multas en rutas y autopistas provinciales. Gratis e instantáneo.',
    seoKeywords: 'multas córdoba, consultar multas córdoba, infracciones córdoba, policía caminera córdoba, multas patente córdoba, rentas córdoba infracciones, multas rutas córdoba',
    intro: 'Consultamos la API pública de Rentas Córdoba para verificar infracciones de la Policía Caminera provincial en rutas y caminos de la provincia.',
    sections: [
      {
        title: 'Policía Caminera de Córdoba',
        body: 'La Policía Caminera es el organismo que controla el tránsito en las rutas y autopistas de la Provincia de Córdoba. Sus infracciones quedan registradas en el sistema de Rentas Córdoba y son accesibles online por número de patente. Los tramos más controlados incluyen la Ruta Nacional 9, la Ruta Provincial 36, la Autopista Córdoba-Carlos Paz y la Autopista 19.',
      },
      {
        title: 'Ciudad de Córdoba vs. Policía Caminera',
        body: 'La ciudad de Córdoba capital tiene su propio sistema municipal de infracciones urbanas, separado del sistema provincial que consultamos. Las multas de tránsito dentro del ejido urbano cordobés deben verificarse directamente en la Municipalidad de Córdoba. Este portal cubre exclusivamente las infracciones labradas por la Caminera en rutas provinciales.',
      },
      {
        title: 'Cómo pagar multas de la Policía Caminera de Córdoba',
        body: 'Las infracciones pueden pagarse a través del portal web de Rentas Córdoba (rentascordoba.gob.ar), en delegaciones de la Caminera o en los bancos habilitados. Si el vehículo es retenido por infracciones pendientes, la liberación requiere el pago previo ante el organismo.',
      },
    ],
    faq: [
      {
        q: '¿Este sistema cubre infracciones de la ciudad de Córdoba capital?',
        a: 'No. Este sistema cubre exclusivamente infracciones de la Policía Caminera en rutas provinciales. Las multas municipales de la ciudad de Córdoba tienen un registro separado en la Municipalidad.',
      },
      {
        q: '¿Cuánto cuesta una multa de la Policía Caminera de Córdoba?',
        a: 'Las multas se calculan en Unidades Fijas (UF) según el tipo de infracción. El exceso de velocidad puede ir de 2 UF a más de 20 UF dependiendo de la gravedad; el valor de la UF se actualiza periódicamente por resolución.',
      },
      {
        q: '¿Puedo hacer la transferencia del vehículo si tengo multas de la Caminera?',
        a: 'Las multas impagas pueden generar trabas en los trámites de transferencia del dominio. Es recomendable verificar y regularizar cualquier infracción antes de realizar la compraventa de un vehículo.',
      },
      {
        q: '¿Las infracciones de la Caminera de Córdoba prescriben?',
        a: 'En Córdoba las infracciones prescriben a los 2 años, pero durante ese plazo generan intereses y recargos que pueden aumentar significativamente el importe original.',
      },
    ],
  },

  'multas-mendoza': {
    seoTitle: 'Multas en Mendoza: Consultar Infracciones por Patente | carChecking',
    seoDescription: 'Verificá multas en Mendoza por patente: consultamos los Juzgados de Tránsito municipales y la Policía Caminera provincial. Dos registros, una sola consulta. Gratis.',
    seoKeywords: 'multas mendoza, consultar multas mendoza, infracciones mendoza, policía caminera mendoza, juzgados tránsito mendoza, multas patente mendoza, fotomultas mendoza',
    intro: 'Mendoza tiene dos registros de infracciones: Juzgados Municipales de Tránsito (ciudad) y Policía Caminera (rutas provinciales). Consultamos ambos.',
    sections: [
      {
        title: 'Dos sistemas de multas en Mendoza',
        body: 'La ciudad de Mendoza gestiona las infracciones de tránsito urbanas a través del portal APEX de los Juzgados Municipales. Las rutas provinciales son controladas por la Policía Caminera mendocina, que tiene su propio registro accesible online. Al consultar desde carChecking obtenés el resultado de ambos sistemas en una sola búsqueda.',
      },
      {
        title: 'Fotomultas e infracciones más comunes en Mendoza',
        body: 'Las fotomultas en Mendoza se concentran en los accesos principales (Norte, Sur y Este), la Avenida San Martín, el puente del Acceso Este y los túneles de montaña. La velocidad máxima en zona urbana es de 60 km/h y de 30 km/h en zonas escolares. El exceso de velocidad, la distracción al volante y el incumplimiento de semáforos son las infracciones más frecuentes.',
      },
      {
        title: 'Cómo pagar multas en Mendoza',
        body: 'Las multas municipales se pagan en el portal APEX (apex.ciudaddemendoza.gov.ar) o en los juzgados de tránsito. Las de la Caminera se abonan a través del sistema de Seguridad de Mendoza (sistemas.seguridad.mendoza.gov.ar) o en los puntos de pago habilitados.',
      },
    ],
    faq: [
      {
        q: '¿Mendoza tiene fotomultas?',
        a: 'Sí. Mendoza capital y el Gran Mendoza cuentan con cámaras de fotomulta en los principales corredores viales. Los accesos Norte y Sur están especialmente monitorizados.',
      },
      {
        q: '¿Cuál es la diferencia entre "Mendoza Ciudad" y "Mendoza Caminera"?',
        a: '"Mendoza Ciudad" cubre infracciones del ejido urbano gestionadas por los Juzgados Municipales de Tránsito. "Mendoza Caminera" cubre infracciones en rutas provinciales a cargo de la Policía Caminera. Son sistemas completamente independientes.',
      },
      {
        q: '¿Un auto puede tener multas en Caminera pero no en el registro municipal?',
        a: 'Exactamente. Por eso consultamos ambos sistemas. Un vehículo puede estar libre en el registro municipal pero tener infracciones en Caminera, o viceversa.',
      },
      {
        q: '¿Cómo impugno una multa en Mendoza?',
        a: 'Para multas municipales, el recurso se presenta ante el Juzgado de Tránsito correspondiente. Para infracciones de la Caminera, el trámite se inicia en las delegaciones de la Policía Caminera de Mendoza dentro del plazo legal.',
      },
    ],
  },

  'multas-santa-fe': {
    seoTitle: 'Multas en Santa Fe: Consultar Infracciones por Patente | carChecking',
    seoDescription: 'Consultá infracciones de tránsito en la provincia de Santa Fe a través del Juzgado Virtual. Verificación gratuita por número de patente en los registros oficiales.',
    seoKeywords: 'multas santa fe, consultar multas santa fe, infracciones santa fe, juzgado virtual santa fe, multas patente santa fe, infracciones tránsito santa fe, policía vial santa fe',
    intro: 'Consultamos el Juzgado Virtual de Santa Fe, el sistema provincial que centraliza infracciones labradas por la Policía Vial en rutas y caminos provinciales.',
    sections: [
      {
        title: 'El Juzgado Virtual de Santa Fe',
        body: 'La provincia de Santa Fe centraliza las infracciones de tránsito en el Juzgado Virtual (santafe.gov.ar/juzgadovirtual), que registra las multas labradas por la Policía Vial provincial en rutas y autopistas. Este sistema es distinto al de la Municipalidad de Rosario, que tiene su propio registro independiente.',
      },
      {
        title: 'Santa Fe capital, Rosario y el sistema provincial',
        body: 'Santa Fe tiene tres registros relevantes: el Juzgado Virtual provincial (rutas), la Municipalidad de Rosario (sistema propio municipal) y los juzgados municipales de Santa Fe capital. Desde carChecking consultamos el Juzgado Virtual provincial y el sistema de Rosario por separado. Para infracciones urbanas de Santa Fe capital, recomendamos verificar también en la Municipalidad.',
      },
      {
        title: 'Cómo pagar multas del Juzgado Virtual de Santa Fe',
        body: 'Las infracciones del Juzgado Virtual pueden pagarse online en el portal provincial o en bocas de cobro autorizadas: Rapipago, Pago Fácil y sucursales del Nuevo Banco de Santa Fe (NBSF). El pago con descuento por pronto pago generalmente aplica dentro de los primeros 30 días.',
      },
    ],
    faq: [
      {
        q: '¿Este sistema incluye multas de la ciudad de Rosario?',
        a: 'No. Rosario tiene su propio sistema municipal independiente del Juzgado Virtual provincial. En carChecking consultamos ambos por separado.',
      },
      {
        q: '¿El Juzgado Virtual cubre todos los municipios de la provincia de Santa Fe?',
        a: 'Cubre las infracciones en rutas y caminos provinciales. Los municipios pueden tener registros propios para infracciones dentro de sus ejidos urbanos.',
      },
      {
        q: '¿Qué pasa si no pago una multa del Juzgado Virtual de Santa Fe?',
        a: 'Las multas impagas generan intereses y pueden derivar en inhibición del titular o restricciones para realizar transferencias del vehículo.',
      },
      {
        q: '¿Puedo recurrir una multa del Juzgado Virtual de Santa Fe?',
        a: 'Sí. El recurso de impugnación debe presentarse dentro del plazo legal ante el juzgado correspondiente al lugar donde se labró la infracción.',
      },
    ],
  },

  'multas-provincia-buenos-aires': {
    seoTitle: 'Multas en Buenos Aires: Consultar Infracciones por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de la Provincia de Buenos Aires por patente. Verificamos InfraccionesBA — 135 municipios bonaerenses cubiertos. Gratis e instantáneo.',
    seoKeywords: 'multas provincia buenos aires, consultar multas buenos aires, infracciones bonaerenses, multas patente buenos aires, infraccionesba, policía bonaerense multas, multas gba',
    intro: 'El portal provincial infraccionesba.gba.gob.ar cubre infracciones de los 135 municipios bonaerenses, incluyendo el conurbano, La Plata y el interior provincial.',
    sections: [
      {
        title: 'Cobertura del portal InfraccionesBA',
        body: 'El sistema InfraccionesBA (infraccionesba.gba.gob.ar) centraliza las infracciones de tránsito de toda la Provincia de Buenos Aires. Incluye multas labradas por la Policía Bonaerense, organismos de tránsito municipales y los juzgados de paz de los 135 municipios provinciales. Un solo resultado te muestra el estado completo del vehículo en toda la provincia.',
      },
      {
        title: 'Conurbano bonaerense y principales municipios',
        body: 'El conurbano bonaerense concentra la mayor cantidad de infracciones registradas en la provincia. Municipios como La Plata, Mar del Plata, Bahía Blanca, Quilmes, San Isidro y Tigre registran altos volúmenes de multas tanto en vías urbanas como en rutas de acceso. Las fotomultas en autopistas del conurbano también quedan registradas en este sistema.',
      },
      {
        title: 'Cómo pagar multas de la Provincia de Buenos Aires',
        body: 'Las infracciones pueden pagarse online a través del portal InfraccionesBA, en los juzgados municipales de cada partido o en bocas de cobro habilitadas (Pago Fácil, Rapipago). Muchos municipios también habilitan el pago en sus tesorerías.',
      },
    ],
    faq: [
      {
        q: '¿Las multas de CABA aparecen en el registro de la Provincia de Buenos Aires?',
        a: 'No. CABA y la Provincia de Buenos Aires tienen registros completamente independientes. Las infracciones del GCBA están en buenosaires.gob.ar, no en infraccionesba.gba.gob.ar.',
      },
      {
        q: '¿El sistema cubre multas en autopistas del conurbano como el Acceso Norte o la Autopista Oeste?',
        a: 'Sí, siempre que las infracciones hayan sido labradas por organismos provinciales o municipales de Buenos Aires. Las infracciones en autopistas federales tienen un registro separado (ANSV/SINAI).',
      },
      {
        q: '¿Cuánto tardan en aparecer las multas en el sistema provincial?',
        a: 'Generalmente 48–72 horas hábiles desde que se labró la infracción, aunque puede demorar más en municipios del interior provincial.',
      },
      {
        q: '¿Puedo transferir un auto con multas pendientes en la Provincia de Buenos Aires?',
        a: 'En algunos municipios las infracciones pendientes pueden generar trabas en la transferencia del dominio. Es recomendable regularizar las multas antes de iniciar el trámite de transferencia.',
      },
    ],
  },

  'multas-caba': {
    seoTitle: 'Multas en CABA: Consultar Infracciones por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de tránsito en CABA por patente. Accedemos al portal oficial del GCBA — fotomultas, estacionamiento, semáforos y más. Gratis.',
    seoKeywords: 'multas caba, consultar multas caba, infracciones caba, multas ciudad buenos aires, fotomultas caba, multas patente caba, gcba multas, policía de la ciudad multas',
    intro: 'Consultamos el registro oficial del GCBA: fotomultas de velocidad, semáforos, estacionamiento e infracciones de la Policía de la Ciudad.',
    sections: [
      {
        title: 'Organismos que labran multas en CABA',
        body: 'En la Ciudad Autónoma de Buenos Aires, las infracciones son labradas por la Policía de la Ciudad, los controladores de tránsito del GCBA y los sistemas automáticos de fotomulta. El registro oficial se consulta en buenosaires.gob.ar/licenciasdeconducir/consulta-de-infracciones. Todas las infracciones quedan registradas al dominio del vehículo.',
      },
      {
        title: 'Fotomultas en CABA: dónde están las cámaras',
        body: 'CABA cuenta con un extenso sistema de fotomultas que registra infracciones de velocidad y cruce en rojo de forma automática. Las cámaras están instaladas en Av. 9 de Julio, Av. Corrientes, los accesos al microcentro, la Autopista 25 de Mayo, la AU Illia y otros corredores viales de alto tránsito. El Metrobus y las arterias de doble mano también están monitoreados.',
      },
      {
        title: 'Cómo pagar multas en CABA',
        body: 'Las multas pueden abonarse online en el portal de Buenos Aires Ciudad (buenosaires.gob.ar), en cualquier sede del Banco Ciudad, o mediante los canales de Pago Fácil y Rapipago con el código de pago de la infracción. También es posible gestionar planes de pago para infracciones de mayor importe.',
      },
    ],
    faq: [
      {
        q: '¿Cuánto tiempo tengo para pagar una multa en CABA sin recargo?',
        a: 'El plazo estándar es de 30 días desde la notificación. Pasado ese plazo se aplican intereses. Pagando dentro del plazo podés acceder a un descuento por pronto pago.',
      },
      {
        q: '¿Las multas de estacionamiento en CABA quedan registradas en el dominio?',
        a: 'Sí. Todas las infracciones —incluyendo las de estacionamiento— quedan registradas en el dominio del vehículo y son visibles en la consulta online.',
      },
      {
        q: '¿CABA tiene multas por uso de celular al conducir?',
        a: 'Sí, y es una infracción grave. Puede resultar en multa severa más retención del registro de conducir. En caso de reincidencia, el Código de Tránsito porteño prevé sanciones progresivas.',
      },
      {
        q: '¿Las multas de CABA aparecen en el registro de la Provincia de Buenos Aires?',
        a: 'No. Son registros completamente separados. Una infracción labrada en CABA solo aparece en el sistema del GCBA (buenosaires.gob.ar), no en InfraccionesBA provincial.',
      },
    ],
  },

  'multas-neuquen': {
    seoTitle: 'Multas en Neuquén: Consultar Fotomultas por Patente | carChecking',
    seoDescription: 'Consultá fotomultas e infracciones de tránsito en Neuquén Capital por número de patente. Accedemos al portal oficial de la Municipalidad de Neuquén. Gratis.',
    seoKeywords: 'multas neuquen, consultar multas neuquen, fotomultas neuquen, infracciones neuquen, multas patente neuquen, municipalidad neuquen multas',
    intro: 'Consultamos el sistema de fotomultas de la Municipalidad de Neuquén Capital, con acceso directo al registro oficial por patente.',
    sections: [
      {
        title: 'Fotomultas en Neuquén: cómo funciona el sistema',
        body: 'Neuquén Capital cuenta con un sistema de fotomultas (webservice.muninqn.gov.ar) administrado por la Municipalidad. Las cámaras registran infracciones de velocidad y semáforos en los principales corredores viales de la ciudad. Las infracciones quedan registradas al dominio del vehículo y pueden consultarse online de forma gratuita.',
      },
      {
        title: 'Infracciones más frecuentes en Neuquén',
        body: 'El exceso de velocidad en avenidas principales como Av. Argentina, Av. del Trabajador y Av. Olascoaga es la infracción más registrada. También hay controles de semáforo en las intersecciones de mayor tránsito y fiscalización de estacionamiento en el centro.',
      },
      {
        title: 'Cómo pagar fotomultas en Neuquén',
        body: 'Las fotomultas de Neuquén Capital pueden abonarse a través del portal online de la Municipalidad o en las oficinas de Tránsito. Los descuentos por pronto pago suelen aplicar dentro de los primeros 15 a 30 días desde la notificación.',
      },
    ],
    faq: [
      {
        q: '¿Este sistema cubre toda la provincia de Neuquén o solo la capital?',
        a: 'Cubre exclusivamente el municipio de Neuquén Capital. Las infracciones en otras ciudades neuquinas o en rutas provinciales tienen registros separados.',
      },
      {
        q: '¿Qué pasa si me mudé pero la fotomulta llegó a una dirección anterior?',
        a: 'La notificación de la infracción se envía al domicilio registrado en el DNRPA. Si cambiaste de dirección, es importante actualizar los datos en el Registro del Automotor para recibir notificaciones correctamente.',
      },
      {
        q: '¿Las fotomultas de Neuquén prescriben?',
        a: 'Sí, las infracciones de tránsito tienen un plazo de prescripción legal, pero acumulan intereses y recargos durante ese período. Cuanto antes se regularicen, menor será el importe final.',
      },
    ],
  },

};
