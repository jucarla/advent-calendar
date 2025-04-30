import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Calendar from './components/Calendar';
import DayCard from './components/DayCard';
import { calendarData, CalendarItem } from './data/calendarData';

const STORAGE_KEY = 'advent-calendar-received';

const App: React.FC = () => {
  // Load gifts from localStorage or use the default data
  const loadSavedGifts = (): CalendarItem[] => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Failed to parse saved gifts:', error);
        return calendarData;
      }
    }
    return calendarData;
  };

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [gifts, setGifts] = useState<CalendarItem[]>(loadSavedGifts);

  // Save gifts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));
  }, [gifts]);

  // Calculate countdown to May 25, 2025
  const calculateCountdown = () => {
    const targetDate = new Date(2025, 4, 25); // May is 4 (zero-indexed)
    const currentDate = new Date(2025, 4, 30); // [MB] testando countdown com data atual

    // Return 0 if the date has passed
    if (currentDate > targetDate) {
      return { days: 0, hours: 0 };
    }

    const timeDiff = targetDate.getTime() - currentDate.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return { days, hours };
  };

  // Handle toggling a gift as received/not received
  const handleGiftReceived = (day: number) => {
    const updatedGifts = gifts.map((gift) => {
      if (gift.day === day) {
        return { ...gift, received: !gift.received };
      }
      return gift;
    });
    setGifts(updatedGifts);
    setSelectedDay(null); // Return to calendar view
  };

  // Reset all gifts to not received
  const handleResetAll = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os presentes marcados como recebidos?')) {
      const resetGifts = gifts.map((gift) => ({
        ...gift,
        received: false,
      }));
      setGifts(resetGifts);
    }
  };

  const countdown = calculateCountdown();

  return (
    <div className="app-container">
      <header>
        <h1>Check list de presentes</h1>
        <div className="countdown">
          <div className="countdown-box">
            <div className="countdown-value">{countdown.days}</div>
            <div className="countdown-label">dias</div>
          </div>
          <div className="countdown-box">
            <div className="countdown-value">{countdown.hours}</div>
            <div className="countdown-label">horas</div>
          </div>
        </div>
      </header>

      {selectedDay ? (
        <DayCard day={selectedDay} data={gifts.find((item) => item.day === selectedDay)!} onBack={() => setSelectedDay(null)} onReceived={handleGiftReceived} />
      ) : (
        <>
          <Calendar onDaySelect={setSelectedDay} gifts={gifts} />
          <div className="reset-container">
            <button className="reset-button" onClick={handleResetAll}>
              Limpar Todos os Recebidos
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
