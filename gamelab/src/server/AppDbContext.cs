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

    //    protected override void OnModelCreating(ModelBuilder modelBuilder)
    //     {
    //         modelBuilder.Entity<UserModel>();
    //     }

    }

    
}
