import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">MinhaApp</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/login" className="hover:text-blue-400">
          Login
        </Link>
        <Link to="/cadastro" className="hover:text-blue-400">
          Cadastro
        </Link>
        <Link to="/listar" className="hover:text-blue-400">
          Listar
        </Link>
      </div>
    </nav>
  );
}
