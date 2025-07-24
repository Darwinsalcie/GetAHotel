namespace GetAHotel.DTO
{
    public class HotelDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string? houseNumber { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Street { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Website { get; set; }

    }
}
