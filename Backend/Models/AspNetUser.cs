namespace GetAHotel.Models
{
    public class AspNetUser
    {
        public Guid Id { get; set; }
        public string UserName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string PasswordHash { get; set; } = default!;
        // navegación
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
        public ICollection<SavedLocation> SavedLocations { get; set; } = new List<SavedLocation>();

    }

}
