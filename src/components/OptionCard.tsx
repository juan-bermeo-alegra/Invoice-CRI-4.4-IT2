import './OptionCard.css';

interface OptionCardProps {
  title: string;
  description: string;
  onExplore?: () => void;
}

function OptionCard({ title, description, onExplore }: OptionCardProps) {
  return (
    <div className="option-card">
      <div className="option-card__header">
        <p className="option-card__title">{title}</p>
      </div>
      <p className="option-card__description">{description}</p>
      <p className="option-card__link" onClick={onExplore}>
        Explore option →
      </p>
    </div>
  );
}

export default OptionCard;
