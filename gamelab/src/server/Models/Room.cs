

public class Room
{
    public int Id { get; set; }
    
    public int MaxComputers { get; set; } = 8; //Voidaan muokata tietokoneiden määrää

    public ICollection<Computer>? Computers { get; set; } //Huoneessa olevat tietokoneet

}