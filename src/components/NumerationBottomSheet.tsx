import { useState, useEffect } from 'react';

interface NumerationBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
  selectedOption?: string;
}

function NumerationBottomSheet({
  isOpen,
  onClose,
  onSelect,
  selectedOption,
}: NumerationBottomSheetProps) {
  const [activeTab, setActiveTab] = useState<'electronica' | 'no-electronica'>('electronica');
  const [isClosing, setIsClosing] = useState(false);

  // Reset isClosing when the bottom sheet opens
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const electronicaOptions = ['Electrónica', 'Principal electrónica'];
  const noElectronicaOptions = ['De venta'];

  const currentOptions = activeTab === 'electronica' ? electronicaOptions : noElectronicaOptions;

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
      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 w-full flex flex-col max-h-[80vh] ${isClosing ? 'animate-bottomsheet-out' : 'animate-bottomsheet-in'}`}>
        {/* Grabber */}
        <div className="flex justify-center pt-2 pb-2 shrink-0">
          <div className="w-9 h-1 bg-slate-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-4 w-full shrink-0">
          <div className="flex items-center justify-between py-4">
            <div className="w-6"></div>
            <h2 className="text-base font-semibold text-slate-900">Numeración</h2>
            <button
              onClick={handleClose}
              className="w-6 h-6 flex items-center justify-center text-slate-900 hover:text-slate-700 transition-colors"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[rgba(148,163,184,0.4)] shrink-0 w-full">
          <div className="flex w-full">
            <button
              onClick={() => setActiveTab('electronica')}
              className={`flex-1 h-10 text-sm font-medium border-b-2 transition-colors flex items-center justify-center ${
                activeTab === 'electronica'
                  ? 'text-slate-700 border-[#30aba9]'
                  : 'text-slate-500 border-transparent'
              }`}
            >
              Electrónica
            </button>
            <button
              onClick={() => setActiveTab('no-electronica')}
              className={`flex-1 h-10 text-sm font-medium border-b-2 transition-colors flex items-center justify-center ${
                activeTab === 'no-electronica'
                  ? 'text-slate-700 border-[#30aba9]'
                  : 'text-slate-500 border-transparent'
              }`}
            >
              No electrónica
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="px-4 py-4 flex flex-col gap-3 overflow-y-auto flex-1">
          {currentOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <p className="text-sm font-normal text-slate-900">{option}</p>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedOption === option
                    ? 'border-[#30aba9] bg-white'
                    : 'border-[rgba(148,163,184,0.4)]'
                }`}
              >
                {selectedOption === option && (
                  <div className="w-2 h-2 bg-[#30aba9] rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Indicator */}
        <div className="flex justify-center pb-2 pt-6 shrink-0">
          <div className="w-36 h-1 bg-slate-700 rounded-full"></div>
        </div>
      </div>
    </>
  );
}

export default NumerationBottomSheet;
