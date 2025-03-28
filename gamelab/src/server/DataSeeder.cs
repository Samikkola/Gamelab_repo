using gamelab.src.server;
using gamelab.src.server.Models;
using Microsoft.EntityFrameworkCore;


/// <summary>
/// DataSeeder-luokka alustaa tietokannan esimerkkidatalla, 
/// jos tietokanta on tyhjillään. Se luo huoneen, tietokoneita ja käyttäjän.
/// </summary>
public static class DataSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (!await context.Rooms.AnyAsync())
        {
            var room = new Room { isAvailable = true };
            context.Rooms.Add(room);
            await context.SaveChangesAsync();
        }

        if (!await context.Computers.AnyAsync())
        {
            var room = await context.Rooms.FirstAsync();
            var computers = new List<Computer>
            {
                new Computer { RoomId = room.Id, Identifier = "PC-1", isAvailable = true },
                new Computer { RoomId = room.Id, Identifier = "PC-2", isAvailable = true },
                new Computer { RoomId = room.Id, Identifier = "PC-3", isAvailable = true },
                new Computer { RoomId = room.Id, Identifier = "PC-4", isAvailable = true },
                new Computer { RoomId = room.Id, Identifier = "PC-5", isAvailable = true },
                new Computer { RoomId = room.Id, Identifier = "PC-6", isAvailable = true },
            };

            context.Computers.AddRange(computers);
            await context.SaveChangesAsync();

        }

        if (!await context.Users.AnyAsync())
        {
            var testUser = new UserModel
            {
                Username = "Testikäyttäjä",
                Email = "testi@example.com",
                Role = UserRole.Student
            };
            context.Users.Add(testUser);
            await context.SaveChangesAsync();
        }

        Console.WriteLine("✅ Seeder: huone, koneet ja käyttäjä lisätty.");
    }
}