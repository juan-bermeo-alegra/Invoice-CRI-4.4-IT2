import './PrototypeType.css';

type PrototypeTypeProps = {
  className?: string;
  type?: "Improvement" | "New feature" | "Future concept" | "Other";
};

function PrototypeType({ className = '', type = "Improvement" }: PrototypeTypeProps) {
  return (
    <div className={`prototype-type ${className}`}>
      <p className="prototype-type__label">
        {type.toUpperCase()}
      </p>
    </div>
  );
}

export default PrototypeType;
