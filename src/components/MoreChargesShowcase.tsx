import MoreChargesItem from './More-charges-item';

function MoreChargesShowcase() {
  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl p-6">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            More-charges-item Showcase
          </h1>
          <p className="text-slate-600">
            Ejemplos del componente More-charges-item en diferentes contextos
          </p>
        </div>

        {/* Sección 1: Componente Individual */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="border-b border-[rgba(148,163,184,0.4)] pt-[8px] pb-[12px] px-4">
            <h2 className="text-xl font-semibold text-slate-900">
              1. Componente Individual
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Un único item de cargo
            </p>
          </div>

          <div className="p-4">
            <MoreChargesItem
              title="Lorem ipsum dolor et sit amet"
              chargeType="Cobro de un tercero"
              id="3-105-118067"
              amount={17000}
              onEdit={() => console.log('Editar cargo')}
              onDelete={() => console.log('Eliminar cargo')}
            />
          </div>
        </div>

        {/* Sección 2: Múltiples Items */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="border-b border-[rgba(148,163,184,0.4)] pt-[8px] pb-[12px] px-4">
            <h2 className="text-xl font-semibold text-slate-900">
              2. Múltiples Items (Como en FirstProposal)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Varios cargos agregados con líneas divisoras
            </p>
          </div>

          <div className="flex flex-col gap-0">
            {/* Item 1 */}
            <MoreChargesItem
              title="Lorem ipsum dolor et sit amet"
              chargeType="Cobro de un tercero"
              id="3-105-118067"
              amount={17000}
              onEdit={() => console.log('Editar cargo 1')}
              onDelete={() => console.log('Eliminar cargo 1')}
            />
            <div className="h-px bg-slate-200"></div>

            {/* Item 2 */}
            <MoreChargesItem
              title="Servicio técnico"
              chargeType="Otros cargos"
              amount={5000}
              onEdit={() => console.log('Editar cargo 2')}
              onDelete={() => console.log('Eliminar cargo 2')}
            />
            <div className="h-px bg-slate-200"></div>

            {/* Item 3 */}
            <MoreChargesItem
              title="Asesoramiento legal"
              chargeType="Cobro de un tercero"
              id="2-456-789012"
              amount={25500}
              onEdit={() => console.log('Editar cargo 3')}
              onDelete={() => console.log('Eliminar cargo 3')}
            />
          </div>
        </div>

        {/* Sección 3: Variantes */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="border-b border-[rgba(148,163,184,0.4)] pt-[8px] pb-[12px] px-4">
            <h2 className="text-xl font-semibold text-slate-900">
              3. Variantes
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Diferentes tipos de cargos y montos
            </p>
          </div>

          <div className="flex flex-col gap-0">
            {/* Variante: Solo tipo "Otros cargos" sin ID */}
            <div>
              <div className="p-4 bg-slate-50">
                <p className="text-xs font-semibold text-slate-500 mb-3 uppercase">
                  Otros cargos (sin tercero)
                </p>
              </div>
              <MoreChargesItem
                title="Impuesto adicional"
                chargeType="Otros cargos"
                amount={3500}
                onEdit={() => console.log('Editar')}
                onDelete={() => console.log('Eliminar')}
              />
            </div>
            <div className="h-px bg-slate-200"></div>

            {/* Variante: Porcentaje */}
            <div>
              <div className="p-4 bg-slate-50">
                <p className="text-xs font-semibold text-slate-500 mb-3 uppercase">
                  Cobro con porcentaje
                </p>
              </div>
              <MoreChargesItem
                title="Juan Pérez"
                chargeType="Cobro de un tercero"
                id="5-123-456789"
                amount="5%"
                onEdit={() => console.log('Editar')}
                onDelete={() => console.log('Eliminar')}
              />
            </div>
            <div className="h-px bg-slate-200"></div>

            {/* Variante: Monto alto */}
            <div>
              <div className="p-4 bg-slate-50">
                <p className="text-xs font-semibold text-slate-500 mb-3 uppercase">
                  Monto elevado
                </p>
              </div>
              <MoreChargesItem
                title="Consultoría empresarial"
                chargeType="Cobro de un tercero"
                id="7-789-012345"
                amount={150000}
                onEdit={() => console.log('Editar')}
                onDelete={() => console.log('Eliminar')}
              />
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-white rounded-xl p-6 border-l-4 border-[#30aba9]">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Props del Componente
          </h3>
          <div className="space-y-2 text-sm text-slate-600 font-mono">
            <p>
              <span className="text-slate-900 font-semibold">title</span>
              <span className="text-slate-500">: string</span> - Nombre del cargo
            </p>
            <p>
              <span className="text-slate-900 font-semibold">chargeType</span>
              <span className="text-slate-500">: string</span> - "Otros cargos" o
              "Cobro de un tercero"
            </p>
            <p>
              <span className="text-slate-900 font-semibold">id</span>
              <span className="text-slate-500">?: string</span> - ID del tercero
              (opcional)
            </p>
            <p>
              <span className="text-slate-900 font-semibold">amount</span>
              <span className="text-slate-500">: string | number</span> - Monto o
              porcentaje
            </p>
            <p>
              <span className="text-slate-900 font-semibold">onEdit</span>
              <span className="text-slate-500">?: () =&gt; void</span> - Callback
              al hacer click en "Editar"
            </p>
            <p>
              <span className="text-slate-900 font-semibold">onDelete</span>
              <span className="text-slate-500">?: () =&gt; void</span> - Callback
              al hacer click en "Eliminar"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreChargesShowcase;
