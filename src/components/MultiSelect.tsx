interface MultiSelectProps {
  label: string;
  selected: boolean;
  onChange: () => void;
}

function MultiSelect({ label, selected, onChange }: MultiSelectProps) {
  return (
    <button
      onClick={onChange}
      className={`w-full px-4 py-3 flex items-center justify-between rounded-[12px] transition-colors gap-3 ${
        selected
          ? 'bg-[#CFF2F1]'
          : 'bg-slate-50'
      }`}
    >
      <p className={`text-sm font-normal text-left truncate ${
        selected ? 'text-[#1A7E7F]' : 'text-slate-900'
      }`}>
        {label}
      </p>
      <div
        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
          selected
            ? 'border-[#30aba9] bg-white border-2'
            : 'border-[rgba(148,163,184,0.4)] bg-white border'
        }`}
      >
        {selected && (
          <div className="w-2 h-2 bg-[#30aba9] rounded-full"></div>
        )}
      </div>
    </button>
  );
}

export default MultiSelect;
