import { useState } from "react";
import type { ReactNode } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export type Coluna<T> = {
  chave: keyof T | string;
  titulo: string;
  render?: (valor: unknown, linha: T) => ReactNode;
  className?: string;
};

interface TabelaProps<T> {
  colunas: Coluna<T>[];
  dados: T[];
  titulo?: string;
  linhasPorPagina?: number;
  onVerMais?: () => void;
  labelVerMais?: string;
  className?: string;
}

export default function Tabela<T extends Record<string, unknown>>({
  colunas,
  dados,
  titulo,
  linhasPorPagina = 4,
  onVerMais,
  labelVerMais = "Ver todas as reservas",
  className = "",
}: TabelaProps<T>) {
  const [expandida, setExpandida] = useState(false);

  const dadosExibidos = expandida ? dados : dados.slice(0, linhasPorPagina);
  const temMais = dados.length > linhasPorPagina;

  const obterValor = (linha: T, chave: string): unknown => {
    return chave.split(".").reduce((obj, k) => {
      if (obj && typeof obj === "object") return (obj as Record<string, unknown>)[k];
      return undefined;
    }, linha as unknown);
  };

  return (
    <div className={className}>
      {titulo && (
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
          {titulo}
        </h2>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              {colunas.map((col) => (
                <th
                  key={String(col.chave)}
                  className={`pb-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider ${col.className ?? ""}`}
                >
                  {col.titulo}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {dadosExibidos.map((linha, i) => (
              <tr
                key={i}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors duration-100"
              >
                {colunas.map((col) => (
                  <td
                    key={String(col.chave)}
                    className={`py-3 ${col.className ?? ""}`}
                  >
                    {col.render
                      ? col.render(obterValor(linha, String(col.chave)), linha)
                      : String(obterValor(linha, String(col.chave)) ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {temMais && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              if (onVerMais) {
                onVerMais();
              } else {
                setExpandida(!expandida);
              }
            }}
            className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-150 group"
          >
            {expandida ? (
              <>
                <FiChevronUp
                  size={16}
                  className="transition-transform duration-200"
                />
                Mostrar menos
              </>
            ) : (
              <>
                <FiChevronDown
                  size={16}
                  className="group-hover:translate-y-0.5 transition-transform duration-200"
                />
                {labelVerMais}
              </>
            )}
          </button>

          {!expandida && (
            <span className="text-xs text-slate-400">
              {dadosExibidos.length} de {dados.length}
            </span>
          )}
        </div>
      )}
    </div>
  );
}