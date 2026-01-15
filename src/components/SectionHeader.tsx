interface SectionHeaderProps {
  title: string;
  onEdit?: () => void;
}

function SectionHeader({ title, onEdit }: SectionHeaderProps) {
  return (
    <div className="bg-white border-b border-[rgba(148,163,184,0.4)] pt-[8px] pb-[12px] px-4 flex items-center justify-between">
      <h3 className="text-base font-medium text-slate-700">{title}</h3>
      {onEdit && (
        <button
          onClick={onEdit}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <img src="/images/edit.svg" alt="Editar" className="w-4 h-4" />
          <span className="text-sm font-medium text-[#30aba9]">Editar</span>
        </button>
      )}
    </div>
  );
}

export default SectionHeader;
