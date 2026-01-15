import { useState } from 'react';
import Checkbox from './Checkbox';

interface ProductItem {
  id: number;
  name: string;
  productId: string;
  tax: string;
  quantity: number;
  price: number;
  discount: number;
}

interface ItemsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  availableProducts: ProductItem[];
  onSelectProducts: (selectedProducts: ProductItem[]) => void;
}

function ItemsBottomSheet({
  isOpen,
  onClose,
  availableProducts,
  onSelectProducts,
}: ItemsBottomSheetProps) {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const handleToggleProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddProducts = () => {
    const selected = availableProducts.filter((p) => selectedProducts.includes(p.id));
    onSelectProducts(selected);
    setSelectedProducts([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="relative w-full bg-white rounded-t-3xl pt-2 pb-8 px-4 max-h-[80vh] overflow-y-auto">
        {/* Grabber */}
        <div className="flex justify-center py-2 mb-4">
          <div className="h-1 w-9 bg-slate-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-0">
          <div className="flex-1"></div>
          <h2 className="text-base font-semibold text-slate-900">Items</h2>
          <div className="flex-1 flex justify-end">
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center text-slate-900"
              aria-label="Cerrar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Products List */}
        <div className="flex flex-col gap-0 mb-6">
          {availableProducts.map((product, index) => (
            <div key={product.id}>
              <div className="flex gap-4 items-start py-3">
                {/* Checkbox */}
                <div className="mt-3 shrink-0">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleToggleProduct(product.id)}
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-base font-semibold text-slate-700">
                        {product.name}
                      </p>
                      <div className="flex gap-1 items-center text-xs text-slate-400 mt-1">
                        {product.productId && (
                          <>
                            <span>{product.productId}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                          </>
                        )}
                        {product.tax && (
                          <>
                            <span>{product.tax}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                          </>
                        )}
                        <span>Cant. {product.quantity}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <p className="text-lg font-semibold text-slate-900">
                        ${product.price.toLocaleString('es-CR')}
                      </p>
                      <div className="flex gap-1 items-end text-xs mt-1">
                        <p className="text-slate-400">Desc.</p>
                        <p className="text-teal-600">-{product.discount}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {index < availableProducts.length - 1 && (
                <div className="h-px bg-slate-200"></div>
              )}
            </div>
          ))}
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddProducts}
          disabled={selectedProducts.length === 0}
          className={`w-full h-12 rounded-xl font-semibold text-base text-white transition-colors ${
            selectedProducts.length > 0
              ? 'bg-[#30aba9] hover:bg-[#2a9a99]'
              : 'bg-[#30aba9] opacity-30 cursor-not-allowed'
          }`}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

export default ItemsBottomSheet;
