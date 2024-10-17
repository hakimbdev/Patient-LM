import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 0,
  lng: 0
};

const NearbyLocations: React.FC = () => {
  const { t } = useTranslation();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<google.maps.places.PlaceResult[]>([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    libraries: ['places']
  });

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const findNearbyPlaces = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          
          if (map) {
            const service = new google.maps.places.PlacesService(map);
            service.nearbySearch(
              {
                location: userPos,
                radius: 5000,
                type: ['pharmacy', 'hospital']
              },
              (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                  setNearbyPlaces(results);
                }
              }
            );
          }
        },
        () => {
          alert(t('locationError'));
        }
      );
    } else {
      alert(t('geolocationNotSupported'));
    }
  };

  return isLoaded ? (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('nearbyLocations')}</h2>
      <button
        onClick={findNearbyPlaces}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {t('findNearby')}
      </button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {userLocation && <Marker position={userLocation} />}
        {nearbyPlaces.map((place, index) => (
          place.geometry?.location && (
            <Marker
              key={index}
              position={{
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              }}
              title={place.name}
            />
          )
        ))}
      </GoogleMap>
      {nearbyPlaces.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">{t('nearbyPlaces')}</h3>
          <ul className="list-disc pl-5">
            {nearbyPlaces.map((place, index) => (
              <li key={index}>{place.name} - {place.vicinity}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : <div>{t('loading')}</div>;
};

export default NearbyLocations;