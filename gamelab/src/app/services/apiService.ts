import axios, {  AxiosError } from "axios";
import { Reservation } from "../models/reservationModel";

const apiClient = axios.create({
  baseURL: "http://localhost:5065/api", // Muista tarkistaa, että tämä osoite on oikein!
  timeout: 5000, //Aikakatkaisu
});

// Luo varauksen
export const createReservationApi = async (
  newReservation: Reservation
): Promise<Reservation> => {
  try {
    const response = await apiClient.post("/reservation", newReservation);
    return response.data;
  } catch (error) {    
    const err = error as AxiosError;
    throw new Error(`Error creating reservation: ${err.response?.data || err.message}`);
  }
};


