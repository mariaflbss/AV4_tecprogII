import {
  FiX,
  FiUsers,
  FiWind,
  FiEdit2,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import { LuBed } from "react-icons/lu";
import { HiOutlineHome } from "react-icons/hi";
import type { Acomodacao } from "../pages/Acomodacoes";

interface Props {
  aberto: boolean;
  acomodacao: Acomodacao | null;
  onClose: () => void;
  onEditar: (a: Acomodacao) => void;
}

export default function DetalheAcomodacao({
  aberto,
  acomodacao,
  onClose,
  onEditar,
}: Props) {
  if (!aberto || !acomodacao) return null;

  const disponivel = acomodacao.status === "Disponível";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">

        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Acomodação #{acomodacao.numero}
            </p>

            <h2 className="text-xl font-black text-[#0f1f3d] mt-0.5">
              {acomodacao.tipo}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                disponivel
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-rose-50 text-rose-600 border border-rose-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  disponivel ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />
              {acomodacao.status}
            </span>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            <div className="relative min-h-[280px] lg:min-h-full bg-slate-100">
              {acomodacao.imagem ? (
                <img
                  src={acomodacao.imagem}
                  alt={acomodacao.tipo}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  Sem imagem
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              <div className="absolute bottom-4 left-4">
                <p className="text-white font-black text-2xl drop-shadow">
                  Quarto {acomodacao.numero}
                </p>

                <p className="text-white/80 text-sm">
                  {acomodacao.tipo}
                </p>
              </div>
            </div>

            <div className="p-7 flex flex-col gap-5">

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Descrição
                </h3>

                <p className="text-sm leading-relaxed text-slate-600">
                  {acomodacao.descricao || "Sem descrição cadastrada."}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Informações
                </h3>

                <div className="grid grid-cols-2 gap-3">

                  <InfoItem
                    titulo="Capacidade"
                    valor={`${acomodacao.capacidade} ${
                      acomodacao.capacidade === 1
                        ? "hóspede"
                        : "hóspedes"
                    }`}
                    icone={<FiUsers size={14} />}
                  />

                  {(acomodacao.camaSolteiro ?? 0) > 0 && (
                    <InfoItem
                      titulo="Camas solteiro"
                      valor={String(acomodacao.camaSolteiro)}
                      icone={<LuBed size={14} />}
                    />
                  )}

                  {(acomodacao.camaCasal ?? 0) > 0 && (
                    <InfoItem
                      titulo="Camas casal"
                      valor={String(acomodacao.camaCasal)}
                      icone={<LuBed size={14} />}
                    />
                  )}

                  {(acomodacao.suite ?? 0) > 0 && (
                    <InfoItem
                      titulo="Suítes"
                      valor={String(acomodacao.suite)}
                      icone={<HiOutlineHome size={14} />}
                    />
                  )}

                  {(acomodacao.garagem ?? 0) > 0 && (
                    <InfoItem
                      titulo="Garagem"
                      valor={`${acomodacao.garagem} vaga(s)`}
                      icone={<HiOutlineHome size={14} />}
                    />
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Recursos
                </h3>

                <div className="flex flex-wrap gap-2">
                  <Recurso
                    icone={<FiWind size={13} />}
                    label="Climatização"
                    ativo={acomodacao.climatizacao ?? false}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-auto pt-2 border-t border-slate-100">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition"
                >
                  Fechar
                </button>

                <button
                  onClick={() => onEditar(acomodacao)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0f1f3d] text-white text-sm font-semibold hover:bg-[#1a3360] transition shadow-[0_4px_12px_rgba(15,31,61,0.25)]"
                >
                  <FiEdit2 size={14} />
                  Editar acomodação
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  titulo,
  valor,
  icone,
}: {
  titulo: string;
  valor: string;
  icone?: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
      <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
        {icone}

        <p className="text-xs uppercase tracking-wide font-semibold">
          {titulo}
        </p>
      </div>

      <p className="text-base font-black text-slate-800">
        {valor}
      </p>
    </div>
  );
}

function Recurso({
  icone,
  label,
  ativo,
}: {
  icone: React.ReactNode;
  label: string;
  ativo: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border ${
        ativo
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-slate-50 text-slate-400 border-slate-200"
      }`}
    >
      {ativo ? (
        <FiCheckCircle size={12} className="text-emerald-500" />
      ) : (
        <FiXCircle size={12} className="text-slate-300" />
      )}

      {icone}
      {label}
    </div>
  );
}