"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Frontpage", href: "/dashboard", icon: "🏠" },
  { name: "Userpage", href: "/dashboard/userpage", icon: "👤" },
];

const SideNav = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-yellow-500 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">GameLab</h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.href} className="mb-2">
              <Link
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  pathname === item.href ? "bg-gray-700" : "hover:bg-gray-800"
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
