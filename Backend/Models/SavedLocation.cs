namespace GetAHotel.Models
{
    public class SavedLocation
    {
        public int Id { get; set; }                       // PK identity
        public string LocationName { get; set; }          // Nombre de la ubicación
        public decimal Latitude { get; set; }             // Latitud (Decimal(10,8))
        public decimal Longitude { get; set; }            // Longitud (Decimal(11,8))
        public Guid UserId { get; set; }                  // FK → User.Id

        // Navegación a User
        public AspNetUser User { get; set; }
    }

}
