import React, { useState, useEffect } from 'react';
import { Organization } from '../../types/types';
import styles from './Filters.module.css';

interface FiltersProps {
  sportTypes: string[];
  tags?: string[];
  onFilterChange: (filters: {
    selectedTags: string[];
    selectedSports: string[];
    minRating: number;
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ 
  sportTypes, 
  tags = [], 
  onFilterChange 
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);

  // Обработчик тегов
  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
  };

  // Обработчик видов спорта
  const handleSportToggle = (sport: string) => {
    const newSports = selectedSports.includes(sport)
      ? selectedSports.filter(s => s !== sport)
      : [...selectedSports, sport];
    setSelectedSports(newSports);
  };

  // Обработчик рейтинга
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinRating(Number(e.target.value));
  };

  // При любом изменении фильтров вызываем колбэк
  useEffect(() => {
    onFilterChange({ 
      selectedTags, 
      selectedSports, 
      minRating 
    });
  }, [selectedTags, selectedSports, minRating]);

  return (
    <div className={styles.filtersWrapper}>
      {/* Фильтр по тегам */}
      {tags.length > 0 && (
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Удобства</h3>
        <div className={styles.buttonsContainer}>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`${styles.filterButton} ${
                selectedTags.includes(tag) ? styles.active : ''
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
      )}
      {/* Фильтр по видам спорта */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Направления</h3>
        <div className={styles.buttonsContainer}>
          {sportTypes.map(sport => (
            <button
              key={sport}
              onClick={() => handleSportToggle(sport)}
              className={`${styles.filterButton} ${
                selectedSports.includes(sport) ? styles.active : ''
              }`}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      {/* Фильтр по рейтингу */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Минимальный рейтинг</h3>
        <div className={styles.ratingFilter}>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={minRating}
            onChange={handleRatingChange}
            className={styles.rangeInput}
          />
          <div className={styles.ratingValue}>
            {minRating.toFixed(1)} ★
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;