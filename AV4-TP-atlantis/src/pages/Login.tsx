import { useState } from "react";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
} from "react-icons/fi";

import { LuHotel } from "react-icons/lu";

import { useNavigate } from "react-router-dom";

export default function TelaLogin() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  const [erro, setErro] =
    useState("");

  const [
    mostrarSenha,
    setMostrarSenha,
  ] = useState(false);

  const [
    carregando,
    setCarregando,
  ] = useState(false);

  async function fazerLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setErro("");

    if (!email || !senha) {
      setErro(
        "Preencha todos os campos."
      );

      return;
    }

    setCarregando(true);

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 700)
    );

    setCarregando(false);

    const emailCorreto =
      "gestor@atlantis.com";

    const senhaCorreta =
      "senha123";

    if (
      email === emailCorreto &&
      senha === senhaCorreta
    ) {
      navigate("/dashboard");

      return;
    }

    setErro(
      "E-mail ou senha inválidos."
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-28">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-11 h-11 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg">
            <LuHotel
              size={22}
              className="text-white"
            />
          </div>

          <div>
            <h1 className="text-xl font-black text-[#0f1f3d]">
              Atlantis
            </h1>

            <p className="text-xs text-slate-400">
              Sistema de Hospedagem
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-black text-[#0f1f3d] leading-tight">
            Bem-vindo de volta
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Faça login para acessar o
            painel administrativo do
            hotel.
          </p>
        </div>

        <div className="flex gap-3 bg-[#0f1f3d]/5 border border-[#0f1f3d]/10 rounded-2xl px-4 py-3 mb-6">
          <div className="mt-0.5 text-indigo-500">
            <FiAlertCircle size={16} />
          </div>

          <div className="text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-[#0f1f3d]">
              Acesso demo:
            </span>

            <div className="mt-1 flex flex-wrap gap-2">
              <span className="bg-white border border-slate-200 px-2 py-1 rounded-lg font-mono">
                gestor@atlantis.com
              </span>

              <span className="bg-white border border-slate-200 px-2 py-1 rounded-lg font-mono">
                senha123
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={fazerLogin}
          className="flex flex-col gap-5"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              E-mail
            </label>

            <div className="relative">
              <FiMail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="
                  w-full
                  pl-11 pr-4 py-3
                  rounded-2xl
                  border border-slate-200
                  bg-white
                  text-sm text-slate-700
                  placeholder:text-slate-400
                  outline-none
                  focus:border-indigo-400
                  focus:ring-4
                  focus:ring-indigo-100
                  transition
                "
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Senha
            </label>

            <div className="relative">
              <FiLock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={
                  mostrarSenha
                    ? "text"
                    : "password"
                }
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) =>
                  setSenha(
                    e.target.value
                  )
                }
                className="
                  w-full
                  pl-11 pr-12 py-3
                  rounded-2xl
                  border border-slate-200
                  bg-white
                  text-sm text-slate-700
                  placeholder:text-slate-400
                  outline-none
                  focus:border-indigo-400
                  focus:ring-4
                  focus:ring-indigo-100
                  transition
                "
              />

              <button
                type="button"
                onClick={() =>
                  setMostrarSenha(
                    !mostrarSenha
                  )
                }
                className="
                  absolute right-4 top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-slate-700
                  transition
                "
              >
                {mostrarSenha ? (
                  <FiEye size={18} />
                ) : (
                  <FiEyeOff
                    size={18}
                  />
                )}
              </button>
            </div>
          </div>

          {erro && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl text-sm">
              <FiAlertCircle
                size={16}
              />

              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="
              h-12
              rounded-2xl
              bg-[#0f1f3d]
              text-white
              font-semibold
              text-sm
              hover:bg-[#1a3360]
              disabled:opacity-60
              transition-all
              flex items-center justify-center gap-2
              shadow-lg
            "
          >
            {carregando ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-20"
                  />

                  <path
                    fill="currentColor"
                    className="opacity-90"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>

                Entrando...
              </>
            ) : (
              "Entrar no sistema"
            )}
          </button>
        </form>
      </div>

      {/* LADO DIREITO */}
      <div className="hidden lg:flex w-1/2 items-end justify-center overflow-hidden">
        <div
          className="
            relative
            w-[58%]
            max-w-[420px]
            aspect-[4/7]
            bg-[#0f1f3d]
            rounded-t-full
            shadow-[0_-8px_60px_rgba(15,31,61,0.18)]
            flex items-center justify-center
          "
        >
          <div className="flex flex-col items-center -mt-16">
            <div className="w-24 h-24 rounded-3xl bg-indigo-500 flex items-center justify-center shadow-xl">
              <LuHotel
                size={44}
                className="text-white"
              />
            </div>

            <div className="text-center mt-5">
              <h2 className="text-white text-3xl font-black tracking-tight">
                Atlantis
              </h2>

              <p className="text-white/60 text-sm mt-1">
                Gestão inteligente de
                hospedagens
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}