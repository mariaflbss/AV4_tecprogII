import { ReactNode } from "react";
import {
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiUserPlus,
  FiClipboard,
  FiPlusCircle,
} from "react-icons/fi";
import { LuBed } from "react-icons/lu";

import Card from "../shared/components/Card";
import Tabela from "../shared/components/Tabela";
import Menu from "../shared/components/Menu";
import GraficoReservas from "../components/GraficoReservas";

interface Reserva {
  hospede: string;
  quarto: string;
  checkIn: string;
  checkOut: string;
  status: "Confirmada" | "Hospedado" | "Pendente" | "Cancelada";
}

const reservas: Reserva[] = [
  {
    hospede: "Alan Turing",
    quarto: "301",
    checkIn: "15/05/2026",
    checkOut: "18/05/2026",
    status: "Confirmada",
  },
  {
    hospede: "Maria Laboissiere",
    quarto: "205",
    checkIn: "16/05/2026",
    checkOut: "20/05/2026",
    status: "Confirmada",
  },
  {
    hospede: "Gerson da Penha",
    quarto: "412",
    checkIn: "14/05/2026",
    checkOut: "17/05/2026",
    status: "Hospedado",
  },
  {
    hospede: "Ada Lovelace",
    quarto: "108",
    checkIn: "17/05/2026",
    checkOut: "19/05/2026",
    status: "Pendente",
  },
];

const statusColors = {
  Confirmada: "bg-emerald-50 text-emerald-700",
  Hospedado: "bg-indigo-50 text-indigo-700",
  Pendente: "bg-amber-50 text-amber-700",
  Cancelada: "bg-red-50 text-red-700",
};

const colunas = [
  {
    chave: "hospede",
    titulo: "Hóspede",
    render: (v: unknown) => (
      <span className="font-medium text-slate-800">{String(v)}</span>
    ),
  },
  {
    chave: "quarto",
    titulo: "Quarto",
    render: (v: unknown) => (
      <span className="text-xs bg-slate-100 px-2 py-1 rounded">
        {String(v)}
      </span>
    ),
  },
  {
    chave: "checkIn",
    titulo: "Check-in",
  },
  {
    chave: "checkOut",
    titulo: "Check-out",
  },
  {
    chave: "status",
    titulo: "Status",
    render: (v: unknown) => (
      <span
        className={`text-xs px-2 py-1 rounded-full font-medium ${
          statusColors[v as keyof typeof statusColors]
        }`}
      >
        {String(v)}
      </span>
    ),
  },
];

interface InfoCardProps {
  titulo: string;
  valor: string;
  icone: ReactNode;
  cor: string;
}

function InfoCard({ titulo, valor, icone, cor }: InfoCardProps) {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-400">{titulo}</p>
        <strong className="text-2xl text-slate-900">{valor}</strong>
      </div>

      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${cor}`}
      >
        {icone}
      </div>
    </Card>
  );
}

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <button className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm hover:bg-slate-800 transition">
      {icon}
      {label}
    </button>
  );
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Menu />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

          <p className="text-sm text-slate-500 mt-1">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <InfoCard
            titulo="Hóspedes"
            valor="1.234"
            icone={<FiUsers className="text-white" />}
            cor="bg-indigo-500"
          />

          <InfoCard
            titulo="Quartos"
            valor="42"
            icone={<LuBed className="text-white" />}
            cor="bg-emerald-500"
          />

          <InfoCard
            titulo="Reservas"
            valor="87"
            icone={<FiCalendar className="text-white" />}
            cor="bg-amber-500"
          />

          <InfoCard
            titulo="Receita"
            valor="R$ 124.500"
            icone={<FiDollarSign className="text-white" />}
            cor="bg-violet-500"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
          <Card className="xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800">
                Reservas recentes
              </h2>

              <span className="text-sm text-slate-400">
                {reservas.length} reservas
              </span>
            </div>

            <Tabela
              colunas={colunas}
              dados={reservas as unknown as Record<string, unknown>[]}
              linhasPorPagina={4}
            />
          </Card>

          <Card>
            <h2 className="font-semibold text-slate-800 mb-4">
              Ações rápidas
            </h2>

            <div className="flex flex-col gap-3">
              <ActionButton
                icon={<FiUserPlus size={16} />}
                label="Adicionar hóspede"
              />

              <ActionButton
                icon={<FiClipboard size={16} />}
                label="Registrar reserva"
              />

              <ActionButton
                icon={<FiPlusCircle size={16} />}
                label="Adicionar quarto"
              />
            </div>
          </Card>
        </div>

        <Card>
          <GraficoReservas />
        </Card>
      </main>
    </div>
  );
}