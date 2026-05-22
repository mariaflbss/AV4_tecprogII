import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FiX,
  FiTrash2,
} from "react-icons/fi";

import clientesBase from "../mocks/clientes";

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

interface FormReservaProps {
  aberto: boolean;
  onClose: () => void;
  onSalvar: (
    reserva: Reserva
  ) => void;

  reservaEditando?: Reserva | null;
}

const STATUS_OPTIONS = [
  "Pendente",
  "Confirmada",
  "Hospedado",
  "Check-out",
  "Cancelada",
] as const;

export default function FormReserva({
  aberto,
  onClose,
  onSalvar,
  reservaEditando,
}: FormReservaProps) {
  const [quarto, setQuarto] =
    useState("");

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [status, setStatus] =
    useState<
      | "Confirmada"
      | "Hospedado"
      | "Check-out"
      | "Pendente"
      | "Cancelada"
    >("Pendente");

  const [
    titularSelecionado,
    setTitularSelecionado,
  ] = useState<number | null>(null);

  const [
    dependentesSelecionados,
    setDependentesSelecionados,
  ] = useState<number[]>([]);

  const titulares = useMemo(
    () =>
      clientesBase.filter(
        (cliente) =>
          cliente.tipo ===
          "Titular"
      ),
    []
  );

  const titular = useMemo(
    () =>
      clientesBase.find(
        (cliente) =>
          cliente.id ===
          titularSelecionado
      ),
    [titularSelecionado]
  );

  const dependentes = useMemo(
    () =>
      clientesBase.filter(
        (cliente) =>
          cliente.tipo ===
            "Dependente" &&
          cliente.titularId ===
            titularSelecionado
      ),
    [titularSelecionado]
  );

  useEffect(() => {
    if (
      aberto &&
      reservaEditando
    ) {
      setQuarto(
        reservaEditando.quarto
      );

      setCheckIn(
        reservaEditando.checkIn
      );

      setCheckOut(
        reservaEditando.checkOut
      );

      setStatus(
        reservaEditando.status
      );

      const titular =
        reservaEditando.hospedes.find(
          (h) =>
            h.tipo ===
            "Titular"
        );

      setTitularSelecionado(
        titular?.id || null
      );

      const dependentesIds =
        reservaEditando.hospedes
          .filter(
            (h) =>
              h.tipo ===
              "Dependente"
          )
          .map((h) => h.id);

      setDependentesSelecionados(
        dependentesIds
      );

      return;
    }

    if (aberto) {
      limparFormulario();
    }
  }, [
    aberto,
    reservaEditando,
  ]);

  if (!aberto) return null;

  function limparFormulario() {
    setQuarto("");
    setCheckIn("");
    setCheckOut("");
    setStatus("Pendente");
    setTitularSelecionado(
      null
    );
    setDependentesSelecionados(
      []
    );
  }

  function selecionarTitular(
    id: number
  ) {
    setTitularSelecionado(id);

    const deps =
      clientesBase
        .filter(
          (cliente) =>
            cliente.tipo ===
              "Dependente" &&
            cliente.titularId === id
        )
        .map((dep) => dep.id);

    setDependentesSelecionados(
      deps
    );
  }

  function removerDependente(
    id: number
  ) {
    setDependentesSelecionados(
      (prev) =>
        prev.filter(
          (depId) =>
            depId !== id
        )
    );
  }

  function adicionarDependente(
    id: number
  ) {
    if (
      dependentesSelecionados.includes(
        id
      )
    )
      return;

    setDependentesSelecionados(
      (prev) => [...prev, id]
    );
  }

  function gerarAvatar(
    nome: string
  ) {
    return nome
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("");
  }

  function salvar() {
    if (!titular) return;

    const hospedes: HospedeReserva[] =
      [
        {
          id: titular.id,
          nome: titular.nome,
          tipo: "Titular",
        },

        ...dependentes
          .filter((dep) =>
            dependentesSelecionados.includes(
              dep.id
            )
          )
          .map((dep) => ({
            id: dep.id,
            nome: dep.nome,
            tipo:
              "Dependente" as const,
            titularId:
              dep.titularId,
          })),
      ];

    const reserva: Reserva = {
      id:
        reservaEditando?.id ||
        Date.now(),
      hospedes,
      quarto,
      checkIn,
      checkOut,
      status,
      avatar: gerarAvatar(
        titular.nome
      ),
    };

    onSalvar(reserva);
    limparFormulario();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {reservaEditando
                ? "Editar Reserva"
                : "Nova Reserva"}
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Preencha os dados da
              reserva e hóspedes.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Quarto">
              <input
                value={quarto}
                onChange={(e) =>
                  setQuarto(
                    e.target.value
                  )
                }
                placeholder="Ex: 301"
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f3d]/20"
              />
            </Field>

            <Field label="Status">
              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target
                      .value as typeof status
                  )
                }
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f3d]/20"
              >
                {STATUS_OPTIONS.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </Field>

            <Field label="Check-in">
              <input
                type="date"
                value={checkIn}
                onChange={(e) =>
                  setCheckIn(
                    e.target.value
                  )
                }
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f3d]/20"
              />
            </Field>

            <Field label="Check-out">
              <input
                type="date"
                value={checkOut}
                onChange={(e) =>
                  setCheckOut(
                    e.target.value
                  )
                }
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f3d]/20"
              />
            </Field>
          </div>

          <div>
            <Field label="Titular da Reserva">
              <select
                value={
                  titularSelecionado ??
                  ""
                }
                onChange={(e) =>
                  selecionarTitular(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f3d]/20"
              >
                <option value="">
                  Selecione um titular
                </option>

                {titulares.map(
                  (titular) => (
                    <option
                      key={
                        titular.id
                      }
                      value={
                        titular.id
                      }
                    >
                      {titular.nome}
                    </option>
                  )
                )}
              </select>
            </Field>
          </div>

          {titular && (
            <div className="border border-slate-200 rounded-3xl p-5 bg-slate-50/50">
              <div className="mb-5">
                <h3 className="font-bold text-slate-800">
                  Hóspedes da Reserva
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  Gerencie titulares e
                  dependentes vinculados.
                </p>
              </div>

              <div className="space-y-3">
                <HospedeCard
                  nome={titular.nome}
                  tipo="Titular"
                />

                {dependentesSelecionados.map(
                  (depId) => {
                    const dep =
                      dependentes.find(
                        (d) =>
                          d.id === depId
                      );

                    if (!dep)
                      return null;

                    return (
                      <HospedeCard
                        key={dep.id}
                        nome={dep.nome}
                        tipo="Dependente"
                        acao={
                          <button
                            onClick={() =>
                              removerDependente(
                                dep.id
                              )
                            }
                            className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-100 transition-colors"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        }
                      />
                    );
                  }
                )}
              </div>

              {dependentes.length >
              0 ? (
                <div className="mt-5">
                  <Field label="Adicionar dependente">
                    <select
                      defaultValue=""
                      onChange={(
                        e
                      ) => {
                        const id =
                          Number(
                            e.target
                              .value
                          );

                        if (!id)
                          return;

                        adicionarDependente(
                          id
                        );

                        e.target.value =
                          "";
                      }}
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f3d]/20"
                    >
                      <option value="">
                        Selecionar dependente
                      </option>

                      {dependentes
                        .filter(
                          (dep) =>
                            !dependentesSelecionados.includes(
                              dep.id
                            )
                        )
                        .map((dep) => (
                          <option
                            key={
                              dep.id
                            }
                            value={
                              dep.id
                            }
                          >
                            {dep.nome}
                          </option>
                        ))}
                    </select>
                  </Field>
                </div>
              ) : (
                <div className="mt-5 border border-dashed border-slate-200 rounded-2xl p-4 text-center">
                  <p className="text-sm text-slate-400">
                    Esse titular não
                    possui dependentes.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-6 py-5 border-t border-slate-100 flex items-center justify-end gap-3 bg-white">
          <button
            onClick={() => {
              limparFormulario();

              onClose();
            }}
            className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>

          <button
            onClick={salvar}
            className="px-5 py-2.5 rounded-2xl bg-[#0f1f3d] text-white hover:bg-[#1a3360] transition-colors"
          >
            {reservaEditando
              ? "Salvar Alterações"
              : "Salvar Reserva"}
          </button>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

function Field({
  label,
  children,
}: FieldProps) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-600 mb-1.5 block">
        {label}
      </label>

      {children}
    </div>
  );
}

interface HospedeCardProps {
  nome: string;

  tipo:
    | "Titular"
    | "Dependente";

  acao?: React.ReactNode;
}

function HospedeCard({
  nome,
  tipo,
  acao,
}: HospedeCardProps) {
  const isTitular =
    tipo === "Titular";

  return (
    <div className="flex items-center justify-between border border-slate-200 bg-white rounded-2xl px-4 py-3">
      <div>
        <p className="font-medium text-slate-800">
          {nome}
        </p>

        <p className="text-xs text-slate-400 mt-0.5">
          {tipo}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            isTitular
              ? "bg-blue-100 text-blue-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {tipo}
        </span>

        {acao}
      </div>
    </div>
  );
}