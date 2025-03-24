"use client";

import { Dialog } from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTimes: { start: string; end: string; id: string }[];
  setSelectedTimes: (times: { start: string; end: string; id: string }[]) => void;
  reservationName: string;
  setReservationName: (name: string) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
}

export default function Modal({
  isOpen,
  onClose,
  selectedTimes,
  setSelectedTimes,
  reservationName,
  setReservationName,
  userEmail,
  setUserEmail
}: ModalProps) {
  const handleSaveReservation = () => {
    if (!reservationName || !userEmail) {
      alert("Täytä kaikki kentät!");
      return;
    }

    console.log("Varaus tallennettu:", { reservationName, userEmail, selectedTimes });

    setSelectedTimes([]); // Tyhjennetään valitut ajat
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <Dialog.Panel className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        <Dialog.Title className="text-lg font-bold">Varaa aika</Dialog.Title>

        <div className="text-sm text-gray-600 mt-2">
  📅 <strong>
    {(() => {
      if (selectedTimes.length === 0) return "";

      const sorted = [...selectedTimes].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
      const start = new Date(sorted[0].start);
      const end = new Date(sorted[sorted.length - 1].end);

      const dayFormatter = new Intl.DateTimeFormat("fi-FI", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });
      const timeFormatter = new Intl.DateTimeFormat("fi-FI", { hour: "2-digit", minute: "2-digit" });

      const dateStr = dayFormatter.format(start); // esim. "ti 25.03.2025"
      const timeStr = `${timeFormatter.format(start)}–${timeFormatter.format(end)}`; // esim. "07.00–09.00"

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
          <label className="block text-sm font-medium">Sähköpostiosoite</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="mt-6 flex justify-between">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">❌ Peruuta</button>
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
