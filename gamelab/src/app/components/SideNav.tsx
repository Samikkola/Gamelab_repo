"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Navigaatiovalikon valinnat
const menuItems = [
  { name: "Frontpage", href: "/dashboard", icon: "🏠" },
  { name: "Userpage", href: "/dashboard/userpage", icon: "👤" },
  { name: "Adminpage", href: "/dashboard/adminpage", icon: "👥" },
];

// Sidenav-komponentti
const SideNav = () => {
  const pathname = usePathname(); // Selvitetään aktiivinen reitti

  return (
    // Kiinteä vasemman reunan valikko, alkaa 130px kohdasta (jotta ei mene headerin päälle)
    <aside className="w-64 h-screen bg-xamkYellow text-black p-4 fixed left-0 top-[100px]">
      
      {/* Navigoinnin otsikko */}
      <h2 className="text-2xl font-bold mb-6">Navigation</h2>
      
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.href} className="mb-2">
              <Link
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  pathname === item.href
                    ? "bg-gray-400 text-white"   // Aktiivinen linkki
                    : "hover:bg-gray-500 hover:text-white" // Hover-efekti
                }`}
              >
                <span>{item.icon}</span> {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;