import { useState, useEffect } from "react";

import {
  FiSave,
  FiX,
  FiHome,
  FiWind,
  FiImage,
} from "react-icons/fi";

import type { Acomodacao } from "../pages/Acomodacoes";

interface Props {
  aberto: boolean;
  onClose: () => void;
  onSalvar: (
    acomodacao: Acomodacao
  ) => void;
  acomodacao: Acomodacao | null;
}

const TIPOS_QUARTO = [
  "Solteiro Simples",
  "Solteiro Mais",
  "Casal Simples",
  "Família Simples",
  "Família Mais",
  "Família Super",
];

const estadoVazio = {
  numero: "",
  tipo: TIPOS_QUARTO[0],
  descricao: "",

  status:
    "Disponível" as
      | "Disponível"
      | "Ocupado",

  camaSolteiro: 0,
  camaCasal: 0,
  suite: 0,
  garagem: 0,
  climatizacao: false,

  imagem: "",
};

export default function FormAcomodacao({
  aberto,
  onClose,
  onSalvar,
  acomodacao,
}: Props) {
  const [form, setForm] =
    useState(estadoVazio);

  useEffect(() => {
    if (!aberto) return;

    if (acomodacao) {
      setForm({
        numero: acomodacao.numero,
        tipo: acomodacao.tipo,
        descricao:acomodacao.descricao,
        status: acomodacao.status,
        camaSolteiro:
          acomodacao.camaSolteiro ??
          0,

        camaCasal:
          acomodacao.camaCasal ??
          0,

        suite:
          acomodacao.suite ?? 
          0,

        garagem:
          acomodacao.garagem ??
          0,

        climatizacao:
          acomodacao.climatizacao ??
          false,

        imagem: acomodacao.imagem,
      });

      return;
    }

    setForm(estadoVazio);
  }, [aberto, acomodacao]);

  if (!aberto) return null;

  const modoEdicao =
    !!acomodacao;

  function set(
    campo: string,
    valor: unknown
  ) {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function toggle(
    campo: string,
    atual: boolean
  ) {
    setForm((prev) => ({
      ...prev,
      [campo]: !atual,
    }));
  }

  function handleImagem(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const arquivo =
      e.target.files?.[0];

    if (!arquivo) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {
      set(
        "imagem",
        reader.result as string
      );
    };

    reader.readAsDataURL(
      arquivo
    );
  }

  function salvar() {
    onSalvar({
      id: acomodacao?.id ?? 0,
      numero: form.numero,
      tipo: form.tipo,
      descricao: form.descricao,
      status: form.status,
      imagem: form.imagem,
      camaSolteiro: form.camaSolteiro,
      camaCasal: form.camaCasal,
      suite: form.suite,
      garagem: form.garagem,
      climatizacao: form.climatizacao,
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              {modoEdicao
                ? `Editando — Quarto ${acomodacao?.numero}`
                : "Gestão de acomodações"}
            </p>

            <h2 className="text-xl font-black text-[#0f1f3d] mt-0.5">
              {modoEdicao
                ? "Editar acomodação"
                : "Nova acomodação"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="overflow-y-auto p-7 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Campo
                  label="Número do quarto"
                  placeholder="Ex: 204"
                  value={form.numero}
                  onChange={(v) =>
                    set(
                      "numero",
                      v
                    )
                  }
                />

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">
                    Status
                  </label>

                  <select
                    value={
                      form.status
                    }
                    onChange={(
                      e
                    ) =>
                      set(
                        "status",
                        e.target
                          .value
                      )
                    }
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0f1f3d]/20 bg-white"
                  >
                    <option>
                      Disponível
                    </option>

                    <option>
                      Ocupado
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Tipo da acomodação
                </label>

                <select
                  value={form.tipo}
                  onChange={(e) =>
                    set(
                      "tipo",
                      e.target
                        .value
                    )
                  }
                  className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0f1f3d]/20 bg-white"
                >
                  {TIPOS_QUARTO.map(
                    (tipo) => (
                      <option
                        key={tipo}
                        value={
                          tipo
                        }
                      >
                        {tipo}
                      </option>
                    )
                  )}
                </select>
              </div>

              <Campo
                label="Descrição"
                placeholder="Descreva a acomodação..."
                value={
                  form.descricao
                }
                onChange={(v) =>
                  set(
                    "descricao",
                    v
                  )
                }
                textarea
              />

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <FiImage
                    size={14}
                  />
                  Imagem do quarto
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImagem
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                />

                {form.imagem && (
                  <div className="mt-3 rounded-xl overflow-hidden h-48 border border-slate-100">
                    <img
                      src={
                        form.imagem
                      }
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FiHome
                    size={16}
                    className="text-slate-400"
                  />

                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                    Estrutura
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Campo
                    type="number"
                    label="Camas solteiro"
                    value={
                      form.camaSolteiro
                    }
                    onChange={(
                      v
                    ) =>
                      set(
                        "camaSolteiro",
                        Number(
                          v
                        )
                      )
                    }
                  />

                  <Campo
                    type="number"
                    label="Camas casal"
                    value={
                      form.camaCasal
                    }
                    onChange={(
                      v
                    ) =>
                      set(
                        "camaCasal",
                        Number(
                          v
                        )
                      )
                    }
                  />

                  <Campo
                    type="number"
                    label="Suítes"
                    value={
                      form.suite
                    }
                    onChange={(
                      v
                    ) =>
                      set(
                        "suite",
                        Number(
                          v
                        )
                      )
                    }
                  />

                  <Campo
                    type="number"
                    label="Garagem"
                    value={
                      form.garagem
                    }
                    onChange={(
                      v
                    ) =>
                      set(
                        "garagem",
                        Number(
                          v
                        )
                      )
                    }
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FiWind
                    size={16}
                    className="text-slate-400"
                  />

                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                    Recursos
                  </h3>
                </div>

                <Toggle
                  label="Climatização"
                  checked={
                    form.climatizacao
                  }
                  onChange={() =>
                    toggle(
                      "climatizacao",
                      form.climatizacao
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-7 py-5 border-t border-slate-100 bg-slate-50/60 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-100 transition"
          >
            Cancelar
          </button>

          <button
            onClick={salvar}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f1f3d] text-white text-sm font-semibold hover:bg-[#1a3360] transition shadow-[0_4px_12px_rgba(15,31,61,0.25)]"
          >
            <FiSave size={15} />

            {modoEdicao
              ? "Salvar alterações"
              : "Criar acomodação"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Campo({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea = false,
}: {
  label: string;
  value: string | number;
  onChange: (
    v: string
  ) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) {
  const base =
    "w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0f1f3d]/20 transition";

  return (
    <div>
      <label className="text-sm font-semibold text-slate-700 mb-2 block">
        {label}
      </label>

      {textarea ? (
        <textarea
          rows={4}
          value={value}
          placeholder={
            placeholder
          }
          onChange={(e) =>
            onChange(
              e.target.value
            )
          }
          className={`${base} py-3 resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={
            placeholder
          }
          onChange={(e) =>
            onChange(
              e.target.value
            )
          }
          className={`${base} h-12`}
        />
      )}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition ${
        checked
          ? "border-[#0f1f3d] bg-[#0f1f3d] text-white"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}

      <span
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs transition ${
          checked
            ? "border-white bg-white/20"
            : "border-slate-300"
        }`}
      >
        {checked && "✓"}
      </span>
    </button>
  );
}