import { useState, useRef } from 'react';
import MenuDropdown from './MenuDropdown';

interface MoreChargesItemProps {
  title: string;
  chargeType: string;
  id?: string;
  amount: string | number;
  onEdit?: () => void;
  onDelete?: () => void;
}

function MoreChargesItem({
  title,
  chargeType,
  id,
  amount,
  onEdit,
  onDelete,
}: MoreChargesItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="flex items-center px-3 py-0 w-full">
      <div className="flex flex-1 flex-col items-start py-3 w-full">
        {/* Header with title and more button */}
        <div className="flex items-center justify-between w-full mb-0 shrink-0">
          {/* Left section - Info */}
          <div className="flex flex-1 gap-2 items-start">
            <div className="flex flex-col gap-1 items-start shrink-0">
              {/* Title */}
              <div className="flex flex-col items-start shrink-0">
                <div className="flex h-5 items-center shrink-0">
                  <p className="font-semibold leading-7 text-slate-700 text-base">
                    {title}
                  </p>
                </div>
                {/* Subtitle and ID */}
                <div className="flex flex-col gap-1 items-start shrink-0">
                  <div className="flex items-center shrink-0">
                    <p className="font-normal leading-4 text-slate-500 text-xs">
                      {chargeType}
                    </p>
                  </div>
                  {id && (
                    <div className="flex items-center shrink-0 overflow-hidden">
                      <p className="font-normal leading-4 text-slate-500 text-xs truncate">
                        ID: {id}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Amount */}
              <p className="font-semibold leading-7 text-slate-900 text-lg">
                {typeof amount === 'number'
                  ? `₡${amount.toLocaleString('es-CR')}`
                  : amount}
              </p>
            </div>
          </div>

          {/* Right section - More button */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Más opciones"
          >
            <img
              src="/images/Menu-button.svg"
              alt="Más opciones"
              className="w-8 h-8"
            />
          </button>

          {/* Dropdown Menu */}
          <MenuDropdown
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onEdit={onEdit}
            onDelete={onDelete}
            triggerRef={menuButtonRef}
          />
        </div>
      </div>
    </div>
  );
}

export default MoreChargesItem;
