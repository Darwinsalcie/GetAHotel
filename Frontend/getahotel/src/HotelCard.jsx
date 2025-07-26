import './HotelCard.css';

export function HotelCard({ hotel, onClose }) {
  return (
    <div className="hotel-card">
      <button className="hotel-card__close" onClick={onClose}>✕</button>
      <h2>{hotel.name}</h2>
      <p>
        {hotel.street && (
          <>
            <span className="boldProperties">Calle:</span> {hotel.street}
          </>
        )}
      </p>

      <p>
        {hotel.houseNumber && (
          <>
            <span className="boldProperties">Número del local:</span> {hotel.houseNumber}
          </>
        )}
      </p>

      <p>
        {hotel.phoneNumber && (
          <>
            <span className="boldProperties">Tel:</span> {hotel.phoneNumber}
          </>
        )}
      </p>

      <p>
        {hotel.city && (
          <>
            <span className="boldProperties">Ciudad:</span> {hotel.city}
          </>
        )}
      </p>

      <p>
        {hotel.website && (
          <>
            <span className="boldProperties">Sitio web:</span>{' '}
            <a href={hotel.website} target="_blank" rel="noopener noreferrer">
              Clic aquí para ir al sitio web
            </a>
          </>
        )}
  </p>
    </div>
  );
}