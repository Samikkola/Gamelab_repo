"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserApi } from "@/app/services/apiService";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [error, setError] = useState("");

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !email) {
      setError("Täytä molemmat kentät.");
      return;
    }

    if (username.length < 3) {
      setError("Käyttäjänimen täytyy olla vähintään 3 merkkiä pitkä.");
      return;
    }

    const emailRegex = /^[^@]+@[^@]*xamk[^@]*$/i;
    if (!emailRegex.test(email)) {
      setError("Sinulla täytyy olla xamk-sähköposti.");
      return;
    }

    try {
      const user = await createUserApi({ username, email });
      setGeneratedCode(user.oneTimeCode);
      // Tallennetaan käyttäjä localStorageen
      localStorage.setItem("user", JSON.stringify(user));
      setShowCodeInput(true);
      alert(`🔐 Kirjautumiskoodisi on: ${user.oneTimeCode}`);
    } catch (err) {
      setError("Rekisteröinti epäonnistui.");
      console.error("❌ Rekisteröinti virhe:", err);
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (enteredCode === generatedCode) {
      router.push("/dashboard");
    } else {
      setError("❌ Väärä kirjautumiskoodi");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Keltainen yläpalkki */}
      <header className="bg-xamkYellow h-[100px] sm:h-[100px] w-full fixed top-0 left-0 z-50 flex items-center gap-4 px-6">
        <div className="relative w-[120px] h-[100px]">
          <Image
            src="/images/image.png"
            alt="Gamelab Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-black">Gamelab</h1>
      </header>

      {/* Lomake */}
      <div className="flex flex-col items-center justify-center flex-grow bg-gray-100">
        <h1 className="text-2xl mb-4 text-black">
          Rekisteröidy Xamk Gamelab -järjestelmään
        </h1>

        <form
          onSubmit={showCodeInput ? handleCodeSubmit : handleRegisterSubmit}
          className="w-80 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-black text-xl">
              Sähköposti
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-black rounded text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-black text-xl">
              Käyttäjänimi
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-black rounded text-black"
              required
            />
          </div>

          {showCodeInput && (
            <div className="mb-4">
              <label htmlFor="code" className="block mb-2 text-black text-xl">
                Kirjautumiskoodi
              </label>
              <input
                type="text"
                id="code"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                className="w-full p-2 border border-black rounded text-black"
                required
              />
            </div>
          )}

          {error && <p className="text-red-600 mb-2">{error}</p>}

          <button
            type="submit"
            className="w-full p-2 bg-yellow-500 text-black rounded hover:bg-yellow-500 shadow-none font-bold"
          >
            {showCodeInput ? "Kirjaudu" : "Rekisteröidy"}
          </button>
        </form>
      </div>
    </div>
  );
}
