import Image from "next/image";


// Yläpalkkikomponentti
export default function Header() {
  return (
    // Header-alue: kiinteä korkeus 130px, täysleveä, kiinnitetty ylös ja näkyy päällimmäisenä
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
  );
}
