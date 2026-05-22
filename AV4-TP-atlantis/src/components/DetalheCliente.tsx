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

const titularesMock = [
  {
    id: 1,
    nome: "João Laboissieree",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
  },
];

export default function DetalheCliente({
  cliente,
}: {
  cliente: Cliente;
}) {
  const titularResponsavel =
    titularesMock.find(
      (titular) =>
        titular.id === cliente.titularId
    );

  return (
    <div className="space-y-4">
      <Item
        label="Nome"
        value={cliente.nome}
      />

      <Item
        label="Nome Social"
        value={
          cliente.nomeSocial || "-"
        }
      />

      <Item
        label="Data de Nascimento"
        value={
          cliente.dataNascimento || "-"
        }
      />

      <Item
        label="Tipo de Cliente"
        value={cliente.tipo}
      />

      {cliente.tipo ===
        "Dependente" && (
        <>
          <Item
            label="Titular Responsável"
            value={
              titularResponsavel?.nome ||
              "-"
            }
          />

          <Item
            label="Utiliza Endereço do Titular"
            value={
              cliente.reutilizarEndereco
                ? "Sim"
                : "Não"
            }
          />

          <Item
            label="Utiliza Telefone do Titular"
            value={
              cliente.reutilizarTelefone
                ? "Sim"
                : "Não"
            }
          />
        </>
      )}

      <Item
        label="CPF"
        value={cliente.cpf}
      />

      <Item
        label="Telefone"
        value={cliente.telefone}
      />

      <Item
        label="Endereço"
        value={cliente.endereco}
      />

      <Item
        label="E-mail"
        value={cliente.email}
      />

      <Item
        label="Status"
        value={cliente.status}
      />

      {cliente.documentos.length >
        0 && (
        <div>
          <p
            className="
              text-sm text-slate-400
              mb-2
            "
          >
            Documentos
          </p>

          <div className="space-y-2">
            {cliente.documentos.map(
              (doc, index) => (
                <div
                  key={index}
                  className="
                    rounded-xl border
                    border-slate-200
                    p-3
                  "
                >
                  <p className="font-medium text-slate-700">
                    {doc.tipo}
                  </p>

                  <p className="text-sm text-slate-500">
                    {doc.numero}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Item({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="font-medium text-slate-800 mt-1">
        {value || "-"}
      </p>
    </div>
  );
}