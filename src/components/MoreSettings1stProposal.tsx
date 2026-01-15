import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddContainer from './AddContainer';
import SectionHeader from './SectionHeader';
import OptionsBottomSheet from './OptionsBottomSheet';
import ContactItem from './Contact-item';
import Toggle from './Toggle';

const costCenterOptions = ['Principal', 'Centro de costo 1', 'Centro de costo 2'];
const currencyOptions = ['CRC - colon costarricense', 'USD - Dólar estadounidense', 'AED - Dirham de los emiratos árabes unidos', 'EUR - Euro'];
const priceListOptions = ['General', 'Lista 1'];

function MoreSettings1stProposal() {
  const navigate = useNavigate();
  const clientRef = useRef<HTMLDivElement>(null);
  const [costCenter, setCostCenter] = useState('Principal');
  const [isCostCenterOpen, setIsCostCenterOpen] = useState(false);
  const [currency, setCurrency] = useState('CRC - colon costarricense');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [priceList, setPriceList] = useState('General');
  const [isPriceListOpen, setIsPriceListOpen] = useState(false);
  const [isSalesPersonSelected, setIsSalesPersonSelected] = useState(true);
  const [isClientSelected] = useState(false);
  const [isWarehouseSelected, setIsWarehouseSelected] = useState(true);

  // Toggles para Retenciones y Otros cargos
  const [showRetenciones, setShowRetenciones] = useState(() => {
    const saved = localStorage.getItem('showRetenciones');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [showOtrosCargos, setShowOtrosCargos] = useState(() => {
    const saved = localStorage.getItem('showOtrosCargos');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    if (isClientSelected && clientRef.current) {
      clientRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isClientSelected]);

  // Guardar en localStorage cuando cambian los toggles
  useEffect(() => {
    localStorage.setItem('showRetenciones', JSON.stringify(showRetenciones));
  }, [showRetenciones]);

  useEffect(() => {
    localStorage.setItem('showOtrosCargos', JSON.stringify(showOtrosCargos));
  }, [showOtrosCargos]);

  return (
    <div className="min-h-screen bg-slate-100 w-full flex flex-col">
      

      {/* Header */}
      <div className="bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center justify-center px-4 h-[60px] relative">
          <button onClick={() => navigate(-1)} className="w-6 h-6 absolute left-4">
            <img src="/images/arrow-left.svg" alt="" className="w-full h-full" />
          </button>
          <h1 className="text-base font-semibold text-slate-900">Más ajustes</h1>
          <div className="w-6 absolute right-4"></div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4">
          {/* Bodega */}
          <div className="bg-white rounded-t-xl overflow-hidden">
            {!isWarehouseSelected ? (
              <AddContainer
                label="Bodega"
                buttonText="Selecciona una bodega"
                onAdd={() => setIsWarehouseSelected(true)}
                required={true}
              />
            ) : (
              <>
                {/* Header */}
                <div className="border-b border-[rgba(148,163,184,0.4)] pt-[8px] pb-[12px] px-4">
                  <div className="flex items-center gap-0.5">
                    <p className="text-base font-medium text-slate-700">Bodega</p>
                    <span className="text-[#30aba9] font-normal text-base">*</span>
                  </div>
                </div>

                {/* Warehouse Item */}
                <div className="px-4 pb-4">
                  <ContactItem
                    name="Bodega 1"
                    id="WRM9+5QR, Av. 1, San José"
                    variant="warehouse"
                    onEdit={() => console.log('Edit warehouse')}
                    onDelete={() => setIsWarehouseSelected(false)}
                  />
                </div>
              </>
            )}
          </div>

          {/* Divider */}
          <div>
            <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />
          </div>

          {/* Cliente (Vendedor) */}
          <div className="bg-white">
            {!isSalesPersonSelected ? (
              <AddContainer
                label="Vendedor"
                buttonText="Selecciona a un vendedor"
                onAdd={() => setIsSalesPersonSelected(true)}
                required={true}
              />
            ) : (
              <>
                {/* Header */}
                <div className="border-b border-[rgba(148,163,184,0.4)] pt-[8px] pb-[12px] px-4">
                  <div className="flex items-center gap-0.5">
                    <p className="text-base font-medium text-slate-700">Vendedor</p>
                    <span className="text-[#30aba9] font-normal text-base">*</span>
                  </div>
                </div>

                {/* Contact Item */}
                <div className="px-4">
                  <ContactItem
                    name="Bob Brown"
                    id="ID: 3-105-118067"
                    onEdit={() => console.log('Edit contact')}
                    onDelete={() => setIsSalesPersonSelected(false)}
                  />
                </div>
              </>
            )}
          </div>

          {/* Divider */}
          <div>
            <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />
          </div>

          {/* Parámetros adicionales */}
          <div className="bg-white rounded-b-xl">
            <SectionHeader title="Parámetros adicionales" />
            <div className="px-4 pt-2 flex flex-col gap-2 pb-4">
              {/* Centro de costo */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Centro de costo</label>
                <button
                  onClick={() => setIsCostCenterOpen(true)}
                  className="relative w-full h-12 px-3.5 pr-10 border border-slate-300/40 rounded-xl text-base text-slate-900 outline-none focus:border-[#30aba9] bg-white text-left hover:bg-slate-50 transition-colors"
                >
                  {costCenter}
                  <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 5L12.5 10L7.5 15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Moneda */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Moneda</label>
                <button
                  onClick={() => setIsCurrencyOpen(true)}
                  className="relative w-full h-12 px-3.5 pr-10 border border-slate-300/40 rounded-xl text-base text-slate-900 outline-none focus:border-[#30aba9] bg-white text-left hover:bg-slate-50 transition-colors"
                >
                  {currency}
                  <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 5L12.5 10L7.5 15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Lista de precios */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Lista de precios</label>
                <button
                  onClick={() => setIsPriceListOpen(true)}
                  className="relative w-full h-12 px-3.5 pr-10 border border-slate-300/40 rounded-xl text-base text-slate-900 outline-none focus:border-[#30aba9] bg-white text-left hover:bg-slate-50 transition-colors"
                >
                  {priceList}
                  <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 5L12.5 10L7.5 15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Orden de compra */}
              <div className="pb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Orden de compra</label>
                <input
                  type="text"
                  className="w-full h-12 px-3.5 border border-slate-300/40 rounded-xl text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30aba9]"
                  placeholder="Escribe tu orden de compra"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div>
            <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />
          </div>

          {/* Detalles en ventas */}
          <div className="bg-white rounded-b-xl">
            <SectionHeader title="Detalles en ventas" />
            <div className="px-4 pt-4 flex flex-col gap-4 pb-4">
              <Toggle
                label="Retenciones"
                checked={showRetenciones}
                onChange={setShowRetenciones}
              />
              <Toggle
                label="Otros cargos"
                checked={showOtrosCargos}
                onChange={setShowOtrosCargos}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Home Indicator */}
      <div className="h-[34px] flex items-center justify-center shrink-0">
        
      </div>

      {/* Cost Center Bottom Sheet */}
      <OptionsBottomSheet
        isOpen={isCostCenterOpen}
        title="Centro de costo"
        options={costCenterOptions}
        selectedOption={costCenter}
        onClose={() => setIsCostCenterOpen(false)}
        onSelect={setCostCenter}
      />

      {/* Currency Bottom Sheet */}
      <OptionsBottomSheet
        isOpen={isCurrencyOpen}
        title="Moneda"
        options={currencyOptions}
        selectedOption={currency}
        onClose={() => setIsCurrencyOpen(false)}
        onSelect={setCurrency}
      />

      {/* Price List Bottom Sheet */}
      <OptionsBottomSheet
        isOpen={isPriceListOpen}
        title="Lista de precios"
        options={priceListOptions}
        selectedOption={priceList}
        onClose={() => setIsPriceListOpen(false)}
        onSelect={setPriceList}
      />
    </div>
  );
}

export default MoreSettings1stProposal;
