// src/components/MapWithSearch.jsx
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useEffect } from 'react';
import L from 'leaflet';                        // <-- Importa L
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';



// custom icon (puedes cambiar la URL por la tuya)
const pinIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});


function SearchControl() {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const search = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: false,    // Ya no necesitamos el marcador por defecto
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
    });

    const onResult = (e) => {
      const { x: lon, y: lat, label } = e.location;

      // 1) Centrar el mapa
      map.setView([lat, lon], 16);

      // 2) Crear y abrir popup con lat/lon
      L.popup({ closeOnClick: true, autoClose: true })
       .setLatLng([lat, lon])
       .setContent(`<strong>${label}</strong><br/>Lat: ${lat.toFixed(6)}<br/>Lon: ${lon.toFixed(6)}`)
       .openOn(map);

      // 3) (opcional) enviar a tu backend
      // sendCoordinates({ lon, lat, label })
      //   .then(() => console.log('Coordenadas enviadas ✔'))
      //   .catch(console.error);
    };

    map.addControl(search);
    map.on('geosearch/showlocation', onResult);

    return () => {
      map.removeControl(search);
      map.off('geosearch/showlocation', onResult);
    };
  }, [map]);

  return null;
}

export default function MapWithSearch() {
  return (
    <MapContainer
      center={[40.7128, -74.006]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <SearchControl />
    </MapContainer>
  );
}
