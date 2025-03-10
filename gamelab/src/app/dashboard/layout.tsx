import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fi" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        
        {/* 🔹 Kiinteä Header */}
        <Header />

        <div className="flex">
          {/* 🔹 Sivupalkki siirretään alemmas pt-24:llä */}
          <SideNav />

          {/* 🔹 Sisältöalue siirretään alemmas ja oikealle */}
          <main className="flex-1 ml-64 p-6 pt-24">{children}</main>
        </div>

      </body>
    </html>
  );
}
