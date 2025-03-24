# Serverin rakenne

- `Controllers`: Kontrollerit, jotka hoitavat HTTP-pyyntöjen välittämisen Servicelle.

-`Migrations` : Migraatio-tiedostot, jotka generoituvat automaattisesti migraatioita tehdessä

- `Models`: Mallit, jotka kuvastavat tietokannan tietomalleja.

- `Repositories`: Luokat, jotka vastaavat tietokannan kanssa kommunikoinnista. Hoitaa datan tallentamisen ja hakemisen (CRUD-toiminnot).

- `Services`: Luokat, jotka vastaavat
  liiketoimintalogiikasta ja käsittelee pyynnöt jotka tulevat Controllerilta ja vie ne Repositorylle. Hoitaa mm. logiikan ja validoinnin.

- `AppDbContext.cs`: Luokka, joka vastaa tietokannan yhteydenpidosta.

- `appsettings.json`: Sovelluksen asetuksia
  HUOM! Tämä menee githubiin

- `appsettings.Development.json`: Kehitystilan asteuksia, mm. ConnectionString
  HUOM! Tämä ei mene githubiin

  - `Program.cs`: Täältä käynnistetään sovellus ja määritellään asetuksia.

# Kehitystyötä tehdessä

Luotava appsettings.Developmnet.json tiedosto jonne

## TODO Muutetaan toimimaan .env tiedostosta

# Asennetut NuGet paketit:

Microsoft.EntityFrameworkCore - Pääpaketti
Npgsql.EntityFrameworkCore.PostgreSQL - Tuki PostgreSQl:lle
Microsoft.EntityFrameworkCore.Tools - Migraatiotyökalut

# Migraatio komennot

**dotnet ef migrations add InitialCreate**
Loi ensimmäisen migraation nimeltä InitialCreate
Aina tietokantamalleja muokattaessa tehtävä uusi migraatio

**dotnet ef database update**
Päivittää tietokannan viimeisimmällä migraatiolla

Kun tietokanta mallia on muokattu ja luodaan migraatioita, annetaan niille osuvat nimet jotta tiedetään mitä on muutettu, esim.
dotnet ef migrations add AddUserStatus
