import { useRef, useState } from "react";
import { cadastrarUsuario } from "../../services/cadastroService";

export default function Cadastro() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dados = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const usuarioCriado = await cadastrarUsuario(dados);
      alert(
        `✅ Cadastro realizado com sucesso! Bem-vindo, ${usuarioCriado.name}`
      );
      e.target.reset();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          `❌ Erro ao cadastrar. Dados enviados: ${JSON.stringify(
            dados,
            null,
            2
          )}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-sm transition-colors duration-300"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Criar Conta
        </h2>

        {/* Nome */}
        <div className="mb-6">
          <label
            htmlFor="nome"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nome completo
          </label>
          <input
            ref={nameRef}
            type="text"
            id="nome"
            placeholder="Seu nome completo"
            required
            className="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
              dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {/* E-mail */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            E-mail
          </label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="email@exemplo.com"
            required
            className="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
              dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {/* Senha */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Senha
          </label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            placeholder="••••••••"
            required
            className="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
              dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 
            focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-blue-300 ${
              loading
                ? "bg-blue-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            }`}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
