import { useState } from 'react';
import MapWithSearch from './components/MapWithSearch';
import { HotelCard } from './HotelCard';
import { Sidebar } from './Sidebar';
import './App.css';

export default function App() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [position, setPosition] = useState(null);

  return (
    <div className="app">
      {/* Sidebar flotante recibiendo lat y lon */}
      <Sidebar
        lat={position?.lat}
        lon={position?.lon}
        onSelectHotel={setSelectedHotel}
      />

      {/* Mapa ocupa todo el viewport y notifica cambios de posición */}
      <MapWithSearch onPositionChange={setPosition} />

      {/* Overlay de la tarjeta de hotel seleccionado */}
      {selectedHotel && (
        <div className="overlay">
          <HotelCard
            hotel={selectedHotel}
            onClose={() => setSelectedHotel(null)}
          />
        </div>
      )}
    </div>
  );
}
