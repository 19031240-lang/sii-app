"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Bienvenido al Dashboard
      </h1>
    </div>
  );
}