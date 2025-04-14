"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type AdminReservation = {
  id: number;
  description: string;
  startTime: string;
  endTime: string;
  type: string;
  username?: string;
  email?: string;
};

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [loading, setLoading] = useState(true);

  //TODO:Api vaihdettava apiService-kansioon
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch("http://localhost:5065/api/admin/reservations");
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
      <h1 className="text-3xl font-bold text-black mb-6">Admin – Kaikki varaukset</h1>

      {loading ? (
        <p>Ladataan varauksia...</p>
      ) : reservations.length === 0 ? (
        <p>Ei varauksia.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((reservation) => (
            <li
              key={reservation.id}
              className="p-4 bg-gray-200 rounded-lg text-black space-y-1 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-lg">
                  {reservation.description}
                </p>

                <p className="text-sm text-gray-700">
                  {new Date(reservation.startTime).toLocaleString("fi-FI", {
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  –{" "}
                  {new Date(reservation.endTime).toLocaleTimeString("fi-FI", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <p className="text-sm text-gray-500">Tyyppi: {reservation.type}</p>

                <p className="text-sm text-gray-500 italic">
                  Varaaja: {reservation.username ?? "(tuntematon)"} –{" "}
                  {reservation.email ?? "(ei sähköpostia)"}
                </p>
              </div>

              {/* 🔗 Linkki edit-sivulle */}
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
