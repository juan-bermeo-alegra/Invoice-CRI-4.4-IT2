interface HeaderBottomsheetProps {
  title: string;
  onClose: () => void;
}

function HeaderBottomsheet({ title, onClose }: HeaderBottomsheetProps) {
  return (
    <div className="px-0 py-4 flex items-center justify-between w-full">
      <h2 className="text-base font-semibold text-slate-900 flex-1 text-center">
        {title}
      </h2>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="w-6 h-6 shrink-0 text-slate-900 hover:opacity-70 transition-opacity flex items-center justify-center"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="#0F172A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default HeaderBottomsheet;
