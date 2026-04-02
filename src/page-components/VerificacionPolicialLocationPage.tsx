'use client';
import { useRouter } from 'next/navigation';

import ArticleTemplate from '../components/ArticleTemplate';
import { getLocationBySlug } from '../data/locations';

export default function VerificacionPolicialLocationPage({ slug }: { slug: string }) {
  const location = slug ? getLocationBySlug(slug) : undefined;

  if (!location) {
    return null;
  }

  const place = location.name;

  const metaTitle = `Verificación policial en ${place} – Requisitos y costos | carChecking`;
  const metaDescription = `Guía práctica para hacer la verificación policial en ${place}: cuándo conviene, qué papeles llevar, cuánto puede costar y consejos para comprar/vender sin sorpresas.`;

  const content = `
## Verificación policial en ${place}

Si vas a comprar o vender un auto usado, la **verificación policial en ${place}** es una de las formas más comunes de reducir riesgo: sirve para controlar que los números de **motor** y **chasis** coincidan y que no haya señales de adulteración.

---

## ¿Cuándo conviene hacerla?

- Antes de señar o antes de transferir, si hay dudas sobre el origen del vehículo.
- Cuando el registro o la jurisdicción la exige para completar trámites.
- Si el auto viene de otra provincia o hay inconsistencias en papeles/impresiones.

---

## Qué llevar (checklist)

- DNI del solicitante.
- Documentación del vehículo (según el caso: cédula/título o lo que te pidan en la planta).
- Comprobante/turno si corresponde.

Importante: los requisitos pueden variar. Si me decís el caso (particular, agencia, con prenda) lo ajusto.

---

## Preguntas frecuentes

### ¿La verificación policial es obligatoria?
Depende del tipo de trámite y la jurisdicción. Aunque no sea estrictamente obligatoria, suele ser recomendable si querés minimizar riesgos.

### ¿Cuánto cuesta?
Los costos cambian con el tiempo y pueden variar por planta/jurisdicción. Tomalo como un gasto separado del arancel de transferencia y de los sellos.

### ¿Esto reemplaza la revisión mecánica?
No. La verificación policial mira identidad del vehículo (motor/chasis). Una revisión precompra mira el estado mecánico/eléctrico, diagnóstico OBD y señales de choques/reparaciones.

---

## Para una guía general de papeles

- [Informe de dominio, verificación policial y checklist](/guias/papeles-auto-usado-argentina-informe-dominio-verificacion-policial)

---

## Si vas a comprar un usado

Si querés, también podemos ayudarte con una **revisión precompra a domicilio en ${place}** para que no compres a ciegas.
- Solicitar turno: [/solicitar-turno](/solicitar-turno)
`;

  const base = '';

  return (
    <ArticleTemplate
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      canonicalUrl={`/verificacion-policial-en/${location.slug}`}
      title={`Verificación policial en ${place}`}
      category="Verificación policial"
      date="2026-03-07"
      author="carChecking"
      image={`${base}images/hero_car.jpg`}
      tags={[
        `verificación policial en ${place}`,
        `verificacion policial ${place}`,
        `verificación policial automotor ${place}`,
        `chasis motor ${place}`,
        'compra venta auto usado',
      ]}
      content={content}
      breadcrumbs={[
        { label: 'Inicio', to: '/' },
        { label: 'Verificación policial' },
        { label: place },
      ]}
      analyticsEvent={{
        name: 'verificacion_policial_location_view',
        props: { slug: location.slug, place },
      }}
    />
  );
}
