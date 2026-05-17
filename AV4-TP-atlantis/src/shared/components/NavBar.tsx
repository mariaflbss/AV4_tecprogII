import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { TbLayoutDashboard } from "react-icons/tb";
import { FiUsers, FiLogOut, FiCalendar } from "react-icons/fi";
import { BiBuildings } from "react-icons/bi";
import { FaBars, FaTimes } from "react-icons/fa";
import { LuHotel } from "react-icons/lu";

export default function NavBar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <TbLayoutDashboard />,
    },
    {
      name: "Clientes",
      path: "/clientes",
      icon: <FiUsers />,
    },
    {
      name: "Acomodações",
      path: "/acomodacoes",
      icon: <BiBuildings />,
    },
    {
      name: "Reservas",
      path: "/hospedagens",
      icon: <FiCalendar />,
    },
  ];

  return (
    <aside
      className={`
        h-screen
        sticky
        top-0
        border-r
        border-base-300
        bg-base-100
        flex
        flex-col
        transition-all
        duration-300
        ease-in-out
        ${collapsed ? "w-20" : "w-72"}
      `}
    >
      <div className="h-20 border-b border-base-300 flex items-center px-4">
        <div
          className={`flex items-center w-full ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-3 rounded-2xl">
                <LuHotel size={22} />
              </div>

              <div>
                <h1 className="font-bold text-base-content text-lg leading-none">
                  Atlantis
                </h1>

                <p className="text-xs text-base-content/60">
                  Sistema de Hospedagem
                </p>
              </div>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="
              btn
              btn-ghost
              btn-square
              hover:bg-base-200
              transition-all
            "
          >
            {collapsed ? <FaBars size={16} /> : <FaTimes size={16} />}
          </button>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  title={collapsed ? item.name : ""}
                  className={`
                    group
                    relative
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    px-4
                    py-3
                    transition-all
                    duration-200
                    transform-gpu

                    ${
                      active
                        ? `
                          bg-primary
                          text-primary-content
                          hover:translate-x-1
                          hover:opacity-90
                        `
                        : `
                          text-base-content/70
                          hover:bg-base-200
                          hover:text-base-content
                          hover:translate-x-1
                        `
                    }

                    ${collapsed ? "justify-center px-0" : ""}
                  `}
                >
                  <span className="text-[22px] shrink-0">
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <span className="font-medium truncate">
                      {item.name}
                    </span>
                  )}

                  {active && (
                    <div
                      className="
                        absolute
                        left-0
                        top-2
                        h-8
                        w-1
                        rounded-r-full
                        bg-primary-content
                      "
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-base-300 p-4">
        <button
          className={`
            btn
            btn-error
            rounded-2xl
            transition-all
            duration-300
            hover:translate-x-1
            flex
            items-center
            justify-center
            gap-2
            text-base
            h-14
            w-full
          `}
        >
          <FiLogOut size={20} />

          {!collapsed && (
            <span className="font-medium">
              Sair
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}