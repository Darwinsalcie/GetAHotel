import { useEffect, useState } from "react";
import { fetchHotelsAround } from "./services/hotelService";
import { HotelSideBarCard } from "./HotelSideBarCard";
import "./Sidebar.css";

export function Sidebar({onSelectHotel}) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchHotelsAround({ radius: 3000, lat: 18.4707478, lon: -69.9168466 })
      .then(setHotels)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleView = (hotel) => {
    onSelectHotel(hotel);   // en vez de console.log
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Hoteles cercanos</h2>

      {loading && <p className="sidebar__msg">Cargando hoteles…</p>}
      {!loading && hotels.length === 0 && (
        <p className="sidebar__msg">No hay hoteles cerca</p>
      )}

      <ul className="sidebar__list">
        {hotels.map((h) => (
          <li key={h.id} className="sidebar__item">
            <HotelSideBarCard hotel={h} onView={() => handleView(h)} />
          </li>
        ))}
      </ul>
    </aside>
  );
}