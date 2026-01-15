interface AddContainerProps {
  label: string;
  buttonText?: string;
  onAdd?: () => void;
  required?: boolean;
}

function AddContainer({ label, onAdd, required = true }: AddContainerProps) {
  return (
    <div className="bg-white flex items-center justify-between px-4 py-3 w-full border-b border-[rgba(148,163,184,0.4)]">
      {/* Label with required indicator */}
      <div className="flex items-center gap-0.5">
        <p className="text-base font-medium text-slate-700">{label}</p>
        {required && <span className="text-[#30aba9] font-normal text-base">*</span>}
      </div>

      {/* Button */}
      <button
        onClick={onAdd}
        className="bg-[#cff2f1] hover:bg-[#b8e9e8] transition-colors rounded-full px-5 py-2.5 flex items-center justify-center gap-1.5 shrink-0"
      >
        <span className="text-[#1a7e7f] font-medium text-sm">Agrega a un contacto</span>
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path d="M8 2V14M2 8H14" stroke="#1a7e7f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

export default AddContainer;
