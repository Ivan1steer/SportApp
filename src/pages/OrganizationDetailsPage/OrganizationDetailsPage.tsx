import React from 'react';
import { useParams } from 'react-router-dom';
import { mockOrganizations } from '../../types/types';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import styles from './OrganizationDetailsPage.module.css';
import MapView from '../../components/MapView/MapView';

const OrganizationDetailsPage = () => {
  const { id } = useParams();
  const organization = mockOrganizations.find(org => org.id === Number(id));

  if (!organization) return <NotFoundPage />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{organization.name}</h1>
      
      {/* Галерея изображений */}
      <div className={styles.gallery}>
        {organization.images.map((img, index) => (
          <img 
            key={index}
            src={img}
            alt={`Фото ${index + 1}`}
            className={styles.image}
          />
        ))}
      </div>

      {/* Основная информация */}
      <div className={styles.section}>
        <div className={styles.rating}>★ {organization.rating.toFixed(1)}</div>
        <p className={styles.address}>📍 {organization.address}</p>
        <div className={styles.tags}>
          {organization.tags.map(tag => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>
      </div>

      {/* Тарифы */}
      <div className={styles.section}>
        <h2>Тарифы</h2>
        <div className={styles.tariffs}>
          {organization.tariffs.map((tariff, index) => (
            <div key={index} className={styles.tariffCard}>
              <h3>{tariff.name}</h3>
              <p className={styles.price}>{tariff.price} ₽</p>
              <p>{tariff.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Карта */}
      <div className={styles.section}>
        <h2>Расположение</h2>
        <div className={styles.mapContainer}>
          <MapView organizations={[organization]} staticMode />
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetailsPage;