"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// 🔹 Varauksen tietotyyppi
type Reservation = {
  id: number;
  description: string;
  startTime: string;
  endTime: string;
  type: "Computer" | "Room";
  computerId?: number;
};

export default function EditReservationPage() {
  const { id } = useParams(); // 🔹 Haetaan varauksen ID URL-parametreista
  const router = useRouter();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Haetaan varaus käyttäjän omista varauksista
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const user = JSON.parse(storedUser);
        const res = await fetch(`http://localhost:5065/api/user/${user.id}`);
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

  // 🔹 Poistetaan varaus ja ohjataan takaisin
  const handleDelete = async () => {
    if (!confirm("Haluatko varmasti poistaa tämän varauksen?")) return;

    try {
      await fetch(`http://localhost:5065/api/user/${id}`, {
        method: "DELETE",
      });
      router.push("/dashboard/userpage");
    } catch (error) {
      console.error("Poisto epäonnistui:", error);
      alert("Poisto epäonnistui.");
    }
  };

  if (loading) return <p>Ladataan...</p>;
  if (!reservation) return <p>Varausta ei löytynyt.</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl text-black font-bold mb-6">Muokkaa varausta</h1>

      <div className="space-y-4 bg-gray-200 p-4 rounded text-black">
        {/* 🔹 Kuvaus */}
        <div>
          <p className="font-semibold text-lg">Nimi:</p>
          <p className="text-gray-800">
            {reservation.description?.trim() ? reservation.description : "(Ei nimeä)"}
          </p>
        </div>

        {/* 🔹 Aika */}
        <div>
          <p className="font-semibold text-lg">Aika:</p>
          <p className="text-gray-800">
            {new Date(reservation.startTime).toLocaleString("fi-FI")} –{" "}
            {new Date(reservation.endTime).toLocaleTimeString("fi-FI")}
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

      </div>

      {/* 🔹 Painikkeet */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => router.push("/dashboard/userpage")}
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
