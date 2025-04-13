"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

//Wrapper-komponentti, joka tarkastaa onko käyttäjä kirjautunut
//ja ohjaa root-sivulle jos ei ole
//Käytettän tällä hetkellä dashboardin layoutissa
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Ei havaittu kirjautumistietoja!");
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
} 
