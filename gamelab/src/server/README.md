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
