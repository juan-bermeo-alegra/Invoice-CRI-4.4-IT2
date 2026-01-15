interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
}: CheckboxProps) {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        className={`w-4 h-4 flex items-center justify-center rounded-[4px] transition-colors shrink-0 ${
          checked
            ? 'bg-[#30aba9] border border-[#30aba9]'
            : 'bg-white border border-[rgba(148,163,184,0.4)]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleChange}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleChange();
          }
        }}
      >
        {checked && (
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M1 5.5L4 8.5L11 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {label && (
        <span
          className={`text-sm font-normal ${
            disabled ? 'text-slate-400' : 'text-slate-700'
          }`}
        >
          {label}
        </span>
      )}
    </label>
  );
}

export default Checkbox;
