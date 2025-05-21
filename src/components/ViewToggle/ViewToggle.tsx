import React from 'react';
import styles from './ViewToggle.module.css';

interface ViewToggleProps {
  viewMode: 'list' | 'map';
  onToggle: (mode: 'list' | 'map') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onToggle }) => {
  return (
    <div className={styles.toggleWrapper}>
      <button
        onClick={() => onToggle('list')}
        className={`${styles.toggleButton} ${
          viewMode === 'list' ? styles.active : ''
        }`}
      >
        Список
      </button>
      <button
        onClick={() => onToggle('map')}
        className={`${styles.toggleButton} ${
          viewMode === 'map' ? styles.active : ''
        }`}
      >
        Карта
      </button>
    </div>
  );
};

export default ViewToggle;