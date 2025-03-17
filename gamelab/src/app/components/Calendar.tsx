"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Dialog } from "@headlessui/react";
import { v4 as uuidv4 } from "uuid";


export default function CalendarComponent() {
  const [selectedTimes, setSelectedTimes] = useState<{ start: string; end: string; id: string }[]>([]);
  const [reservationName, setReservationName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const events = [
    { title: "Tietokone varattu", start: "2025-03-04T10:00:00", end: "2025-03-04T11:00:00", color: "blue", id: uuidv4() },
    { title: "Koko tila varattu", start: "2025-03-05T13:00:00", end: "2025-03-05T14:00:00", color: "red", id: uuidv4() }
  ];

  // 🔹 Klikkaamalla tuntia se lisätään
  const handleDateClick = (clickInfo: DateClickArg) => {
    const selectedStart = new Date(clickInfo.date).toISOString();
    const selectedEnd = new Date(new Date(selectedStart).getTime() + 60 * 60 * 1000).toISOString(); // +1 tunti

    setSelectedTimes(prevTimes => {
      if (prevTimes.some(time => time.start === selectedStart)) {
        return prevTimes; // Jos jo valittu, ei lisätä uudestaan
      }
      if (prevTimes.length >= 4) {
        alert("Et voi varata yli 4 tuntia!");
        return prevTimes;
      }
      return [...prevTimes, { start: selectedStart, end: selectedEnd, id: uuidv4() }];
    });
  };

  // 🔹 Poistoruksi, joka poistaa valinnan
  const handleDeleteClick = (id: string) => {
    setSelectedTimes(prevTimes => prevTimes.filter(time => time.id !== id));
  };

  return (
    <div className="relative p-6 bg-white shadow-md rounded-lg mx-auto" style={{ maxWidth: "1200px" }}>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Varauskalenteri</h2>

      {selectedTimes.length > 0 && (
        <div className="absolute top-2 right-4 z-50">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
          >
            ✅ Varaa valittu aika
          </button>
        </div>
      )}

      <div className="border border-black border-width p-3 rounded-lg overflow-hidden mx-auto relative" style={{ width: "1100px", height: "650px" }}>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          dateClick={handleDateClick}
          firstDay={1} // 🔹 Kalenteri alkaa maanantaista
          events={[
            ...events,
            ...selectedTimes.map(time => ({
              title: `Valittu aika ❌`,
              start: time.start,
              end: time.end,
              color: "green",
              id: time.id
            }))
          ]}
          eventClick={(info) => {
            const eventId = info.event.id;
            handleDeleteClick(eventId);
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridDay,timeGridWeek"
          }}
          slotMinTime="07:00"
          slotMaxTime="18:00"
          height="auto"
          contentHeight="auto"
          slotDuration="01:00:00"
          selectMirror={true}
          editable={true}
          allDaySlot={false}
        />
 {/* 🔹 Tässä oikea tapa lisätä CSS JSX:ssä */}
<style jsx>{`
  :global(.fc-timegrid-slot) {
    height: 47px !important;
    color: black !important;
  }

  :global(.fc-toolbar-title),  /* 🔹 Aikajakso esim. "Mar 16 – 22, 2025" */
  :global(.fc-col-header-cell-cushion) {  /* 🔹 Päivämäärien teksti esim. "Mon, Tue, Wed" */
    color: black !important;
  }
`}</style>

      </div>

      {/* 🔹 Varausmodaali */}
     {/* 🔹 Varausmodaali */} 
<Dialog 
  open={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
>
  <Dialog.Panel className="bg-white p-6 rounded-lg w-96 shadow-lg relative z-50">
    <Dialog.Title className="text-lg font-bold">Varaa aika</Dialog.Title>

    <div className="text-sm text-gray-600 mt-2">
      📅 <strong>{selectedTimes.map(time => `${time.start} - ${time.end}`).join(", ")}</strong>
    </div>

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

    <div className="mt-6 flex justify-between">
      <button 
        onClick={() => setIsModalOpen(false)} 
        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
      >
        ❌ Peruuta
      </button>
      <button 
        onClick={() => {
          console.log("Varaus tallennettu:", { reservationName, userEmail, selectedTimes });
          setIsModalOpen(false);
          setSelectedTimes([]); // Tyhjennetään valitut ajat varauksen jälkeen
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        📌 Tallenna varaus
      </button>
    </div>
  </Dialog.Panel>
</Dialog>
    </div>
  );
}
