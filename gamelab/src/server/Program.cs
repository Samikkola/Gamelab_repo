
using System.Text.Json.Serialization;
using DotNetEnv;
using gamelab.Services;
using gamelab.src.server;
using gamelab.src.server.Services;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

//Tuodaan ympäristömuuttujat käyttöön
Env.Load();

//Lisätään kontrollerit ja Json sterilisaatio ( enum -> string)
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });


//Luodaan yhteys tietokantaan käyttäen ympäristömuuttujia
var connectionString = $"Server={Env.GetString("DB_HOST")};" +
                       $"Port={Env.GetString("DB_PORT")};" +
                       $"Database={Env.GetString("DB_NAME")};" +
                       $"Username={Env.GetString("DB_USER")};" +
                       $"Password={Env.GetString("DB_PASS")}";

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql(connectionString));
    

//Rekisteröidään palvelut (Depency Injection)
builder.Services.AddScoped<IReservationService, ReservationService>();
builder.Services.AddScoped<IReservationRepository, ReservationRepository>();


//Lisätään tuki swaggerilles
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Luodaan CORS säännöt
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
         });    
});

//Luodaan/rakennetaan WebApplication
var app = builder.Build();

//Luodaan tietokanta DataSeeder- tiedososta 
//ja alustetaan se, jos se ei ole vielä olemassa
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await DataSeeder.SeedAsync(context);
}


//Otetaan Swagger käyttöön kehitystilassa
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//Otetaan corskäytäntö käyttöön
app.UseCors("AllowAll");
//Luodaan endpointit kontrollereille
app.MapControllers();
//Käynnistetään sovellus
app.Run();




