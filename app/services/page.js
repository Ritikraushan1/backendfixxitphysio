"use client";
import React, { useState, useEffect } from "react";
import Sidenav from "../components/Sidenav";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../firebase";
import ServicesHero from "./ServicesHero";
import ServicesNav from "./ServicesNav";
import ServicesTable from "./ServicesTable";

export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = authInstance.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/"); // Redirect to login if not authenticated
      } else {
        setUser(user);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);
  if (loading) return <div>Loading...</div>;
  return (
    <Sidenav>
      <>
        <ServicesHero />
        <ServicesNav />
        <ServicesTable />
      </>
    </Sidenav>
  );
}
