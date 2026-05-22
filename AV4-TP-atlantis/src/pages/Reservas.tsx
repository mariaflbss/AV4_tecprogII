import { useState } from "react";

import {
  FiSearch,
  FiPlus,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiLogIn,
} from "react-icons/fi";

import { LuBed } from "react-icons/lu";

import Menu from "../shared/components/Menu";
import Card from "../shared/components/Card";
// import Modal from "../shared/components/Modal"
import FormReservas from "../components/FormReservas";
import DetalhesReserva from "../components/DetalheReserva";

interface HospedeReserva {
  id: number;
  nome: string;
  tipo: "Titular" | "Dependente";
  titularId?: number;
}

interface Reserva {
  id: number;
  hospedes: HospedeReserva[];
  quarto: string;
  checkIn: string;
  checkOut: string;
  status:
    | "Confirmada"
    | "Hospedado"
    | "Check-out"
    | "Pendente"
    | "Cancelada";
  avatar: string;
}

const reservasIniciais: Reserva[] = [
  {
    id: 1,

    hospedes: [
      {
        id: 1,
        nome: "Alan Turing",
        tipo: "Titular",
      },

      {
        id: 2,
        nome: "Maria Fernanda Laboissiere",
        tipo: "Dependente",
        titularId: 1,
      },
    ],

    quarto: "301",
    checkIn: "2026-05-14",
    checkOut: "2026-05-17",
    status: "Confirmada",
    avatar: "AT",
  },

  {
    id: 2,

    hospedes: [
      {
        id: 5,
        nome: "Linus Torvalds",
        tipo: "Titular",
      },

      {
        id: 6,
        nome: "Dennis Ritchie",
        tipo: "Dependente",
        titularId: 5,
      },
    ],

    quarto: "205",
    checkIn: "2026-05-15",
    checkOut: "2026-05-19",
    status: "Hospedado",
    avatar: "LT",
  },

  {
    id: 3,

    hospedes: [
      {
        id: 7,
        nome: "George Washington Carver",
        tipo: "Titular",
      },

      {
        id: 8,
        nome: "Tim Berners-Lee",
        tipo: "Dependente",
        titularId: 7,
      },
    ],

    quarto: "412",
    checkIn: "2026-05-13",
    checkOut: "2026-05-16",
    status: "Confirmada",
    avatar: "GC",
  },

  {
    id: 4,

    hospedes: [
      {
        id: 9,
        nome: "Mae Jemison",
        tipo: "Titular",
      },

      {
        id: 10,
        nome: "Claude Shannon",
        tipo: "Dependente",
        titularId: 9,
      },
    ],

    quarto: "108",
    checkIn: "2026-05-16",
    checkOut: "2026-05-18",
    status: "Pendente",
    avatar: "MJ",
  },

  {
    id: 5,

    hospedes: [
      {
        id: 11,
        nome: "Nikola Tesla",
        tipo: "Titular",
      },

      {
        id: 12,
        nome: "Neil deGrasse Tyson",
        tipo: "Dependente",
        titularId: 11,
      },
    ],

    quarto: "510",
    checkIn: "2026-05-20",
    checkOut: "2026-05-24",
    status: "Cancelada",
    avatar: "NT",
  },
];

const statusConfig: Record<
  Reserva["status"],
  { classe: string; ponto: string }
> = {
  Confirmada: {
    classe:
      "bg-blue-50 text-blue-700 border border-blue-200",

    ponto: "bg-blue-500",
  },

  Hospedado: {
    classe:
      "bg-emerald-50 text-emerald-700 border border-emerald-200",

    ponto: "bg-emerald-500",
  },

  "Check-out": {
    classe:
      "bg-slate-100 text-slate-600 border border-slate-200",

    ponto: "bg-slate-400",
  },

  Pendente: {
    classe:
      "bg-amber-50 text-amber-700 border border-amber-200",

    ponto: "bg-amber-400",
  },

  Cancelada: {
    classe:
      "bg-rose-50 text-rose-600 border border-rose-200",

    ponto: "bg-rose-400",
  },
};

export default function Reservas() {
  const [reservas, setReservas] =
    useState<Reserva[]>(reservasIniciais);

  const [busca, setBusca] = useState("");

  const [filtroStatus, setFiltroStatus] =
    useState<"Todos" | Reserva["status"]>("Todos");

  const [pagina, setPagina] = useState(1);

  const reservasPorPagina = 10;

  const [modalForm, setModalForm] =
    useState(false);

  const [modalDetalhes, setModalDetalhes] =
    useState(false);

  const [reservaSelecionada, setReservaSelecionada] =
    useState<Reserva | null>(null);

  const [reservaEditando, setReservaEditando] =
    useState<Reserva | null>(null);

  const filtradas = reservas.filter((r) => {
    const buscaOk =
      r.hospedes.some((h) =>
        h.nome
          .toLowerCase()
          .includes(busca.toLowerCase())
      ) || r.quarto.includes(busca);

    const statusOk =
      filtroStatus === "Todos" ||
      r.status === filtroStatus;

    return buscaOk && statusOk;
  });

  const totalPaginas = Math.ceil(
    filtradas.length / reservasPorPagina
  );

  const indiceInicial =
    (pagina - 1) * reservasPorPagina;

  const indiceFinal =
    indiceInicial + reservasPorPagina;

  const reservasPaginadas = filtradas.slice(
    indiceInicial,
    indiceFinal
  );

  const total = reservas.length;

  const confirmadas = reservas.filter(
    (r) => r.status === "Confirmada"
  ).length;

  const hospedados = reservas.filter(
    (r) => r.status === "Hospedado"
  ).length;

  function excluir(id: number) {
    setReservas((prev) =>
      prev.filter((r) => r.id !== id)
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Menu />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Gestão de Reservas
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Acompanhe e gerencie todas as reservas de
            quartos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
          <MetricCard
            titulo="Total de Reservas"
            valor={String(total)}
            icone={
              <LuBed
                size={18}
                className="text-white"
              />
            }
            corIcone="bg-slate-700"
            corValor="text-slate-900"
          />

          <MetricCard
            titulo="Confirmadas"
            valor={String(confirmadas)}
            icone={
              <FiCheckCircle
                size={18}
                className="text-white"
              />
            }
            corIcone="bg-blue-500"
            corValor="text-blue-600"
          />

          <MetricCard
            titulo="Hospedados"
            valor={String(hospedados)}
            icone={
              <FiLogIn
                size={18}
                className="text-white"
              />
            }
            corIcone="bg-emerald-500"
            corValor="text-emerald-600"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <FiSearch
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

            <input
              type="text"
              placeholder="Buscar por hóspede ou quarto..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
              className="
                w-full pl-9 pr-4 py-2.5 text-sm rounded-xl
                border border-slate-200 bg-white
                text-slate-700 placeholder:text-slate-400
                focus:outline-none focus:ring-2 focus:ring-[#0f1f3d]/20
                focus:border-[#0f1f3d]/40
                shadow-[0_1px_4px_rgba(0,0,0,0.04)]
                transition
              "
            />
          </div>

          <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-x-auto">
            {(
              [
                "Todos",
                "Confirmada",
                "Hospedado",
                "Check-out",
                "Pendente",
                "Cancelada",
              ] as const
            ).map((op) => (
              <button
                key={op}
                onClick={() => {
                  setFiltroStatus(op);
                  setPagina(1);
                }}
                className={`
                  px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all
                  ${
                    filtroStatus === op
                      ? "bg-[#0f1f3d] text-white shadow"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }
                `}
              >
                {op}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setReservaEditando(null);
              setModalForm(true);
            }}
            className="
              flex items-center gap-2
              px-4 py-2.5
              text-sm font-semibold text-white
              bg-[#0f1f3d]
              rounded-xl
              hover:bg-[#1a3360]
              active:scale-[0.97]
              transition
              shadow-[0_4px_12px_rgba(15,31,61,0.25)]
            "
          >
            <FiPlus size={15} />
            Nova Reserva
          </button>
        </div>

        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  {[
                    "Hóspede",
                    "Quarto",
                    "Check-in",
                    "Check-out",
                    "Status",
                    "Ações",
                  ].map((col) => (
                    <th
                      key={col}
                      className="text-left px-5 py-3.5 text-xs font-bold tracking-wider text-slate-400 uppercase"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtradas.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-16 text-slate-400 text-sm"
                    >
                      Nenhuma reserva encontrada.
                    </td>
                  </tr>
                ) : (
                  reservasPaginadas.map((r) => {
                    const cfg = statusConfig[r.status];

                    const titular =
                      r.hospedes.find(
                        (h) =>
                          h.tipo === "Titular"
                      );

                    return (
                      <tr
                        key={r.id}
                        className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-800">
                              {titular?.nome}
                            </span>

                            <span className="text-xs text-slate-400">
                              {
                                r.hospedes.filter(
                                  (h) =>
                                    h.tipo ===
                                    "Dependente"
                                ).length
                              }{" "}
                              dependente(s)
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-3.5">
                          <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                            #{r.quarto}
                          </span>
                        </td>

                        <td className="px-5 py-3.5 text-slate-500">
                          {r.checkIn}
                        </td>

                        <td className="px-5 py-3.5 text-slate-500">
                          {r.checkOut}
                        </td>

                        <td className="px-5 py-3.5">
                          <span
                            className={`
                              inline-flex items-center gap-1.5
                              px-2.5 py-1
                              rounded-full
                              text-xs font-semibold
                              ${cfg.classe}
                            `}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${cfg.ponto}`}
                            />

                            {r.status}
                          </span>
                        </td>

                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setReservaSelecionada(r);
                                setModalDetalhes(true);
                              }}
                              title="Visualizar"
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-sky-500 hover:bg-sky-50 transition-colors"
                            >
                              <FiEye size={15} />
                            </button>

                            <button
                              title="Editar"
                              onClick={() => {
                                setReservaEditando(r);
                                setModalForm(true);
                              }}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors"
                            >
                              <FiEdit2 size={15} />
                            </button>

                            <button
                              title="Excluir"
                              onClick={() =>
                                excluir(r.id)
                              }
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors"
                            >
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {filtradas.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center">
              <p className="text-xs text-slate-400 min-w-[180px]">
                Exibindo{" "}
                <span className="font-semibold text-slate-600">
                  {reservasPaginadas.length}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-slate-600">
                  {filtradas.length}
                </span>{" "}
                reservas
              </p>

              <div className="flex items-center gap-2 mr-auto ml-120">
                <button
                  className="
                    w-10 h-10
                    rounded-xl
                    border border-slate-200
                    bg-white
                    text-slate-700
                    text-lg font-semibold
                    flex items-center justify-center
                    hover:bg-slate-100
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition
                  "
                  disabled={pagina === 1}
                  onClick={() =>
                    setPagina((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                >
                  «
                </button>

                <div
                  className="
                    h-10 px-5
                    rounded-xl
                    bg-slate-900
                    text-white
                    text-sm font-medium
                    flex items-center justify-center
                    shadow-sm
                  "
                >
                  Página {pagina} de{" "}
                  {totalPaginas || 1}
                </div>

                <button
                  className="
                    w-10 h-10
                    rounded-xl
                    border border-slate-200
                    bg-white
                    text-slate-700
                    text-lg font-semibold
                    flex items-center justify-center
                    hover:bg-slate-100
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition
                  "
                  disabled={
                    pagina === totalPaginas ||
                    totalPaginas === 0
                  }
                  onClick={() =>
                    setPagina((prev) =>
                      Math.min(
                        prev + 1,
                        totalPaginas
                      )
                    )
                  }
                >
                  »
                </button>
              </div>
            </div>
          )}
        </Card>
        <FormReservas 
          key={reservaEditando?.id || "nova"}
          aberto={modalForm}
          reservaEditando ={reservaEditando}
          onClose={() => {
            setModalForm(false);
            setReservaEditando(null);
          }}
          onSalvar={(novaReserva) => {
            if (reservaEditando) {
              setReservas((prev) =>
                prev.map((r) =>
                  r.id === novaReserva.id
                    ? novaReserva
                    : r
                )
              );
            } else {
              setReservas((prev) => [
                novaReserva,
                ...prev,
              ]);
            }

            setReservaEditando(null);
          }}
        />

        <DetalhesReserva
          aberto={modalDetalhes}
          reserva={reservaSelecionada}
          onClose={() => {
            setModalDetalhes(false);
            setReservaSelecionada(null);
          }}
        />
      </main>
    </div>
  );
}

interface MetricCardProps {
  titulo: string;
  valor: string;
  icone: React.ReactNode;
  corIcone: string;
  corValor: string;
}

function MetricCard({
  titulo,
  valor,
  icone,
  corIcone,
  corValor,
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">
          {titulo}
        </p>

        <div
          className={`w-8 h-8 rounded-lg ${corIcone} flex items-center justify-center`}
        >
          {icone}
        </div>
      </div>

      <p className={`text-2xl font-black ${corValor}`}>
        {valor}
      </p>
    </div>
  );
}