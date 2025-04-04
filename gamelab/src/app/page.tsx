"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^@]+@[^@]*xamk[^@]*$/i; // Regex xamk-sähköpostiosoitteille
    if (!emailRegex.test(email)) {
      setError("Sinulla täytyy olla xamk-sähköposti.");
      return;
    }

    //Generoidaan kertakäyttökoodi TODO: siirretän tämä backendille
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generoi satunnaisen 6-numeron koodin
    setGeneratedCode(code);
    setShowCodeInput(true);

    //Näytetään koodia alertissa TODO:Lähetetään koodi sähköpostiin
    alert(`🔐 Kirjautumiskoodi: ${code}`);
  };

  const handleCodeSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (enteredCode === generatedCode) {
      console.log("Koodi oikein, ohjataan kalenterisivulle!");
      router.push("/dashboard"); // Vaihda "/home" haluamaasi reittiin
    } else {
      setError("Virheellinen koodi. Yritä uudelleen.");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Keltainen palkki sivun ylälaidassa */}
      <header className="bg-xamkYellow h-[100px] sm:h-[100px] w-full fixed top-0 left-0 z-50 flex items-center gap-4 px-6">
        {/* Kuva-wrapperi: suhteellinen elementti, jotta next/image fill toimii oikein */}
        <div className="relative w-[120px] h-[100px]">
          <Image
            src="/images/image.png" // Kuvan polku public-kansiosta
            alt="Gamelab Logo" // Alt-teksti saavutettavuutta varten
            fill // Täyttää koko wrapperin
            className="object-contain" // Skaalaa niin että kuva ei leikkaannu
            priority // Ladataan etusijalla
          />
        </div>

        {/* Sovelluksen otsikko */}
        <h1 className="text-4xl font-bold text-black">Gamelab</h1>
      </header>

      <div className="flex flex-col items-center justify-center flex-grow bg-gray-100">
        <h1 className="text-2xl mb-4 text-black">
          Xamk Gamelab varausjärjestelmä
        </h1>

        <form
          onSubmit={showCodeInput ? handleCodeSumbit : handleEmailSubmit}
          className="w-80 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-black text-xl">
              Email
            </label>
            <input
              type="text"
              id="username"
              value={email}
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
            className="w-full p-2 bg-yellow-500 text-black rounded hover:bg-yellow-500 shadow-none font-bold"
          >
            {showCodeInput ? "Kirjaudu" : "Lähetä kirjautumiskoodi"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
