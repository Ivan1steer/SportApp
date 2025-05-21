// pages/TrainerDetailsPage/TrainerDetailsPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { mockTrainers } from '../../types/types';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import styles from './TrainerDetailsPage.module.css';

const TrainerDetailsPage = () => {
  const { id } = useParams();
  const trainer = mockTrainers.find(t => t.id === Number(id));

  if (!trainer) return <NotFoundPage />;

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <img 
          src={trainer.image} 
          alt={trainer.name}
          className={styles.avatar}
        />
        <div className={styles.profileInfo}>
          <h1 className={styles.name}>{trainer.name}</h1>
          <div className={styles.stats}>
            <div className={styles.rating}>★ {trainer.rating.toFixed(1)}</div>
            <div className={styles.experience}>Стаж: {trainer.experience} лет</div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Специализация</h2>
        <div className={styles.sports}>
          {trainer.sportTypes.map(sport => (
            <span key={sport} className={styles.sport}>{sport}</span>
          ))}
        </div>
      </div>

      {trainer.achievements && (
        <div className={styles.section}>
          <h2>Достижения</h2>
          <ul className={styles.achievements}>
            {trainer.achievements.map((a, i) => (
              <li key={i} className={styles.achievementItem}>
                <div className={styles.trophy}>🏆</div>
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.section}>
        <h2>Контакты</h2>
        <div className={styles.contacts}>
          <p>📞 +7 (912) 345-67-89</p>
          <p>📧 {trainer.name.split(' ')[0].toLowerCase()}@sportplatform.ru</p>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetailsPage;