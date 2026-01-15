import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InvoiceContainer from './Invoice-container';
import ToastV2 from './Toast-v2';

interface Invoice {
  id: number;
  clientName: string;
  invoiceType: string;
  invoiceNumber: string;
  invoiceDate: string;
  amount: string;
  status: 'por-cobrar' | 'anulada' | 'borrador' | 'cobrado';
}

const mockInvoices: Invoice[] = [
  {
    id: 1,
    clientName: 'Tom Hanks',
    invoiceType: 'Factura de venta',
    invoiceNumber: '001000020893',
    invoiceDate: '04/20/2026',
    amount: '₡5.300.000',
    status: 'por-cobrar',
  },
  {
    id: 2,
    clientName: 'Maria Johnson',
    invoiceType: 'Tiquete',
    invoiceNumber: '001000020894',
    invoiceDate: '05/10/2026',
    amount: '₡8.750.000',
    status: 'anulada',
  },
  {
    id: 3,
    clientName: 'Lucas Gray',
    invoiceType: 'Factura de venta',
    invoiceNumber: '001000020895',
    invoiceDate: '06/25/2026',
    amount: '₡3.800.000',
    status: 'por-cobrar',
  },
  {
    id: 4,
    clientName: 'Nina Patel',
    invoiceType: 'Factura de exportación',
    invoiceNumber: '001000020896',
    invoiceDate: '07/30/2026',
    amount: '₡7.200.000',
    status: 'borrador',
  },
  {
    id: 5,
    clientName: 'Eliot Smith',
    invoiceType: 'Factura de venta',
    invoiceNumber: '001000020897',
    invoiceDate: '08/15/2026',
    amount: '₡9.600.000',
    status: 'cobrado',
  },
  {
    id: 6,
    clientName: 'Chloe Davis',
    invoiceType: 'Factura de venta',
    invoiceNumber: '001000020898',
    invoiceDate: '09/05/2026',
    amount: '₡6.450.000',
    status: 'por-cobrar',
  },
];

export default function Invoice() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInvoices] = useState(mockInvoices);
  const [showToastV2, setShowToastV2] = useState(false);
  const [toastV2Exiting, setToastV2Exiting] = useState(false);

  // Determine which toast to show based on the source page
  useEffect(() => {
    if (location.state?.from === 'first-proposal' || location.state?.from === 'second-proposal') {
      setShowToastV2(true);
      setToastV2Exiting(false);
      // Show toast for 4 seconds, then animate out
      const showTimer = setTimeout(() => {
        setToastV2Exiting(true);
      }, 4000);
      // Remove from DOM after animation completes
      const removeTimer = setTimeout(() => {
        setShowToastV2(false);
      }, 4500);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-white w-full flex flex-col">

      {/* Header */}
      <div className="bg-white shrink-0">
        <div className="flex items-center justify-between px-4 h-[60px]">
          <button onClick={() => navigate('/')} className="w-6 h-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <h1 className="text-base font-semibold text-slate-900">Ventas</h1>
          <button className="w-6 h-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="px-4 py-4 flex gap-2 items-center">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <img src="/images/search.svg" alt="" className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-3 bg-slate-100 border border-slate-200/50 rounded-[10px] text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#30aba9]"
          />
        </div>
        <button className="w-10 h-10 bg-white border border-slate-300/40 rounded-[10px] flex items-center justify-center hover:bg-slate-50 transition-colors shrink-0">
          <img src="/images/embudo.svg" alt="Filtro" className="w-6 h-6" />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-200"></div>

      {/* Toast V2 - Top */}
      {showToastV2 && (
        <div className={`${toastV2Exiting ? 'animate-toast-v2-exit' : 'animate-toast-v2-enter'}`}>
          <ToastV2
            title="¡Factura creada! 🙌"
            onClose={() => {
              setToastV2Exiting(true);
              setTimeout(() => setShowToastV2(false), 500);
            }}
          />
        </div>
      )}

      {/* Invoices List */}
      <div className="flex-1 overflow-y-auto px-4">
        {filteredInvoices.map((invoice, index) => (
          <div key={invoice.id}>
            <InvoiceContainer
              clientName={invoice.clientName}
              invoiceType={invoice.invoiceType}
              invoiceNumber={invoice.invoiceNumber}
              invoiceDate={invoice.invoiceDate}
              amount={invoice.amount}
              status={invoice.status}
            />
            {index < filteredInvoices.length - 1 && (
              <div className="h-px bg-slate-200"></div>
            )}
          </div>
        ))}
      </div>

      {/* FAB Button */}
      {/*<div className="absolute bottom-24 right-4">
        <button className="w-16 h-16 bg-[#30aba9] rounded-full flex items-center justify-center shadow-lg hover:bg-[#2a9a98] transition-colors">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 8v16M8 16h16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>*/}



      {/* Home Indicator */}
      <div className="h-[34px] flex items-center justify-center shrink-0">

      </div>
    </div>
  );
}
