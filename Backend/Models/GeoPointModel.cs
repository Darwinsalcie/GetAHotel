namespace GetAHotel.Models
{
    public class GeoPointModel
    {
        public GeoPointModel(double lat, double lon)
        {
            Latitude = lat;
            Longitude = lon;
        }

        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }

}
