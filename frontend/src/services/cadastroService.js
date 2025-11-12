import api from "./api";

export const cadastrarUsuario = async (dados) => {
  try {
    const response = await api.post("/cadastro", dados); // vai para http://localhost:3000/usuarios/cadastro
    return response.data;
  } catch (error) {
    throw error;
  }
};
