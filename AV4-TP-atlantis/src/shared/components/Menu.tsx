import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import { FiUsers, FiLogOut, FiCalendar, FiMenu, FiX } from "react-icons/fi";
import { BiBuildings } from "react-icons/bi";
import { LuHotel } from "react-icons/lu";

export interface MenuItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const defaultMenuItems: MenuItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: TbLayoutDashboard },
  { label: "Clientes", path: "/clientes", icon: FiUsers },
  { label: "Acomodações", path: "/acomodacoes", icon: BiBuildings },
  { label: "Reservas", path: "/reservas", icon: FiCalendar },
];

interface SidebarProps {
  items?: MenuItem[];
  onLogout?: () => void;
}

export default function Sidebar({
  items = defaultMenuItems,
  onLogout,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    onLogout?.();
    navigate("/login");
  };

  return (
    <aside
      className={`
        h-screen sticky top-0 flex flex-col
        bg-[#0f172a] text-white
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[72px]" : "w-64"}
      `}
    >
      <header
        className={`
          h-[72px] flex items-center border-b border-white/[0.06]
          ${collapsed ? "justify-center" : "justify-between px-5"}
        `}
      >
        {!collapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-indigo-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30">
              <LuHotel size={20} />
            </div>

            <div className="leading-tight overflow-hidden">
              <p className="font-bold truncate">Atlantis</p>
              <p className="text-[11px] text-white/40 truncate">
                Sistema de Hospedagem
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          className="w-9 h-9 rounded-xl flex items-center justify-center
                     text-white/40 hover:text-white hover:bg-white/[0.08]
                     transition-colors"
        >
          {collapsed ? <FiMenu size={18} /> : <FiX size={18} />}
        </button>
      </header>

      <nav className="flex-1 py-2 px-3 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="px-2 pt-5 pb-2 text-[10px] font-semibold uppercase tracking-widest text-white/25">
            Navegação
          </p>
        )}

        {items.map(({ label, path, icon: Icon }) => {
          const active = isActive(path);

          return (
            <Link
              key={path}
              to={path}
              title={collapsed ? label : undefined}
              className={`
                flex items-center gap-3 rounded-xl px-3 py-2.5
                transition-all duration-200
                ${collapsed ? "justify-center" : ""}
                ${
                  active
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                }
              `}
            >
              <Icon size={20} className={active ? "text-indigo-400" : ""} />

              {!collapsed && (
                <span className="text-sm font-medium truncate">
                  {label}
                </span>
              )}

              {active && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
              )}
            </Link>
          );
        })}
      </nav>

      <footer className="p-3 border-t border-white/[0.06]">
        <button
          onClick={handleLogout}
          title={collapsed ? "Sair" : undefined}
          className={`
            w-full flex items-center gap-3 rounded-xl px-3 py-2.5
            text-red-400/70 hover:bg-red-500/10 hover:text-red-400
            transition-colors
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <FiLogOut size={20} />
          {!collapsed && <span className="text-sm font-medium">Sair</span>}
        </button>
      </footer>
    </aside>
  );
}