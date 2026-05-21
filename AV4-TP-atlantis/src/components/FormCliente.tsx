import { useState } from "react";

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  status: "Ativo" | "Inativo";
}

interface Props {
  cliente?: Cliente;
  onSave: (cliente: Cliente) => void;
}

export default function FormCliente({
  cliente,
  onSave,
}: Props) {
  const [form, setForm] = useState<Cliente>(
    cliente || {
      id: Date.now(),
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      status: "Ativo",
    }
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome"
        name="nome"
        value={form.nome}
        onChange={handleChange}
      />

      <Input
        label="CPF"
        name="cpf"
        value={form.cpf}
        onChange={handleChange}
      />

      <Input
        label="Telefone"
        name="telefone"
        value={form.telefone}
        onChange={handleChange}
      />

      <Input
        label="E-mail"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <div>
        <label className="text-sm text-slate-600">
          Status
        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="
            mt-1 w-full rounded-xl border
            border-slate-200 px-4 py-3
            outline-none
          "
        >
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
      </div>

      <button
        type="submit"
        className="
          w-full py-3 rounded-xl
          bg-slate-900 text-white
          hover:bg-slate-800 transition
        "
      >
        Salvar cliente
      </button>
    </form>
  );
}

function Input({
  label,
  ...props
}: any) {
  return (
    <div>
      <label className="text-sm text-slate-600">
        {label}
      </label>

      <input
        {...props}
        className="
          mt-1 w-full rounded-xl border
          border-slate-200 px-4 py-3
          outline-none focus:ring-2
          focus:ring-slate-200
        "
      />
    </div>
  );
}