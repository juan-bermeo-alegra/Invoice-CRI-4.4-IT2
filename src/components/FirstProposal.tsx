import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SectionHeader from './SectionHeader';
//import AddContainer from './AddContainer';
import ClientSelector from './ClientSelector';
import ContactItem from './Contact-item';
import ProductItem from './Product-item';
import InvoiceTypeBottomSheet from './InvoiceTypeBottomSheet';
import OptionsBottomSheet from './OptionsBottomSheet';
import NumerationBottomSheet from './NumerationBottomSheet';
import DatePicker from './DatePicker';
import LoadingScreen from './LoadingScreen';
import TopNotification from './TopNotification';
import ConditionBottomSheet from './ConditionBottomSheet';
import MoreChargesItem from './More-charges-item';

const economicActivityOptions = [
  '011301 - Cultivo de plantas ornamentales',
  '011302 - Cultivo de árboles frutales',
];


const paymentMethodOptions = [
  'SINPE Movil',
  'Cheque',
  'Transferencia - Deposito bancario',
  'Recaudo por terceros',
  'Plataforma Digital',
  'Otros',
];

const STORAGE_KEY = 'invoiceFormData';

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

interface Charge {
  id: string;
  chargeType: 'Otros cargos' | 'Cobro de un tercero';
  amount?: string;
  percentage?: string;
  selectedContact?: { id: string; name: string } | null;
  percentageProducts?: Array<{ id: number; name: string; quantity: number; price: number; discount: number }>;
}

function FirstProposal() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = getInitialState();

  const [documentType, setDocumentType] = useState(initialState.documentType);
  const [invoiceType, setInvoiceType] = useState(initialState.invoiceType);
  const [isInvoiceTypeOpen, setIsInvoiceTypeOpen] = useState(false);
  const [economicActivity, setEconomicActivity] = useState(initialState.economicActivity);
  const [isEconomicActivityOpen, setIsEconomicActivityOpen] = useState(false);
  const [condition, setCondition] = useState(initialState.condition);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(initialState.paymentMethod);
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false);

  const [retention, setRetention] = useState(initialState.retention || '');
  const [isRetentionsSectionOpen, setIsRetentionsSectionOpen] = useState(false);
  const [isRetentionBottomSheetOpen, setIsRetentionBottomSheetOpen] = useState(false);
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
  const [isLoading, setIsLoading] = useState(true);
  const [otherCharges, setOtherCharges] = useState<Charge[]>([]);

  // Leer preferencias de mostrar secciones desde localStorage
  const [showRetenciones, setShowRetenciones] = useState(() => {
    const saved = localStorage.getItem('showRetenciones');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [showOtrosCargos, setShowOtrosCargos] = useState(() => {
    const saved = localStorage.getItem('showOtrosCargos');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Capture charges from MoreCharges
  useEffect(() => {
    if (location.state?.charges) {
      setOtherCharges(location.state.charges);
    }
  }, [location.state?.charges]);

  // Escuchar cambios en localStorage para actualizar las secciones
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('showRetenciones');
      if (saved !== null) {
        setShowRetenciones(JSON.parse(saved));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('showOtrosCargos');
      if (saved !== null) {
        setShowOtrosCargos(JSON.parse(saved));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
      retention,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [documentType, invoiceType, economicActivity, condition, paymentMethod, numeration, creationDate, dueDateDate, products, isClientSelected, discountPercentage, retention]);

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

    let retentionAmount = 0;
    if (retention === 'Retención 1 (20%)') {
      retentionAmount = subtotalAfterDiscount * 0.20;
    }

    const total = subtotalAfterDiscount + taxes - retentionAmount;

    return {
      subtotal,
      productDiscount: totalDiscount,
      percentageDiscount: discountAmount,
      totalDiscount: totalDiscount + discountAmount,
      taxes,
      retention: retentionAmount,
      total,
    };

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

  // Calculate progress based on required fields
  const calculateProgress = () => {
    const requiredFields = [];

    // 1. Numeración (always required)
    if (numeration) requiredFields.push(true);
    else requiredFields.push(false);

    // 2. Tipo de documento (always required)
    if (documentType) requiredFields.push(true);
    else requiredFields.push(false);

    // 3. Actividad económica (required only if displayed: not Contingencia and not De venta)
    if (documentType === 'Contingencia' || numeration === 'De venta') {
      requiredFields.push(true); // Not required, so count as completed
    } else {
      if (economicActivity) requiredFields.push(true);
      else requiredFields.push(false);
    }

    // 4. Cliente (required if Contact-item is displayed)
    if (isClientSelected) requiredFields.push(true);
    else requiredFields.push(false);

    // 5. Medio de pago (required only if Condition is 'Contado')
    if (condition === 'Contado') {
      if (paymentMethod) requiredFields.push(true);
      else requiredFields.push(false);
    } else {
      requiredFields.push(true); // Not required, so count as completed
    }

    // 6. Producto o servicio (required - at least one product)
    if (products.length > 0) requiredFields.push(true);
    else requiredFields.push(false);

    const completed = requiredFields.filter(Boolean).length;
    const total = requiredFields.length;
    const percentage = (completed / total) * 100;

    return { percentage, completed, total };
  };

  const progress = calculateProgress();
  const isFormValid = progress.percentage === 100;

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-100 w-full flex flex-col">
      {/* Header - Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center justify-center px-4 h-[60px] relative">
          <button onClick={() => navigate('/')} className="w-6 h-6 absolute left-4">
            <img src="/images/arrow-left.svg" alt="" className="w-full h-full" />
          </button>
          <h1 className="text-base font-semibold text-slate-900">Facturación</h1>
          <div className="flex gap-3 items-center absolute right-4">
            <button className="w-6 h-6">
              <img src="/images/microphone.svg" alt="" className="w-full h-full" />
            </button>
            <button onClick={() => navigate('/1st-proposal/more-settings')} className="w-6 h-6">
              <img src="/images/more.svg" alt="" className="w-full h-full" />
            </button>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1.5 bg-slate-200">
          <div className="h-full bg-[#30aba9] transition-all" style={{ width: `${progress.percentage}%` }}></div>
        </div>
        <TopNotification />
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="px-4 pt-4">
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

            {/* Numeración */}
            <div className="px-4 mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Numeración<span className="text-[#30aba9] ml-0.5">*</span>
              </label>
              <button
                onClick={() => setIsNumerationOpen(true)}
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
          <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />

          {/* Ajustes Section */}
          <div className="bg-white">
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
                      onClick={() => setDocumentType(opt)}
                      className={`flex-1 h-12 rounded-xl text-base font-medium transition-colors ${documentType === opt
                        ? 'border-2 border-[#30aba9] bg-[#CFF2F1] text-[#1A7E7F]'
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
                  onClick={() => setIsInvoiceTypeOpen(true)}
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
                    onClick={() => setIsEconomicActivityOpen(true)}
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

          {/* Divider */}
          <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />

          {/* Información de la factura */}
          <div className="bg-white">
            <SectionHeader title="Información de la factura" />

            {/* Cliente */}
            <div className="bg-white overflow-visible">
              {!isClientSelected ? (
                <ClientSelector onSelect={() => setIsClientSelected(true)} />
              ) : (
                <div className="bg-white">
                  {/* Header */}
                  <div className="border-b border-[rgba(148,163,184,0.4)] pt-[8px] pb-[12px] px-4">
                    <div className="flex items-center gap-0.5">
                      <p className="text-base font-medium text-slate-700">Cliente</p>
                      <span className="text-[#30aba9] font-normal text-base">*</span>
                    </div>
                  </div>

                  {/* Contact Item */}
                  <div className="px-4 overflow-visible">
                    <ContactItem
                      name="Sofia Carson"
                      id="ID: 3-105-118067"
                      onEdit={() => console.log('Edit contact')}
                      onDelete={() => setIsClientSelected(false)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Divider line */}
          <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />

          {/* Rest of inputs */}
          <div className="bg-white overflow-visible">
            <div className="px-4 pt-2 flex flex-col gap-2">

              {/* Fecha de creación */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Fecha de creación
                </label>
                <button
                  onClick={() => {
                    if (numeration !== 'Electrónica' && numeration !== 'Principal electrónica') {
                      setIsCreationDateOpen(true);
                    }
                  }}
                  disabled={numeration === 'Electrónica' || numeration === 'Principal electrónica'}
                  className={`w-full h-12 px-3.5 border rounded-xl text-base outline-none text-left flex items-center justify-between transition-colors ${numeration === 'Electrónica' || numeration === 'Principal electrónica'
                    ? 'border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed'
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
                  onClick={() => setIsDueDateOpen(true)}
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
                <div className="flex gap-2">
                  {['Contado', 'Crédito', 'Otros'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        if (opt === 'Otros') {
                          setIsConditionOpen(true);
                        } else {
                          setCondition(opt);
                        }
                      }}
                      className={`flex-1 h-12 rounded-xl text-base font-medium transition-colors ${opt === 'Otros'
                        ? !['Contado', 'Crédito', ''].includes(condition)
                          ? 'border-2 border-[#30aba9] bg-[#CFF2F1] text-[#1A7E7F]'
                          : 'border border-slate-300/40 bg-white text-slate-900'
                        : condition === opt
                          ? 'border-2 border-[#30aba9] bg-[#CFF2F1] text-[#1A7E7F]'
                          : 'border border-slate-300/40 bg-white text-slate-900'
                        }`}
                    >
                      {opt === 'Otros' ? (
                        <div className="flex items-center justify-center gap-2">
                          <img src="/images/payment-more.svg" alt="" />
                          {opt}
                        </div>
                      ) : (
                        opt
                      )}
                    </button>
                  ))}
                </div>
                {condition && condition !== 'Contado' && condition !== 'Crédito' && (
                  <p className="text-sm text-slate-900 mt-2 font-medium">{condition}</p>
                )}
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
                            setIsPaymentMethodOpen(true);
                          } else {
                            setPaymentMethod(opt);
                          }
                        }}
                        className={`flex-1 h-12 rounded-xl text-base font-medium transition-colors ${opt === 'Otros'
                          ? paymentMethodOptions.includes(paymentMethod)
                            ? 'border-2 border-[#30aba9] bg-[#CFF2F1] text-[#1A7E7F]'
                            : 'border border-slate-300/40 bg-white text-slate-900'
                          : paymentMethod === opt
                            ? 'border-2 border-[#30aba9] bg-[#CFF2F1] text-[#1A7E7F]'
                            : 'border border-slate-300/40 bg-white text-slate-900'
                          }`}
                      >
                        {opt === 'Otros' ? (
                          <div className="flex items-center justify-center gap-2">
                            <img src="/images/payment-more.svg" alt="" />
                            {opt}
                          </div>
                        ) : (
                          opt
                        )}
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

          {/* Divider */}
          <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />

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
                    onDelete={() => setProducts(products.filter(p => p.id !== product.id))}
                  />
                </div>
                {index < products.length - 1 && (
                  <div className="h-px bg-slate-200"></div>
                )}
              </div>
            ))}

            {/* Add Product Button */}
            <button
              onClick={() => {
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
              className={`w-full px-4 py-4 flex items-center justify-center gap-1 text-[#30aba9] font-medium text-sm hover:bg-slate-50 transition-colors ${products.length > 0 ? 'border-t' : ''
                } border-[rgba(148,163,184,0.4)]`}
            >
              <span className="text-base font-semibold">+</span>
              <span>Agregar un producto o servicio</span>
            </button>
          </div>

          {/* Divider */}
          <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />

          {/* Otros cargos */}
          {showOtrosCargos && (
          <div className="bg-white overflow-visible">
            {/* Header */}
            <div className="border-b border-[rgba(148,163,184,0.4)] pt-[8px] pb-[12px] px-4">
              <div className="flex items-center gap-0.5">
                <p className="text-base font-medium text-slate-700">Otros cargos</p>
              </div>
            </div>

            {/* Charges List */}
            {otherCharges.length > 0 && (
              <div className="flex flex-col gap-0">
                {otherCharges.map((charge, index) => {
                  let displayAmount: string;

                  if (charge.amount) {
                    displayAmount = `₡${parseInt(charge.amount).toLocaleString('es-CR')}`;
                  } else if (charge.percentage && charge.percentageProducts) {
                    const subtotal = charge.percentageProducts.reduce((s, p) => s + (p.price * p.quantity - p.discount), 0);
                    const percentageAmount = Math.round(subtotal * (parseInt(charge.percentage) / 100));
                    displayAmount = `₡${percentageAmount.toLocaleString('es-CR')}`;
                  } else {
                    displayAmount = `${charge.percentage}%`;
                  }

                  return (
                    <div key={charge.id}>
                      <MoreChargesItem
                        title={charge.selectedContact?.name || charge.chargeType}
                        chargeType={charge.chargeType}
                        id={charge.selectedContact?.id}
                        amount={displayAmount}
                        onEdit={() => {
                          // TODO: Implementar funcionalidad de editar
                          console.log('Editar cargo:', charge.id);
                        }}
                        onDelete={() => {
                          setOtherCharges(otherCharges.filter(c => c.id !== charge.id));
                        }}
                      />
                      {index < otherCharges.length - 1 && (
                        <div className="h-px bg-slate-200"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Divider before Add Button */}
            {otherCharges.length > 0 && (
              <div className="border-b border-[rgba(148,163,184,0.4)]"></div>
            )}

            {/* Add Button */}
            <button
              onClick={() => {
                navigate('/more-charges', { state: { products, charges: otherCharges } });
              }}
              className="w-full px-4 py-4 flex items-center justify-center gap-1 text-[#30aba9] font-medium text-sm hover:bg-slate-50 transition-colors border-[rgba(148,163,184,0.4)] border-b"
            >
              <span className="text-base font-semibold">+</span>
              <span>Agregar cargo</span>
            </button>
          </div>
          )}

          {/* Divider */}
          {showOtrosCargos && (
            <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />
          )}

          {/* Retenciones */}
          {showRetenciones && (
          <div className="bg-white">
            <button
              onClick={() => setIsRetentionsSectionOpen(!isRetentionsSectionOpen)}
              className="w-full px-4 py-3 flex items-center justify-between border-b border-[rgba(148,163,184,0.4)] hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-base font-medium text-slate-700">Retenciones</h3>
              <img
                src="/images/Dropdown-Icon.svg"
                alt=""
                className={`w-6 h-6 transition-transform ${isRetentionsSectionOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isRetentionsSectionOpen && (
              <div className="px-4 py-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsRetentionBottomSheetOpen(true)}
                    className="flex-1 h-12 px-3.5 border border-slate-300/40 rounded-xl text-base text-slate-900 outline-none focus:border-[#30aba9] bg-white text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                  >
                    <span className={retention ? 'text-slate-900' : 'text-slate-400'}>
                      {retention || 'Retención'}
                    </span>
                    <svg className="pointer-events-none shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.5 5L12.5 10L7.5 15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-sm font-medium text-slate-700">=</span>
                    <p className="text-sm font-medium text-slate-900">
                      {retention ? formatCurrency(totals.retention || 0) : formatCurrency(0)}
                    </p>
                    {retention && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRetention('');
                        }}
                        className="text-red-500 hover:bg-red-50 rounded-lg p-1 transition-colors"
                      >
                        <img src="/images/delete.svg" alt="Eliminar" className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          )}

          {/* Divider */}
          {showRetenciones && (
            <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />
          )}

          {/* Más opciones */}
          <div className="bg-white">
            <button
              onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
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
                {/* Guardar como un borrador */}
                <div className="mb-4 pt-3 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Guardar como un borrador</label>
                  <button
                    onClick={() => setSaveAsDraft(!saveAsDraft)}
                    className={`relative inline-flex h-8 w-13 items-center rounded-full transition-colors ${saveAsDraft ? 'bg-[#30aba9]' : 'bg-slate-300'
                      }`}
                  >
                    <span
                      className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform ${saveAsDraft ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                    />
                  </button>
                </div>

                {/* Notas */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Notas</label>
                  <textarea
                    className="w-full h-[152px] px-3.5 py-3 border border-slate-300/40 rounded-xl text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30aba9] resize-none"
                    placeholder="Escribe una nota"
                  />
                </div>

                {/* Observaciones */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Observaciones</label>
                  <textarea
                    className="w-full h-[152px] px-3.5 py-3 border border-slate-300/40 rounded-xl text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30aba9] resize-none"
                    placeholder="Cualquier otra observación"
                  />
                </div>

                {/* Términos y condiciones */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Términos y condiciones</label>
                  <textarea
                    className="w-full h-[152px] px-3.5 py-3 border border-slate-300/40 rounded-xl text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30aba9] resize-none"
                    placeholder="Términos y condiciones"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />

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
            {(totals.retention || 0) > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-normal text-slate-500">Retención</span>
                <span className="text-sm font-normal text-slate-500">-{formatCurrency(totals.retention || 0)}</span>
              </div>
            )}
            {otherCharges.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-normal text-slate-500">Otros cargos</span>
                <span className="text-sm font-normal text-slate-500">{formatCurrency(
                  otherCharges.reduce((sum, charge) => {
                    if (charge.amount) {
                      return sum + parseInt(charge.amount);
                    } else if (charge.percentage && charge.percentageProducts) {
                      const subtotal = charge.percentageProducts.reduce((s, p) => s + (p.price * p.quantity - p.discount), 0);
                      const percentageAmount = Math.round(subtotal * (parseInt(charge.percentage) / 100));
                      return sum + percentageAmount;
                    }
                    return sum;
                  }, 0)
                )}</span>
              </div>
            )}
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
        </div>
      </div>

      {/* Save Button */}
      <div className="px-4 py-4 shrink-0">
        <button
          onClick={() => navigate('/invoice', { state: { from: 'first-proposal' } })}
          disabled={!isFormValid}
          className={`w-full h-12 text-white font-semibold text-base rounded-xl transition-colors ${isFormValid
            ? 'bg-[#30aba9] hover:bg-[#2a9a98] active:bg-[#258f8d] cursor-pointer'
            : 'bg-[#ACD5DB] cursor-not-allowed'
            }`}
        >
          {numeration === 'De venta' ? 'Guardar' : 'Emitir'}
        </button>
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

      {/* Condition Bottom Sheet - Modified */}
      <ConditionBottomSheet
        isOpen={isConditionOpen}
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

      {/* Retention Bottom Sheet */}
      <OptionsBottomSheet
        isOpen={isRetentionBottomSheetOpen}
        title="Retenciones"
        options={['Retención 1 (20%)']}
        selectedOption={retention}
        onClose={() => setIsRetentionBottomSheetOpen(false)}
        onSelect={setRetention}
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

export default FirstProposal;
