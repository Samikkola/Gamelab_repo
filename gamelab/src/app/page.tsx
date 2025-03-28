"use client";
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Käyttäjänimi:', username);
      console.log('Salasana:', password);
  
      // Tarkista, onko käyttäjä admin vai tavallinen käyttäjä
      const isAdmin = username === 'admin';
      if (isAdmin) {
        router.push('/dashboard/adminpage');
      } else {
        router.push('/dashboard/userpage');
      }
    };
  
    return (
      <div className="flex flex-col h-screen">
        {/* Keltainen palkki sivun ylälaidassa */}
        <header className="bg-xamkYellow h-[100px] sm:h-[100px] w-full fixed top-0 left-0 z-50 flex items-center gap-4 px-6">
              
              {/* Kuva-wrapperi: suhteellinen elementti, jotta next/image fill toimii oikein */}
              <div className="relative w-[120px] h-[100px]">
                <Image
                  src="/images/image.png"      // Kuvan polku public-kansiosta
                  alt="Gamelab Logo"           // Alt-teksti saavutettavuutta varten
                  fill                         // Täyttää koko wrapperin
                  className="object-contain"   // Skaalaa niin että kuva ei leikkaannu
                  priority                     // Ladataan etusijalla
                />
              </div>
        
              {/* Sovelluksen otsikko */}
              <h1 className="text-4xl font-bold text-black">Gamelab</h1>
            </header>
  
        <div className="flex flex-col items-center justify-center flex-grow bg-gray-100">
          <h1 className="text-2xl mb-4 text-black">Login to Xamk Gamelab varausjärjestelmä</h1>
  
          <form onSubmit={handleSubmit} className="w-80 bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-black text-xl">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-black rounded text-black"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-black text-xl">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-black rounded text-black"
                required
              />
            </div>
  
            {/* Kirjaudu sisään -nappi */}
            <button
              type="submit"
              className="w-full p-2 bg-yellow-500 text-black rounded hover:bg-yellow-500 shadow-none font-bold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginPage;