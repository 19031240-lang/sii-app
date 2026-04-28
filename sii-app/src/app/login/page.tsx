"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
  try {
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    console.log("STATUS:", res.status);
    console.log("DATA:", data);

    if (!res.ok) {
      setError(data.message || "Error en login");
      return;
    }

    localStorage.setItem("token", data.token);

    router.push("/dashboard");
  } catch (err) {
    console.log(err);
    setError("Error de conexión con el servidor");
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-900 to-green-700">

      {/* HEADER */}
      <div className="bg-blue-800 text-white p-4 text-center font-bold text-lg">
        Tecnológico Nacional de México en Celaya
      </div>

      {/* CONTENIDO */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl w-[380px] overflow-hidden">

          {/* TOP */}
          <div className="bg-gradient-to-r from-green-700 to-blue-800 text-white text-center p-5">
            <h2 className="text-xl font-bold">PORTAL ESTUDIANTIL</h2>
            <p className="text-sm opacity-80">
              Tecnológico Nacional de México en Celaya
            </p>
          </div>

          {/* FORM */}
          <div className="p-6 flex flex-col gap-4">

            <h3 className="text-center font-semibold text-gray-700">
              Ingresa con tus credenciales SII
            </h3>

            {/* ERROR */}
            {error && (
              <div className="bg-red-100 text-red-600 p-2 rounded border border-red-300 text-sm">
                {error}
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-600">
                Correo Institucional
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@celaya.tecnm.mx"
                className="w-full border rounded-lg p-2 mt-1 bg-gray-100 text-black placeholder-gray-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-600">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full border rounded-lg p-2 mt-1 bg-gray-100 text-black placeholder-gray-500"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-green-700 to-blue-800 text-white p-2 rounded-lg hover:opacity-90 transition"
            >
              → Iniciar Sesión
            </button>

            <p className="text-xs text-gray-400 text-center">
              Usa las mismas credenciales del sistema SII ITC Celaya
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-white text-sm p-3 opacity-80">
        © 2026 TecNM Campus Celaya — ISC
      </div>
    </div>
  );
}