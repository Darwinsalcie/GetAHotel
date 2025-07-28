// src/App.jsx
import { useState } from 'react';
import MapWithSearch from './components/MapWithSearch';
import { HotelCard } from './HotelCard';
import { Sidebar } from './Sidebar';
import './App.css';

export default function App() {
  // posición que viene de la barra (search)…
  const [searchPosition, setSearchPosition] = useState(null);
  // …y posición que viene del foco (hotel)
  const [focusPosition, setFocusPosition] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // dispara SOLO al buscar en la barra
  const handleSearch = ({ lat, lon }) => {
    setSearchPosition({ lat, lon });
    // limpiamos foco si había uno
    setFocusPosition(null);
  };

  // dispara SOLO al hacer clic en un hotel
  const handleFocusHotel = hotel => {
    setFocusPosition({ lat: hotel.latitude, lon: hotel.longitude });
  };

  // decide qué posición pasa al mapa:
  // — si hay foco (clic hotel), usamos esa  
  // — si no, usamos la última búsqueda
  const mapPosition = focusPosition || searchPosition;

  return (
    <div className="app">
      <Sidebar
        lat={searchPosition?.lat}
        lon={searchPosition?.lon}
        onSelectHotel={setSelectedHotel}
        onFocusHotel={handleFocusHotel}
      />

      <MapWithSearch
        position={mapPosition}
        onPositionChange={handleSearch}
      />

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
