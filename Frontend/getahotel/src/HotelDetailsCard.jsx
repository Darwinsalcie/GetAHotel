export function HotelDetailsCard({ hotel }) {
  return (
    <article
      style={{
        padding: "1.5rem",
        background: "rgba(255,255,255,.3)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(0,0,0,.08)",
        borderRadius: 8,
        maxWidth: 360,
        fontSize: 14,
        lineHeight: 1.5,
        color: "#111",
      }}
    >
      <h2 style={{ margin: "0 0 .5rem", fontSize: 18 }}>{hotel.name}</h2>

      <address style={{ fontStyle: "normal", marginBottom: ".5rem" }}>
        {hotel.street} {hotel.houseNumber}, {hotel.city}
      </address>

      <p>
        Tel:{" "}
        <a href={`tel:${hotel.phoneNumber}`} style={{ color: "#005a9e" }}>
          {hotel.phoneNumber}
        </a>
        <br />
        Web:{" "}
        <a
          href={hotel.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#005a9e" }}
        >
          {hotel.website}
        </a>
      </p>
    </article>
  );
}