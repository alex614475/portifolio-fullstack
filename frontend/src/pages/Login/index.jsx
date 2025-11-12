import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const dados = { email, password };
    console.log("Login enviado:", dados);
    // 👉 Chame sua API de login aqui
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-sm transition-colors duration-300"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Login
        </h2>

        {/* E-mail */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            E-mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
            font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 
            focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-blue-300"
        >
          Entrar
        </button>

        {/* Link para cadastro */}
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
          Não tem conta?{" "}
          <a
            href="/cadastro"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}
