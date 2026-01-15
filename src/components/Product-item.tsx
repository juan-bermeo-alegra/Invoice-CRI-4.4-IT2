import { useState, useRef } from 'react';
import MenuDropdown from './MenuDropdown';

interface ProductItemProps {
  name?: string;
  productId?: string;
  tax?: string;
  quantity?: string;
  price?: string;
  discount?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

function ProductItem({
  name = "Planta de mesa",
  productId = "ITS002",
  tax = "IVA 19%",
  quantity = "Cant. 1",
  price = "₡17.000",
  discount = "-15%",
  onEdit,
  onDelete,
}: ProductItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="w-full flex gap-3 items-center pr-0" data-name="Item container">
      <div className="flex-1 flex flex-col gap-2 py-0">
        {/* Product Info Section */}
        <div className="flex gap-2 items-center justify-between">
          {/* Left: Name and Meta Info */}
          <div className="flex flex-col items-start gap-1">
            {/* Product Name */}
            <p className="font-semibold text-base leading-7 text-slate-700 whitespace-nowrap">
              {name}
            </p>
            {/* Meta Info */}
            <div className="flex gap-1 items-center">
              <p className="text-xs leading-4 text-slate-400 whitespace-nowrap">{productId}</p>
              <div className="size-1 rounded-full bg-slate-400" />
              <p className="text-xs leading-4 text-slate-400 whitespace-nowrap">{tax}</p>
              <div className="size-1 rounded-full bg-slate-400" />
              <p className="text-xs leading-4 text-slate-400 whitespace-nowrap">{quantity}</p>
            </div>
          </div>

          {/* Right: Price and Discount */}
          <div className="flex flex-col items-end justify-end shrink-0">
            <p className="font-semibold text-lg leading-[30px] text-slate-900 whitespace-nowrap">
              {price}
            </p>
            <div className="flex gap-1 items-end text-xs leading-4 whitespace-nowrap">
              <p className="text-slate-400">Desc.</p>
              <p className="text-teal-600">{discount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* More Button */}
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
  );
}

export default ProductItem;
