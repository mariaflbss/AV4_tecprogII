import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { TbLayoutDashboard } from "react-icons/tb";
import { FiUsers, FiLogOut, FiCalendar, FiMenu, FiX } from "react-icons/fi";
import { BiBuildings } from "react-icons/bi";
import { LuHotel } from "react-icons/lu";

const menuItems = [
  { name: "Dashboard",    path: "/dashboard",   icon: TbLayoutDashboard },
  { name: "Clientes",     path: "/clientes",    icon: FiUsers },
  { name: "Acomodações",  path: "/acomodacoes", icon: BiBuildings },
  { name: "Reservas",     path: "/hospedagens", icon: FiCalendar },
];

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`
        h-screen sticky top-0 flex flex-col
        bg-[#1e2a4a] text-white
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[72px]" : "w-64"}
      `}
    >
      {/* LOGO + TOGGLE */}
      <div
        className={`
          h-[72px] flex items-center shrink-0
          border-b border-white/10
          ${collapsed ? "justify-center px-0" : "justify-between px-5"}
        `}
      >
        {!collapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-[#c9a227] p-2.5 rounded-xl shrink-0">
              <LuHotel size={20} className="text-white" />
            </div>
            <div className="leading-tight overflow-hidden">
              <p className="font-bold text-white text-base leading-none truncate">
                Atlantis
              </p>
              <p className="text-[11px] text-white/50 truncate mt-0.5">
                Sistema de Hospedagem
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          className={`
            w-9 h-9 rounded-xl flex items-center justify-center shrink-0
            text-white/60 hover:text-white hover:bg-white/10
            transition-colors duration-200
            ${collapsed ? "" : "ml-2"}
          `}
        >
          {collapsed ? <FiMenu size={18} /> : <FiX size={18} />}
        </button>
      </div>

      {/* NAV ITEMS */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto overflow-x-hidden space-y-1">
        {menuItems.map(({ name, path, icon: Icon }) => {
          const active = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              title={collapsed ? name : undefined}
              className={`
                group flex items-center gap-3 rounded-xl
                px-3 py-2.5
                transition-all duration-200
                ${collapsed ? "justify-center" : ""}
                ${
                  active
                    ? "bg-[#c9a227] text-white"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {/* active indicator bar */}
              {active && !collapsed && (
                <span className="absolute left-0 w-1 h-7 bg-white/80 rounded-r-full" />
              )}

              <Icon
                size={20}
                className={`shrink-0 transition-transform duration-200 ${
                  !collapsed && "group-hover:scale-110"
                }`}
              />

              {!collapsed && (
                <span className="text-sm font-medium truncate">{name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="shrink-0 p-3 border-t border-white/10">
        <button
          title={collapsed ? "Sair" : undefined}
          className={`
            w-full flex items-center gap-3 rounded-xl
            px-3 py-2.5
            text-red-400 hover:bg-red-500/15 hover:text-red-300
            transition-colors duration-200
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <FiLogOut size={20} className="shrink-0" />
          {!collapsed && (
            <span className="text-sm font-medium">Sair</span>
          )}
        </button>
      </div>
    </aside>
  );
}