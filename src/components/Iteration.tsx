interface IterationProps {
  text?: string;
}

function Iteration({ text = "IT1" }: IterationProps) {
  return (
    <div className="border border-[rgba(148,163,184,0.4)] rounded-[10px] px-3 py-1 flex items-center gap-1 w-fit">
      <p className="font-semibold text-base leading-7 text-slate-700 whitespace-nowrap">{text}</p>
    </div>
  );
}

export default Iteration;
