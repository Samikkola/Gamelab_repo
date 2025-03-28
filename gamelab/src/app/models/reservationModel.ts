
// ReservationModel.ts
// Tämä tiedosto määrittelee varauksen mallin, 
// joka sisältää varauksen tiedot ja tyypit.


export type ReservationType = "Computer" | "Room";

export interface Reservation {
    id?: number; // Backend generoi tämän automaattisesti
    userId: number;
    description?: string;
    computerId?: number; // Jos varaus on tietokoneelle
    roomId?: number; // Jos varaus on huoneelle
    type: ReservationType; // "Computer" tai "Room"
    startTime: string; // Frontendissä DateTimeOffset tulee yleensä lähettää ja vastaanottaa string-muodossa (ISO 8601)
    endTime: string;
}