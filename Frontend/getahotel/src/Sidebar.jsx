import { useEffect, useState } from "react";
import { fetchHotelsAround } from "./services/hotelService";
import { HotelSideBarCard } from "./HotelSideBarCard";
import "./Sidebar.css";

/**
 * Sidebar muestra una lista de hoteles alrededor de una coordenada dada.
 * @param {{ onSelectHotel: Function, lat: number, lon: number }} props
 */
export function Sidebar({ onSelectHotel, lat, lon }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lat == null || lon == null) {
      // No se tienen coordenadas, limpiamos lista
      setHotels([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetchHotelsAround({ radius: 3000, lat, lon })
      .then((list) => setHotels(list))
      .catch((err) => {
        console.error(err);
        setError('Error al cargar hoteles');
      })
      .finally(() => setLoading(false));
  }, [lat, lon]);

  const handleView = (hotel) => onSelectHotel(hotel);

  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Hoteles cercanos</h2>

      {loading && <p className="sidebar__msg">Cargando hoteles…</p>}
      {error && <p className="sidebar__msg sidebar__error">{error}</p>}
      {!loading && !error && hotels.length === 0 && (
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
