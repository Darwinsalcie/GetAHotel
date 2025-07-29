import { useEffect, useState, useRef } from 'react';
import { fetchSavedLocations } from '../services/savedLocationService';
import './SavedLocationsModal.css';

export default function SavedLocationsModal({ onSelectLocation }) {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef(null);

  // Cerrar al click fuera
  useEffect(() => {
    const handleOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleOutside);
      return () => document.removeEventListener('mousedown', handleOutside);
    }
  }, [open]);

  const loadLocations = async () => {
    setLoading(true);
    try {
      const data = await fetchSavedLocations();
      setList(data);
    } catch {
      alert('No se pudieron cargar las ubicaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) loadLocations();
  }, [open]);

  return (
    <>
      <button
        className="saved-locations__trigger"
        onClick={() => setOpen(!open)}
        title="Ver ubicaciones guardadas"
      >
        📌
      </button>

      {open && (
        <div ref={panelRef} className="saved-locations__panel">
          <header className="saved-locations__header">
            <span>Ubicaciones guardadas</span>
            <button onClick={() => setOpen(false)}>×</button>
          </header>

          {loading && <p className="saved-locations__msg">Cargando…</p>}
          {!loading && list.length === 0 && (
            <p className="saved-locations__msg">Aún no guardaste ubicaciones</p>
          )}

          <ul className="saved-locations__list">
            {list.map((loc) => (
              <li key={loc.id}>
                <button
                  className="saved-locations__item"
                  onClick={() => {
                    onSelectLocation({
                      lat: loc.latitude,
                      lon: loc.longitude,
                      name: loc.locationName,
                    });
                    setOpen(false);
                  }}
                >
                  {loc.locationName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}