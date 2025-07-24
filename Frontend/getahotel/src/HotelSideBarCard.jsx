export function HotelSideBarCard({ hotel, onView }) {
  return (
    <article className="sidebar-card">
      <span className="sidebar-card__name">{hotel.name}</span>
      <button className="sidebar-card__btn" onClick={onView}>
        Ver detalles
      </button>
    </article>
  );
}