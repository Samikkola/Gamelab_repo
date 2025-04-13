"use client";

import { useState } from "react";
import Link from "next/link";

// 🔹 Esimerkkidata varauksista (tämä voidaan korvata tietokannalla myöhemmin)
const dummyReservations = [
  { id: 1, user: "Matti", name: "Varattu pelihuone 1", date: "2024-03-15", time: "14:00 - 16:00" },
  { id: 2, user: "Matti", name: "Varattu pelihuone 2", date: "2024-03-18", time: "12:00 - 14:00" },
  { id: 3, user: "Laura", name: "Varattu pelihuone 3", date: "2024-03-19", time: "10:00 - 12:00" },
  { id: 4, user: "Pekka", name: "Varattu VR-huone", date: "2024-03-20", time: "16:00 - 18:00" },
];

export default function AdminPage() {
  const [reservations, setReservations] = useState(dummyReservations);
  const [filter, setFilter] = useState("");

  // 🔹 Suodatetaan varaukset käyttäjän nimen perusteella
  const filteredReservations = reservations.filter((res) =>
    res.user.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl text-black font-bold mb-6">Admin - Varausten hallinta</h1>

      {/* 🔹 Suodatuslomake */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Etsi käyttäjän nimellä..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-400 rounded w-full"
        />
      </div>

      {/* 🔹 Näytetään varaukset */}
      {filteredReservations.length === 0 ? (
        <p>Ei varauksia.</p>
      ) : (
        <ul className="space-y-4">
          {filteredReservations.map((reservation) => (
            <li key={reservation.id} className="p-4 bg-gray-400 rounded-lg flex justify-between">
              <div>
                <p className="text-lg font-semibold">{reservation.name}</p>
                <p className="text-gray-600">{reservation.date} klo {reservation.time}</p>
                <p className="text-gray-800 font-semibold">Käyttäjä: {reservation.user}</p>
              </div>

              {/* 🔹 Muokkaa varaus -linkki */}
              <Link
                href={`/dashboard/adminpage/edit/${reservation.id}`}
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