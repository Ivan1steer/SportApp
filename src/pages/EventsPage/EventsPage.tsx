import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchEventsByDate, fetchEventDates } from '../../api';
import styles from './EventsPage.module.css';

const EventsPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [events, setEvents] = useState<any[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка доступных дат при монтировании
  useEffect(() => {
    const loadDates = async () => {
      try {
        const dates = await fetchEventDates();
        setAvailableDates(dates);
      } catch (err) {
        setError('Не удалось загрузить доступные даты');
        console.error(err);
      }
    };
    loadDates();
  }, []);

  // Загрузка событий при изменении даты
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEventsByDate(selectedDate);
        setEvents(data);
      } catch (err) {
        setError('Не удалось загрузить события');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [selectedDate]);

  // Генерация дат для календаря (15 дней)
  const dates = Array.from({ length: 15 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Афиша мероприятий</h1>

      {/* Календарь */}
      <div className={styles.calendar}>
        {dates.map(date => {
          const dateStr = date.toISOString().split('T')[0];
          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(dateStr)}
              className={`${styles.dateButton} ${
                dateStr === selectedDate ? styles.active : ''
              } ${
                availableDates.includes(dateStr) ? styles.hasEvents : ''
              }`}
            >
              <div className={styles.day}>
                {date.toLocaleDateString('ru', { weekday: 'short' })}
              </div>
              <div className={styles.number}>{date.getDate()}</div>
            </button>
          );
        })}
      </div>

      {/* Состояния загрузки и ошибки */}
      {loading && <div className={styles.loading}>Загрузка...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {/* Список событий */}
      <div className={styles.events}>
        {!loading && !error && (
          events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className={styles.eventCard}>
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className={styles.eventImage}
                />
                <Link to={`/events/${event.id}`} className={styles.link}>
                  <div className={styles.eventContent}>
                    <h3>{event.title}</h3>
                    <div className={styles.meta}>
                      <span>⏰ {event.time}</span>
                      <span>📍 {event.location}</span>
                    </div>
                    <p>{event.description}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className={styles.empty}>На эту дату мероприятий нет</div>
          )
        )}
      </div>
    </div>
  );
};

export default EventsPage;