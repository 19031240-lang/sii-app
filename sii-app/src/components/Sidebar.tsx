import { LayoutDashboard, BookOpen, Calendar, Map, Heart, LogOut } from "lucide-react";

export const Sidebar = ({ onLogout }: { onLogout: () => void }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
    { icon: <BookOpen size={20} />, label: "Kardex" },
    { icon: <Calendar size={20} />, label: "Horario" },
    { icon: <Map size={20} />, label: "Croquis Campus" },
    { icon: <Heart size={20} />, label: "Profes Favoritos" },
  ];

  return (
    <aside className="w-64 bg-blue-950 min-h-screen text-white flex flex-col p-4 shadow-xl">
      <div className="mb-10 text-center font-black text-xl tracking-tighter border-b border-blue-800 pb-4">
        SII ITC
      </div>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${item.active ? 'bg-blue-800 border-l-4 border-green-500' : 'hover:bg-blue-900 text-gray-400 hover:text-white'}`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </nav>

      <button 
        onClick={onLogout}
        className="mt-auto flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-950 hover:text-red-500 transition font-bold"
      >
        <LogOut size={20} />
        Cerrar Sesión
      </button>
    </aside>
  );
};