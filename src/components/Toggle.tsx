interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-[56px] h-[32px] rounded-[100px] overflow-clip transition-all ${
          checked
            ? 'bg-[#30aba9] border border-[#30aba9]'
            : 'bg-[rgba(226,232,240,0.45)] border border-[rgba(148,163,184,0.4)]'
        }`}
        role="switch"
        aria-checked={checked}
      >
        <div
          className={`absolute top-px size-[28px] rounded-[400px] bg-white transition-all ${
            checked
              ? 'right-px'
              : `left-px box-border border border-[rgba(148,163,184,0.4)]`
          }`}
        />
      </button>
    </div>
  );
}

export default Toggle;
