"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

// 🔹 Esimerkkidata varauksista
const dummyReservations = [
  { id: 1, user: "Matti", name: "Varattu pelihuone 1", date: "2024-03-15", time: "14:00 - 16:00" },
  { id: 2, user: "Matti", name: "Varattu pelihuone 2", date: "2024-03-18", time: "12:00 - 14:00" },
  { id: 3, user: "Laura", name: "Varattu pelihuone 3", date: "2024-03-19", time: "10:00 - 12:00" },
  { id: 4, user: "Pekka", name: "Varattu VR-huone", date: "2024-03-20", time: "16:00 - 18:00" },
];

export default function EditReservationPage() {
  const router = useRouter();
  const { id } = useParams(); // Saa varauksen ID:n URLista

  // Haetaan varaus listasta ID:n perusteella
  const reservation = dummyReservations.find((res) => res.id === Number(id));

  const [formData, setFormData] = useState({
    name: reservation?.name || "",
    date: reservation?.date || "",
    time: reservation?.time || "",
    user: reservation?.user || "",
  });

  if (!reservation) {
    return <p>Varausta ei löydy.</p>;
  }

  // 🔹 Käsitellään lomakkeen muokkaus
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Päivitetty varaus:", formData);
    router.push("/dashboard/adminpage"); // Palautetaan käyttäjä admin-sivulle
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl text-black font-bold mb-4">Muokkaa varausta</h1>

      <form onSubmit={handleSubmit} className="bg-gray-400 p-4 rounded-lg space-y-4">
        <label className="block">
          Nimi:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          Päivämäärä:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          Aika:
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          Käyttäjä:
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Tallenna muutokset
        </button>
      </form>
    </div>
  );
}