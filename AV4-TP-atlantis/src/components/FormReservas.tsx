import { useState } from "react";
import { FiX, FiTrash2 } from "react-icons/fi";
import clientesBase from "../mocks/clientes";

interface HospedeReserva {
  id: number;
  nome: string;
  tipo: "Titular" | "Dependente";
  titularId?: number;
}

interface FormReservaProps {
  aberto: boolean;
  onClose: () => void;
  onSalvar: (novaReserva: any) => void;
}

export default function FormReserva({
  aberto,
  onClose,
  onSalvar,
}: FormReservaProps) {
  const [quarto, setQuarto] = useState("");

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [status, setStatus] = useState<
    | "Confirmada"
    | "Hospedado"
    | "Check-out"
    | "Pendente"
    | "Cancelada"
  >("Pendente");

  const [titularSelecionado, setTitularSelecionado] =
    useState<number | null>(null);

  const [dependentesSelecionados, setDependentesSelecionados] =
    useState<number[]>([]);

  const titulares = clientesBase.filter(
    (cliente) => cliente.tipo === "Titular"
  );

  const titular = clientesBase.find(
    (cliente) =>
      cliente.id === titularSelecionado
  );

  const dependentes = clientesBase.filter(
    (cliente) =>
      cliente.tipo === "Dependente" &&
      cliente.titularId === titularSelecionado
  );

  if (!aberto) return null;

  function selecionarTitular(id: number) {
    setTitularSelecionado(id);

    const deps = clientesBase
      .filter(
        (cliente) =>
          cliente.tipo === "Dependente" &&
          cliente.titularId === id
      )
      .map((dep) => dep.id);

    setDependentesSelecionados(deps);
  }

  function removerDependente(id: number) {
    setDependentesSelecionados((prev) =>
      prev.filter((depId) => depId !== id)
    );
  }

  function adicionarDependente(id: number) {
    if (
      dependentesSelecionados.includes(id)
    )
      return;

    setDependentesSelecionados((prev) => [
      ...prev,
      id,
    ]);
  }

  function salvar() {
    if (!titular) return;

    const hospedes: HospedeReserva[] = [
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
          tipo: "Dependente" as const,
          titularId: dep.titularId,
        })),
    ];

    const novaReserva = {
      id: Date.now(),
      hospedes,
      quarto,
      checkIn,
      checkOut,
      status,

      avatar: titular.nome
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join(""),
    };

    onSalvar(novaReserva);
    onClose();

    setQuarto("");
    setCheckIn("");
    setCheckOut("");
    setStatus("Pendente");
    setTitularSelecionado(null);
    setDependentesSelecionados([]);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            Nova Reserva
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center"
          >
            <FiX />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium text-slate-600">
                Quarto
              </label>

              <input
                value={quarto}
                onChange={(e) =>
                  setQuarto(e.target.value)
                }
                className="w-full mt-1 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as
                      | "Confirmada"
                      | "Hospedado"
                      | "Check-out"
                      | "Pendente"
                      | "Cancelada"
                  )
                }
                className="w-full mt-1 border border-slate-200 rounded-xl px-4 py-2.5"
              >
                <option value="Pendente">
                  Pendente
                </option>

                <option value="Confirmada">
                  Confirmada
                </option>

                <option value="Hospedado">
                  Hospedado
                </option>

                <option value="Check-out">
                  Check-out
                </option>

                <option value="Cancelada">
                  Cancelada
                </option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Check-in
              </label>

              <input
                type="date"
                value={checkIn}
                onChange={(e) =>
                  setCheckIn(e.target.value)
                }
                className="w-full mt-1 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Check-out
              </label>

              <input
                type="date"
                value={checkOut}
                onChange={(e) =>
                  setCheckOut(e.target.value)
                }
                className="w-full mt-1 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>

          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Titular da Reserva
            </label>

            <select
              value={titularSelecionado ?? ""}
              onChange={(e) =>
                selecionarTitular(
                  Number(e.target.value)
                )
              }
              className="w-full mt-1 border border-slate-200 rounded-xl px-4 py-2.5"
            >
              <option value="">
                Selecione um titular
              </option>

              {titulares.map((titular) => (
                <option
                  key={titular.id}
                  value={titular.id}
                >
                  {titular.nome}
                </option>
              ))}
            </select>
          </div>

          {titular && (
            <div className="border border-slate-200 rounded-2xl p-4">

              <h3 className="font-semibold text-slate-700 mb-4">
                Hóspedes da Reserva
              </h3>

              <div className="space-y-3">

                <div className="flex items-center justify-between border border-slate-200 rounded-xl px-4 py-3">
                  <div>
                    <p className="font-medium text-slate-800">
                      {titular.nome}
                    </p>

                    <p className="text-xs text-slate-400">
                      Titular
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                    Titular
                  </span>
                </div>

                {dependentesSelecionados.map(
                  (depId) => {
                    const dep =
                      dependentes.find(
                        (d) => d.id === depId
                      );

                    if (!dep) return null;

                    return (
                      <div
                        key={dep.id}
                        className="flex items-center justify-between border border-slate-200 rounded-xl px-4 py-3"
                      >
                        <div>
                          <p className="font-medium text-slate-800">
                            {dep.nome}
                          </p>

                          <p className="text-xs text-slate-400">
                            Dependente
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                            Dependente
                          </span>

                          <button
                            onClick={() =>
                              removerDependente(
                                dep.id
                              )
                            }
                            className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  }
                )}

                {dependentes.length > 0 && (
                  <div className="pt-2">
                    <label className="text-sm font-medium text-slate-600">
                      Adicionar dependente
                    </label>

                    <select
                      defaultValue=""
                      onChange={(e) => {
                        const id = Number(
                          e.target.value
                        );

                        if (!id) return;

                        adicionarDependente(id);

                        e.target.value = "";
                      }}
                      className="w-full mt-1 border border-slate-200 rounded-xl px-4 py-2.5"
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
                            key={dep.id}
                            value={dep.id}
                          >
                            {dep.nome}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {dependentes.length === 0 && (
                  <p className="text-sm text-slate-400">
                    Esse titular não possui dependentes.
                  </p>
                )}

              </div>
            </div>
          )}

        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200"
          >
            Cancelar
          </button>

          <button
            onClick={salvar}
            className="px-5 py-2.5 rounded-xl bg-[#0f1f3d] text-white"
          >
            Salvar Reserva
          </button>

        </div>
      </div>
    </div>
  );
}