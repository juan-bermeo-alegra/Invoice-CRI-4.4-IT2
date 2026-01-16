interface InvoiceContainerProps {
  clientName: string;
  invoiceType: string;
  invoiceNumber: string;
  invoiceDate: string;
  amount: string;
  status: 'por-cobrar' | 'anulada' | 'borrador' | 'cobrado';
  onClick?: () => void;
}

const statusConfig = {
  'por-cobrar': {
    label: 'Por cobrar',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
  },
  'anulada': {
    label: 'Anulada',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    textColor: 'text-slate-500',
  },
  'borrador': {
    label: 'Borrador',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-700',
  },
  'cobrado': {
    label: 'Cobrado',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
  },
};

export default function InvoiceContainer({
  clientName,
  invoiceType,
  invoiceNumber,
  invoiceDate,
  amount,
  status,
  onClick,
}: InvoiceContainerProps) {
  const config = statusConfig[status];

  return (
    <button
      onClick={onClick}
      className="flex gap-3 items-center w-full hover:bg-slate-50 transition-colors cursor-pointer text-left"
    >
      {/* Content */}
      <div className="flex-1 flex flex-col gap-2 py-3">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          {/* Left: Client name and type */}
          <div className="flex flex-col items-start">
            <div className="flex gap-1 items-center">
              <p className="text-base font-semibold text-slate-700">{clientName}</p>
              <span className="text-xs font-medium text-slate-500">{invoiceType}</span>
            </div>
            <p className="text-base font-medium text-slate-500">{invoiceNumber}</p>
            <p className="text-xs font-normal text-slate-400">{invoiceDate}</p>
          </div>

          {/* Right: Amount and status */}
          <div className="flex flex-col items-end gap-1">
            <p className="text-lg font-semibold text-slate-900">{amount}</p>
            <div className={`${config.bgColor} border ${config.borderColor} rounded-md px-1.5 py-0.5`}>
              <p className={`text-xs font-medium ${config.textColor} whitespace-nowrap`}>
                {config.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
