// src/components/MapWithSearch.jsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useEffect, useState } from 'react';
import 'leaflet-geosearch/dist/geosearch.css';
import './SearchBar.css';

import DefaultIcon from './DefaultIcon';
import { createSavedLocation } from '../services/savedLocationService';

function SearchControl({ onResult }) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const control = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: false,
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
    if (position) map.flyTo([position.lat, position.lon], 16, { duration: 0.5 });
  }, [map, position]);
  return null;
}

export default function MapWithSearch({ position, onPositionChange }) {
  const [name, setName] = useState('');

  const handleSave = async () => {
    const trimmed = name.trim();

    try {
      await createSavedLocation({
        locationName: trimmed,
        latitude: position.lat,
        longitude: position.lon,
      });
      setName('');
    } catch (err) {
      console.error(err);
    }
  };

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
            <Popup>
              <div className="save-popup">
                <p>Guarda esta ubicación:</p>
                <input
                  type="text"
                  placeholder="Nombre de la ubicación"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleSave}>Guardar</button>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
}
