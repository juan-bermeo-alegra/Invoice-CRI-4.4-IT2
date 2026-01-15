import HeaderBottomsheet from './HeaderBottomsheet';
import MultiSelect from './MultiSelect';

import { useState, useEffect } from 'react';

interface InvoiceTypeBottomSheetProps {
  isOpen: boolean;
  selectedOption: string;
  onClose: () => void;
  onSelect: (option: string) => void;
}

const options = [
  'Factura de venta',
  'Tiquete',
  'Factura de exportación',
];

function InvoiceTypeBottomSheet({
  isOpen,
  selectedOption,
  onClose,
  onSelect,
}: InvoiceTypeBottomSheetProps) {
  const [isClosing, setIsClosing] = useState(false);

  // Reset isClosing when the bottom sheet opens
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  const handleSelect = (option: string) => {
    setIsClosing(true);
    setTimeout(() => {
      onSelect(option);
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-slate-700/60 backdrop-blur-sm z-40 ${isClosing ? 'animate-overlay-out' : 'animate-overlay-in'}`}
        onClick={handleClose}
      ></div>

      {/* Bottom Sheet */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 w-full ${isClosing ? 'animate-bottomsheet-out' : 'animate-bottomsheet-in'}`}>
        {/* Grabber */}
        <div className="flex justify-center pt-2 pb-2">
          <div className="w-9 h-1 bg-slate-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-4 w-full">
          <HeaderBottomsheet title="Tipo de factura" onClose={handleClose} />
        </div>

        {/* Options */}
        <div className="px-4 py-4 flex flex-col gap-3">
          {options.map((option) => (
            <MultiSelect
              key={option}
              label={option}
              selected={selectedOption === option}
              onChange={() => handleSelect(option)}
            />
          ))}
        </div>

        {/* Indicator */}
        <div className="flex justify-center pb-2 pt-6">
          <div className="w-36 h-1 bg-slate-700 rounded-full"></div>
        </div>
      </div>
    </>
  );
}

export default InvoiceTypeBottomSheet;
