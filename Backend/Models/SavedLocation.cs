using System.ComponentModel.DataAnnotations.Schema;

namespace GetAHotel.Models
{
    public class SavedLocation
    {
        public int Id { get; set; }                       // PK identity
        public string LocationName { get; set; }          // Nombre de la ubicación

        [Column(TypeName = "decimal(18,8)")]
        public double Latitude { get; set; }             // Latitud (Decimal(10,8))

        [Column(TypeName = "decimal(18,8)")]
        public double Longitude { get; set; }            // Longitud (Decimal(11,8))
        public Guid UserId { get; set; }                  // FK → User.Id

        // Navegación a User
        public AspNetUser User { get; set; }
    }

}
