using System.ComponentModel.DataAnnotations.Schema;

namespace GetAHotel.DTO
{
    public class SavedLocationDto
    {
        public int Id { get; set; }
        public string LocationName { get; set; } = default!;

        public double Latitude { get; set; }

        public double Longitude { get; set; }
    }
}
