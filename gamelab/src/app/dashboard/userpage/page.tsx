"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// 🔹 Määritellään varauksen tyyppi
type Reservation = {
  id: number;
  description: string;
  startTime: string;
  endTime: string;
  type: "Computer" | "Room";
  computerId?: number;
};

export default function UserReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Haetaan kirjautuneen käyttäjän varaukset
  useEffect(() => {
    const fetchReservations = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);
      try {
        const res = await fetch(`http://localhost:5065/api/user/${user.id}`);
        const data = await res.json();
        setReservations(data);
      } catch (error) {
        console.error("Virhe haettaessa varauksia:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl text-black font-bold mb-6">Omat varaukset</h1>

      {loading ? (
        <p>Ladataan varauksia...</p>
      ) : reservations.length === 0 ? (
        <p>Ei varauksia.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((reservation) => (
            <li
              key={reservation.id}
              className="p-4 bg-gray-200 rounded-lg flex justify-between items-center"
            >
              <div className="text-black">
                {/* 🔹 Näytetään varauksen nimi tai korvaava teksti */}
                <p className="font-semibold text-lg mb-1">
                  {reservation.description?.trim() ? reservation.description : "(Ei nimeä)"}
                </p>

                {/* 🔹 Näytetään ajankohta */}
                <p className="text-sm text-gray-700">
                  {new Date(reservation.startTime).toLocaleString("fi-FI",{ hour: "2-digit", minute: "2-digit" })} –{" "}
                  {new Date(reservation.endTime).toLocaleTimeString("fi-FI",{ hour: "2-digit", minute: "2-digit" })}
                </p>

                {/* 🔹 Näytetään tyyppi */}
                <p className="text-sm text-gray-500">
                  Tyyppi: {reservation.type}
                  {reservation.type === "Computer" && reservation.computerId && (
                    <> (PC-{reservation.computerId})</>
                  )}
</p>
              </div>

              {/* 🔹 Linkki muokkaussivulle */}
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
