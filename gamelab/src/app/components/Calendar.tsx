"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";
import fiLocale from "@fullcalendar/core/locales/fi";

type ReservationFromBackend = {
  id: number;
  type: "Room" | "Computer";
  startTime: string;
  endTime: string;
  computerId?: number;
};

type ReservationEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  type?: "Room" | "Computer";
  computerId?: number;
  display?: "auto" | "background";
  classNames?: string[];
};

export default function CalendarComponent() {
  const [selectedTimes, setSelectedTimes] = useState<{ start: string; end: string; id: string }[]>([]);
  const [reservationName, setReservationName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [computerId, setComputerId] = useState<number>(0);
  const [fetchedEvents, setFetchedEvents] = useState<ReservationEvent[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timeout = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timeout);
    }
  }, [toastMessage]);

  useEffect(() => {
    fetchReservations(); // kutsu sitä täällä
  }, []);
  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:5065/api/reservation");
      const reservations: ReservationFromBackend[] = response.data;
  
      const events: ReservationEvent[] = reservations.flatMap((r) => {
        const base = {
          id: r.id.toString(),
          start: r.startTime,
          end: r.endTime,
          type: r.type,
          computerId: r.computerId,
        };
  
        if (r.type === "Room") {
          return [{
            ...base,
            title: "",
            color: "rgba(235, 14, 62, 0.85)",
            classNames: ["room-event"],
            display: "background",
          }];
        }
  
        if (r.type === "Computer") {
          return [{
            ...base,
            title: "",
            color: "rgb(0, 16, 234)",
            display: "background",
          }];
        }
  
        return [];
      });
  
      setFetchedEvents(events);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };  const handleDateClick = (clickInfo: DateClickArg) => {
    const selectedStart = new Date(clickInfo.date);
    const selectedEnd = new Date(selectedStart.getTime() + 60 * 60 * 1000);

    const overlapsRoom = fetchedEvents.some((event) => {
      if (event.type !== "Room") return false;
      const start = new Date(event.start);
      const end = new Date(event.end);
      return selectedStart < end && selectedEnd > start;
    });

    if (overlapsRoom) {
      setToastMessage("Et voi valita aikaa, koska huone on jo varattu.");
      return;
    }

    setSelectedTimes((prevTimes) => {
      const newSlot = {
        start: selectedStart.toISOString(),
        end: selectedEnd.toISOString(),
        id: uuidv4(),
      };

      if (prevTimes.some((time) => time.start === newSlot.start)) return prevTimes;
      if (prevTimes.length >= 4) {
        setToastMessage("Et voi varata yli 4 tuntia!");
        return prevTimes;
      }

      if (prevTimes.length === 0) return [newSlot];

      const sorted = [...prevTimes].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
      const first = sorted[0];
      const last = sorted[sorted.length - 1];

      if (last.end === newSlot.start) return [...sorted, newSlot];
      if (newSlot.end === first.start) return [newSlot, ...sorted];

      setToastMessage("Voit varata vain peräkkäisiä tunteja!");
      return prevTimes;
    });
  };

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
          locale={fiLocale}
          firstDay={1}
          events={[
            ...fetchedEvents,
            ...selectedTimes.map((time) => ({
              title: `          Valittu aika`,
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
            const start = arg.event.start;
            const end = arg.event.end;
            const format = (date: Date | null) =>
              date?.toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" }) ?? "";
            const time = `${format(start)} – ${format(end)}`;

            const span = document.createElement("span");
            span.style.color = "white";
            span.style.fontWeight = "bold";
            span.style.fontSize = "12px";

            if (arg.event.extendedProps.type === "Room") {
              span.textContent = `🎮 Pelihuone varattu\n        (${time})`; // rivinvaihto
              span.style.whiteSpace = "pre"; // sallii \n tulostuvan rivinvaihtona
              return { domNodes: [span] };
            }
            if (arg.event.extendedProps.type === "Computer") {
              span.textContent = `💻 Laitteita varattu \n        (${time})`;
              span.style.whiteSpace = "pre"; // sallii \n tulostuvan rivinvaihtona
              return { domNodes: [span] };
            }

            span.textContent = `${arg.event.title} \n        (${time})`;
            span.style.whiteSpace = "pre";
            return { domNodes: [span] };
          }}
        />

        <style jsx>{`
          :global(.fc-timegrid-slot) {
            height: 47px !important;
            color: black !important;
          }

          :global(.fc-toolbar-title),
          :global(.fc-col-header-cell-cushion) {
            color: black !important;
          }

          :global(.fc .fc-bg-event) {
            opacity: 0.8 !important;
            filter: none !important;
          }

          :global(.fc .fc-event-title),
          :global(.fc .fc-event-main) {
            color: white !important;
          }
        `}</style>

        {toastMessage && (
          <div
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-lg cursor-pointer z-50"
            onClick={() => setToastMessage(null)}
          >
            {toastMessage}
          </div>
        )}
      </div>

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
        fetchReservations={fetchReservations}
      />
    </div>
  );
}
