import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import ContactItem from './Contact-item';
import ProductItem from './Product-item';
import InvoiceTypeBottomSheet from './InvoiceTypeBottomSheet';
import OptionsBottomSheet from './OptionsBottomSheet';
import NumerationBottomSheet from './NumerationBottomSheet';
import DatePicker from './DatePicker';
import Steps from './Steps';
import BillReview from './Bill-review';

const economicActivityOptions = [
  '011301 - Cultivo de plantas ornamentales',
  '011302 - Cultivo de árboles frutales',
];

const conditionOptions = [
  'Contado',
  'Crédito',
  'Consignación',
  'Apartado',
  'Arrendamiento con opción de compra',
  'Arrendamiento en función financiera',
  'Servicios prestados al Estado a crédito',
  'Venta a crédito en IVA hasta 90 días (Artículo 27, LIVA)',
  'Arrendamiento operativo',
  'Arrendamiento financiero',
  'Otros',
];

const paymentMethodOptions = [
  'SINPE Movil',
  'Cheque',
  'Transferencia - Deposito bancario',
  'Recaudo por terceros',
  'Plataforma Digital',
  'Otros',
];

const STORAGE_KEY = 'secondProposalFormData';

const getInitialState = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Error loading saved data:', error);
  }

  return {
    documentType: '',
    invoiceType: 'Factura de venta',
    economicActivity: '011301 - Cultivo de plantas ornamentales',
    condition: '',
    paymentMethod: '',
    numeration: 'Electrónica',
    creationDate: '',
    dueDateDate: '',
    products: [],
    isClientSelected: false,
    discountPercentage: 0,
  };
};

// Header compartido para todas las pantallas
function SharedHeader(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center justify-center px-4 h-[60px] relative">
          <button onClick={() => navigate('/')} className="w-6 h-6 absolute left-4">
            <img src="/images/arrow-left.svg" alt="" className="w-full h-full" />
          </button>
          <h1 className="text-base font-semibold text-slate-900">Facturación</h1>
          <div className="flex gap-3 items-center absolute right-4">
            <button className="w-6 h-6">
              <img src="/images/microphone.svg" alt="" className="w-full h-full" />
            </button>
            <button onClick={() => navigate('/2nd-proposal/more-settings')} className="w-6 h-6">
              <img src="/images/more.svg" alt="" className="w-full h-full" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

interface CompanyHeaderSectionProps {
  numeration: string;
  currentStep: 1 | 2 | 3;
}

function CompanyHeaderSection({ numeration, currentStep }: CompanyHeaderSectionProps) {
  return (
    <>
      {/* Company Invoice Section */}
      <div className="bg-white rounded-t-xl pt-4">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img src="/images/logo.svg" alt="Elite Boutique" className="h-[74px]" />
        </div>

        {/* Company Info */}
        <div className="text-center mb-4 px-4">
          <h2 className="text-xs font-semibold text-slate-700">DECKO SA DE CV</h2>
          <p className="text-[10px] text-slate-700">Elite Boutique SAS - RFC 8678901</p>
        </div>

        {/* Steps */}
        <div className="mb-4">
          <Steps currentStep={currentStep} />
        </div>

        {/* Numeración */}
        {currentStep === 3 ? (
          <BillReview title="Numeración" description={numeration} />
        ) : (
          <div className="px-4 mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Numeración<span className="text-[#30aba9] ml-0.5">*</span>
            </label>
            <button
              disabled
              className="w-full h-12 px-3.5 border border-[#ACD5DB] rounded-xl text-base text-slate-900 placeholder:text-slate-400 outline-none text-left transition-colors flex items-center justify-between overflow-hidden bg-[#F8FCFC] cursor-not-allowed"
            >
              <span className={`truncate ${numeration ? 'text-slate-900' : 'text-slate-400'}`}>
                {numeration || 'Selecciona una numeración'}
              </span>
              <svg className="pointer-events-none shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

        {/* No. and Branch info */}
        {numeration !== 'De venta' && (
          <div className="px-4 pb-4 flex justify-between items-start">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-slate-900 leading-[30px]">No.</span>
              <span className="text-sm font-normal text-slate-700">0060000101207</span>
            </div>
            <div className="text-right text-xs font-normal text-slate-500 leading-4">
              <p>Sucursal: 006</p>
              <p>Punto de venta: 00001</p>
            </div>
          </div>
        )}

        {numeration === 'De venta' && (
          <div className="px-4 pb-4 flex items-baseline gap-1">
            <span className="text-lg font-semibold text-slate-900 leading-[30px]">No.</span>
            <span className="text-sm font-normal text-slate-700">22</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div>
        <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />
      </div>
    </>
  );
}

// Paso 1: Ajustes
interface Paso1Props {
  documentType: string;
  invoiceType: string;
  economicActivity: string;
  numeration: string;
  currentStep: 1 | 2 | 3;
  onDocumentTypeChange: (value: string) => void;
  onInvoiceTypeOpenChange: (value: boolean) => void;
  onEconomicActivityOpenChange: (value: boolean) => void;
  onNumerationOpenChange: (value: boolean) => void;
}

function Paso1({
  documentType,
  invoiceType,
  economicActivity,
  numeration,
  currentStep,
  onDocumentTypeChange,
  onInvoiceTypeOpenChange,
  onEconomicActivityOpenChange,
  onNumerationOpenChange,
}: Paso1Props) {
  return (
    <>
      {/* Company Invoice Section - without Numeración */}
      <div className="bg-white rounded-t-xl pt-4">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img src="/images/logo.svg" alt="Elite Boutique" className="h-[74px]" />
        </div>

        {/* Company Info */}
        <div className="text-center mb-4 px-4">
          <h2 className="text-xs font-semibold text-slate-700">DECKO SA DE CV</h2>
          <p className="text-[10px] text-slate-700">Elite Boutique SAS - RFC 8678901</p>
        </div>

        {/* Steps */}
        <div className="mb-4">
          <Steps currentStep={currentStep} />
        </div>

        {/* Numeración - Editable in Paso 1 */}
        <div className="px-4 mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Numeración<span className="text-[#30aba9] ml-0.5">*</span>
          </label>
          <button
            onClick={() => onNumerationOpenChange(true)}
            className="w-full h-12 px-3.5 border border-slate-300/40 rounded-xl text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30aba9] text-left hover:bg-slate-50 transition-colors flex items-center justify-between overflow-hidden"
          >
            <span className={`truncate ${numeration ? 'text-slate-900' : 'text-slate-400'}`}>
              {numeration || 'Selecciona una numeración'}
            </span>
            <svg className="pointer-events-none shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* No. and Branch info */}
        {numeration !== 'De venta' && (
          <div className="px-4 pb-4 flex justify-between items-start">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-slate-900 leading-[30px]">No.</span>
              <span className="text-sm font-normal text-slate-700">0060000101207</span>
            </div>
            <div className="text-right text-xs font-normal text-slate-500 leading-4">
              <p>Sucursal: 006</p>
              <p>Punto de venta: 00001</p>
            </div>
          </div>
        )}

        {numeration === 'De venta' && (
          <div className="px-4 pb-4 flex items-baseline gap-1">
            <span className="text-lg font-semibold text-slate-900 leading-[30px]">No.</span>
            <span className="text-sm font-normal text-slate-700">22</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div>
        <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />
      </div>

      {/* Ajustes Section */}
      <div className="bg-white rounded-b-xl">
        <SectionHeader title="Ajustes" />
        <div className="px-4 pt-2 flex flex-col gap-2">
          {/* Tipo de documento */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tipo de documento<span className="text-[#30aba9] ml-0.5">*</span>
            </label>
            <div className="flex gap-2">
              {['Factura', 'Contingencia'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => onDocumentTypeChange(opt)}
                  className={`flex-1 h-12 rounded-xl text-base font-medium transition-colors ${documentType === opt
                      ? 'border-2 border-[#30aba9] bg-white text-slate-900'
                      : 'border border-slate-300/40 bg-white text-slate-900'
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de factura */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tipo de factura<span className="text-[#30aba9] ml-0.5">*</span>
            </label>
            <button
              onClick={() => onInvoiceTypeOpenChange(true)}
              className="relative w-full h-12 px-3.5 pr-10 border border-slate-300/40 rounded-xl text-base text-slate-900 outline-none focus:border-[#30aba9] bg-white text-left hover:bg-slate-50 transition-colors overflow-hidden"
            >
              <span className="block truncate">{invoiceType}</span>
              <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Actividad económica */}
          {documentType && documentType !== 'Contingencia' && numeration !== 'De venta' && (
            <div className="pb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Actividad económica<span className="text-[#30aba9] ml-0.5">*</span>
              </label>
              <button
                onClick={() => onEconomicActivityOpenChange(true)}
                className="relative w-full h-12 px-3.5 pr-10 border border-slate-300/40 rounded-xl text-base text-slate-900 outline-none focus:border-[#30aba9] bg-white text-left hover:bg-slate-50 transition-colors overflow-hidden"
              >
                <span className="block truncate">{economicActivity}</span>
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 5L12.5 10L7.5 15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Paso 2: Información de la factura
interface Paso2Props {
  isClientSelected: boolean;
  condition: string;
  paymentMethod: string;
  creationDate: string;
  dueDateDate: string;
  numeration: string;
  documentType: string;
  currentStep: 1 | 2 | 3;
  onClientSelect: () => void;
  onClientDelete: () => void;
  onConditionOpenChange: (value: boolean) => void;
  //onConditionChange: (value: string) => void;
  onPaymentMethodOpenChange: (value: boolean) => void;
  onPaymentMethodChange: (value: string) => void;
  onCreationDateOpenChange: (value: boolean) => void;
  onDueDateOpenChange: (value: boolean) => void;
}

function Paso2({
  isClientSelected,
  condition,
  paymentMethod,
  creationDate,
  dueDateDate,
  numeration,
  documentType,
  currentStep,
  onClientSelect,
  onClientDelete,
  onConditionOpenChange,
  //onConditionChange,
  onPaymentMethodOpenChange,
  onPaymentMethodChange,
  onCreationDateOpenChange,
  onDueDateOpenChange,
}: Paso2Props) {
  return (
    <>
      {/* Company Invoice Section - without Numeración, No., Sucursal and Punto de venta */}
      <div className="bg-white rounded-t-xl pt-4">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img src="/images/logo.svg" alt="Elite Boutique" className="h-[74px]" />
        </div>

        {/* Company Info */}
        <div className="text-center mb-4 px-4">
          <h2 className="text-xs font-semibold text-slate-700">DECKO SA DE CV</h2>
          <p className="text-[10px] text-slate-700">Elite Boutique SAS - RFC 8678901</p>
        </div>

        {/* Steps */}
        <div>
          <Steps currentStep={currentStep} />
        </div>
      </div>

      {/* Divider */}
      <div>
        <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />
      </div>

      {/* Información de la factura */}
      <div className="bg-white">
        <SectionHeader title="Información de la factura" />

        {/* Cliente */}
        <div className="bg-white px-0 overflow-visible">
          {!isClientSelected ? (
            <div className="bg-white flex items-center justify-between px-4 py-3 w-full">
              {/* Label with required indicator */}
              <div className="flex items-center gap-0.5">
                <p className="text-base font-medium text-slate-700">Cliente</p>
                <span className="text-[#30aba9] font-normal text-base">*</span>
              </div>

              {/* Button */}
              <button
                onClick={onClientSelect}
                className="bg-[#cff2f1] hover:bg-[#b8e9e8] transition-colors rounded-full px-5 py-2.5 flex items-center justify-center gap-1.5 shrink-0"
              >
                <span className="text-[#1a7e7f] font-medium text-sm">Agrega a un contacto</span>
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2V14M2 8H14" stroke="#1a7e7f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="w-full">
              {/* Header */}
              <div className="px-4 py-0 pt-2 pb-1">
                <h3 className="text-sm font-semibold text-slate-500">Cliente</h3>
              </div>

              {/* Contact Item */}
              <div className="px-3 py-0 overflow-visible">
                <ContactItem
                  name="Sofia Carson"
                  id="ID: 3-105-118067"
                  phone="+506 8888-1234"
                  onEdit={() => console.log('Edit contact')}
                  onDelete={onClientDelete}
                />
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Rest of inputs */}
      <div className="bg-white overflow-visible rounded-b-xl">
        <div className="px-4 pt-2 flex flex-col gap-2">

          {/* Fecha de creación */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fecha de creación
            </label>
            <button
              onClick={() => {
                if (numeration !== 'Electrónica' && numeration !== 'Principal electrónica') {
                  onCreationDateOpenChange(true);
                }
              }}
              disabled={numeration === 'Electrónica' || numeration === 'Principal electrónica'}
              className={`w-full h-12 px-3.5 border rounded-xl text-base outline-none text-left flex items-center justify-between transition-colors ${numeration === 'Electrónica' || numeration === 'Principal electrónica'
                  ? 'border-[#ACD5DB] bg-[#F8FCFC] text-slate-500 cursor-not-allowed'
                  : 'border-slate-300/40 text-slate-900 focus:border-[#30aba9] hover:bg-slate-50'
                }`}
            >
              <span className={creationDate ? 'text-slate-900' : 'text-slate-400'}>
                {creationDate || 'DD/MM/AAAA'}
              </span>
              <svg className="pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Fecha de vencimiento */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fecha de vencimiento
            </label>
            <button
              onClick={() => onDueDateOpenChange(true)}
              className="w-full h-12 px-3.5 border border-slate-300/40 rounded-xl text-base text-slate-900 outline-none focus:border-[#30aba9] text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span className={dueDateDate ? 'text-slate-900' : 'text-slate-400'}>
                {dueDateDate || 'DD/MM/AAAA'}
              </span>
              <svg className="pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Condición */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Condición<span className="text-[#30aba9] ml-0.5">*</span>
            </label>
            <button
              onClick={() => {
                onConditionOpenChange(true);
              }}
              className="relative w-full h-12 px-3.5 pr-10 border border-slate-300/40 rounded-xl text-base text-slate-900 outline-none focus:border-[#30aba9] bg-white text-left hover:bg-slate-50 transition-colors overflow-hidden"
            >
              <span className="block truncate">{condition}</span>
              <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {condition === 'Otros' && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-slate-700 mb-2">Descríbenos cuál es</label>
                <textarea
                  className="w-full h-[152px] px-3.5 py-3 border border-slate-300/40 rounded-xl text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30aba9] resize-none"
                  placeholder="Describe brevemente la condición"
                />
              </div>
            )}
          </div>

          {/* Medio de pago - Solo visible si Condición es Contado */}
          {condition === 'Contado' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Medio de pago<span className="text-[#30aba9] ml-0.5">*</span>
              </label>
              <div className="flex gap-2">
                {['Efectivo', 'Tarjeta', 'Otros'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      if (opt === 'Otros') {
                        onPaymentMethodOpenChange(true);
                      } else {
                        onPaymentMethodChange(opt);
                      }
                    }}
                    className={`flex-1 h-12 rounded-xl text-base font-medium transition-colors ${opt === 'Otros'
                        ? paymentMethodOptions.includes(paymentMethod)
                          ? 'border-2 border-[#30aba9] bg-white text-slate-900'
                          : 'border border-slate-300/40 bg-white text-slate-900'
                        : paymentMethod === opt
                          ? 'border-2 border-[#30aba9] bg-white text-slate-900'
                          : 'border border-slate-300/40 bg-white text-slate-900'
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {paymentMethod !== 'Efectivo' && paymentMethod !== 'Crédito' && (
                <p className="text-sm text-slate-900 mt-2 font-medium">{paymentMethod}</p>
              )}
              {paymentMethod === 'Otros' && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Descríbenos cuál es</label>
                  <textarea
                    className="w-full h-[152px] px-3.5 py-3 border border-slate-300/40 rounded-xl text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30aba9] resize-none"
                    placeholder="Describe brevemente el medio de pago"
                  />
                </div>
              )}
            </div>
          )}

          {documentType === 'Contingencia' && (
            <div className="pb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Razón de contingencia</label>
              <textarea
                className="w-full h-[152px] px-3.5 py-3 border border-slate-300/40 rounded-xl text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30aba9] resize-none"
                placeholder="Describe brevemente la razón de contingencia"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Paso 3: Revisar
interface Paso3Props {
  products: Array<{ id: number; name: string; quantity: number; price: number; discount: number }>;
  isMoreOptionsOpen: boolean;
  totals: any;
  numeration: string;
  currentStep: 1 | 2 | 3;
  formatCurrency: (value: number) => string;
  taxPercentage: number;
  onMoreOptionsToggle: () => void;
  onAddProduct: () => void;
  onDeleteProduct: (id: number) => void;
  saveAsDraft: boolean;
  onSaveAsDraftChange: (value: boolean) => void;
  // Datos de Paso 1
  documentType: string;
  invoiceType: string;
  economicActivity: string;
  // Datos de Paso 2
  isClientSelected: boolean;
  condition: string;
  paymentMethod: string;
  creationDate: string;
  dueDateDate: string;
  documentTypeValue?: string;
  // Edit callbacks
  onEditAjustes: () => void;
  onEditInformacion: () => void;
  onClientDelete: () => void;
}

function Paso3({
  products,
  isMoreOptionsOpen,
  totals,
  numeration,
  currentStep,
  formatCurrency,
  taxPercentage,
  onMoreOptionsToggle,
  onAddProduct,
  onDeleteProduct,
  saveAsDraft,
  onSaveAsDraftChange,
  // Datos de Paso 1
  documentType,
  invoiceType,
  economicActivity,
  // Datos de Paso 2
  isClientSelected,
  condition,
  paymentMethod,
  creationDate,
  dueDateDate,
  // Edit callbacks
  onEditAjustes,
  onEditInformacion,
  onClientDelete,
}: Paso3Props) {
  return (
    <>
      <CompanyHeaderSection numeration={numeration} currentStep={currentStep} />

      {/* Ajustes Section */}
      <div className="bg-white">
        <SectionHeader title="Ajustes" onEdit={onEditAjustes} />
        <div className="">
          <BillReview title="Tipo de documento" description={documentType} />
          <img src="/images/divider-line.svg" alt="" className="w-full" />
          <BillReview title="Tipo de factura" description={invoiceType} />
          {documentType !== 'Contingencia' && numeration !== 'De venta' && (
            <>
              <img src="/images/divider-line.svg" alt="" className="w-full" />
              <BillReview title="Actividad económica" description={economicActivity} />
            </>
          )}
        </div>
        <div className="pb-4"></div>
      </div>

      {/* Divider */}
      <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />

      {/* Información de la factura Section */}
      <div className="bg-white overflow-visible">
        <SectionHeader title="Información de la factura" onEdit={onEditInformacion} />
        <div className="overflow-visible">
          {isClientSelected && (
            <>
              <div className="px-4 py-2 overflow-visible">
                <h3 className="text-sm font-normal text-[#64748B]">Cliente</h3>
                <div className="pt-1 overflow-visible">
                  <ContactItem
                    name="Sofia Carson"
                    id="ID: 3-105-118067"
                    phone="+506 8888-1234"
                    onEdit={onEditInformacion}
                    onDelete={onClientDelete}
                    showMenu={false}
                  />
                </div>
              </div>
              <img src="/images/divider-line.svg" alt="" className="w-full" />
            </>
          )}
          {creationDate && (
            <>
              <BillReview title="Fecha de creación" description={creationDate} />
              <img src="/images/divider-line.svg" alt="" className="w-full" />
            </>
          )}
          {dueDateDate && (
            <>
              <BillReview title="Fecha de vencimiento" description={dueDateDate} />
              <img src="/images/divider-line.svg" alt="" className="w-full" />
            </>
          )}
          <BillReview title="Condición" description={condition} />
          {condition === 'Contado' && (
            <>
              <img src="/images/divider-line.svg" alt="" className="w-full" />
              <BillReview title="Medio de pago" description={paymentMethod} />
            </>
          )}
        </div>
        <div className="pb-4"></div>
      </div>

      {/* Divider */}
      <div>
        <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />
      </div>

      {/* Productos o servicio */}
      <div className="bg-white overflow-visible">
        {/* Header */}
        <div className="border-b border-[rgba(148,163,184,0.4)] pt-[8px] pb-[12px] px-4">
          <div className="flex items-center gap-0.5">
            <p className="text-base font-medium text-slate-700">Productos o servicio</p>
          </div>
        </div>

        {/* Product Items */}
        {products.map((product, index) => (
          <div key={product.id}>
            <div className="px-4 pt-4 pb-4">
              <ProductItem
                name={product.name}
                quantity={`Cant. ${product.quantity}`}
                price={formatCurrency(product.price)}
                discount={product.discount > 0 ? `-${((product.discount / (product.price * product.quantity)) * 100).toFixed(0)}%` : ''}
                onEdit={() => console.log('Edit product')}
                onDelete={() => onDeleteProduct(product.id)}
              />
            </div>
            {index < products.length - 1 && (
              <div className="h-px bg-slate-200"></div>
            )}
          </div>
        ))}

        {/* Add Product Button */}
        <button
          onClick={onAddProduct}
          className={`w-full px-4 py-4 flex items-center justify-center gap-1 text-[#30aba9] font-medium text-sm hover:bg-slate-50 transition-colors ${products.length > 0 ? 'border-t' : ''
            } border-[rgba(148,163,184,0.4)]`}
        >
          <span className="text-base font-semibold">+</span>
          <span>Agregar un producto o servicio</span>
        </button>
      </div>

      {/* Divider */}
      <div>
        <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />
      </div>

      {/* Más opciones */}
      <div className="bg-white">
        <button
          onClick={onMoreOptionsToggle}
          className="w-full px-4 py-3 flex items-center justify-between border-b border-[rgba(148,163,184,0.4)] hover:bg-slate-50 transition-colors"
        >
          <h3 className="text-base font-medium text-slate-700">Más opciones</h3>
          <img
            src="/images/Dropdown-Icon.svg"
            alt=""
            className={`w-6 h-6 transition-transform ${isMoreOptionsOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isMoreOptionsOpen && (
          <div className="px-4 pt-2 flex flex-col gap-2">
            {/* Notas */}
            <div className="">
              <label className="block text-sm font-medium text-slate-700 mb-2">Notas</label>
              <textarea
                className="w-full h-[152px] px-3.5 py-3 border border-slate-300/40 rounded-xl text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30aba9] resize-none"
                placeholder="Escribe una nota"
              />
            </div>

            {/* Observaciones */}
            <div className="">
              <label className="block text-sm font-medium text-slate-700 mb-2">Observaciones</label>
              <textarea
                className="w-full h-[152px] px-3.5 py-3 border border-slate-300/40 rounded-xl text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30aba9] resize-none"
                placeholder="Cualquier otra observación"
              />
            </div>

            {/* Términos y condiciones */}
            <div className="">
              <label className="block text-sm font-medium text-slate-700 mb-2">Términos y condiciones</label>
              <textarea
                className="w-full h-[152px] px-3.5 py-3 border border-slate-300/40 rounded-xl text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30aba9] resize-none"
                placeholder="Términos y condiciones"
              />
            </div>

            {/* Guardar como un borrador */}
            <div className="pb-4 flex items-center justify-between">
              <label className="text-base font-medium text-slate-700">Guardar como un borrador</label>
              <button
                onClick={() => onSaveAsDraftChange(!saveAsDraft)}
                className={`relative inline-flex h-8 w-13 items-center rounded-full transition-colors ${saveAsDraft ? 'bg-[#30aba9]' : 'bg-slate-300'
                  }`}
              >
                <span
                  className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform ${saveAsDraft ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div>
        <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />
      </div>

      {/* Summary */}
      <div className="bg-white px-4 py-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-normal text-slate-500">Subtotal</span>
          <span className="text-sm font-normal text-slate-500">{formatCurrency(totals.subtotal)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-normal text-[#30aba9]">Descuento</span>
          <span className="text-sm font-normal text-[#30aba9]">-{formatCurrency(totals.totalDiscount)}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-normal text-slate-500">Impuestos ({taxPercentage}%)</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#64748B" strokeWidth="1.5" />
              <path d="M8 7V11M8 5V5.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-sm font-normal text-slate-500">{formatCurrency(totals.taxes)}</span>
        </div>
        <div className="h-px bg-slate-200"></div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-slate-900">Total</span>
          <span className="text-2xl font-bold text-slate-900">{formatCurrency(totals.total)}</span>
        </div>
      </div>

      {/* Ending Bill */}
      <div>
        <img src="/images/Ending-bill.svg" alt="" className="w-full" />
      </div>
    </>
  );
}

function SecondProposal() {
  const navigate = useNavigate();
  const initialState = getInitialState();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [documentType, setDocumentType] = useState(initialState.documentType);
  const [invoiceType, setInvoiceType] = useState(initialState.invoiceType);
  const [isInvoiceTypeOpen, setIsInvoiceTypeOpen] = useState(false);
  const [economicActivity, setEconomicActivity] = useState(initialState.economicActivity);
  const [isEconomicActivityOpen, setIsEconomicActivityOpen] = useState(false);
  const [condition, setCondition] = useState(initialState.condition);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(initialState.paymentMethod);
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [isClientSelected, setIsClientSelected] = useState(initialState.isClientSelected);
  const [numeration, setNumeration] = useState(initialState.numeration);
  const [isNumerationOpen, setIsNumerationOpen] = useState(false);
  const [creationDate, setCreationDate] = useState(initialState.creationDate);
  const [isCreationDateOpen, setIsCreationDateOpen] = useState(false);
  const [dueDateDate, setDueDateDate] = useState(initialState.dueDateDate);
  const [isDueDateOpen, setIsDueDateOpen] = useState(false);
  const [products, setProducts] = useState<Array<{ id: number; name: string; quantity: number; price: number; discount: number }>>(
    initialState.products
  );
  const [discountPercentage] = useState(initialState.discountPercentage);
  const [taxPercentage] = useState(19);
  const [saveAsDraft, setSaveAsDraft] = useState(false);

  // Validation functions for each step
  const isStep1Valid = () => {
    const hasNumeration = numeration && numeration !== '';
    const hasDocumentType = documentType && documentType !== '';
    const hasInvoiceType = invoiceType && invoiceType !== '';
    const hasEconomicActivity = !isMoreOptionsOpen || (economicActivity && economicActivity !== '');
    return hasNumeration && hasDocumentType && hasInvoiceType && hasEconomicActivity;
  };

  const isStep2Valid = () => {
    const hasClient = isClientSelected;
    const hasCondition = condition && condition !== '';
    const hasPaymentMethod = !isMoreOptionsOpen || (paymentMethod && paymentMethod !== '');
    return hasClient && hasCondition && hasPaymentMethod;
  };

  const isStep3Valid = () => {
    return products.length > 0;
  };

  const isCurrentStepValid = () => {
    if (currentStep === 1) return isStep1Valid();
    if (currentStep === 2) return isStep2Valid();
    if (currentStep === 3) return isStep3Valid();
    return true;
  };

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = {
      documentType,
      invoiceType,
      economicActivity,
      condition,
      paymentMethod,
      numeration,
      creationDate,
      dueDateDate,
      products,
      isClientSelected,
      discountPercentage,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [documentType, invoiceType, economicActivity, condition, paymentMethod, numeration, creationDate, dueDateDate, products, isClientSelected, discountPercentage]);

  // Set today's date when electronic numeration is selected
  useEffect(() => {
    if (numeration === 'Electrónica' || numeration === 'Principal electrónica') {
      const today = new Date();
      const formatted = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
      setCreationDate(formatted);
    }
  }, [numeration]);

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = products.reduce((sum, product) => {
      return sum + (product.price * product.quantity);
    }, 0);

    const totalDiscount = products.reduce((sum, product) => {
      return sum + product.discount;
    }, 0);

    const discountAmount = (subtotal * discountPercentage) / 100;
    const subtotalAfterDiscount = subtotal - totalDiscount - discountAmount;
    const taxes = (subtotalAfterDiscount * taxPercentage) / 100;
    const total = subtotalAfterDiscount + taxes;

    return {
      subtotal,
      productDiscount: totalDiscount,
      percentageDiscount: discountAmount,
      totalDiscount: totalDiscount + discountAmount,
      taxes,
      total,
    };
  };

  const totals = calculateTotals();

  const formatCurrency = (value: number) => {
    return `₡${value.toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-slate-100 w-full flex flex-col">
      <SharedHeader />

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4 pb-8">
          {currentStep === 1 && (
            <Paso1
              documentType={documentType}
              invoiceType={invoiceType}
              economicActivity={economicActivity}
              numeration={numeration}
              currentStep={currentStep}
              onDocumentTypeChange={setDocumentType}
              onInvoiceTypeOpenChange={setIsInvoiceTypeOpen}
              onEconomicActivityOpenChange={setIsEconomicActivityOpen}
              onNumerationOpenChange={setIsNumerationOpen}
            />
          )}

          {currentStep === 2 && (
            <Paso2
              isClientSelected={isClientSelected}
              condition={condition}
              paymentMethod={paymentMethod}
              creationDate={creationDate}
              dueDateDate={dueDateDate}
              numeration={numeration}
              documentType={documentType}
              currentStep={currentStep}
              onClientSelect={() => setIsClientSelected(true)}
              onClientDelete={() => setIsClientSelected(false)}
              onConditionOpenChange={setIsConditionOpen}
              //onConditionChange={setCondition}
              onPaymentMethodOpenChange={setIsPaymentMethodOpen}
              onPaymentMethodChange={setPaymentMethod}
              onCreationDateOpenChange={setIsCreationDateOpen}
              onDueDateOpenChange={setIsDueDateOpen}
            />
          )}

          {currentStep === 3 && (
            <Paso3
              products={products}
              isMoreOptionsOpen={isMoreOptionsOpen}
              totals={totals}
              numeration={numeration}
              currentStep={currentStep}
              formatCurrency={formatCurrency}
              taxPercentage={taxPercentage}
              onMoreOptionsToggle={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
              onAddProduct={() => {
                const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                setProducts([
                  ...products,
                  {
                    id: newId,
                    name: `Producto ${newId}`,
                    quantity: 1,
                    price: 200,
                    discount: 0,
                  },
                ]);
              }}
              onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
              saveAsDraft={saveAsDraft}
              onSaveAsDraftChange={setSaveAsDraft}
              // Datos de Paso 1
              documentType={documentType}
              invoiceType={invoiceType}
              economicActivity={economicActivity}
              // Datos de Paso 2
              isClientSelected={isClientSelected}
              condition={condition}
              paymentMethod={paymentMethod}
              creationDate={creationDate}
              dueDateDate={dueDateDate}
              onEditAjustes={() => setCurrentStep(1)}
              onEditInformacion={() => setCurrentStep(2)}
              onClientDelete={() => setIsClientSelected(false)}
            />
          )}
        </div>
      </div>

      {/* Navigation Buttons - Sticky */}
      <div className="sticky bottom-0 shrink-0">
        <div className="flex gap-3 px-4 py-4">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep((prev) => (prev > 1 ? (prev - 1) as 1 | 2 | 3 : prev))}
              className="flex-1 h-12 border-[1.5px] border-slate-300/40 bg-white text-slate-900 font-semibold text-base rounded-xl hover:bg-white active:bg-slate-50 transition-colors"
            >
              Anterior
            </button>
          )}
          <button
            onClick={() => {
              if (currentStep < 3) {
                setCurrentStep((prev) => (prev < 3 ? (prev + 1) as 1 | 2 | 3 : prev));
              } else {
                navigate('/invoice', { state: { from: 'second-proposal' } });
              }
            }}
            disabled={!isCurrentStepValid()}
            className="flex-1 h-12 text-white font-semibold text-base rounded-xl transition-colors disabled:cursor-not-allowed disabled:hover:bg-[#ACD5DB]"
            style={{
              backgroundColor: isCurrentStepValid() ? '#30aba9' : '#ACD5DB'
            }}
            onMouseEnter={(e) => {
              if (isCurrentStepValid()) {
                e.currentTarget.style.backgroundColor = '#2a9a98';
              }
            }}
            onMouseLeave={(e) => {
              if (isCurrentStepValid()) {
                e.currentTarget.style.backgroundColor = '#30aba9';
              } else {
                e.currentTarget.style.backgroundColor = '#ACD5DB';
              }
            }}
            onMouseDown={(e) => {
              if (isCurrentStepValid()) {
                e.currentTarget.style.backgroundColor = '#258f8d';
              }
            }}
            onMouseUp={(e) => {
              if (isCurrentStepValid()) {
                e.currentTarget.style.backgroundColor = '#2a9a98';
              }
            }}
          >
            {currentStep === 3 ? (numeration === 'De venta' ? 'Guardar' : 'Emitir') : 'Continuar'}
          </button>
        </div>
      </div>

      {/* Invoice Type Bottom Sheet */}
      <InvoiceTypeBottomSheet
        isOpen={isInvoiceTypeOpen}
        selectedOption={invoiceType}
        onClose={() => setIsInvoiceTypeOpen(false)}
        onSelect={setInvoiceType}
      />

      {/* Economic Activity Bottom Sheet */}
      <OptionsBottomSheet
        isOpen={isEconomicActivityOpen}
        title="Actividad económica"
        options={economicActivityOptions}
        selectedOption={economicActivity}
        onClose={() => setIsEconomicActivityOpen(false)}
        onSelect={setEconomicActivity}
      />

      {/* Condition Bottom Sheet */}
      <OptionsBottomSheet
        isOpen={isConditionOpen}
        title="Condición"
        options={conditionOptions}
        selectedOption={condition}
        onClose={() => setIsConditionOpen(false)}
        onSelect={setCondition}
      />

      {/* Payment Method Bottom Sheet */}
      <OptionsBottomSheet
        isOpen={isPaymentMethodOpen}
        title="Medio de pago"
        options={paymentMethodOptions}
        selectedOption={paymentMethod}
        onClose={() => setIsPaymentMethodOpen(false)}
        onSelect={setPaymentMethod}
      />

      {/* Numeration Bottom Sheet */}
      <NumerationBottomSheet
        isOpen={isNumerationOpen}
        selectedOption={numeration}
        onClose={() => setIsNumerationOpen(false)}
        onSelect={setNumeration}
      />

      {/* Creation Date Picker */}
      <DatePicker
        isOpen={isCreationDateOpen}
        selectedDate={creationDate}
        onClose={() => setIsCreationDateOpen(false)}
        onSelect={setCreationDate}
      />

      {/* Due Date Picker */}
      <DatePicker
        isOpen={isDueDateOpen}
        selectedDate={dueDateDate}
        onClose={() => setIsDueDateOpen(false)}
        onSelect={setDueDateDate}
      />
    </div>
  );
}

export default SecondProposal;
