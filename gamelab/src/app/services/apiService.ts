import axios, { AxiosError } from "axios";
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
    throw new Error(
      `Error creating reservation: ${err.response?.data || err.message}`
    );
  }
};

//Luodaan uusi käyttäjä (register)
export const createUserApi = async (userData: {
  email: string;
  username: string;
}) => {
  try {
    const response = await apiClient.post("/user", userData, {});
    return response.data;
  } catch (error) {
    console.error("❌ Virhe käyttäjän luonnissa:", error);
    throw error;
  }
};

// Pyydetään kirjautumiskoodi (login)
export const requestLoginCodeApi = async (
  email: string
): Promise<{
  id: number;
  email: string;
  username: string;
  oneTimeCode: string;
}> => {
  try {
    const response = await apiClient.post("/user/request-code",email, {
       headers: {
         "Content-Type": "application/json",
       },
    });
    return response.data;
  } catch (error) {
    console.error("requestLoginCodeApi error:", error);
    throw new Error(`Käyttäjää ei löydetty: ${error}`);
  }
};
