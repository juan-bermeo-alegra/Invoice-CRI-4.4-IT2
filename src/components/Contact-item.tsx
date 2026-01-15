import { useState, useRef } from "react";
import MenuDropdown from "./MenuDropdown";

interface ContactItemProps {
  name?: string;
  id?: string;
  phone?: string;
  variant?: 'client' | 'warehouse';
  onEdit?: () => void;
  onDelete?: () => void;
  showMenu?: boolean;
}

function ContactItem({ name = "Sofia Carson", id = "ID: 3-105-118067", phone = "+506 8888-1234", variant = 'client', onEdit, onDelete, showMenu = true }: ContactItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isClient = variant === 'client';
  const avatarContent = isClient ? name.charAt(0).toUpperCase() : '1';
  const avatarShape = isClient ? 'rounded-full' : 'rounded-lg';

  return (
    <div className="w-full bg-white rounded-lg py-3 px-0 flex items-center gap-3" data-name="Contact item">
      {/* Avatar */}
      <div className={`flex items-center justify-center w-10 h-10 bg-indigo-600 ${avatarShape} border border-slate-200/45 shrink-0`}>
        <span className="text-white font-semibold text-base leading-7">{avatarContent}</span>
      </div>

      {/* Contact Info */}
      <div className="flex-1 min-w-0">
        <p className="text-slate-900 font-semibold text-base leading-7">{name}</p>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <p className="truncate">{id}</p>
          {phone && (
            <>
              <div className="w-1 h-1 bg-slate-500 rounded-full shrink-0"></div>
              <p className="truncate">{phone}</p>
            </>
          )}
        </div>
      </div>

      {/* Menu Button */}
      {showMenu && (
        <>
          <button
            ref={menuButtonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Más opciones"
          >
            <img src="/images/refresh-double.svg" alt="" className="w-5 h-5" />
          </button>

          {/* Dropdown Menu */}
          <MenuDropdown
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onEdit={onEdit}
            onDelete={onDelete}
            triggerRef={menuButtonRef}
          />
        </>
      )}
    </div>
  );
}

export default ContactItem;
