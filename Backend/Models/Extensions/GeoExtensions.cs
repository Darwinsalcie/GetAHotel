namespace GetAHotel.Models.Extensions
{
    public static class GeoExtensions
    {
        public static double DistanciaHaversineA(this GeoPointModel origen, GeoPointModel destino)
        {
            double R = 6371.0; // Radio de la Tierra en km
            double dLat = GradosARadianes(destino.Latitude - origen.Latitude);
            double dLon = GradosARadianes(destino.Longitude - origen.Longitude);

            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                       Math.Cos(GradosARadianes(origen.Latitude)) * Math.Cos(GradosARadianes(destino.Latitude)) *
                       Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            return R * c;
        }

        private static double GradosARadianes(double grados)
        {
            return grados * Math.PI / 180;
        }
    }

}
