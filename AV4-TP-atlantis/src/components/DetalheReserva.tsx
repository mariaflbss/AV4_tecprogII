import { FiX } from "react-icons/fi";

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

interface Props {
  aberto: boolean;
  reserva: Reserva | null;
  onClose: () => void;
}

export default function DetalhesReserva({
  aberto,
  reserva,
  onClose,
}: Props) {
  if (!aberto || !reserva) return null;

  const titulares = reserva.hospedes.filter(
    (h) => h.tipo === "Titular"
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            Detalhes da Reserva
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center"
          >
            <FiX />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Info
              label="Quarto"
              value={reserva.quarto}
            />

            <Info
              label="Status"
              value={reserva.status}
            />

            <Info
              label="Check-in"
              value={reserva.checkIn}
            />

            <Info
              label="Check-out"
              value={reserva.checkOut}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-4">
              Hóspedes
            </h3>

            <div className="space-y-4">
              {titulares.map((titular) => (
                <div
                  key={titular.id}
                  className="border border-slate-200 rounded-2xl p-4"
                >
                  <p className="font-semibold text-slate-800">
                    {titular.nome}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Titular
                  </p>

                  <div className="mt-4 space-y-2">
                    {reserva.hospedes
                      .filter(
                        (d) =>
                          d.titularId ===
                          titular.id
                      )
                      .map((dep) => (
                        <div
                          key={dep.id}
                          className="bg-slate-50 rounded-xl px-4 py-3"
                        >
                          <p className="text-sm text-slate-700">
                            {dep.nome}
                          </p>

                          <p className="text-xs text-slate-400">
                            Dependente
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4">
      <p className="text-xs text-slate-400 uppercase font-semibold">
        {label}
      </p>

      <p className="mt-2 text-slate-800 font-semibold">
        {value}
      </p>
    </div>
  );
}