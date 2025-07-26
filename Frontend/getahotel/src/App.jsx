import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { HotelCard } from './HotelCard';   // nuevo componente
import './App.css';

function App() {
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <div className="app">
      <Sidebar onSelectHotel={setSelectedHotel} />

      {selectedHotel && (
        <div className="overlay">
          <HotelCard hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
        </div>
      )}
    </div>
  );
}

export default App;