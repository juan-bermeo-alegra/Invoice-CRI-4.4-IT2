import { useNavigate } from 'react-router-dom';
import PrototypeType from './PrototypeType';
import OptionCard from './OptionCard';
import Iteration from './Iteration';
import './Introduction.css';

function Introduction() {
  const navigate = useNavigate();

  const handleExploreOption = () => {
    navigate('/1st-proposal');
  };

  return (
    <div className="introduction">
      <div className="introduction__header">
        <div className="introduction__title-section">
          <div className="mb-2">
            <Iteration text="IT2" />
          </div>
          <h1 className="introduction__title">Facturación CRI 4.4</h1>
          <div className="introduction__prototype-type">
            <PrototypeType type="Improvement" />
          </div>
        </div>

        <div className="introduction__cards">
          <OptionCard
            title="Propuesta 1"
            description="Correcciones + Flujo de Otros cargos, sección para agregar retenciones y pantall de detalle de la factura"
            onExplore={handleExploreOption}
          />
        </div>
      </div>

      <div className="introduction__footer">
        <div className="introduction__info-row">
          <div className="introduction__info-item">
            <p className="introduction__info-label">Product Owner</p>
            <p className="introduction__info-value">Juan David Salazar</p>
          </div>
          <div className="introduction__info-item">
            <p className="introduction__info-label">Product Designer</p>
            <p className="introduction__info-value">Juan Camilo Bermeo</p>
          </div>
        </div>
        <div className="introduction__info-row">
          <div className="introduction__info-item">
            <p className="introduction__info-label">Delivery team</p>
            <p className="introduction__info-value">TMD Accounting Mobile App</p>
          </div>
          <div className="introduction__info-item">
            <p className="introduction__info-label">Shared on</p>
            <p className="introduction__info-value">Vie. 16 Ene, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
