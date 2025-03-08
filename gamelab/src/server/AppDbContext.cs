using Microsoft.EntityFrameworkCore;
using gamelab.src.server.Models;

namespace gamelab.src.server
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }

        public DbSet<Reservations> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Määritellään tietokantataulut ja niiden väliset suhteet
            modelBuilder.Entity<UserModel>(entity =>
            {
                //entity.HasKey(e => e.Id);
                entity.HasMany(e => e.Reservations)
                    .WithOne(e => e.User)
                    .HasForeignKey(e => e.UserId);
                
            });

            modelBuilder.Entity<Reservations>();         
        }

    }


}
