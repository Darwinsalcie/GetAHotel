using GetAHotel.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace GetAHotel.Context
{
    public class AppDbContext : DbContext
    {
        //Heredamos de DbContext que es la abstraccion de una session con la db
        //Luego acá en el constructor pasamos un dbcontextoptions que es de tipo AppDecontext
        // y construimos el padre "DbContext" con esas options de tipo AppDcontext

        //:base sirve para pasar parametros al padre y construir el padre de una manera especifica


        /*DbcontexOptions
         es el objeto de configuración que le dice a Entity Framework Core cómo conectarse 
        y comportarse con la base de datos.
        Contiene toda la información necesaria para que el DbContext funcione
         */
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }



        public DbSet<AspNetUser> AspNetUsers { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<SavedLocation> SavedLocations { get; set; }    


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //Indice único en Email
            builder.Entity<AspNetUser>()
                .HasIndex(u => u.Email)
                .IsUnique();

            //relacion 1:N un usuario puede tener muchos Refresh tokens
            builder.Entity<RefreshToken>()
                .HasOne(rt => rt.User)
                .WithMany(u => u.RefreshTokens)
                .HasForeignKey(rt => rt.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            //Si se usa GUID como PK, y se quiere que ef genere el valor:
            builder.Entity<AspNetUser>()
                .Property(u => u.Id)
                .ValueGeneratedOnAdd();

            builder.Entity<RefreshToken>()
                .Property(u => u.Id)
                .ValueGeneratedOnAdd();


            // Relación uno a muchos: User → SavedLocations
            builder.Entity<SavedLocation>()
                .HasOne(sl => sl.User)
                .WithMany(u => u.SavedLocations)
                .HasForeignKey(sl => sl.UserId)
                .OnDelete(DeleteBehavior.Cascade);


        }

    }
}
