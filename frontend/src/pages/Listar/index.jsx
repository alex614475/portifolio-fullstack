import { useEffect } from "react";
import api from "../../services/api";

export default function ListarUsuarios() {
  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem("token");
      try {
        const { data } = await api.get("/auth/listar-usuarios", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Usuários:", data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    }

    loadUsers();
  }, []);

  return (
    <div>
      <h2>Lista de Usuários</h2>
    </div>
  );
}
