// import { useEffect } from "react";
// import api from "../../services/api";

// export default function ListarUsuarios() {
//   useEffect(() => {
//     async function loadUsers() {
//       const token = localStorage.getItem("token");
//       try {
//         const { data } = await api.get("/auth/listar-usuarios", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log("Usuários:", data);
//       } catch (error) {
//         console.error("Erro ao carregar usuários:", error);
//       }
//     }

//     loadUsers();
//   }, []);

//   return (
//     <div>
//       <h2>Lista de Usuários</h2>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem("token");
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
    }

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Carregando usuários...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Lista de Usuários
      </h2>

      {usuarios.length === 0 ? (
        <p className="text-gray-600">Nenhum usuário encontrado.</p>
      ) : (
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left">ID</th>
              <th className="py-3 px-4 border-b text-left">Nome</th>
              <th className="py-3 px-4 border-b text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.nome}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
