namespace GetAHotel.DTO
{
    public class RegisterDto
    {
        /// <summary>Nombre completo del usuario.</summary>
        public string Name { get; set; }

        /// <summary>Correo electrónico (debe ser único).</summary>
        public string Email { get; set; }

        /// <summary>Contraseña en texto plano que luego se hasheará.</summary>
        public string Password { get; set; }
    }
}
