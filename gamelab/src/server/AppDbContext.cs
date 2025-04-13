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
           
            //UserModel <-> Reservation 1:n
            modelBuilder.Entity<UserModel>()
                .HasMany(u => u.Reservation)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);  // Poistetaan varaukset, jos käyttäjä poistetaan
           
            //Room <-> Computer 1:n
            modelBuilder.Entity<Room>()
                .HasMany(r => r.Computers)
                .WithOne(c => c.Room)
                .HasForeignKey(c => c.RoomId);
          
            // Computer <-> Reservation 1:n
            modelBuilder.Entity<Computer>()
                .HasMany(c => c.Reservations)
                .WithOne(r => r.Computer)
                .HasForeignKey(r => r.ComputerId);
           
            //Reservation <-> Computer 1:n
            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Computer)
                .WithMany(c => c.Reservations)
                .HasForeignKey(r => r.ComputerId);
            
            //Reservation <-> Room 1:n
            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Room)
                .WithMany()
                .HasForeignKey(r => r.RoomId);        
        }
    }
}
