import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ 
  children
 }: {
   children: ReactNode 
  }) {
  return (
    <html lang="fi">
      <body>
        <div className="flex h-screen">    
          {/* <SideNav />  */}          
          <div className="w-3/4 p-6">{children}</div>
        </div>
      </body>
    </html>
  );
}