namespace GetAHotel.DTO
{
    public class CreateSavedLocationDto
    {
        public string LocationName { get; set; } = default!;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
