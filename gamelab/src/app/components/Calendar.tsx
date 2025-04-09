"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal"; // Varauslomakkeen modaali
import fiLocale from "@fullcalendar/core/locales/fi"; // Suomalainen päivämääräformaatti

// 🔷 Tyyppi tietokannasta haetulle varaukselle
type ReservationFromBackend = {
  id: number;
  type: "Room" | "Computer";
  startTime: string;
  endTime: string;
  computerId?: number;
};

// 🔷 Tyyppi FullCalendarille sopivalle eventille
type ReservationEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
};

export default function CalendarComponent() {
  // 🟩 Valitut ajat (vihreät "valitsemasi ajat")
  const [selectedTimes, setSelectedTimes] = useState<{ start: string; end: string; id: string }[]>([]);
  // 🔠 Varauslomakkeessa käytettävä nimi
  const [reservationName, setReservationName] = useState("");
  // 🔘 Modalin tila: auki / kiinni
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 💻 Valittu tietokoneen ID
  const [computerId, setComputerId] = useState<number>(0);
  // 🔴🔵 Tietokannasta haetut varaukset (näytetään kalenterissa)
  const [fetchedEvents, setFetchedEvents] = useState<ReservationEvent[]>([]);

  // 🔽 Haetaan varaukset kun komponentti latautuu
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:5065/api/reservation");
        const reservations: ReservationFromBackend[] = response.data;

        // 🔄 Muunnetaan tietokantavaraus kalenterin eventiksi
        const events: ReservationEvent[] = reservations.flatMap((r) => {
          const base = {
            id: r.id.toString(),
            start: r.startTime,
            end: r.endTime,
            type: r.type,
            computerId: r.computerId,
          };
        
          if (r.type === "Room") {
            return [
              {
                ...base,
                title: "",
                color: "rgba(235, 14, 62, 0.85)",
                display: "auto", // näkyy ja estää klikkauksen
              },
            ];
          }
        
          if (r.type === "Computer") {
            return [
              {
                ...base,
                title: "", // ei näytetä tekstinä automaattisesti
                color: "rgb(0, 16, 234)",
                display: "background", // sallii klikkauksen
              },
            ];
          }
        
          return [];
        });

        setFetchedEvents(events);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  // 🖱 Klikkaus kalenterissa lisää valitun tunnin (jos sallittu)
  const handleDateClick = (clickInfo: DateClickArg) => {
    const selectedStart = new Date(clickInfo.date).toISOString();
    const selectedEnd = new Date(new Date(selectedStart).getTime() + 60 * 60 * 1000).toISOString();

    setSelectedTimes((prevTimes) => {
      if (prevTimes.some((time) => time.start === selectedStart)) return prevTimes;
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

      // 🔄 Vain peräkkäiset ajat sallitaan
      if (last.end === newStart) {
        return [...sortedTimes, newSlot];
      }

      if (newEnd === first.start) {
        return [newSlot, ...sortedTimes];
      }

      alert("Voit varata vain peräkkäisiä tunteja!");
      return prevTimes;
    });
  };

  // ❌ Klikkaus varattuun aikaan (vihreä) poistaa sen ja sen jälkeen tulevat
  const handleDeleteClick = (id: string) => {
    setSelectedTimes((prevTimes) => {
      const index = prevTimes.findIndex((time) => time.id === id);
      if (index === -1) return prevTimes;
      return prevTimes.slice(0, index);
    });
  };

  return (
    <div className="relative p-6 bg-white shadow-md rounded-lg mx-auto" style={{ maxWidth: "1200px" }}>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Varauskalenteri</h2>

      {/* ✅ Näytetään varausnappi vain jos aikoja on valittu */}
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

      {/* 📅 FullCalendar-näkymä */}
      <div
        className="border border-black border-width p-3 rounded-lg overflow-hidden mx-auto relative"
        style={{ width: "1100px", height: "650px" }}
      >
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          dateClick={handleDateClick}
          locale={fiLocale}
          firstDay={1}
          // 🔁 Kalenteriin yhdistetään sekä backendin varaukset että käyttäjän valinnat
          events={[
            ...fetchedEvents,
            ...selectedTimes.map((time) => ({
              title: `Valittu aika ❌`,
              start: time.start,
              end: time.end,
              color: "rgba(2, 62, 5, 0.92)", 
              id: time.id,  
            })),
          ]}
          eventClick={(info) => handleDeleteClick(info.event.id)}
          headerToolbar={{ left: "prev,next today", center: "title", right: "timeGridDay,timeGridWeek" }}
          slotMinTime="07:00"
          slotMaxTime="18:00"
          height="auto"
          contentHeight="auto"
          slotDuration="01:00:00"
          selectMirror={true}
         
          allDaySlot={false}
     eventContent={(arg) => {
  const time = arg.timeText;

  if (arg.event.extendedProps.type === "Computer") {
    return {
      domNodes: [document.createTextNode(`💻 Laitteita varattu (${time})`)],
    };
  }

  if (arg.event.extendedProps.type === "Room") {
    return {
      domNodes: [document.createTextNode(`🎮 Pelihuone varattu (${time})`)],
    };
  }

  // ✅ Palauta oletusteksti esim. valituille ajoille
  return {
    domNodes: [document.createTextNode(`✅ Valittu aika ${arg.timeText}`)],
  };
}}
        />

        {/* FullCalendarin fontti- ja värimuokkauksia */}
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

      {/* 🪟 Varausmodaali */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTimes={selectedTimes}
        setSelectedTimes={setSelectedTimes}
        reservationName={reservationName}
        setReservationName={setReservationName}
        computerId={computerId}
        setComputerId={setComputerId}
        fetchedEvents={fetchedEvents}
      />
    </div>
  );
}
