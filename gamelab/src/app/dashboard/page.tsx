import CalendarComponent from "../components/Calendar";

export default function Dashboard() {
  return (
    <div className="w-full flex">
      <div className="ml-0"> {/* 🔹 Tämä pitää kalenterin vasemmalla */}
        <CalendarComponent />
      </div>
    </div>
  );
}