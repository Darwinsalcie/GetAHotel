namespace GetAHotel.DTO
{
    public class SavedLocationDto
    {
        public int Id { get; set; }
        public string LocationName { get; set; } = default!;
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}
