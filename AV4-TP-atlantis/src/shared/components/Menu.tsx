import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import { FiUsers, FiLogOut, FiCalendar, FiMenu, FiX } from "react-icons/fi";
import { BiBuildings } from "react-icons/bi";
import { LuHotel } from "react-icons/lu";

export interface ItemMenu {
  nome: string;
  caminho: string;
  icone: React.ComponentType<{ size?: number; className?: string }>;
}

const itensMenu: ItemMenu[] = [
  { nome: "Dashboard",    caminho: "/dashboard",    icone: TbLayoutDashboard },
  { nome: "Clientes",     caminho: "/clientes",     icone: FiUsers },
  { nome: "Acomodações",  caminho: "/acomodacoes",  icone: BiBuildings },
  { nome: "Reservas",     caminho: "/reservas",     icone: FiCalendar },
];

interface MenuProps {
  itens?: ItemMenu[];
  onSair?: () => void;
}

export default function Menu({ itens = itensMenu, onSair }: MenuProps) {
  const [recolhido, setRecolhido] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside
      className={`
        h-screen sticky top-0 flex flex-col
        bg-[#0f172a] text-white
        transition-all duration-300 ease-in-out
        ${recolhido ? "w-[72px]" : "w-64"}
      `}
    >
      <div
        className={`
          h-[72px] flex items-center shrink-0
          border-b border-white/[0.06]
          ${recolhido ? "justify-center px-0" : "justify-between px-5"}
        `}
      >
        {!recolhido && (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-indigo-500 p-2.5 rounded-xl shrink-0 shadow-lg shadow-indigo-500/30">
              <LuHotel size={20} className="text-white" />
            </div>
            <div className="leading-tight overflow-hidden">
              <p className="font-bold text-white text-base leading-none truncate tracking-tight">
                Atlantis
              </p>
              <p className="text-[11px] text-white/40 truncate mt-0.5">
                Sistema de Hospedagem
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => setRecolhido(!recolhido)}
          aria-label={recolhido ? "Expandir menu" : "Recolher menu"}
          className={`
            w-9 h-9 rounded-xl flex items-center justify-center shrink-0
            text-white/40 hover:text-white hover:bg-white/[0.08]
            transition-colors duration-200
            ${recolhido ? "" : "ml-2"}
          `}
        >
          {recolhido ? <FiMenu size={18} /> : <FiX size={18} />}
        </button>
      </div>

      {!recolhido && (
        <p className="px-5 pt-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">
          Navegação
        </p>
      )}

      <nav className="flex-1 py-2 px-3 overflow-y-auto overflow-x-hidden space-y-0.5">
        {itens.map(({ nome, caminho, icone: Icone }) => {
          const ativo = location.pathname === caminho;

          return (
            <Link
              key={caminho}
              to={caminho}
              title={recolhido ? nome : undefined}
              className={`
                group relative flex items-center gap-3 rounded-xl
                px-3 py-2.5
                transition-all duration-200
                ${recolhido ? "justify-center" : ""}
                ${
                  ativo
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                }
              `}
            >
              {ativo && !recolhido && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-400 rounded-r-full" />
              )}

              <Icone
                size={20}
                className={`shrink-0 ${ativo ? "text-indigo-400" : ""}`}
              />

              {!recolhido && (
                <span className="text-sm font-medium truncate">{nome}</span>
              )}

              {ativo && !recolhido && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 p-3 border-t border-white/[0.06]">
        <button
          title={recolhido ? "Sair" : undefined}
          onClick={() => {
            if (onSair) {
              onSair();
            }

            navigate("/login");
          }}
          className={`
            w-full flex items-center gap-3 rounded-xl
            px-3 py-2.5
            text-red-400/70 hover:bg-red-500/10 hover:text-red-400
            transition-colors duration-200
            ${recolhido ? "justify-center" : ""}
          `}
        >
          <FiLogOut size={20} className="shrink-0" />
          {!recolhido && (
            <span className="text-sm font-medium">Sair</span>
          )}
        </button>
      </div>
    </aside>
  );
}