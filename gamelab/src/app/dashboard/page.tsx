import CalendarComponent from "../components/Calendar";
//Sivu kirjautumisen jälkeen jossa näkyy kalenteri
export default function Dashboard() {
  return (
    <div className="w-full flex justify-center">
      <CalendarComponent />
    </div>
  );
}