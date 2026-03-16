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

  'multas-la-plata': {
    seoTitle: 'Multas en La Plata: Consultar Infracciones por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de tránsito en La Plata por patente. Accedemos a InfraccionesBA, el sistema oficial que cubre La Plata y toda la Provincia de Buenos Aires.',
    seoKeywords: 'multas la plata, consultar multas la plata, infracciones la plata, multas patente la plata, infraccionesba la plata, policía bonaerense la plata, multas tránsito la plata',
    intro: 'La Plata, capital de la Provincia de Buenos Aires, está cubierta por InfraccionesBA, el sistema provincial que centraliza infracciones de organismos municipales y provinciales.',
    sections: [
      {
        title: 'Multas en La Plata: qué sistema las registra',
        body: 'La Plata es la capital de la Provincia de Buenos Aires y sus infracciones de tránsito se registran en el sistema provincial InfraccionesBA (infraccionesba.gba.gob.ar). Esto incluye multas de la Policía Bonaerense, la Dirección de Tránsito municipal y controles en los accesos y rutas de la región metropolitana.',
      },
      {
        title: 'Principales ejes viales controlados en La Plata',
        body: 'Los controles de tránsito en La Plata se concentran en las diagonales principales (73, 74 y 80), el Acceso a La Plata (Autopista Buenos Aires-La Plata), el centro histórico y la zona universitaria. El exceso de velocidad y el estacionamiento en lugares prohibidos son las infracciones más frecuentes.',
      },
      {
        title: 'Cómo pagar multas en La Plata',
        body: 'Las multas municipales se abonan en el Juzgado de Faltas de La Plata o a través del portal online del municipio. Las infracciones provinciales se gestionan vía InfraccionesBA. Los canales de Pago Fácil y Rapipago también están habilitados para muchas categorías de infracciones.',
      },
    ],
    faq: [
      {
        q: '¿Las multas en La Plata se registran en el sistema provincial o en uno municipal propio?',
        a: 'Ambos. Las infracciones en rutas y autopistas van al sistema provincial (InfraccionesBA), mientras que las multas urbanas municipales pueden estar en el registro de la Municipalidad de La Plata.',
      },
      {
        q: '¿El resultado de esta consulta muestra todas las multas de La Plata?',
        a: 'Mostramos las infracciones registradas en InfraccionesBA, el sistema oficial de la Provincia de Buenos Aires, que cubre la mayoría de las multas labradas en La Plata y alrededores.',
      },
      {
        q: '¿La autopista Buenos Aires-La Plata tiene fotomultas?',
        a: 'Sí. La Autopista Presidente Perón (Buenos Aires-La Plata) cuenta con cámaras de velocidad. Las infracciones pueden aparecer en los registros provinciales o de ANSV, según el organismo que la labró.',
      },
      {
        q: '¿La Plata tiene sistema propio de fotomultas municipal?',
        a: 'La Plata ha implementado controles de velocidad en las avenidas principales. Las fotomultas municipales se registran en el sistema de la Municipalidad de La Plata.',
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

  'multas-avellaneda': {
    seoTitle: 'Multas en Avellaneda: Consultar Infracciones por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de tránsito en Avellaneda por patente. Accedemos al sistema SIAC de la Municipalidad de Avellaneda. Consulta gratuita e instantánea.',
    seoKeywords: 'multas avellaneda, consultar multas avellaneda, infracciones avellaneda, multas patente avellaneda, SIAC avellaneda, municipalidad avellaneda multas, tránsito avellaneda',
    intro: 'Consultamos el sistema SIAC de la Municipalidad de Avellaneda para verificar infracciones de tránsito registradas a nombre de tu patente.',
    sections: [
      {
        title: 'El sistema SIAC de Avellaneda',
        body: 'Avellaneda utiliza el sistema SIAC (Sistema Integral de Administración de Contravenciones) para gestionar las infracciones de tránsito municipales. Las multas son labradas por agentes de la Dirección de Tránsito y por el sistema de fotomultas instalado en los principales corredores del partido: Av. Mitre, Av. Rosales, Autopista Buenos Aires-La Plata y los accesos al Puente Pueyrredón.',
      },
      {
        title: 'Infracciones más frecuentes en Avellaneda',
        body: 'Los controles de tránsito en Avellaneda son intensivos en los accesos al Riachuelo y en las arterias que conectan con CABA. Las infracciones más comunes son exceso de velocidad, cruce en rojo de semáforo, estacionamiento indebido en zona comercial y conducción sin documentación en regla. Las fotomultas quedan registradas al dominio del vehículo y pueden aparecer al consultar la patente.',
      },
      {
        title: 'Cómo pagar multas en Avellaneda',
        body: 'Las infracciones en Avellaneda se abonan en la Dirección de Tránsito municipal, en el Juzgado de Faltas o a través de los canales de pago habilitados (Rapipago, Pago Fácil). Se aplican descuentos por pronto pago dentro de los primeros 30 días desde la notificación. Pasado ese plazo, se generan recargos e intereses sobre el importe original.',
      },
    ],
    faq: [
      {
        q: '¿Qué es el SIAC de Avellaneda?',
        a: 'El SIAC es el Sistema Integral de Administración de Contravenciones que usa la Municipalidad de Avellaneda para registrar y gestionar infracciones de tránsito. Permite consultar multas por patente de forma online.',
      },
      {
        q: '¿Las multas de Avellaneda afectan la transferencia del vehículo?',
        a: 'Sí. Las deudas de infracciones municipales pueden trabar la transferencia del dominio. Es recomendable verificar y regularizar multas antes de comprar o vender un auto.',
      },
      {
        q: '¿Puedo impugnar una multa de Avellaneda?',
        a: 'Sí. Podés presentar un descargo ante el Juzgado de Faltas de Avellaneda dentro del plazo indicado en la notificación. Es recomendable hacerlo con asesoramiento legal si el monto es significativo.',
      },
      {
        q: '¿Las multas de Avellaneda aparecen en el registro provincial de PBA?',
        a: 'Depende del organismo que labró la infracción. Las multas municipales de Avellaneda van al sistema SIAC del municipio; las de la Policía Bonaerense o rutas provinciales van a InfraccionesBA.',
      },
    ],
  },

  'multas-lanus': {
    seoTitle: 'Infracciones en Lanús: Consultar Multas por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de tránsito en Lanús por patente. Accedemos al sistema Infratrack de la Municipalidad de Lanús. Verificación gratuita e instantánea.',
    seoKeywords: 'multas lanus, infracciones lanus, consultar multas lanús, multas patente lanus, infratrack lanus, municipalidad lanus multas, tránsito lanús',
    intro: 'Consultamos el sistema Infratrack de la Municipalidad de Lanús para verificar infracciones de tránsito registradas a tu patente.',
    sections: [
      {
        title: 'Infratrack: el sistema de infracciones de Lanús',
        body: 'Lanús gestiona sus infracciones de tránsito a través de Infratrack, una plataforma utilizada por varios municipios del GBA que permite registrar, consultar y pagar multas online. Las infracciones son labradas por agentes de la Dirección de Tránsito y por el sistema de fotomultas en los ejes viales principales: Av. Hipólito Yrigoyen, Av. H. Bouchard, Av. 25 de Mayo y los accesos a la Autopista Buenos Aires-La Plata.',
      },
      {
        title: 'Fotomultas y controles de tránsito en Lanús',
        body: 'El sistema de Lanús incluye cámaras de velocidad y control de semáforos en los corredores de mayor tránsito del partido. Las infracciones detectadas por fotomulta se notifican al titular del vehículo por carta certificada y quedan disponibles para consulta online. Los controles se intensifican en la zona de Lanús Este y Lanús Oeste, donde el tránsito pesado es frecuente.',
      },
      {
        title: 'Cómo regularizar multas en Lanús',
        body: 'Las multas de Lanús pueden abonarse en la Municipalidad, en el Juzgado de Faltas o a través de Pago Fácil y Rapipago. Infratrack también habilita el pago online desde su plataforma. El descuento por pago voluntario aplica dentro de los 30 días desde la notificación; pasado ese plazo se aplican intereses y recargos.',
      },
    ],
    faq: [
      {
        q: '¿Qué es Infratrack y por qué lo usa Lanús?',
        a: 'Infratrack es un sistema de gestión de infracciones de tránsito utilizado por varios municipios del GBA, incluyendo Lanús, Berisso y Ezeiza. Permite registrar, consultar y pagar multas online de forma centralizada.',
      },
      {
        q: '¿Las infracciones de Lanús afectan la transferencia del auto?',
        a: 'Sí. Las deudas de multas municipales pueden impedir la transferencia del dominio. Verificá y regularizá cualquier infracción antes de comprar o vender un vehículo.',
      },
      {
        q: '¿Puedo pagar una multa de Lanús sin ir a la municipalidad?',
        a: 'Sí. Podés abonar online a través de la plataforma Infratrack o presencialmente en bocas de Rapipago y Pago Fácil. El portal también permite gestionar planes de pago en cuotas.',
      },
      {
        q: '¿Lanús tiene fotomultas propias o usa el sistema provincial?',
        a: 'Lanús tiene su propio sistema municipal de fotomultas gestionado por Infratrack. Las infracciones en rutas nacionales o provinciales que cruzan el partido pueden estar en registros distintos (ANSV o PBA).',
      },
    ],
  },

  'multas-entre-rios': {
    seoTitle: 'Multas en Entre Ríos: Consultar Infracciones por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de tránsito en la Provincia de Entre Ríos por patente. Accedemos al sistema Monitoreo Vial provincial. Verificación gratuita e instantánea.',
    seoKeywords: 'multas entre rios, consultar multas entre ríos, infracciones entre ríos, monitoreo vial entre ríos, multas patente entre ríos, policía caminera entre ríos, multas provincia entre ríos',
    intro: 'Consultamos el sistema Monitoreo Vial de la Provincia de Entre Ríos para verificar infracciones de tránsito en rutas y caminos provinciales.',
    sections: [
      {
        title: 'Monitoreo Vial Entre Ríos: qué registra',
        body: 'La Provincia de Entre Ríos centraliza sus infracciones de tránsito en el sistema Monitoreo Vial, accesible por patente online. El organismo principal que labra infracciones en rutas provinciales es la Policía Caminera de Entre Ríos. Los tramos de mayor control incluyen la Ruta Nacional 14 (corredor del Mercosur), la Ruta Provincial 11, los accesos a Paraná, Concordia y Gualeguaychú, y los puentes internacionales.',
      },
      {
        title: 'Principales ejes viales controlados en Entre Ríos',
        body: 'Entre Ríos cuenta con una extensa red vial que conecta el litoral con el Mercosur. Los controles de velocidad y documentación son intensivos en la RN14 (entre Paso de los Libres y Buenos Aires), en los accesos a la capital Paraná y en las rutas que unen las ciudades de Concordia, Gualeguaychú y Colón. El tránsito de camiones y transporte de carga es especialmente controlado en estas arterias.',
      },
      {
        title: 'Cómo pagar multas en Entre Ríos',
        body: 'Las infracciones registradas en Monitoreo Vial pueden consultarse y gestionarse en las dependencias de la Policía Caminera o a través del portal online provincial. Los pagos se realizan en el Nuevo Banco de Entre Ríos, en bocas de Rapipago y Pago Fácil, o de forma online. Se aplican descuentos por pronto pago y la posibilidad de planes de cuotas para montos elevados.',
      },
    ],
    faq: [
      {
        q: '¿Qué es el sistema Monitoreo Vial de Entre Ríos?',
        a: 'Monitoreo Vial es la plataforma oficial de la Provincia de Entre Ríos para registrar y consultar infracciones de tránsito en rutas y caminos provinciales. Permite verificar si un dominio tiene multas pendientes online.',
      },
      {
        q: '¿Las multas de Entre Ríos afectan la transferencia del vehículo?',
        a: 'Sí. Las infracciones provinciales pueden trabar trámites en el DNRPA. Es importante verificar y regularizar las multas antes de transferir un vehículo registrado o con circulación frecuente en Entre Ríos.',
      },
      {
        q: '¿Esta consulta muestra multas de la Policía Caminera y también de municipios como Paraná o Concordia?',
        a: 'Consultamos el sistema provincial Monitoreo Vial, que centraliza las infracciones de la Policía Caminera y organismos provinciales. Las multas municipales (de la ciudad de Paraná, Concordia, etc.) pueden estar en registros separados de cada municipio.',
      },
      {
        q: '¿Puedo impugnar una infracción registrada en Monitoreo Vial Entre Ríos?',
        a: 'Sí. Podés presentar un descargo ante la dependencia de la Policía Caminera que labró la infracción o en los juzgados de faltas de la jurisdicción correspondiente, dentro del plazo indicado en el acta.',
      },
    ],
  },

};
