// src/components/HotelSideBarCard.jsx
export function HotelSideBarCard({ hotel, onView, onFocus }) {
  return (
    <article className="sidebar-card">
      {/* Click en el nombre reposiciona el mapa */}
      <span 
        className="sidebar-card__name" 
        onClick={onFocus} 
        style={{ cursor: 'pointer' }}
      >
        {hotel.name}
      </span>

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
