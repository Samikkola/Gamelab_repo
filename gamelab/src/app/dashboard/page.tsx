
import CalendarComponent from "../components/Calendar";
import Image from "next/image"; 

export default function Dashboard() {
  return (
    <div className="w-full flex">
      <div className="ml-0"> {/* 🔹 Tämä pitää kalenterin vasemmalla */}
        <CalendarComponent />
      </div>
      {/* 🖼️ Kuva oikealle */}
  <div className="ml-6 flex items-center">
    <Image
      src="/images/image2.jpg" // Vaihda kuvan nimi tarpeen mukaan
      alt="Kalenterikuva"
      width={1000}
      height={1000}
      className="rounded shadow-md"
    />
  </div>
    </div>
  );
}

