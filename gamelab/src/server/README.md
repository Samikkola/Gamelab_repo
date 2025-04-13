# Serverin rakenne

- `Controllers`: Kontrollerit, jotka hoitavat HTTP-pyyntöjen välittämisen Servicelle (CRUD-toiminnot).

-`Migrations` : Migraatio-tiedostot, jotka generoituvat automaattisesti migraatioita tehdessä

- `Models`: Mallit, jotka kuvastavat tietokannan tietomalleja.

- `Repositories`: Luokat, jotka vastaavat tietokannan kanssa kommunikoinnista. Hoitaa datan tallentamisen ja hakemisen.

- `Services`: Luokat, jotka vastaavat
  liiketoimintalogiikasta ja käsittelee pyynnöt jotka tulevat Controllerilta ja vie ne Repositorylle. Hoitaa mm. logiikan ja validoinnin.

- `AppDbContext.cs`: Luokka, joka vastaa tietokannan yhteydenpidosta.

- `appsettings.json`: Sovelluksen asetuksia
  

- `appsettings.Development.json`: Kehitystilan asteuksia.

- `DataSeeder.cs` : Joka luo tietokantaan datan ( huoneen, tietokoneet ja testikäyttäjän)

  - `Program.cs`: Täältä käynnistetään sovellus ja määritellään asetuksia.


# Tietokantayhteyden parametrit haetaan .env tiedostosta

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

***Tällä hetkellä varauksen tallentamien toimii siten, että userId on kovakoodattuna handeleSaveReservation -funktiossa Modal -komponentissa.
Mikäli tietokannassa ei kyseistä id:tä löydy, ei sovellus toimi. PgAdminilla voi tarkastaa mitä id:itä tietokanta sisältää.
Muistettava myös aina tarkistaa ConnectionString jotta tietokantaan saadaan yhteys
ja päivittää tietokanta dotnet ef database update -komennolla mikäli sovellus ei toimi.***
