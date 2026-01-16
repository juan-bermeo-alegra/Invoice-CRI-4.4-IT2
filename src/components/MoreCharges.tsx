import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OptionsBottomSheet from './OptionsBottomSheet';
import ContactItem from './Contact-item';
import ThirdPartySelector from './ThirdPartySelector';
import ProductItem from './Product-item';
import ItemsBottomSheet from './ItemsBottomSheet';

interface Contact {
  name: string;
  id: string;
}

interface Product {
  id: number;
  name: string;
  productId: string;
  tax: string;
  quantity: number;
  price: number;
  discount: number;
  [key: string]: any;
}

interface MoreChargesProps {
  availableProducts?: Product[];
}

interface Charge {
  id: string;
  chargeType: 'Otros cargos' | 'Cobro de un tercero';
  amount?: string;
  percentage?: string;
  selectedContact?: Contact | null;
  percentageProducts?: Product[];
}

const chargeOptions = ['Otros cargos', 'Cobro de un tercero'];
const mockContacts: Contact[] = [
  { id: '1', name: 'Juan Pérez' },
  { id: '2', name: 'María García' },
  { id: '3', name: 'Carlos López' },
];

function MoreCharges({ availableProducts: propsProducts }: MoreChargesProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const stateProducts = (location.state?.products || []) as Product[];
  const existingCharges = (location.state?.charges || []) as Charge[];
  const availableProducts: Product[] = propsProducts || stateProducts || [];
  const [activeTab, setActiveTab] = useState<'amount' | 'percentage'>('amount');

  // Amount Tab
  const amountCharges = existingCharges.filter(c => c.amount !== undefined) || [];
  const [amountChargeType, setAmountChargeType] = useState<string>('');
  const [amountValue, setAmountValue] = useState('');
  const [isAmountThirdPartySelected, setIsAmountThirdPartySelected] = useState(false);
  const [selectedAmountContact, setSelectedAmountContact] = useState<Contact | null>(null);
  const [isAmountChargeNameOpen, setIsAmountChargeNameOpen] = useState(false);

  // Percentage Tab
  const percentageCharges = existingCharges.filter(c => c.percentage !== undefined) || [];
  const [percentageChargeType, setPercentageChargeType] = useState<string>('');
  const [percentageValue, setPercentageValue] = useState('');
  const [isPercentageThirdPartySelected, setIsPercentageThirdPartySelected] = useState(false);
  const [selectedPercentageContact, setSelectedPercentageContact] = useState<Contact | null>(null);
  const [isPercentageChargeNameOpen, setIsPercentageChargeNameOpen] = useState(false);
  const [percentageProducts, setPercentageProducts] = useState<Product[]>([]);
  const [isItemsBottomSheetOpen, setIsItemsBottomSheetOpen] = useState(false);

  const handleSelectChargeType = (option: string) => {
    if (activeTab === 'amount') {
      setAmountChargeType(option);
      if (option !== 'Cobro de un tercero') {
        setIsAmountThirdPartySelected(false);
        setSelectedAmountContact(null);
      }
    } else {
      setPercentageChargeType(option);
      if (option !== 'Cobro de un tercero') {
        setIsPercentageThirdPartySelected(false);
        setSelectedPercentageContact(null);
      }
    }
  };

  const handleSelectThirdParty = () => {
    // Selecciona automáticamente el primer contacto
    if (mockContacts.length > 0) {
      handleSelectContact(mockContacts[0]);
      setIsCurrentThirdPartySelected(true);
    }
  };

  const handleSelectContact = (contact: Contact) => {
    if (activeTab === 'amount') {
      setSelectedAmountContact(contact);
    } else {
      setSelectedPercentageContact(contact);
    }
  };

  const formatCurrency = (value: number) => {
    return `₡${value.toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleSelectProducts = (selectedProducts: Product[]) => {
    setPercentageProducts([...percentageProducts, ...selectedProducts]);
  };

  const handleAddCharge = () => {
    const chargeType = activeTab === 'amount' ? amountChargeType : percentageChargeType;
    const value = activeTab === 'amount' ? amountValue : percentageValue;
    const selectedContact = activeTab === 'amount' ? selectedAmountContact : selectedPercentageContact;

    if (chargeType && value && (chargeType === 'Otros cargos' || selectedContact)) {
      const newCharge: Charge = {
        id: Date.now().toString(),
        chargeType: chargeType as 'Otros cargos' | 'Cobro de un tercero',
        ...(activeTab === 'amount' ? { amount: value } : { percentage: value, percentageProducts }),
        selectedContact: chargeType === 'Cobro de un tercero' ? selectedContact || undefined : undefined,
      };

      // Combine all charges (from both tabs) and send to FirstProposal
      const allCharges = [...amountCharges, ...percentageCharges, newCharge];
      navigate('/1st-proposal', { state: { charges: allCharges } });
    }
  };

  const currentChargeType = activeTab === 'amount' ? amountChargeType : percentageChargeType;
  const currentValue = activeTab === 'amount' ? amountValue : percentageValue;
  const isCurrentThirdPartySelected = activeTab === 'amount' ? isAmountThirdPartySelected : isPercentageThirdPartySelected;
  const currentSelectedContact = activeTab === 'amount' ? selectedAmountContact : selectedPercentageContact;
  const isCurrentChargeNameOpen = activeTab === 'amount' ? isAmountChargeNameOpen : isPercentageChargeNameOpen;

  const setCurrentChargeNameOpen = (value: boolean) => {
    if (activeTab === 'amount') {
      setIsAmountChargeNameOpen(value);
    } else {
      setIsPercentageChargeNameOpen(value);
    }
  };

  const setIsCurrentThirdPartySelected = (value: boolean) => {
    if (activeTab === 'amount') {
      setIsAmountThirdPartySelected(value);
    } else {
      setIsPercentageThirdPartySelected(value);
    }
  };

  const isFormValid = currentChargeType && currentValue && (currentChargeType === 'Otros cargos' || currentSelectedContact);

  return (
    <div className="min-h-screen bg-slate-100 w-full flex flex-col">
      {/* Header */}
      <div className="shrink-0">
        <div className="flex items-center justify-center px-4 h-[60px] relative">
          <button
            onClick={() => navigate(-1)}
            className="w-6 h-6 absolute left-4"
          >
            <img src="/images/arrow-left.svg" alt="" className="w-full h-full" />
          </button>
          <h1 className="text-base font-semibold text-slate-900">Otros cargos</h1>
          <div className="w-6 absolute right-4"></div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="pt-4 pb-20">
          <div className="px-4">
            {/* Tabs */}
            <div className="bg-white rounded-t-xl overflow-hidden">
              <div className="border-b border-[rgba(148,163,184,0.4)]">
                <div className="flex w-full">
                  <button
                    onClick={() => setActiveTab('amount')}
                    className={`flex-1 h-12 text-sm font-medium border-b-2 transition-colors flex items-center justify-center ${activeTab === 'amount'
                        ? 'text-slate-700 border-[#30aba9]'
                        : 'text-slate-500 border-transparent'
                      }`}
                  >
                    Monto
                  </button>
                  <button
                    onClick={() => setActiveTab('percentage')}
                    className={`flex-1 h-12 text-sm font-medium border-b-2 transition-colors flex items-center justify-center ${activeTab === 'percentage'
                        ? 'text-slate-700 border-[#30aba9]'
                        : 'text-slate-500 border-transparent'
                      }`}
                  >
                    Porcentaje
                  </button>
                </div>
              </div>

              {/* Nombre del Cargo Section */}
              <div className="bg-white overflow-visible">
                <div className="px-4 py-4 flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">
                    Nombre del cargo
                    <span className="text-[#30aba9] ml-0.5">*</span>
                  </label>
                  <button
                    onClick={() => setCurrentChargeNameOpen(true)}
                    className="w-full h-12 px-3.5 border border-slate-300/40 rounded-xl text-base text-slate-900 outline-none focus:border-[#30aba9] text-left hover:bg-slate-50 transition-colors flex items-center justify-between overflow-hidden bg-white"
                  >
                    <span className={currentChargeType ? 'text-slate-900' : 'text-slate-400'}>
                      {currentChargeType || 'Selecciona tipo de cargo'}
                    </span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 pointer-events-none">
                      <path d="M7.5 5L12.5 10L7.5 15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Tercero Section - Only for "Cobro de un tercero" */}
            {currentChargeType === 'Cobro de un tercero' && (
              <div className="bg-white overflow-hidden">
                {!isCurrentThirdPartySelected ? (
                  <ThirdPartySelector onSelect={handleSelectThirdParty} />
                ) : (
                  <div className="bg-white overflow-visible">
                    {/* Header */}
                    <div className="border-b border-[rgba(148,163,184,0.4)] pt-[8px] pb-[12px] px-4">
                      <div className="flex items-center gap-0.5">
                        <p className="text-base font-medium text-slate-700">Tercero</p>
                        <span className="text-[#30aba9] font-normal text-base">*</span>
                      </div>
                    </div>

                    {/* Contact Item */}
                    <div className="px-4 overflow-visible">
                      {currentSelectedContact && (
                        <ContactItem
                          name={currentSelectedContact.name}
                          id={currentSelectedContact.id}
                          onEdit={() => setIsCurrentThirdPartySelected(false)}
                          onDelete={() => {
                            setIsCurrentThirdPartySelected(false);
                            if (activeTab === 'amount') {
                              setSelectedAmountContact(null);
                            } else {
                              setSelectedPercentageContact(null);
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
                <div className="border-b border-[rgba(148,163,184,0.4)]"></div>
              </div>
            )}

            {/* Products Section - Only for Percentage Tab */}
            {activeTab === 'percentage' && (
              <div className="bg-white overflow-visible">
                {/* Header */}
                <div className="border-b border-[rgba(148,163,184,0.4)] pt-[8px] pb-[12px] px-4">
                  <div className="flex items-center gap-0.5">
                    <p className="text-base font-medium text-slate-700">Item</p>
                    <span className="text-[#30aba9] ml-0.5">*</span>
                  </div>
                </div>

                {/* Product Items */}
                {percentageProducts.length > 0 && (
                  <div className="px-3 py-3">
                    {percentageProducts.map((product) => (
                      <ProductItem
                        key={product.id}
                        name={product.name}
                        productId={product.productId}
                        tax={product.tax}
                        quantity={`Cant. ${product.quantity}`}
                        price={`₡${product.price.toLocaleString()}`}
                        discount={`-15%`}
                        onDelete={() => setPercentageProducts(percentageProducts.filter(p => p.id !== product.id))}
                      />
                    ))}
                  </div>
                )}

                {/* Add Product Button */}
                <button
                  onClick={() => setIsItemsBottomSheetOpen(true)}
                  className={`w-full px-4 py-4 flex items-center justify-center gap-1 text-[#30aba9] font-medium text-sm hover:bg-slate-50 transition-colors ${percentageProducts.length > 0 ? 'border-t' : ''} border-[rgba(148,163,184,0.4)]`}
                >
                  <span className="text-base font-semibold">+</span>
                  <span>Selecciona un item</span>
                </button>
                <div className="border-b border-[rgba(148,163,184,0.4)]"></div>
              </div>
            )}

            {/* Monto/Porcentaje Section */}
            <div className={`bg-white overflow-hidden ${currentChargeType !== 'Cobro de un tercero' && activeTab === 'amount' ? 'rounded-b-xl' : ''}`}>
              <div className="px-4 py-4 flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">
                  {activeTab === 'amount' ? 'Monto' : 'Porcentaje'}
                  <span className="text-[#30aba9] ml-0.5">*</span>
                </label>
                <div className="relative">
                  <input
                    type={activeTab === 'percentage' ? 'number' : 'text'}
                    value={currentValue}
                    onChange={(e) => {
                      if (activeTab === 'amount') {
                        setAmountValue(e.target.value);
                      } else {
                        setPercentageValue(e.target.value);
                      }
                    }}
                    placeholder={activeTab === 'amount' ? 'Ingresa el monto' : 'Ingresa el porcentaje'}
                    className="w-full h-12 px-3.5 border border-slate-300/40 rounded-xl text-base text-slate-900 outline-none focus:border-[#30aba9] placeholder:text-slate-500 transition-colors"
                  />
                  {activeTab === 'amount' && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-base font-normal">
                      CRC
                    </span>
                  )}
                  {activeTab === 'percentage' && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-base font-normal">
                      %
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Divider between Porcentaje and Monto - Only for Percentage Tab */}
          <div className="px-4">
            {activeTab === 'percentage' && (
              <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />
            )}
          </div>

          {/* Monto Summary - Only for Percentage Tab */}
          {activeTab === 'percentage' && (
            <div className="px-4">
              <div className="bg-white py-3 flex items-center justify-between px-4">
                <p className="text-2xl font-semibold text-slate-900">Monto</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {formatCurrency(percentageProducts.length > 0 && currentValue
                    ? Math.round(percentageProducts.reduce((sum, p) => sum + (p.price * p.quantity - p.discount), 0) * (parseInt(currentValue) / 100))
                    : 0)}
                </p>
              </div>
              <img src="/images/Ending-bill.svg" alt="" className="w-full" />
            </div>
          )}

        </div>
      </div>

      {/* Footer - Add Button */}
      <div className="shrink-0 px-4 py-4">
        <button
          onClick={handleAddCharge}
          disabled={!isFormValid}
          className={`w-full h-12 rounded-xl font-semibold text-base text-white transition-colors ${isFormValid
              ? 'bg-[#30aba9] hover:bg-[#2a9a99]'
              : 'bg-[#30aba9] opacity-30 cursor-not-allowed'
            }`}
        >
          Agregar cargo
        </button>
      </div>

      {/* Options Bottom Sheet for Charge Type */}
      <OptionsBottomSheet
        isOpen={isCurrentChargeNameOpen}
        title="Nombre del cargo"
        options={chargeOptions}
        selectedOption={currentChargeType}
        onClose={() => setCurrentChargeNameOpen(false)}
        onSelect={handleSelectChargeType}
      />

      {/* Items Bottom Sheet */}
      <ItemsBottomSheet
        isOpen={isItemsBottomSheetOpen}
        onClose={() => setIsItemsBottomSheetOpen(false)}
        availableProducts={availableProducts}
        onSelectProducts={handleSelectProducts}
      />
    </div>
  );
}

export default MoreCharges;
