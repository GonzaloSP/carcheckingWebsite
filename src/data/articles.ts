// Blog Articles Data - Extracted from www.carchecking.com.ar
// To add a new article, simply add a new object to this array

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  metaTitle: string;
  metaDescription: string;
}

const base = import.meta.env.BASE_URL;

export const articles: Article[] = [
  {
    id: 'transfer-costs-calculator',
    slug: 'calculadora-costos-transferencia-auto-usado',
    title: 'Calculadora de costos de transferencia: estimación rápida (Argentina)',
    excerpt: 'Ingresá el precio del vehículo y obtené un estimado de costos de transferencia en Argentina con un desglose simple (aranceles + sellos).',
    author: 'carChecking',
    date: '2026-02-05',
    category: 'Documentación',
    tags: ['transferencia', 'costos', 'autos usados', 'DNRPA', 'sellos', '08'],
    image: `${base}images/hero_car.jpg`,
    metaTitle: 'Calculadora de costos de transferencia de autos usados (Argentina) | carChecking',
    metaDescription: 'Calculadora simple para estimar costos de transferencia de un auto usado en Argentina. Incluye desglose de aranceles y sellos. Valores aproximados.',
    content: `
## Calculadora de costos de transferencia de autos usados (Argentina)

Si estás por comprar o vender un auto usado, una de las preguntas típicas es cuánto sale la transferencia. En la práctica el costo final depende de múltiples variables (jurisdicción, registro, valuación, situación del vehículo), pero podés tener un **estimado rápido** para planificar.

A continuación tenés una calculadora que toma el **precio del vehículo** y muestra un **desglose** de los conceptos más comunes (aranceles y sellos) para obtener un total aproximado.

[[transfer_cost_calculator]]

### Importante

- Es una **estimación**: pueden existir costos adicionales (gestoría, verificaciones, certificaciones, etc.).
- Para contrastar el valor, podés consultar la **tabla de valuación** del DNRPA (referencia usada por registros):
  - http://www.dnrpa.gov.ar/valuacion/informacion/05-04-2018.pdf

### Qué incluye este cálculo (resumen)

- Arancel de transferencia (porcentaje sobre el precio)
- Sellos provinciales (porcentaje sobre el precio)
- Otros conceptos fijos (formularios/aranceles)

Si querés, decime la provincia o el caso (particular / compra en agencia / con prenda) y lo adaptamos.
    `,
  },
  {
    id: 'caba-gba-revision-precompra-domicilio',
    slug: 'revision-precompra-a-domicilio-caba-gba',
    title: 'Revisión precompra a domicilio en CABA y GBA: qué incluye, cuánto tarda y cuánto cuesta',
    excerpt:
      'Guía práctica para revisar un auto antes de comprar en CABA y Gran Buenos Aires: qué se controla, cuánto tarda una inspección, rangos de precio y cómo coordinar.',
    author: 'carChecking',
    date: '2026-02-05',
    category: 'Revisión del Vehículo',
    tags: [
      'revisión precompra',
      'inspección pre compra',
      'mecánico a domicilio',
      'revisar auto antes de comprar',
      'CABA',
      'GBA',
      'autos usados',
      'escaneo OBD',
      'informe con fotos',
    ],
    image: `${base}images/mechanic_working.jpg`,
    metaTitle:
      'Revisión precompra a domicilio en CABA y GBA: qué incluye, cuánto tarda y precio | carChecking',
    metaDescription:
      'Revisión precompra a domicilio en CABA y Gran Buenos Aires: qué incluye (mecánica, OBD, carrocería), cuánto tarda, rangos de precio y cómo solicitar turno.',
    content: `
## Revisión precompra a domicilio en CABA y GBA: la forma práctica de revisar un auto antes de comprar

Si estás por comprar un usado, la pregunta más común es simple: **¿cómo reviso el auto antes de pagar?**

En CABA y Gran Buenos Aires, lo más cómodo es una **revisión precompra a domicilio**: el mecánico va donde está el vehículo (casa del vendedor, concesionaria, cochera) y hace una inspección completa para detectar problemas ocultos.

> Objetivo: **comprar con tranquilidad** y evitar sorpresas (kilometraje adulterado, choques ocultos, fallas electrónicas, pérdidas, etc.).

---

## ¿Qué incluye una revisión precompra completa?

Una revisión precompra bien hecha no es “mirar por arriba”. En general incluye:

### 1) Revisión mecánica
- Motor (pérdidas, ruidos, humo, correas/mangueras visibles)
- Caja/embrague (sensaciones, ruidos, vibraciones)
- Tren delantero y trasero (juegos, ruidos, suspensión)
- Frenos (estado general, tacto, desviaciones)

### 2) Carrocería y estructura
- Señales de repintado y reparaciones
- Alineaciones (puertas, capot, baúl)
- Chasis / puntos clave visibles
- Evidencia de granizo, choques o inundación

### 3) Interior y equipamiento
- Funcionamiento de comandos y accesorios
- Señales de desgaste incoherentes con el kilometraje declarado

### 4) **Escaneo OBD (cuando aplica)**
- Lectura de fallas en la ECU
- Parámetros básicos para detectar inconsistencias

### 5) Prueba dinámica (si se puede)
- Cómo se comporta en marcha: ruidos, vibraciones, cambios, temperatura, frenos.

### 6) Informe
- Resumen claro de hallazgos
- Recomendaciones y “alertas rojas”
- Idealmente con fotos/documentación

---

## ¿Cuánto tarda una revisión precompra a domicilio?

Depende del vehículo y del acceso (luz, espacio, posibilidad de prueba), pero como referencia:

- **Revisión completa:** 60–120 minutos
- Si hay que revisar cosas puntuales o el vehículo tiene particularidades (GNC, importado, etc.), puede extenderse.

---

## ¿Cuánto cuesta revisar un auto antes de comprar en CABA y GBA?

El precio depende de:
- tipo de vehículo y complejidad
- distancia/zona
- nivel de detalle y si incluye escaneo + informe

En carChecking ofrecemos un servicio con **precio publicado** e incluye:
- revisión completa
- escaneo computarizado
- informe escrito

Podés ver el precio y solicitar turno acá:

- **Solicitar turno:** [/solicitar-turno](/solicitar-turno)

---

## ¿Qué NO hace una revisión precompra (para que sea claro)?

Una inspección a domicilio no reemplaza:
- desarme profundo
- “abrir motor”
- análisis de laboratorio

Pero sí sirve para detectar **la mayoría de los problemas típicos** que hacen que un usado sea una mala compra.

---

## Cobertura

Actualmente trabajamos en:
- **CABA**
- **Gran Buenos Aires**

---

## Preguntas rápidas

**¿Conviene revisar si el auto parece impecable?**
Sí: muchas fallas y choques reparados no se ven en una visita rápida.

**¿La revisión sirve para negociar el precio?**
Totalmente: un informe con hallazgos te da base para negociar o para salir de la operación.

---

## ¿Querés que revisemos el auto por vos?

Coordinamos por WhatsApp y vamos al lugar.

- **Solicitar turno:** [/solicitar-turno](/solicitar-turno)
    `,
  },
  {
    id: 'donde-revisar-auto-caba-gba',
    slug: 'donde-revisar-auto-antes-de-comprar-caba-gba',
    title:
      'Dónde revisar un auto antes de comprar en CABA y GBA: taller vs a domicilio vs perito',
    excerpt:
      'Comparativa práctica para decidir dónde revisar un auto usado en CABA y GBA: taller, perito/inspector a domicilio o revisión rápida. Pros, contras y recomendaciones.',
    author: 'carChecking',
    date: '2026-02-05',
    category: 'Revisión del Vehículo',
    tags: [
      'donde revisar auto',
      'revisar auto antes de comprar',
      'revisión precompra',
      'CABA',
      'GBA',
      'taller mecánico',
      'mecánico a domicilio',
      'perito automotor',
    ],
    image: `${base}images/engine_bay.jpg`,
    metaTitle:
      'Dónde revisar un auto antes de comprar en CABA y GBA (taller vs a domicilio) | carChecking',
    metaDescription:
      'Dónde revisar un auto usado antes de comprar en CABA y Gran Buenos Aires: comparativa entre taller, inspector a domicilio y perito. Qué conviene según tu caso.',
    content: `
## Dónde revisar un auto antes de comprar en CABA y GBA

Si estás a punto de comprar un usado, una de las mejores decisiones que podés tomar es **revisarlo antes de señar/pagar**. La pregunta es: **¿dónde conviene hacerlo en CABA y Gran Buenos Aires?**

Acá va una comparativa simple (con pros y contras reales) para elegir bien.

---

## Opción 1: Taller mecánico

**Cuándo conviene**
- Si ya tenés un taller de confianza
- Si querés elevador/fosa (según el taller)

**Pros**
- Puede haber más herramientas y elevación
- Si el taller es bueno, pueden detectar cosas mecánicas profundas

**Contras**
- Tenés que mover el auto (y el vendedor a veces no quiere)
- Si el auto tiene un problema “intermitente”, puede no aparecer en el traslado
- No siempre incluyen escaneo/informe claro

---

## Opción 2: Revisión precompra a domicilio (inspector/mecánico va al auto)

**Cuándo conviene**
- Cuando el auto está en una cochera, concesionaria o casa del vendedor
- Cuando querés un diagnóstico práctico para decidir rápido

**Pros**
- No dependés de trasladar el auto
- Ideal para ver el vehículo “como está” en el momento
- Suele incluir **escaneo OBD** e **informe** (según el servicio)

**Contras**
- No es un desarme profundo
- Depende de condiciones del lugar (luz/espacio)

Si querés entender bien cómo es, mirá esta guía: [revisión precompra a domicilio en CABA y GBA](/guias/revision-precompra-a-domicilio-caba-gba).

---

## Opción 3: Perito/inspector especializado (enfocado en choque, pintura, estructura)

**Cuándo conviene**
- Si tu mayor miedo es “auto chocado” / reparaciones ocultas
- Si el auto es caro o querés máxima tranquilidad

**Pros**
- Muy buenos para detectar repintados, masilla, piezas reemplazadas

**Contras**
- A veces no cubren tanto la parte mecánica/electrónica
- Puede terminar siendo “complementario” (perito + mecánico)

---

## ¿Qué conviene en la práctica?

- Si querés una decisión rápida y completa: **revisión precompra a domicilio**.
- Si ya tenés taller de confianza y el vendedor acepta: **taller**.
- Si te preocupa fuerte la estructura/pintura: sumar **perito** (solo o combinado).

---

## Checklist mínima (si vas a ver el auto vos)

- Verificá que arranque en frío y no humee raro
- Revisá señales de repintado (tonos distintos, tornillos marcados)
- Mirá desgaste interior vs kilometraje
- Pedí papeles básicos y, si te interesa, considerá un **informe de dominio**

---

## ¿Querés que lo revisemos por vos en CABA o GBA?

Coordinamos por WhatsApp y vamos al lugar.

- **Solicitar turno:** [/solicitar-turno](/solicitar-turno)
    `,
  },
  {
    id: 'informe-dominio-caba-gba',
    slug: 'informe-de-dominio-auto-argentina-caba-gba',
    title:
      'Informe de dominio en Argentina: qué es, qué muestra y cuándo pedirlo (CABA y GBA)',
    excerpt:
      'Guía simple del informe de dominio para comprar un auto usado en Argentina: qué información trae (prendas, embargos, titularidad) y cuándo conviene pedirlo en CABA/GBA.',
    author: 'carChecking',
    date: '2026-02-05',
    category: 'Documentación',
    tags: [
      'informe de dominio',
      'gestoría',
      'transferencia',
      'autos usados',
      'prenda',
      'embargo',
      'CABA',
      'GBA',
    ],
    image: `${base}images/scanner_hands.jpg`,
    metaTitle:
      'Informe de dominio: qué es, qué muestra y cuándo pedirlo (Argentina) | carChecking',
    metaDescription:
      'Qué es el informe de dominio del automotor, qué información muestra (prendas, embargos, titularidad) y cuándo conviene pedirlo antes de comprar un auto usado en Argentina.',
    content: `
## Informe de dominio en Argentina: qué es y para qué sirve

Cuando vas a comprar un usado, no alcanza con que el auto “ande bien”: también tenés que chequear la **situación jurídica/documental**.

El **informe de dominio** (también llamado informe de dominio del automotor) sirve para conocer si el vehículo tiene situaciones que te pueden complicar la compra.

---

## ¿Qué muestra un informe de dominio?

Según el caso, puede incluir información como:

- Titularidad / datos del titular
- **Prendas**
- **Embargos**
- Denuncia de venta o robo
- Radicación
- Pedido de secuestro
- Prohibición para circular
- Trámites pendientes

---

## ¿Cuándo conviene pedirlo?

- Cuando el auto tiene un precio atractivo “demasiado bueno”
- Cuando el vendedor no es titular o hay dudas de papeles
- Antes de señar un vehículo (ideal)
- Si vas a cerrar rápido y querés reducir riesgo

---

## Informe de dominio + revisión mecánica: la mejor combinación

La forma más segura de comprar es combinar:
- **revisión precompra** (mecánica + escaneo) y
- **chequeo documental** (informe de dominio / gestoría)

Si te interesa, mirá nuestro **Servicio de Gestoría**:
- [/servicio-gestoria](/servicio-gestoria)

Y si querés inspección a domicilio:
- [/solicitar-turno](/solicitar-turno)

---

## Pregunta típica: ¿el informe de dominio reemplaza la verificación mecánica?

No. El informe de dominio te protege de problemas documentales. La inspección mecánica te protege de problemas técnicos (kilometraje adulterado, choques ocultos, fallas, etc.).

---

## ¿Querés que lo gestionemos por vos?

- **Servicio de gestoría:** [/servicio-gestoria](/servicio-gestoria)
    `,
  },
  {
    id: '7',
    slug: 'inspeccion-pre-compra-auto-a-domicilio',
    title: 'Inspección pre compra auto: qué incluye una inspección a domicilio y por qué conviene',
    excerpt: 'Conocé qué incluye una inspección pre compra a domicilio, cómo ayuda el escaneo OBD y por qué conviene antes de comprar un auto usado.',
    author: 'carChecking',
    date: '2026-02-02',
    category: 'Revisión del Vehículo',
    tags: ['inspección pre compra', 'inspección precompra', 'revisión pre compra', 'mecánico a domicilio', 'escaneo OBD', 'peritaje vehicular', 'autos usados', 'CABA', 'GBA'],
    image: `${base}images/mechanic_working.jpg`,
    metaTitle: 'Inspección pre compra auto a domicilio: qué incluye y cuánto cuesta | carChecking',
    metaDescription: 'Conocé qué incluye una inspección precompra a domicilio: revisión mecánica, escaneo OBD, informe con fotos y qué detectar antes de comprar un auto usado.',
    content: `
## Inspección pre compra auto: la forma más simple de comprar un usado con tranquilidad

Comprar un auto usado puede ser una gran compra… o un dolor de cabeza. Por eso existe la **inspección pre compra auto** (también llamada inspección precompra, revisión pre compra o incluso **peritaje vehicular/peritaje automotor** en algunos lugares).

La idea es muy simple: **revisar el auto antes de pagar** para detectar problemas ocultos y saber si el precio que te piden tiene sentido.

## ¿Qué es una inspección precompra auto a domicilio?

Una **inspección precompra auto a domicilio** es cuando el mecánico va al lugar donde está el vehículo (casa del vendedor, concesionaria, cochera) y hace la revisión ahí mismo.

Esto es cómodo porque:
- No dependés de mover el auto a un taller
- No perdés tiempo coordinando traslados
- Podés tomar una decisión con información real (y no “a ojo”)

Si estás buscando “**mecánico a domicilio para revisar auto usado**”, esto es exactamente lo que necesitás.

## ¿Qué incluye una inspección mecánica pre compra?

Te cuento lo típico que debería incluir una inspección completa (lo importante es que sea clara y te deje una conclusión útil):

### 1) Revisión mecánica y visual general
- Motor: pérdidas, ruidos raros, humo, estado general
- Refrigeración: señales de recalentadas, mangueras, pérdidas
- Caja y embrague: comportamiento, ruidos, cambios
- Suspensión y dirección: golpes, holguras, ruidos en baches
- Frenos: respuesta, vibraciones, desgaste
- Neumáticos: desgaste irregular (da pistas de alineación/suspensión)
- Carrocería: signos de choque o repintado
- Interior: desgaste lógico vs kilometraje declarado

Tip: un motor “lavado a nuevo” a veces es para disimular pérdidas. No siempre, pero vale prestarle atención.

Si tu duda principal es el kilometraje, te puede servir esta guía: [cómo verificar que el cuentakilómetros no ha sido alterado](/guias/guia-verificar-cuentakilometros-no-alterado).

### 2) Escaneo OBD pre compra (diagnóstico computarizado)

El **escaneo OBD** sirve para leer información de la computadora del auto (si querés profundizar, mirá esta guía: [para qué sirve escanear un vehículo](/guias/para-que-sirve-escanear-un-vehiculo)). Es muy útil para:
- Ver **códigos de falla** (activos o “pendientes”)
- Detectar si **borraron fallas** hace poco
- Revisar datos en vivo (según el auto)

Importante: el escaneo ayuda muchísimo, pero **no reemplaza** la revisión mecánica ni la prueba de manejo.

### 3) Prueba de manejo (si se puede)

Si el vendedor permite, es clave. En la prueba se revisa:
- Arranque en frío y en caliente
- Ruidos al acelerar o doblar
- Vibraciones, tironeos
- Frenada (recta, sin vibrar)
- Dirección (alineación, juego)
- Temperatura estable (ojo con recalentadas)

### 4) Informe final claro (ideal con fotos)

Lo mejor es terminar con un informe que te diga:
- Qué está bien
- Qué hay que hacer pronto (y por qué)
- Qué es “alerta roja” (si conviene salir corriendo o renegociar fuerte)
- Fotos cuando aplica

## “Peritaje automotor” vs “inspección pre compra”: ¿hay diferencia?

Depende del país o de la empresa. A veces “peritaje” se usa más para:
- Identificación / estado registral
- Carrocería / estructura

Y “inspección pre compra” se usa más para:
- Mecánica y prueba de manejo
- Escaneo OBD

En la práctica, si vas a comprar un usado, lo ideal es que el servicio cubra **todo lo importante**: mecánica + carrocería + escaneo + prueba.

## Inspección vehicular en CABA, GBA o tu ciudad: qué conviene preguntar

Si buscás “**inspección vehicular CABA / GBA / [ciudad]**”, antes de reservar preguntá:
- ¿Es realmente a domicilio?
- ¿Incluye escaneo OBD?
- ¿Entregan informe (y si tiene fotos)?
- ¿Cuánto tarda?
- ¿Qué pasa si el auto no está apto?

## ¿Cuánto cuesta inspección precompra auto?

La respuesta real: depende. El precio varía por:
- Tipo de vehículo (auto, SUV, pick-up)
- Complejidad del escaneo y la revisión
- Zona/ciudad y traslado
- Si incluye informe con fotos y prueba de manejo

Consejo honesto: más que mirar solo el precio, mirá **qué incluye**. Una inspección completa suele salir muchísimo menos que una reparación grande (o que comprar un problema).

## Preguntas rápidas (las que todos hacen)

### “¿Hace falta si el auto se ve impecable?”

Sí. Lo más caro muchas veces no se ve (recalentadas, fallas electrónicas, choques bien disimulados).

### “¿El escaneo OBD detecta todo?”

No todo, pero detecta un montón de cosas que a simple vista se pasan.

### “¿Y si el vendedor no quiere que lo revisen?”

Es una señal de alerta. Si está todo bien, lo normal es que no haya problema con una inspección.

---

## También te puede interesar

Si estás armando tu compra paso a paso, estas dos guías te van a servir muchísimo:

[Qué revisar antes de comprar un auto usado (checklist)](/guias/que-revisar-antes-de-comprar-auto-usado-checklist)

[Qué papeles revisar al comprar un auto usado en Argentina](/guias/papeles-auto-usado-argentina-informe-dominio-verificacion-policial)

Si estás por comprar un usado, una inspección pre compra auto a domicilio te ayuda a decidir con tranquilidad y, si hace falta, a negociar con argumentos.
    `
  },
  {
    id: '8',
    slug: 'que-revisar-antes-de-comprar-auto-usado-checklist',
    title: 'Qué revisar antes de comprar un auto usado: checklist simple (pero muy efectiva)',
    excerpt: 'Checklist práctica para comprar un auto usado: qué mirar en motor, carrocería, interior, prueba de manejo y señales de choque, inundación o kilometraje adulterado.',
    author: 'carChecking',
    date: '2026-02-02',
    category: 'Comprando un Vehículo Usado',
    tags: ['qué revisar antes de comprar un auto usado', 'checklist compra auto usado', 'prueba de manejo', 'auto chocado', 'auto inundado', 'kilometraje adulterado', 'escaneo OBD'],
    image: `${base}images/hero_car.jpg`,
    metaTitle: 'Qué revisar antes de comprar un auto usado: checklist completo | carChecking',
    metaDescription: 'Checklist práctico para comprar un auto usado: qué mirar en motor, carrocería, interior, prueba de manejo y señales de choque, inundación o kilometraje adulterado.',
    content: `
## Qué revisar antes de comprar un auto usado: checklist simple (pero muy efectiva)

Si estás por comprar un auto usado, te conviene ir con una checklist. No hace falta ser mecánico: con algunas observaciones básicas podés evitar errores típicos.

Acá tenés una guía práctica con lo que más importa. Y si querés ir a lo seguro, lo ideal es sumar una inspección pre compra profesional (acá explicamos cómo es: [inspección pre compra auto a domicilio](/guias/inspeccion-pre-compra-auto-a-domicilio)).

## 1) Motor: lo que conviene mirar primero
- ¿Ves pérdidas de aceite o refrigerante?
- ¿El motor suena parejo o “cascabelea”?
- ¿Sale humo al acelerar? (ojo con humo azul/blanco/negro)
- ¿Hay olor fuerte a combustible?
- ¿El ralentí es estable o tiembla mucho?

Tip: si el motor está excesivamente lavado, puede ser solo “detailing”… o puede ser para tapar pérdidas.

## 2) Refrigeración: clave para evitar una compra cara
- ¿La temperatura se mantiene normal?
- ¿El refrigerante se ve limpio?
- ¿Hay señales de recalentadas (mangueras, depósitos, “mayonesa”)?

Las recalentadas suelen ser de las cosas más caras y más comunes en usados mal mantenidos.

## 3) Caja y embrague (o transmisión)
- ¿Los cambios entran suave?
- ¿El embrague patina?
- ¿Sentís golpes o tironeos?
- En automáticos: ¿cambia suave o pega tirones?

## 4) Frenos, suspensión y dirección
- Frenás y el auto: ¿se va para un lado?
- ¿Vibra el volante al frenar?
- ¿Golpea al pasar baches?
- ¿Los neumáticos están gastados parejo?

Desgaste raro en cubiertas = pistas de alineación, amortiguadores o tren delantero.

## 5) Cómo saber si un auto fue chocado (carrocería y detalles)
- Diferencias de tono en pintura
- Separaciones raras entre puertas/capot/baúl
- Tornillos marcados (indican desarme)
- Ópticas distintas (una nueva y otra vieja)
- Masilla o soldaduras raras

Ojo: un choque no siempre significa “no comprar”, pero sí significa revisar bien la reparación y negociar con información.

## 6) Interior y kilometraje: que sea coherente
- Volante gastado, pedales gastados, butaca hundida
- Botones borrados
- Alfombras muy gastadas

Si el auto marca pocos km pero parece “recontra caminado”, sospechá.

## 7) Qué mirar en la prueba de manejo
- Arranque en frío
- Ruidos al doblar, frenar o acelerar
- Vibraciones en ruta
- Dirección alineada
- Frenos firmes y sin vibraciones
- Temperatura estable

## 8) Cómo detectar un auto inundado (señales típicas)
- Olor a humedad que no se va
- Óxido bajo asientos o tornillos del piso
- Humedad en baúl o rueda de auxilio
- Fallas eléctricas aleatorias (vidrios, cierre, tablero)

Los autos inundados suelen dar problemas eléctricos con el tiempo, incluso si “hoy anda”.

## 9) Cómo saber si el kilometraje fue adulterado (sin volverse loco)

No hay un truco mágico, pero estas señales ayudan (si querés profundizar: [guía para verificar que el cuentakilómetros no ha sido alterado](/guias/guia-verificar-cuentakilometros-no-alterado)):
- Desgaste interior no coincide con los km
- Historial de service con inconsistencias
- Escaneo OBD (en algunos modelos se puede contrastar info)
- Vendedor apurado o evasivo con preguntas

## Bonus: escaneo OBD antes de comprar

Si podés, pedí un escaneo OBD antes de cerrar. Si te interesa el tema, acá tenés una guía más completa: [para qué sirve escanear un vehículo](/guias/para-que-sirve-escanear-un-vehiculo).

Sirve para:
- Ver fallas activas o pendientes
- Detectar si borraron errores
- Encontrar problemas intermitentes

## Conclusión

Esta checklist te ayuda a reducir el riesgo. Pero si querés tomar la mejor decisión (y negociar mejor), lo ideal es una inspección pre compra completa: mecánica + prueba + escaneo OBD + informe.

## También te puede interesar

[Inspección pre compra auto a domicilio: qué incluye y por qué conviene](/guias/inspeccion-pre-compra-auto-a-domicilio)

[Papeles para comprar un auto usado en Argentina: guía simple](/guias/papeles-auto-usado-argentina-informe-dominio-verificacion-policial)
    `
  },
  {
    id: '9',
    slug: 'papeles-auto-usado-argentina-informe-dominio-verificacion-policial',
    title: 'Qué papeles revisar al comprar un auto usado en Argentina (para no llevarte sorpresas)',
    excerpt: 'Guía simple de papeles para comprar un auto usado en Argentina: informe de dominio, verificación policial, prenda, multas, VTV y grabado de autopartes.',
    author: 'carChecking',
    date: '2026-02-02',
    category: 'Comprando un Vehículo Usado',
    tags: ['qué papeles revisar auto usado Argentina', 'informe de dominio', 'verificación policial', 'auto con prenda', 'multas', 'VTV', 'grabado autopartes', 'Argentina'],
    image: `${base}images/engine_bay.jpg`,
    metaTitle: 'Papeles auto usado Argentina: dominio, verificación, prenda, multas y VTV | carChecking',
    metaDescription: 'Guía de papeles para comprar un auto usado en Argentina: informe de dominio, verificación policial, prenda, multas, VTV y grabado de autopartes.',
    content: `
## Qué papeles revisar al comprar un auto usado en Argentina (para no llevarte sorpresas)

En Argentina, un auto puede estar impecable… y aun así ser un problema si la documentación no está en orden. Por eso, antes de señar o cerrar, conviene revisar algunos puntos básicos.

Acá va una guía simple, bien “a tierra”.

Si además querés revisar el auto por fuera y por dentro, te recomiendo esta checklist: [qué revisar antes de comprar un auto usado](/guias/que-revisar-antes-de-comprar-auto-usado-checklist).

## 1) Informe de dominio auto: qué es y por qué te conviene pedirlo

El **informe de dominio** te ayuda a ver información clave del vehículo, por ejemplo:
- Quién es el titular
- Si tiene **prenda**
- Si hay **embargos** u otras restricciones

En otras palabras: te ayuda a evitar comprar un auto que después sea difícil (o imposible) de transferir como corresponde.

## 2) Verificación policial auto usado

La **verificación policial** sirve para constatar que los números de motor y chasis estén bien y coincidan, y que no haya señales de adulteración.

Aunque es un paso habitual en transferencias, también es una buena medida de seguridad para vos como comprador.

## 3) Auto con prenda: cómo saberlo y qué significa

Si el auto tiene prenda, suele estar asociado a una financiación. ¿Qué implica?
- Puede complicar la transferencia
- Puede requerir levantamiento/cancelación antes de cerrar

Por eso es tan importante detectarlo con tiempo (y no después de pagar).

## 4) Multas antes de comprar un auto: cuidado con las deudas

Antes de comprar, revisá el tema multas porque:
- Pueden generar deudas
- En algunos casos pueden trabar trámites o sumar costos inesperados

Consejo: dejá claro por escrito cómo se resuelve (quién paga qué) antes de cerrar.

## 5) VTV vencida: ¿es “no comprar”?

No siempre. Una **VTV vencida** puede ser solo desorden… o puede ser que el auto no estaba en condiciones.

Lo más sano es tomarlo como señal para:
- Revisar mecánica con más atención
- Considerar posibles arreglos
- Negociar el precio si corresponde

## 6) Grabado de autopartes obligatorio

El **grabado de autopartes** es un requisito común en varias jurisdicciones. Si falta, puede ser un costo/gestión extra.

Antes de comprar:
- Verificá si está hecho
- Confirmá qué se exige en tu zona para no trabarte después

## Checklist rápido (lo esencial)

Antes de pagar:
- Titularidad clara (quién firma)
- Informe de dominio OK (sin prenda/embargos problemáticos)
- Verificación policial viable/hecha
- Estado de multas claro
- VTV al día o negociación por los arreglos
- Grabado de autopartes (si aplica)

## Consejo final: papeles + mecánica = compra inteligente

La mejor compra es la que hacés con información real. Lo ideal es combinar:
- Revisión de papeles (dominio, prenda, multas, VTV)
- Inspección pre compra (mecánica + escaneo OBD)

Así reducís muchísimo el riesgo y comprás con tranquilidad.

## También te puede interesar

[Inspección pre compra auto a domicilio: qué incluye y por qué conviene](/guias/inspeccion-pre-compra-auto-a-domicilio)

[Qué revisar antes de comprar un auto usado (checklist)](/guias/que-revisar-antes-de-comprar-auto-usado-checklist)
    `
  },

  {
    id: '1',
    slug: 'guia-verificar-cuentakilometros-no-alterado',
    title: 'Guía para verificar que el cuentakilómetros no ha sido alterado',
    excerpt: 'Aprenda a detectar si el odómetro de un vehículo fue modificado. Conozca las señales de alerta en cuentakilómetros analógicos y digitales.',
    author: 'carChecking',
    date: '2024-01-15',
    category: 'Revisión del Vehículo',
    tags: ['cuentakilómetros', 'fraude', 'odómetro', 'kilometraje', 'verificación'],
    image: `${base}images/engine_bay.jpg`,
    metaTitle: 'Guía para verificar que el cuentakilómetros no ha sido alterado | carChecking',
    metaDescription: 'Aprenda a detectar cuentakilómetros adulterados. Guía completa para verificar odómetros analógicos y digitales antes de comprar un auto usado.',
    content: `
## Tipos de cuentakilómetros

Uno de los puntos más importantes en la revisión de un vehículo es cerciorarse de la cantidad de kilómetros con la que éste cuenta, y para realizar esta tarea no es suficiente confiar en lo que marca el cuentakilómetros. Para comenzar debemos comentar que hay dos tipos de cuentakilómetros: uno analógico (o mecánico) y uno digital.

En principio el cuentakilómetros (odómetro) mecánico es más simple de detectar cuando fue modificado.

## Detectando modificaciones en el cuentakilómetros mecánico

A la hora de revisar un vehículo con cuentakilómetros analógico hay más indicadores a los cuales debemos prestar atención. Un cuentakilómetros que no ha sido alterado presenta sus números alineados y sin ningún tipo de marcas.

En general cuando el cuentakilómetros es regresado se notarán algunas marcas de desgaste en las esquinas. También debemos observar con atención si cada uno de los dígitos está alineado con el siguiente, ya que a veces cuando el odómetro se regresa, y el trabajo no es hecho en forma prolija, sucede que hay una pequeña diferencia en la alineación entre los dígitos, sobre todo con el primero de la izquierda.

También preste atención a si el tablero tiene marcas de haber sido desmontado, ya que este paso es necesario para acceder al cuentakilómetros.

## Detectando modificaciones en el cuentakilómetros digital

Para detectar si el cuentakilómetros digital de un automóvil ha sido modificado es una tarea complicada y que solo puede ser realizada por un experto.

Sólo los autos de alta gama mantienen un registro en la computadora de la cantidad de kilómetros realizados y si estos fueron modificados al conectar un escáner se podrá detectar inmediatamente la adulteración.

En los vehículos que no son de alta gama, lo que podemos hacer como usuarios es llamar al concesionario de la marca del vehículo y verificar si las mantenciones han sido realizadas en tiempo y forma.

## Lo más importante: el desgaste general

Ya sea que podamos confirmar la cantidad de kilómetros realizados por el vehículo revisando los puntos anteriormente mencionados o no, hay otro aspecto más importante al cual el comprador del vehículo debe prestar suma atención: el desgaste general del mismo.

### Qué revisar:

- **Volante**: Desgaste del cuero o plástico
- **Pedales**: Goma desgastada, metal visible
- **Asientos**: Desgaste del tapizado, costuras
- **Pisos**: Alfombras gastadas
- **Neumáticos**: Si el auto tiene menos de 60.000 km, debería tener los neumáticos originales
- **Cierre de puertas**: Si el auto fue taxi/remís, las puertas cierran con más fuerza

### Kilometraje normal

Un vehículo en uso normal recorre entre 10.000 y 15.000 kilómetros al año. A la hora de comprar un vehículo usado, la verificación del desgaste de los componentes, independientemente de lo que indique el cuentakilómetros, es sumamente importante.

---

**¿Necesita una revisión profesional?** En carChecking verificamos el kilometraje real con escaneo computarizado y revisión mecánica completa.

Para complementar, te puede servir:

- [Inspección pre compra auto a domicilio: qué incluye y por qué conviene](/guias/inspeccion-pre-compra-auto-a-domicilio)
- [Qué papeles revisar al comprar un auto usado en Argentina](/guias/papeles-auto-usado-argentina-informe-dominio-verificacion-policial)
    `
  },
  {
    id: '2',
    slug: '10-cosas-a-tener-en-cuenta-comprar-vehiculo-usado-argentina',
    title: '10 cosas a tener en cuenta al comprar un vehículo usado en Argentina',
    excerpt: 'Guía completa con los 10 aspectos fundamentales que debe considerar antes de comprar un auto usado en el mercado argentino.',
    author: 'carChecking',
    date: '2024-01-10',
    category: 'Comprando un Vehículo Usado',
    tags: ['compra de auto', 'usados', 'Argentina', 'guía', 'consejos'],
    image: `${base}images/hero_car.jpg`,
    metaTitle: '10 cosas a tener en cuenta al comprar un vehículo usado en Argentina | carChecking',
    metaDescription: 'Guía completa con 10 consejos esenciales para comprar un auto usado en Argentina. Evite fraudes y haga una compra segura.',
    content: `
## 1. Define tu presupuesto

Antes de empezar a buscar un vehículo usado en Argentina, es importante que tengas en cuenta cuánto dinero estás dispuesto a gastar en la compra. Esto te ayudará a enfocarte en los vehículos que se ajusten a tu presupuesto.

## 2. Investiga el modelo de vehículo que te interesa

Una vez que hayas definido tu presupuesto, es importante que investigues el modelo de vehículo que te interesa. Consulta precios, características y opiniones de expertos y usuarios sobre el modelo que te interesa.

## 3. Busca opciones confiables de venta

Existen diversas opciones para comprar un vehículo usado en Argentina, desde vendedores particulares hasta concesionarios de vehículos usados. Es importante que escojas opciones confiables para evitar estafas y problemas.

## 4. Verifica el estado mecánico del vehículo

Antes de comprar un vehículo usado en Argentina, es esencial que verifiques el estado mecánico del vehículo. Para ello, te recomendamos nuestro servicio de revisión de vehículos a comprar.

Si querés entender bien el proceso y qué incluye, mirá esta guía: [inspección pre compra auto a domicilio](/guias/inspeccion-pre-compra-auto-a-domicilio).

## 5. Revisa la documentación del vehículo

Además de verificar el estado mecánico del vehículo, es importante que revises la documentación del vehículo. Si estás en Argentina, acá tenés una guía simple y completa: [qué papeles revisar al comprar un auto usado en Argentina](/guias/papeles-auto-usado-argentina-informe-dominio-verificacion-policial).

En general, vas a querer revisar:

- Tarjeta verde
- Título de propiedad
- Historial de mantenimiento
- Informe de dominio

## 6. Realiza una prueba de manejo

Antes de tomar una decisión de compra, es recomendable que realices una prueba de manejo para verificar el comportamiento del vehículo en diferentes condiciones.

Si querés una lista rápida de qué mirar (motor, carrocería y prueba de manejo), usá esta checklist: [qué revisar antes de comprar un auto usado](/guias/que-revisar-antes-de-comprar-auto-usado-checklist).

## 7. Negocia el precio

Una vez que hayas verificado el estado mecánico del vehículo, revisado la documentación y realizado una prueba de manejo, es hora de negociar el precio. No tengas miedo de negociar para obtener el mejor precio posible.

## 8. Considera los costos adicionales

Al comprar un vehículo usado en Argentina, es importante que consideres los costos adicionales:

- Seguro del vehículo
- Impuestos (patente)
- Gastos de transferencia
- Puesta a punto

## 9. Verifica que no sea robado

Es fundamental verificar que el vehículo no tenga denuncias de robo. Esto se puede hacer mediante la verificación policial o consultando el número de chasis.

## 10. Toma tu tiempo antes de decidir

Finalmente, te recomendamos que tomes tu tiempo antes de tomar una decisión de compra. No te apresures y asegúrate de haber considerado todos los aspectos antes de invertir en un vehículo usado en Argentina.

---

**Comprar un vehículo usado en Argentina puede ser una excelente inversión**, siempre y cuando se tenga en cuenta estos diez aspectos importantes antes de tomar una decisión de compra.
    `
  },
  {
    id: '3',
    slug: 'para-que-sirve-escanear-un-vehiculo',
    title: 'Para qué sirve escanear un vehículo',
    excerpt: 'Descubra la importancia del escaneo computarizado y cómo esta tecnología puede revelar problemas ocultos en el vehículo que desea comprar.',
    author: 'carChecking',
    date: '2024-01-08',
    category: 'Revisión del Vehículo',
    tags: ['escaneo', 'diagnóstico', 'OBD', 'computarizado', 'fallas'],
    image: `${base}images/scanner_hands.jpg`,
    metaTitle: 'Para qué sirve escanear un vehículo | carChecking',
    metaDescription: 'Descubra para qué sirve el escaneo de vehículos. Tecnología de diagnóstico computarizado para detectar fallas ocultas antes de comprar un auto usado.',
    content: `
## Los talleres mecánicos de hoy

Los talleres mecánicos se parecen cada vez más a laboratorios de computación y menos a los tradicionales talleres mecánicos llenos de grasa y con olor a combustible. Es que con las nuevas tecnologías y los nuevos diseños de autos computarizados, hoy en día prácticamente bastaría con apretar una tecla para tener un diagnóstico completo del estado del vehículo.

## ¿Qué es el escaneo de vehículos?

La posibilidad de escanear un vehículo en la actualidad está al alcance de casi cualquier taller mecánico autorizado. Es posible a partir de tres elementos:

- Un programa de diagnóstico
- El equipo electrónico (celular o computadora)
- El cable de diagnóstico que conecta la computadora con el auto

### Historia del OBD

Recordemos que los sistemas computarizados se desarrollaron para minimizar la emisión de gases de combustión a la atmósfera. Al comienzo cada fabricante tenía su propio protocolo de diagnóstico.

A partir de 1996 se estableció un protocolo universal llamado **OBD II** (On Board Diagnostic Systems). Además se incorporó al tablero una luz de alarma que al encenderse indica algún problema en el vehículo y la ficha de autodiagnóstico de 16 pines.

## ¿Para qué sirve escanear un vehículo?

### Encontrar posibles fallas

La utilidad principal del escaneo del vehículo es encontrar posibles fallas. El escáner da la posibilidad de entrar a los diferentes sistemas bajo control:

- Electrónica del motor
- Protección del habitáculo
- Sistemas de bolsas de aire
- Frenos ABS
- Alarmas anti-arranque
- Y muchos más sistemas

### Detectar alteraciones

Si estamos comprando un auto usado, el escaneo del vehículo nos puede servir para saber si algunos dispositivos del vehículo han sido alterados. En estos casos es muy útil el **escáner de datos "en vivo"**.

La primera información de este tipo de escáner es si la luz del tablero está encendida o apagada. No es un dato menor: muchas veces se quita este dispositivo para que el futuro comprador no sepa si hay fallas.

### Verificar consistencia de datos

Los datos deben ser consistentes con la realidad; por ejemplo, si el coche está detenido, el sensor de velocidad debería indicar 0 km/h. Un problema muy frecuente es que la aguja del velocímetro se atore o no funcione.

## Lo que NO aparece al escanear un vehículo

Más allá de las bondades del escaneo del vehículo, es interesante saber que hay al menos **cuatro tipos de fallas que el escáner no siempre puede registrar**:

### 1. Fallas mecánicas

Las fallas en sistemas mecánicos que funcionan de manera independiente, por ejemplo en la suspensión, no pueden ser detectadas por el escáner.

### 2. Fallas electrónicas puras

Bajas de tensión o presión de la bomba de combustible no siempre son detectadas.

### 3. Adulteración de cuentakilómetros

Dependiendo de la computadora del vehículo, el escáner no siempre puede detectar una adulteración en el cuentakilómetros.

### 4. Daños estructurales

Golpes en el chasis, reparaciones de carrocería y otros daños estructurales no aparecen en el escaneo.

## Conclusión

El escáner debe ser considerado como una herramienta de diagnóstico complementaria. Los técnicos mecánicos deben saber que hay fallos que sólo ellos a partir de sus conocimientos y la revisión visual pueden detectar.

En carChecking combinamos el **examen ocular de nuestros expertos con el escaneo computarizado** para ofrecerle una revisión completa del vehículo.

Si querés ver cómo se aplica esto en una compra real, te puede servir:

- [Inspección pre compra auto a domicilio: qué incluye y por qué conviene](/guias/inspeccion-pre-compra-auto-a-domicilio)
- [Qué revisar antes de comprar un auto usado (checklist)](/guias/que-revisar-antes-de-comprar-auto-usado-checklist)
    `
  },
  {
    id: '4',
    slug: 'ventajas-desventajas-comprar-vehiculo-usado',
    title: 'Ventajas y desventajas de comprar un vehículo usado',
    excerpt: 'Análisis completo de los pros y contras de comprar un auto usado versus uno nuevo. Tome la mejor decisión para su situación.',
    author: 'carChecking',
    date: '2024-01-05',
    category: 'Comprando un Vehículo Usado',
    tags: ['usados', '0km', 'ventajas', 'desventajas', 'comparación'],
    image: `${base}images/mechanic_portrait.jpg`,
    metaTitle: 'Ventajas y desventajas de comprar un vehículo usado | carChecking',
    metaDescription: 'Análisis completo de pros y contras de comprar un auto usado vs nuevo. Precio, garantía, tecnología y más factores a considerar.',
    content: `
## El mercado de usados en Argentina

El 0Km puede ser una meta, pero en el momento de cambiar el auto o adquirir uno por primera vez, surge la posibilidad de comprar un vehículo usado. En realidad, se comercializan más autos usados que nuevos. Por ejemplo en el año 2022 se vendieron más de 1,5 millones de vehículos usados, en tanto se patentaron algo más de 407.000 unidades.

## Desventajas de comprar un vehículo usado

### Garantías y seguros

Aunque la compra de un auto usado está cubierta por ciertas garantías, nunca será lo mismo que con uno nuevo. Los compradores de autos nuevos se benefician con la garantía del fabricante y la del concesionario.

Según la ley 24.240 de Defensa del Consumidor, los vehículos nuevos tienen una garantía legal de al menos 6 meses a partir de la entrega.

En cuanto a los seguros, el precio de un 0Km suele incluir la primera cuota del seguro ya contratado. Al comprar un vehículo usado existe el riesgo de que no cuente con el seguro obligatorio o existan deudas de seguros.

### Kilometraje

Se calcula que un auto utilizado normalmente debe recorrer unos 10.000 km al año. Si, por ejemplo, un auto de tres años de antigüedad lleva recorridos más de 35.000 km, significa que ha sido sometido a un uso intensivo.

**¡Cuidado con la alteración del cuentakilómetros!** Lamentablemente es un delito bastante común. Si querés ver señales claras, mirá esta guía: [cómo verificar que el cuentakilómetros no ha sido alterado](/guias/guia-verificar-cuentakilometros-no-alterado).

### Tecnología y personalización

La ventaja de un auto nuevo es que se pueden pedir con precisión las opciones que se desean. Los autos nuevos tienen una tecnología más actualizada que los usados.

### Menor eficiencia energética

Los autos 0Km obligatoriamente tienen que llevar una etiqueta de eficiencia energética vehicular. Esta etiqueta informa el consumo de combustible y el nivel de emisión de gases contaminantes.

Un auto usado, no solamente no contará con la etiqueta, sino que muy probablemente su consumo de combustible sea mayor.

## Ventajas de comprar un vehículo usado

### Precio y depreciación

El precio es uno de los factores determinantes. Para tener una idea de los valores, lo mejor es consultar la lista que publica mensualmente la Cámara del Comercio Automotor.

Por ejemplo en uno de los autos más vendidos en Argentina, el Peugeot 208, la diferencia de precio entre un 0Km y un usado de un año de antigüedad es del 10% o menos.

**La depreciación**: Un vehículo nuevo se desvaloriza más rápido que uno usado. El comprador de un 0Km debe absorber la depreciación inicial, que en algunos casos puede llegar al 40%.

### Variedad de modelos para elegir

El mercado de usados es más amplio que el de 0Km. Una marca puede lanzar unos 30 modelos nuevos, mientras que los modelos de la misma marca, con apenas dos años de antigüedad, pueden duplicar esa cantidad.

### Disponibilidad inmediata

Otra ventaja de comprar un vehículo usado es que todos los modelos que se pueden adquirir están disponibles en el mercado. No se debe esperar para tener el auto del color o las características preferidas.

### Menor costo de seguros e impuestos

Los seguros para autos usados son más económicos que los de coches 0Km. Además, el costo de la patente también es menor, así como los impuestos relacionados con la compra.

---

**¿Decidido a comprar un usado?** Recordá que carChecking ofrece un servicio completo de revisión del vehículo, que incluye kilometraje real, estado del motor, revisión de la carrocería y escaneo computarizado.

Para seguir, te recomiendo estas guías:

- [Inspección pre compra auto a domicilio: qué incluye y por qué conviene](/guias/inspeccion-pre-compra-auto-a-domicilio)
- [Qué revisar antes de comprar un auto usado (checklist)](/guias/que-revisar-antes-de-comprar-auto-usado-checklist)
- [Qué papeles revisar al comprar un auto usado en Argentina](/guias/papeles-auto-usado-argentina-informe-dominio-verificacion-policial)
    `
  },
  {
    id: '5',
    slug: 'que-diferencia-carchecking-de-la-competencia',
    title: '¿Qué nos diferencia de la competencia?',
    excerpt: 'Descubra por qué carChecking es la opción más confiable para la inspección de vehículos usados en Argentina. Experiencia y tecnología de punta.',
    author: 'carChecking',
    date: '2024-01-03',
    category: 'Nosotros',
    tags: ['diferencias', 'servicio', 'mecánicos', 'escáner', 'calidad'],
    image: `${base}images/mechanic_working.jpg`,
    metaTitle: '¿Qué nos diferencia de la competencia? | carChecking',
    metaDescription: 'Descubra por qué carChecking es líder en inspección de vehículos. Mecánicos certificados, escáner de última generación y más de 350 puntos revisados.',
    content: `
## Nuestra historia

Cuando carChecking se instaló en Buenos Aires no había otras empresas que brindaran el servicio de revisión de vehículos. A medida que en el país la venta de vehículos usados se incrementó, comenzaron a aparecer en el mercado otras empresas ofreciendo un servicio similar. Y si bien el servicio parecería ser el mismo hay grandes diferencias en cuanto al resultado.

A la hora de contratar el servicio de inspección de vehículos, lo que más le interesa al cliente es que la inspección sea exacta y que no se pase nada por alto. Para poder brindar este servicio en forma adecuada hay dos cosas que uno debe tomar en cuenta.

## 1. La capacitación del inspector

En carChecking **todos nuestros inspectores han sido mecánicos previamente**. Lo cual implica que al haberse dedicado durante años al rubro, tienen mucha experiencia en detectar problemas de las diferentes marcas y modelos de vehículos.

También a la hora de indicar el costo de reparación del problema encontrado durante la inspección sabrán calcularlo exactamente, ya que saben cuánto trabajo implica realizar la reparación y qué partes del vehículo se deben remover para acceder a la parte dañada.

### La competencia

Por otro lado, otras empresas que brindan este servicio en Buenos Aires en vez de utilizar mecánicos para realizar la inspección utilizan inspectores de seguro, los cuales tienen una idea general de cómo revisar un vehículo pero debido a que no han tenido el entrenamiento de trabajar en un taller mecánico muchos detalles se les pasarán por alto.

De la misma forma que al indicar un presupuesto de la reparación del vehículo inspeccionado, no podrán hacerlo con exactitud ya que no sabrán con precisión los pasos en los que consta la reparación del mismo.

## 2. La computadora de diagnóstico

El segundo punto a tener en cuenta a la hora de contratar el servicio es la computadora que utiliza el inspector para escanear el vehículo (si querés entender bien qué puede revelar un escaneo, mirá: [para qué sirve escanear un vehículo](/guias/para-que-sirve-escanear-un-vehiculo)).

Hoy por hoy hay una gran variedad de computadoras para escanear vehículos así como un amplio rango de precios los cuales van desde $350 hasta $25.000. La diferencia entre estas computadoras está en la capacidad que tienen para acceder a todos los sensores –módulos del vehículo y la exactitud con la que devuelve los resultados.

### Nuestra tecnología

En carChecking siempre hemos tenido como objetivo brindar el mejor servicio posible es por eso que utilizamos las mejores computadoras disponibles a las cuales actualizamos cada vez que las marcas lanzan nuevos modelos de vehículos.

### La competencia

Hemos notado que empresas que brindan el servicio utilizan escáners que no son los óptimos para la prestación del servicio y la mayoría de los problemas que detectan son los mismos problemas que la computadora del vehículo mostrará al poner en marcha el mismo.

## Conclusión

Estos son dos puntos fundamentales que usted deberá tener en cuenta a la hora de contratar un servicio para inspeccionar el vehículo que está por comprar.

Debido a que muchos clientes contratan nuestro servicio luego de haber tenido malas experiencias con otras empresas, es nuestro deber indicarles que **no todos los servicios que se ofrecen en Buenos Aires son los mismos**, en cuanto a lo que se ofrece y a la calidad de lo que se ofrece.

En carChecking hacemos un esfuerzo día a día para brindar el mejor servicio posible al menor costo.

Si querés ver ejemplos prácticos (y usarlo como guía antes de comprar), acá tenés tres lecturas útiles:

- [Inspección pre compra auto a domicilio: qué incluye y por qué conviene](/guias/inspeccion-pre-compra-auto-a-domicilio)
- [Qué revisar antes de comprar un auto usado (checklist)](/guias/que-revisar-antes-de-comprar-auto-usado-checklist)
- [Qué papeles revisar al comprar un auto usado en Argentina](/guias/papeles-auto-usado-argentina-informe-dominio-verificacion-policial)
    `
  },
  {
    id: '6',
    slug: 'como-saber-kilometraje-real-sin-revisar',
    title: '¿Cómo saber el kilometraje real del vehículo sin revisarlo?',
    excerpt: 'Métodos y herramientas para verificar el kilometraje real de un auto usado antes de la compra. Protéjase del fraude de cuentakilómetros.',
    author: 'carChecking',
    date: '2023-12-28',
    category: 'Revisión del Vehículo',
    tags: ['kilometraje', 'cuentakilómetros', 'verificación', 'fraude'],
    image: `${base}images/engine_bay.jpg`,
    metaTitle: '¿Cómo saber el kilometraje real del vehículo sin revisarlo? | carChecking',
    metaDescription: 'Aprenda métodos para verificar el kilometraje real de un auto usado. Protéjase del fraude de cuentakilómetros antes de comprar.',
    content: `
## El problema del kilometraje

Uno de los fraudes más comunes en el mercado de autos usados es la alteración del cuentakilómetros. Este delito puede hacer que pague mucho más de lo que realmente vale un vehículo. Por eso es fundamental verificar el kilometraje real antes de comprar.

## Métodos para verificar el kilometraje

### 1. Historial de service en concesionarios

La forma más confiable de verificar el kilometraje real es contactando al concesionario oficial de la marca. Si el vehículo realizó sus servicios de mantenimiento en talleres oficiales, tendrán registro de:

- Fecha de cada service
- Kilometraje declarado en cada visita
- Trabajos realizados

### 2. Revisión de la tarjeta de service

Muchos vehículos conservan la tarjeta de service donde se sella cada mantenimiento con el kilometraje. Verifique que:

- Los sellos sean de talleres reconocidos
- Los kilómetros vayan aumentando progresivamente
- Las fechas sean coherentes

### 3. Aplicaciones de diagnóstico

Existen aplicaciones que se conectan a la ECU del vehículo mediante un adaptador OBD2 Bluetooth. Estas apps pueden leer:

- Kilometraje almacenado en la computadora
- Códigos de error
- Datos de sensores en tiempo real

### 4. Desgaste del vehículo

El desgaste general del vehículo debe ser consistente con el kilometraje declarado:

**Interior:**
- Volante: desgaste del cuero, brillo en zonas de contacto
- Pedales: goma gastada, metal visible
- Asientos: desgaste del tapizado, costuras
- Alfombras: desgaste en zona del conductor

**Exterior:**
- Pintura: opacidad, rayones
- Ópticas: amarillamiento
- Neumáticos: desgaste, fecha de fabricación

### 5. Documentación

Revise todos los documentos del vehículo:

- Últimas VTVs (Verificación Técnica Vehicular)
- Boletas de seguro (declaran kilometraje)
- Facturas de neumáticos o repuestos

## Cálculo del kilometraje esperado

Un vehículo de uso particular recorre en promedio:

- **Uso normal**: 10.000 - 15.000 km/año
- **Uso intensivo**: 20.000 - 30.000 km/año
- **Uso mínimo**: 5.000 - 8.000 km/año

### Ejemplo práctico

Un auto de 5 años con uso normal debería tener entre 50.000 y 75.000 km. Si el cuentakilómetros marca 30.000 km, hay motivos para sospechar.

## Cuándo sospechar

Señales de alerta:

- El kilometraje es muy bajo para la antigüedad
- Hay inconsistencias en la documentación
- El desgaste no coincide con los kilómetros
- El vendedor presiona para cerrar rápido
- No permite una revisión profesional

## La mejor protección

La única forma de estar 100% seguro del estado real del vehículo es contratando una **revisión profesional** que combine:

- Escaneo computarizado de todos los módulos
- Revisión mecánica completa
- Análisis del desgaste general
- Verificación de documentación

---

**¿Va a comprar un vehículo usado?** No se arriesgue. En carChecking verificamos el kilometraje real y más de 350 puntos del vehículo.
    `
  },
  {
    id: 'quien-paga-transferencia-auto-usado',
    slug: 'quien-paga-la-transferencia-de-un-vehiculo-usado',
    title: '¿Quién paga la transferencia de un vehículo usado? (Argentina)',
    excerpt:
      'Guía clara sobre quién suele pagar la transferencia de un auto usado en Argentina: qué gastos existen, qué se negocia y ejemplos de acuerdos entre comprador y vendedor.',
    author: 'carChecking',
    date: '2026-02-06',
    category: 'Documentación',
    tags: [
      'transferencia',
      'auto usado',
      'comprador',
      'vendedor',
      'DNRPA',
      '08',
      'sellos',
      'gestoría',
    ],
    image: `${base}images/hero_car.jpg`,
    metaTitle:
      '¿Quién paga la transferencia de un auto usado en Argentina? (comprador vs vendedor) | carChecking',
    metaDescription:
      'Quién paga la transferencia de un vehículo usado en Argentina: costos típicos (aranceles, sellos, verificación, gestoría), qué se negocia y acuerdos comunes.',
    content: `
## ¿Quién paga la transferencia de un vehículo usado?

En Argentina no existe una única respuesta “de manual”, porque **se negocia**. Pero sí hay una práctica común: 

- En la mayoría de operaciones entre particulares, **el comprador suele pagar la transferencia** (aranceles y sellos).
- El vendedor suele encargarse de **entregar la documentación en regla** y firmar lo necesario para que la transferencia se pueda hacer.

Lo importante es que **lo hablen antes de señar** y lo dejen claro (aunque sea por WhatsApp) para evitar discusiones.

---

## Qué gastos existen en una transferencia (para hablar con precisión)

Cuando alguien dice “la transferencia”, en realidad suele englobar varios conceptos. Los más comunes:

- **Aranceles DNRPA** (formularios / trámite de transferencia)
- **Sellos/impuestos provinciales** (según jurisdicción)
- **Verificación policial** (según el caso)
- **Certificación de firmas** (si corresponde)
- **Informe de dominio** (recomendado para el comprador)
- **Gestoría** (si se usa)

Por eso la pregunta real es: **¿quién paga qué?**

---

## Lo más habitual (acuerdos típicos)

### Caso 1: Compra-venta entre particulares (lo más común)
- **Comprador:** paga aranceles + sellos + gastos del registro.
- **Vendedor:** entrega la documentación y firma (08 / título / cédulas), y asume sus deudas personales si las hubiera.

### Caso 2: “Transferencia 50/50”
- Se divide el costo total de la transferencia a la mitad.
- Recomendación: definan si incluyen o no verificación policial, gestoría y/o informe de dominio.

### Caso 3: En concesionaria / agencia
- A veces la agencia incluye parte del costo dentro del precio (o lo cobra como “gastos administrativos”).
- Pedí siempre el detalle: **qué incluye** y **qué no**.

---

## Qué conviene negociar (y por qué)

- Si el vehículo tiene particularidades (prenda, sucesión, titularidad compleja), puede haber costos extra.
- Para el comprador, es muy recomendable pedir un **informe de dominio** antes de avanzar.

Si querés un estimado rápido del costo total, podés usar nuestra calculadora:

- **Calculadora de costos:** [/guias/calculadora-costos-transferencia-auto-usado](/guias/calculadora-costos-transferencia-auto-usado)

---

## Consejo práctico antes de señar

Antes de pagar una seña:

- Acordá quién paga la transferencia (y qué incluye).
- Definí un plazo para hacerla.
- Si vas a señar, usá un recibo simple (modelo PDF):
  - [/consejos/documentacion-vehiculo/recibo-de-sena-de-venta-de-vehiculo](/consejos/documentacion-vehiculo/recibo-de-sena-de-venta-de-vehiculo)

---

## ¿Querés comprar con más seguridad?

Además de la documentación, lo crítico es el estado real del vehículo. En carChecking realizamos una **revisión precompra** (mecánica + electrónica + carrocería) y entregamos **informe escrito con fotos**.

- **Solicitar turno:** [/solicitar-turno](/solicitar-turno)
    `,
  },
  {
    id: 'garantias-auto-usado',
    slug: 'garantias-al-comprar-un-auto-usado-todo-lo-que-debes-saber',
    title: 'Garantías al comprar un auto usado: todo lo que debés saber (Argentina)',
    excerpt:
      'La garantía legal cubre aspectos técnicos y de papeles del auto usado. Qué aplica si comprás en concesionaria vs particular, plazos, certificado y qué hacer si necesitás reclamar.',
    author: 'carChecking',
    date: '2019-01-22',
    category: 'Documentación',
    tags: [
      'garantía',
      'garantía legal',
      'auto usado',
      'defensa del consumidor',
      'concesionaria',
      'compra-venta',
      'reclamos',
    ],
    image: `${base}images/hero_car.jpg`,
    metaTitle:
      'Garantías al comprar un auto usado: todo lo que debés saber (Argentina) | carChecking',
    metaDescription:
      'Qué garantías existen al comprar un auto usado en Argentina: garantía legal (LDC), diferencias entre concesionaria y particular, certificado de garantía y pasos para reclamar.',
    content: `
## Garantías al comprar un auto usado (Argentina)

Durante 2018 se transfirieron más de 1,6 millones de autos usados (vs. ~800.000 patentamientos). Es normal preocuparse por lo mecánico, pero además existe una **protección legal** importante cuando la compra es en concesionaria.

En esta guía tenés un resumen práctico de **qué cubre la garantía**, qué pasa si comprás a un particular y qué hacer si necesitás reclamar.

---

## Garantías al comprar un auto usado: en agencia vs a particular

### Compra de auto usado en concesionaria

Es un error creer que al comprar un usado “no se puede reclamar”. Cuando comprás en concesionaria existe una **garantía legal** (mínimo) y el vendedor debe cumplir requisitos.

La garantía legal está prevista por la **Ley 24.240 (Defensa del Consumidor)** y, desde una modificación en 2015, contempla un **plazo mínimo de 3 meses** para bienes muebles usados.

Además, algunas marcas ofrecen programas de “usados certificados” (según la marca y condiciones) con una garantía adicional.

### Compra a un particular

En operaciones **entre particulares**, la Ley de Defensa del Consumidor normalmente **no aplica** como relación de consumo, por lo que el vendedor no está obligado a otorgar garantía legal.

Aun así, podés **negociar** condiciones y protegerte con un **contrato de compraventa** donde conste el estado en que se entrega el vehículo.

---

## Todo sobre la garantía legal (LDC)

La garantía legal se vincula con el Art. 11 de la LDC y se relaciona con:

- **Servicio técnico** adecuado y suministro de partes y repuestos (Art. 12)
- **Responsabilidad solidaria** de productores/importadores/distribuidores/vendedores (Art. 13)
- **Certificado de garantía**: debe estar en castellano, claro y legible, y contener datos del vendedor + identificación técnica del vehículo + condiciones de uso/mantenimiento/reparación (Art. 14)

---

## Cómo se computa el plazo y cuándo se modifica

- El plazo (mínimo) es de **3 meses desde la entrega**.
- Puede **aumentarse por acuerdo** entre partes.
- Si el auto entra al taller por una reparación en garantía, el plazo se **extiende** por el tiempo que el vehículo no estuvo disponible.
- Si se realiza una reparación, el garante debe entregar una **constancia de reparación** (Art. 15) con: naturaleza de la reparación, piezas reemplazadas/reparadas y fechas de ingreso/entrega.
- Si la reparación no es satisfactoria y se sustituye el auto, se computa un **nuevo plazo de garantía**.

---

## Qué hacer si necesitás ejecutar la garantía

Antes de ir a una vía judicial, tenés alternativas:

- Reclamo por escrito (con constancia de recepción)
- Carta documento (citando LDC + decreto 1798/94, y reservando derechos)
- Denuncia en Defensa del Consumidor según la jurisdicción / Sistema Federal de Reclamos
- Solicitar mediación / arbitraje (según corresponda)

Si la compra fue a un particular, la lógica es similar: reclamo por escrito → carta documento → mediación.

---

## Recomendaciones carChecking

- Leé el contrato, especialmente la letra chica.
- Verificá **técnica + documentación** antes de cerrar.

Si querés reducir el riesgo, podés sumar una **revisión precompra** (mecánica + electrónica + carrocería) con informe:

- **Solicitar turno:** [/solicitar-turno](/solicitar-turno)
    `,
  },
  {
    id: 'recibo-de-sena-pdf',
    slug: 'recibo-de-sena-de-venta-de-vehiculo',
    title: 'Recibo de seña de venta de vehículo (PDF): descargar modelo',
    excerpt:
      'Descargá un modelo de recibo de seña para compra-venta de un vehículo. Incluye campos básicos para dejar constancia del pago y condiciones.',
    author: 'carChecking',
    date: '2026-02-06',
    category: 'Documentación',
    tags: ['recibo de seña', 'seña', 'compra venta', 'documentación', 'auto usado', 'PDF'],
    image: `${base}images/hero_car.jpg`,
    metaTitle: 'Recibo de seña de venta de vehículo (PDF) – modelo para descargar | carChecking',
    metaDescription:
      'Modelo de recibo de seña para compra-venta de un vehículo (PDF). Qué datos incluir, recomendaciones y descarga directa.',
    content: `
## Recibo de seña de venta de vehículo (modelo PDF)

Si vas a señar un auto, conviene dejar constancia por escrito del monto, la fecha, los datos de las partes y las condiciones básicas (por ejemplo, qué pasa si alguna de las partes se arrepiente).

### Descargar PDF

- **Descargar recibo_de_sena.pdf:** [/docs/recibo_de_sena.pdf](/docs/recibo_de_sena.pdf)

---

## Qué conviene incluir en un recibo de seña

- Datos del comprador y del vendedor (DNI/CUIT, nombre y apellido)
- Dominio y datos del vehículo
- Monto de la seña y forma de pago
- Fecha y lugar
- Plazo para completar la operación
- Condiciones de devolución / penalidades

---

## Recomendación

Antes de señar, además de la documentación, es clave revisar el estado real del vehículo.

- **Solicitar turno:** [/solicitar-turno](/solicitar-turno)
    `,
  },
];

// Helper functions
export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find((article) => article.slug === slug);
};

export const getArticlesByCategory = (category: string): Article[] => {
  return articles.filter((article) => article.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(articles.map((article) => article.category));
  return Array.from(categories);
};

export const getRecentArticles = (count: number = 3): Article[] => {
  return [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};
