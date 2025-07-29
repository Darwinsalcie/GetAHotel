namespace GetAHotel.DTO
{
    public class LoginDto
    {
        /// <summary>Correo electrónico con el que se registró el usuario.</summary>
        public string Email { get; set; }

        /// <summary>Contraseña en texto plano.</summary>
        public string Password { get; set; }
    }
}
