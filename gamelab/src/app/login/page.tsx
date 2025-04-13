"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { requestLoginCodeApi } from "@/app/services/apiService";
import {User} from '@/app/models/userModel';
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^@]+@[^@]*xamk[^@]*$/i;
    if (!emailRegex.test(email)) {
      setError("Sinulla täytyy olla xamk-sähköposti.");
      return;
    }

    try {
      const user = await requestLoginCodeApi(email);

      setGeneratedCode(user.oneTimeCode);
      setUser(user);
      setShowCodeInput(true);
      alert(`🔐 Kirjautumiskoodisi on: ${user.oneTimeCode}`);
    } catch {
      setError("Käyttäjää ei löytynyt.");
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
     //Jos syötetty koodi on oikein, tallennetaan tiedot
     //localstorageen ja siirrytään dashboardiin
    if (enteredCode === generatedCode) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user?.id,
          email: user?.email,
          username: user?.username,
        })
      );
      router.push("/dashboard");
    } else {
      setError("❌ Väärä kirjautumiskoodi");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-xamkYellow h-[100px] w-full fixed top-0 left-0 z-50 flex items-center gap-4 px-6">
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

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-grow bg-gray-100 pt-32">
        <h1 className="text-2xl mb-4 text-black">
          Xamk Gamelab varausjärjestelmä
        </h1>

        <form
          onSubmit={showCodeInput ? handleCodeSubmit : handleEmailSubmit}
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
              disabled={showCodeInput}//Piilottaan email-kentä, kirjautumiskoodin syöttövaiheessa
              onChange={(e) => setEmail(e.target.value)}
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
            className="w-full p-2 bg-yellow-500 text-black rounded font-bold hover:bg-yellow-600"
          >
            {showCodeInput ? "Kirjaudu" : "Lähetä kirjautumiskoodi"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
