// src/components/LeafletMap.jsx
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';   // estilos base de Leaflet

export default function LeafletMap() {
  return (
    <>
    <MapContainer
      center={[40.7128, -74.006]} // NYC
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
    </MapContainer>


    </>
  );
}