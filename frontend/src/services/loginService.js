// src/services/loginService.js
import api from "./api";

export const loginUsuario = async (dados) => {
  try {
    const response = await api.post("/login", dados);
    return response.data;
  } catch (error) {
    throw error;
  }
};
