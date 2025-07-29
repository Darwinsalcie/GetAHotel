import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  fetchSavedLocations,
  updateSavedLocation,
  deleteSavedLocation,
} from '../services/savedLocationService';
import './SavedLocationsModal.css';

// Componente para el menú contextual usando Portal
function ContextMenu({ isOpen, position, currentLoc, onEdit, onDelete, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('.saved-locations__menu')) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="saved-locations__menu"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <button onClick={() => onEdit(currentLoc)}>Editar</button>
      <button onClick={() => onDelete(currentLoc.id)}>Eliminar</button>
    </div>,
    document.body // Renderizar directamente en body
  );
}

export default function SavedLocationsModal({ onSelectLocation }) {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLoc, setCurrentLoc] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (open) loadLocations();
  }, [open]);

  const loadLocations = async () => {
    setLoading(true);
    try {
      const data = await fetchSavedLocations();
      setList(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (
        !panelRef.current?.contains(e.target) &&
        !triggerRef.current?.contains(e.target)
      ) {
        setOpen(false);
        setMenuOpen(false);
        setEditingId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const startEditing = (loc) => {
    setEditingId(loc.id);
    setEditingName(loc.locationName);
    setMenuOpen(false);
  };

  const saveEdit = async (id) => {
    const trimmed = editingName.trim();
    if (!trimmed) return;
    const original = list.find((l) => l.id === id);
    try {
      await updateSavedLocation(id, {
        locationName: trimmed,
        latitude: original.latitude,
        longitude: original.longitude,
      });
      setList((prev) =>
        prev.map((l) => (l.id === id ? { ...l, locationName: trimmed } : l))
      );
      setEditingId(null);
    } catch {
      // silent
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleDelete = async (id) => {
    try {
      await deleteSavedLocation(id);
      setList((prev) => prev.filter((l) => l.id !== id));
      setMenuOpen(false);
    } catch {
      // silent
    }
  };

  const onDotsClick = (loc, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calcular posición del menú (centrado respecto al botón)
    let x = rect.left + window.scrollX + (rect.width / 2);
    let y = rect.bottom + window.scrollY + 4;
    
    // Ajustar si se sale de la pantalla horizontalmente
    const menuWidth = 100;
    if (x + (menuWidth / 2) > viewportWidth - 10) {
      x = viewportWidth - menuWidth - 10;
    } else if (x - (menuWidth / 2) < 10) {
      x = menuWidth / 2 + 10;
    }
    
    // Ajustar si se sale de la pantalla verticalmente
    const menuHeight = 80;
    if (y + menuHeight > viewportHeight - 10) {
      y = rect.top + window.scrollY - menuHeight - 4;
    }
    
    setMenuPosition({ x, y });
    setCurrentLoc(loc);
    setMenuOpen((prevOpen) => !(prevOpen && currentLoc?.id === loc.id));
  };

  return (
    <>
      <button
        ref={triggerRef}
        className="saved-locations__trigger"
        onClick={() => setOpen((o) => !o)}
        title="Ver ubicaciones guardadas"
      >
        📌
      </button>

      {open && (
        <div ref={panelRef} className="saved-locations__panel">
          <header className="saved-locations__header">
            <span>Ubicaciones guardadas</span>
          </header>

          {loading && <p className="saved-locations__msg">Cargando…</p>}
          {!loading && list.length === 0 && (
            <p className="saved-locations__msg">Aún no guardaste ubicaciones</p>
          )}

          <div className="saved-locations__list-wrapper">
            <ul className="saved-locations__list">
              {list.map((loc) => (
                <li key={loc.id} className="saved-locations__row">
                  {editingId === loc.id ? (
                    <div className="saved-locations__edit-row">
                      <input
                        className="saved-locations__edit-input"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        autoFocus
                      />
                      <button
                        className="saved-locations__save-btn"
                        onClick={() => saveEdit(loc.id)}
                      >
                        Guardar
                      </button>
                      <button
                        className="saved-locations__cancel-btn"
                        onClick={cancelEdit}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <>
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

                      <button
                        className="saved-locations__menu-dots"
                        onClick={(e) => onDotsClick(loc, e)}
                        title="Más opciones"
                      >
                        ⋮
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Menú contextual renderizado como Portal */}
      <ContextMenu
        isOpen={menuOpen}
        position={menuPosition}
        currentLoc={currentLoc}
        onEdit={startEditing}
        onDelete={handleDelete}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}