interface ToastV2Props {
  title: string;
  onClose?: () => void;
}

export default function ToastV2({ title, onClose }: ToastV2Props) {
  return (
    <div className="bg-green-100 border-t border-b border-green-200 w-full py-2 flex gap-2 items-center justify-center relative">
      {/* Icon */}
      <div className="shrink-0">
        <img src="/images/check.svg" alt="" className="w-6 h-6" />
      </div>

      {/* Content - Centered */}
      <p className="text-sm font-semibold text-slate-900 text-center">{title}</p>

      {/* Close Button - Fixed to right */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 shrink-0 p-1 hover:bg-green-200 rounded transition-colors"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-slate-900">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
