import React from 'react';
import '../styles/DayCard.css';
import { CalendarItem } from '../data/calendarData';

interface DayCardProps {
  day: number;
  data: CalendarItem;
  onBack: () => void;
  onReceived: (day: number) => void;
}

const DayCard: React.FC<DayCardProps> = ({ day, data, onBack, onReceived }) => {
  // Helper to check if a day is the special day (25)
  const isSpecialDay = (day: number) => day === 25;

  return (
    <div className={`day-detail ${isSpecialDay(day) ? 'special-day' : ''} ${data.received ? 'received-item' : ''}`}>
      <h2>Dia {day}</h2>

      <div className="day-content">
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </div>

      <div className="card-actions">
        <button className="back-button" onClick={onBack}>
          Voltar para o calendário
        </button>

        <button className={data.received ? 'received-button toggle' : 'received-button'} onClick={() => onReceived(day)}>
          {data.received ? 'Marcar como Não Recebido' : 'Marcar como Recebido'}
        </button>
      </div>

      {data.received && (
        <div className="received-badge">
          <span className="checkmark">✓</span> Recebido
        </div>
      )}
    </div>
  );
};

export default DayCard;
