
import CalendarComponent from "../components/Calendar";
// import Image from "next/image"; 

export default function Dashboard() {
  return (
    <div className="flex ">
      <div className="ml-0"> {/* 🔹 Tämä pitää kalenterin vasemmalla */}
        <CalendarComponent />
      </div>
      {/* 🖼️ Kuva oikealle
  <div className="ml-6 w-1/2">
    <Image
      src="/images/image2.png" // Vaihda kuvan nimi tarpeen mukaan
      alt="Kalenterikuva"
      width={1500}
      height={2000}
      className="rounded shadow-md"
    />
  </div> */}
    </div>
  );
}

