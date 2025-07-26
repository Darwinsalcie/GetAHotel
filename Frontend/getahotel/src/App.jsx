import { useState } from 'react';
import MapWithSearch from './components/MapWithSearch';
import { HotelCard } from './HotelCard';
import { Sidebar } from './Sidebar';
import './App.css';

export default function App() {
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <div className="app">
      {/* Sidebar flotante */}
      <Sidebar onSelectHotel={setSelectedHotel} />

      {/* Mapa ocupa todo el viewport */}
      <MapWithSearch />

      {/* Overlay de la tarjeta */}
      {selectedHotel && (
        <div className="overlay">
          <HotelCard hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
        </div>
      )}
    </div>
  );
}