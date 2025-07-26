// src/components/MapWithSearch.jsx
import { MapContainer, TileLayer } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

// Control de búsqueda
function SearchControl() {
  const map = useMap();
  
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const search = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
    });

    const onResult = async (e) => {
      const { x: lon, y: lat, label } = e.location;
      map.setView([lat, lon], 16);

      try {
        await sendCoordinates({ lon, lat, label });
        console.log('Coordenadas enviadas ✔');
      } catch (err) {
        console.error(err);
      }
    };

    map.addControl(search);
    map.on('geosearch/showlocation', onResult);

    return () => 
      map.removeControl(search);
      map.off('geosearch/showlocation', onResult);
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