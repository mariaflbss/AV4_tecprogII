interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  status: "Ativo" | "Inativo";
}

export default function DetalheCliente({
  cliente,
}: {
  cliente: Cliente;
}) {
  return (
    <div className="space-y-4">
      <Item label="Nome" value={cliente.nome} />
      <Item label="CPF" value={cliente.cpf} />
      <Item label="Telefone" value={cliente.telefone} />
      <Item label="E-mail" value={cliente.email} />
      <Item label="Status" value={cliente.status} />
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
        {value}
      </p>
    </div>
  );
}