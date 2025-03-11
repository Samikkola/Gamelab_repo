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
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Computer> Computers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Määritellään tietokantataulut ja niiden väliset suhteet
            modelBuilder.Entity<UserModel>()
                .HasMany(u => u.Reservation)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId);

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reservation)
                .HasForeignKey(r => r.UserId);  

            modelBuilder.Entity<Room>()
                .HasMany(r => r.Computers)
                .WithOne(c => c.Room)
                .HasForeignKey(c => c.RoomId);

            modelBuilder.Entity<Computer>()
                .HasOne(c => c.Room)
                .WithMany(r => r.Computers)
                .HasForeignKey(c => c.RoomId);
        }

    }


}
