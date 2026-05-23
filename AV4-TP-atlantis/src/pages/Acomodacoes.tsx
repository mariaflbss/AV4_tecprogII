import { useState } from "react";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiUsers, FiEye } from "react-icons/fi";
import { LuBed } from "react-icons/lu";
import { HiOutlineHome } from "react-icons/hi";

import Menu from "../shared/components/Menu";
import FormAcomodacao from "../components/FormAcomodacoes";
import DetalheAcomodacao from "../components/DetalheAcomodacoes";

export interface Acomodacao {
  id: number;
  numero: string;
  tipo: string;
  descricao: string;
  capacidade: number;
  status: "Disponível" | "Ocupado";
  imagem: string;
  camasSolteiro?: number;
  camasCasal?: number;
  suites?: number;
  garagem?: number;
  climatizacao?: boolean;
  wifi?: boolean;
  cafeIncluso?: boolean;
}

const acomodacoesBase: Acomodacao[] = [
  {
    id: 1, numero: "101", tipo: "Quarto de Solteiro Simples",
    descricao: "Quarto aconchegante com vista para o jardim",
    capacidade: 1, status: "Disponível",
    imagem: "https://images.pexels.com/photos/36749692/pexels-photo-36749692.jpeg",
    camasSolteiro: 1, camasCasal: 0, suites: 0, garagem: 0, climatizacao: true, wifi: true, cafeIncluso: false,
  },
  {
    id: 2, numero: "205", tipo: "Quarto de Casal de Luxo",
    descricao: "Espaçoso quarto duplo com vista para a área de lazer do hotel",
    capacidade: 2, status: "Ocupado",
    imagem: "https://images.pexels.com/photos/14025022/pexels-photo-14025022.jpeg",
    camasSolteiro: 0, camasCasal: 1, suites: 0, garagem: 1, climatizacao: true, wifi: true, cafeIncluso: true,
  },
  {
    id: 3, numero: "301", tipo: "Suíte Executiva",
    descricao: "Suíte luxuosa com sala de estar",
    capacidade: 3, status: "Ocupado",
    imagem: "https://images.pexels.com/photos/19737829/pexels-photo-19737829.jpeg",
    camasSolteiro: 1, camasCasal: 1, suites: 1, garagem: 1, climatizacao: true, wifi: true, cafeIncluso: true,
  },
  {
    id: 4, numero: "108", tipo: "Quarto de Casal Simples",
    descricao: "Confortável quarto duplo com vista para área de lazer do hotel",
    capacidade: 2, status: "Disponível",
    imagem: "https://images.pexels.com/photos/14025024/pexels-photo-14025024.jpeg",
    camasSolteiro: 0, camasCasal: 1, suites: 0, garagem: 0, climatizacao: false, wifi: true, cafeIncluso: false,
  },
  {
    id: 5, numero: "412", tipo: "Suíte Premium",
    descricao: "Suíte premium com vista panorâmica",
    capacidade: 4, status: "Disponível",
    imagem: "https://images.pexels.com/photos/30708776/pexels-photo-30708776.jpeg",
    camasSolteiro: 2, camasCasal: 1, suites: 1, garagem: 2, climatizacao: true, wifi: true, cafeIncluso: true,
  },
  {
    id: 6, numero: "203", tipo: "Quarto de Solteiro Simples",
    descricao: "Confortável quarto individual",
    capacidade: 1, status: "Disponível",
    imagem: "https://images.pexels.com/photos/35261473/pexels-photo-35261473.jpeg",
    camasSolteiro: 1, camasCasal: 0, suites: 0, garagem: 0, climatizacao: false, wifi: true, cafeIncluso: false,
  },
];

const ITENS_POR_PAGINA = 4;

export default function Acomodacoes() {
  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>(acomodacoesBase);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<"Todos" | "Disponível" | "Ocupado">("Todos");
  const [paginaAtual, setPaginaAtual] = useState(0);

  const [modalFormAberto, setModalFormAberto] = useState(false);
  const [modalDetalheAberto, setModalDetalheAberto] = useState(false);
  const [acomodacaoEmEdicao, setAcomodacaoEmEdicao] = useState<Acomodacao | null>(null);
  const [acomodacaoEmDetalhe, setAcomodacaoEmDetalhe] = useState<Acomodacao | null>(null);

  const filtradas = acomodacoes.filter((a) => {
    const buscaOk = a.numero.includes(busca) || a.tipo.toLowerCase().includes(busca.toLowerCase());
    const statusOk = filtro === "Todos" || a.status === filtro;
    return buscaOk && statusOk;
  });

  const totalPaginas = Math.ceil(filtradas.length / ITENS_POR_PAGINA);
  const paginaSegura = Math.min(paginaAtual, Math.max(0, totalPaginas - 1));
  const visiveis = filtradas.slice(paginaSegura * ITENS_POR_PAGINA, paginaSegura * ITENS_POR_PAGINA + ITENS_POR_PAGINA);

  function mudarPagina(p: number) {
    setPaginaAtual(Math.max(0, Math.min(p, totalPaginas - 1)));
  }

  function abrirNova() {
    setAcomodacaoEmEdicao(null);
    setModalFormAberto(true);
  }

  function abrirEdicao(a: Acomodacao) {
    setAcomodacaoEmEdicao(a);
    setModalFormAberto(true);
  }

  function abrirDetalhe(a: Acomodacao) {
    setAcomodacaoEmDetalhe(a);
    setModalDetalheAberto(true);
  }

  function salvar(dados: Acomodacao) {
    if (acomodacaoEmEdicao) {
      setAcomodacoes((prev) => prev.map((a) => (a.id === dados.id ? dados : a)));
    } else {
      setAcomodacoes((prev) => [...prev, { ...dados, id: Date.now() }]);
    }
    setModalFormAberto(false);
    setAcomodacaoEmEdicao(null);
  }

  function remover(id: number) {
    setAcomodacoes((prev) => prev.filter((a) => a.id !== id));
  }

  const totalQuartos = acomodacoes.length;
  const disponiveis = acomodacoes.filter((a) => a.status === "Disponível").length;
  const ocupados = acomodacoes.filter((a) => a.status === "Ocupado").length;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Menu />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Acomodações</h1>
          <p className="text-sm text-slate-500 mt-1">
            Gerencie quartos, disponibilidade e informações das acomodações.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <CardResumo titulo="Total de quartos" valor={totalQuartos} icone={<LuBed size={20} />} classeIcone="bg-slate-100 text-slate-700" />
          <CardResumo titulo="Disponíveis" valor={disponiveis} icone={<HiOutlineHome size={20} />} classeIcone="bg-emerald-100 text-emerald-700" corValor="text-emerald-600" />
          <CardResumo titulo="Ocupados" valor={ocupados} icone={<FiUsers size={20} />} classeIcone="bg-rose-100 text-rose-600" corValor="text-rose-600" />
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <FiSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por número ou tipo de quarto..."
              value={busca}
              onChange={(e) => { setBusca(e.target.value); setPaginaAtual(0); }}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-slate-200 shadow-sm"
            />
          </div>

          <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            {(["Todos", "Disponível", "Ocupado"] as const).map((op) => (
              <button
                key={op}
                onClick={() => { setFiltro(op); setPaginaAtual(0); }}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filtro === op ? "bg-[#0f1f3d] text-white shadow" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {op}
              </button>
            ))}
          </div>

          <button
            onClick={abrirNova}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0f1f3d] rounded-xl hover:bg-[#1a3360] active:scale-[0.97] transition shadow-[0_4px_12px_rgba(15,31,61,0.25)] whitespace-nowrap"
          >
            <FiPlus size={15} />
            Nova acomodação
          </button>
        </div>

        {filtradas.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 py-20 flex flex-col items-center justify-center gap-3">
            <LuBed size={42} className="text-slate-300" />
            <p className="text-sm text-slate-400">Nenhuma acomodação encontrada.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {visiveis.map((a) => (
                <CardAcomodacao key={a.id} acomodacao={a} onExcluir={remover} onEditar={abrirEdicao} onVisualizar={abrirDetalhe} />
              ))}
            </div>

            {totalPaginas > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button onClick={() => mudarPagina(paginaSegura - 1)} disabled={paginaSegura === 0}
                  className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                  «
                </button>
                <div className="px-5 h-10 rounded-xl bg-[#0f1f3d] text-white text-sm font-medium flex items-center justify-center">
                  Página {paginaSegura + 1} de {totalPaginas}
                </div>
                <button onClick={() => mudarPagina(paginaSegura + 1)} disabled={paginaSegura >= totalPaginas - 1}
                  className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                  »
                </button>
              </div>
            )}
          </>
        )}

        <FormAcomodacao
          aberto={modalFormAberto}
          acomodacao={acomodacaoEmEdicao}
          onClose={() => { setModalFormAberto(false); setAcomodacaoEmEdicao(null); }}
          onSalvar={salvar}
          usuarios={[]}
        />

        <DetalheAcomodacao
          aberto={modalDetalheAberto}
          acomodacao={acomodacaoEmDetalhe}
          onClose={() => setModalDetalheAberto(false)}
          onEditar={(a) => { setModalDetalheAberto(false); abrirEdicao(a); }}
        />
      </main>
    </div>
  );
}

function CardAcomodacao({ acomodacao: a, onExcluir, onEditar, onVisualizar }: {
  acomodacao: Acomodacao;
  onExcluir: (id: number) => void;
  onEditar: (a: Acomodacao) => void;
  onVisualizar: (a: Acomodacao) => void;
}) {
  const disponivel = a.status === "Disponível";
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.07)] flex flex-col group hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative overflow-hidden h-44">
        <img src={a.imagem} alt={a.tipo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full shadow ${disponivel ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"}`}>
          {a.status}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-black text-[#0f1f3d] text-base leading-tight">Quarto {a.numero}</h3>
        <p className="text-xs text-slate-400 font-medium mt-0.5 mb-2">{a.tipo}</p>
        <p className="text-xs text-slate-500 leading-relaxed flex-1">{a.descricao}</p>
        <div className="flex items-center gap-3 my-3">
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <FiUsers size={12} />
            {a.capacidade} {a.capacidade === 1 ? "hóspede" : "hóspedes"}
          </span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onVisualizar(a)} title="Visualizar" className="w-9 h-9 flex items-center justify-center text-sky-500 border border-sky-100 rounded-xl hover:bg-sky-50 transition-colors">
            <FiEye size={14} />
          </button>
          <button onClick={() => onEditar(a)} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <FiEdit2 size={13} /> Editar
          </button>
          <button onClick={() => onExcluir(a.id)} title="Excluir" className="w-9 h-9 flex items-center justify-center text-rose-500 border border-rose-100 rounded-xl hover:bg-rose-50 transition-colors">
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CardResumo({ titulo, valor, icone, classeIcone, corValor = "text-slate-900" }: {
  titulo: string; valor: number; icone: React.ReactNode; classeIcone: string; corValor?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      <div>
        <p className="text-sm text-slate-400">{titulo}</p>
        <h2 className={`text-3xl font-bold mt-1 ${corValor}`}>{valor}</h2>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${classeIcone}`}>{icone}</div>
    </div>
  );
}