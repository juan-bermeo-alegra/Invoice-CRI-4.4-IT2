import { useState, useEffect } from 'react';
import HeaderBottomsheet from './HeaderBottomsheet';
import MultiSelect from './MultiSelect';

interface ConditionBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (option: string) => void;
    selectedOption?: string;
}

function ConditionBottomSheet({
    isOpen,
    onClose,
    onSelect,
    selectedOption,
}: ConditionBottomSheetProps) {
    const [activeTab, setActiveTab] = useState<'special' | 'leasing'>('special');
    const [isClosing, setIsClosing] = useState(false);

    // Reset isClosing when the bottom sheet opens
    useEffect(() => {
        if (isOpen) {
            setIsClosing(false);
        }
    }, [isOpen]);

    const specialOptions = [
        'Consignación',
        'Apartado',
        'Servicios prestados al Estado a crédito',
        'Venta a crédito en IVA hasta 90 días (Artículo 27, LIVA)',
        'Otros'
    ];

    const leasingOptions = [
        'Arrendamiento con opción de compra',
        'Arrendamiento en función financiera',
        'Arrendamiento operativo',
        'Arrendamiento financiero'
    ];

    const currentOptions = activeTab === 'special' ? specialOptions : leasingOptions;

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
                    <HeaderBottomsheet title="Condición" onClose={handleClose} />
                </div>

                {/* Tabs */}
                <div className="border-b border-[rgba(148,163,184,0.4)] shrink-0 w-full">
                    <div className="flex w-full">
                        <button
                            onClick={() => setActiveTab('special')}
                            className={`flex-1 h-10 text-sm font-medium border-b-2 transition-colors flex items-center justify-center ${activeTab === 'special'
                                ? 'text-slate-700 border-[#30aba9]'
                                : 'text-slate-500 border-transparent'
                                }`}
                        >
                            Condiciones especiales
                        </button>
                        <button
                            onClick={() => setActiveTab('leasing')}
                            className={`flex-1 h-10 text-sm font-medium border-b-2 transition-colors flex items-center justify-center ${activeTab === 'leasing'
                                ? 'text-slate-700 border-[#30aba9]'
                                : 'text-slate-500 border-transparent'
                                }`}
                        >
                            Arrendamiento
                        </button>
                    </div>
                </div>

                {/* Options */}
                <div className="px-4 py-4 flex flex-col gap-3 overflow-y-auto flex-1">
                    {currentOptions.map((option) => (
                        <MultiSelect
                            key={option}
                            label={option}
                            selected={selectedOption === option}
                            onChange={() => handleSelect(option)}
                        />
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

export default ConditionBottomSheet;
