import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        if (error.response?.status === 401) {
          // Token inválido ou expirado → força logout
          localStorage.removeItem("token");
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Portfólio
          </span>
        </Link>

        {/* Parte direita: perfil + botão menu */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          {/* Avatar ou placeholder de carregamento */}
          {loading ? (
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
          ) : (
            user && (
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Abrir menu do usuário</span>
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={
                    user.url_foto_perfil
                      ? `http://localhost:3000/uploads/${user.url_foto_perfil}`
                      : "https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                  }
                  alt="user photo"
                />
              </button>
            )
          )}

          {/* Dropdown do perfil */}
          {isDropdownOpen && user && (
            <div
              className="absolute top-10 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user.name}
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  {user.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to="/perfil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Perfil
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      setUser(null);
                      window.location.href = "/login";
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Sair
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Botão mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden 
              hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 
              dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Abrir menu principal</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Menu principal */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "" : "hidden"
          }`}
          id="navbar-user"
        >
          <ul
            className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 
            rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row 
            md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 
            dark:border-gray-700"
          >
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-blue-700 md:p-0 dark:text-blue-500"
              >
                Home
              </Link>
            </li>
            {!user && !loading && (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-gray-900 hover:bg-gray-100 
                    md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white 
                    md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cadastro"
                    className="block py-2 px-3 text-gray-900 hover:bg-gray-100 
                    md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white 
                    md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Cadastro
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
