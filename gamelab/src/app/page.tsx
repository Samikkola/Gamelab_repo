"use client";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Keltainen palkki sivun ylälaidassa */}
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

      <div className="flex flex-col items-center justify-center flex-grow bg-gray-100 pt-[100px]">
        <h1 className="text-2xl mb-6 text-black">
          Xamk Gamelab varausjärjestelmä
        </h1>

        <div className="w-80 bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
          <Link href="/login">
            <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold">
              Kirjaudu sisään
            </button>
          </Link>

          <Link href="/register">
            <button className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 font-bold">
              Rekisteröidy
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
