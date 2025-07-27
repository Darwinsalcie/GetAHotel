import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import L from 'leaflet';

// Configuración mínima del ícono por defecto (ajusta imports según tu bundler)
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function SearchControl({ onResult }) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const control = new GeoSearchControl({ provider, style: 'bar', showMarker: false });

    map.addControl(control);
    map.on('geosearch/showlocation', (e) => {
      const { x: lon, y: lat } = e.location;
      map.setView([lat, lon], 16);
      onResult({ lat, lon });
    });

    return () => {
      map.off('geosearch/showlocation');
      map.removeControl(control);
    };
  }, [map, onResult]);

  return null;
}

export default function MapWithSearch({ onPositionChange }) {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleResult = ({ lat, lon }) => {
    setMarkerPosition([lat, lon]);
    onPositionChange({ lat, lon });
  };

  return (
    <MapContainer
      center={[18.4707478, -69.9168466]}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <SearchControl onResult={handleResult} />
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>Ubicación seleccionada</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
