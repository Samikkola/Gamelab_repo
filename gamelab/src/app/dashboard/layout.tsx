import { ReactNode } from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import ProtectedRoute from "../components/ProtectedRoute";

// Tämä layout suojaa dashboardin ja tuo headerin + sivunavigaation näkyviin
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <Header />
      <div className="flex">
        <SideNav />
        <main className="flex-1 ml-64 p-6 pt-24">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
