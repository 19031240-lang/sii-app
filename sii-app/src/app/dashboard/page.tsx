// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard,BookOpen,Calendar,Map,LogOut,TrendingUp,CheckCircle2,AlertCircle,BarChart3,Mail,User } from "lucide-react";

// 1. Interfaces de datos
interface EstudianteData {
  numero_control: string;
  email: string;
  persona: string;
  foto: string;
  promedio_ponderado: string;
  promedio_aritmetico: number;
  porcentaje_avance: number;
  materias_cursadas: string;
  materias_aprobadas: string;
  materias_reprobadas: string;
  semestre: number;
  creditos_acumulados: string;
  num_materias_rep_segunda: number;
  num_materias_rep_primera: number;
}

// 2. Interfaces para los componentes auxiliares
interface StatCardProps {
  label: string;
  value: string | number;
  color: string;
  text?: string;
  icon?: React.ReactNode; // Nueva prop para el icono
}

interface DetailRowProps {
  label: string;
  value: string | number;
  color?: string;
}

export default function Dashboard() {
  const [estudiante, setEstudiante] = useState<EstudianteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchDatos = async () => {
      const token = localStorage.getItem("token");
      if (!token) { router.push("/login"); return; }

      try {
        const res = await fetch("/api/estudiante", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` },
        });
        const result = await res.json();
        if (res.ok) { 
          setEstudiante(result.data); 
        } else {
          if (res.status === 401) { 
            localStorage.removeItem("token"); 
            router.push("/login"); 
          }
          setError(result.message || "Error al cargar datos");
        }
      } catch (err) { 
        setError("Error de conexión"); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchDatos();
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-950 text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 mb-4"></div>
      <p className="font-black tracking-widest animate-pulse">CARGANDO SISTEMA...</p>
    </div>
  );

  if (error || !estudiante) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
        <p className="text-red-500 font-bold mb-6">⚠️ {error}</p>
        <button onClick={() => router.push("/login")} className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold">Reintentar</button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-950 text-white flex flex-col p-6 shadow-2xl hidden md:flex">
        <div className="mb-10 text-center border-b border-blue-800 pb-6">
          <h1 className="text-2xl font-black tracking-tighter">SII <span className="text-green-500">ITC</span></h1>
          <p className="text-[10px] text-blue-300 font-bold tracking-widest">TECNM CELAYA</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {[
            { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
            { icon: <BookOpen size={20} />, label: "Kardex" },
            { icon: <Calendar size={20} />, label: "Horario" },
            { icon: <Map size={20} />, label: "Campus" },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${item.active ? 'bg-blue-800 border-l-4 border-green-500' : 'hover:bg-blue-900 text-gray-400 hover:text-white'}`}>
              {item.icon} <span className="font-bold text-sm">{item.label}</span>
            </div>
          ))}
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-3 p-4 rounded-xl text-red-400 hover:bg-red-900/20 transition font-black text-sm border border-red-900/30">
          <LogOut size={20} /> SALIR DEL SII
        </button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* TARJETA DE BIENVENIDA */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8 flex flex-col md:flex-row items-center gap-8 border-l-[12px] border-green-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <User size={120} />
          </div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-50 shadow-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={`data:image/jpeg;base64,${estudiante.foto}`} 
              alt="Perfil" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-blue-950 uppercase leading-none mb-2">{estudiante.persona}</h2>
            <div className="flex flex-col gap-1 mb-4">
              <p className="text-gray-400 font-bold tracking-tighter flex items-center justify-center md:justify-start gap-2">
                CONTROL: <span className="text-blue-700">{estudiante.numero_control}</span>
              </p>
              <p className="text-gray-400 font-bold tracking-tighter flex items-center justify-center md:justify-start gap-2 text-sm">
                <Mail size={14} className="text-blue-400" /> <span>{estudiante.email}</span>
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="bg-blue-50 text-blue-700 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-widest">Semestre: {estudiante.semestre}</span>
              <span className="bg-green-50 text-green-700 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-widest">Carrera: ISC</span>
            </div>
          </div>
        </div>

        {/* CUADRICULA DE ESTADÍSTICAS CON ICONOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Promedio" 
            value={estudiante.promedio_ponderado} 
            color="border-blue-600" 
            icon={<TrendingUp size={16} className="text-blue-600" />}
          />
          <StatCard 
            label="Avance" 
            value={`${estudiante.porcentaje_avance}%`} 
            color="border-purple-600" 
            text="text-purple-700" 
            icon={<BarChart3 size={16} className="text-purple-600" />}
          />
          <StatCard 
            label="Reprobadas" 
            value={estudiante.materias_reprobadas} 
            color="border-red-600" 
            text="text-red-600" 
            icon={<AlertCircle size={16} className="text-red-600" />}
          />
          <StatCard 
            label="Aprobadas" 
            value={estudiante.materias_aprobadas} 
            color="border-green-600" 
            icon={<CheckCircle2 size={16} className="text-green-600" />}
          />
        </div>

        {/* DETALLE ACADÉMICO */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm">
            <h4 className="font-black text-blue-950 mb-6 border-b pb-4 text-xs uppercase tracking-widest">Detalle Académico</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailRow label="Materias Cursadas" value={estudiante.materias_cursadas} />
              <DetailRow label="Créditos Acumulados" value={estudiante.creditos_acumulados} color="text-green-600" />
              <DetailRow label="Promedio Ponderado" value={estudiante.promedio_ponderado} />
              {/* Ajuste a 2 decimales para Promedio Aritmético */}
              <DetailRow label="Promedio Aritmético" value={Number(estudiante.promedio_aritmetico).toFixed(2)} />
              <DetailRow label="Materias en Primera Oportunidad" value={estudiante.num_materias_rep_primera} />
              <DetailRow label="Materias en Segunda Oportunidad" value={estudiante.num_materias_rep_segunda} />
            </div>
          </div>
          
          <div className="bg-blue-900 p-8 rounded-3xl shadow-xl text-white flex flex-col justify-center items-center text-center">
            <h4 className="text-xl font-black mb-2 uppercase italic tracking-tighter">¡Adelante Lince!</h4>
              <p className="text-white text-sm font-bold opacity-90 leading-relaxed mb-4">
                Mantén tu promedio para asegurar tu horario el próximo semestre.
              </p>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
               <p className="text-[10px] uppercase font-bold text-blue-300">Tu Estatus</p>
               <p className="font-black text-lg">ALUMNO REGULAR</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// 3. COMPONENTES AUXILIARES
const StatCard = ({ label, value, color, text = "text-black", icon }: StatCardProps) => (
  <div className={`bg-white p-6 rounded-3xl shadow-sm border-b-8 ${color} flex flex-col items-center hover:scale-105 transition-transform cursor-default relative`}>
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest">{label}</p>
    </div>
    <h3 className={`text-4xl font-black ${text}`}>{value}</h3>
  </div>
);

const DetailRow = ({ label, value, color = "text-black" }: DetailRowProps) => (
  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
    <span className="text-xs font-bold text-gray-500 uppercase">{label}</span>
    <span className={`font-black ${color}`}>{value}</span>
  </div>
);