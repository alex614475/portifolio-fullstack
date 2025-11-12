// src/services/authService.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_teste"; // usa variável de ambiente ou padrão

// Função para registrar usuário
export const registerUser = async (dados) => {
  const { nome, email, password } = dados;

  // verifica se já existe
  const userExistente = await User.findOne({ where: { email } });
  if (userExistente) {
    throw new Error("E-mail já cadastrado");
  }

  // gera hash
  const hashedPassword = await bcrypt.hash(password, 10);

  // cria o usuário
  const novoUsuario = await User.create({
    nome,
    email,
    password: hashedPassword,
  });

  return novoUsuario;
};

// Função para login
export const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const senhaCorreta = await bcrypt.compare(password, user.password);

  if (!senhaCorreta) {
    throw new Error("Senha incorreta");
  }

  // gera token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token, user };
};
