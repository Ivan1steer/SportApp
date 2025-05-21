// pages/EventsPage/EventsPage.tsx
import React, { useState } from 'react';
import { mockEvents } from '../../types/types';
import styles from './EventsPage.module.css';
import { Link } from 'react-router-dom';

const EventsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Генерация дат для календаря (7 дней)
  const dates = Array.from({ length: 15 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Фильтрация событий по выбранной дате
  const filteredEvents = mockEvents.filter(event => 
      event.date.getFullYear() === selectedDate.getFullYear() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getDate() === selectedDate.getDate()
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Афиша мероприятий</h1>

      {/* Календарь */}
      <div className={styles.calendar}>
        {dates.map(date => (
          <button
            key={date.toISOString()}
            onClick={() => setSelectedDate(date)}
            className={`${styles.dateButton} ${
              date.toDateString() === selectedDate.toDateString() 
                ? styles.active 
                : ''
            }`}
          >
            <div className={styles.day}>{date.toLocaleDateString('ru', { weekday: 'short' })}</div>
            <div className={styles.number}>{date.getDate()}</div>
          </button>
        ))}
      </div>

      {/* Список событий */}
      <div className={styles.events}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
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
        )}
      </div>
    </div>
  );
};

export default EventsPage;