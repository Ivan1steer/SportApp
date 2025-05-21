import React, { memo } from 'react';
import { Trainer } from '../../types/types';
import styles from './TrainerCard.module.css';
import { Link } from 'react-router-dom';

interface TrainerCardProps {
  trainer: Trainer;
}

const TrainerCard: React.FC<TrainerCardProps> = memo(({ trainer }) => (
  <article className={styles.card}>
    <img 
      src={trainer.image} 
      alt={trainer.name} 
      className={styles.image}
      loading="lazy"
    />
    
    <div className={styles.content}>
      <Link to={`/trainers/${trainer.id}`} className={styles.link}>
      <h3 className={styles.name}>{trainer.name}</h3>
      
      <div className={styles.sports}>
        {trainer.sportTypes.join(', ')}
      </div>

      <div className={styles.stats}>
        <div className={styles.rating}>
          ★ {trainer.rating.toFixed(1)}
        </div>
        <div className={styles.experience}>
          Стаж: {trainer.experience} лет
        </div>
      </div>

      {trainer.achievements && (
        <ul className={styles.achievements}>
          {trainer.achievements.map((a, i) => (
            <li key={i}>🏆 {a}</li>
          ))}
        </ul>
      )}
      </Link>
    </div>
    
  </article>
));

export default TrainerCard;