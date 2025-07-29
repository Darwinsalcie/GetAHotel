// src/components/SaveLocationPopup.jsx
import { useState } from 'react';
import { createSavedLocation } from '../services/savedLocationService';
import './SaveLocationPopup.css';

export default function SaveLocationPopup({ position, onClose, onSaved }) {
  const [name, setName] = useState('');

  const save = async () => {
    if (!name.trim()) return;
    await createSavedLocation({
      locationName: name,
      latitude: position.lat,
      longitude: position.lon,
    });
    onSaved();
    onClose();
  };

  return (
    <div className="save-popup__overlay" onClick={onClose}>
      <div className="save-popup__card" onClick={(e) => e.stopPropagation()}>
        <h4>Guardar ubicación</h4>
        <input
          placeholder="Nombre del lugar"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <div className="save-popup__actions">
          <button onClick={save}>Guardar</button>
          <button onClick={onClose}>Descartar</button>
        </div>
      </div>
    </div>
  );
}