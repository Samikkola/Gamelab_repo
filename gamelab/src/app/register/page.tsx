"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/services/apiService";
import { setUser } from "@/app/services/authService";

const  RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  //Jos käyttäjän email on localstoragessa, 
  //haetaan se ja asetetaan tilaan
  //Muuten ohjataan takaisin kirjautumissivulle
  useEffect(() => {
    const pendingEmail = localStorage.getItem("pendingEmail");
    if (!pendingEmail) {
      router.push("/");
      return;
    }
    setEmail(pendingEmail);
  }, [router]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await registerUser(email, username); // API-kutus käyttäjän rekisteröimiseksi
      setUser(user); //Tallennetaan käyttäjätiedot localStorageen
      localStorage.removeItem("pendingEmail");//Poistetaan pendingEmail localstoragesta
      router.push("/calendar");// Ohjataan käyttäjä kalenterisivulle
    } catch {
      alert("Rekisteröinti epäonnistui.");
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Täydennä tietosi</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-black">
            Sähköpostiosoite
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full border p-2 rounde text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Käyttäjänimi
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-black font-bold p-2 rounded hover:bg-yellow-600"
        >
          Tallenna ja jatka
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
