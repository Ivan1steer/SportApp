import React, { useState, useEffect } from 'react';
import TrainerCard from '../../components/TrainerCard/TrainerCard';
import Filters from '../../components/Filters/Filters';
import { fetchTrainers, fetchTrainerSports } from '../../api';
import styles from './TrainersPage.module.css';

const TrainersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    selectedSports: [] as string[],
    minRating: 0,
  });
  const [trainers, setTrainers] = useState<any[]>([]);
  const [allSports, setAllSports] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка видов спорта при монтировании
  useEffect(() => {
    const loadSports = async () => {
      try {
        const sports = await fetchTrainerSports();
        setAllSports(sports);
      } catch (err) {
        setError('Не удалось загрузить виды спорта');
        console.error(err);
      }
    };
    loadSports();
  }, []);

  // Загрузка тренеров при изменении фильтров
  useEffect(() => {
    const loadTrainers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTrainers({
          search: searchQuery,
          sports: filters.selectedSports,
          minRating: filters.minRating
        });
        setTrainers(data);
      } catch (err) {
        setError('Не удалось загрузить тренеров');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTrainers();
  }, [filters, searchQuery]);

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

      {loading && <div className={styles.loading}>Загрузка...</div>}
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        {trainers.map(trainer => (
          <TrainerCard key={trainer.id} trainer={trainer} />
        ))}
      </div>
    </div>
  );
};

export default TrainersPage;