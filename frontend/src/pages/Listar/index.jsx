import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const carregarUsuarios = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Usuário não autenticado. Faça login novamente.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/auth/listar-usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(data);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
      setError("Erro ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const atualizarLista = () => {
    setLoading(true);
    carregarUsuarios();
  };

  const excluirUsuario = async (id) => {
    const confirmado = window.confirm(
      "Tem certeza que deseja excluir este usuário?"
    );
    if (!confirmado) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/auth/excluir-usuario/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Usuário excluído com sucesso!");
      atualizarLista();
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
      alert("Não foi possível excluir o usuário.");
    }
  };

  const editarUsuario = (id) => {
    // Aqui você pode redirecionar para uma página de edição, por exemplo:
    // navigate(`/editar-usuario/${id}`);
    alert(`Redirecionar para editar usuário de ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Lista de Usuários
          </h2>
          <button
            onClick={atualizarLista}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
              rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          >
            Atualizar
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-10">
            Carregando usuários...
          </p>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400 text-center py-10">
            {error}
          </p>
        ) : usuarios.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-10">
            Nenhum usuário encontrado.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-200 dark:bg-gray-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">E-mail</th>
                  <th className="px-6 py-3">Criado em</th>
                  <th className="px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => editarUsuario(user.id)}
                        className="px-3 py-1 text-sm text-gray-800 bg-blue-100/30 
               hover:bg-blue-600 hover:text-white rounded transition-colors duration-200"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => excluirUsuario(user.id)}
                        className="px-3 py-1 text-sm text-gray-800 bg-red-100/30 
               hover:bg-red-600 hover:text-white rounded transition-colors duration-200"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
