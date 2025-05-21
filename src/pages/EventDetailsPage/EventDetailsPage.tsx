import React from 'react';
import { useParams } from 'react-router-dom';
import { mockEvents } from '../../types/types';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import MapView from '../../components/MapView/MapView';
import styles from './EventDetailsPage.module.css';

const EventDetailsPage = () => {
  const { id } = useParams();
  const event = mockEvents.find(e => e.id === Number(id));

  if (!event) return <NotFoundPage />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{event.title}</h1>
        <img 
          src={event.image} 
          alt={event.title} 
          className={styles.mainImage}
        />
      </div>

      <div className={styles.section}>
        <div className={styles.infoBlock}>
          <h2>⏰ Время проведения</h2>
          <p>{event.date.toDateString()} в {event.time}</p>
        </div>

        <div className={styles.infoBlock}>
          <h2>📍 Место проведения</h2>
          <p>{event.location}</p>
        </div>
      </div>

      {event.description && (
        <div className={styles.section}>
          <h2>Описание</h2>
          <p className={styles.description}>{event.description}</p>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;