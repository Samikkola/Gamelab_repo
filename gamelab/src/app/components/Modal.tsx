"use client";

import { Dialog } from "@headlessui/react";
import { Reservation } from "../models/reservationModel";
import { createReservationApi } from "../services/apiService";
import { User } from "../models/userModel";
import { useMemo, useState } from "react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTimes: { start: string; end: string; id: string }[];
  setSelectedTimes: (times: { start: string; end: string; id: string }[]) => void;
  reservationName: string;
  setReservationName: (name: string) => void;
  computerId: number;
  setComputerId: (id: number) => void;
  fetchedEvents: {
    id: string;
    title: string;
    start: string;
    end: string;
    color: string;
    type?: "Computer" | "Room";
    computerId?: number;
  }[];
  fetchReservations: () => void; // 🔄 lisätty
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
  fetchedEvents,
  fetchReservations,
}: ModalProps) {
  const [reservationType, setReservationType] = useState<"Computer" | "Room">("Computer");

  const { availableComputers, canReserveRoom } = useMemo(() => {
    if (selectedTimes.length === 0) return { availableComputers: [], canReserveRoom: false };

    const selectedStart = new Date(selectedTimes[0].start);
    const selectedEnd = new Date(selectedTimes[selectedTimes.length - 1].end);

    const reservedComputerIds = new Set(
      fetchedEvents
        .filter((e) => {
          if (e.type !== "Computer") return false;
          const start = new Date(e.start);
          const end = new Date(e.end);
          return start < selectedEnd && end > selectedStart;
        })
        .map((e) => e.computerId)
    );

    const allComputers = [
      { id: 1, label: "PC-1" },
      { id: 2, label: "PC-2" },
      { id: 3, label: "PC-3" },
      { id: 4, label: "PC-4" },
      { id: 5, label: "PC-5" },
      { id: 6, label: "PC-6" },
    ];

    const availableComputers = allComputers.filter((c) => !reservedComputerIds.has(c.id));
    const canReserveRoom = availableComputers.length === allComputers.length;

    return { availableComputers, canReserveRoom };
  }, [selectedTimes, fetchedEvents]);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userJson = localStorage.getItem("user");
      const parsed = userJson ? JSON.parse(userJson) : null;
      setUser(parsed);
    }
  }, []);

  const handleSaveReservation = async () => {
    if (!reservationName || (reservationType === "Computer" && !computerId)) {
      alert("Täytä kaikki kentät!");
      return;
    }
    if (!user) {
      alert("Käyttäjätietoja ei löytynyt!");
      return;
    }

    const sortedTimes = [...selectedTimes].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    const newReservation: Reservation = {
      userId: user.id,
      description: reservationName,
      type: reservationType,
      startTime: sortedTimes[0].start,
      endTime: sortedTimes[sortedTimes.length - 1].end,
      computerId: reservationType === "Computer" ? computerId : undefined,
      roomId: reservationType === "Room" ? 1 : undefined,
    };

    try {
      await createReservationApi(newReservation);
      await fetchReservations(); // 🔄 päivitys
      setSelectedTimes([]);
      setReservationName("");
      setComputerId(0);
      onClose();
    } catch (error) {
      console.error("Varauksen tallentaminen epäonnistui:", error);
      alert("Varauksen tallentaminen epäonnistui. Yritä uudelleen.");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <Dialog.Panel className="bg-white p-6 rounded-lg w-96 shadow-lg relative text-black">
        <Dialog.Title className="text-lg font-bold">Varaa aika</Dialog.Title>

        <div className="text-sm text-gray-800 mt-2">
          📅 <strong>{(() => {
            if (selectedTimes.length === 0) return "";
            const sorted = [...selectedTimes].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
            const start = new Date(sorted[0].start);
            const end = new Date(sorted[sorted.length - 1].end);
            const dayFormatter = new Intl.DateTimeFormat("fi-FI", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });
            const timeFormatter = new Intl.DateTimeFormat("fi-FI", { hour: "2-digit", minute: "2-digit" });
            return `${dayFormatter.format(start)} Klo ${timeFormatter.format(start)}–${timeFormatter.format(end)}`;
          })()}</strong>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Varauksen nimi</label>
          <input
            type="text"
            value={reservationName}
            onChange={(e) => setReservationName(e.target.value)}
            className="w-full border p-2 rounded mt-1 text-black"
          />
        </div>

        {canReserveRoom && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Varaustyyppi</label>
            <div className="flex gap-4 text-black">
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Computer"
                  checked={reservationType === "Computer"}
                  onChange={() => setReservationType("Computer")}
                /> Tietokone
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Room"
                  checked={reservationType === "Room"}
                  onChange={() => setReservationType("Room")}
                /> Koko huone
              </label>
            </div>
          </div>
        )}

        {reservationType === "Computer" && (
          <div className="mt-4">
            <label className="block text-sm font-medium">Tietokone</label>
            <select
              value={computerId}
              onChange={(e) => setComputerId(Number(e.target.value))}
              className="w-full border p-2 rounded mt-1 text-black"
            >
              <option value="">Valitse tietokone</option>
              {availableComputers.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
        )}

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