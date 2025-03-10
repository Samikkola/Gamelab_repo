# Serverin rakenne

Serverin rakenne on seuraava:

* `Program.cs`: Täältä käynnistetään sovellus ja määritellään asetuksia.
* `Models`: Mallit, jotka kuvastavat tietokannan tietomalleja.
* `AppDbContext.cs`: Luokka, joka vastaa tietokannan yhteydenpitoa.
* `Controllers`: Kontrollerit, jotka hoitavat pyyntöjen käsittelyn.
* `appsettings.json`: Sovelluksen asetuksia mm. DefaultConnection
* `appsettings.Development.json`: Kehitystilan asteuksia

# Asennetut NuGet paketit:

Microsoft.EntityFrameworkCore - Pääpaketti
Npgsql.EntityFrameworkCore.PostgreSQL - Tuki PostgreSQl:lle
Microsoft.EntityFrameworkCore.Tools - Migraatiotyökalut 

