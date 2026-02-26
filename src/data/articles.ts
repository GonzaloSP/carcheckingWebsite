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

---

[[youtube:https://www.youtube.com/watch?v=No40lNXYgCA]]
[[youtube:https://www.youtube.com/watch?v=G4HFFAVkBvU]]
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

---

[[youtube:https://www.youtube.com/watch?v=LMTtf5Vb0rk]]
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

---

[[youtube:https://www.youtube.com/watch?v=6vmVeevZEoE]]
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

---

[[youtube:https://www.youtube.com/watch?v=A9xAGi2W36o]]
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

---

[[youtube:https://www.youtube.com/watch?v=BldBc8qwqfg]]
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
  {
    id: 'como-calcular-precio-auto-usado',
    slug: 'como-calcular-precio-auto-usado-argentina',
    title: 'Cómo calcular el precio de un auto usado en Argentina: guía práctica',
    excerpt: 'Guía completa para saber cuánto vale un auto usado en Argentina: fuentes de referencia, factores que afectan el precio y errores comunes al tasar.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Compra de Vehículos',
    tags: ['precio auto usado', 'valuación', 'tasar auto', 'cuánto vale mi auto', 'autos usados', 'Argentina', 'comprar auto usado'],
    image: `${base}images/hero_car.jpg`,
    metaTitle: 'Cómo calcular el precio de un auto usado en Argentina: guía práctica | carChecking',
    metaDescription: 'Guía para calcular el precio de un auto usado en Argentina: fuentes de referencia (InfoAuto, Mercado Libre), factores que suben o bajan el valor y errores comunes.',
    content: `
## Cómo calcular el precio de un auto usado en Argentina

Si estás por comprar o vender un usado, la primera pregunta es siempre la misma: **¿cuánto vale?**

El precio de un auto usado no es un número mágico: depende de varios factores y hay fuentes confiables para orientarte. Acá te cuento cómo hacer una valuación razonable sin volverte loco.

---

## Fuentes de referencia para tasar un auto usado en Argentina

### 1) InfoAuto (referencia del mercado)

**InfoAuto** es la guía de precios más usada en Argentina. La usan concesionarias, seguros y registros del automotor.

- Entrás con marca, modelo, versión y año
- Te da un precio de referencia (no es obligatorio, pero es un piso/techo orientativo)
- Es pago, pero muchas veces encontrás capturas o referencias en foros

**Link:** [https://www.infoauto.com.ar](https://www.infoauto.com.ar)

### 2) Mercado Libre / portales de clasificados

Mirar publicaciones similares en **Mercado Libre Autos** o **DeMotores** te da una idea de los precios de "calle":

- Buscá tu modelo exacto (versión, año, motor)
- Filtrá por kilometraje similar
- Mirá los que tienen más tiempo publicados (suelen estar caros) vs los recién publicados

> **Tip:** el precio publicado no es el precio final. En general hay margen para negociar un 5-15% dependiendo del caso.

### 3) Grupos de Facebook / foros de marca

Si el auto es de una marca específica (por ejemplo, un Peugeot 308, un Corolla, un Hilux), los grupos de Facebook o foros de marca suelen tener mucha data real de operaciones.

---

## Factores que suben o bajan el precio de un usado

No todos los autos del mismo modelo valen lo mismo. Acá van los factores clave:

### Factores que SUBEN el precio

- **Pocos kilómetros** (y que sean reales, ojo con el cuentakilómetros adulterado)
- **Único dueño** (o pocos dueños)
- **Service oficial** con historial documentado
- **Color neutro** (blanco, gris, negro suelen valer más que colores raros)
- **Equipamiento completo** (cuero, techo, cámara, sensores)
- **Sin choques ni repintados**
- **Cubiertas y frenos nuevos**
- **VTV al día y papeles en regla**

### Factores que BAJAN el precio

- **Muchos kilómetros** (más de 20.000 km/año se considera alto)
- **Varios dueños** (desconfianza)
- **Sin service documentado** (¿le hicieron mantenimiento o no?)
- **Choques o repintados** (aunque estén bien hechos, bajan el valor)
- **Detalles estéticos** (abolladuras, tapizado roto, plásticos dañados)
- **Mecánica pendiente** (embrague, distribución, suspensión)
- **GNC mal instalado o vencido**
- **Deuda de patentes, multas o infracciones**

---

## Cómo calcular el precio paso a paso

### Paso 1: Conseguí el precio de referencia (InfoAuto o similar)

Ese es tu punto de partida. Por ejemplo: "InfoAuto dice $15.000.000".

### Paso 2: Ajustá según el kilometraje

- Si tiene menos km que el promedio → sumale un 5-10%
- Si tiene más km que el promedio → restale un 5-15%

### Paso 3: Ajustá según el estado general

- Impecable, sin detalles → precio de referencia o un poco más
- Algunos detalles menores → precio de referencia
- Detalles importantes (choque, mecánica) → restá entre 10-25%

### Paso 4: Compará con el mercado real

Mirá publicaciones similares. Si tu cálculo da $14M y hay 10 autos iguales a $12M, el mercado está más bajo.

### Paso 5: Considerá el margen de negociación

Si vas a vender, publicá un poco arriba para tener margen. Si vas a comprar, ofrecé un poco abajo.

---

## Errores comunes al tasar un auto usado

### "Me dijeron que vale más porque le puse X"

La realidad: accesorios como stereo, llantas o escapes no suman tanto como creés. A veces ni suman.

### "Tiene pocos kilómetros, vale más"

Ojo: si el auto tiene pocos km pero estuvo parado mucho tiempo, puede tener problemas (gomas secas, batería, frenos pegados). No siempre "poco km" = mejor.

### "Lo compré hace un año a X, ahora vale más"

En Argentina con inflación puede pasar, pero no es regla. Depende de la demanda del modelo y del estado del auto.

### "El mecánico me dijo que está perfecto"

Tener una opinión está bien, pero para negociar (o para estar seguro) conviene una **revisión formal con informe**.

---

## ¿Conviene pedir una revisión antes de comprar?

Sí, siempre. No importa qué tan lindo se vea: una inspección precompra te puede ahorrar un problema de miles de dólares.

Si el auto tiene fallas ocultas, el precio que te piden no tiene sentido. Y si está perfecto, tenés argumento para no dejarte bajar el precio.

**¿Querés que lo revisemos por vos?**

- **Solicitar turno:** [/solicitar-turno](/solicitar-turno)

---

## Resumen rápido

| Paso | Qué hacer |
|------|-----------|
| 1 | Consultá InfoAuto o similar |
| 2 | Ajustá por km |
| 3 | Ajustá por estado |
| 4 | Compará con publicaciones reales |
| 5 | Dejá margen para negociar |

Y si tenés dudas sobre el estado real del auto, pedí una revisión antes de cerrar.

---

## Preguntas frecuentes

**¿InfoAuto es obligatorio?**
No. Es una referencia. El precio final lo definen comprador y vendedor.

**¿Puedo confiar en el kilometraje?**
No al 100%. Si te interesa verificarlo, mirá esta guía: [cómo verificar que el cuentakilómetros no ha sido alterado](/guias/guia-verificar-cuentakilometros-no-alterado).

**¿Qué pasa si el auto tiene prenda o deuda?**
Eso baja el valor (o directamente hace que no convenga comprarlo). Pedí un **informe de dominio** antes de señar.

- **Servicio de gestoría:** [/servicio-gestoria](/servicio-gestoria)

---

[[youtube:https://www.youtube.com/watch?v=a2iZLzLHSfw]]
`,
  },
  {
    id: 'vendedor-no-firma-08',
    slug: 'que-hacer-si-vendedor-no-firma-formulario-08',
    title: '¿Qué sucede si el vendedor no quiere firmar el 08? Guía completa',
    excerpt: 'Qué hacer si el vendedor del auto no quiere firmar el formulario 08: alternativas legales, cómo prevenir el problema y qué dice la ley en Argentina.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Documentación',
    tags: ['formulario 08', 'transferencia', 'vendedor no firma', 'DNRPA', 'documentación', 'autos usados', 'Argentina'],
    image: `${base}images/scanner_hands.jpg`,
    metaTitle: '¿Qué hacer si el vendedor no quiere firmar el 08? | carChecking',
    metaDescription: 'Guía sobre qué hacer si el vendedor no firma el formulario 08 en Argentina: opciones legales, cómo prevenirlo y quién paga los costos de transferencia.',
    content: `
## ¿Qué sucede si el vendedor no quiere firmar el formulario 08?

Una de las situaciones más complicadas al comprar un auto usado es cuando el vendedor **se niega a firmar el formulario 08** o directamente desaparece después de cobrar. Sin ese formulario, no podés hacer la transferencia y el auto queda a nombre del titular anterior.

Acá te explico qué podés hacer, cómo prevenirlo y quién paga qué en una transferencia.

---

## ¿Quién paga los costos de la transferencia?

Antes de hablar del problema, aclaremos los costos:

### Lo que paga el comprador (en general)

- **Formularios** (08, CETA si aplica)
- **Aranceles del registro** (transferencia)
- **Sellados provinciales**
- **Gestoría** (si usás una)

Estos costos son elevados y, salvo que se negocie otra cosa, los asume el comprador.

### Lo que paga el vendedor

- **Verificación policial**: es requisito para vender y debe estar al día. El vendedor tiene que presentar la verificación vigente.
- **Deudas de patentes, multas o infracciones**: si el auto tiene deuda, el vendedor debería saldarla antes de la venta (o descontarla del precio).

> **Tip:** siempre conviene dejar claro quién paga qué **antes** de cerrar el trato.

---

## ¿Qué pasa si el vendedor no quiere firmar el 08?

### La realidad (sin vueltas)

Si ya pagaste la totalidad del auto y el vendedor no aparece o se niega a firmar el formulario 08, **legalmente no hay forma de obligarlo**.

No existe un mecanismo judicial rápido para forzar la firma. Podés iniciar acciones legales, pero son lentas, costosas y muchas veces no llegan a nada.

### ¿Por qué pasa esto?

Algunas razones comunes:

- El vendedor no es el titular real (te vendió un auto que no era suyo)
- Hay deudas o embargos que el vendedor no quiere afrontar
- El vendedor simplemente no quiere "complicarse" con el trámite
- Mala fe o estafa directa

---

## Cómo prevenir este problema

La única forma de evitarlo es **no pagar la totalidad hasta tener el 08 firmado**.

### Procedimiento recomendado

1. **Verificá la documentación antes de señar**
   - Título del automotor
   - Cédula verde/azul
   - DNI del titular (que coincida)
   - Verificación policial vigente

2. **Pedí un informe de dominio**
   - Así sabés si hay prendas, embargos o inhibiciones
   - Si hay problemas, no avances

3. **Firmá el 08 antes de pagar el total**
   - Podés pagar una seña y acordar que el saldo se paga **después** de firmar el 08 en el registro o ante escribano
   - Nunca entregues el 100% sin tener el 08 firmado

4. **Hacé la transferencia lo antes posible**
   - No dejes pasar semanas con el 08 firmado sin presentarlo
   - Cuanto antes esté a tu nombre, mejor

---

## ¿Qué opciones tenés si el vendedor no quiere ir al registro?

Si el vendedor tiene buena voluntad pero no puede (o no quiere) ir al registro, hay alternativas:

### Opción 1: Llevalo vos

Si el problema es el traslado, ofrecele buscarlo y llevarlo al registro. A veces es solo un tema de comodidad.

### Opción 2: Firma ante escribano

El formulario 08 puede certificarse ante **escribano público**. Esto permite que el vendedor firme en una escribanía (más flexible en horarios y ubicación) y vos después presentás el 08 certificado en el registro.

### Opción 3: Poder especial

En algunos casos, el vendedor puede otorgar un **poder especial** para que otra persona (vos o un gestor) firme en su nombre. Esto requiere escritura pública.

---

## ¿Qué hacer si ya pagaste y el vendedor no firma?

Si ya estás en esta situación:

1. **Intentá contactar al vendedor** de todas las formas posibles (teléfono, WhatsApp, mail, domicilio)
2. **Enviá una carta documento** solicitando que cumpla con la firma del 08. Esto deja constancia legal.
3. **Consultá con un abogado**: dependiendo del monto, puede tener sentido iniciar acciones legales (aunque sean lentas)
4. **Denuncia penal**: si hay indicios de estafa, podés hacer una denuncia. No resuelve el problema de la transferencia, pero puede servir.

> **Importante:** sin el 08 firmado, el auto sigue a nombre del vendedor. Si él acumula multas o tiene un accidente, puede complicarte.

---

## ¿El gestor puede ayudar?

Sí. Un gestor del automotor experimentado puede:

- Asesorarte sobre la documentación antes de comprar
- Verificar que todo esté en orden
- Coordinar la firma del 08 (en registro o ante escribano)
- Hacer el seguimiento del trámite completo

En carChecking ofrecemos un **servicio de gestoría** donde te acompañamos en todo el proceso para que no tengas sorpresas.

- **Servicio de gestoría:** [/servicio-gestoria](/servicio-gestoria)

---

## Resumen: cómo evitar el problema del 08

| Paso | Qué hacer |
|------|-----------|
| 1 | Verificá documentación y que el vendedor sea el titular |
| 2 | Pedí informe de dominio |
| 3 | No pagues el 100% sin el 08 firmado |
| 4 | Si el vendedor no puede ir al registro, usá escribano |
| 5 | Transferí lo antes posible |

---

## Preguntas frecuentes

**¿Puedo circular con el auto sin transferir?**
Podés circular con la cédula y el 08 firmado, pero el auto sigue a nombre del vendedor. No es recomendable dejarlo así.

**¿Cuánto tiempo tengo para hacer la transferencia?**
Legalmente, la transferencia debe hacerse dentro de los 10 días de la operación. Si no, puede haber multas.

**¿El vendedor puede anular el 08 después de firmarlo?**
No. Una vez firmado y certificado, el 08 es válido para la transferencia.

**¿Qué pasa si el vendedor falleció?**
En ese caso, los herederos tienen que hacer la sucesión del vehículo primero. Es un trámite más largo y necesitás asesoramiento legal.

---

## ¿Querés evitar problemas con la documentación?

Nuestro servicio de gestoría te asesora y se encarga de todo el trámite.

- **Servicio de gestoría:** [/servicio-gestoria](/servicio-gestoria)
    `,
  },
  {
    id: 'vtv-verificacion-tecnica-vehicular',
    slug: 'verificacion-tecnica-vehicular-vtv-argentina',
    title: 'Verificación Técnica Vehicular (VTV): qué es, cuándo vence y cómo hacerla (Argentina)',
    excerpt:
      'Guía clara para entender la VTV: qué se controla, documentación, turnos, plazos en CABA y Provincia y qué pasa si te sale condicional o rechazada.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Revisión del Vehículo',
    tags: ['VTV', 'verificación técnica', 'seguridad vial', 'CABA', 'Provincia de Buenos Aires', 'turno VTV', 'multas'],
    image: `${base}images/mechanic_working.jpg`,
    metaTitle: 'VTV: qué es, qué se controla y cómo hacerla en CABA y Provincia (Argentina) | carChecking',
    metaDescription:
      'Aprendé qué es la VTV (Verificación Técnica Vehicular), qué se controla, qué llevar, cómo sacar turno y qué significa Apto/Condicional/Rechazado en CABA y Provincia.',
    content: `
## VTV (Verificación Técnica Vehicular): qué es y por qué conviene hacerla a tiempo

La **Verificación Técnica Vehicular (VTV)** es un control periódico del estado del vehículo (seguridad + emisiones). Es obligatoria para circular según la jurisdicción y **una vez aprobada es válida en todo el país**.

Hacerla a tiempo sirve para:
- reducir riesgos mecánicos en la calle/ruta,
- evitar multas y problemas en controles,
- detectar fallas antes de que sean caras.

---

## Qué se controla en una VTV (resumen)

Según planta/jurisdicción, normalmente revisan:
- **Luces, bocina y limpiaparabrisas**
- **Frenos** (equilibrio por eje)
- **Dirección y tren delantero**
- **Suspensión**
- **Neumáticos** (desgaste)
- **Parte inferior** (pérdidas, escapes, chasis visible)
- **Gases de escape / emisiones**
- **Identificación** (patente, grabados y coincidencia con documentación)

---

## VTV en Provincia de Buenos Aires: plazos orientativos

Los plazos dependen de tipo de vehículo y antigüedad. A modo guía:
- Motos: exentas al inicio; luego **anual**.
- Autos particulares: exentos al inicio; luego **anual**.
- Vehículos comerciales: pueden tener frecuencia **semestral**.

Para info oficial, consultá la página de VTV de Provincia.

### Documentación típica
- Cédula verde/azul
- DNI / licencia
- Título (a veces solo la primera vez)
- Obvios extras si aplica (GNC, reverificación, etc.)

---

## VTV en CABA: cuándo corresponde

En CABA rige para vehículos particulares con más de cierto uso/antigüedad. Se gestiona con **turno** en plantas habilitadas y suele tardar ~20 minutos.

---

## Resultados: Apto, Condicional o Rechazado

- **Apto:** sin defectos relevantes. Te entregan oblea + certificado.
- **Condicional:** defectos leves. Te dan un plazo para corregir y **reverificar**.
- **Rechazado:** defectos graves. No deberías circular hasta reparar y reverificar.

---

## Consejos prácticos para aprobar (y no perder tiempo)

- Revisá **luces**, **balizas**, **limpia parabrisas** y **bocina** antes de ir.
- Chequeá **presión y estado de neumáticos**.
- Si tenés testigos encendidos, hacé un **escaneo** antes.

> Guía relacionada: [Para qué sirve escanear un vehículo](/guias/para-que-sirve-escanear-un-vehiculo)

---

## ¿Vas a comprar un usado? Ojo: la VTV aprobada no garantiza que esté “perfecto”

La VTV puede aprobar un auto con detalles leves. Si estás por comprar, lo más seguro es una **revisión precompra** (mecánica + estructura + escaneo) para detectar choques ocultos, kilometraje inconsistente y fallas.

- Solicitar turno: [/solicitar-turno](/solicitar-turno)
` ,
  },
  {
    id: 'evitar-estafas-comprar-auto',
    slug: 'como-evitar-estafas-al-comprar-auto-usado',
    title: 'Cómo evitar estafas al comprar un auto usado en Argentina (guía simple)',
    excerpt:
      'Dos etapas clave para evitar estafas: revisar el vehículo (mecánica/estructura/electrónica) y revisar papeles (informe de dominio, multas, prenda, etc.).',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Comprando un vehículo usado',
    tags: ['estafas', 'autos usados', 'informe de dominio', 'prenda', 'embargo', 'kilometraje', 'concesionarias'],
    image: `${base}images/scanner_hands.jpg`,
    metaTitle: 'Cómo evitar estafas al comprar un auto usado en Argentina | carChecking',
    metaDescription:
      'Guía práctica para evitar estafas al comprar un usado: revisión mecánica + escaneo, y papeles (informe de dominio, multas, prenda, inhibiciones).',
    content: `
## Cómo evitar estafas al comprar un auto usado: el método en 2 etapas

En Argentina, muchas estafas en compra/venta de autos aparecen por dos motivos:
1) el auto tiene **problemas ocultos** (mecánicos/estructurales/electrónicos),
2) el auto tiene **problemas legales** (prenda, embargo, inhibición, denuncia, etc.).

Para ordenarte, pensalo en **dos etapas**.

---

## Etapa 1: Revisar el vehículo (antes de pagar)

Aunque “sepas algo de autos”, una revisión profesional suele ahorrarte plata.

Qué conviene mirar sí o sí:
- **Chapa y estructura:** señales de choque, repintado, alineaciones.
- **Motor y transmisión:** pérdidas, ruidos, humo, vibraciones.
- **Tren delantero/frenos:** ruidos, juego, desgaste.
- **Electrónica:** escaneo OBD para detectar fallas registradas.
- **Kilometraje:** coherencia entre odómetro y desgaste real.

Guías relacionadas:
- [Guía para verificar que el cuentakilómetros no ha sido alterado](/guias/guia-verificar-cuentakilometros-no-alterado)
- [Para qué sirve escanear un vehículo](/guias/para-que-sirve-escanear-un-vehiculo)

---

## Etapa 2: Revisar la documentación

Cuando el auto “cierra”, viene lo clave: **papeles**.

Checklist documental básico:
- **Informe de dominio** (titularidad + gravámenes)
- **Multas** y **patentes** (deudas)
- **Verificación policial** (si corresponde)
- Confirmar que quien vende **puede transferir**

Guía recomendada:
- [Qué papeles revisar al comprar un auto usado en Argentina](/guias/papeles-auto-usado-argentina-informe-dominio-verificacion-policial)

---

## Reglas de oro (para no caer)

- No señes ni pagues sin **identidad + documentación** mínimamente chequeada.
- Desconfiá de “ofertas” demasiado por debajo del mercado.
- No aceptes formularios firmados “por fuera” sin entender qué estás firmando.

---

## ¿Querés que revisemos el auto por vos?

Podemos hacer revisión precompra (mecánica + estructura + escaneo) y ayudarte a decidir.

- Solicitar turno: [/solicitar-turno](/solicitar-turno)
` ,
  },
  {
    id: 'garantia-informe-inspeccion',
    slug: 'garantia-informe-inspeccion-vehicular',
    title: 'Garantía sobre informes de inspección vehicular: qué cubre y qué no (en la práctica)',
    excerpt:
      'Qué considerar cuando una empresa promete “garantía” sobre una inspección: letras chicas, desgaste, exclusiones típicas y cómo comparar servicios de revisión.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Revisión del Vehículo',
    tags: ['garantía', 'inspección vehicular', 'revisión precompra', 'póliza', 'letra chica'],
    image: `${base}images/engine_bay.jpg`,
    metaTitle: 'Garantía sobre informes de inspección vehicular: qué significa y qué mirar | carChecking',
    metaDescription:
      'Te explicamos cómo funcionan (y qué limitaciones tienen) las garantías en inspecciones vehiculares: exclusiones por desgaste, requisitos y recomendaciones.',
    content: `
## “Garantía” en una inspección vehicular: qué significa de verdad

Es común ver servicios que ofrecen “garantía” sobre el informe de inspección. Suena muy bien, pero **casi siempre hay condiciones** que la vuelven difícil de ejecutar.

La clave es entender:
- quién responde (empresa vs aseguradora),
- qué cubre y qué excluye,
- qué requisitos te piden para que sea válida.

---

## Por qué muchas garantías terminan cubriendo poco

En la práctica, muchas pólizas excluyen problemas atribuidos a:
- **desgaste normal**,
- mantenimiento deficiente,
- uso posterior del vehículo,
- fallas preexistentes no detectables sin desarme.

Y la mayoría de los problemas reales en un usado se explican, justamente, por **desgaste**.

---

## Preguntas para hacer antes de contratar

- ¿Me dan la **póliza** o condiciones por escrito?
- ¿Qué pasa si aparece una falla a los 15/30/60 días?
- ¿Exigen que repare todo lo observado para “activar” la cobertura?
- ¿Qué talleres habilitan? ¿cómo se reclama?

---

## Nuestra recomendación

Más que buscar una promesa de garantía, elegí un servicio por:
- experiencia del inspector,
- checklist real (estructura + mecánica + electrónica),
- calidad del informe (claro, con fotos, con prioridades),
- independencia (que no te quiera vender repuestos).

Si estás por comprar un usado, lo ideal es combinar inspección y escaneo:
- [Revisión precompra a domicilio en CABA y GBA](/guias/revision-precompra-a-domicilio-caba-gba)

Y si querés coordinar:
- [/solicitar-turno](/solicitar-turno)
` ,
  },
  {
    id: 'negociar-descuento-auto-usado',
    slug: 'como-negociar-precio-auto-usado-descuento',
    title: 'Cómo negociar el precio de un auto usado: estrategia para conseguir mejor descuento',
    excerpt:
      'Técnicas realistas para negociar un usado en Argentina: cómo comparar precios, detectar margen, usar hallazgos de la inspección y cerrar sin apuro.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Comprando un vehículo usado',
    tags: ['negociación', 'precio', 'autos usados', 'descuento', 'inspección', 'CCA'],
    image: `${base}images/hero_mecanico_03.jpg`,
    metaTitle: 'Cómo negociar el precio de un auto usado en Argentina (con estrategia) | carChecking',
    metaDescription:
      'Guía para negociar el precio de un auto usado: investigación de mercado, margen real, argumentos técnicos, y cómo cerrar la operación de forma segura.',
    content: `
## Cómo negociar el precio de un auto usado (sin quemarte ni perder oportunidades)

Negociar no es “regatear por deporte”: es **pagar lo justo** según el estado real del auto y el mercado.

---

## 1) Llegá con datos (no con opiniones)

Antes de visitar:
- compará publicaciones similares (año/versión/km/zona),
- mirá referencias de precios cuando existan,
- anotá un rango realista.

Guía relacionada:
- [Cómo calcular el precio de un auto usado en Argentina](/guias/como-calcular-precio-auto-usado-argentina)

---

## 2) El descuento se gana con “hallazgos” (no con cara de póker)

Lo que más mueve el precio:
- detalles de chapa/pintura (repintado, choque),
- neumáticos y frenos (gastos inmediatos),
- pérdidas, ruidos, service pendiente,
- fallas electrónicas detectadas por escaneo,
- documentación (multas, deudas, prenda, etc.).

Por eso, si podés, hacé una inspección y llevá el informe a la negociación.

- [Qué revisar antes de comprar un auto usado (checklist)](/guias/que-revisar-antes-de-comprar-auto-usado-checklist)

---

## 3) Ofrecé en serio y cerrá rápido cuando el auto lo vale

Si el auto está bien y el precio es razonable:
- negociá un margen lógico,
- pedí que te reserven con una seña **documentada**,
- no estires semanas porque aparece otro comprador.

---

## 4) Errores comunes al negociar

- Enamorarte del auto y perder objetividad.
- Discutir sin revisar papeles.
- Pagar todo sin tener la transferencia encaminada.

---

## ¿Querés una revisión precompra para negociar con base?

- [/solicitar-turno](/solicitar-turno)
` ,
  },
  {
    id: 'cuanto-tiempo-lleva-comprar-auto',
    slug: 'cuanto-tiempo-lleva-comprar-auto-usado',
    title: 'Cuánto tiempo lleva comprar un auto usado: búsqueda, revisiones y transferencia',
    excerpt:
      'Estimación realista del tiempo total para comprar un usado: cuántas visitas suelen ser, cuánto tarda revisar, y cuánto tiempo lleva la transferencia.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Comprando un vehículo usado',
    tags: ['tiempo', 'transferencia', 'registro automotor', 'compra', 'usados'],
    image: `${base}images/mechanic_portrait.jpg`,
    metaTitle: '¿Cuánto tiempo lleva comprar un auto usado en Argentina? | carChecking',
    metaDescription:
      'Guía para estimar tiempos al comprar un auto usado: búsqueda, visitas, inspección precompra y transferencia. Cómo reducir demoras y riesgos.',
    content: `
## ¿Cuánto tiempo se “pierde” al comprar un auto usado?

Comprar un usado suele llevar más de lo que uno imagina. Entre **buscar**, **visitar**, **revisar** y **transferir**, es fácil que se te vaya más de un día.

---

## Tiempo típico (estimación)

- Búsqueda + llamados + coordinación: 1–3 horas (o más)
- Visita y revisión básica por auto: 1–2 horas
- Prueba de manejo + charla + papeles: 30–60 min
- Transferencia / turnos / registro: 2–5 horas (según caso)

En promedio, muchas personas visitan varios autos antes de decidir.

---

## Cómo reducir tiempo (sin aumentar riesgo)

1) Filtrá mejor online (fotos, historial, documentación)
2) Hacé una **revisión precompra** antes de señar/pagar
3) Chequeá papeles temprano (informe de dominio)
4) Si necesitás hacerlo rápido, considerá gestoría

- Guía: [Qué papeles revisar al comprar un auto usado](/guias/papeles-auto-usado-argentina-informe-dominio-verificacion-policial)

---

## Si querés que lo hagamos por vos

Podés coordinar una inspección en concesionaria o domicilio.

- [/solicitar-turno](/solicitar-turno)
` ,
  },
  {
    id: 'auto-robado-como-saber',
    slug: 'como-saber-si-un-auto-es-robado-argentina',
    title: 'Cómo saber si un auto es robado en Argentina: pasos para comprar con seguridad',
    excerpt:
      'Guía para reducir riesgos: chequeo de números de chasis/motor, informe de dominio, verificación policial y señales de alerta en la operación.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Comprando un vehículo usado',
    tags: ['auto robado', 'informe de dominio', 'verificación policial', 'chasis', 'motor', 'documentación'],
    image: `${base}images/hero_car.jpg`,
    metaTitle: 'Cómo saber si un auto es robado (Argentina): informe de dominio y verificación | carChecking',
    metaDescription:
      'Pasos para comprar un auto usado con seguridad: revisar chasis/motor, pedir informe de dominio, hacer verificación policial y evitar señales típicas de fraude.',
    content: `
## Comprar un auto robado: por qué es un riesgo enorme

Si comprás un vehículo con pedido de captura o adulterado:
- podés **perder el auto**,
- podés tener problemas legales,
- y la plata es difícil de recuperar.

La idea es **prevenir** con un proceso simple.

---

## Paso 1: Revisá números de chasis/motor y señales de adulteración

En la inspección, prestá atención a:
- grabados irregulares,
- zonas lijadas/repintadas donde no debería,
- tornillería marcada por desarme,
- inconsistencias con la documentación.

---

## Paso 2: Pedí un informe de dominio

El **informe de dominio** te permite ver titularidad y gravámenes (prenda, embargo, etc.) y te da un panorama legal.

- Guía: [Informe de dominio en Argentina: qué es y cuándo pedirlo](/guias/informe-de-dominio-auto-argentina-caba-gba)

---

## Paso 3: Hacé verificación policial (cuando corresponde)

La verificación física es un filtro importante para detectar autos adulterados.

---

## Señales rojas durante la operación

- apuro excesivo por cobrar,
- “precio regalo” sin explicación,
- no quieren ir al registro,
- documentación rara o incompleta.

---

## Recomendación final

Antes de pagar, combiná **revisión técnica** + **papeles**.

- [/solicitar-turno](/solicitar-turno)

---

[[youtube:https://www.youtube.com/watch?v=wHdFwi_pw0g]]
` ,
  },
  {
    id: 'auto-antes-vacaciones',
    slug: 'checklist-auto-antes-viaje-vacaciones',
    title: 'Checklist del auto antes de salir a la ruta en vacaciones (Argentina)',
    excerpt:
      'Neumáticos, frenos, fluidos, luces, correa, amortiguadores y equipo obligatorio: lista práctica para viajar más seguro y evitar quedarte tirado.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Revisión del Vehículo',
    tags: ['viaje', 'ruta', 'vacaciones', 'neumáticos', 'frenos', 'luces', 'seguridad vial'],
    image: `${base}images/mechanic_working.jpg`,
    metaTitle: 'Checklist del auto antes de salir a la ruta (vacaciones) | carChecking',
    metaDescription:
      'Lista completa para revisar el auto antes de viajar: neumáticos, frenos, líquidos, luces, correa, amortiguadores, documentación y equipo obligatorio en Argentina.',
    content: `
## Antes de salir a la ruta: revisá esto y viajá más tranquilo

Viajar en tu auto puede ser cómodo y más económico, pero en ruta cualquier falla se paga caro. Acá tenés un **checklist práctico**.

---

## 1) Neumáticos

- dibujo (mínimo legal),
- presión (incluida la rueda de auxilio),
- cortes o “huevos” en laterales,
- desgaste parejo (si está comido raro: alineación/amortiguación).

---

## 2) Frenos

- que no haga ruido metálico,
- que el pedal no se vaya al fondo,
- revisar líquido de frenos.

---

## 3) Líquidos

- aceite (nivel + cambio al día),
- refrigerante,
- dirección asistida,
- limpiaparabrisas.

---

## 4) Correa de distribución

Si estás cerca del kilometraje/tiempo recomendado, **no lo patees**.

---

## 5) Amortiguadores

Si rebota o está “blando”, afecta estabilidad y gasta neumáticos.

---

## 6) Luces

- posición, baja, alta,
- guiños, balizas,
- antiniebla si tenés.

---

## 7) Equipo para llevar

- matafuegos vigente,
- balizas,
- chaleco reflectivo,
- gato y llave,
- cargador de celular.

---

## 8) Documentación

Para papeles, mirá la guía específica:
- [Documentación para salir a la ruta en Argentina](/guias/documentacion-para-salir-a-la-ruta-argentina)

---

## ¿Querés una revisión completa antes de viajar?

- [/solicitar-turno](/solicitar-turno)
` ,
  },
  {
    id: 'comprar-auto-usado-argentina',
    slug: 'como-comprar-auto-usado-argentina',
    title: 'Cómo comprar un auto usado en Argentina: pasos legales y técnicos (guía 2026)',
    excerpt:
      'Proceso completo para comprar un usado: verificación técnica, prueba, checklist, informe de dominio, verificación policial y transferencia sin riesgos.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Comprando un vehículo usado',
    tags: ['comprar auto usado', 'Argentina', 'transferencia', 'informe de dominio', 'verificación policial', 'garantía'],
    image: `${base}images/scanner_hands.jpg`,
    metaTitle: 'Cómo comprar un auto usado en Argentina: guía paso a paso | carChecking',
    metaDescription:
      'Guía paso a paso para comprar un auto usado en Argentina: revisión técnica, papeles, informe de dominio, verificación policial y transferencia. Evitá estafas.',
    content: `
## Comprar un auto usado en Argentina: el paso a paso que te evita problemas

Esta guía resume lo importante para comprar un usado con la menor cantidad de sorpresas.

---

## Paso 1: Definí presupuesto (incluí costos extra)

Sumá:
- transferencia,
- seguro,
- posibles arreglos iniciales.

---

## Paso 2: Revisá el auto (idealmente con un profesional)

- estructura/chapa,
- mecánica,
- escaneo.

Guías:
- [Qué revisar antes de comprar un auto usado](/guias/que-revisar-antes-de-comprar-auto-usado-checklist)
- [Para qué sirve escanear un vehículo](/guias/para-que-sirve-escanear-un-vehiculo)

---

## Paso 3: Revisá papeles

- [Qué papeles revisar al comprar un auto usado](/guias/papeles-auto-usado-argentina-informe-dominio-verificacion-policial)

---

## Paso 4: Señá solo si está todo encaminado

Usá un recibo bien hecho:
- [Recibo de seña de venta de vehículo](/guias/recibo-de-sena-de-venta-de-vehiculo)

---

## Paso 5: Transferí lo antes posible

- [¿Es necesario hacer la transferencia?](/guias/es-necesario-hacer-transferencia-auto-usado)

---

## ¿Querés que revisemos el auto por vos?

- [/solicitar-turno](/solicitar-turno)
` ,
  },
  {
    id: 'comprar-usado-en-concesionaria',
    slug: 'comprar-auto-usado-en-concesionaria-es-seguro',
    title: '¿Conviene comprar un auto usado en concesionaria? Ventajas, riesgos y cómo cubrirte',
    excerpt:
      'Las agencias pueden dar más comodidad, pero no siempre más seguridad. Qué revisar, qué preguntar y cómo usar una inspección precompra para evitar sorpresas.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Comprando un vehículo usado',
    tags: ['concesionaria', 'agencia', 'usados', 'garantía', 'estafas', 'kilometraje'],
    image: `${base}images/engine_bay.jpg`,
    metaTitle: 'Comprar un usado en concesionaria: ¿es siempre seguro? (Argentina) | carChecking',
    metaDescription:
      'Te contamos pros y contras de comprar un auto usado en concesionaria: garantía, riesgos típicos y cómo protegerte con revisión técnica + papeles.',
    content: `
## ¿Es siempre seguro comprar un vehículo usado en una concesionaria?

No necesariamente. Hay concesionarias muy serias y otras que trabajan mal. La diferencia suele estar en:
- transparencia,
- historial y reputación,
- cómo resuelven garantías,
- estado real del vehículo.

---

## Ventajas típicas de comprar en agencia

- mayor oferta en un solo lugar,
- posible financiación,
- a veces, algún tipo de garantía.

---

## Riesgos frecuentes (lo que vemos seguido)

- kilometraje adulterado,
- arreglos cosméticos para “tapar” fallas,
- componentes no originales,
- agencias nuevas que cambian de nombre.

---

## Cómo cubrirte

1) Buscá reseñas y antigüedad real del comercio.
2) Pedí papeles y chequeá el informe de dominio.
3) Hacé una revisión precompra (sí, también en agencia).

- [/solicitar-turno](/solicitar-turno)

---

[[youtube:https://www.youtube.com/watch?v=XrM4sVW35CE]]
` ,
  },
  {
    id: 'es-necesario-transferir',
    slug: 'es-necesario-hacer-transferencia-auto-usado',
    title: '¿Es necesario hacer la transferencia cuando comprás un auto usado? Sí: por estas razones',
    excerpt:
      'Dejar el 08 sin transferir es una mala idea: vencimientos, riesgos civiles, problemas para vender y complicaciones si perdés contacto con el titular.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Documentación',
    tags: ['transferencia', '08', 'registro automotor', 'cédula verde', 'comprar usado'],
    image: `${base}images/hero_mecanico_03.jpg`,
    metaTitle: '¿Es necesario hacer la transferencia al comprar un auto usado? | carChecking',
    metaDescription:
      'Explicación clara: por qué conviene transferir inmediatamente un auto usado, qué riesgos hay si no lo hacés y qué pasa si vence el 08.',
    content: `
## ¿Se puede “comprar” y no transferir? Se puede… pero es riesgoso

Mucha gente compra un auto y se queda con el **08 firmado** para “transferir después”. El problema es que eso puede dejarte en un limbo.

---

## Riesgos de no transferir

- Si vence el 08, necesitás al vendedor otra vez.
- Si perdés contacto con el titular, el trámite se complica.
- El auto sigue a nombre del vendedor (responsabilidad civil, multas, etc.).

---

## Recomendación

Siempre que puedas:
- firmá y certificá correctamente,
- **transferí lo antes posible**.

Si querés acortar tiempos:
- [Turno rápido para transferencia](/guias/turno-rapido-transferencia-automotor)

Y si necesitás asistencia:
- [/servicio-gestoria](/servicio-gestoria)

---

[[youtube:https://www.youtube.com/watch?v=AdtFHovNL60]]
` ,
  },
  {
    id: 'seguro-al-comprar-usado',
    slug: 'seguro-al-comprar-auto-usado',
    title: 'Seguro al comprar un auto usado: cuándo contratarlo y qué errores evitar',
    excerpt:
      'No manejes sin seguro. Te explicamos por qué conviene asegurar antes de retirar el auto, qué pasa con la póliza del vendedor y tips para activarlo bien.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Comprando un vehículo usado',
    tags: ['seguro', 'auto usado', 'póliza', 'cobertura', 'robo'],
    image: `${base}images/mechanic_portrait.jpg`,
    metaTitle: 'Seguro al comprar un auto usado: cuándo contratarlo (Argentina) | carChecking',
    metaDescription:
      'Guía: cuándo contratar el seguro al comprar un usado, qué pasa si el auto se roba antes de transferir, y consejos para activar cobertura sin demoras.',
    content: `
## Seguro al comprar un usado: cuándo conviene contratarlo

En Argentina es ilegal circular sin seguro. Además, hay un punto clave:

Si comprás el auto y lo retirás “para después” hacer el seguro, en ese período podés quedar expuesto.

---

## Riesgo típico: sin seguro a tu nombre

Si el auto se roba y la póliza está a nombre del vendedor, **quien cobra es el vendedor** (salvo acuerdo específico).

---

## Recomendación práctica

- Coordiná el seguro **antes de manejar**.
- Consultá desde qué hora/día te cubre (algunas compañías activan al día siguiente).
- Tené a mano datos de la cédula y fotos si te las piden.

---

## Checklist rápido

- ¿Cobertura contra terceros / todo riesgo?
- ¿Granizo? ¿robo total?
- ¿Franquicia?

---

Para el resto del proceso de compra:
- [Cómo comprar un auto usado en Argentina](/guias/como-comprar-auto-usado-argentina)

---

[[youtube:https://www.youtube.com/watch?v=BBO4YA7Jxis]]
` ,
  },
  {
    id: 'ex-uber-cabify-conviene',
    slug: 'comprar-auto-ex-uber-cabify-conviene',
    title: '¿Conviene comprar un auto que fue Uber o Cabify? Qué mirar antes de decidir',
    excerpt:
      'Autos con pocos años y muchos kilómetros: no siempre es malo. Te contamos cuándo puede convenir y qué revisar (desgaste real, service, tren delantero, etc.).',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Comprando un vehículo usado',
    tags: ['Uber', 'Cabify', 'kilometraje', 'desgaste', 'service', 'compra'],
    image: `${base}images/hero_car.jpg`,
    metaTitle: 'Comprar un auto ex Uber/Cabify: ¿conviene? Qué revisar | carChecking',
    metaDescription:
      'Guía para evaluar autos usados como Uber o Cabify: cuándo conviene, qué revisar en mecánica y desgaste, y cómo estimar el valor real.',
    content: `
## Autos ex Uber o Cabify: la pregunta real es el uso que le vas a dar

Hoy es común ver autos con 2–3 años y 50.000 a 80.000 km (o más). Eso no significa automáticamente que sea una mala compra.

---

## Cuándo puede convenir

- Si el precio refleja el kilometraje.
- Si tuvo **services al día**.
- Si el desgaste es coherente y el auto está bien mantenido.

---

## Qué revisar sí o sí

- tren delantero y suspensión,
- frenos,
- embrague/caja (según modelo),
- estado interior (butacas, volante, pedales),
- escaneo (fallas recurrentes),
- historial de mantenimiento.

Guía complementaria:
- [Cuántos kilómetros conviene que tenga un auto usado](/guias/cuantos-kilometros-conviene-auto-usado)

---

## Recomendación

En estos casos, la inspección precompra es clave.
- [/solicitar-turno](/solicitar-turno)

---

[[youtube:https://www.youtube.com/watch?v=KdO1v8Dll9w]]
[[youtube:https://www.youtube.com/watch?v=RVBU_8sTQSk]]
` ,
  },
  {
    id: 'cuantos-km-auto-usado',
    slug: 'cuantos-kilometros-conviene-auto-usado',
    title: '¿Cuántos kilómetros conviene que tenga un auto usado? (y por qué no es lo único importante)',
    excerpt:
      'El kilometraje solo no alcanza: importa el tipo de uso (ruta vs ciudad), el mantenimiento y el desgaste real. Cómo interpretarlo para pagar lo justo.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Comprando un vehículo usado',
    tags: ['kilometraje', 'ruta', 'ciudad', 'desgaste', 'autos usados'],
    image: `${base}images/mechanic_working.jpg`,
    metaTitle: 'Cuántos kilómetros conviene que tenga un auto usado (Argentina) | carChecking',
    metaDescription:
      'Te explicamos cómo evaluar el kilometraje de un auto usado: uso en ruta vs ciudad, señales de desgaste real y cómo evitar pagar de más por un odómetro “bajo”.',
    content: `
## Kilometraje: dato importante, pero no definitivo

Un auto con pocos km puede estar mal tratado. Y uno con muchos km en ruta puede estar mejor de lo que parece.

Regla general orientativa: un uso “normal” suele estar alrededor de 10.000 a 15.000 km por año.

---

## Ruta vs ciudad: por qué cambia todo

En general:
- km en **ruta/autopista** = desgaste más parejo y menor,
- km en **ciudad** = más frenadas, baches, embrague, etc.

---

## Qué mirar además del odómetro

- volante/pedales/butacas,
- neumáticos y fecha,
- cierre/alineación de puertas,
- historial de mantenimiento.

---

## Si te preocupa el kilometraje adulterado

- [Cómo saber el kilometraje real sin revisarlo](/guias/como-saber-kilometraje-real-sin-revisar)
- [Guía para verificar que el cuentakilómetros no ha sido alterado](/guias/guia-verificar-cuentakilometros-no-alterado)

---

[[youtube:https://www.youtube.com/watch?v=rZJg3ZWRjNg]]
` ,
  },
  {
    id: 'mejores-autos-uber',
    slug: 'mejores-autos-para-uber-argentina',
    title: 'Los mejores autos para trabajar con Uber en Argentina: consumo, mantenimiento y costo',
    excerpt:
      'Qué modelos suelen elegirse por bajo consumo y repuestos accesibles, qué año mínimo exige la plataforma y consejos para bajar costo por kilómetro.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Comprando un vehículo usado',
    tags: ['Uber', 'trabajar', 'autos', 'consumo', 'GNC', 'repuestos'],
    image: `${base}images/scanner_hands.jpg`,
    metaTitle: 'Mejores autos para Uber en Argentina: qué modelos convienen | carChecking',
    metaDescription:
      'Listado de autos usados elegidos para Uber por consumo y mantenimiento. Recomendaciones para bajar costo por km (incluido GNC) y qué revisar antes de comprar.',
    content: `
## Qué conviene buscar en un auto para Uber

Si vas a trabajar con apps, lo que manda es:
- **consumo**,
- **mantenimiento** y repuestos,
- confiabilidad,
- comodidad para pasajeros.

También revisá requisitos de la plataforma (año mínimo, etc.).

---

## Modelos típicos por relación costo/uso

En el mercado suelen elegirse modelos como:
- Chevrolet Corsa / Agile / Prisma
- Fiat Siena
- Volkswagen Voyage
- Renault Logan

> Ojo: la mejor opción depende de tu zona, presupuesto y disponibilidad.

---

## ¿GNC sí o no?

Puede bajar costo por km, pero depende del motor y del estado del equipo. Comprá solo si:
- el equipo está declarado y en regla,
- el auto está sano (compresión, temperatura).

---

## Recomendación antes de comprar

Si lo vas a usar intensivamente, **revisalo** como corresponde (mecánica + escaneo).
- [/solicitar-turno](/solicitar-turno)
` ,
  },
  {
    id: 'vender-auto-rapido-una-semana',
    slug: 'como-vender-auto-rapido-una-semana',
    title: 'Cómo vender tu auto rápido (en una semana): publicación, fotos y estrategia',
    excerpt:
      'Tácticas para vender un usado más rápido: cómo armar el aviso, qué fotos sacar, dónde publicar (portales + redes) y cómo ajustar precio sin regalarlo.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Venta de vehículos',
    tags: ['vender auto', 'publicación', 'fotos', 'precio', 'MercadoLibre', 'Facebook'],
    image: `${base}images/engine_bay.jpg`,
    metaTitle: 'Cómo vender tu auto rápido: guía para vender en una semana | carChecking',
    metaDescription:
      'Guía para vender un auto usado más rápido: portales, redes sociales, fotos correctas, descripción, respuestas y estrategia de precio para acelerar la venta.',
    content: `
## Vender un auto rápido: la clave es el aviso (y el precio)

Si querés vender en pocos días, necesitás dos cosas:
- un aviso que genere confianza,
- un precio dentro de mercado.

---

## 1) Publicá mejor (no solo “publicar”)

Un buen aviso tiene:
- fotos nítidas (sin contraluz),
- descripción clara (sin mentir),
- información completa (año, versión, km, services, detalles),
- ortografía.

---

## 2) Fotos: lo que más vende

Sugerencia de set mínimo:
- frente/trasera/laterales,
- interior (tablero, asientos),
- motor,
- cubiertas,
- detalles (rayas, golpes).

---

## 3) Dónde publicar

- Portales de avisos
- Grupos de Facebook de tu zona

---

## 4) Ajuste de precio

Si en 3–5 días no hay consultas reales:
- revisá fotos,
- revisá precio,
- considerá bajar un pequeño porcentaje.

---

## Para evitar estafas en la operación

- No muestres el auto en tu casa.
- Cobrá por medios trazables.
- Cerrá con transferencia.

Guía: [¿Qué papeles revisar al comprar/vender un usado?](/guias/papeles-auto-usado-argentina-informe-dominio-verificacion-policial)
` ,
  },
  {
    id: 'como-vender-mi-auto-argentina',
    slug: 'como-vender-mi-auto-argentina',
    title: 'Cómo vender mi auto en Argentina: precio, seguridad, seña y transferencia',
    excerpt:
      'Guía paso a paso para vender un auto usado: cómo poner precio, dónde publicar, cómo mostrarlo con seguridad y cómo cobrar y transferir sin riesgos.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Venta de vehículos',
    tags: ['vender auto', 'precio', 'transferencia', 'seña', 'seguridad'],
    image: `${base}images/hero_mecanico_03.jpg`,
    metaTitle: 'Cómo vender mi auto en Argentina: guía completa | carChecking',
    metaDescription:
      'Aprendé a vender tu auto usado en Argentina: cómo fijar precio, dónde publicarlo, cómo mostrarlo con seguridad y cómo cerrar pago y transferencia.',
    content: `
## Vender un auto usado: el paso a paso para hacerlo bien

---

## 1) Definí el precio de mercado

Compará tu auto contra publicaciones similares (año/versión/km/zona/estado). Si necesitás vender rápido, el precio manda.

---

## 2) Publicá donde está la demanda

Hoy la mayoría de compradores busca online. Publicá en varios lugares.

---

## 3) Mostralo con seguridad

- en lugar público,
- idealmente con alguien más,
- verificá que quien prueba tenga licencia.

---

## 4) Negociación y seña

Si aceptás seña, dejá todo por escrito.

---

## 5) Cobro y transferencia

Lo más seguro es recibir el pago por medios bancarios y hacer la transferencia correctamente.

Guía relacionada:
- [Costo de la transferencia de un auto usado](/guias/costo-transferencia-auto-usado-argentina)
` ,
  },
  {
    id: 'turno-rapido-transferencia',
    slug: 'turno-rapido-transferencia-automotor',
    title: 'Cómo conseguir un turno rápido para transferencia automotor (Argentina)',
    excerpt:
      'Qué hacer cuando el registro te da turno lejano: alternativas reales, firma de 08, gestoría y cómo evitar quedarte con el auto “en el aire”.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Documentación',
    tags: ['turno', 'transferencia', 'registro automotor', 'gestoría', '08'],
    image: `${base}images/mechanic_portrait.jpg`,
    metaTitle: 'Turno rápido para transferencia automotor: opciones y consejos | carChecking',
    metaDescription:
      'Guía para conseguir turno rápido en el registro para transferencia: alternativas, firma del 08, uso de gestor y recomendaciones para comprar sin demoras.',
    content: `
## Cuando el registro te da turno lejano: qué opciones tenés

A veces el registro da turnos a 20–30 días. Si necesitás resolver rápido, lo importante es **no aumentar riesgo**.

---

## Opción 1: Gestoría

Un gestor puede ayudar con:
- turnos,
- control de papeles,
- seguimiento del trámite.

- [/servicio-gestoria](/servicio-gestoria)

---

## Opción 2: Firmar y certificar el 08 primero

Si conseguís turno para firma/certificación, podés avanzar con el 08 y luego completar la transferencia.

Ojo: no dejes que venza.

---

## Recomendación

Si estás comprando, combiná:
- informe de dominio,
- verificación (si corresponde),
- firma correcta.

Guía: [Qué papeles revisar al comprar un auto usado](/guias/papeles-auto-usado-argentina-informe-dominio-verificacion-policial)

---

[[youtube:https://www.youtube.com/watch?v=o6014tzCVbE]]
` ,
  },
  {
    id: 'documentacion-ruta-vacaciones',
    slug: 'documentacion-para-salir-a-la-ruta-argentina',
    title: 'Documentación para salir a la ruta en Argentina: qué te pueden pedir',
    excerpt:
      'Lista rápida de papeles obligatorios y recomendados para circular: DNI, licencia, cédula, seguro, VTV/RTO y más. Plus: Mi Argentina.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Documentación',
    tags: ['ruta', 'vacaciones', 'documentación', 'Mi Argentina', 'seguro', 'VTV'],
    image: `${base}images/scanner_hands.jpg`,
    metaTitle: 'Documentación para salir a la ruta en Argentina (checklist) | carChecking',
    metaDescription:
      'Checklist de documentación para viajar en auto en Argentina: DNI, licencia, cédula, seguro, VTV/RTO, patentes visibles y requisitos si tenés GNC.',
    content: `
## Checklist de documentación para viajar en auto (Argentina)

Si vas a salir a la ruta, te pueden pedir:
- DNI
- Licencia vigente
- Cédula del vehículo (verde o azul)
- Comprobante de seguro vigente
- Oblea/certificado de VTV o RTO (según jurisdicción)
- Patentes colocadas, legibles y sin alteraciones
- Si tenés GNC: oblea y comprobante vigente

---

## Tip útil: Mi Argentina

La app **Mi Argentina** permite llevar licencia y cédulas digitales (cuando están habilitadas/actualizadas).

---

## Para viajar seguro (revisión previa)

- [Checklist del auto antes de salir a la ruta](/guias/checklist-auto-antes-viaje-vacaciones)
` ,
  },
  {
    id: 'costo-transferencia-auto',
    slug: 'costo-transferencia-auto-usado-argentina',
    title: 'Costo de transferencia de un auto usado en Argentina: qué se paga y cómo se calcula',
    excerpt:
      'Qué compone el costo: arancel de transferencia, valuación, formularios, certificaciones, sellos, verificación y tasas según jurisdicción. Guía + calculadora.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Documentación',
    tags: ['costo transferencia', 'arancel', 'DNRPA', 'sellos', 'valuación', '08'],
    image: `${base}images/mechanic_working.jpg`,
    metaTitle: 'Costo de transferencia de auto usado en Argentina: guía completa | carChecking',
    metaDescription:
      'Conocé qué se paga en una transferencia: aranceles DNRPA, valuación, sellos y tasas. Incluye consejos y una calculadora para estimar el total.',
    content: `
## ¿Cuánto cuesta transferir un auto usado en Argentina?

El costo final depende de:
- valuación/valor declarado,
- jurisdicción (sellos),
- si hay prenda, cambios de radicación,
- trámites extra (verificación, certificaciones).

---

## Componentes típicos del costo

- Arancel de transferencia (porcentaje)
- Formularios/aranceles del registro
- Certificación de firmas (si aplica)
- Cédula y título
- Sellos e impuestos provinciales/municipales

---

## Calculadora rápida

Podés usar nuestra calculadora para estimar:
- [Calculadora de costos de transferencia](/guias/calculadora-costos-transferencia-auto-usado)

---

## Recomendación

Antes de pagar una seña grande, pedí:
- informe de dominio,
- chequeo de multas/deudas.

---

[[youtube:https://www.youtube.com/watch?v=zxBm57E6z6Q]]
` ,
  },
  {
    id: 'requisitos-transferencia-buenos-aires',
    slug: 'requisitos-transferencia-auto-buenos-aires',
    title: 'Requisitos para transferir un auto en Buenos Aires (Provincia): papeles y pasos',
    excerpt:
      'Documentación necesaria, formularios (08/13), verificación, CeTA cuando corresponde y plazos. Guía práctica para no ir y venir al registro.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Documentación',
    tags: ['transferencia', 'Buenos Aires', 'DNRPA', '08', '13', 'CeTA', 'verificación'],
    image: `${base}images/scanner_hands.jpg`,
    metaTitle: 'Requisitos para transferencia de auto en Buenos Aires (Provincia) | carChecking',
    metaDescription:
      'Guía práctica con requisitos para transferir un auto en Provincia de Buenos Aires: DNI, CUIT/CUIL, título, cédula, 08, 13, verificación y plazos.',
    content: `
## Transferencia en Provincia de Buenos Aires: requisitos principales

La transferencia es el acto que te convierte en titular. Si no la hacés, el vehículo puede quedar “en el aire”.

---

## Documentación usual

- DNI comprador/vendedor (y cónyuges si corresponde)
- CUIT/CUIL/CDI
- Título y cédula
- Formulario 08 (precarga online o presencial)
- Formulario 13
- Verificación (según año/caso)
- CeTA (si corresponde por valuación)

---

## Consejos

- Revisá situación legal con un informe de dominio.
- No pagues todo sin tener firma/certificación resuelta.

Guía: [Informe de dominio: qué muestra](/guias/informe-de-dominio-auto-argentina-caba-gba)
` ,
  },
  {
    id: 'transferencia-sin-vendedor',
    slug: 'transferencia-auto-sin-vendedor',
    title: 'Transferencia de auto sin el vendedor: cuándo se puede y qué alternativas hay',
    excerpt:
      'Si no está el vendedor, normalmente no se puede transferir salvo que ya tengas 08 firmado y certificado. Qué hacer si no lo encontrás.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Documentación',
    tags: ['transferencia', '08', 'vendedor', 'escribano', 'registro automotor'],
    image: `${base}images/engine_bay.jpg`,
    metaTitle: 'Transferencia de auto sin el vendedor: opciones reales (Argentina) | carChecking',
    metaDescription:
      'Te explicamos cuándo se puede transferir sin el vendedor (08 firmado y certificado) y qué alternativas hay si no lo encontrás o no quiere firmar.',
    content: `
## ¿Se puede transferir un auto sin el vendedor?

En general, **no**. La transferencia requiere la firma del titular (o representación válida) y su certificación.

La excepción práctica: si ya contás con el **Formulario 08 firmado y certificado**, podés continuar el trámite sin que el vendedor esté presente.

---

## Si no tenés 08 firmado

- necesitás contactar al titular,
- o buscar alternativas como certificación ante escribano (según jurisdicción).

Guía relacionada:
- [Qué hacer si el vendedor no quiere firmar el 08](/guias/que-hacer-si-vendedor-no-firma-formulario-08)

---

[[youtube:https://www.youtube.com/watch?v=Bbmr4Xs4Ov0]]
` ,
  },
  {
    id: 'deuda-patentes-auto',
    slug: 'como-saber-si-auto-tiene-deuda-de-patentes',
    title: 'Cómo saber si un auto tiene deuda de patentes (antes de comprar)',
    excerpt:
      'Antes de transferir, revisá deuda de patentes. Qué consultar, dónde buscar según jurisdicción y cómo negociar si aparecen deudas.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Documentación',
    tags: ['patentes', 'deuda', 'transferencia', 'multas', 'usados'],
    image: `${base}images/hero_mecanico_03.jpg`,
    metaTitle: 'Deuda de patentes: cómo revisar un auto antes de comprar (Argentina) | carChecking',
    metaDescription:
      'Guía práctica para revisar si un vehículo tiene deuda de patentes antes de comprar: qué consultar, cómo negociar el pago y por qué conviene chequearlo.',
    content: `
## Deuda de patentes: por qué conviene chequear antes de comprar

Para transferir, conviene confirmar que el vehículo no tenga deudas relevantes. Si aparecen, lo mejor es **negociarlo antes** de cerrar.

---

## Cómo revisar (según jurisdicción)

La consulta cambia por provincia/municipio. En general necesitás:
- dominio/patente,
- en algunos casos datos adicionales.

---

## Qué hacer si hay deuda

Opciones típicas:
- que el vendedor pague antes,
- descontarlo del precio y que pague el comprador (con comprobante).

Guía complementaria:
- [¿Quién paga la transferencia de un vehículo usado?](/guias/quien-paga-la-transferencia-de-un-vehiculo-usado)
` ,
  },
  {
    id: 'verificacion-patente',
    slug: 'verificacion-patente-argentina',
    title: 'Verificación de patente antes de comprar: infracciones, patentes, dominio e informe',
    excerpt:
      'Antes de pagar un usado, chequeá infracciones, deuda de patentes e informe de dominio. Guía rápida para evitar sorpresas en el registro.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Documentación',
    tags: ['patente', 'infracciones', 'deudas', 'informe de dominio', 'transferencia'],
    image: `${base}images/mechanic_portrait.jpg`,
    metaTitle: 'Verificación de patente (Argentina): qué revisar antes de comprar | carChecking',
    metaDescription:
      'Guía para verificar un dominio/patente antes de comprar un auto usado: infracciones, patentes adeudadas e informe de dominio para evitar bloqueos en la transferencia.',
    content: `
## Verificar la patente antes de comprar: 3 chequeos que te ahorran problemas

Antes de pagar un auto usado, hacé estos pasos:

### 1) Infracciones de tránsito
Revisá multas en la jurisdicción donde circula/radica.

### 2) Deuda de patentes
- [Cómo revisar deuda de patentes](/guias/como-saber-si-auto-tiene-deuda-de-patentes)

### 3) Informe de dominio
Te muestra titularidad y gravámenes.
- [Informe de dominio: qué es y qué muestra](/guias/informe-de-dominio-auto-argentina-caba-gba)

---

## Bonus: verificación física / policial

Si corresponde por año/caso, sumá verificación física para confirmar chasis/motor.
` ,
  },
  {
    id: 'formulario-08-online',
    slug: 'formulario-08-online-transferencia-digital',
    title: 'Formulario 08 online y transferencia digital: paso a paso (Argentina)',
    excerpt:
      'Qué necesitás para iniciar la transferencia digital (DNRPA), cómo cargar datos, sacar turno, pagar y completar el trámite en el registro.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Documentación',
    tags: ['08 online', 'transferencia digital', 'DNRPA', 'turno', 'registro automotor'],
    image: `${base}images/engine_bay.jpg`,
    metaTitle: '08 online: cómo hacer la transferencia digital en Argentina (paso a paso) | carChecking',
    metaDescription:
      'Guía paso a paso para hacer el 08 online/transferencia digital (DNRPA): requisitos, carga de datos, turno, pago y presentación en registro con comprador y vendedor.',
    content: `
## 08 online / Transferencia digital: qué es

La DNRPA permite iniciar la **transferencia digital** (precarga online). Ojo: en la mayoría de casos, **comprador y vendedor igual deben presentarse** a firmar en el registro.

---

## Requisitos típicos

Del vehículo:
- dominio/patente,
- datos de chasis (según formulario),

De las personas:
- datos personales,
- contacto (email/teléfono),
- datos del cónyuge si corresponde,
- representación si firma otra persona.

---

## Paso a paso (resumen)

1) Entrá al sitio de DNRPA y elegí transferencia digital.
2) Cargá datos del vendedor y del comprador.
3) Elegí el registro correspondiente.
4) Solicitá turno.
5) Pagá si corresponde.
6) Presentate en el registro en la fecha/hora con la documentación.

---

## Consejo clave

No pagues el 100% si no tenés resuelta la firma/certificación.

Guía: [Qué hacer si el vendedor no quiere firmar el 08](/guias/que-hacer-si-vendedor-no-firma-formulario-08)
` ,
  },
  {
    id: 'detectar-auto-usado-como-remis',
    slug: 'como-detectar-si-auto-fue-remis',
    title: 'Cómo detectar si un auto usado fue remis: señales de desgaste y chequeos (Argentina)',
    excerpt:
      'Guía práctica para descubrir si un usado tuvo uso intensivo como remis: desgaste interior, puertas, A/C, kilometraje, rastros de taxímetro y consultas a registros.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Revisión del Vehículo',
    tags: ['remis', 'uso intensivo', 'kilometraje', 'desgaste', 'puertas', 'aire acondicionado', 'estafas', 'autos usados'],
    image: `${base}images/mechanic_working.jpg`,
    metaTitle: 'Cómo detectar si un auto fue remis (Argentina): guía y checklist | carChecking',
    metaDescription:
      'Aprendé a detectar si un auto usado fue remis: señales de desgaste, chequeos del interior, puertas y A/C, pistas de taxímetro y cómo confirmar con documentación.',
    content: `
## ¿Por qué importa saber si un auto fue remis?

Un auto que trabajó como **remis** suele tener un **uso intensivo**: muchos kilómetros por año, muchas aperturas/cierres de puertas y horas de motor encendido.

Eso no significa que sea “malo” sí o sí, pero **cambia el valor real** y el tipo de problemas que podés esperar (desgaste de tren delantero, embrague, interiores, climatización, etc.).

> Lo ideal es que el vendedor lo declare. Cuando no pasa, estas señales te ayudan a detectarlo.

---

## Señal #1: Kilometraje y desgaste que no cierran

El clásico: odómetro bajo, pero el auto muestra desgaste de vehículo de trabajo.

Mirá especialmente:
- **volante** (brillo/exceso de desgaste),
- **palanca de cambios**,
- **pedales**,
- **tapizados** y espumas hundidas,
- **alfombras** / pisaderas.

Guías relacionadas:
- [Guía para verificar que el cuentakilómetros no ha sido alterado](/guias/guia-verificar-cuentakilometros-no-alterado)
- [Cómo saber el kilometraje real del vehículo sin revisarlo](/guias/como-saber-kilometraje-real-sin-revisar)

---

## Señal #2: Desgaste “desparejo” típico del remis

En muchos remises se ve más desgaste en:
- **butaca del conductor** (subidas/bajadas constantes),
- **asiento trasero derecho** (pasajero frecuente).

Revisá también el **cierre de puertas**: si están “caídas” o requieren más fuerza, puede indicar uso intenso.

---

## Señal #3: Pistas de instalación de taxímetro o accesorios de flota

Algunas agencias colocan **taxímetro** u otros accesorios. Al retirarlos pueden quedar:
- marcas de tornillos,
- perforaciones,
- cables cortados o empalmes en el tablero/consola.

---

## Señal #4: Aire acondicionado / climatización con mucho uso

Por comodidad del pasajero, un remis suele usar el A/C muchas horas al día.

Indicadores:
- compresor ruidoso,
- baja performance,
- historial de cargas frecuentes,
- ventilación con olores persistentes.

---

## Señal #5: Modelo/color y configuración (no concluyente, pero suma)

En traslados corporativos se suelen elegir sedanes de colores neutros (negro/gris/blanco). En agencias de barrio puede ser cualquier cosa.

**Ojo:** esto solo no prueba nada, pero combinado con el resto puede ser pista.

---

## Paso extra: ¿se puede confirmar por registro?

Depende de la **jurisdicción** y de si el vehículo fue habilitado formalmente como remis.

Si estuvo habilitado, puede haber registros locales. Si trabajó “en negro”, no siempre aparece.

---

## Lo más efectivo: inspección completa + escaneo

Cuando el auto fue usado como remis, puede estar bien cuidado… o puede estar **tapado** para la venta (cubreasientos, cubrevolante, cubiertas “nuevas” de última, etc.).

Por eso, antes de comprar:
- revisá estructura/mecánica,
- hacé escaneo,
- y revisá documentación.

- Solicitar turno: [/solicitar-turno](/solicitar-turno)

---

## Preguntas frecuentes

### ¿Un auto ex remis siempre es mala compra?
No necesariamente. Si tuvo mantenimiento al día y el precio refleja el desgaste, puede ser una compra razonable.

### ¿Qué es lo más caro que suele aparecer?
Tren delantero, embrague/caja (según modelo), y problemas de climatización por uso continuo.

### ¿Conviene evitarlo para reventa?
Si tu idea es revender rápido, el “uso comercial” suele impactar en precio y facilidad de venta.
` ,
  },
  {
    id: 'revision-vehiculos-hibridos-autos-chinos',
    slug: 'revision-vehiculos-hibridos-argentina',
    title: 'Revisión de vehículos híbridos en Argentina: qué mirar y por qué el escaneo es clave (BYD y otras marcas)',
    excerpt:
      'Guía para comprar un híbrido usado (incluyendo marcas nuevas como BYD): qué revisar en batería, sistema eléctrico y tren motriz, y por qué se necesitan escáneres específicos.',
    author: 'carChecking',
    date: '2026-02-11',
    category: 'Revisión del Vehículo',
    tags: ['híbridos', 'vehículos híbridos', 'BYD', 'autos chinos', 'escaneo', 'OBD', 'batería', 'inspección precompra', 'Argentina'],
    image: `${base}images/byd-dolphin-hero.jpg`,
    metaTitle: 'Revisión de vehículos híbridos en Argentina (BYD y otras marcas): guía + escaneo | carChecking',
    metaDescription:
      'Qué revisar al comprar un auto híbrido usado en Argentina: batería, electrónica, frenos regenerativos, tren motriz y diagnóstico con escáneres específicos. Guía práctica.',
    content: `
## Revisión de vehículos híbridos en Argentina: por qué no alcanza con “mirarlo por arriba”

En Argentina están llegando marcas nuevas (por ejemplo **BYD**) y cada vez se ven más **vehículos híbridos** (mild hybrid, híbridos convencionales y enchufables). El problema es que muchos usados “parecen impecables”, pero en híbridos hay fallas que **no se ven** sin diagnóstico.

Por eso, en una inspección precompra de híbridos, el punto clave es el **escaneo y el análisis del sistema electrónico**.

---

## ¿Qué cambia en un híbrido vs un auto naftero común?

Además de lo clásico (chapa, chasis, mecánica), en un híbrido hay que revisar:

- **Batería de alta tensión (HV)**: estado, balance de celdas, temperaturas, historial de eventos.
- **Sistema de gestión de energía**: inversor, convertidor DC-DC, cableado y conectores.
- **Motor eléctrico y controladores**.
- **Frenado regenerativo**: funcionamiento y sensaciones anormales.
- **Sistema de refrigeración** (muchos híbridos tienen circuitos dedicados para batería/inversor).

---

## Qué revisamos en carChecking (enfoque precompra)

En carChecking revisamos el auto **completo**:

### 1) Estructura y carrocería
- señales de choque/reparaciones,
- alineación de puertas/capó/baúl,
- puntos de chasis visibles.

### 2) Mecánica y tren rodante
- pérdidas, ruidos, vibraciones,
- frenos, suspensión, dirección,
- neumáticos (desgaste coherente con kilómetros).

### 3) Electrónica + escaneo (lo más importante en híbridos)
En híbridos no alcanza con un lector genérico. Se usan **escáneres compatibles** que permiten:
- leer fallas de módulos híbridos,
- ver datos en vivo (temperaturas, voltajes, estados),
- detectar inconsistencias (por ejemplo, fallas borradas recientemente).

> En autos con tecnología nueva (incluyendo varios modelos chinos), este paso es clave para comprar con tranquilidad.

---

## Señales de alerta al ver un híbrido usado

- testigos encendidos (o tapados),
- consumo anormal o falta de potencia,
- vibraciones/ruidos raros al pasar de eléctrico a combustión,
- frenado “extraño” o pedal inconsistente,
- historial de mantenimiento incompleto.

---

## ¿Los híbridos chinos son más difíciles de revisar?

No necesariamente, pero requieren:
- experiencia en diagnóstico,
- herramientas de escaneo correctas,
- y un enfoque más metódico en electrónica.

Marcas nuevas como BYD traen plataformas modernas y muchos módulos de control. Eso hace que una revisión “a ojo” sea insuficiente.

---

## Preguntas frecuentes

### ¿Conviene comprar un híbrido usado en Argentina?
Puede convenir por consumo y tecnología, pero **hay que revisar bien** antes de cerrar.

### ¿Un escaneo simple OBD alcanza?
Para un híbrido, normalmente no. Se necesita un escaneo que pueda leer módulos específicos.

### ¿Qué pasa si la batería está degradada?
Depende del modelo: puede afectar autonomía/consumo y puede ser costoso. Por eso el escaneo y los datos en vivo ayudan a detectar señales tempranas.

---

## ¿Querés que revisemos un híbrido antes de comprar?

Coordinamos una inspección precompra con revisión completa + escaneo.

- Solicitar turno: [/solicitar-turno](/solicitar-turno)
`,
  },

];

// Helper functions
export const getArticleBySlug = (slug: string): Article | undefined => {
  const normalized = slug.replace(/^\/+|\/+$/g, '');
  const lastSegment = normalized.includes('/')
    ? normalized.split('/').filter(Boolean).slice(-1)[0]
    : normalized;

  return articles.find((article) => article.slug === normalized) ||
    articles.find((article) => article.slug === lastSegment);
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
