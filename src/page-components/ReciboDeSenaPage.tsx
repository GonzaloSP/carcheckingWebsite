'use client';
import Navigation from '../sections/Navigation';

const base = '';

export default function ReciboDeSenaPage() {
  const pdfHref = `${base}docs/recibo_de_sena.pdf`;

  return (
    <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />

        <main className="pt-24 pb-16 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[#F4F1EC] mb-4">
              Recibo de seña de venta de vehículo
            </h1>
            <p className="text-[#B8B2AA] leading-relaxed mb-8">
              Si vas a señar un auto, conviene dejar asentado por escrito el monto, la fecha,
              los datos del comprador y del vendedor, y las condiciones básicas (por ejemplo,
              qué pasa si alguna de las partes se arrepiente).
            </p>

            <div className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-[#F4F1EC] mb-2">Descargar PDF</h2>
              <p className="text-sm text-[#B8B2AA] mb-4">
                Modelo de recibo de seña (carChecking).
              </p>
              <a
                className="btn-primary inline-flex items-center justify-center w-full sm:w-auto"
                href={pdfHref}
                download
              >
                Descargar recibo_de_sena.pdf
              </a>
              <p className="text-xs text-[#5a5a5c] mt-4">
                Archivo: <span className="text-[#B8B2AA]">{pdfHref}</span>
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold text-[#F4F1EC] mb-3">Recomendaciones rápidas</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-[#B8B2AA]">
                  <span className="w-1.5 h-1.5 bg-[#C8A161] rounded-full mt-2 flex-shrink-0" />
                  <span>Verificá identidad (DNI/CUIT) y datos del vehículo (dominio, modelo, año).</span>
                </li>
                <li className="flex items-start gap-3 text-[#B8B2AA]">
                  <span className="w-1.5 h-1.5 bg-[#C8A161] rounded-full mt-2 flex-shrink-0" />
                  <span>Dejá por escrito el monto de la seña y la forma de pago.</span>
                </li>
                <li className="flex items-start gap-3 text-[#B8B2AA]">
                  <span className="w-1.5 h-1.5 bg-[#C8A161] rounded-full mt-2 flex-shrink-0" />
                  <span>Acordá plazos y condiciones (por ejemplo: inspección, verificación, transferencia).</span>
                </li>
              </ul>
            </div>
          </div>
        </main>

        <footer className="border-t border-[#2a2a2c] py-8 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-[#5a5a5c]">
              © carChecking 2011–2026. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
  );
}
