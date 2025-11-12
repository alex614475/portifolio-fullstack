import api from "./api";

export const cadastrarUsuario = async (dados) => {
  try {
    const response = await api.post("/auth/register", dados);
    return response.data;
  } catch (error) {
    throw error;
  }
};
