// src/components/DefaultIcon.js
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function DefaultIcon() {
  useEffect(() => {
    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    // Aplica globalmente
    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  return null;
}
