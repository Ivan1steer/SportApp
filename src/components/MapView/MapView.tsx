import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Organization } from '../../types/types';
import styles from './MapView.module.css';

interface MapViewProps {
  organizations: Organization[];
  staticMode?: boolean;
}

const MapView: React.FC<MapViewProps> = ({ organizations, staticMode = false }) => {
    const defaultState = {
        center: [organizations[0].location.lat, organizations[0].location.lng],
        zoom: staticMode ? 15 : 12
    };
    const getBalloonContent = (org: Organization) => `
    <div class="${styles.balloon}">
      <h3>${org.name}</h3>
      <p>📍 ${org.address}</p>
      <div class="${styles.balloonMeta}">
        <span>★ ${org.rating.toFixed(1)}</span>
        <span>${org.sportTypes.join(', ')}</span>
      </div>
      <a href="/organizations/${org.id}" class="${styles.balloonLink}">
        Подробнее →
      </a>
    </div>
  `;
  return (
    <div className={styles.mapContainer}>
      <YMaps query={{ apikey: '353099d7-9476-431f-a530-4248e146ae53' }}>
        <Map 
          defaultState={defaultState} 
          width="100%" 
          height="500px"
          options={{ restrictMapArea: staticMode, maxZoom: staticMode?15:undefined}}
        >
          {organizations.map((org) => (
            <Placemark
              key={org.id}
              geometry={[org.location.lat, org.location.lng]}
              properties={{
                balloonContent: getBalloonContent(org),
                hintContent: org.name
              }}
             options={{
                    preset: 'islands#blueSportIcon',
                    iconColor: '#e74c3c',
                    hideIconOnBalloonOpen: false
                }}
              modules={['geoObject.addon.balloon']}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};

export default MapView;