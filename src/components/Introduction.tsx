import { useNavigate } from 'react-router-dom';
import PrototypeType from './PrototypeType';
import OptionCard from './OptionCard';
import Iteration from './Iteration';
import './Introduction.css';

function Introduction() {
  const navigate = useNavigate();

  const handleExploreOption = (option: number) => {
    if (option === 1) {
      navigate('/1st-proposal');
    } else if (option === 2) {
      navigate('/2nd-proposal');
    } else {
      console.log(`Exploring option ${option}`);
      // Aquí se puede agregar la navegación a las otras opciones
    }
  };

  return (
    <div className="introduction">
      <div className="introduction__header">
        <div className="introduction__title-section">
          <div className="mb-2">
            <Iteration text="IT1" />
          </div>
          <h1 className="introduction__title">Facturación CRI 4.4</h1>
          <div className="introduction__prototype-type">
            <PrototypeType type="Improvement" />
          </div>
        </div>

        <div className="introduction__cards">
          <OptionCard
            title="Propuesta 1"
            description="Campos principales presentes en una misma pantalla con barra de progreso"
            onExplore={() => handleExploreOption(1)}
          />
          <OptionCard
            title="Propuesta 2"
            description="Campos divididos en 3 pasos, la última es para revisar y editar"
            onExplore={() => handleExploreOption(2)}
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
            <p className="introduction__info-value">Mie. 19 Oct, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
