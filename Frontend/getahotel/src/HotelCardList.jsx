// components/HotelCardList.jsx
import { useEffect, useState } from 'react';
import { fetchHotelsAround } from './services/hotelService';
import { HotelCard } from './HotelCard';

export function HotelCardList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotelsAround({ radius: 5000, lat: 18.4707478, lon: -69.9168466 })
      .then(setHotels)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando hoteles...</p>;

  return (
    <>
      {hotels.length === 0 && <p>No hay hoteles cerca</p>}
      <ul>
        {hotels.map(h => (
          <HotelCard key={h.id} hotel={h} />
        ))}
      </ul>
    </>
  );
}