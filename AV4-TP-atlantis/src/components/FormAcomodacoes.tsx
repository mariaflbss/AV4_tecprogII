import { useState, useEffect } from "react";
import { FiSave, FiX, FiUsers, FiHome, FiWind, FiImage } from "react-icons/fi";
import type { Acomodacao } from "../pages/Acomodacoes";

interface Usuario {
  id: number;
  nome: string;
}

interface Props {
  aberto: boolean;
  onClose: () => void;
  onSalvar: (acomodacao: Acomodacao) => void;
  acomodacao: Acomodacao | null;
  usuarios: Usuario[];
}

const estadoVazio = {
  numero: "",
  tipo: "",
  descricao: "",
  capacidade: 1,
  precoPorNoite: 0,
  status: "Disponível" as "Disponível" | "Ocupado",
  camasSolteiro: 0,
  camasCasal: 0,
  suites: 0,
  garagem: 0,
  climatizacao: false,
  wifi: true,
  cafeIncluso: false,
  imagem: "",
  hospedes: [] as number[],
};

export default function FormAcomodacao({ aberto, onClose, onSalvar, acomodacao, usuarios }: Props) {
  const [form, setForm] = useState(estadoVazio);

  // preenche o formulário quando abrir para edição
  useEffect(() => {
    if (aberto) {
      if (acomodacao) {
        setForm({
          numero: acomodacao.numero,
          tipo: acomodacao.tipo,
          descricao: acomodacao.descricao,
          capacidade: acomodacao.capacidade,
          precoPorNoite: acomodacao.precoPorNoite,
          status: acomodacao.status,
          camasSolteiro: acomodacao.camasSolteiro ?? 0,
          camasCasal: acomodacao.camasCasal ?? 0,
          suites: acomodacao.suites ?? 0,
          garagem: acomodacao.garagem ?? 0,
          climatizacao: acomodacao.climatizacao ?? false,
          wifi: acomodacao.wifi ?? true,
          cafeIncluso: acomodacao.cafeIncluso ?? false,
          imagem: acomodacao.imagem,
          hospedes: [],
        });
      } else {
        setForm(estadoVazio);
      }
    }
  }, [aberto, acomodacao]);

  if (!aberto) return null;

  const modoEdicao = !!acomodacao;

  function set(campo: string, valor: unknown) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function toggle(campo: string, atual: boolean) {
    setForm((prev) => ({ ...prev, [campo]: !atual }));
  }

  function salvar() {
    onSalvar({
      id: acomodacao?.id ?? 0,
      numero: form.numero,
      tipo: form.tipo,
      descricao: form.descricao,
      capacidade: form.capacidade,
      precoPorNoite: form.precoPorNoite,
      status: form.status,
      imagem: form.imagem,
      camasSolteiro: form.camasSolteiro,
      camasCasal: form.camasCasal,
      suites: form.suites,
      garagem: form.garagem,
      climatizacao: form.climatizacao,
      wifi: form.wifi,
      cafeIncluso: form.cafeIncluso,
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              {modoEdicao ? `Editando — Quarto ${acomodacao.numero}` : "Gestão de acomodações"}
            </p>
            <h2 className="text-xl font-black text-[#0f1f3d] mt-0.5">
              {modoEdicao ? "Editar acomodação" : "Nova acomodação"}
            </h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition">
            <FiX size={18} />
          </button>
        </div>

        <div className="overflow-y-auto p-7 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Campo label="Número do quarto" placeholder="Ex: 204" value={form.numero} onChange={(v) => set("numero", v)} />
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => set("status", e.target.value)}
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0f1f3d]/20 bg-white"
                  >
                    <option>Disponível</option>
                    <option>Ocupado</option>
                  </select>
                </div>
              </div>

              <Campo label="Tipo da acomodação" placeholder="Ex: Suíte Premium" value={form.tipo} onChange={(v) => set("tipo", v)} />
              <Campo label="Descrição" placeholder="Descreva a acomodação..." value={form.descricao} onChange={(v) => set("descricao", v)} textarea />

              <div className="grid grid-cols-2 gap-4">
                <Campo type="number" label="Capacidade (hóspedes)" value={form.capacidade} onChange={(v) => set("capacidade", Number(v))} />
                <Campo type="number" label="Preço por noite (R$)" value={form.precoPorNoite} onChange={(v) => set("precoPorNoite", Number(v))} />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <FiImage size={14} /> URL da imagem
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={form.imagem}
                  onChange={(e) => set("imagem", e.target.value)}
                  className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0f1f3d]/20"
                />
                {form.imagem && (
                  <div className="mt-3 rounded-xl overflow-hidden h-32 border border-slate-100">
                    <img src={form.imagem} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FiHome size={16} className="text-slate-400" />
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Estrutura</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Campo type="number" label="Camas solteiro" value={form.camasSolteiro} onChange={(v) => set("camasSolteiro", Number(v))} />
                  <Campo type="number" label="Camas casal" value={form.camasCasal} onChange={(v) => set("camasCasal", Number(v))} />
                  <Campo type="number" label="Suítes" value={form.suites} onChange={(v) => set("suites", Number(v))} />
                  <Campo type="number" label="Vagas de garagem" value={form.garagem} onChange={(v) => set("garagem", Number(v))} />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FiWind size={16} className="text-slate-400" />
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Recursos</h3>
                </div>
                <div className="space-y-2.5">
                  <Toggle label="Climatização" checked={form.climatizacao} onChange={() => toggle("climatizacao", form.climatizacao)} />
                  <Toggle label="Wi-Fi" checked={form.wifi} onChange={() => toggle("wifi", form.wifi)} />
                  <Toggle label="Café da manhã incluso" checked={form.cafeIncluso} onChange={() => toggle("cafeIncluso", form.cafeIncluso)} />
                </div>
              </div>

              {usuarios.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FiUsers size={16} className="text-slate-400" />
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Vincular hóspedes</h3>
                  </div>
                  <div className="border border-slate-200 rounded-2xl p-3 max-h-52 overflow-y-auto space-y-2">
                    {usuarios.map((u) => {
                      const sel = form.hospedes.includes(u.id);
                      return (
                        <button key={u.id} type="button"
                          onClick={() => setForm((prev) => ({
                            ...prev,
                            hospedes: sel ? prev.hospedes.filter((h) => h !== u.id) : [...prev.hospedes, u.id],
                          }))}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition ${sel ? "bg-[#0f1f3d] text-white" : "bg-slate-50 hover:bg-slate-100 text-slate-700"}`}
                        >
                          {u.nome} {sel && <span>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-7 py-5 border-t border-slate-100 bg-slate-50/60 shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-100 transition">
            Cancelar
          </button>
          <button onClick={salvar} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f1f3d] text-white text-sm font-semibold hover:bg-[#1a3360] transition shadow-[0_4px_12px_rgba(15,31,61,0.25)]">
            <FiSave size={15} />
            {modoEdicao ? "Salvar alterações" : "Criar acomodação"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Campo({ label, value, onChange, placeholder, type = "text", textarea = false }: {
  label: string; value: string | number; onChange: (v: string) => void;
  placeholder?: string; type?: string; textarea?: boolean;
}) {
  const base = "w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0f1f3d]/20 transition";
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700 mb-2 block">{label}</label>
      {textarea ? (
        <textarea rows={4} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
          className={`${base} py-3 resize-none`} />
      ) : (
        <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
          className={`${base} h-12`} />
      )}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button type="button" onClick={onChange}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition ${
        checked ? "border-[#0f1f3d] bg-[#0f1f3d] text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs transition ${checked ? "border-white bg-white/20" : "border-slate-300"}`}>
        {checked && "✓"}
      </span>
    </button>
  );
}