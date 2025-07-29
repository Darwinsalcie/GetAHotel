using System.ComponentModel.DataAnnotations.Schema;

namespace GetAHotel.Models
{
    public class RefreshToken
    {
        public Guid Id { get; set; }

        // propiedad "RefreshToken" en la tabla, la llamamos RefreshTokenValue para evitar ambigüedad
        [Column("RefreshToken")]

        public string RefreshTokenValue { get; set; } = default!;
        public DateTime ExpiresAt { get; set; }
        public Guid UserId { get; set; }

        // navegación
        public AspNetUser User { get; set; } = default!;
    }
}
