import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface MenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

function MenuDropdown({ isOpen, onClose, onEdit, onDelete, triggerRef }: MenuDropdownProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Calculate position and handle positioning
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const calculatePosition = () => {
      if (!triggerRef.current || !menuRef.current) return;

      const trigger = triggerRef.current;
      const rect = trigger.getBoundingClientRect();

      // Align with the right edge of the button
      let left = rect.right - menuRef.current.offsetWidth;
      let top = rect.bottom + 8;

      // Check if menu goes off-screen to the left
      if (left < 16) {
        left = 16; // Minimum padding from left edge
      }

      // Check if menu goes off-screen to the right
      const menuWidth = menuRef.current.offsetWidth;
      if (left + menuWidth > window.innerWidth - 16) {
        left = window.innerWidth - menuWidth - 16; // 16px padding from edge
      }

      // Check if menu goes off-screen at the bottom
      const menuHeight = menuRef.current.offsetHeight;
      if (top + menuHeight > window.innerHeight) {
        top = rect.top - menuHeight - 8; // Show above instead
      }

      setPosition({ top, left });
    };

    // Calculate immediately
    calculatePosition();

    // Recalculate after a small delay to ensure menu is rendered
    const timer = setTimeout(calculatePosition, 10);

    return () => clearTimeout(timer);
  }, [isOpen, triggerRef]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Close menu on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={menuRef}
      className="bg-white rounded-xl shadow-[0px_0px_0px_1px_rgba(148,163,184,0.2),0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_2px_6px_-2px_rgba(0,0,0,0.05)] z-50 min-w-[120px] fixed overflow-hidden"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      data-name="Overflow menu"
    >
      <div className="py-1">
        {/* Edit Option */}
        {onEdit && (
          <button
            onClick={() => {
              onEdit();
              onClose();
            }}
            className="w-full px-4 py-2.5 flex items-center gap-2 text-slate-700 text-sm font-normal hover:bg-slate-50 transition-colors"
            data-name="Edit menu item"
          >
            {/* Edit Icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path
                d="M2 12.5L11.28 3.22C11.6267 2.8733 12.1733 2.8733 12.52 3.22L13.78 4.48C14.1267 4.8267 14.1267 5.3733 13.78 5.72L4.5 15H2V12.5Z"
                stroke="#334155"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Editar</span>
          </button>
        )}

        {/* Delete Option */}
        {onDelete && (
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="w-full px-4 py-2.5 flex items-center gap-2 text-red-500 text-sm font-normal hover:bg-red-50 transition-colors"
            data-name="Delete menu item"
          >
            {/* Delete Icon */}
            <img src="/images/delete.svg" alt="" className="w-4 h-4 shrink-0" />
            <span>Eliminar</span>
          </button>
        )}
      </div>
    </div>,
    document.body
  );
}

export default MenuDropdown;
