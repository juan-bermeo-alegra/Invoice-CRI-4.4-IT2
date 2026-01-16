
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
  productId,
  tax,
  quantity,
  price = "₡17.000",
  discount,
  onDelete,
}: ProductItemProps) {

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
            {(productId || tax || quantity) && (
              <div className="flex gap-1 items-center">
                {productId && (
                  <>
                    <p className="text-xs leading-4 text-slate-400 whitespace-nowrap">{productId}</p>
                    {tax || quantity ? <div className="size-1 rounded-full bg-slate-400" /> : null}
                  </>
                )}
                {tax && (
                  <>
                    <p className="text-xs leading-4 text-slate-400 whitespace-nowrap">{tax}</p>
                    {quantity ? <div className="size-1 rounded-full bg-slate-400" /> : null}
                  </>
                )}
                {quantity && (
                  <p className="text-xs leading-4 text-slate-400 whitespace-nowrap">{quantity}</p>
                )}
              </div>
            )}
          </div>

          {/* Right: Price and Discount */}
          <div className="flex flex-col items-end justify-end shrink-0">
            <p className="font-semibold text-lg leading-[30px] text-slate-900 whitespace-nowrap">
              {price}
            </p>
            {discount && (
              <div className="flex gap-1 items-end text-xs leading-4 whitespace-nowrap">
                <p className="text-slate-400">Desc.</p>
                <p className="text-teal-600">{discount}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-red-50 transition-colors shrink-0"
        aria-label="Eliminar"
      >
        <img
          src="/images/delete.svg"
          alt="Eliminar"
          className="w-5 h-5"
        />
      </button>
    </div>
  );
}

export default ProductItem;
