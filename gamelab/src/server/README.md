# Serverin rakenne

Serverin rakenne on seuraava:

- `Program.cs`: Täältä käynnistetään sovellus ja määritellään asetuksia.
- `Models`: Mallit, jotka kuvastavat tietokannan tietomalleja.
- `AppDbContext.cs`: Luokka, joka vastaa tietokannan yhteydenpitoa.
- `Controllers`: Kontrollerit, jotka hoitavat pyyntöjen käsittelyn.

- `appsettings.json`: Sovelluksen asetuksia
  HUOM! Tämä menee githubiin

- `appsettings.Development.json`: Kehitystilan asteuksia  
   HUOM! Tämä ei mene githubiin 

# Kehitystyötä tehdessä

Luotava appsettings.Developmnet.json tiedosto jonne tehtävä .env tiedostosta löytyvä DefaultConnection.
## TODO Muutetaan toimimaan suoraan .env tiedostosta ##

# Asennetut NuGet paketit:

Microsoft.EntityFrameworkCore - Pääpaketti
Npgsql.EntityFrameworkCore.PostgreSQL - Tuki PostgreSQl:lle
Microsoft.EntityFrameworkCore.Tools - Migraatiotyökalut


# Migraatio komennot joita käytetty

dotnet ef migrations add InitialCreate
Loi ensimmäisen migraation nimeltä InitialCreate

dotnet ef database update
Päivittää tietokannan viimeisimmällä migraatiolla

Kun tietokanta mallia on muokattu ja luodaan migraatioita, annetaan niille osuvat nimet jotta tiedetään mitä on muutettu, esim.
dotnet ef migrations add AddUserStatus
