import React, { useState } from 'react';
import { Organization } from '../../types/types';
import styles from './SportCard.module.css';
import { Link } from 'react-router-dom';

interface SportCardProps {
  key: number;
  org: Organization;
}

const SportCard: React.FC<SportCardProps> = ({ org }) => {
  const [currentImage, setCurrentImage] = useState(org.images[0]);

  const handleError = () => {
    setCurrentImage('./placeholder.jpg');
  };

  return (
    <div className={styles.card}>
      {/* Обложка */}
      <img 
        src={currentImage} 
        alt={org.name}
        className={styles.image}
        onError={handleError}
      />
      {/* Контент */}
      <div className={styles.content}>
        <Link to={`/organizations/${org.id}`} className={styles.link}>
        <h3 className={styles.title}>{org.name}</h3>
        <p className={styles.description}>{org.description}</p>
        {/* Теги */}
        <div className={styles.tags}>
          {org.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        {/* Рейтинг */}
        <div className={styles.rating}>
          ★ {org.rating.toFixed(1)}
        </div>
        </Link>
      </div>
    </div>
  );
};

export default SportCard;