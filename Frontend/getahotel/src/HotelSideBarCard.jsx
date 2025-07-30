// src/components/HotelSideBarCard.jsx
export function HotelSideBarCard({ hotel, onView, onFocus }) {
  // Función para formatear la distancia
  const formatDistance = (distanciaEnKm) => {
    if (!distanciaEnKm && distanciaEnKm !== 0) return '';
    
    if (distanciaEnKm < 1) {
      // Si es menos de 1 km, mostrar en metros
      const metros = Math.round(distanciaEnKm * 1000);
      return `${metros}m`;
    } else {
      // Si es 1 km o más, mostrar en kilómetros
      return `${distanciaEnKm.toFixed(1)}km`;
    }
  };

  return (
    <article className="sidebar-card">
      <div className="sidebar-card__content">
        {/* Click en el nombre reposiciona el mapa */}
        <span 
          className="sidebar-card__name"
          onClick={onFocus}
          style={{ cursor: 'pointer' }}
        >
          {hotel.name}
        </span>
        
        {/* Mostrar distancia si está disponible */}
        {hotel.distanciaEnKm !== undefined && (
          <span className="sidebar-card__distance">
            {formatDistance(hotel.distanciaEnKm)}
          </span>
        )}
      </div>
      
      {/* Botón para ver detalles */}
      <button 
        className="sidebar-card__btn"
        onClick={onView}
      >
        Ver detalles
      </button>
    </article>
  );
}