import React, { useState } from 'react';
import '../styles/Calendar.css';
import { CalendarItem } from '../data/calendarData';

interface CalendarProps {
  onDaySelect: (day: number) => void;
  gifts: CalendarItem[];
}

const Calendar: React.FC<CalendarProps> = ({ onDaySelect, gifts }) => {
  // Days of the week in Portuguese
  const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  // May 2025 starts on a Thursday (index 4)
  const startDayIndex = 4;

  // Create an array of day numbers for May 2025 (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Get the current day of the month
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // State to track the last available day
  const [lastAvailableDay, setLastAvailableDay] = useState(currentDay);

  // Helper to check if a day is within the calendar range (1-25)
  const isInRange = (day: number) =>
    currentYear === 2025 && currentMonth === 4 && day <= lastAvailableDay;

  // Helper to check if a day is the special day (25)
  const isSpecialDay = (day: number) => day === 25;

  // Helper to check if a gift has been received
  const isReceived = (day: number) => {
    const gift = gifts.find((g) => g.day === day);
    return gift ? gift.received : false;
  };

  // Handle day click
  const handleDayClick = (day: number) => {
    if (isInRange(day)) {
      onDaySelect(day);
      if (day === lastAvailableDay && day < 25  ) {
        setLastAvailableDay(day + 1); // Increment the last available day
      }
    }
  };

  return (
    <div className="calendar">
      <div className="weekdays">
        {weekdays.map((day, index) => (
          <div key={index} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="days-grid">
        {/* Empty cells for days before May 1st */}
        {Array.from({ length: startDayIndex }, (_, i) => (
          <div key={`empty-${i}`} className="day-card empty"></div>
        ))}

        {/* Day cards 1-31 */}
        {days.map((day) => (
          <div
            key={day}
            className={`day-card 
              ${!isInRange(day) ? 'disabled' : ''} 
              ${isSpecialDay(day) ? 'special' : ''} 
              ${isReceived(day) ? 'received' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            {day}
            {isSpecialDay(day) && <span className="star">★</span>}
            {isReceived(day) && <span className="checkmark">✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
