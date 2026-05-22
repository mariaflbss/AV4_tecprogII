import { useState } from "react";

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

interface Props {
  cliente?: Cliente;
  titulares: Cliente[];
  onSave: (cliente: Cliente) => void;
}

export default function FormCliente({
  cliente,
  titulares,
  onSave,
}: Props) {
  const [form, setForm] = useState<Cliente>(
    cliente || {
      id: Date.now(),
      nome: "",
      nomeSocial: "",
      dataNascimento: "",
      tipo: "Titular",
      titularId: undefined,
      cpf: "",
      telefone: "",
      email: "",
      endereco: "",
      reutilizarEndereco: false,
      reutilizarTelefone: false,
      documentos: [],
      status: "Ativo",
    }
  );

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        name === "titularId"
          ? value
            ? Number(value)
            : undefined
          : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSave(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Dados pessoais
        </h3>

        <Input
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
        />

        <Input
          label="Nome Social"
          name="nomeSocial"
          value={form.nomeSocial}
          onChange={handleChange}
        />

        <Input
          label="Data de Nascimento"
          type="date"
          name="dataNascimento"
          value={form.dataNascimento}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Tipo de cliente
        </h3>

        <div>
          <label className="text-sm text-slate-600">
            Categoria
          </label>

          <select
            name="tipo"
            value={form.tipo}
            onChange={(e) => {
              handleChange(e);

              if (e.target.value === "Titular") {
                setForm((prev) => ({
                  ...prev,
                  tipo: "Titular",
                  titularId: undefined,
                  reutilizarEndereco: false,
                  reutilizarTelefone: false,
                }));
              }
            }}
            className="
              mt-1 w-full rounded-xl border
              border-slate-200 px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-slate-200
            "
          >
            <option value="Titular">
              Titular
            </option>

            <option value="Dependente">
              Dependente
            </option>
          </select>
        </div>

        {form.tipo === "Dependente" && (
          <div
            className="
              rounded-2xl border border-slate-200
              bg-slate-50 p-4 space-y-4
            "
          >
            <div>
              <label className="text-sm text-slate-600">
                Titular Responsável
              </label>

              <select
                name="titularId"
                value={form.titularId || ""}
                onChange={handleChange}
                className="
                  mt-1 w-full rounded-xl border
                  border-slate-200 px-4 py-3
                  outline-none
                  bg-white
                  focus:ring-2
                  focus:ring-slate-200
                "
              >
                <option value="">
                  Selecione um titular
                </option>

                {titulares.map((titular) => (
                  <option
                    key={titular.id}
                    value={titular.id}
                  >
                    {titular.nome}
                  </option>
                ))}
              </select>
            </div>

            <label
              className="
                flex items-center gap-3
                rounded-xl border border-slate-200
                bg-white px-4 py-3
                cursor-pointer
              "
            >
              <input
                type="checkbox"
                checked={form.reutilizarEndereco}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    reutilizarEndereco:
                      e.target.checked,
                  }))
                }
              />

              <span className="text-sm text-slate-700">
                Utilizar endereço do titular
              </span>
            </label>

            <label
              className="
                flex items-center gap-3
                rounded-xl border border-slate-200
                bg-white px-4 py-3
                cursor-pointer
              "
            >
              <input
                type="checkbox"
                checked={form.reutilizarTelefone}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    reutilizarTelefone:
                      e.target.checked,
                  }))
                }
              />

              <span className="text-sm text-slate-700">
                Utilizar telefone do titular
              </span>
            </label>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Documentos
        </h3>

        <Input
          label="CPF"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
        />

        <Input
          label="RG"
          name="rg"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Contato
        </h3>

        <Input
          label="Telefone"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          disabled={form.reutilizarTelefone}
        />

        <Input
          label="Endereço"
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
          disabled={form.reutilizarEndereco}
        />

        <Input
          label="E-mail"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Situação
        </h3>

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
              focus:ring-2
              focus:ring-slate-200
            "
          >
            <option value="Ativo">
              Ativo
            </option>

            <option value="Inativo">
              Inativo
            </option>
          </select>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="
            w-full py-3 rounded-xl
            bg-slate-900 text-white
            font-medium
            hover:bg-slate-800
            transition
          "
        >
          Salvar cliente
        </button>
      </div>
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
          outline-none
          bg-white
          disabled:bg-slate-100
          disabled:text-slate-400
          disabled:cursor-not-allowed
          focus:ring-2
          focus:ring-slate-200
          transition
        "
      />
    </div>
  );
}