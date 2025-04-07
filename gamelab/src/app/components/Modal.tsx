"use client";

import { Dialog } from "@headlessui/react";
import { Reservation } from "../models/reservationModel";
import { createReservationApi } from "../services/apiService";
import { User } from "../models/userModel";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTimes: { start: string; end: string; id: string }[];
  setSelectedTimes: (
    times: { start: string; end: string; id: string }[]
  ) => void;
  reservationName: string;
  setReservationName: (name: string) => void;
  computerId: number;
  setComputerId: (id: number) => void;
}

export default function Modal({
  isOpen,
  onClose,
  selectedTimes,
  setSelectedTimes,
  reservationName,
  setReservationName,
  computerId,
  setComputerId,
}: ModalProps) {

  const computers = [
    { id: 1, label: "PC-1" },
    { id: 2, label: "PC-2" },
    { id: 3, label: "PC-3" },
    { id: 4, label: "PC-4" },
    { id: 5, label: "PC-5" },
    { id: 6, label: "PC-6" },
  ];
  //Haetaan ja parsetaan käyttäjä localstoragesta TODO:pitää tehdä turvallisemmin
  const userJson = localStorage.getItem("user");
  const user: User | null = userJson ? JSON.parse(userJson) : null;
  const handleSaveReservation = async () => {
    if (!reservationName || !computerId) {
      alert("Täytä kaikki kentät!");
      return;
    }
    //Varmistetaan että aikajakso on järjestyksessä
    const sortedTimes = [...selectedTimes].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
    //Luodaan Reservation-objekti
    const newReservation: Reservation = {
      userId: user.id, //Käytetään user.id:tä localstoragesta
      description: reservationName,
      type: "Computer", //TODO, vaihdettava "Room" jos varataan huone
      startTime: sortedTimes[0].start,
      endTime: sortedTimes[sortedTimes.length - 1].end,
      computerId: computerId,
    };
    try {
      //Lähetetään varaus backendille
      const result = await createReservationApi(newReservation);
      console.log("Varaus onnistui:", result);
      alert("Varaus onnistui!");
      setSelectedTimes([]); // Tyhjennetään valitut ajat
      setReservationName(""); // Tyhjennetään varauksen nimi
      setComputerId(0); // Tyhjennetäan valittu tietokone
      onClose();
    } catch (error) { 
      console.error("Varauksen tallentaminen epäonnistui:", error);
      alert("Varauksen tallentaminen epäonnistui. Yritä uudelleen.");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
    >
      <Dialog.Panel className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        <Dialog.Title className="text-lg font-bold">Varaa aika</Dialog.Title>

        <div className="text-sm text-gray-600 mt-2">
          📅{" "}
          <strong>
            {(() => {
              if (selectedTimes.length === 0) return "";

              const sorted = [...selectedTimes].sort(
                (a, b) =>
                  new Date(a.start).getTime() - new Date(b.start).getTime()
              );
              const start = new Date(sorted[0].start);
              const end = new Date(sorted[sorted.length - 1].end);

              const dayFormatter = new Intl.DateTimeFormat("fi-FI", {
                weekday: "short",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
              const timeFormatter = new Intl.DateTimeFormat("fi-FI", {
                hour: "2-digit",
                minute: "2-digit",
              });

              const dateStr = dayFormatter.format(start); // esim. "ti 25.03.2025"
              const timeStr = `${timeFormatter.format(
                start
              )}–${timeFormatter.format(end)}`; // esim. "07.00–09.00"

              return `${dateStr} Klo ${timeStr}`;
            })()}
          </strong>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Varauksen nimi</label>
          <input
            type="text"
            value={reservationName}
            onChange={(e) => setReservationName(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Tietokone</label>
          <select
            value={computerId}
            onChange={(e) => setComputerId(Number(e.target.value))}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Valitse tietokone</option>
            {computers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            ❌ Peruuta
          </button>
          <button
            onClick={handleSaveReservation}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            📌 Tallenna varaus
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
