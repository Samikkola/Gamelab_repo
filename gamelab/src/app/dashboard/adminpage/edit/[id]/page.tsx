"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Reservation = {
  id: number;
  description: string;
  startTime: string;
  endTime: string;
  type: "Computer" | "Room";
  computerId?: number;
  username?: string;
  email?: string;
};

export default function AdminEditReservationPage() {
  const { id } = useParams();
  const router = useRouter();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await fetch("http://localhost:5065/api/admin/reservations");
        const data = await res.json();
        const found = data.find((r: Reservation) => r.id === Number(id));
        setReservation(found || null);
      } catch (error) {
        console.error("Virhe haettaessa varausta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Haluatko varmasti poistaa tämän varauksen?")) return;

    try {
      await fetch(`http://localhost:5065/api/user/${id}`, {
        method: "DELETE",
      });
      router.push("/dashboard/adminpage");
    } catch (error) {
      console.error("Poisto epäonnistui:", error);
      alert("Poisto epäonnistui.");
    }
  };

  if (loading) return <p>Ladataan...</p>;
  if (!reservation) return <p>Varausta ei löytynyt.</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl text-black font-bold mb-6">Varaus (Admin)</h1>

      <div className="space-y-4 bg-gray-200 p-4 rounded text-black">
        <div>
          <p className="font-semibold text-lg">Nimi:</p>
          <p className="text-gray-800">
            {reservation.description?.trim() || "(Ei nimeä)"}
          </p>
        </div>

        <div>
          <p className="font-semibold text-lg">Aika:</p>
          <p className="text-gray-800">
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
        </div>

        <div>
          <p className="font-semibold text-lg">Tyyppi:</p>
          <p className="text-gray-800">
            {reservation.type}
            {reservation.type === "Computer" && reservation.computerId && (
              <> (PC-{reservation.computerId})</>
            )}
          </p>
        </div>

        <div>
          <p className="font-semibold text-lg">Varaajan tiedot:</p>
          <p className="text-sm text-gray-500 italic">
            {reservation.username ?? "(Tuntematon käyttäjä)"} – {reservation.email ?? "(ei sähköpostia)"}
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => router.push("/dashboard/adminpage")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Takaisin
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Poista varaus
        </button>
      </div>
    </div>
  );
}
