// src/services/geoService.js
const API_URL = '/api/search';   // cambia si tu endpoint es otro

export async function sendCoordinates({ lon, lat, label }) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lon, lat, label }),
  });

  if (!res.ok) {
    throw new Error('Error enviando coordenadas');
  }
  return res.json();
}