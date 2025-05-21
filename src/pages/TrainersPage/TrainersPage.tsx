// pages/TrainersPage/TrainersPage.tsx
import React, { useMemo, useState } from 'react';
import TrainerCard from '../../components/TrainerCard/TrainerCard';
import { mockTrainers } from '../../types/types';
import Filters from '../../components/Filters/Filters';
import styles from './TrainersPage.module.css';

const TrainersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    selectedSports: [] as string[],
    minRating: 0,
  });

  const allSports = useMemo(() => 
    Array.from(new Set(mockTrainers.flatMap(t => t.sportTypes))), 
    []
  );

const filteredTrainers = useMemo(() => 
  mockTrainers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const hasSports = filters.selectedSports.length > 0 
      ? filters.selectedSports.every(s => t.sportTypes.includes(s))
      : true;
    return hasSports && matchesSearch && t.rating >= filters.minRating;
  }),
  [filters, searchQuery]
);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Наши тренеры</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Поиск по имени тренера..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <Filters 
        sportTypes={allSports}
        onFilterChange={(newFilters) => 
            setFilters({ 
            ...filters, 
            selectedSports: newFilters.selectedSports,
            minRating: newFilters.minRating
            })
        }
        />

      <div className={styles.grid}>
        {filteredTrainers.map(trainer => (
          <TrainerCard key={trainer.id} trainer={trainer} />
        ))}
      </div>
    </div>
  );
};

export default TrainersPage;