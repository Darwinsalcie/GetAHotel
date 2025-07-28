// src/components/MapWithSearch.jsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useEffect } from 'react';
import 'leaflet-geosearch/dist/geosearch.css';

import DefaultIcon from './DefaultIcon';

function SearchControl({ onResult }) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const control = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: false
    });
    map.addControl(control);
    map.on('geosearch/showlocation', (e) => {
      const { x: lon, y: lat } = e.location;
      onResult({ lat, lon });
    });
    return () => {
      map.off('geosearch/showlocation');
      map.removeControl(control);
    };
  }, [map, onResult]);

  return null;
}

function Recenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lon], 16, { duration: 0.5 });
    }
  }, [map, position]);
  return null;
}

export default function MapWithSearch({ position, onPositionChange }) {
  return (
    <>
      <DefaultIcon />

      <MapContainer
        center={[18.4707478, -69.9168466]}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <SearchControl onResult={onPositionChange} />

        <Recenter position={position} />

        {position && (
          <Marker position={[position.lat, position.lon]}>
            <Popup>Ubicación seleccionada</Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
}
