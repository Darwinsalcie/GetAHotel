import { useState } from 'react';
import LoginButton from './components/loginButton';
import SavedLocationsModal from './components/SavedLocationsModal';
import MapWithSearch from './components/MapWithSearch';
import { HotelCard } from './HotelCard';
import { Sidebar } from './Sidebar';
import './App.css';

export default function App() {
  const [searchPosition, setSearchPosition] = useState(null);
  const [focusPosition, setFocusPosition] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isLogged, setIsLogged] = useState(() => !!localStorage.getItem('token'));

  const handleAuthChange = () => setIsLogged(!!localStorage.getItem('token'));

  const handleSearch = ({ lat, lon }) => {
    setSearchPosition({ lat, lon });
    setFocusPosition(null);
  };

  const handleFocusHotel = (hotel) =>
    setFocusPosition({ lat: hotel.latitude, lon: hotel.longitude });

  const handleSelectSaved = ({ lat, lon }) => {
    setSearchPosition({ lat, lon });
    setFocusPosition(null);
  };

  const mapPosition = focusPosition || searchPosition;

  return (
    <div className="app">
      <LoginButton onAuthChange={handleAuthChange} />

      {isLogged && <SavedLocationsModal onSelectLocation={handleSelectSaved} />}

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
          <HotelCard hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
        </div>
      )}
    </div>
  );
}