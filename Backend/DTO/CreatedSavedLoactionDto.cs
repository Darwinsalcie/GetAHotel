namespace GetAHotel.DTO
{
    public class CreateSavedLocationDto
    {
        public string LocationName { get; set; } = default!;
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}
