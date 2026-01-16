import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BillDetail() {
  const navigate = useNavigate();
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 w-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center justify-between px-4 h-[60px]">
          <button onClick={() => navigate(-1)} className="w-6 h-6">
            <img src="/images/arrow-left.svg" alt="" className="w-full h-full" />
          </button>
          <h1 className="text-base font-semibold text-slate-900">Detalle de factura</h1>
          <button className="w-6 h-6">
            <img src="/images/edit.svg" alt="" className="w-full h-full" />
          </button>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4 pb-8 flex flex-col">
          {/* Total Amount Card */}
          <div className="bg-white rounded-t-xl">
            <div className="px-4 py-8 flex items-center justify-center">
              <p className="text-[40px] font-semibold text-slate-900 leading-[48px]">₡18.000</p>
            </div>

            {/* Divider line */}
            <div className="flex items-center justify-center px-0 py-1">
              <div className="h-px bg-[rgba(148,163,184,0.2)] w-full"></div>
            </div>

            {/* No. and Branch */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <p className="text-lg font-semibold text-slate-900 leading-[30px]">No.</p>
                  <p className="text-sm font-normal text-slate-700 leading-5">0060000101207</p>
                </div>
                <div className="flex flex-col items-end text-xs font-normal text-slate-500 leading-4">
                  <p>Sucursal: 006</p>
                  <p>Punto de venta: 00001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider Bill */}
          <div>
            <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />
          </div>

          {/* Información de la factura */}
          <div className="bg-white pb-4">
            {/* Header */}
            <div className="border-b border-[rgba(148,163,184,0.2)] pt-2 pb-3 px-4">
              <p className="text-base font-medium text-slate-700">Información de la factura</p>
            </div>

            {/* Cliente */}
            <div className="px-4 pt-2">
              <p className="text-sm font-semibold text-slate-500 mb-0">Cliente</p>
            </div>
            <div className="px-3 py-0">
              <div className="flex items-center gap-3 px-0 py-3">
                <div className="bg-indigo-600 rounded-full size-10 flex items-center justify-center text-white font-semibold text-base">
                  C
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-slate-900 leading-7">Sofia Carson</p>
                  <p className="text-xs font-normal text-slate-500 leading-4">ID: 3-105-118067</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center px-0 py-1">
              <div className="h-px bg-[rgba(148,163,184,0.2)] w-full"></div>
            </div>

            {/* Fechas */}
            <div className="flex gap-3 px-4 py-0 mt-3">
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-500 leading-5">Fecha de creación</p>
                <p className="text-lg font-normal text-slate-700 leading-[30px]">25/06/2025</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-500 leading-5">Fecha de vencimiento</p>
                <p className="text-lg font-normal text-slate-700 leading-[30px]">12/07/2025</p>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center px-0 py-1 mt-3">
              <div className="h-px bg-[rgba(148,163,184,0.2)] w-full"></div>
            </div>

            {/* Condición */}
            <div className="flex items-center justify-between px-4 py-0 mt-3">
              <p className="text-sm font-semibold text-slate-500 leading-5">Condición</p>
              <p className="text-lg font-normal text-slate-700 leading-[30px]">Contado</p>
            </div>

            {/* Medio de pago */}
            <div className="flex items-center justify-between px-4 py-0 mt-3">
              <p className="text-sm font-semibold text-slate-500 leading-5">Médio de pago</p>
              <p className="text-lg font-normal text-slate-700 leading-[30px]">Tarjeta</p>
            </div>
          </div>

          {/* Divider Bill */}
          <div>
            <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />
          </div>

          {/* Producto o servicio */}
          <div className="bg-white">
            {/* Header */}
            <div className="border-b border-[rgba(148,163,184,0.2)] pt-2 pb-3 px-4">
              <div className="flex items-center gap-0.5">
                <p className="text-base font-medium text-slate-700">Producto o servicio</p>
                <span className="text-[#30aba9] font-normal text-base">*</span>
              </div>
            </div>

            {/* Products */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-base font-semibold text-slate-700 leading-7">Planta de mesa</p>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-normal text-slate-400 leading-4">ITS002</p>
                    <div className="size-0.5 rounded-full bg-slate-400"></div>
                    <p className="text-xs font-normal text-slate-400 leading-4">IVA 19%</p>
                    <div className="size-0.5 rounded-full bg-slate-400"></div>
                    <p className="text-xs font-normal text-slate-400 leading-4">Cant. 1</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-lg font-semibold text-slate-900 leading-[30px]">$18.000</p>
                  <div className="flex items-end gap-1 text-xs leading-4">
                    <p className="text-slate-400">Desc.</p>
                    <p className="text-teal-600">-15%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-base font-semibold text-slate-700 leading-7">Planta de mesa</p>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-normal text-slate-400 leading-4">ITS002</p>
                    <div className="size-0.5 rounded-full bg-slate-400"></div>
                    <p className="text-xs font-normal text-slate-400 leading-4">IVA 19%</p>
                    <div className="size-0.5 rounded-full bg-slate-400"></div>
                    <p className="text-xs font-normal text-slate-400 leading-4">Cant. 1</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-lg font-semibold text-slate-900 leading-[30px]">$18.000</p>
                  <div className="flex items-end gap-1 text-xs leading-4">
                    <p className="text-slate-400">Desc.</p>
                    <p className="text-teal-600">-15%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider Bill */}
          <div>
            <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />
          </div>

          {/* Otros cargos */}
          <div className="bg-white">
            {/* Header */}
            <div className="border-b border-[rgba(148,163,184,0.2)] pt-2 pb-3 px-4">
              <p className="text-base font-medium text-slate-700">Otros cargos</p>
            </div>

            {/* Cargo Item */}
            <div className="px-3 py-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col">
                    <p className="text-base font-semibold text-slate-700 leading-5">Lorem ipsum dolor et sit amet</p>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-normal text-slate-500 leading-4">Cobro de un tercero</p>
                      <p className="text-xs font-normal text-slate-500 leading-4">ID: 3-105-118067</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 leading-[30px]">₡17.000</p>
                </div>
                <button className="flex items-center justify-center p-2.5 rounded-[10px] size-10">
                  <img src="/images/Menu-button.svg" alt="" className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Divider Bill */}
          <div>
            <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />
          </div>

          {/* Retenciones */}
          <div className="bg-white px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500 leading-5">Retenciones</p>
              <div className="flex flex-col items-end">
                <p className="text-lg font-semibold text-slate-900 leading-[30px]">$18.000</p>
                <p className="text-xs font-normal text-slate-400 leading-4">Retención 1</p>
              </div>
            </div>
          </div>

          {/* Divider Bill */}
          <div>
            <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />
          </div>

          {/* Más opciones */}
          <div className="bg-white pb-4">
            {/* Header */}
            <button
              onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
              className="w-full border-b border-[rgba(148,163,184,0.2)] pt-2 pb-3 px-4 flex items-center justify-between"
            >
              <p className="text-base font-medium text-slate-700">Más opciones</p>
              <img
                src="/images/Dropdown-Icon.svg"
                alt=""
                className={`w-5 h-5 transition-transform ${isMoreOptionsOpen ? '' : 'rotate-180'}`}
              />
            </button>

            {isMoreOptionsOpen && (
              <div className="flex flex-col gap-1 pt-1">
                {/* Notas */}
                <div className="px-4 py-0">
                  <p className="text-sm font-semibold text-slate-500 leading-5">Notas</p>
                  <p className="text-lg font-normal text-slate-700 leading-[30px]">Para mi cliente favorito.</p>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center px-0 py-1">
                  <div className="h-px bg-[rgba(148,163,184,0.2)] w-full"></div>
                </div>

                {/* Observaciones */}
                <div className="px-4 py-0">
                  <p className="text-sm font-semibold text-slate-500 leading-5">Observaciones</p>
                  <p className="text-lg font-normal text-slate-700 leading-[30px]">Entregar lo más pronto posible.</p>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center px-0 py-1">
                  <div className="h-px bg-[rgba(148,163,184,0.2)] w-full"></div>
                </div>

                {/* Términos y condiciones */}
                <div className="px-4 py-0">
                  <p className="text-sm font-semibold text-slate-500 leading-5">Términos y condiciones</p>
                  <p className="text-lg font-normal text-slate-700 leading-[30px]">-</p>
                </div>
              </div>
            )}
          </div>

          {/* Divider Bill */}
          <div>
            <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />
          </div>

          {/* Summary */}
          <div className="bg-white">
            <div className="px-4 py-4 flex flex-col gap-2">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-normal text-slate-500 leading-5">Subtotal</p>
                <p className="text-sm font-semibold text-slate-500 leading-5">₡20.000</p>
              </div>

              {/* Descuento */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-normal text-green-600 leading-5">Descuento</p>
                <p className="text-sm font-semibold text-green-600 leading-5">₡2.000</p>
              </div>

              {/* Impuestos */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-normal text-slate-500 leading-5">Impuestos</p>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="#30aba9" strokeWidth="1" />
                    <path d="M8 7V11M8 5V5.5" stroke="#30aba9" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-500 leading-5">₡3.230</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-200 my-1"></div>

              {/* Total */}
              <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold text-slate-900 leading-8">Total</p>
                <p className="text-2xl font-semibold text-slate-900 leading-8">₡18.000</p>
              </div>
            </div>
          </div>

          {/* Bottom decoration */}
          <div className="h-10 relative">
            <img src="/images/Ending-bill.svg" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="h-[34px] flex items-center justify-center shrink-0">
        <div className="w-36 h-1.5 bg-slate-700 rounded-full"></div>
      </div>
    </div>
  );
}

export default BillDetail;
