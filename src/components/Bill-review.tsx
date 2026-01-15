interface BillReviewProps {
  title: string;
  description: string;
  hideDescription?: boolean;
}

function BillReview({ title, description, hideDescription = false }: BillReviewProps) {
  return (
    <div className="px-4 py-2 space-y-1">
      {/* Title */}
      <h3 className="text-sm font-normal text-[#64748B]">{title}</h3>

      {/* Description */}
      {!hideDescription && description && (
        <p className="text-lg font-normal text-slate-900">{description}</p>
      )}
    </div>
  );
}

export default BillReview;
