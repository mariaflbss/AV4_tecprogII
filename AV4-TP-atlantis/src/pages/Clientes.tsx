import { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import Menu from "../shared/components/Menu";
import Card from "../shared/components/Card";
import Modal from "../shared/components/Modal";
import DetalheCliente from "../components/DetalheCliente";
import FormCliente from "../components/FormCliente";
import clientesBase from "../mocks/clientes";

interface Documento {
  tipo: string;
  numero: string;
}

interface Cliente {
  id: number;
  nome: string;
  nomeSocial: string;
  dataNascimento: string;
  tipo: "Titular" | "Dependente";
  titularId?: number;
  cpf: string;
  telefone: string;
  email: string;
  endereco: string;
  reutilizarEndereco: boolean;
  reutilizarTelefone: boolean;
  documentos: Documento[];
  status: "Ativo" | "Inativo";
}

export default function Clientes() {
  const [busca, setBusca] = useState("");

  const [filtro, setFiltro] = useState<
    "Todos" | "Ativo" | "Inativo"
  >("Todos");

  const [filtroTipo, setFiltroTipo] =
  useState<
    "Todos" | "Titular" | "Dependente"
  >("Todos");

  const [clientes, setClientes] =
    useState<Cliente[]>(clientesBase);

  const [pagina, setPagina] = useState(1);

  const [modalNovo, setModalNovo] = useState(false);

  const [modalVisualizar, setModalVisualizar] =
    useState(false);

  const [modalEditar, setModalEditar] =
    useState(false);

  const [clienteSelecionado, setClienteSelecionado] =
    useState<Cliente | null>(null);

  const clientesPorPagina = 10;

  const clientesFiltrados = clientes.filter((cliente) => {
    const nomeOk = cliente.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    const statusOk =
    filtro === "Todos" ||
    cliente.status === filtro;

  const tipoOk =
    filtroTipo === "Todos" ||
    cliente.tipo === filtroTipo;

  return nomeOk && statusOk && tipoOk;
  });

  const totalPaginas = Math.ceil(
    clientesFiltrados.length / clientesPorPagina
  );

  const indiceInicial = (pagina - 1) * clientesPorPagina;

  const indiceFinal = indiceInicial + clientesPorPagina;

  const clientesPaginados = clientesFiltrados.slice(
    indiceInicial,
    indiceFinal
  );

  const titulares = clientes.filter(
  (cliente) => cliente.tipo === "Titular"
);

  function removerCliente(id: number) {
    setClientes((prev) =>
      prev.filter((cliente) => cliente.id !== id)
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Menu />

      <main className="flex-1 p-8">
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-slate-900">
            Clientes
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Lista de hóspedes e clientes cadastrados.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <FiSearch
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Buscar cliente..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
              className="
                w-full pl-9 pr-4 py-2.5
                rounded-xl border border-slate-200
                bg-white text-sm
                outline-none focus:ring-2 focus:ring-slate-200
              "
            />
          </div>

          <div className="flex gap-2">
            {(["Todos", "Ativo", "Inativo"] as const).map(
              (item) => (
                <button
                  key={item}
                  onClick={() => {
                    setFiltro(item);
                    setPagina(1);
                  }}
                  className={`
                    px-3 py-2 rounded-xl text-sm transition
                    ${
                      filtro === item
                        ? "bg-slate-900 text-white"
                        : "bg-white border border-slate-200 text-slate-600"
                    }
                  `}
                >
                  {item}
                </button>
              )
            )}
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {(
              [
                "Todos",
                "Titular",
                "Dependente",
              ] as const
            ).map((item) => (
              <button
                key={item}
                onClick={() => {
                  setFiltroTipo(item);
                  setPagina(1);
                }}
                className={`
                  px-3 py-2 rounded-xl text-sm transition
                  ${
                    filtroTipo === item
                      ? item === "Titular"
                        ? "bg-slate-900 text-white"
                        : item === "Dependente"
                        ? "bg-slate-900 text-white"
                        : "bg-slate-900 text-white"
                      : "bg-white border border-slate-200 text-slate-600"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => setModalNovo(true)}
            className="
              flex items-center gap-2 px-4 py-2.5
              rounded-xl bg-slate-900 text-white
              text-sm hover:bg-slate-800 transition
            "
          >
            <FiPlus size={15} />
            Novo cliente
          </button>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {[
                    "Nome",
                    "Tipo",
                    "CPF",
                    "Telefone",
                    "Status",
                    "Ações",
                  ].map((item) => (
                    <th
                      key={item}
                      className="
                        text-left px-5 py-3
                        text-xs font-semibold uppercase
                        text-slate-400
                      "
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {clientesFiltrados.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-12 text-slate-400"
                    >
                      Nenhum cliente encontrado
                    </td>
                  </tr>
                ) : (
                  clientesPaginados.map((cliente) => (
                    <tr
                      key={cliente.id}
                      className="
                        border-b border-slate-100
                        hover:bg-slate-50 transition
                      "
                    >
                      <td className="px-5 py-4 font-medium text-slate-800">
                        <div className="flex flex-col">
                          <span>{cliente.nome}</span>

                          {cliente.nomeSocial && (
                            <span className="text-xs text-slate-400">
                              {cliente.nomeSocial}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`
                            px-3 py-1 rounded-full
                            text-xs font-medium
                            ${
                              cliente.tipo === "Titular"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            }
                          `}
                        >
                          {cliente.tipo}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-500 font-mono text-xs">
                        {cliente.cpf}
                      </td>

                      <td className="px-5 py-4 text-slate-500">
                        {cliente.telefone || "-"}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${
                              cliente.status === "Ativo"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-rose-100 text-rose-600"
                            }
                          `}
                        >
                          {cliente.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setClienteSelecionado(cliente);
                              setModalVisualizar(true);
                            }}
                            className="
                              w-8 h-8 flex items-center justify-center
                              rounded-lg text-sky-500
                              hover:bg-sky-50 transition
                            "
                          >
                            <FiEye size={15} />
                          </button>

                          <button
                            onClick={() => {
                              setClienteSelecionado(cliente);
                              setModalEditar(true);
                            }}
                            className="
                              w-8 h-8 flex items-center justify-center
                              rounded-lg text-emerald-600
                              hover:bg-emerald-50 transition
                            "
                          >
                            <FiEdit2 size={15} />
                          </button>

                          <button
                            onClick={() =>
                              removerCliente(cliente.id)
                            }
                            className="
                              w-8 h-8 flex items-center justify-center
                              rounded-lg text-rose-500
                              hover:bg-rose-50 transition
                            "
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {clientesFiltrados.length > 0 && (
            <div
              className="
                flex items-center justify-between
                px-5 py-4 border-t border-slate-100
                bg-slate-50
              "
            >
              <p className="text-xs text-slate-400">
                Mostrando{" "}
                <span className="font-semibold text-slate-600">
                  {clientesPaginados.length}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-slate-600">
                  {clientesFiltrados.length}
                </span>{" "}
                clientes
              </p>

              <div className="flex items-center gap-2 mx-auto">
                <button
                  className="
                    w-10 h-10 rounded-xl border border-slate-200
                    bg-white text-slate-700 text-lg font-semibold
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
                    h-10 px-5 rounded-xl
                    bg-slate-900 text-white
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
                    w-10 h-10 rounded-xl border border-slate-200
                    bg-white text-slate-700 text-lg font-semibold
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
                      Math.min(prev + 1, totalPaginas)
                    )
                  }
                >
                  »
                </button>
              </div>
            </div>
          )}
        </Card>

        <Modal
          aberto={modalNovo}
          titulo="Novo cliente"
          onClose={() => setModalNovo(false)}
        >
          <FormCliente
            titulares={titulares}
            onSave={(novoCliente: Cliente) => {
              setClientes((prev) => [
                ...prev,
                novoCliente,
              ]);

              setModalNovo(false);
            }}
          />
        </Modal>

        <Modal
          aberto={modalVisualizar}
          titulo="Detalhes do cliente"
          onClose={() => setModalVisualizar(false)}
        >
          {clienteSelecionado && (
            <DetalheCliente
              cliente={clienteSelecionado}
            />
          )}
        </Modal>

        <Modal
          aberto={modalEditar}
          titulo="Editar cliente"
          onClose={() => setModalEditar(false)}
        >
          {clienteSelecionado && (
            <FormCliente
              titulares={titulares}
              cliente={clienteSelecionado}
              onSave={(clienteAtualizado: Cliente) => {
                setClientes((prev) =>
                  prev.map((c) =>
                    c.id === clienteAtualizado.id
                      ? clienteAtualizado
                      : c
                  )
                );

                setModalEditar(false);
              }}
            />
          )}
        </Modal>
      </main>
    </div>
  );
}