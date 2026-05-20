import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

export interface DadoMensal {
  mes: string;
  mesAbreviado: string;
  reservas: number;
  ocupacao: number;
}

const dadosPadrao: DadoMensal[] = [
  { mes: "Janeiro",    mesAbreviado: "Jan", reservas: 142, ocupacao: 65 },
  { mes: "Fevereiro",  mesAbreviado: "Fev", reservas: 158, ocupacao: 72 },
  { mes: "Março",      mesAbreviado: "Mar", reservas: 175, ocupacao: 78 },
  { mes: "Abril",      mesAbreviado: "Abr", reservas: 193, ocupacao: 85 },
  { mes: "Maio",       mesAbreviado: "Mai", reservas: 211, ocupacao: 92 },
  { mes: "Junho",      mesAbreviado: "Jun", reservas: 198, ocupacao: 88 },
  { mes: "Julho",      mesAbreviado: "Jul", reservas: 224, ocupacao: 95 },
  { mes: "Agosto",     mesAbreviado: "Ago", reservas: 216, ocupacao: 91 },
  { mes: "Setembro",   mesAbreviado: "Set", reservas: 187, ocupacao: 82 },
  { mes: "Outubro",    mesAbreviado: "Out", reservas: 203, ocupacao: 89 },
  { mes: "Novembro",   mesAbreviado: "Nov", reservas: 179, ocupacao: 79 },
  { mes: "Dezembro",   mesAbreviado: "Dez", reservas: 241, ocupacao: 98 },
];

interface TooltipCustomProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: DadoMensal }>;
}

function TooltipCustom({ active, payload }: TooltipCustomProps) {
  if (!active || !payload?.length) return null;

  const dado = payload[0].payload;

  return (
    <div className="bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl px-4 py-3 min-w-[160px]">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
        {dado.mes}
      </p>
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-white/70">Reservas</span>
        <span className="text-lg font-bold text-indigo-400">
          {dado.reservas.toLocaleString("pt-BR")}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4 mt-1">
        <span className="text-sm text-white/70">Ocupação</span>
        <span className="text-sm font-semibold text-emerald-400">
          {dado.ocupacao}%
        </span>
      </div>
    </div>
  );
}

interface GraficoReservasProps {
  dados?: DadoMensal[];
  mesAtual?: number;
}

export default function GraficoReservas({
  dados = dadosPadrao,
  mesAtual = new Date().getMonth(),
}: GraficoReservasProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
            Visão Anual de Reservas
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Passe o mouse sobre cada mês para ver os detalhes
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" />
            Reservas
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-200 inline-block" />
            Mês atual
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={dados}
          margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
          barSize={28}
          barCategoryGap="30%"
        >
          <CartesianGrid
            vertical={false}
            stroke="#f1f5f9"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="mesAbreviado"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
          />
          <Tooltip
            content={<TooltipCustom />}
            cursor={{ fill: "rgba(99, 102, 241, 0.05)", radius: 6 }}
          />
          <Bar dataKey="reservas" radius={[5, 5, 0, 0]}>
            {dados.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === mesAtual ? "#a5b4fc" : "#6366f1"}
                fillOpacity={index === mesAtual ? 0.9 : 1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}