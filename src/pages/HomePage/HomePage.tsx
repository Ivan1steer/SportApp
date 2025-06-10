import React, { useState, useEffect } from 'react';
import Filters from '../../components/Filters/Filters';
import SportCard from '../../components/SportCard/SportCard';
import MapView from '../../components/MapView/MapView';
import ViewToggle from '../../components/ViewToggle/ViewToggle';
import { fetchOrganizations, fetchFiltersData } from '../../api';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    selectedTags: [] as string[],
    selectedSports: [] as string[],
    minRating: 0,
  });
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [allSportTypes, setAllSportTypes] = useState<string[]>([]);

  // Загрузка данных фильтров при монтировании
  useEffect(() => {
    const loadFiltersData = async () => {
      try {
        const { allTags, allSportTypes } = await fetchFiltersData();
        setAllTags(allTags);
        setAllSportTypes(allSportTypes);
      } catch (err) {
        setError('Не удалось загрузить данные фильтров');
        console.error(err);
      }
    };

    loadFiltersData();
  }, []);

  // Загрузка организаций при изменении фильтров или поискового запроса
  useEffect(() => {
    const loadOrganizations = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchOrganizations({
          search: searchQuery,
          tags: filters.selectedTags,
          sports: filters.selectedSports,
          minRating: filters.minRating
        });
        setOrganizations(data);
      } catch (err) {
        setError('Не удалось загрузить организации');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrganizations();
  }, [filters, searchQuery]);

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <Filters 
        sportTypes={allSportTypes} 
        tags={allTags} 
        onFilterChange={setFilters}
      />

      <ViewToggle 
        viewMode={viewMode}
        onToggle={setViewMode}
      />

      {loading && <div className={styles.loading}>Загрузка...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {!loading && !error && (viewMode === 'list' ? (
        <div className={styles.listContainer}>
          {organizations.length > 0 ? (
            organizations.map(org => (
              <SportCard 
                key={org.id} 
                org={org} 
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              😕 Ничего не найдено. Попробуйте изменить параметры поиска или фильтры.
            </div>
          )}
        </div>
      ) : (
        <MapView organizations={organizations} />
      ))}
    </div>
  );
};

export default HomePage;