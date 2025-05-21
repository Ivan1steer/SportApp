import React, { useState, useMemo, useEffect } from 'react';
import Filters from '../../components/Filters/Filters';
import SportCard from '../../components/SportCard/SportCard';
import MapView from '../../components/MapView/MapView';
import ViewToggle from '../../components/ViewToggle/ViewToggle';
import styles from './HomePage.module.css';
import { Organization } from '../../types/types';

const HomePage = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    selectedTags: [] as string[],
    selectedSports: [] as string[],
    minRating: 0,
  });
  
 useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.selectedTags.length) queryParams.append('tags', filters.selectedTags.join(','));
        if (filters.selectedSports.length) queryParams.append('sports', filters.selectedSports.join(','));
        if (filters.minRating) queryParams.append('minRating', filters.minRating.toString());
        
        const response = await fetch(`http://localhost:5000/api/organizations?${queryParams}`);
        const data = await response.json();
        setOrganizations(data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);
  
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
          className={styles.searchInput}
        />
      </div>
      <Filters 
        sportTypes={Array.from(new Set(organizations.flatMap(org => org.sportTypes)))} 
        tags={Array.from(new Set(organizations.flatMap(org => org.tags)))}
        onFilterChange={(newFilters) => setFilters({...filters, ...newFilters})}
      />
      <ViewToggle 
        viewMode={viewMode}
        onToggle={setViewMode}
      />

      {viewMode === 'list' ? (
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
              😕 Ничего не найдено. Попробуйте изменить фильтры.
            </div>
          )}
        </div>
      ) : (
        <MapView organizations={organizations} />
      )}
    </div>
  );
};

export default HomePage;