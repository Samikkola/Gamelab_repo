
using gamelab.src.server;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Lisätään kontrollerit
builder.Services.AddControllers();

//Luodaan yhteys tietokantaan
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql(connectionString));

//Lisätään tuki swaggerille
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




