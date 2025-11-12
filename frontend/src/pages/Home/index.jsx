import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Bem-vindo ao Meu Portfólio
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Explore meus projetos e serviços de forma rápida e prática.
          </p>
        </header>

        {/* Cards principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card Login */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center transition hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Login
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Acesse sua conta para gerenciar seus dados e serviços.
            </p>
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold 
                hover:bg-blue-700 transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Entrar
            </Link>
          </div>

          {/* Card Cadastro */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center transition hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Cadastro
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Crie sua conta e comece a explorar meus projetos.
            </p>
            <Link
              to="/cadastro"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold 
                hover:bg-blue-700 transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Cadastrar
            </Link>
          </div>

          {/* Card Usuários */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center transition hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Usuários
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Veja a lista de usuários cadastrados e seus dados.
            </p>
            <Link
              to="/usuarios"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold 
                hover:bg-blue-700 transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Ver Usuários
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
