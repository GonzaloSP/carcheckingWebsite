import { useMemo, useState } from 'react';

type BreakdownItem = {
  key: string;
  label: string;
  amount: number;
  note?: string;
};

function formatArs(n: number) {
  if (!Number.isFinite(n)) return '-';
  return n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 2 });
}

/**
 * Transfer cost calculator (Argentina) based on the fee model used on carchecking.com.ar.
 * DISCLAIMER: This is an approximation.
 */
export default function TransferCostCalculator() {
  const [priceRaw, setPriceRaw] = useState<string>('');

  const price = useMemo(() => {
    // allow inputs like 1.234.567 or 1,234,567
    const cleaned = priceRaw.replace(/[^0-9]/g, '');
    const v = cleaned ? Number(cleaned) : 0;
    return Number.isFinite(v) ? v : 0;
  }, [priceRaw]);

  const breakdown = useMemo((): BreakdownItem[] => {
    // Values extracted from the original calculator's JS logic
    const arancelTransferencia = price * 0.02; // 2%
    const arancelAnexo1 = 250;
    const arancelCedOtroTramite = 260;
    const arancelTitTrans = 165;
    const arancelDeuda = 105;
    const arancelFormulario = 168;
    const arancelProvSellos = price * 0.03; // 3%

    return [
      { key: 'arancelTransferencia', label: 'Arancel transferencia (2%)', amount: arancelTransferencia },
      { key: 'arancelAnexo1', label: 'Arancel anexo 1', amount: arancelAnexo1 },
      { key: 'arancelCedOtroTramite', label: 'Cédula / otro trámite', amount: arancelCedOtroTramite },
      { key: 'arancelTitTrans', label: 'Título / transferencia', amount: arancelTitTrans },
      { key: 'arancelDeuda', label: 'Informe de deuda', amount: arancelDeuda },
      { key: 'arancelFormulario', label: 'Formulario', amount: arancelFormulario },
      { key: 'arancelProvSellos', label: 'Sellos provinciales (3%)', amount: arancelProvSellos },
    ];
  }, [price]);

  const total = useMemo(() => breakdown.reduce((acc, it) => acc + it.amount, 0), [breakdown]);

  return (
    <section className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-6 lg:p-8">
      <h2 className="text-xl lg:text-2xl font-bold text-[#F4F1EC] mb-2">
        Calculadora de costos de transferencia (estimación)
      </h2>
      <p className="text-sm text-[#B8B2AA] mb-6">
        Ingresá el precio del vehículo y obtené un estimado de costos. Los valores pueden variar según
        jurisdicción y el caso particular.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#B8B2AA] mb-2">Precio del vehículo (ARS)</label>
          <input
            value={priceRaw}
            onChange={(e) => setPriceRaw(e.target.value)}
            inputMode="numeric"
            placeholder="Ej: 8500000"
            className="w-full bg-[#0B0B0D] border border-[#2a2a2c] rounded px-4 py-3 text-[#F4F1EC] focus:outline-none focus:border-[#C8A161]/70"
          />

          <div className="mt-4 text-sm text-[#B8B2AA]">
            Valor interpretado: <span className="text-[#F4F1EC] font-semibold">{formatArs(price)}</span>
          </div>

          <div className="mt-5 text-sm text-[#B8B2AA]">
            Tabla DNRPA (valuación de referencia):{' '}
            <a
              href="http://www.dnrpa.gov.ar/valuacion/informacion/05-04-2018.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-[#C8A161] hover:underline"
            >
              ver PDF
            </a>
          </div>
        </div>

        <div>
          <div className="bg-[#0B0B0D] border border-[#2a2a2c] rounded-lg p-5">
            <h3 className="text-base font-semibold text-[#F4F1EC] mb-4">Detalle</h3>
            <div className="space-y-3">
              {breakdown.map((it) => (
                <div key={it.key} className="flex items-center justify-between gap-3">
                  <div className="text-sm text-[#B8B2AA]">{it.label}</div>
                  <div className="text-sm text-[#F4F1EC] font-semibold">{formatArs(it.amount)}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#2a2a2c] mt-4 pt-4 flex items-center justify-between">
              <div className="text-sm text-[#B8B2AA]">Total estimado</div>
              <div className="text-lg text-[#C8A161] font-bold">{formatArs(total)}</div>
            </div>

            <p className="text-xs text-[#5a5a5c] mt-3">
              Nota: estimación basada en una calculadora estándar. Puede haber costos adicionales (gestoría,
              verificación, aranceles específicos, etc.).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
