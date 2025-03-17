"use client";

import { Dialog } from "@headlessui/react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: { start: string; end: string } | null;
  reservationName: string;
  setReservationName: (name: string) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  handleSaveReservation: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  selectedTime,
  reservationName,
  setReservationName,
  userEmail,
  setUserEmail,
  selectedType,
  setSelectedType,
  handleSaveReservation
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      setReservationName("");
      setUserEmail("");
      setSelectedType("computer");
    }
  }, [isOpen]);

  if (!isOpen) return null; // 🔹 Varmistetaan, ettei modaali renderöidy turhaan

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-0 z-50">
      <Dialog.Panel className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        <Dialog.Title className="text-lg font-bold">Varaa aika</Dialog.Title>

        {selectedTime && (
          <p className="text-sm text-gray-600 mt-2">
            📅 <strong>{selectedTime.start}</strong> - <strong>{selectedTime.end}</strong>
          </p>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium">Varauksen nimi</label>
          <input
            type="text"
            value={reservationName}
            onChange={(e) => setReservationName(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            placeholder="Esim. Turnaus tai Workshop"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Sähköpostiosoite</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            placeholder="oma@esimerkki.com"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Varaustyyppi</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="computer">🖥 Varaa tietokone</option>
            <option value="room">🏠 Varaa koko tila</option>
          </select>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => {
              handleSaveReservation();
              onClose(); // 🔹 Varmistetaan, että modaali sulkeutuu tallennuksen jälkeen
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            📌 Tallenna varaus
          </button>
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            ❌ Peruuta
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
