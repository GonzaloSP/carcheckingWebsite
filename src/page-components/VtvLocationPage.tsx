'use client';
import { useRouter } from 'next/navigation';

import ArticleTemplate from '../components/ArticleTemplate';
import { getLocationBySlug } from '../data/locations';
import {
  VTV_LOCAL, VTV_TARIFFS, VTV_TARIFF_SINCE, VTV_DUE_MONTHS,
  VTV_BOOKING_URL, VTV_COSTS_URL, VTV_PLANTS_URL, vtvMeta,
} from '../data/vtv-plants';

export default function VtvLocationPage({ slug }: { slug: string }) {
  const location = slug ? getLocationBySlug(slug) : undefined;

  if (!location) {
    return null;
  }

  const place = location.name;

  const { title: metaTitle, description: metaDescription } = vtvMeta(place, location.slug);
  const local = VTV_LOCAL[location.slug];

  const plantSection = local
    ? `
## Planta VTV en ${place}: dirección y horarios

${local.plants.map(p => `**Planta ${p.name}**
- **Dirección:** ${p.address}
- **Horario:** ${p.hours}`).join('\n\n')}

${local.note ? local.note + ' ' : ''}Los horarios son los que publica la Provincia y pueden cambiar: confirmalos al sacar el turno. Datos del [listado oficial de plantas](${VTV_PLANTS_URL}).

---
`
    : `
## Dónde hacer la VTV si vivís en ${place}

Podés hacer la VTV en **cualquier planta habilitada de la Provincia de Buenos Aires**, no solo en la de tu partido: al sacar el turno elegís la que te quede más cómoda. El [listado oficial de plantas](${VTV_PLANTS_URL}) muestra dirección y horario de cada una.

---
`;

  const tariffTable = VTV_TARIFFS.map(t => `| ${t.label} | ${t.price} |`).join('\n');
  const dueTable = VTV_DUE_MONTHS.map(d => `| ${d.digit} | ${d.month} |`).join('\n');

  const content = `
## VTV en ${place}: turno, requisitos y costos 2026

Si estás buscando **VTV en ${place}**, normalmente querés tres cosas: **sacar turno**, saber **qué llevar** y entender **qué revisan**.

${place} está en la Provincia de Buenos Aires, así que corresponde la VTV provincial: mismas reglas, mismos precios y mismo sistema de turnos en todas las plantas.

---
${plantSection}
## Cómo sacar turno

- El turno se saca en el [portal oficial de la VTV de la Provincia](${VTV_BOOKING_URL}): elegís planta, día y horario.
- Las plantas trabajan con **turno prepago**: se paga online al reservar, no en la planta.
- Podés elegir cualquier planta de la provincia, aunque no sea la de tu partido.
- Tené a mano la patente y guardá el comprobante del turno.

---

## Cuándo vence la VTV según la patente

El mes de vencimiento depende del **último número de la patente** y es el mismo todos los años, sin importar cuándo la hayas hecho la última vez:

| Patente terminada en | Mes de vencimiento |
|---|---|
${dueTable}

Conviene sacar el turno dentro de ese mes o hasta 30 días antes. Los autos particulares hacen la primera VTV a los **2 años** del patentamiento y las motos al **año**; después es anual.

---

## Requisitos típicos (qué llevar)

- **DNI**
- **Cédula** del vehículo
- **Seguro vigente**
- **Comprobante de turno** (si lo exigen)

Si el auto tiene **GNC**, suele haber requisitos/controles extra.

---

## Qué te revisan en la VTV (resumen)

- Luces y señalización
- Frenos y tren delantero
- Dirección, suspensión y neumáticos
- Emisiones/ruidos
- Elementos de seguridad visibles

---

## Cuánto cuesta la VTV en ${place}

El precio es el mismo en todas las plantas de la provincia. Tarifa oficial vigente desde ${VTV_TARIFF_SINCE}:

| Vehículo | Precio |
|---|---|
${tariffTable}

La tarifa se actualiza varias veces por año: antes de reservar, confirmá el valor en la [página oficial de costos](${VTV_COSTS_URL}). Si el vehículo sale rechazado o condicional, podés volver a la misma planta dentro de los 60 días sin pagar de nuevo.

---

## Preguntas frecuentes

### ¿VTV y VTV “CABA” es lo mismo?
El concepto es el mismo, pero **la gestión y el turno dependen de la jurisdicción**. Si tu caso es CABA, mirá la guía específica:
- [Turno VTV CABA – Requisitos, costos y cómo sacar turno](/guias/vtv-caba)

### ¿Qué conviene revisar antes de ir?
Revisá luces, frenos, neumáticos, limpiaparabrisas, pérdidas y cualquier testigo en tablero.

---

## Si vas a comprar un usado

La VTV no reemplaza una revisión precompra. Si querés reducir riesgo real (choques, fallas ocultas, electrónica, kilometraje), lo ideal es sumar una inspección completa.
- Solicitar turno: [/solicitar-turno](/solicitar-turno)
`;

  const base = '';

  return (
    <ArticleTemplate
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      canonicalUrl={`/vtv-en/${location.slug}`}
      title={local ? `VTV en ${place}: dirección, horarios, turno y precio 2026` : `VTV en ${place}: turno, requisitos y costos 2026`}
      category="VTV"
      date="2026-11-14"
      author="carChecking"
      image={`${base}images/mechanic_working.jpg`}
      tags={[`vtv ${place}`, `turno vtv ${place}`, `requisitos vtv ${place}`, `costo vtv ${place}`, 'verificación técnica vehicular']}
      content={content}
      breadcrumbs={[
        { label: 'Inicio', to: '/' },
        { label: 'VTV' },
        { label: place },
      ]}
      analyticsEvent={{ name: 'vtv_location_view', props: { slug: location.slug, place } }}
    />
  );
}
