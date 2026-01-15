interface ThirdPartySelectorProps {
  onSelect?: () => void;
}

function ThirdPartySelector({ onSelect }: ThirdPartySelectorProps) {
  return (
    <div className="bg-white w-full">
      {/* Header */}
      <div className="border-b border-[rgba(148,163,184,0.2)] pt-2 pb-3 px-0">
        <div className="flex items-center gap-0.5 px-4">
          <p className="text-base font-medium text-slate-700">Tercero</p>
          <span className="text-[#30aba9] font-normal text-base">*</span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={onSelect}
        className="w-full bg-white px-4 py-4 flex items-center justify-center gap-1 text-[#30aba9] font-medium text-sm hover:bg-slate-50 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <path d="M8 2.83331V13.1666M2.83337 7.99998H13.1667" stroke="#30aba9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Selecciona a un tercero</span>
      </button>
    </div>
  );
}

export default ThirdPartySelector;
