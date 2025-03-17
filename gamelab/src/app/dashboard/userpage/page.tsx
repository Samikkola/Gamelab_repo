"use client";

import { useState } from "react";
import Link from "next/link";

// 🔹 Esimerkkidata varauksista (tämä voidaan korvata tietokannalla myöhemmin)
const dummyReservations = [
  { id: 1, name: "Varattu pelihuone 1", date: "2024-03-15", time: "14:00 - 16:00" },
  { id: 2, name: "Varattu pelihuone 2", date: "2024-03-18", time: "12:00 - 14:00" },
];

export default function Dashboard() {
  const [reservations, setReservations] = useState(dummyReservations);

  return (
    <div className="p-6">
      <h1 className="text-3xl text-black font-bold mb-6">Omat varaukset</h1>

      {/* 🔹 Näytetään lista käyttäjän varauksista */}
      {reservations.length === 0 ? (
        <p>Ei varauksia.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="p-4 bg-gray-400 rounded-lg flex justify-between">
              <div>
                <p className="text-lg font-semibold">{reservation.name}</p>
                <p className="text-gray-600">{reservation.date} klo {reservation.time}</p>
              </div>

              {/* 🔹 Muokkaa varaus -linkki */}
              <Link
                href={`/dashboard/userpage/edit/${reservation.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Muokkaa
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
  