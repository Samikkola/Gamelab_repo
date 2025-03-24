"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal"; // 🔹 Nyt modaali on erillinen komponentti

export default function CalendarComponent() {
  const [selectedTimes, setSelectedTimes] = useState<{ start: string; end: string; id: string }[]>([]);
  const [reservationName, setReservationName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const events = [
    { title: "Tietokone varattu", start: "2025-03-04T10:00:00", end: "2025-03-04T11:00:00", color: "blue", id: uuidv4() },
    { title: "Koko tila varattu", start: "2025-03-05T13:00:00", end: "2025-03-05T14:00:00", color: "red", id: uuidv4() }
  ];

  const handleDateClick = (clickInfo: DateClickArg) => {
    const selectedStart = new Date(clickInfo.date).toISOString();
    const selectedEnd = new Date(new Date(selectedStart).getTime() + 60 * 60 * 1000).toISOString();

    setSelectedTimes(prevTimes => {
      if (prevTimes.some(time => time.start === selectedStart)) return prevTimes;
      if (prevTimes.length >= 4) {
        alert("Et voi varata yli 4 tuntia!");
        return prevTimes;
      }
    
      const newSlot = { start: selectedStart, end: selectedEnd, id: uuidv4() };
    
      if (prevTimes.length === 0) {
        return [newSlot];
      }
    
      const sortedTimes = [...prevTimes].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
      const first = sortedTimes[0];
      const last = sortedTimes[sortedTimes.length - 1];
    
      const newStart = new Date(selectedStart).toISOString();
      const newEnd = new Date(selectedEnd).toISOString();
    
      if (last.end === newStart) {
        // 🔹 lisätään perään
        return [...sortedTimes, newSlot];
      }
    
      if (newEnd === first.start) {
        // 🔹 lisätään alkuun
        return [newSlot, ...sortedTimes];
      }
    
      alert("Voit varata vain peräkkäisiä tunteja!");
      return prevTimes;
    });
  };    
  const handleDeleteClick = (id: string) => {
    setSelectedTimes(prevTimes => {
      const index = prevTimes.findIndex(time => time.id === id);
      if (index === -1) return prevTimes;
  
      // 🔹 Poistetaan valittu aika ja kaikki sen jälkeen tulevat ajat
      return prevTimes.slice(0, index);
    });
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
          firstDay={1}
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
          eventClick={(info) => handleDeleteClick(info.event.id)}
          headerToolbar={{ left: "prev,next today", center: "title", right: "timeGridDay,timeGridWeek" }}
          slotMinTime="07:00"
          slotMaxTime="18:00"
          height="auto"
          contentHeight="auto"
          slotDuration="01:00:00"
          selectMirror={true}
          editable={true}
          allDaySlot={false}
        />
        
        {/* 🔹 Lisätty JSX-tyylit takaisin */}
        <style jsx>{`
          :global(.fc-timegrid-slot) {
            height: 47px !important;
            color: black !important;
          }

          :global(.fc-toolbar-title),  
          :global(.fc-col-header-cell-cushion) {  
            color: black !important;
          }
        `}</style>
      </div>

      {/* 🔹 Kutsutaan modaalikomponenttia */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTimes={selectedTimes}
        setSelectedTimes={setSelectedTimes}
        reservationName={reservationName}
        setReservationName={setReservationName}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
      />
    </div>
  );
}
