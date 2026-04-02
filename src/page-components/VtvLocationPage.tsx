'use client';
import { useRouter } from 'next/navigation';

import ArticleTemplate from '../components/ArticleTemplate';
import { getLocationBySlug } from '../data/locations';

export default function VtvLocationPage({ slug }: { slug: string }) {
  const location = slug ? getLocationBySlug(slug) : undefined;

  if (!location) {
    return null;
  }

  const place = location.name;

  const metaTitle = `VTV en ${place} – Turno, requisitos y costos 2026 | carChecking`;
  const metaDescription = `Guía 2026 para hacer la VTV en ${place}: cómo sacar turno, requisitos, qué te revisan, costos orientativos y consejos para aprobar sin sorpresas.`;

  const content = `
## VTV en ${place}: turno, requisitos y costos 2026

Si estás buscando **VTV en ${place}**, normalmente querés tres cosas: **sacar turno**, saber **qué llevar** y entender **qué revisan**.

La VTV (Verificación Técnica Vehicular) puede variar según jurisdicción, pero el objetivo es el mismo: seguridad y control de emisiones.

---

## Cómo sacar turno

- Buscá el portal oficial de VTV/ITV de tu jurisdicción y elegí planta/fecha.
- Tené a mano dominio/patente y datos del titular.
- Guardá el comprobante del turno (mail/captura) por si te lo piden.

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

## Costos 2026 (orientativos)

El **costo de la VTV** cambia con el tiempo y depende de jurisdicción y tipo de vehículo. Para ver el valor actualizado, lo más confiable es el portal oficial al momento de sacar turno.

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
      title={`VTV en ${place}: turno, requisitos y costos 2026`}
      category="VTV"
      date="2026-03-07"
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
