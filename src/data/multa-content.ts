export interface MultaContent {
  // seoTitle/seoDescription/seoKeywords are NOT rendered anywhere.
  // The page <title>/meta come from metaTitle/metaDescription in
  // multa-jurisdictions.ts — edit those to change what Google shows.
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  intro: string;
  sections: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  relatedGuides?: { title: string; url: string; description: string }[];
}

/** Keyed by jurisdiction slug (unique). */
export const MULTA_CONTENT: Record<string, MultaContent> = {

  'multas-ansv-sinai': {
    seoTitle: 'Consultar Multas ANSV / SINAI por Patente Online | carChecking',
    seoDescription: 'Consultá multas ANSV y SINAI por patente: fotomultas de rutas nacionales y actas de municipios adheridos, gratis, en tiempo real y sin crear cuenta.',
    seoKeywords: 'multas ANSV, consultar multas SINAI, sistema nacional de infracciones, fotomultas rutas nacionales, agencia nacional de seguridad vial, multas por patente nacional, consulta infracciones seguridadvial.gob.ar',
    intro: 'Consultamos el sistema SINAI de la Agencia Nacional de Seguridad Vial (ANSV) por vos, resolviendo en el momento el captcha que exige el portal oficial: fotomultas de rutas nacionales y actas de los municipios adheridos, con resultado directo desde la patente.',
    sections: [
      {
        title: 'Qué es SINAI y quién lo administra',
        body: 'SINAI (Sistema Nacional de Administración de Infracciones) es la plataforma que la Agencia Nacional de Seguridad Vial (ANSV) usa para centralizar infracciones de tránsito a nivel nacional. Reúne las fotomultas y actas labradas por radares y controles en rutas y autopistas nacionales, más las infracciones de los municipios que decidieron adherirse voluntariamente al sistema para compartir su información con el organismo nacional.',
      },
      {
        title: 'Qué infracciones aparecen en la consulta nacional',
        body: 'La consulta ANSV/SINAI muestra multas por exceso de velocidad, cruces indebidos y otras faltas detectadas en rutas nacionales, además de actas de municipios adheridos. No es un listado universal: cada jurisdicción adherida es responsable de cargar y actualizar sus propios datos, por lo que puede haber infracciones locales que todavía no figuren reflejadas en el sistema nacional al momento de la consulta.',
      },
      {
        title: 'Por qué esta consulta lleva un paso extra',
        body: 'El portal oficial de SINAI exige resolver una verificación anti-bot (captcha) antes de mostrar el resultado, un control pensado para evitar consultas automatizadas masivas. Nuestro sistema resuelve ese paso por vos en tiempo real, en un proceso de dos etapas contra el backend oficial, así no tenés que completar ningún formulario ni verificación manual del lado de la ANSV.',
      },
      {
        title: 'Cómo se paga una multa nacional',
        body: 'Una vez identificada la infracción, el pago se gestiona a través de los canales que indica el propio acta: tarjeta de crédito o débito online, o efectivo en redes de cobranza habilitadas. El monto final, los recargos y si existe algún beneficio por pago anticipado los define cada acta puntual al momento de generarla, así que conviene revisarlos directamente en el comprobante antes de pagar.',
      },
      {
        title: 'SINAI no reemplaza a CABA ni a la Provincia de Buenos Aires',
        body: 'Un mismo vehículo puede tener, al mismo tiempo, una multa nacional en SINAI por circular en una ruta nacional y otra multa municipal o provincial completamente separada (por ejemplo en CABA o en la Provincia de Buenos Aires) si esas jurisdicciones no están adheridas al sistema nacional. Por eso, antes de comprar un usado o hacer una transferencia, conviene revisar cada jurisdicción por separado.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas ANSV / SINAI por patente?',
        a: 'Ingresá la patente en el buscador y seleccioná "ANSV / SINAI". Resolvemos por vos el captcha del portal oficial de la Agencia Nacional de Seguridad Vial y te mostramos las infracciones de rutas nacionales y municipios adheridos, gratis y sin necesidad de crear una cuenta.',
      },
      {
        q: '¿Qué diferencia hay entre SINAI y las multas de CABA o de la Provincia de Buenos Aires?',
        a: 'SINAI centraliza infracciones de rutas nacionales y de los municipios que se adhirieron voluntariamente al sistema. CABA y la Provincia de Buenos Aires tienen sus propios portales (buenosaires.gob.ar e Infracciones BA) y un vehículo puede tener multas en ambos sistemas a la vez, de forma independiente.',
      },
      {
        q: '¿Por qué esta consulta tarda un poco más que otras jurisdicciones?',
        a: 'Porque el portal oficial de la ANSV exige resolver un captcha de seguridad antes de entregar el resultado. Nuestro sistema hace ese paso automáticamente en un proceso de dos etapas, por eso la consulta puede demorar unos segundos más que en jurisdicciones sin esa verificación.',
      },
      {
        q: '¿SINAI cubre todas las rutas y municipios del país?',
        a: 'Cubre las rutas y autopistas nacionales controladas por la ANSV y los municipios que se adhirieron al sistema. No incluye automáticamente a jurisdicciones con sistemas propios no adheridos, como CABA o buena parte de los partidos de la Provincia de Buenos Aires.',
      },
      {
        q: '¿Cómo pago una multa detectada en SINAI?',
        a: 'El acta de infracción indica los canales habilitados: pago online con tarjeta de crédito o débito, o en efectivo a través de las redes de cobranza asociadas. El monto, los recargos y cualquier condición de pago se detallan en el comprobante generado para esa infracción puntual.',
      },
      {
        q: '¿Cada cuánto tiempo prescribe una multa nacional?',
        a: 'La Ley Nacional de Tránsito 24.449 establece en general plazos de dos años para faltas leves y cinco años para faltas graves, aunque el plazo puede interrumpirse por intimaciones u otros actos administrativos y cada jurisdicción aplica sus propios criterios de prescripción.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en CABA por patente', url: '/consultar-multa/multas-caba', description: 'Consultá si un vehículo tiene infracciones registradas en la Ciudad de Buenos Aires.' },
      { title: 'Multas en Provincia de Buenos Aires', url: '/consultar-multa/multas-provincia-buenos-aires', description: 'Revisá infracciones de tránsito en los municipios bonaerenses a través de Infracciones BA.' },
      { title: 'Informe de dominio del auto en Argentina', url: '/guias/informe-de-dominio-auto-argentina-caba-gba', description: 'Entendé qué muestra un informe de dominio y por qué conviene pedirlo antes de comprar un usado.' },
    ],
  },

  'multas-provincia-buenos-aires': {
    seoTitle: 'Consultar Multas Provincia de Buenos Aires por Patente | carChecking',
    seoDescription: 'Consultá multas en la Provincia de Buenos Aires por patente vía Infracciones BA: fotomultas y actas de los municipios bonaerenses, gratis y sin cuenta.',
    seoKeywords: 'multas provincia buenos aires, infraccionesba, consultar multas por patente pba, infracciones ba gba, fotomultas conurbano, multas municipios buenos aires, web del infractor',
    intro: 'Consultamos el portal Infracciones BA del Gobierno de la Provincia de Buenos Aires por vos, en tiempo real y sin necesidad de crear una cuenta: fotomultas y actas de tránsito de los municipios bonaerenses, con resultado directo desde la patente.',
    sections: [
      {
        title: 'Qué es Infracciones BA y quién la administra',
        body: 'Infracciones BA es la "Web del Infractor" del Ministerio de Transporte de la Provincia de Buenos Aires, a través de su Subsecretaría de Política y Seguridad Vial. Centraliza en infraccionesba.gba.gob.ar/consulta-infraccion las multas de tránsito registradas en los municipios de la provincia, permitiendo buscarlas por dominio del vehículo o por DNI del titular, y ofrece un usuario personal ("Mi Web") para hacer seguimiento de las infracciones propias.',
      },
      {
        title: 'Qué municipios cubre el sistema provincial',
        body: 'El sistema abarca los municipios (partidos) de la Provincia de Buenos Aires, tanto del conurbano como del interior, incluida La Plata, la ciudad capital. Cada municipio conserva su propio juzgado de faltas para resolver descargos y audiencias, pero la consulta y buena parte del pago se gestionan de forma centralizada a través de este portal provincial único.',
      },
      {
        title: 'Cómo se paga una multa bonaerense',
        body: 'Una vez identificada la infracción en el portal, se puede descargar o imprimir el comprobante de pago, escanear un código QR o abonar a través de Provincia Net Pago con tarjeta de débito, además de las bocas de Rapipago habilitadas. El sistema indica en cada caso el monto, los vencimientos y si corresponde algún recargo por pago fuera de término.',
      },
      {
        title: 'Descargo y disputa de una infracción',
        body: 'Si el titular considera que la multa es incorrecta, puede presentar un descargo ante el juzgado de faltas del municipio que la labró, dentro de los plazos que indique la notificación. Para gestiones vinculadas a la baja de infracciones ya prescriptas, la Dirección Provincial de Política y Seguridad Vial, con sede en La Plata, atiende consultas de forma presencial o telefónica.',
      },
      {
        title: 'Cuándo prescribe una multa en la Provincia de Buenos Aires',
        body: 'Según el marco de la Ley Nacional de Tránsito 24.449, las faltas leves prescriben en general a los dos años y las graves a los cinco, aunque ese plazo se interrumpe si hay intimaciones u otros actos que reclamen el pago. Que una multa prescriba no la borra automáticamente del sistema: igual hay que tramitar la baja ante el organismo correspondiente.',
      },
      {
        title: 'Multas provinciales, nacionales (SINAI) y deuda de patentes: no es lo mismo',
        body: 'Un auto radicado en la Provincia de Buenos Aires puede tener, además de las multas registradas en Infracciones BA, infracciones nacionales por circular en rutas controladas por la ANSV (sistema SINAI) y, por separado, deuda del impuesto automotor (patentes) que se consulta en ARBA. Son tres registros distintos: conviene revisar cada uno antes de comprar o transferir un vehículo.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas de la Provincia de Buenos Aires por patente?',
        a: 'Ingresá la patente en el buscador y seleccioná "Provincia de Buenos Aires". Accedemos en tiempo real al portal Infracciones BA y te mostramos las multas registradas en el municipio correspondiente, gratis y sin necesidad de crear una cuenta.',
      },
      {
        q: '¿Infracciones BA cubre a todos los municipios bonaerenses?',
        a: 'Sí, el sistema centraliza la consulta de infracciones de los municipios de la Provincia de Buenos Aires, del conurbano y del interior, incluida La Plata. El descargo y las audiencias, sin embargo, se resuelven en el juzgado de faltas del municipio que labró cada infracción.',
      },
      {
        q: '¿Cómo pago una multa en la Provincia de Buenos Aires?',
        a: 'Desde el resultado de la consulta podés descargar el comprobante de pago, escanear el código QR o pagar con tarjeta de débito a través de Provincia Net Pago, además de las bocas de Rapipago habilitadas. El portal indica el monto y el vencimiento de cada infracción.',
      },
      {
        q: '¿Puedo hacer un descargo si creo que la multa está mal?',
        a: 'Sí, el descargo se presenta ante el juzgado de faltas del municipio que labró la infracción, dentro del plazo indicado en la notificación. Cada municipio bonaerense tiene su propio juzgado de faltas para resolver estos reclamos.',
      },
      {
        q: '¿Cuándo prescribe una multa en la Provincia de Buenos Aires?',
        a: 'En general, y según la Ley Nacional de Tránsito 24.449, las faltas leves prescriben a los dos años y las graves a los cinco, salvo que el plazo se haya interrumpido por una intimación. Igualmente, hay que tramitar la baja formal ante el organismo correspondiente.',
      },
      {
        q: '¿Es lo mismo una multa de tránsito que la deuda de patente del auto?',
        a: 'No. Las multas de tránsito se consultan en Infracciones BA, mientras que la deuda del impuesto automotor (patente) se consulta en ARBA. Son registros separados y conviene revisar los dos antes de comprar o transferir un vehículo bonaerense.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en La Plata por patente', url: '/consultar-multa/multas-la-plata', description: 'La consulta enfocada en la capital provincial, dentro del mismo sistema de Infracciones BA.' },
      { title: 'Cómo consultar multas en PBA', url: '/multas-pba/como-consultar', description: 'Guía paso a paso para revisar infracciones bonaerenses por patente o DNI.' },
      { title: 'Cómo saber si un auto tiene deuda de patentes', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Diferenciá la deuda impositiva del vehículo de las multas de tránsito antes de comprarlo.' },
    ],
  },

  'multas-la-plata': {
    seoTitle: 'Consultar Multas en La Plata por Patente Online | carChecking',
    seoDescription: 'Consultá multas de tránsito en La Plata por patente: fotomultas municipales e infracciones provinciales de Infracciones BA, en tiempo real y sin crear cuenta.',
    seoKeywords: 'multas la plata, consultar multas la plata por patente, fotomultas la plata, juzgado de faltas la plata, agencia platense de recaudación, infracciones ba la plata, multas municipio la plata',
    intro: 'Consultamos las infracciones de tránsito de La Plata por vos, en tiempo real y sin necesidad de crear una cuenta: fotomultas municipales y actas provinciales cargadas en Infracciones BA, con resultado directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas en La Plata',
        body: 'En La Plata las infracciones de tránsito se gestionan a través de la Subsecretaría de Justicia de Faltas y Control Urbano del municipio, con el respaldo administrativo de la Agencia Platense de Recaudación (APR). Como La Plata es uno de los municipios (partidos) de la Provincia de Buenos Aires, sus infracciones también quedan registradas en el sistema provincial Infracciones BA, consultable por dominio o por DNI del titular.',
      },
      {
        title: 'La Plata, capital provincial y con su propia red de fotomultas',
        body: 'Además de ser sede del gobierno de la Provincia de Buenos Aires, La Plata cuenta con su propio sistema de fotomultas, con cámaras y radares instalados en corredores como Avenida 520, Avenida 137, Avenida 44, Avenida 7, Avenida 32 y el Camino Centenario, en los accesos hacia City Bell y Villa Elisa. Estos equipos están integrados a la red de cámaras del Centro de Operaciones y Monitoreo municipal.',
      },
      {
        title: 'Qué infracciones detectan las cámaras platenses',
        body: 'El sistema de fotomultas de La Plata registra infracciones como cruzar un semáforo en rojo, invadir la senda peatonal, hacer un giro en "U" indebido o circular con exceso de velocidad en los tramos controlados. Cada infracción detectada queda asociada al dominio del vehículo y se incorpora al circuito administrativo del municipio y de la provincia.',
      },
      {
        title: 'Cómo pagar o hacer un descargo en La Plata',
        body: 'El pago y la consulta de infracciones platenses se gestionan principalmente a través de Infracciones BA, el portal provincial, donde se puede descargar el comprobante o pagar con Provincia Net Pago y Rapipago. Para trámites presenciales, descargos o un certificado de libre deuda, hay que dirigirse a la Subsecretaría de Justicia de Faltas y Control Urbano, en calle 48 N.º 786, La Plata.',
      },
      {
        title: 'La Plata y el sistema provincial: mismo registro, mirada local',
        body: 'Aunque esta página está pensada específicamente para el municipio de La Plata, técnicamente las infracciones platenses forman parte del mismo sistema que el resto de la Provincia de Buenos Aires. Si el vehículo circuló además por rutas nacionales (como los accesos entre La Plata y Buenos Aires), conviene revisar también la consulta nacional ANSV / SINAI, que es un registro independiente.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas de La Plata por patente?',
        a: 'Ingresá la patente en el buscador y seleccioná "La Plata". Accedemos en tiempo real al sistema provincial Infracciones BA y te mostramos las infracciones registradas a nombre del titular del vehículo en el municipio, gratis y sin necesidad de crear una cuenta.',
      },
      {
        q: '¿Las multas de La Plata usan un sistema distinto al de la Provincia de Buenos Aires?',
        a: 'No, La Plata es un municipio (partido) de la Provincia de Buenos Aires y sus infracciones se registran en el mismo sistema provincial, Infracciones BA. Esta página apunta específicamente a la ciudad de La Plata, con su propia red de fotomultas y su juzgado de faltas municipal.',
      },
      {
        q: '¿Dónde están las cámaras de fotomultas en La Plata?',
        a: 'Hay cámaras y radares instalados en corredores como Avenida 520, Avenida 137, Avenida 44, Avenida 7, Avenida 32 y el Camino Centenario, entre otros puntos de ingreso y egreso de la ciudad, integrados a la red municipal de monitoreo.',
      },
      {
        q: '¿Cómo pago una multa de La Plata?',
        a: 'El pago se gestiona a través de Infracciones BA, donde podés descargar el comprobante o pagar con Provincia Net Pago y Rapipago. Para descargos o un certificado de libre deuda hay que presentarse en la Subsecretaría de Justicia de Faltas y Control Urbano, en calle 48 N.º 786.',
      },
      {
        q: '¿Qué pasa si el auto también circuló por una ruta nacional?',
        a: 'En ese caso puede existir además una infracción nacional registrada en el sistema ANSV / SINAI, que es independiente del registro provincial de La Plata. Conviene consultar ambas jurisdicciones por separado antes de comprar o transferir el vehículo.',
      },
      {
        q: '¿Puedo consultar multas de La Plata por DNI en lugar de patente?',
        a: 'Sí, Infracciones BA permite buscar tanto por dominio del vehículo como por DNI del titular. Nuestro buscador está optimizado para la consulta por patente.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en Provincia de Buenos Aires', url: '/consultar-multa/multas-provincia-buenos-aires', description: 'El sistema provincial completo, Infracciones BA, para cualquier municipio bonaerense.' },
      { title: 'Multas ANSV / SINAI', url: '/consultar-multa/multas-ansv-sinai', description: 'Revisá infracciones nacionales en rutas y autopistas, un registro separado del municipal.' },
      { title: 'Cómo consultar multas en PBA', url: '/multas-pba/como-consultar', description: 'Guía paso a paso para revisar y pagar infracciones bonaerenses por patente.' },
    ],
  },

  'multas-caba': {
    seoTitle: 'Consultar Multas CABA por Patente en Tiempo Real | carChecking',
    seoDescription: 'Consultá multas de tránsito en CABA por patente: infracciones porteñas, el descuento por pago voluntario y cómo pagarlas, en tiempo real y sin crear cuenta.',
    seoKeywords: 'multas caba, consultar multas caba por patente, infracciones de transito caba, pago voluntario multas caba, direccion general de administracion de infracciones, multas ciudad de buenos aires',
    intro: 'Consultamos el sistema de infracciones de tránsito del Gobierno de la Ciudad de Buenos Aires por vos, en tiempo real y sin necesidad de crear una cuenta: multas registradas por patente o DNI, con resultado directo desde el dominio del vehículo.',
    sections: [
      {
        title: 'Quién administra las infracciones en la Ciudad de Buenos Aires',
        body: 'En CABA, las infracciones de tránsito son gestionadas por la Dirección General de Administración de Infracciones del Gobierno de la Ciudad. Los residentes pueden consultarlas online ingresando el DNI del titular o la patente del vehículo a través del portal oficial de Buenos Aires Ciudad, sin necesidad de trámite presencial para la consulta.',
      },
      {
        title: 'El beneficio del pago voluntario en CABA',
        body: 'CABA ofrece un esquema de pago voluntario con un descuento del 50% sobre el monto de la multa, disponible dentro de un plazo de 40 días desde la notificación de la infracción. Pasado ese plazo, corresponde abonar el monto completo. Las infracciones más graves, como conducir alcoholizado o participar de picadas, quedan excluidas de este beneficio y requieren presentarse ante un controlador.',
      },
      {
        title: 'Cómo se pagan las multas porteñas',
        body: 'El pago puede hacerse online desde el propio portal de consulta, o en efectivo en Pago Fácil, Rapipago, Banco Ciudad y Banco Provincia. También hay opciones electrónicas como Mercado Pago, Provincia Net, Bapro Pagos y cajeros de las sedes comunales, además de asistencia vía WhatsApp a través del asistente Boti del Gobierno de la Ciudad.',
      },
      {
        title: 'Descargo y audiencia con un controlador de faltas',
        body: 'Si el titular quiere disputar una infracción, puede pedir turno para una audiencia presencial con un controlador de faltas de tránsito. Es importante tener en cuenta que, al optar por esta vía, se pierde automáticamente el beneficio del pago voluntario con descuento, por lo que conviene evaluar bien la conveniencia antes de solicitarla.',
      },
      {
        title: 'Multas de CABA vs. infracciones nacionales o de otras jurisdicciones',
        body: 'Un vehículo radicado en CABA puede además tener infracciones nacionales registradas en el sistema ANSV / SINAI si circuló por rutas nacionales, o infracciones en la Provincia de Buenos Aires si se movió por el conurbano o el interior bonaerense. Son registros independientes entre sí, así que conviene revisar cada jurisdicción por separado antes de una compraventa.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas de CABA por patente?',
        a: 'Ingresá la patente en el buscador y seleccioná "CABA". Accedemos en tiempo real al portal del Gobierno de la Ciudad de Buenos Aires y te mostramos las infracciones registradas a nombre del titular, gratis y sin necesidad de crear una cuenta.',
      },
      {
        q: '¿Es cierto que en CABA se puede pagar una multa con 50% de descuento?',
        a: 'Sí, CABA ofrece un pago voluntario con 50% de descuento si se abona dentro de los 40 días desde la notificación de la infracción. Pasado ese plazo, o si se pide una audiencia con un controlador, se pierde el beneficio y corresponde el monto completo.',
      },
      {
        q: '¿Qué infracciones quedan afuera del pago voluntario con descuento?',
        a: 'Las infracciones graves, como conducir alcoholizado o participar de una picada, están excluidas del pago voluntario y requieren presentarse en persona ante un controlador de faltas de tránsito.',
      },
      {
        q: '¿Cómo pago una multa de CABA?',
        a: 'Podés pagar online desde el portal oficial, en efectivo en Pago Fácil, Rapipago, Banco Ciudad o Banco Provincia, o con medios electrónicos como Mercado Pago y Provincia Net. También hay asistencia por WhatsApp a través del asistente Boti.',
      },
      {
        q: '¿Puedo hacer un descargo si no estoy de acuerdo con la multa?',
        a: 'Sí, podés pedir turno para una audiencia presencial con un controlador de faltas de tránsito. Tené en cuenta que al solicitarla se pierde el beneficio del pago voluntario con descuento.',
      },
      {
        q: '¿Las multas de CABA incluyen las infracciones en rutas nacionales?',
        a: 'No. Las infracciones en rutas nacionales se registran en el sistema ANSV / SINAI, que es independiente del sistema porteño. Un vehículo puede tener multas en ambos sistemas al mismo tiempo, según por dónde haya circulado.',
      },
    ],
    relatedGuides: [
      { title: 'Cómo pagar multas en CABA', url: '/multas-caba/como-pagar', description: 'Todos los canales de pago y el detalle del descuento por pago voluntario en la Ciudad.' },
      { title: 'Multas ANSV / SINAI', url: '/consultar-multa/multas-ansv-sinai', description: 'Revisá infracciones nacionales en rutas y autopistas, un registro separado del porteño.' },
      { title: 'Informe de dominio del auto en Argentina', url: '/guias/informe-de-dominio-auto-argentina-caba-gba', description: 'Entendé qué muestra un informe de dominio antes de comprar un usado en CABA o GBA.' },
    ],
  },

  'multas-cordoba': {
    seoTitle: 'Consultar Multas Córdoba Caminera por Patente | carChecking',
    seoDescription: 'Consultá multas de la Policía Caminera de Córdoba por patente, DNI o número de acta. Resultado en segundos, sin registrarte. Enterate del descuento por pronto pago.',
    seoKeywords: 'multas cordoba, policia caminera cordoba, consultar multas cordoba patente, rentas cordoba multas, multas caminera cordoba',
    intro: 'Consultamos el portal de Rentas Córdoba por vos, en tiempo real y sin necesidad de crear una cuenta: infracciones de la Policía Caminera provincial en rutas y autopistas de Córdoba, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas de la Policía Caminera',
        body: 'La Policía Caminera es la fuerza provincial que patrulla rutas y autopistas de Córdoba: Ruta Nacional 9, Ruta Provincial 36, Autopista Córdoba–Carlos Paz y Autopista 19, entre otros corredores. Cada acta labrada por un agente queda registrada con el número de acta, el DNI del conductor y la patente del vehículo, y su gestión (consulta, pago y descargo) corre por cuenta de la Dirección General de Rentas de la provincia, Rentas Córdoba, no de la Municipalidad.',
      },
      {
        title: 'Ciudad de Córdoba vs. Policía Caminera',
        body: 'Es habitual confundir los dos sistemas porque comparten territorio. Las infracciones labradas dentro del ejido urbano de la Ciudad de Córdoba (fotomultas, inspectores de tránsito municipal) se gestionan a través de la Municipalidad de Córdoba. Las labradas por la Policía Caminera en rutas y autopistas provinciales, incluso las que atraviesan la ciudad, se gestionan en Rentas Córdoba. Antes de dar por cerrado un vehículo conviene revisar ambos padrones por separado.',
      },
      {
        title: 'Cómo se calcula el monto: la Unidad Fija (UF)',
        body: 'Las multas de la Policía Caminera se expresan en Unidades Fijas (UF), un valor de referencia equivalente al precio de un litro de nafta súper que la Dirección de Tránsito actualiza por resolución cada vez que varía el precio del combustible. Una infracción leve puede rondar las 20 a 100 UF según la falta y los puntos que descuenta del registro. Como el valor en pesos cambia con cada resolución, el monto exacto siempre conviene verificarlo en el momento del pago, no de memoria.',
      },
      {
        title: 'Cómo pagar y el descuento por pronto pago',
        body: 'Si pagás dentro de los 10 días hábiles desde que se labró el acta, accedés a un 50% de descuento sobre el monto total: es el beneficio de Pago Voluntario que ofrece Rentas Córdoba. Podés abonar online en rentascordoba.gob.ar, en efectivo, o en Rapipago, Pago Fácil y Cobro Express. Ese mismo plazo de 10 días hábiles es también la ventana para presentar un descargo, que se hace online en transito.cba.gov.ar con Clave Ciudadano Digital nivel 2; una vez vencido, se pierde tanto el descuento como la posibilidad de descargo directo.',
      },
      {
        title: 'Verificar multas de Córdoba antes de comprar un auto usado',
        body: 'Las infracciones de la Policía Caminera quedan atadas al dominio, así que una deuda vieja puede aparecer recién cuando querés transferir el auto. Antes de comprar un usado radicado en Córdoba, conviene chequear las multas provinciales, las municipales si circuló dentro de la ciudad, y la situación registral del dominio. Un trámite aparte, que no hay que confundir con esto, es la ITV (Inspección Técnica Vehicular) de la Ciudad de Córdoba: un control técnico obligatorio del vehículo, no de infracciones de tránsito, que se gestiona en itvcordoba.com.ar.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto si tengo multas de la Policía Caminera de Córdoba?',
        a: 'Ingresando la patente, el DNI del titular o el número de acta en el portal de Rentas Córdoba. Nuestro buscador hace esa consulta por vos y te devuelve el resultado en segundos.',
      },
      {
        q: '¿Cuánto puedo ahorrar si pago rápido?',
        a: 'Rentas Córdoba ofrece un 50% de descuento si pagás dentro de los 10 días hábiles desde que se labró el acta (Pago Voluntario). Pasado ese plazo, la multa se abona por el monto total.',
      },
      {
        q: '¿Las multas de Córdoba prescriben?',
        a: 'Sí, pero el plazo depende de si la infracción es leve o grave y de si hubo notificaciones que interrumpieron el cómputo, así que no conviene asumir que una multa vieja ya prescribió sin confirmarlo antes en Rentas Córdoba o con un profesional.',
      },
      {
        q: '¿Cómo hago un descargo si no estoy de acuerdo con la multa?',
        a: 'Dentro de los 10 días hábiles desde el acta, ingresando a transito.cba.gov.ar con Clave Ciudadano Digital nivel 2. Pasado ese plazo, el reclamo debe tramitarse por otras vías.',
      },
      {
        q: '¿La multa de la Municipalidad de Córdoba es lo mismo que la de la Policía Caminera?',
        a: 'No. La Caminera es una fuerza provincial que labra actas en rutas y autopistas, gestionadas por Rentas Córdoba. Las fotomultas e infracciones dentro del ejido urbano las gestiona la Municipalidad de Córdoba por separado.',
      },
      {
        q: '¿La ITV de Córdoba tiene algo que ver con las multas?',
        a: 'No, son trámites distintos. La ITV (Inspección Técnica Vehicular) es un control técnico obligatorio del auto (frenos, luces, emisiones) que se gestiona en itvcordoba.com.ar. Las multas son infracciones de tránsito y se gestionan en Rentas Córdoba.',
      },
    ],
    relatedGuides: [
      { title: 'Multas ANSV / SINAI a nivel nacional', url: '/consultar-multa/multas-ansv-sinai', description: 'Consultá infracciones de rutas nacionales y de otras provincias adheridas al sistema federal.' },
      { title: 'Verificación Técnica Vehicular (VTV) en Argentina', url: '/guias/verificacion-tecnica-vehicular-vtv-argentina', description: 'Todo sobre la VTV/ITV: vencimientos, plantas habilitadas y qué se controla en cada revisión.' },
      { title: 'Calculadora de costos de transferencia', url: '/calculadora-de-costos-de-transferencia', description: 'Estimá cuánto vas a pagar de sellos, gestoría e informes antes de transferir un auto.' },
    ],
  },

  'multas-santa-fe': {
    seoTitle: 'Multas Santa Fe por Patente: Juzgado Virtual | carChecking',
    seoDescription: 'Consultá multas de la Policía Vial de Santa Fe en el Juzgado Virtual provincial por patente. Resultado inmediato, sin cuenta ni trámites presenciales.',
    seoKeywords: 'multas santa fe, juzgado virtual santa fe, consultar multas patente santa fe, policia vial santa fe',
    intro: 'Consultamos el Juzgado Virtual de la provincia de Santa Fe por vos, en tiempo real y sin necesidad de crear una cuenta: infracciones de la Policía Vial en rutas y autopistas provinciales, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Qué es el Juzgado Virtual de Santa Fe',
        body: 'El Juzgado Virtual es la herramienta oficial de la provincia de Santa Fe para consultar infracciones de tránsito provinciales, reimprimir notificaciones y generar cupones de pago en cualquier instancia del trámite. Se accede desde santafe.gov.ar/juzgadovirtual buscando por patente o por los datos del acta, sin necesidad de crear una cuenta para la consulta.',
      },
      {
        title: 'Quién labra estas infracciones: la Policía Vial provincial',
        body: 'Las actas que aparecen en el Juzgado Virtual corresponden a infracciones labradas por la Policía Vial de la provincia en rutas y autopistas provinciales y nacionales dentro del territorio santafesino. Es un sistema exclusivamente provincial: no incluye multas municipales, que cada ciudad gestiona por su cuenta.',
      },
      {
        title: 'Santa Fe capital y Rosario tienen sistemas propios',
        body: 'Ni la ciudad de Santa Fe ni Rosario vuelcan sus infracciones municipales al Juzgado Virtual provincial. La ciudad de Santa Fe tiene su propio Tribunal Municipal de Faltas (tribunalweb.santafeciudad.gov.ar), y Rosario gestiona sus fotomultas y actas de la Guardia Urbana Municipal a través de su propio portal (rosario.gob.ar). Para chequear un vehículo que circuló en cualquiera de esas dos ciudades, conviene consultar los tres registros por separado: el provincial y los dos municipales.',
      },
      {
        title: 'Cómo pagar y el descuento por pago voluntario',
        body: 'El Juzgado Virtual permite generar un cupón de pago en cualquier momento del proceso, y ese cupón muestra el descuento por pago voluntario vigente para tu infracción particular. Lo importante es pagar antes de que la causa pase a un Juzgado de Faltas habilitado: presentarte ante un juzgado hace perder el beneficio del pago voluntario. Podés abonar el cupón en sucursales del Nuevo Banco de Santa Fe, Rapipago, Pago Fácil o por home banking a través de la red Link.',
      },
      {
        title: 'Verificar multas de Santa Fe antes de comprar un auto usado',
        body: 'Las multas quedan registradas contra la patente, así que una infracción sin pagar puede complicar la transferencia de un usado aunque el nuevo dueño no haya cometido la falta. Antes de cerrar una compra de un vehículo radicado en la provincia, conviene revisar el Juzgado Virtual provincial y, si el auto circuló en Santa Fe capital o Rosario, también el registro municipal correspondiente.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto mis multas en el Juzgado Virtual de Santa Fe?',
        a: 'Ingresando la patente del vehículo (o los datos del acta) en santafe.gov.ar/juzgadovirtual. Nuestro buscador hace esa consulta por vos y te muestra el resultado en menos de un minuto.',
      },
      {
        q: '¿El Juzgado Virtual muestra también las multas de mi ciudad?',
        a: 'No necesariamente. El Juzgado Virtual es un sistema provincial que cubre infracciones de la Policía Vial en rutas. Santa Fe capital y Rosario tienen sus propios registros municipales, separados de este sistema.',
      },
      {
        q: '¿Hay descuento por pagar rápido?',
        a: 'Sí, existe un descuento por pago voluntario, pero el porcentaje exacto se define infracción por infracción y se muestra al generar el cupón de pago, así que no hay un número fijo válido para todos los casos.',
      },
      {
        q: '¿Las multas de Santa Fe prescriben?',
        a: 'Según la normativa de faltas de tránsito de la provincia, las infracciones leves prescriben en plazos más cortos que las graves, salvo que una notificación válida haya interrumpido el cómputo. Ante una multa vieja, conviene confirmar el estado puntual en el Juzgado Virtual antes de asumir que ya prescribió.',
      },
      {
        q: '¿Cómo impugno una multa del Juzgado Virtual?',
        a: 'Presentándote ante un Juzgado de Faltas habilitado dentro del plazo de la notificación. Tené en cuenta que esa presentación hace perder el descuento por pago voluntario, así que conviene evaluar antes si te conviene pagar o discutir la infracción.',
      },
      {
        q: 'Compré un auto de Rosario, ¿sus multas aparecen en el Juzgado Virtual?',
        a: 'No. Rosario tiene un sistema municipal propio, independiente del Juzgado Virtual provincial. Para un chequeo completo hay que consultar ambos registros por separado.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en Rosario por patente', url: '/consultar-multa/multas-rosario', description: 'El sistema municipal de fotomultas y Guardia Urbana de Rosario, separado del Juzgado Virtual provincial.' },
      { title: 'Multas ANSV / SINAI a nivel nacional', url: '/consultar-multa/multas-ansv-sinai', description: 'Consultá infracciones de rutas nacionales y de otras provincias adheridas al sistema federal.' },
      { title: 'Informe de dominio de un auto en Argentina', url: '/guias/informe-de-dominio-auto-argentina-caba-gba', description: 'Qué muestra un informe de dominio y por qué conviene pedirlo antes de comprar un usado.' },
    ],
  },

  'multas-rosario': {
    seoTitle: 'Multas en Rosario por Patente: Fotomultas, GUM y Juzgados | carChecking',
    seoDescription: 'Consultá fotomultas e infracciones de la Guardia Urbana Municipal de Rosario por patente. Resultado en segundos, con info sobre descuentos y cómo impugnar.',
    seoKeywords: 'multas rosario, fotomultas rosario, consultar multas patente rosario, guardia urbana municipal rosario, multas rosario gob ar',
    intro: 'Consultamos el portal de la Municipalidad de Rosario por vos, en tiempo real y sin necesidad de crear una cuenta: fotomultas, Guardia Urbana Municipal y juzgados de tránsito, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas en Rosario',
        body: 'La Municipalidad de Rosario centraliza las infracciones a través de la Dirección de Tránsito y la Guardia Urbana Municipal (GUM). Las fotomultas son capturadas por cámaras de velocidad y semáforos instalados en los principales corredores viales: Bulevar Oroño, Avenida Pellegrini, Av. Francia y los accesos a la ciudad. Las infracciones quedan registradas a nombre del titular del vehículo.',
      },
      {
        title: 'Fotomultas en Rosario: cómo funcionan',
        body: 'El sistema de fotomultas de Rosario registra infracciones de velocidad y cruce en rojo de forma automática, con puntos de control fijos y móviles distribuidos en los corredores de mayor tránsito. La notificación llega al titular del vehículo por carta certificada y también podés consultarla online ingresando la patente en el portal municipal. Las multas se valúan en Unidades Fijas (UF), equivalentes al precio de un litro de nafta súper, cuyo valor en pesos se actualiza periódicamente.',
      },
      {
        title: 'Cómo pagar una multa en Rosario',
        body: 'Podés abonar online en el portal de la Municipalidad de Rosario (rosario.gob.ar/gdm), o presencialmente en Munipagos, Santa Fe Servicios y Pago Fácil. El Pago Voluntario da hasta un 50% de descuento sobre el valor mínimo de la multa si la pagás de contado dentro del plazo que indica la notificación; pasado ese plazo, se abona sin beneficio o la infracción pasa a instancia judicial. Para infracciones ya juzgadas también existen planes de hasta 24 cuotas, sin interés en las primeras 10.',
      },
      {
        title: 'Rosario y el sistema provincial de Santa Fe',
        body: 'Rosario tiene un registro municipal independiente del Juzgado Virtual de la provincia de Santa Fe. Una infracción labrada dentro del ejido urbano de Rosario va al sistema municipal; una labrada por la Policía Vial en rutas y autopistas provinciales va al Juzgado Virtual provincial. Para una verificación completa de un vehículo rosarino, conviene consultar ambos registros por separado.',
      },
      {
        title: 'Verificar multas de Rosario antes de comprar un auto usado',
        body: 'Como las infracciones quedan registradas en el dominio del vehículo, la deuda acompaña al auto aunque cambie de titular. Antes de comprar un usado en Rosario, verificá las fotomultas municipales, las infracciones provinciales y la situación registral del dominio. El propio municipio emite un certificado de Libre Multa para quien no tiene infracciones pendientes, aunque tiene una validez corta (10 días hábiles), así que conviene pedirlo cerca de la fecha de la operación.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto si tengo multas en Rosario?',
        a: 'Ingresando la patente del vehículo, o tu DNI/CUIT, en el portal de la Municipalidad de Rosario. Nuestro buscador hace esa consulta por vos y te devuelve el resultado en menos de un minuto.',
      },
      {
        q: '¿Cuánto puedo ahorrar pagando rápido?',
        a: 'El Pago Voluntario ofrece hasta un 50% de descuento sobre el valor mínimo de la multa si pagás de contado dentro del plazo indicado en la notificación. Una vez vencido ese plazo, se pierde el beneficio.',
      },
      {
        q: '¿La multa queda a nombre del titular del vehículo o de quien manejaba?',
        a: 'Se registra contra la patente y a nombre del titular registral, salvo que se identifique y acredite a otro conductor. Por eso una deuda de gestiones anteriores puede seguir apareciendo aunque el auto ya haya cambiado de dueño.',
      },
      {
        q: '¿El sistema de Rosario es el mismo que el de la provincia de Santa Fe?',
        a: 'No. Rosario tiene un registro municipal propio, separado del Juzgado Virtual provincial. Una infracción labrada dentro del ejido urbano de Rosario va al sistema municipal; una labrada por la Policía Vial en rutas provinciales va al Juzgado Virtual. Conviene revisar los dos si el auto circuló fuera de la ciudad.',
      },
      {
        q: '¿Dónde están las cámaras de fotomultas en Rosario?',
        a: 'Los puntos de control, fijos y móviles, se concentran en los corredores de mayor tránsito: Bulevar Oroño, Avenida Pellegrini, Av. Francia y los principales accesos a la ciudad, detectando exceso de velocidad y cruces en rojo.',
      },
      {
        q: '¿Cómo impugno una multa de Rosario?',
        a: 'Presentando un descargo online, con fotos o documentación que lo respalde, dentro del plazo de la notificación; lo resuelve el Juez de Faltas. Tené en cuenta que presentar un descargo te hace perder el beneficio del Pago Voluntario, así que conviene evaluar antes si te conviene pagar con descuento o disputar la infracción.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en el Juzgado Virtual de Santa Fe', url: '/consultar-multa/multas-santa-fe', description: 'El sistema provincial que cubre infracciones de la Policía Vial en rutas, separado del registro municipal de Rosario.' },
      { title: 'Multas ANSV / SINAI a nivel nacional', url: '/consultar-multa/multas-ansv-sinai', description: 'Consultá infracciones de rutas nacionales y de otras provincias adheridas al sistema federal.' },
      { title: 'Calculadora de costos de transferencia', url: '/calculadora-de-costos-de-transferencia', description: 'Estimá cuánto vas a pagar de sellos, gestoría e informes antes de transferir un auto en Rosario.' },
    ],
  },

  'multas-mendoza': {
    seoTitle: 'Multas en Mendoza Ciudad por Patente | Juzgados de Tránsito | carChecking',
    seoDescription: 'Consultá multas de los Juzgados Municipales de Tránsito de Mendoza Ciudad por patente en el portal APEX. Resultado al instante, sin turno ni registro.',
    seoKeywords: 'multas mendoza, multas mendoza capital, apex ciudad de mendoza, juzgados de transito mendoza, consultar multas por patente mendoza',
    intro: 'Consultamos el portal APEX de la Municipalidad Ciudad de Mendoza por vos, en tiempo real y sin necesidad de crear una cuenta: infracciones labradas por los Juzgados Municipales de Tránsito dentro del ejido capitalino, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas en Mendoza Ciudad',
        body: 'Dentro del ejido de la Ciudad de Mendoza, las infracciones de tránsito las labra la Unidad de Juzgados Municipales de Tránsito y se gestionan a través del sistema APEX (apex.ciudaddemendoza.gov.ar), una plataforma Oracle APEX operada por la Municipalidad. Este registro es independiente del que lleva la Policía Caminera provincial: cubre exclusivamente las infracciones urbanas detectadas dentro de la capital, ya sea por control de agentes de tránsito o por cámaras de fotomulta.',
      },
      {
        title: 'Fotomultas y corredores con más controles',
        body: 'Los accesos Norte, Sur y Este de la Ciudad de Mendoza concentran los principales puntos de control con cámaras de velocidad. El límite general en zona urbana es de 60 km/h, que baja a 30 km/h en inmediaciones de escuelas. Las infracciones más comunes son exceso de velocidad, mal estacionamiento y cruce en semáforo en rojo, y quedan registradas a nombre del titular del vehículo.',
      },
      {
        title: 'Descuento por pago voluntario y plazos',
        body: 'Quien paga la multa dentro de los 3 días hábiles posteriores a la infracción accede a un descuento del 40% sobre el monto, según el propio régimen municipal. El pago puede hacerse online desde el portal APEX o en efectivo en entidades habilitadas (bancos Nación, Supervielle, HSBC, Patagonia, Credicoop, Macro, San Juan, además de Rapipago, Pago Fácil, Bolsa de Comercio y Montemar).',
      },
      {
        title: 'Cómo presentar un descargo o apelar',
        body: 'El descargo debe presentarse dentro de los 5 días hábiles de labrada el acta, enviando por email a unidad.juzgados@ciudaddemendoza.gov.ar la documentación en PDF: licencia de conducir, cédula verde, seguro vigente, DNI y las pruebas que respalden el reclamo. Si la resolución del juzgado es desfavorable, se puede apelar dentro de los 3 días hábiles de notificado, acreditando el pago total de la multa.',
      },
      {
        title: 'Atención y consultas',
        body: 'La Unidad de Juzgados de Tránsito atiende en Av. San Martín 188, de lunes a viernes de 8:30 a 13:30, por teléfono al (0261) 4495-329/4495-331 o por email. Es el canal indicado para pedir reimpresión de boletas de pago o aclarar el estado de una infracción que no coincide con lo que figura en el sistema.',
      },
    ],
    faq: [
      {
        q: '¿El portal APEX cubre toda la provincia de Mendoza?',
        a: 'No. APEX (apex.ciudaddemendoza.gov.ar) es el sistema de la Municipalidad Ciudad de Mendoza y solo registra infracciones labradas por los Juzgados Municipales de Tránsito dentro del ejido capitalino. Las infracciones en rutas provinciales, a cargo de la Policía Caminera, se consultan en un sistema totalmente distinto (sistemas.seguridad.mendoza.gov.ar).',
      },
      {
        q: '¿Puedo tener multas en Mendoza Ciudad y no tener ninguna en Caminera?',
        a: 'Sí. Son dos registros independientes que no se cruzan entre sí. Un auto puede estar limpio en uno de los sistemas y tener infracciones pendientes en el otro, así que conviene revisar los dos antes de comprar o vender un vehículo.',
      },
      {
        q: '¿Cuánto descuento tengo si pago rápido?',
        a: 'El régimen municipal prevé un 40% de descuento sobre el monto de la multa si se paga dentro de los 3 días hábiles posteriores a la infracción.',
      },
      {
        q: '¿Cómo hago el descargo si no estoy de acuerdo con la multa?',
        a: 'Tenés 5 días hábiles desde labrada el acta para enviar el descargo por email a unidad.juzgados@ciudaddemendoza.gov.ar, adjuntando en PDF tu licencia, cédula verde, seguro, DNI y la prueba que respalde tu reclamo.',
      },
      {
        q: '¿Qué pasa si la multa está a nombre del dueño anterior del auto?',
        a: 'La infracción queda registrada a nombre de quien figuraba como titular en el momento del hecho. Por eso es clave verificar la patente antes de una compraventa: una deuda de multas puede complicar la transferencia o quedar en discusión con el vendedor.',
      },
      {
        q: '¿Dónde reclamo o pido una reimpresión de boleta?',
        a: 'En la Unidad de Juzgados de Tránsito, Av. San Martín 188, de lunes a viernes de 8:30 a 13:30, o al (0261) 4495-329/4495-331.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en Mendoza Caminera (rutas provinciales)', url: '/consultar-multa/multas-mendoza-caminera', description: 'Consultá infracciones de la Policía Caminera en rutas provinciales, un registro separado del municipal.' },
      { title: '¿Cómo saber si un auto tiene deuda de patentes?', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Guía para verificar deudas patrimoniales antes de comprar un vehículo usado.' },
      { title: 'Calculadora de costos de transferencia', url: '/calculadora-de-costos-de-transferencia', description: 'Estimá los gastos de transferencia antes de cerrar la compra.' },
    ],
  },

  'multas-mendoza-caminera': {
    seoTitle: 'Multas Policía Caminera Mendoza por Patente | carChecking',
    seoDescription: 'Consultá infracciones de la Policía Caminera de Mendoza en rutas provinciales por patente. Sistema independiente del municipal, resultado al instante.',
    seoKeywords: 'multas caminera mendoza, policia caminera mendoza multas, webvialcaminera, multas rutas provinciales mendoza, consultar multas por patente',
    intro: 'Consultamos el sistema de la Policía Caminera de Mendoza por vos, en tiempo real y sin necesidad de crear una cuenta: infracciones labradas en rutas provinciales por el Ministerio de Seguridad, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas de Caminera',
        body: 'Las infracciones en rutas provinciales de Mendoza están a cargo de la Policía Caminera, dependiente del Ministerio de Seguridad de la Provincia. El registro se gestiona a través del sistema webvialcaminera (sistemas.seguridad.mendoza.gov.ar), completamente separado del sistema APEX que usa la Municipalidad Ciudad de Mendoza para las infracciones urbanas. Un mismo vehículo puede tener historial en un sistema y no en el otro: no son bases de datos unificadas.',
      },
      {
        title: 'Qué cubre y qué no cubre este registro',
        body: 'Caminera controla la circulación en las rutas provinciales que conectan los departamentos y oasis productivos de Mendoza, por fuera del ejido de las ciudades cabecera. Las infracciones urbanas dentro de cada municipio, en cambio, las labran los juzgados de tránsito locales (como el de Ciudad de Mendoza) y se consultan en sus propios portales, no en este sistema.',
      },
      {
        title: 'Cómo pagar una multa de Caminera',
        body: 'El pago se realiza desde el propio sistema online (sistemas.seguridad.mendoza.gov.ar/webvialcaminera), donde se puede consultar el comprobante de deuda y abonar con financiación en tarjeta de crédito. Si necesitás un plan de pagos, hay que solicitarlo por email a la Unidad de Resoluciones Viales (URV) que corresponda a la zona de la infracción: Gran Mendoza Norte, Gran Mendoza Sur, Zona Este, Valle de Uco, San Rafael, General Alvear o Malargüe.',
      },
      {
        title: 'Consultas y gestión de planes de pago',
        body: 'Para dudas generales o para gestionar un plan de pagos, el Ministerio de Seguridad atiende por email en gestionmulta-seg@mendoza.gov.ar o por teléfono al 0800 800 84256. Cada URV regional tiene su propia casilla de correo, por lo que conviene dirigirse a la que corresponde al departamento donde ocurrió la infracción.',
      },
    ],
    faq: [
      {
        q: '¿Mendoza Caminera es lo mismo que Mendoza Ciudad?',
        a: 'No. Son dos sistemas independientes. Caminera (Policía Caminera, Ministerio de Seguridad) registra infracciones en rutas provinciales; Mendoza Ciudad (APEX, Municipalidad) registra infracciones urbanas dentro del ejido capitalino. No comparten base de datos.',
      },
      {
        q: '¿Puede un auto tener multas en Caminera y estar limpio en el sistema municipal?',
        a: 'Sí, y también puede darse al revés. Por eso, para revisar el historial completo de un vehículo conviene consultar ambos sistemas por separado.',
      },
      {
        q: '¿Hay descuento por pago voluntario en Caminera?',
        a: 'El sistema permite pagar con financiación en tarjeta de crédito y solicitar planes de pago por zona a través de la URV correspondiente. No hay, por el momento, un porcentaje de descuento por pronto pago confirmado públicamente para este régimen, a diferencia del sistema municipal.',
      },
      {
        q: '¿Cómo pido un plan de pagos?',
        a: 'Por email a la Unidad de Resoluciones Viales (URV) de la zona donde se labró la infracción (Gran Mendoza Norte, Gran Mendoza Sur, Zona Este, Valle de Uco, San Rafael, General Alvear o Malargüe), o consultando al 0800 800 84256.',
      },
      {
        q: '¿Qué rutas cubre la Policía Caminera?',
        a: 'Las rutas provinciales que conectan los distintos departamentos y oasis de Mendoza, por fuera de las zonas urbanas de cada municipio, que tienen sus propios juzgados de tránsito.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en Mendoza Ciudad (Juzgados de Tránsito)', url: '/consultar-multa/multas-mendoza', description: 'Consultá infracciones urbanas del sistema APEX municipal, un registro separado de Caminera.' },
      { title: 'Verificación Técnica Vehicular (VTV) en Argentina', url: '/guias/verificacion-tecnica-vehicular-vtv-argentina', description: 'Todo lo que necesitás saber antes de la revisión técnica obligatoria.' },
      { title: 'Solicitar turno para inspección', url: '/solicitar-turno', description: 'Pedí tu turno de inspección pre-compra con carChecking.' },
    ],
  },

  'multas-salta': {
    seoTitle: 'Multas en Salta Capital por Patente | DGR Salta | carChecking',
    seoDescription: 'Consultá el historial de multas de tránsito de Salta Capital por patente en el sistema de la DGR Municipal. Resultado al instante, sin turno ni cuenta.',
    seoKeywords: 'multas salta, multas salta capital, dgr salta multas, historial multas transito salta, consultar multas por patente salta',
    intro: 'Consultamos el historial de multas de tránsito de la Dirección General de Rentas Municipal de Salta por vos, en tiempo real y sin necesidad de crear una cuenta: infracciones labradas por el Tribunal de Faltas de la Ciudad de Salta, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas en Salta Capital',
        body: 'En la Ciudad de Salta, las infracciones de tránsito las resuelve el Tribunal de Faltas Municipal, pero el historial de deuda y la emisión de boletas se gestionan a través de la Dirección General de Rentas Municipal (DGR), en rentas.dgrmsalta.gov.ar/automotores/emision-boletas/historial-multas-transito. Ahí se puede ver el detalle de las infracciones asociadas a una patente y reimprimir el comprobante para pagar.',
      },
      {
        title: 'Un sistema distinto al de rutas nacionales',
        body: 'Este registro cubre infracciones de tránsito dentro del ejido de la Ciudad de Salta. Las infracciones detectadas en rutas nacionales por Gendarmería o registradas por la ANSV se consultan aparte, en el sistema federal SINAI. Antes de dar por cerrado el historial de un vehículo que circuló fuera de la capital, conviene revisar también ese registro nacional.',
      },
      {
        title: 'Descuento por pago voluntario',
        body: 'Quien paga la multa dentro del plazo de pago voluntario indicado en la notificación accede a un descuento del 50% sobre el monto de la infracción. Pasado ese plazo, se pierde el beneficio y se abona el valor pleno de la boleta.',
      },
      {
        title: 'Cómo pagar una multa en Salta',
        body: 'El pago puede hacerse en las cajas municipales, en Banco Macro, Rapipago, Pago Fácil o Mercado Pago, con débito o efectivo. También se acepta tarjeta de crédito Visa exclusivamente en cajas municipales, con la opción de financiar hasta en 12 cuotas o pagar en un solo pago sin interés.',
      },
      {
        title: 'Cómo hacer un descargo',
        body: 'Si no estás de acuerdo con la infracción, podés presentar un descargo por escrito ante el Tribunal de Faltas de la Ciudad de Salta (Paraguay 1240), citando el número de acta, el nombre del titular, la patente y el DNI o CUIT, bajo la referencia "Descargo de Acta de Infracción". Para consultas sobre puntos de pago o trámites también se puede escribir por WhatsApp al 3876 34-8845.',
      },
    ],
    faq: [
      {
        q: '¿Dónde consulto si tengo multas en Salta Capital?',
        a: 'En el portal de la Dirección General de Rentas Municipal, rentas.dgrmsalta.gov.ar/automotores/emision-boletas/historial-multas-transito, ingresando la patente del vehículo.',
      },
      {
        q: '¿Cuánto descuento tengo si pago rápido?',
        a: 'Un 50% sobre el monto de la infracción, siempre que el pago se realice dentro del plazo de pago voluntario indicado en la notificación.',
      },
      {
        q: '¿Las multas de ruta nacional aparecen en este sistema?',
        a: 'No. Este registro cubre infracciones dentro del ejido de la Ciudad de Salta. Las multas en rutas nacionales, labradas por Gendarmería o registradas por la ANSV, se consultan en el sistema federal SINAI.',
      },
      {
        q: '¿Cómo pago una multa en Salta?',
        a: 'En cajas municipales, Banco Macro, Rapipago, Pago Fácil o Mercado Pago con débito o efectivo, o con tarjeta Visa en cajas municipales (hasta 12 cuotas o un pago sin interés).',
      },
      {
        q: '¿Cómo presento un descargo?',
        a: 'Por escrito ante el Tribunal de Faltas de la Ciudad de Salta (Paraguay 1240), indicando número de acta, titular, patente y DNI/CUIT, bajo la referencia "Descargo de Acta de Infracción".',
      },
      {
        q: '¿Las multas prescriben?',
        a: 'Sí. Las infracciones leves prescriben en plazos más cortos y las graves en plazos mayores, pero la prescripción no borra el registro automáticamente: conviene verificar el estado real de la patente antes de una compraventa.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en el sistema federal ANSV/SINAI', url: '/consultar-multa/multas-ansv-sinai', description: 'Consultá infracciones en rutas nacionales controladas por Gendarmería, Prefectura y Policía Federal.' },
      { title: '¿Cómo saber si un auto tiene deuda de patentes?', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Guía para verificar deudas patrimoniales antes de comprar un vehículo usado.' },
      { title: 'Calculadora de costos de transferencia', url: '/calculadora-de-costos-de-transferencia', description: 'Estimá los gastos de transferencia antes de cerrar la compra.' },
    ],
  },

  'multas-neuquen': {
    seoTitle: 'Fotomultas en Neuquén por Patente | Municipalidad de Neuquén | carChecking',
    seoDescription: 'Consultá el sistema de fotomultas de la Municipalidad de Neuquén por patente. Infracciones de velocidad y semáforo detectadas por cámaras, resultado al instante.',
    seoKeywords: 'fotomultas neuquen, multas neuquen capital, consultar patente neuquen, camaras fotomulta neuquen, multas por patente',
    intro: 'Consultamos el sistema de fotomultas de la Municipalidad de Neuquén por vos, en tiempo real y sin necesidad de crear una cuenta: infracciones de velocidad y semáforo detectadas por cámaras en los corredores viales de la ciudad, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Qué es el sistema de fotomulta en Neuquén',
        body: 'La Municipalidad de Neuquén opera un sistema de fotomulta que registra exclusivamente infracciones detectadas por cámaras: exceso de velocidad y cruce en semáforo en rojo. No incluye infracciones labradas manualmente por agentes de tránsito ni actas de otros juzgados: es un registro específico para lo que capta la red de cámaras municipal, con alrededor de 200 dispositivos distribuidos por la ciudad.',
      },
      {
        title: 'Dónde están las cámaras',
        body: 'El centro de Neuquén capital concentra la mayor densidad de semáforos con cámara. La Avenida Mosconi tiene controles en buena parte de su traza, en cruces como Saturnino Torres, Linares, Winter, La Pampa, Misiones, Saavedra y Chaco, entre otros. En sentido norte-sur hay cámaras sobre Avenida Olascoaga y Avenida Argentina, y en calles como Jujuy, Salta, Buenos Aires, Santa Fe, Tucumán y Entre Ríos. En el sector Este, los controles están sobre Alderete, Ministro Gonzáles, Alberdi, Rivadavia e Independencia.',
      },
      {
        title: 'Cómo consultar tu patente',
        body: 'El portal permite buscar por dominio (patente) o, si no lo recordás, por DNI o CUIL, en weblogin.neuquencapital.gov.ar/apps/foto-multa. Si el vehículo no tiene infracciones, el sistema lo indica directamente; si tiene, muestra las fotos tomadas por el dispositivo como respaldo de la infracción.',
      },
      {
        title: 'Descuento por pago voluntario',
        body: 'El sistema ofrece un 50% de descuento sobre el monto de la multa para quien opta por el pago voluntario y online, en lugar de esperar la notificación formal y el proceso administrativo completo.',
      },
      {
        title: 'Qué no cubre este sistema',
        body: 'Al ser un registro exclusivo de fotomulta, no incluye infracciones de tránsito labradas por inspectores en la vía pública, ni infracciones de otras jurisdicciones (rutas provinciales o nacionales). Para un panorama completo de un vehículo que circuló fuera del ejido municipal, conviene revisar también los registros correspondientes a esas otras jurisdicciones.',
      },
    ],
    faq: [
      {
        q: '¿Qué tipo de infracciones aparecen en el sistema de Neuquén?',
        a: 'Solo las detectadas por cámaras de fotomulta: exceso de velocidad y cruce de semáforo en rojo. No incluye multas labradas manualmente por inspectores ni infracciones de otras jurisdicciones.',
      },
      {
        q: '¿Cómo consulto si tengo una fotomulta en Neuquén?',
        a: 'Ingresando tu patente (o DNI/CUIL si no la recordás) en el portal de la Municipalidad de Neuquén, weblogin.neuquencapital.gov.ar/apps/foto-multa. Si hay infracción, el sistema muestra las fotos tomadas por la cámara.',
      },
      {
        q: '¿Cuánto descuento tengo si pago voluntariamente?',
        a: 'El sistema ofrece un 50% de descuento sobre el monto de la multa para quien elige el pago voluntario online.',
      },
      {
        q: '¿Dónde están las cámaras de fotomulta en Neuquén?',
        a: 'La mayor concentración está en el centro de la ciudad, con controles sobre la Avenida Mosconi, Avenida Olascoaga, Avenida Argentina y varias calles del sector Este como Alderete, Alberdi y Rivadavia. En total, la red municipal cuenta con alrededor de 200 dispositivos.',
      },
      {
        q: '¿Esta consulta cubre multas de la Policía o de rutas provinciales?',
        a: 'No. El sistema de fotomulta de la Municipalidad de Neuquén es independiente y cubre únicamente lo detectado por sus propias cámaras dentro del ejido capitalino.',
      },
      {
        q: '¿Cómo contacto a la Municipalidad si tengo dudas sobre una fotomulta?',
        a: 'Podés comunicarte al (0299) 449-1200 o al 0800-222-6864 para consultas sobre el estado de una infracción o el proceso de pago.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en el sistema federal ANSV/SINAI', url: '/consultar-multa/multas-ansv-sinai', description: 'Consultá infracciones en rutas nacionales, fuera del alcance del sistema municipal de Neuquén.' },
      { title: '¿Cómo saber si un auto tiene deuda de patentes?', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Guía para verificar deudas patrimoniales antes de comprar un vehículo usado.' },
      { title: 'Solicitar turno para inspección', url: '/solicitar-turno', description: 'Pedí tu turno de inspección pre-compra con carChecking.' },
    ],
  },

  'multas-santa-rosa': {
    seoTitle: 'Multas en Santa Rosa (La Pampa): Consultá por Patente | carChecking',
    seoDescription: 'Consultá gratis las fotomultas de Santa Rosa, La Pampa por patente. Resultado directo del sistema municipal en menos de un minuto, sin registrarte.',
    seoKeywords: 'multas santa rosa, fotomultas santa rosa la pampa, consultar multas por patente santa rosa, juzgado de faltas santa rosa',
    intro: 'Consultamos el sistema de fotomultas de la Municipalidad de Santa Rosa por vos, en tiempo real y sin necesidad de crear una cuenta: infracciones captadas por cámaras de velocidad y semáforos en rutas, avenidas y la circunvalación de la ciudad, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas en Santa Rosa',
        body: 'El Juzgado Municipal de Faltas de Santa Rosa, con sede en Chile 702, es el organismo que procesa las infracciones de tránsito de la capital pampeana. Desde la puesta en marcha del sistema de fotomultas, las cámaras de velocidad y control de semáforos instaladas en rutas de acceso, avenidas y la circunvalación registran excesos de velocidad y otras infracciones, que quedan asentadas a nombre del titular registral del vehículo.',
      },
      {
        title: 'Cómo funciona el sistema de fotomultas',
        body: 'El municipio gestiona la consulta y notificación de infracciones a través del portal fotomultas.santarosa.gob.ar, donde se puede buscar por DNI del titular o por patente del vehículo. Además del control automático por cámaras, Santa Rosa habilitó la aplicación "Santa Rosa Foto Multa" para que los vecinos reporten infracciones de estacionamiento indebido (espacios para personas con discapacidad, doble fila, garajes) y arrojo de residuos en la vía pública, que también terminan derivando en actas del Juzgado de Faltas.',
      },
      {
        title: 'Cómo pagar y descargos',
        body: 'El pago voluntario dentro del plazo que indica la notificación puede acceder a un descuento sobre el monto original, según lo previsto en el Código de Faltas municipal; pasado ese plazo la deuda se actualiza con recargos. Los canales de pago habilitados incluyen Pago Fácil, Rapipago, Pampa Pagos y las cajas municipales (Juzgado de Faltas, Dirección de Rentas en Alsina 120, o el Hall Central en San Martín 50). Si considerás que la infracción está mal labrada, podés presentar un descargo ante el Juzgado Municipal de Faltas dentro de los días hábiles indicados en el acta de notificación.',
      },
      {
        title: 'Impacto en la transferencia del vehículo',
        body: 'Las multas municipales pendientes de Santa Rosa no siempre bloquean de forma automática un trámite de transferencia en el Registro del Automotor, pero conviene regularizarlas antes de vender o comprar un vehículo: quien verifica la patente puede encontrarse con actas de fotomultas o de estacionamiento a nombre del titular anterior, y conviene resolverlas antes de cerrar la operación.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas en Santa Rosa por patente?',
        a: 'Ingresá la patente en el buscador y seleccioná Santa Rosa. Consultamos en tiempo real el portal de fotomultas de la Municipalidad y te mostramos las infracciones registradas a nombre del vehículo, gratis y sin necesidad de crear una cuenta.',
      },
      {
        q: '¿Qué son las fotomultas de Santa Rosa?',
        a: 'Son infracciones detectadas por cámaras de velocidad y de control semafórico instaladas en rutas de acceso, avenidas y la circunvalación de la ciudad, procesadas por el Juzgado Municipal de Faltas.',
      },
      {
        q: '¿Hay descuento por pago voluntario?',
        a: 'El Código de Faltas municipal prevé una reducción del monto para quien paga dentro del plazo indicado en la notificación. El porcentaje y el plazo exacto figuran en cada acta, así que conviene revisarlos antes de pagar.',
      },
      {
        q: '¿Puedo impugnar una fotomulta de Santa Rosa?',
        a: 'Sí. El descargo se presenta ante el Juzgado Municipal de Faltas (Chile 702) dentro del plazo indicado en la notificación del acta.',
      },
      {
        q: '¿Las multas de Santa Rosa afectan la transferencia del auto?',
        a: 'Pueden no bloquear el trámite en el Registro Automotor de forma directa, pero es recomendable resolverlas antes de comprar o vender, para evitar reclamos posteriores sobre infracciones a nombre del titular anterior.',
      },
    ],
    relatedGuides: [
      { title: 'Multas ANSV / SINAI', url: '/consultar-multa/multas-ansv-sinai', description: 'Consultá infracciones nacionales y de otras provincias que usan el sistema SINAI.' },
      { title: 'Cómo saber si un auto tiene deuda de patentes', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Guía para verificar deudas patrimoniales antes de comprar o vender un vehículo.' },
      { title: 'Calculadora de costos de transferencia', url: '/calculadora-de-costos-de-transferencia', description: 'Estimá el costo total de transferir un vehículo en Argentina.' },
    ],
  },

  'multas-corrientes': {
    seoTitle: 'Multas en Corrientes: Consultá Fotomultas por Patente | carChecking',
    seoDescription: 'Consultá gratis las fotomultas de Corrientes Capital por patente en el sistema SIGEIN. Resultado directo en menos de un minuto, sin crear cuenta.',
    seoKeywords: 'multas corrientes, sigein corrientes, fotomultas corrientes capital, consultar multas por patente corrientes',
    intro: 'Consultamos el sistema SIGEIN de la Municipalidad de Corrientes Capital por vos, en tiempo real y sin necesidad de crear una cuenta: fotomultas y actas de tránsito, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas en Corrientes Capital',
        body: 'El Juzgado de Faltas de Corrientes, con sede en Mendoza 709, gestiona las infracciones de tránsito de la ciudad a través de la plataforma SIGEIN (corrientes.sigein.net), un sistema que -según su propia definición- cubre "fotomultas exclusivamente" dentro del ejido municipal. Las actas quedan registradas a nombre del titular del vehículo y pueden consultarse por patente o por documento (DNI, LC, LE, CI, CUIT o pasaporte).',
      },
      {
        title: 'Cómo pagar una multa en Corrientes',
        body: 'Las infracciones pueden abonarse en efectivo, con tarjetas de crédito (Visa, Mastercard, American Express, Cabal, Argencard, hasta 6 cuotas sin interés) o débito, en la Caja Municipal de Préstamos (Brasil 1251), el Palacio Municipal (25 de Mayo 1132), el Centro Emisor de Licencias o ACOR (Av. La Paz 2440). También se puede pagar por homebanking o transferencia a través de acor.gob.ar, o con Pago Fácil presentando el comprobante impreso.',
      },
      {
        title: 'Descuento por pago voluntario y descargos',
        body: 'La Municipalidad de Corrientes confirma en su propio sitio que las infracciones sujetas a pago voluntario tienen un descuento del 50% cuando se abonan dentro de los plazos que fija la normativa vigente. El portal SIGEIN también permite descargar la boleta, solicitar turno para el juzgado y presentar el descargo online si se quiere disputar el acta.',
      },
      {
        title: 'SIGEIN municipal vs. otros sistemas de la provincia',
        body: 'SIGEIN es la plataforma que utiliza puntualmente el Juzgado de Faltas de Corrientes Capital para las fotomultas de la ciudad. Si el vehículo circula por rutas provinciales o por otros municipios de Corrientes, es posible que existan infracciones registradas en sistemas separados, por lo que conviene revisar también los canales de la Policía de la provincia o del municipio correspondiente antes de dar por cerrada la consulta.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas en Corrientes por patente?',
        a: 'Ingresá la patente en el buscador y seleccioná Corrientes. Consultamos en tiempo real el sistema SIGEIN de la Municipalidad de Corrientes Capital y te mostramos las fotomultas registradas, gratis y sin crear una cuenta.',
      },
      {
        q: '¿Qué es SIGEIN?',
        a: 'Es la plataforma de gestión de infracciones que usa el Juzgado de Faltas de Corrientes Capital para procesar y notificar las fotomultas detectadas dentro del municipio.',
      },
      {
        q: '¿Hay descuento por pago voluntario en Corrientes?',
        a: 'Sí, la Municipalidad confirma un descuento del 50% para infracciones sujetas a pago voluntario, siempre que se abonen dentro del plazo que establece la normativa vigente.',
      },
      {
        q: '¿SIGEIN cubre también infracciones de otros municipios de la provincia?',
        a: 'No necesariamente. corrientes.sigein.net corresponde puntualmente al Juzgado de Faltas de Corrientes Capital; otros municipios y la provincia pueden tener sistemas propios.',
      },
      {
        q: '¿Puedo pagar la multa con tarjeta?',
        a: 'Sí, la Municipalidad de Corrientes acepta Visa, Mastercard, American Express, Cabal y Argencard, con hasta 6 cuotas sin interés, además de efectivo, débito, homebanking y Pago Fácil.',
      },
    ],
    relatedGuides: [
      { title: 'Multas ANSV / SINAI', url: '/consultar-multa/multas-ansv-sinai', description: 'Consultá infracciones nacionales y de otras provincias que usan el sistema SINAI.' },
      { title: 'Cómo saber si un auto tiene deuda de patentes', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Guía para verificar deudas patrimoniales antes de comprar o vender un vehículo.' },
      { title: 'Calculadora de costos de transferencia', url: '/calculadora-de-costos-de-transferencia', description: 'Estimá el costo total de transferir un vehículo en Argentina.' },
    ],
  },

  'multas-entre-rios': {
    seoTitle: 'Multas en Entre Ríos: Consultá Monitoreo Vial por Patente | carChecking',
    seoDescription: 'Consultá gratis las infracciones de Monitoreo Vial Entre Ríos por patente, en toda la provincia. Resultado en menos de un minuto, sin crear cuenta.',
    seoKeywords: 'multas entre rios, monitoreo vial entre rios, consultar multas por patente entre rios, policia caminera entre rios',
    intro: 'Consultamos el sistema Monitoreo Vial de la Provincia de Entre Ríos por vos, en tiempo real y sin necesidad de crear una cuenta: infracciones de la Policía Caminera en rutas y accesos de toda la provincia, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Qué es Monitoreo Vial y quién lo administra',
        body: 'Monitoreo Vial es el sistema provincial que centraliza las infracciones de tránsito detectadas por la Policía de Entre Ríos, a través de su Departamento de Prevención y Seguridad Vial. A diferencia de un sistema municipal, cubre infracciones en toda la provincia: no solo la capital Paraná, sino también Concordia, Gualeguaychú, Concepción del Uruguay y el resto de los departamentos entrerrianos.',
      },
      {
        title: 'Rutas y corredores con mayor control',
        body: 'Entre Ríos conecta el litoral argentino con el Mercosur, y los controles más intensivos se concentran en la Ruta Nacional 14, la Ruta Provincial 11, los accesos a Paraná, Concordia y Gualeguaychú, y los pasos internacionales hacia Uruguay a través de los puentes Zárate-Brazo Largo y Gral. San Martín. El transporte de cargas recibe controles adicionales de documentación y peso.',
      },
      {
        title: 'Qué podés consultar además de multas',
        body: 'El sistema de Monitoreo Vial no se limita a infracciones de un vehículo puntual: también permite consultar si la licencia de conducir del titular tiene multas pendientes y el puntaje acumulado sobre la licencia, un dato relevante porque en Entre Ríos las infracciones repetidas pueden derivar en descuentos de puntos o suspensión.',
      },
      {
        title: 'Cómo pagar y dónde reclamar',
        body: 'Las infracciones pueden gestionarse en las oficinas de la Policía Caminera (sede central en Córdoba 641, Paraná, atención de lunes a viernes de 7:30 a 17, línea gratuita 0800-199-0006) o a través de los canales de pago habilitados: Nuevo Banco de Entre Ríos, Rapipago, Pago Fácil y opciones online. El pago dentro del plazo indicado en la notificación suele tener condiciones más favorables que el pago fuera de término, y los descargos se presentan ante la dependencia de la Caminera que labró el acta o ante el juzgado de faltas que corresponda.',
      },
    ],
    faq: [
      {
        q: '¿Qué es el sistema Monitoreo Vial de Entre Ríos?',
        a: 'Es la plataforma oficial de la Policía de Entre Ríos para registrar y consultar infracciones de tránsito detectadas en rutas y caminos de toda la provincia, no solo de una ciudad en particular.',
      },
      {
        q: '¿Esta consulta cubre solo Paraná o toda la provincia?',
        a: 'Cubre toda la provincia: Monitoreo Vial es un sistema provincial, por lo que incluye infracciones registradas en Paraná, Concordia, Gualeguaychú y el resto de los departamentos entrerrianos.',
      },
      {
        q: '¿Las multas de Entre Ríos afectan la transferencia del vehículo?',
        a: 'Sí, las infracciones provinciales pendientes pueden trabar trámites en el Registro del Automotor (DNRPA), por lo que conviene regularizarlas antes de comprar o vender un vehículo.',
      },
      {
        q: '¿Esta consulta muestra también multas municipales?',
        a: 'No. El sistema cubre infracciones de la Policía Caminera provincial; las multas labradas por inspectores municipales de cada ciudad quedan en registros locales separados.',
      },
      {
        q: '¿Puedo consultar el puntaje de mi licencia de conducir?',
        a: 'El sistema de Monitoreo Vial de Entre Ríos permite además verificar si la licencia del titular tiene infracciones pendientes asociadas.',
      },
    ],
    relatedGuides: [
      { title: 'Multas ANSV / SINAI', url: '/consultar-multa/multas-ansv-sinai', description: 'Consultá infracciones nacionales y de otras provincias que usan el sistema SINAI.' },
      { title: 'Cómo saber si un auto tiene deuda de patentes', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Guía para verificar deudas patrimoniales antes de comprar o vender un vehículo.' },
      { title: 'Solicitar turno', url: '/solicitar-turno', description: 'Reservá un turno para inspeccionar el vehículo antes de comprarlo.' },
    ],
  },

  'multas-misiones': {
    seoTitle: 'Multas en Misiones: Consultá Monitoreo Vial por Patente | carChecking',
    seoDescription: 'Consultá gratis las infracciones de Monitoreo Vial Misiones por patente, en toda la provincia. Resultado en menos de un minuto, sin crear cuenta.',
    seoKeywords: 'multas misiones, monitoreo vial misiones, consultar multas por patente misiones, multas posadas provincia',
    intro: 'Consultamos el sistema Monitoreo Vial de la Provincia de Misiones por vos, en tiempo real y sin necesidad de crear una cuenta: infracciones de la Policía de Misiones en rutas de toda la provincia, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Qué es Monitoreo Vial Misiones',
        body: 'Monitoreo Vial es la plataforma que la Policía de Misiones habilitó para que cualquier persona consulte infracciones de tránsito por patente o CUIL/CUIT, sin necesidad de trámite presencial. El sistema registra excesos de velocidad, infracciones semafóricas, controles de alcoholemia y verificaciones de documentación (PDA), detectadas en toda la provincia, no solo en Posadas.',
      },
      {
        title: 'Rutas con mayor control en Misiones',
        body: 'Por su ubicación fronteriza, Misiones tiene controles intensivos en la Ruta Nacional 12 -el corredor que conecta Posadas con Puerto Iguazú y el Mercosur-, la Ruta Provincial 17 y los accesos a las principales ciudades. El transporte internacional recibe atención especial en los pasos fronterizos.',
      },
      {
        title: 'Monitoreo Vial provincial vs. sistema municipal de Posadas',
        body: 'Es clave no confundir este sistema con el del Tribunal Municipal de Faltas de Posadas (sistema.posadas.gov.ar), que es independiente y gestiona las infracciones labradas por inspectores de tránsito municipales dentro de la ciudad. Un vehículo que circula por Posadas puede tener infracciones en uno de los dos sistemas, en ambos, o en ninguno: conviene revisar los dos si el auto se usa en la capital misionera.',
      },
      {
        title: 'Cómo pagar y consultar',
        body: 'Las infracciones de Monitoreo Vial pueden gestionarse en las oficinas de la Policía (Jujuy 2332, Posadas, atención de lunes a viernes de 8 a 15 y sábados de 8 a 12, teléfono 376-4421431, correo seguridadvialjuridicos@misiones.gov.ar) o a través de los canales de pago habilitados en el propio portal. El pago voluntario dentro del plazo indicado en la notificación suele tener condiciones más favorables que la deuda vencida.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas de Misiones por patente?',
        a: 'Ingresá la patente en el buscador y seleccioná Misiones. Accedemos en tiempo real al sistema Monitoreo Vial de la Provincia y te mostramos las infracciones registradas, gratis y sin necesidad de crear una cuenta.',
      },
      {
        q: '¿Qué tipos de infracciones registra Monitoreo Vial Misiones?',
        a: 'Excesos de velocidad, infracciones semafóricas, controles de alcoholemia y verificaciones de documentación (PDA), detectadas por la Policía en toda la provincia.',
      },
      {
        q: '¿Esta consulta cubre las multas municipales de Posadas?',
        a: 'No. Monitoreo Vial es un sistema provincial; las infracciones labradas por inspectores municipales de Posadas se gestionan en un sistema aparte, el del Tribunal Municipal de Faltas.',
      },
      {
        q: '¿Las multas en la RN12 aparecen en Monitoreo Vial?',
        a: 'Las infracciones labradas por la Policía en la Ruta Nacional 12 dentro de Misiones quedan registradas en Monitoreo Vial; los tramos bajo jurisdicción nacional también pueden figurar en sistemas como ANSV/SINAI.',
      },
      {
        q: '¿Las multas de Misiones afectan la transferencia del vehículo?',
        a: 'Sí, las infracciones provinciales pendientes pueden complicar trámites en el DNRPA, por lo que conviene verificarlas antes de comprar o vender un auto.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en Posadas (municipal)', url: '/consultar-multa/multas-posadas', description: 'Consultá también el sistema municipal de Posadas, independiente del provincial.' },
      { title: 'Multas ANSV / SINAI', url: '/consultar-multa/multas-ansv-sinai', description: 'Consultá infracciones nacionales y de otras provincias que usan el sistema SINAI.' },
      { title: 'Cómo saber si un auto tiene deuda de patentes', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Guía para verificar deudas patrimoniales antes de comprar o vender un vehículo.' },
    ],
  },

  'multas-posadas': {
    seoTitle: 'Multas en Posadas: Consultá por Patente | carChecking',
    seoDescription: 'Consultá gratis las multas municipales de Posadas por patente en el sistema del Tribunal de Faltas. Resultado en menos de un minuto, sin crear cuenta.',
    seoKeywords: 'multas posadas, tribunal de faltas posadas, consultar multas por patente posadas, actas de transito posadas',
    intro: 'Consultamos el sistema del Tribunal Municipal de Faltas de Posadas por vos, en tiempo real y sin necesidad de crear una cuenta: actas de tránsito labradas por inspectores municipales dentro de la ciudad, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas en Posadas',
        body: 'El Tribunal Municipal de Faltas de Posadas, integrado por los Juzgados 1, 2 y 3, procesa las infracciones de tránsito labradas por inspectores municipales dentro del ejido de la ciudad. La consulta oficial se hace desde posadas.gob.ar/tramites, en la sección Autogestión, con el enlace "Consulta de Actas de Tránsito", ingresando la patente en formato tradicional (ABC123) o Mercosur (AB123CD).',
      },
      {
        title: 'Actas digitales con QR y autogestión',
        body: 'Posadas digitalizó buena parte de este trámite: cada acta labrada genera un comprobante con código QR que permite acceder al portal digital, donde a las 24 horas de la infracción ya está disponible la boleta de pago. Desde ese mismo portal se puede pagar la multa o presentar un descargo, sin necesidad de trasladarse al Tribunal de Faltas.',
      },
      {
        title: 'Descuento por pago voluntario y prescripción',
        body: 'El pago voluntario dentro de los primeros días hábiles desde la confección del acta o la primera citación del Juzgado puede acceder a un descuento significativo sobre el monto original, aunque implica renunciar a la posibilidad de impugnar la infracción. Según fuentes locales, las infracciones de tránsito labradas en Posadas tienen una vigencia de cinco años desde la fecha de la denuncia; pasado ese plazo no desaparecen automáticamente del sistema, sino que hay que solicitar turno ante el Tribunal para pedir su archivo.',
      },
      {
        title: 'Sistema municipal vs. Monitoreo Vial provincial',
        body: 'El sistema de Posadas es independiente del Monitoreo Vial de la Provincia de Misiones, que registra infracciones detectadas por la Policía en rutas de toda la provincia (incluidos los accesos a Posadas). Un mismo vehículo puede tener actas en el sistema municipal, en el provincial, en ambos o en ninguno: conviene revisar los dos si el auto circula habitualmente por la capital misionera.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas en Posadas por patente?',
        a: 'Ingresá la patente en el buscador y seleccioná Posadas. Consultamos en tiempo real el sistema del Tribunal Municipal de Faltas y te mostramos las actas de tránsito registradas, gratis y sin crear una cuenta.',
      },
      {
        q: '¿Esta consulta incluye las multas provinciales de Misiones?',
        a: 'No. El sistema de Posadas cubre solo las infracciones labradas por inspectores municipales; las de la Policía en rutas provinciales se consultan aparte, en Monitoreo Vial Misiones.',
      },
      {
        q: '¿Cuánto tardan en prescribir las multas de Posadas?',
        a: 'Según fuentes locales, las infracciones tienen una vigencia de cinco años desde la fecha de la denuncia, aunque el archivo no es automático: hay que solicitarlo ante el Tribunal de Faltas.',
      },
      {
        q: '¿Hay descuento por pago voluntario en Posadas?',
        a: 'Sí, pagar dentro de los primeros días hábiles desde el acta o la primera citación suele dar acceso a un descuento importante, pero implica renunciar a impugnar la infracción.',
      },
      {
        q: '¿Las multas de Posadas afectan la transferencia del vehículo?',
        a: 'Las actas municipales pendientes pueden complicar trámites posteriores y conviene resolverlas antes de comprar o vender un auto que circula en la ciudad.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en Misiones (provincial)', url: '/consultar-multa/multas-misiones', description: 'Consultá también el sistema provincial Monitoreo Vial, independiente del municipal.' },
      { title: 'Cómo saber si un auto tiene deuda de patentes', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Guía para verificar deudas patrimoniales antes de comprar o vender un vehículo.' },
      { title: 'Calculadora de costos de transferencia', url: '/calculadora-de-costos-de-transferencia', description: 'Estimá el costo total de transferir un vehículo en Argentina.' },
    ],
  },

  'multas-chaco': {
    seoTitle: 'Multas en Chaco: Fotomultas y Caminera por Patente | carChecking',
    seoDescription: 'Consultá gratis las fotomultas y actas de la Policía Caminera de Chaco por patente. Resultado en menos de un minuto, sin crear cuenta.',
    seoKeywords: 'multas chaco, policia caminera chaco, fotomultas chaco, consultar multas por patente chaco',
    intro: 'Consultamos el sistema de la Policía Caminera de Chaco por vos, en tiempo real y sin necesidad de crear una cuenta: fotomultas de radares fijos y actas de control de ruta, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Dos tipos de infracciones bajo un mismo organismo',
        body: 'La Policía Caminera de Chaco administra dos categorías de infracciones que conviene distinguir: las "fotomultas", detectadas de forma automática por radares fijos (cinemómetros) distribuidos en rutas de la provincia, y las actas "caminera", labradas directamente por personal de la fuerza en controles de ruta. Ambas quedan registradas a nombre del titular del vehículo dentro del mismo sistema provincial.',
      },
      {
        title: 'Cómo se controlan las fotomultas',
        body: 'La provincia cuenta con 49 cinemómetros (radares de velocidad) distribuidos en su red vial, con puntos habilitados según los criterios de la Agencia Nacional de Seguridad Vial y equipos homologados según normativa técnica nacional. La Subsecretaría de Seguridad Vial habilitó un portal digital dedicado para que cualquier persona consulte estas infracciones ingresando su DNI o el dominio del vehículo, sin necesidad de trámite presencial.',
      },
      {
        title: 'Principales rutas controladas en Chaco',
        body: 'El Chaco es un nodo de tránsito estratégico del NEA. Los controles más intensivos, tanto de fotomultas como de actas de la Caminera, se concentran en la Ruta Nacional 16 (que conecta Resistencia con Salta), la Ruta Nacional 11 y los accesos a Resistencia y Barranqueras, con atención especial al transporte de cargas.',
      },
      {
        title: 'Cómo pagar y consultar presencialmente',
        body: 'Las infracciones de la Policía Caminera del Chaco pueden abonarse en dependencias policiales, en el Banco del Chaco o a través de los canales de pago digitales habilitados. Para consultas presenciales, la sede está en Carlos Pellegrini 19, Resistencia, con atención extendida de lunes a viernes de 7:30 a 20:30, además de línea telefónica, WhatsApp y correo electrónico.',
      },
      {
        title: 'Impacto en la transferencia del vehículo',
        body: 'Las infracciones provinciales pendientes -sean fotomultas o actas de la Caminera- pueden trabar trámites en el DNRPA, por lo que conviene verificarlas y regularizarlas antes de comprar o vender un vehículo que circuló por rutas chaqueñas.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas en Chaco por patente?',
        a: 'Ingresá la patente en el buscador y seleccioná Chaco. Consultamos en tiempo real el sistema de la Policía Caminera y te mostramos tanto fotomultas como actas de control de ruta, gratis y sin crear una cuenta.',
      },
      {
        q: '¿Cuál es la diferencia entre fotomultas y multas de la Caminera en Chaco?',
        a: 'Las fotomultas son detectadas automáticamente por radares fijos (cinemómetros); las actas de la Caminera son labradas directamente por personal policial en controles de ruta. Ambas se gestionan dentro del mismo sistema de la Policía Caminera.',
      },
      {
        q: '¿Esta consulta incluye multas de la ciudad de Resistencia?',
        a: 'El sistema cubre infracciones de la Policía Caminera provincial. Las multas municipales de Resistencia, si existen, se gestionan en un registro aparte del municipio.',
      },
      {
        q: '¿Puedo impugnar una fotomulta o un acta de la Caminera en Chaco?',
        a: 'Sí. El descargo debe presentarse ante la dependencia policial que labró la infracción o ante el juzgado de faltas correspondiente, dentro del plazo indicado en el acta.',
      },
      {
        q: '¿Dónde puedo consultar presencialmente mis multas en Chaco?',
        a: 'En la sede de la Policía Caminera, Carlos Pellegrini 19, Resistencia, de lunes a viernes de 7:30 a 20:30, o por teléfono, WhatsApp y correo electrónico.',
      },
    ],
    relatedGuides: [
      { title: 'Multas ANSV / SINAI', url: '/consultar-multa/multas-ansv-sinai', description: 'Consultá infracciones nacionales y de otras provincias que usan el sistema SINAI.' },
      { title: 'Cómo saber si un auto tiene deuda de patentes', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Guía para verificar deudas patrimoniales antes de comprar o vender un vehículo.' },
      { title: 'Solicitar turno', url: '/solicitar-turno', description: 'Reservá un turno para inspeccionar el vehículo antes de comprarlo.' },
    ],
  },

  'multas-berisso': {
    seoTitle: 'Multas en Berisso por Patente: Consultá Infracciones Online | carChecking',
    seoDescription: 'Consultá multas de tránsito en Berisso ingresando la patente. Resultado inmediato con la info del Juzgado de Faltas Municipal y las fotomultas de la ciudad.',
    seoKeywords: 'multas berisso, consultar multas berisso patente, infracciones berisso, fotomultas berisso, juzgado de faltas berisso',
    intro: 'Consultamos el sistema de infracciones de Berisso por vos, ingresando solo la patente: fotomultas de las cámaras viales del partido y multas labradas por el Juzgado de Faltas Municipal, con resultado en menos de un minuto y sin necesidad de crear ninguna cuenta.',
    sections: [
      {
        title: 'Quién controla el tránsito en Berisso',
        body: 'En Berisso las infracciones de tránsito quedan a cargo del Juzgado de Faltas Municipal, que centraliza tanto las actas labradas por inspectores en la vía pública como las fotomultas detectadas por cámaras. Berisso conserva la trama de calles numeradas típica de la región (avenidas 122 y 124, calles 59, 60, 64 y 66), y es justamente sobre esa cuadrícula donde el municipio fue sumando equipamiento de control vial en los últimos años.',
      },
      {
        title: 'Dónde están las cámaras de fotomultas',
        body: 'El municipio activó radares y cámaras de fotomultas en distintas intersecciones del casco urbano, entre ellas los cruces de 124 y 60, 122 y 59, 122 y 64, y 122 y 66. Según informó la Secretaría de Seguridad Vial al presentar el equipamiento, el objetivo declarado es reducir los siniestros en las zonas de mayor accidentalidad del partido, no solo recaudar. Los equipos están preparados para detectar exceso de velocidad, cruce en semáforo rojo, giros indebidos y circulación de motociclistas sin casco.',
      },
      {
        title: 'Notificación y descargo',
        body: 'Las fotomultas quedan registradas a nombre del titular del vehículo según el dominio detectado por las cámaras, y la notificación formal llega al domicilio declarado. Si considerás que una infracción está mal aplicada, el descargo se presenta ante el Juzgado de Faltas Municipal de Berisso, que es también donde se abonan las multas de manera presencial o se consulta un plan de pago.',
      },
      {
        title: 'Multas municipales vs. infracciones en rutas provinciales',
        body: 'Es importante no confundir jurisdicciones: las multas que aparecen en esta consulta son las que labra el municipio de Berisso dentro del ejido urbano. Si la infracción ocurrió en una ruta provincial o nacional que atraviesa el partido, suele quedar registrada en el sistema SINAI de la Agencia Nacional de Seguridad Vial, no en el Juzgado de Faltas municipal.',
      },
      {
        title: 'Cómo y dónde pagar',
        body: 'Las multas confirmadas se abonan en el Juzgado de Faltas Municipal o mediante los canales de pago que informa el municipio al notificar la infracción. Antes de pagar conviene revisar la boleta para ver si tiene vigente un descuento por pronto pago y cuál es la fecha límite, porque esa condición varía según el momento en que se emite cada acta.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto si tengo multas en Berisso por patente?',
        a: 'Ingresá el dominio de tu vehículo en el buscador de esta página y te mostramos en segundos si hay fotomultas o actas registradas para esa patente en el sistema municipal.',
      },
      {
        q: '¿Quién labra las fotomultas en Berisso?',
        a: 'Las cámaras coordinadas por la Secretaría de Seguridad Vial del municipio, y las actas labradas en la vía pública, que tramita después el Juzgado de Faltas Municipal.',
      },
      {
        q: '¿Qué infracciones detectan las cámaras de Berisso?',
        a: 'Exceso de velocidad, cruce en semáforo rojo, giros indebidos y motociclistas circulando sin casco, según lo informado por el municipio al instalar el equipamiento.',
      },
      {
        q: '¿Puedo hacer el descargo de una multa?',
        a: 'Sí, el descargo se presenta ante el Juzgado de Faltas Municipal de Berisso, que es el organismo habilitado para revisar el acta y resolver el reclamo.',
      },
      {
        q: '¿Las multas de rutas provinciales aparecen en esta consulta?',
        a: 'No necesariamente. Las infracciones en rutas provinciales o nacionales que cruzan Berisso suelen tramitarse por SINAI, un sistema distinto al del Juzgado de Faltas municipal.',
      },
      {
        q: '¿Hay descuento por pronto pago?',
        a: 'Depende de cada acta: la boleta que emite el Juzgado de Faltas indica si corresponde un descuento por pago dentro de plazo y cuál es la fecha límite.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en la Provincia de Buenos Aires', url: '/consultar-multa/multas-provincia-buenos-aires', description: 'Consultá infracciones provinciales que no dependen del municipio de Berisso.' },
      { title: '¿Tu auto tiene deuda de patentes?', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Guía para verificar deudas patrimoniales antes de comprar o vender un vehículo.' },
      { title: 'Cómo consultar multas en la Provincia de Buenos Aires', url: '/multas-pba/como-consultar', description: 'Paso a paso para revisar infracciones bonaerenses fuera del ámbito municipal.' },
    ],
  },

  'multas-ezeiza': {
    seoTitle: 'Multas en Ezeiza por Patente: Consultá Infracciones Online | carChecking',
    seoDescription: 'Consultá multas de tránsito en Ezeiza por patente: fotomultas municipales y actas del Juzgado de Faltas, con resultado inmediato y sin registrarte.',
    seoKeywords: 'multas ezeiza, consultar multas ezeiza patente, fotomultas ezeiza, juzgado de faltas ezeiza, infracciones ezeiza',
    intro: 'Consultamos las infracciones de tránsito de Ezeiza por vos, ingresando solo la patente: fotomultas del municipio y actas del Juzgado de Faltas Municipal, con resultado en menos de un minuto y sin necesidad de crear ninguna cuenta.',
    sections: [
      {
        title: 'Quién controla el tránsito en Ezeiza',
        body: 'En Ezeiza las infracciones se gestionan a través de la Dirección de Transporte y Tránsito municipal, que se ocupa de la fiscalización y circulación vial, y del Juzgado de Faltas Municipal, creado por ordenanza 4027/CD/2018, que resuelve los descargos y habilita el pago. Las fotomultas detectadas por cámaras se consultan en el sistema municipal al que se accede también desde el sitio oficial del municipio.',
      },
      {
        title: 'Un partido atravesado por accesos y rutas',
        body: 'Ezeiza tiene una particularidad frente a otros municipios del conurbano: buena parte de su territorio está atravesado por los accesos al Aeropuerto Internacional Ministro Pistarini, la Autopista Ricchieri y rutas provinciales como la RP 58. Las infracciones cometidas dentro de las calles del partido quedan a cargo del municipio, mientras que las labradas sobre la traza de la Ricchieri o rutas provinciales suelen quedar bajo jurisdicción provincial.',
      },
      {
        title: 'Notificación y descargo',
        body: 'Las multas quedan registradas a nombre del titular del vehículo según el dominio, y la notificación llega al domicilio declarado. Para presentar un descargo hay que dirigirse al Juzgado de Faltas Municipal de Ezeiza (Avellaneda 27, Edificio Amigo Néstor), que además de resolver los reclamos habilita el pago presencial y la gestión de audiencias con el juez de faltas.',
      },
      {
        title: 'Cómo y dónde pagar',
        body: 'El pago de las multas confirmadas se puede realizar en el Juzgado de Faltas Municipal o mediante los canales que informa el municipio al notificar la infracción. Antes de abonar conviene confirmar con la oficina municipal si la infracción tiene vigente algún descuento por pago dentro de determinado plazo, ya que esa condición se define acta por acta.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto si tengo multas en Ezeiza por patente?',
        a: 'Ingresá el dominio de tu vehículo en el buscador de esta página y te mostramos en segundos si hay fotomultas o actas registradas para esa patente.',
      },
      {
        q: '¿Quién labra las multas en Ezeiza?',
        a: 'La Dirección de Transporte y Tránsito municipal y el Juzgado de Faltas Municipal, creado por ordenanza 4027/CD/2018.',
      },
      {
        q: '¿Las multas de la Autopista Ricchieri aparecen en esta consulta?',
        a: 'No necesariamente: las infracciones sobre la Ricchieri o rutas provinciales suelen ser jurisdicción provincial y se consultan por el sistema SINAI.',
      },
      {
        q: '¿Dónde presento un descargo en Ezeiza?',
        a: 'En el Juzgado de Faltas Municipal de Ezeiza, ubicado en Avellaneda 27 (Edificio Amigo Néstor).',
      },
      {
        q: '¿Cómo pago una multa confirmada?',
        a: 'En el Juzgado de Faltas Municipal o mediante los canales de pago que informa el municipio al notificar la infracción.',
      },
      {
        q: '¿Hay descuento por pronto pago?',
        a: 'Depende del acta; conviene confirmarlo directamente con la oficina municipal antes de pagar.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en la Provincia de Buenos Aires', url: '/consultar-multa/multas-provincia-buenos-aires', description: 'Consultá infracciones de rutas provinciales que atraviesan Ezeiza, como la Ricchieri.' },
      { title: '¿Tu auto tiene deuda de patentes?', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Verificá deudas patrimoniales antes de comprar o vender un vehículo.' },
      { title: 'Cómo consultar multas en la Provincia de Buenos Aires', url: '/multas-pba/como-consultar', description: 'Paso a paso para revisar infracciones bonaerenses fuera del ámbito municipal.' },
    ],
  },

  'multas-lanus': {
    seoTitle: 'Multas en Lanús por Patente: Consultá Infracciones Online | carChecking',
    seoDescription: 'Consultá multas y fotomultas en Lanús por patente: resultado inmediato del sistema municipal y del Juzgado de Faltas, sin registrarte.',
    seoKeywords: 'multas lanus, consultar multas lanus patente, fotomultas lanus, juzgado de faltas lanus, infracciones lanus',
    intro: 'Consultamos las infracciones de tránsito de Lanús por vos, ingresando solo la patente: fotomultas del partido y actas del Juzgado de Faltas Municipal, con resultado en menos de un minuto y sin necesidad de crear ninguna cuenta.',
    sections: [
      {
        title: 'Quién labra las multas en Lanús',
        body: 'El Juzgado de Faltas Municipal de Lanús, con sede sobre la avenida Hipólito Yrigoyen, centraliza las infracciones de tránsito del partido: tanto las actas labradas por inspectores como las fotomultas detectadas por cámaras viales quedan registradas ahí a nombre del titular del vehículo.',
      },
      {
        title: 'Uno de los corredores con más cámaras del sur del conurbano',
        body: 'Lanús tiene una fuerte concentración de cámaras de fotomultas sobre la avenida Pavón, que continúa como avenida Hipólito Yrigoyen a lo largo de todo el partido y es uno de los ejes más transitados del sur del Gran Buenos Aires. Buena parte de las consultas de quienes circulan por esa arteria u otras avenidas del distrito corresponden a fotomultas por semáforo en rojo o exceso de velocidad.',
      },
      {
        title: 'Notificación y descargo',
        body: 'Las fotomultas se notifican al domicilio del titular registrado según el dominio del vehículo, por lo que la consulta online por patente suele mostrar la infracción incluso antes de que llegue la notificación postal. El descargo se presenta ante el Juzgado de Faltas Municipal, que también resuelve los reclamos y habilita el pago.',
      },
      {
        title: 'Libre deuda de infracciones por dominio',
        body: 'El municipio de Lanús ofrece además un trámite online específico para obtener el libre deuda del Tribunal de Faltas de un dominio, un certificado útil si estás por vender o comprar un vehículo y necesitás confirmar que no tiene infracciones pendientes a su nombre.',
      },
      {
        title: 'Cómo y dónde pagar',
        body: 'El pago de multas confirmadas se realiza en el Juzgado de Faltas Municipal o mediante los canales de pago que indica el municipio en cada notificación. El organismo suele habilitar de manera periódica programas de pago voluntario con descuento sobre el monto original de la infracción; el porcentaje y el plazo vigentes figuran siempre en la boleta o se pueden confirmar llamando a la oficina municipal.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto si tengo multas en Lanús por patente?',
        a: 'Ingresá el dominio de tu vehículo en el buscador de esta página y te mostramos en segundos si hay fotomultas o actas registradas para esa patente.',
      },
      {
        q: '¿Quién labra las fotomultas en Lanús?',
        a: 'El Juzgado de Faltas Municipal, a partir de cámaras instaladas en avenidas del partido como Pavón/Hipólito Yrigoyen y actas de inspectores en la vía pública.',
      },
      {
        q: '¿Puedo sacar un libre deuda de infracciones por patente?',
        a: 'Sí, el municipio ofrece un trámite online para obtener el libre deuda del Tribunal de Faltas de un dominio específico.',
      },
      {
        q: '¿Dónde hago el descargo de una multa?',
        a: 'Ante el Juzgado de Faltas Municipal de Lanús, que también resuelve los reclamos y habilita el pago.',
      },
      {
        q: '¿Hay descuento por pronto pago?',
        a: 'El municipio suele habilitar programas de pago voluntario con descuento; el porcentaje vigente figura en la boleta de cada infracción.',
      },
      {
        q: '¿La multa aparece antes de recibir la notificación por correo?',
        a: 'Sí, frecuentemente la consulta online por patente muestra la fotomulta antes de que llegue la notificación postal.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en la Provincia de Buenos Aires', url: '/consultar-multa/multas-provincia-buenos-aires', description: 'Consultá infracciones provinciales que no dependen del municipio de Lanús.' },
      { title: '¿Tu auto tiene deuda de patentes?', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Verificá deudas patrimoniales antes de comprar o vender un vehículo.' },
      { title: 'Calculadora de costos de transferencia', url: '/calculadora-de-costos-de-transferencia', description: 'Estimá los costos de transferir un vehículo una vez que esté libre de deuda.' },
    ],
  },

  'multas-avellaneda': {
    seoTitle: 'Multas en Avellaneda por Patente: Sistema SIAC | carChecking',
    seoDescription: 'Consultá multas de tránsito en Avellaneda por patente, DNI o CUIT en el sistema SIAC de la Municipalidad. Resultado inmediato, sin registrarte.',
    seoKeywords: 'multas avellaneda, consultar multas avellaneda patente, SIAC avellaneda, mda.gob.ar multas, juzgado de faltas avellaneda',
    intro: 'Consultamos el sistema SIAC de la Municipalidad de Avellaneda (MDA) por vos, en tiempo real y sin necesidad de crear una cuenta: multas de tránsito labradas por agentes municipales y fotomultas, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Qué es el sistema SIAC de Avellaneda',
        body: 'La Municipalidad de Avellaneda (MDA) gestiona sus infracciones de tránsito a través del sistema SIAC, que registra las multas labradas por agentes de tránsito y por fotomultas, y permite consultarlas online por patente, DNI o CUIT del titular en el portal municipal multas.mda.gob.ar. La consulta pública incluye una verificación de seguridad antes de mostrar el resultado, algo habitual en portales municipales para evitar consultas automatizadas masivas.',
      },
      {
        title: 'Cómo se calcula el monto de una multa en Avellaneda',
        body: 'A diferencia de otros municipios que fijan directamente un monto en pesos, en Avellaneda las multas de tránsito se expresan en Unidades Fijas (UF), un valor que se actualiza periódicamente según el precio de la nafta por resolución provincial. Por eso el monto final en pesos de una misma infracción puede variar según la fecha en que se paga, y conviene confirmar el valor vigente de la UF antes de abonar.',
      },
      {
        title: 'Juzgados de Faltas: uno en el centro, tres en Sarandí',
        body: 'Avellaneda tiene varios Juzgados de Faltas: el Juzgado N°1 funciona en la sede municipal, mientras que los Juzgados N°2, 3 y 4 atienden en Brandsen 2270, en el barrio de Sarandí. Ahí se presentan los descargos, se gestionan las audiencias con el juez y se puede pagar la multa en las cajas habilitadas por la Tesorería municipal, todo en el mismo lugar y en el mismo día.',
      },
      {
        title: 'Descuento por pronto pago',
        body: 'El municipio aplica un descuento cuando la multa se abona dentro de los primeros 30 días desde la notificación; pasado ese plazo se generan recargos e intereses sobre el monto original en UF. El porcentaje exacto del descuento y el monto final figuran en la boleta que emite el sistema SIAC al momento de la consulta.',
      },
      {
        title: 'Consultas y atención al vecino',
        body: 'Además de la consulta online, la Municipalidad de Avellaneda ofrece atención telefónica al 0800-122-6323 para dudas sobre infracciones, y trámites presenciales en los Juzgados de Faltas para quienes necesiten presentar un descargo o acordar un plan de pago.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas en Avellaneda por patente?',
        a: 'Ingresá el dominio de tu vehículo en el buscador de esta página y consultamos el sistema SIAC de la Municipalidad de Avellaneda por vos.',
      },
      {
        q: '¿Qué es el sistema SIAC?',
        a: 'Es el sistema que usa la Municipalidad de Avellaneda (MDA) para gestionar y consultar infracciones de tránsito por patente, DNI o CUIT.',
      },
      {
        q: '¿Por qué el monto de mi multa está en UF y no en pesos?',
        a: 'Porque Avellaneda expresa sus multas en Unidades Fijas, un valor que se actualiza según el precio de la nafta por resolución provincial.',
      },
      {
        q: '¿Dónde presento un descargo en Avellaneda?',
        a: 'En el Juzgado de Faltas que corresponda: el N°1 en la sede municipal, y los N°2, 3 y 4 en Brandsen 2270, Sarandí.',
      },
      {
        q: '¿Hay descuento por pronto pago?',
        a: 'Sí, dentro de los primeros 30 días desde la notificación; después de ese plazo se aplican recargos e intereses.',
      },
      {
        q: '¿Puedo llamar para consultar mis multas?',
        a: 'Sí, al 0800-122-6323, la línea de atención municipal para infracciones de tránsito.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en la Provincia de Buenos Aires', url: '/consultar-multa/multas-provincia-buenos-aires', description: 'Consultá infracciones provinciales que no dependen del sistema SIAC municipal.' },
      { title: '¿Tu auto tiene deuda de patentes?', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Verificá deudas patrimoniales antes de comprar o vender un vehículo.' },
      { title: 'Cómo consultar multas en la Provincia de Buenos Aires', url: '/multas-pba/como-consultar', description: 'Paso a paso para revisar infracciones bonaerenses fuera del ámbito municipal.' },
    ],
  },

  'multas-lomas-de-zamora': {
    seoTitle: 'Multas en Lomas de Zamora: Consultar Infracciones por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de tránsito en Lomas de Zamora por patente. Accedemos al sistema municipal "Consulta de Faltas" en tiempo real. Gratis.',
    seoKeywords: 'multas lomas de zamora, consultar multas lomas de zamora, infracciones lomas de zamora, multas patente lomas de zamora, juzgado de faltas lomas de zamora, descargo online lomas de zamora, tribunal de faltas lomas de zamora',
    intro: 'Consultamos el sistema municipal de Lomas de Zamora por vos, en tiempo real y sin necesidad de crear una cuenta: la Municipalidad gestiona sus propias infracciones de tránsito a través de la plataforma "Consulta de Faltas", con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas en Lomas de Zamora',
        body: 'A diferencia de otros municipios bonaerenses que tercerizan el servicio en proveedores externos, Lomas de Zamora administra su propio sistema de infracciones a través del Tribunal de Faltas municipal, con sede en Las Heras 2200. Las multas de tránsito —radares, paradas indebidas— conviven con infracciones administrativas de estacionamiento, zonas verdes y control vehicular (oblea, VTV), todas registradas contra el dominio del vehículo.',
      },
      {
        title: 'Cómo funciona "Consulta de Faltas", el sistema propio de Lomas de Zamora',
        body: 'El municipio desarrolló y opera in-house su propio sistema, disponible en el portal webextra.lomasdezamora.gov.ar, donde se puede consultar el estado de una infracción por patente, verificar si el vehículo tiene libre deuda de faltas e incluso iniciar un descargo (impugnación) de forma online, adjuntando pruebas para que resuelva el juez de faltas. No es un proveedor compartido con otros municipios: es un desarrollo propio de la Municipalidad de Lomas de Zamora.',
      },
      {
        title: 'Descuento por pago voluntario en Lomas de Zamora',
        body: 'Según la Ordenanza Impositiva municipal vigente, quien paga la infracción dentro del plazo de pago voluntario accede a un descuento del 50% sobre el monto de la multa. Este beneficio no aplica a infracciones por alcoholemia ni a las que impliquen obstrucción de la vía pública. Pasado el vencimiento impreso sobre el código de barras de la cédula de notificación se pierde el descuento, y hay que regenerar la boleta actualizada desde el mismo portal.',
      },
      {
        title: 'Cómo pagar o impugnar una multa en Lomas de Zamora',
        body: 'El pago voluntario con descuento se realiza presencialmente en el Tribunal de Faltas (Las Heras 2200), de lunes a viernes, o generando la boleta actualizada desde el portal online. Si preferís cuestionar la infracción, el municipio habilitó el descargo online: se presenta la defensa con las pruebas correspondientes y un juez de faltas dicta sentencia, sin necesidad de trasladarte para hacer el trámite de forma presencial.',
      },
      {
        title: 'Verificar multas de Lomas de Zamora antes de comprar un auto usado',
        body: 'Como las infracciones y la deuda de faltas quedan asociadas a la patente y no a la persona, un auto usado puede arrastrar multas del dueño anterior. Antes de cerrar la compra de un vehículo radicado en Lomas de Zamora, conviene verificar el estado de faltas municipales junto con la situación general del dominio, para no heredar deuda ni encontrarte con trabas al momento de transferir la titularidad.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas de Lomas de Zamora por patente?',
        a: 'Ingresá la patente en el buscador y seleccioná "Lomas de Zamora". Consultamos en tiempo real el sistema municipal "Consulta de Faltas" y te mostramos las infracciones registradas, gratis y sin necesidad de crear una cuenta.',
      },
      {
        q: '¿Lomas de Zamora usa un sistema propio o un proveedor externo?',
        a: 'Lomas de Zamora administra un sistema propio, desarrollado y operado directamente por la Municipalidad, a diferencia de otros municipios bonaerenses que delegan la gestión de infracciones en plataformas de terceros.',
      },
      {
        q: '¿Qué descuento tengo si pago rápido una multa en Lomas de Zamora?',
        a: 'Según la Ordenanza Impositiva municipal, el pago dentro del período de pago voluntario tiene un 50% de descuento sobre el valor de la infracción. El beneficio no aplica a infracciones por alcoholemia ni por obstrucción de la vía pública.',
      },
      {
        q: '¿Puedo hacer el descargo de una multa de Lomas de Zamora de forma online?',
        a: 'Sí. El municipio permite iniciar el descargo online desde el portal de Consulta de Faltas, adjuntando la documentación o pruebas correspondientes. Un juez de faltas resuelve el caso y dicta sentencia.',
      },
      {
        q: '¿Dónde queda el Tribunal de Faltas de Lomas de Zamora?',
        a: 'El Tribunal de Faltas funciona en Las Heras 2200, Lomas de Zamora, con atención presencial de lunes a viernes. Ahí también se puede realizar el pago voluntario con descuento y gestionar trámites relacionados con infracciones.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en la Provincia de Buenos Aires', url: '/consultar-multa/multas-provincia-buenos-aires', description: 'Consultá infracciones bonaerenses a través de InfraccionesBA en los 135 municipios de la provincia.' },
      { title: 'Cómo saber si un auto tiene deuda de patentes', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Guía para verificar la deuda impositiva de un vehículo antes de comprarlo.' },
      { title: 'Calculadora de costos de transferencia', url: '/calculadora-de-costos-de-transferencia', description: 'Estimá el costo de transferir un auto usado en Argentina.' },
    ],
  },

  'multas-tres-de-febrero': {
    seoTitle: 'Multas en Tres de Febrero: Consultar Infracciones por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de tránsito en Tres de Febrero por patente o DNI. Accedemos al portal Mi3F / Mis Trámites en tiempo real. Gratis.',
    seoKeywords: 'multas tres de febrero, consultar multas tres de febrero, infracciones tres de febrero, mis tramites tres de febrero, fotomultas tres de febrero, juzgado de faltas tres de febrero, multas patente caseros',
    intro: 'Consultamos el portal "Mis Trámites" (Mi3F) de la Municipalidad de Tres de Febrero por vos, en tiempo real y sin necesidad de crear una cuenta: fotomultas y faltas de tránsito de Caseros, Ciudadela, Santos Lugares, Villa Bosch y el resto del partido, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas en Tres de Febrero',
        body: 'El Juzgado de Faltas de la Municipalidad de Tres de Febrero es la autoridad que resuelve las infracciones de tránsito, transporte y otras faltas municipales. Tiene dos sedes: San Martín 27 en Ciudadela y Lisandro de la Torre 2034 en Santos Lugares. Las infracciones se consultan y gestionan de forma centralizada a través del portal online del municipio.',
      },
      {
        title: 'El sistema de fotomultas de Tres de Febrero',
        body: 'Tres de Febrero incorporó un sistema de fotomultas desarrollado junto con la Dirección Nacional de Licencias de Conducir y Antecedentes de Tránsito de la Agencia Nacional de Seguridad Vial (ANSV), el mismo esquema que ya funciona en otros distritos del país. Ante una infracción detectada por cámara, la notificación llega al domicilio registrado del titular junto con el acta, el monto y la imagen de la infracción.',
      },
      {
        title: 'Cómo consultar y pagar una multa en Tres de Febrero',
        body: 'La consulta se hace por dominio (patente) o DNI en mistramites.tresdefebrero.gob.ar, la plataforma de trámites online del municipio. El pago puede realizarse por Provincia NET, Pago Fácil, Rapipago, Mercado Pago o con tarjeta de débito o crédito. Quien prefiera presentar su defensa en lugar de pagar puede hacerlo de forma presencial en el Juzgado de Faltas.',
      },
      {
        title: 'Descuento por pago voluntario en Tres de Febrero',
        body: 'Si el pago se realiza dentro del período de pago voluntario indicado en la notificación, Tres de Febrero aplica un 50% de descuento sobre el valor de la multa. Pasado ese plazo, la infracción pierde el beneficio y puede avanzar a instancias de mora o al Juzgado de Faltas.',
      },
      {
        title: 'Multas de tránsito vs. deuda de patente en Tres de Febrero',
        body: 'Es común confundir las multas de tránsito con la deuda del impuesto a la Patente (la tasa municipal por circular). Son trámites distintos dentro del mismo portal: las multas se consultan en el módulo de infracciones de Mis Trámites, mientras que la deuda de patente —incluidas eventuales moratorias con descuentos en intereses— se gestiona en el módulo de tasas. Antes de comprar un usado en el partido conviene revisar ambos registros por separado.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas de Tres de Febrero por patente?',
        a: 'Ingresá la patente en el buscador y seleccioná "Tres de Febrero". Consultamos en tiempo real el portal Mis Trámites (Mi3F) de la Municipalidad y te mostramos las infracciones registradas, gratis y sin crear una cuenta.',
      },
      {
        q: '¿Qué es "Mi3F" o "Mis Trámites" de Tres de Febrero?',
        a: 'Es la plataforma online de la Municipalidad de Tres de Febrero (mistramites.tresdefebrero.gob.ar) donde los vecinos consultan y pagan tasas municipales, incluidas las infracciones de tránsito, por dominio o DNI.',
      },
      {
        q: '¿Cuánto descuento tengo si pago rápido una multa en Tres de Febrero?',
        a: 'El municipio aplica un 50% de descuento sobre el valor de la multa si el pago se realiza dentro del período de pago voluntario informado en la notificación.',
      },
      {
        q: '¿Tres de Febrero tiene fotomultas?',
        a: 'Sí. El municipio implementó un sistema de fotomultas desarrollado junto con la Agencia Nacional de Seguridad Vial, similar al utilizado en otros distritos del país. La notificación incluye el acta, el monto y la imagen de la infracción.',
      },
      {
        q: '¿Dónde queda el Juzgado de Faltas de Tres de Febrero?',
        a: 'Tiene dos sedes: San Martín 27 en Ciudadela y Lisandro de la Torre 2034 en Santos Lugares. Ahí se pueden presentar descargos y realizar trámites relacionados con infracciones de tránsito.',
      },
    ],
    relatedGuides: [
      { title: 'Cómo consultar multas de la Provincia de Buenos Aires', url: '/multas-pba/como-consultar', description: 'Guía general para verificar infracciones bonaerenses paso a paso.' },
      { title: 'Multas en Lomas de Zamora por patente', url: '/consultar-multa/multas-lomas-de-zamora', description: 'Consultá las infracciones del sistema municipal propio de Lomas de Zamora.' },
      { title: 'Calculadora de costos de transferencia', url: '/calculadora-de-costos-de-transferencia', description: 'Estimá el costo de transferir un auto usado en Argentina.' },
    ],
  },

  'multas-hurlingham': {
    seoTitle: 'Multas en Hurlingham: Consultar Infracciones por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de tránsito en Hurlingham por patente. Accedemos a la plataforma GobDigital del municipio en tiempo real. Gratis.',
    seoKeywords: 'multas hurlingham, consultar multas hurlingham, infracciones hurlingham, gobdigital hurlingham, juzgado de faltas hurlingham, multas patente william morris villa tesei',
    intro: 'Consultamos la plataforma GobDigital de la Municipalidad de Hurlingham por vos, en tiempo real y sin necesidad de crear una cuenta: infracciones de tránsito de Hurlingham, William C. Morris y Villa Tesei, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas en Hurlingham',
        body: 'El partido de Hurlingham resuelve sus infracciones de tránsito a través del Juzgado de Faltas Municipal, que cuenta con más de una sede y está afiliado a la Agencia Nacional de Seguridad Vial (ANSV). Las multas municipales —labradas en calles y avenidas dentro del ejido urbano de Hurlingham, William C. Morris y Villa Tesei— se registran contra la patente del vehículo.',
      },
      {
        title: 'GobDigital: la plataforma que usa Hurlingham para consultar infracciones',
        body: 'A diferencia de Lomas de Zamora, que desarrolló su propio sistema, Hurlingham utiliza GobDigital, una plataforma de gestión digital compartida por varios municipios del país. Dentro de GobDigital, el módulo "antecedentes por patente" permite consultar y pagar las infracciones registradas a nombre de un dominio determinado, ingresando la patente del vehículo.',
      },
      {
        title: 'Multas municipales vs. infracciones en rutas provinciales que cruzan Hurlingham',
        body: 'Es un matiz importante: las multas labradas en calles y avenidas dentro del partido de Hurlingham se resuelven en el Juzgado de Faltas Municipal y aparecen en GobDigital. Pero los tramos de rutas provinciales o nacionales que atraviesan el partido —como la Ruta Provincial 4 (Camino de Cintura)— están bajo jurisdicción provincial, y sus infracciones se gestionan a través del sistema SINAI de la ANSV, no del registro municipal.',
      },
      {
        title: 'Cómo pagar o presentar un descargo en Hurlingham',
        body: 'El Juzgado de Faltas Municipal de Hurlingham permite realizar el pago voluntario de infracciones, presentar descargos e impugnaciones, recuperar licencias de conducir o vehículos retenidos, y solicitar el certificado de libre deuda de faltas. La Dirección de Tránsito del municipio tiene su sede en Valencia y Los Pinos, Villa Tesei.',
      },
      {
        title: 'Verificar multas de Hurlingham antes de comprar un auto usado',
        body: 'Como las infracciones quedan asociadas al dominio del vehículo, conviene revisar el registro de GobDigital antes de comprar un usado radicado en Hurlingham, sobre todo si circuló habitualmente por avenidas con control de cámaras. Si además circuló por rutas provinciales que cruzan el partido, vale la pena verificar también el sistema SINAI para tener el panorama completo.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas de Hurlingham por patente?',
        a: 'Ingresá la patente en el buscador y seleccioná "Hurlingham". Consultamos en tiempo real la plataforma GobDigital del municipio y te mostramos las infracciones registradas, gratis y sin necesidad de crear una cuenta.',
      },
      {
        q: '¿Qué es GobDigital?',
        a: 'Es una plataforma de gestión de trámites digitales utilizada por varios municipios argentinos, entre ellos Hurlingham, para brindar servicios como la consulta de infracciones por patente ("antecedentes por patente").',
      },
      {
        q: '¿Todas las multas de un auto radicado en Hurlingham aparecen en GobDigital?',
        a: 'Aparecen las infracciones labradas dentro del partido, competencia del Juzgado de Faltas Municipal. Las multas de rutas provinciales o nacionales que cruzan Hurlingham, como la Ruta Provincial 4, se gestionan aparte mediante el sistema SINAI de la ANSV.',
      },
      {
        q: '¿Dónde puedo hacer un descargo o recuperar una licencia retenida en Hurlingham?',
        a: 'En el Juzgado de Faltas Municipal de Hurlingham se pueden presentar descargos, recuperar licencias de conducir o vehículos retenidos y solicitar el certificado de libre deuda de faltas.',
      },
      {
        q: '¿Qué localidades cubre este sistema de Hurlingham?',
        a: 'El partido de Hurlingham incluye las localidades de Hurlingham, William C. Morris y Villa Tesei. El Juzgado de Faltas Municipal y GobDigital cubren las infracciones labradas en cualquiera de ellas.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en Tres de Febrero por patente', url: '/consultar-multa/multas-tres-de-febrero', description: 'Consultá infracciones y fotomultas del portal Mis Trámites de Tres de Febrero.' },
      { title: 'Cómo saber si un auto tiene deuda de patentes', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Guía para verificar la deuda impositiva de un vehículo antes de comprarlo.' },
      { title: 'Solicitar turno para verificación vehicular', url: '/solicitar-turno', description: 'Coordiná una inspección técnica antes de cerrar la compra de un usado.' },
    ],
  },

  'multas-canuelas': {
    seoTitle: 'Multas en Cañuelas: Consultar Infracciones por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de tránsito en Cañuelas, Buenos Aires, por patente. Accedemos al sistema municipal SIGEIN en tiempo real. Gratis, sin registro.',
    seoKeywords: 'multas cañuelas, consultar multas cañuelas, infracciones cañuelas, multas patente cañuelas, juzgado de faltas cañuelas, sigein cañuelas, multas buenos aires',
    intro: 'Consultamos el sistema municipal de Cañuelas (SIGEIN) por vos, en tiempo real y sin necesidad de crear una cuenta: infracciones de tránsito labradas dentro del partido, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas en Cañuelas',
        body: 'Cañuelas es un partido de la zona sur del conurbano bonaerense, atravesado por la Ruta Nacional 3 y la Ruta Provincial 6, cuyo cruce se encuentra dentro del propio partido. Las infracciones de tránsito cometidas en calles bajo jurisdicción municipal se tramitan en el Juzgado de Faltas Municipal de Cañuelas, ubicado en Avenida Libertad 1180. Las multas labradas en la Ruta Nacional 3 por fuerzas de seguridad provinciales o nacionales se gestionan por separado, a través del sistema SINAI de la Provincia.',
      },
      {
        title: 'Multas provinciales vs. municipales en Cañuelas',
        body: 'Conviene distinguir el origen de la infracción: si fue labrada por un inspector municipal dentro del ejido urbano, se resuelve en el Juzgado de Faltas de Cañuelas; si fue labrada por la Policía de la Provincia de Buenos Aires en la Ruta 3 u otra ruta provincial, corresponde al sistema SINAI. Para tener un panorama completo de un vehículo, conviene revisar ambos registros.',
      },
      {
        title: 'Cómo hacer el descargo o pagar una multa en Cañuelas',
        body: 'El Juzgado de Faltas Municipal de Cañuelas atiende de lunes a viernes de 8 a 14 hs en Avenida Libertad 1180, donde se presentan descargos y se consulta el estado de una infracción. Las multas se calculan en Unidades Fijas (UF), conforme a la Ley provincial 13.927, cuyo valor se actualiza periódicamente por el Ministerio de Transporte bonaerense.',
      },
      {
        title: 'Verificar multas de Cañuelas antes de comprar un auto usado',
        body: 'Como en el resto de la Provincia de Buenos Aires, las infracciones quedan registradas en el dominio del vehículo y no se cancelan por un cambio de titular. Si estás por comprar un usado radicado en Cañuelas, conviene revisar tanto el registro municipal como el SINAI provincial antes de firmar la transferencia.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas de Cañuelas por patente?',
        a: 'Ingresá la patente y seleccioná "Cañuelas". Accedemos en tiempo real al sistema municipal SIGEIN y te mostramos las infracciones registradas, gratis y sin necesidad de crear una cuenta.',
      },
      {
        q: '¿Dónde queda el Juzgado de Faltas de Cañuelas?',
        a: 'En Avenida Libertad 1180, con atención de lunes a viernes de 8 a 14 hs. Ahí se presentan los descargos y se puede consultar el estado de una infracción en persona.',
      },
      {
        q: '¿Las multas de Cañuelas son municipales o provinciales?',
        a: 'Depende de quién la labró: las de calles del partido las resuelve el Juzgado de Faltas municipal; las de la Ruta Nacional 3 u otras rutas provinciales o nacionales se gestionan por SINAI, el sistema de la Provincia de Buenos Aires.',
      },
      {
        q: '¿En qué unidad se calculan las multas de Cañuelas?',
        a: 'En Unidades Fijas (UF), según la Ley provincial 13.927. El valor de la UF se actualiza periódicamente por el Ministerio de Transporte de la Provincia de Buenos Aires.',
      },
      {
        q: '¿Las multas de Cañuelas quedan a nombre del vehículo o del conductor?',
        a: 'Quedan registradas en el dominio del vehículo, por lo que conviene verificarlas antes de comprar un auto usado radicado en el partido.',
      },
    ],
    relatedGuides: [
      { title: 'Multas Provincia de Buenos Aires', url: '/consultar-multa/multas-provincia-buenos-aires', description: 'Consultá el sistema SINAI que cubre las rutas provinciales y nacionales de todo el conurbano.' },
      { title: 'Cómo saber si un auto tiene deuda de patentes', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Guía para verificar deudas de patente antes de comprar un usado.' },
    ],
  },

  'multas-san-vicente': {
    seoTitle: 'Multas en San Vicente (Buenos Aires): Consultar por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de tránsito en San Vicente, Buenos Aires, por patente. Accedemos al sistema municipal SIGEIN en tiempo real. Gratis, sin registro.',
    seoKeywords: 'multas san vicente, consultar multas san vicente buenos aires, infracciones san vicente, multas patente san vicente, juzgado de faltas san vicente, sigein san vicente',
    intro: 'Consultamos el sistema municipal de San Vicente (SIGEIN) por vos, en tiempo real y sin necesidad de crear una cuenta: infracciones de tránsito labradas dentro del partido, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas en San Vicente',
        body: 'San Vicente es un partido del sur del conurbano bonaerense, atravesado por la Ruta Provincial 58 y la Ruta Provincial 210 (que continúa como Avenida Presidente Perón dentro del distrito). Las infracciones cometidas en calles bajo jurisdicción municipal se tramitan en el Juzgado de Faltas Municipal, ubicado en Avenida Sarmiento 39. Las labradas en rutas provinciales por la Policía bonaerense se gestionan aparte, a través del sistema SINAI de la Provincia.',
      },
      {
        title: 'Plazos para descargo y pago voluntario',
        body: 'Ante una infracción notificada por el municipio de San Vicente, generalmente hay 5 días hábiles desde la notificación para presentar un descargo por escrito en el Juzgado de Faltas. Pasado el plazo de pago voluntario (habitualmente 10 días hábiles), el monto se incrementa con recargos y la deuda puede trabar trámites como la renovación de la licencia de conducir o la VTV.',
      },
      {
        title: 'San Vicente y el sistema provincial SINAI',
        body: 'Al igual que en el resto de los partidos bonaerenses, una infracción labrada dentro del ejido urbano de San Vicente queda en el registro municipal, mientras que una labrada por la Policía de la Provincia en la Ruta 58 u otra ruta provincial se resuelve por SINAI. Conviene revisar ambos registros para tener un panorama completo de un vehículo.',
      },
      {
        title: 'Verificar multas antes de comprar un auto usado en San Vicente',
        body: 'Las infracciones quedan asociadas al dominio del vehículo, no a la persona que conducía. Si vas a comprar un usado radicado en San Vicente, revisá el registro municipal y el SINAI provincial antes de avanzar con la transferencia, para no heredar deudas o trabas.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas de San Vicente por patente?',
        a: 'Ingresá la patente y seleccioná "San Vicente". Accedemos en tiempo real al sistema municipal SIGEIN y te mostramos las infracciones registradas, gratis y sin necesidad de crear una cuenta.',
      },
      {
        q: '¿Cuánto tiempo tengo para hacer un descargo en San Vicente?',
        a: 'Generalmente 5 días hábiles desde la notificación del acta. El descargo se presenta por escrito en el Juzgado de Faltas Municipal, en Avenida Sarmiento 39.',
      },
      {
        q: '¿Qué pasa si no pago una multa de San Vicente a tiempo?',
        a: 'Pasado el plazo de pago voluntario (habitualmente 10 días hábiles), el monto se incrementa con recargos y puede generar impedimentos para trámites como la VTV o la renovación de la licencia.',
      },
      {
        q: '¿Las multas de San Vicente son municipales o provinciales?',
        a: 'Depende de quién las labró: las de calles del partido las resuelve el Juzgado de Faltas municipal; las de rutas provinciales como la RP58 se gestionan por SINAI.',
      },
      {
        q: '¿Las infracciones quedan a nombre del auto o del conductor en San Vicente?',
        a: 'Quedan registradas en el dominio del vehículo, por eso conviene revisarlas antes de comprar un usado radicado en el partido.',
      },
    ],
    relatedGuides: [
      { title: 'Multas Provincia de Buenos Aires', url: '/consultar-multa/multas-provincia-buenos-aires', description: 'Consultá el sistema SINAI que cubre las rutas provinciales y nacionales de todo el conurbano.' },
      { title: 'Multas en Cañuelas', url: '/consultar-multa/multas-canuelas', description: 'Otro partido bonaerense vecino con el mismo sistema municipal SIGEIN.' },
    ],
  },

  'multas-roque-saenz-pena': {
    seoTitle: 'Multas en Roque Sáenz Peña (Chaco): Consultar por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de tránsito en Presidencia Roque Sáenz Peña, Chaco, por patente. Accedemos al sistema municipal SIGEIN en tiempo real. Gratis.',
    seoKeywords: 'multas roque saenz peña, multas sáenz peña chaco, consultar multas saenz peña, infracciones saenz peña, juzgado de faltas saenz peña, sigein saenz peña, multas chaco',
    intro: 'Consultamos el sistema municipal de Presidencia Roque Sáenz Peña (SIGEIN) por vos, en tiempo real y sin necesidad de crear una cuenta: infracciones de tránsito labradas dentro del municipio, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas en Sáenz Peña',
        body: 'Presidencia Roque Sáenz Peña, en la provincia del Chaco, está atravesada por la Ruta Nacional 16 y la Ruta Provincial 13. Las infracciones cometidas en calles y avenidas dentro del ejido municipal se resuelven en el Juzgado de Faltas Municipal; las labradas en la Ruta 16 o la Ruta 13 por la Policía Caminera del Chaco corresponden a la jurisdicción provincial y se gestionan a través de SINAI.',
      },
      {
        title: 'Cómo se calculan las multas municipales',
        body: 'Las infracciones de tránsito del municipio de Sáenz Peña se calculan en Unidades Fijas (UF), cuyo valor se actualiza periódicamente por ordenanza municipal. El monto final depende del tipo de infracción y de si el pago se realiza dentro del plazo de pago voluntario.',
      },
      {
        title: 'Descargo y pago de multas en Sáenz Peña',
        body: 'Desde la notificación del acta hay un plazo habitual de 5 días hábiles para presentar el descargo por escrito en la mesa de entradas del Juzgado de Faltas Municipal. Para el pago, el municipio habilitó Mercado Pago a través del portal oficial saenzpena.gob.ar, además de la atención presencial.',
      },
      {
        title: 'Verificar multas antes de comprar un auto usado en Sáenz Peña',
        body: 'Como en el resto del país, las infracciones quedan registradas en el dominio del vehículo. Antes de comprar un usado radicado en Sáenz Peña, conviene revisar tanto el registro municipal como el sistema provincial SINAI para no heredar deudas de tránsito.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas de Sáenz Peña por patente?',
        a: 'Ingresá la patente y seleccioná "Roque Sáenz Peña". Accedemos en tiempo real al sistema municipal SIGEIN y te mostramos las infracciones registradas, gratis y sin necesidad de crear una cuenta.',
      },
      {
        q: '¿Las multas de Sáenz Peña son municipales o provinciales?',
        a: 'Depende de dónde se cometió la infracción: dentro del ejido urbano las resuelve el Juzgado de Faltas municipal; en la Ruta Nacional 16 o la Ruta Provincial 13 corresponden a la Policía Caminera del Chaco vía SINAI.',
      },
      {
        q: '¿Cómo pago una multa municipal en Sáenz Peña?',
        a: 'El municipio habilitó el pago con Mercado Pago a través del portal oficial saenzpena.gob.ar, además de la atención presencial en el Juzgado de Faltas.',
      },
      {
        q: '¿Cuánto tiempo tengo para hacer un descargo en Sáenz Peña?',
        a: 'Generalmente 5 días hábiles desde la notificación del acta, presentando el escrito en la mesa de entradas del Juzgado de Faltas Municipal.',
      },
      {
        q: '¿En qué unidad se calculan las multas de Sáenz Peña?',
        a: 'En Unidades Fijas (UF), cuyo valor se actualiza periódicamente por ordenanza municipal.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en Chaco (Policía Caminera)', url: '/consultar-multa/multas-chaco', description: 'Consultá las infracciones provinciales labradas por la Policía Caminera en rutas del Chaco.' },
      { title: 'Cómo saber si un auto tiene deuda de patentes', url: '/guias/como-saber-si-auto-tiene-deuda-de-patentes', description: 'Guía para verificar deudas de patente antes de comprar un usado.' },
    ],
  },

  'multas-villa-la-angostura': {
    seoTitle: 'Multas en Villa La Angostura: Consultar Fotomultas por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de tránsito en Villa La Angostura, Neuquén, por patente. Accedemos al sistema municipal SIGEIN en tiempo real. Gratis, sin registro.',
    seoKeywords: 'multas villa la angostura, fotomultas villa la angostura, consultar multas villa la angostura, infracciones villa la angostura, juzgado de faltas villa la angostura, sigein villa la angostura, multas neuquen',
    intro: 'Consultamos el sistema municipal de Villa La Angostura (SIGEIN) por vos, en tiempo real y sin necesidad de crear una cuenta: fotomultas por exceso de velocidad e infracciones de tránsito, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'El radar de fotomultas de Villa La Angostura',
        body: 'Villa La Angostura opera un sistema de fotomultas por exceso de velocidad desde fines de 2021, en el marco de un convenio municipal con Cecaitra (Cámara de Control y Administración de Infracciones de Tránsito de la República Argentina), aprobado por el Concejo Deliberante por 4 años, prorrogable por 2 años más. La recaudación se reparte 35% para el municipio, 5% para la Agencia Nacional de Seguridad Vial y 60% para Cecaitra. En sus primeras semanas de funcionamiento, el radar llegó a labrar 84 actas por exceso de velocidad en menos de dos semanas.',
      },
      {
        title: 'Un pueblo turístico con un problema particular: notificar a los no residentes',
        body: 'En junio de 2026 la jueza municipal de faltas, Soledad Aldea, dispuso suspender el trámite de nuevas actas locales por infracciones de tránsito, al considerar injusto que solo los vecinos terminaran pagando mientras los turistas de paso no recibían la notificación a tiempo. El problema es que el sistema SINAI no contaba con un convenio postal activo para notificar a no residentes, generando demoras de hasta 60 días en el envío de las cédulas. Las infracciones no se anulan por esta suspensión: siguen acumulándose y son exigibles, y por ahora solo se procesan los pagos voluntarios. El municipio evalúa modificar la Ordenanza 1135 para resolver los plazos de notificación.',
      },
      {
        title: 'Cómo consultar y qué controla el radar',
        body: 'El sistema de fotomultas cubre el ejido municipal de Villa La Angostura, con el radar ubicado en un tramo recto y señalizado. Los límites vigentes son 40 km/h en zona escolar, 60 km/h en zona urbana, 110 km/h en ruta y 130 km/h en autopista. Podés consultar si tu patente tiene una infracción registrada directamente en el sistema oficial de consulta municipal.',
      },
      {
        title: 'Verificar multas antes de comprar un auto usado en Villa La Angostura',
        body: 'Al tratarse de un destino turístico con alta rotación de vehículos alquilados y visitantes, es habitual que un auto radicado en Villa La Angostura acumule fotomultas todavía no notificadas al titular. Como las infracciones quedan registradas en el dominio, conviene revisarlas antes de comprar un usado en la zona, incluso mientras la situación de notificación esté temporalmente suspendida.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas de Villa La Angostura por patente?',
        a: 'Ingresá la patente y seleccioná "Villa La Angostura". Accedemos en tiempo real al sistema municipal SIGEIN y te mostramos las fotomultas e infracciones registradas, gratis y sin necesidad de crear una cuenta.',
      },
      {
        q: '¿Es cierto que se suspendieron las multas en Villa La Angostura?',
        a: 'En junio de 2026 la jueza de faltas municipal suspendió el trámite de nuevas actas locales por un problema de notificación a turistas y no residentes. Las infracciones no se anulan: siguen acumulándose y son exigibles, y solo se procesan los pagos voluntarios mientras se resuelve el esquema de notificación.',
      },
      {
        q: '¿Quién opera el radar de fotomultas de Villa La Angostura?',
        a: 'Funciona en el marco de un convenio entre la Municipalidad y Cecaitra, aprobado a fines de 2021 por 4 años (prorrogable 2 años más), con la recaudación repartida entre el municipio, la ANSV y la empresa.',
      },
      {
        q: '¿Cuáles son los límites de velocidad que controla el radar?',
        a: '40 km/h en zona escolar, 60 km/h en zona urbana, 110 km/h en ruta y 130 km/h en autopista dentro del ejido de Villa La Angostura.',
      },
      {
        q: '¿Las fotomultas de Villa La Angostura afectan a autos de otras provincias?',
        a: 'Sí, el radar registra cualquier patente que circule por la zona controlada, sea local, de otra provincia o de alquiler; el problema reciente fue justamente la demora en notificar a quienes no residen en la localidad.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en Neuquén (fotomultas municipales)', url: '/consultar-multa/multas-neuquen', description: 'Consultá las fotomultas de Neuquén Capital, otra ciudad neuquina con radares municipales.' },
      { title: 'Calculadora de costos de transferencia', url: '/calculadora-de-costos-de-transferencia', description: 'Estimá el costo de transferir un auto usado comprado en la zona turística de Villa La Angostura.' },
    ],
  },

  'multas-rio-tercero': {
    seoTitle: 'Multas en Río Tercero (Córdoba): Consultar Infracciones por Patente | carChecking',
    seoDescription: 'Consultá multas e infracciones de tránsito en Río Tercero, Córdoba, por patente. Accedemos al sistema municipal SIGEIN en tiempo real. Gratis, sin registro.',
    seoKeywords: 'multas rio tercero, consultar multas rio tercero, infracciones rio tercero, fotomultas rio tercero, juzgado de faltas rio tercero, sigein rio tercero, multas cordoba',
    intro: 'Consultamos el sistema municipal de Río Tercero (SIGEIN) por vos, en tiempo real y sin necesidad de crear una cuenta: infracciones de tránsito y fotomultas captadas por radares fijos, con resultado en menos de un minuto directo desde la patente.',
    sections: [
      {
        title: 'Quién labra las multas en Río Tercero',
        body: 'La Dirección de Tránsito de la Municipalidad de Río Tercero, con oficinas en la intersección de Intendente Del Buono y San Pedro, es la responsable de las infracciones cometidas dentro del ejido urbano, incluyendo las actas captadas por radares fijos de velocidad. El municipio regula además cuestiones de tránsito específicas por ordenanza, como el sentido único en calles como Constitución y Rafael Obligado (Ordenanza 3584/2012) y el estacionamiento medido (Ordenanza 3493/2012).',
      },
      {
        title: 'Fotomultas por radares fijos',
        body: 'Río Tercero cuenta con radares fijos de control de velocidad cuyas actas pueden consultarse ingresando la patente o el DNI del titular en el portal municipal de consulta y pago de deuda, o directamente en el sistema SIGEIN habilitado para la ciudad.',
      },
      {
        title: 'Prescripción de las multas en Córdoba',
        body: 'En la provincia de Córdoba, la Ley 8560 establece que las faltas de tránsito consideradas leves prescriben a los 2 años y las graves a los 5 años desde que la infracción quedó firme. Este plazo aplica a las infracciones municipales de Río Tercero al igual que en el resto de la provincia.',
      },
      {
        title: 'Verificar multas antes de comprar un auto usado en Río Tercero',
        body: 'Las infracciones quedan registradas en el dominio del vehículo, no en la persona que conducía. Si vas a comprar un usado radicado en Río Tercero, conviene revisar el registro municipal de fotomultas y el estado ante la Policía Caminera de Córdoba antes de firmar la transferencia, para no heredar deudas de tránsito.',
      },
    ],
    faq: [
      {
        q: '¿Cómo consulto multas de Río Tercero por patente?',
        a: 'Ingresá la patente y seleccioná "Río Tercero". Accedemos en tiempo real al sistema municipal SIGEIN y te mostramos las infracciones registradas, gratis y sin necesidad de crear una cuenta.',
      },
      {
        q: '¿Río Tercero tiene radares fijos de fotomultas?',
        a: 'Sí, el municipio cuenta con radares fijos de control de velocidad cuyas actas se pueden consultar por patente o DNI en el portal municipal.',
      },
      {
        q: '¿Cuánto tarda en prescribir una multa de tránsito en Río Tercero?',
        a: 'Según la Ley provincial 8560, las faltas leves prescriben a los 2 años y las graves a los 5 años desde que la infracción quedó firme.',
      },
      {
        q: '¿Dónde queda la Dirección de Tránsito de Río Tercero?',
        a: 'En la intersección de Intendente Del Buono y San Pedro, con atención de lunes a viernes de 7 a 14 hs.',
      },
      {
        q: '¿Las multas de Río Tercero son distintas de las de la Policía Caminera de Córdoba?',
        a: 'Sí. Las infracciones dentro del ejido urbano las gestiona el municipio; las labradas en rutas provinciales por la Policía Caminera se registran en un sistema aparte.',
      },
    ],
    relatedGuides: [
      { title: 'Multas en Córdoba (Policía Caminera)', url: '/consultar-multa/multas-cordoba', description: 'Consultá las infracciones provinciales labradas por la Policía Caminera de Córdoba en rutas y autopistas.' },
      { title: 'Solicitar un turno', url: '/solicitar-turno', description: 'Reservá un turno de inspección antes de comprar o vender un auto usado en Río Tercero.' },
    ],
  },

};
