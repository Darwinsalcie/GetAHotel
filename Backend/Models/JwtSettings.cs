namespace GetAHotel.Models
{
    public class JwtSettings
    {
        public string Key { get; set; }         // Clave secreta
        public string Issuer { get; set; }      // Emisor
        public string Audience { get; set; }    // Audiencia
        public int ExpirationMinutes { get; set; } = 60;
    }

}
