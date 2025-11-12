import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_teste";

export const registerUser = async (dados) => {
  const { nome, email, password } = dados;

  const userExistente = await User.findOne({ where: { email } });
  if (userExistente) {
    throw new Error("E-mail já cadastrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const novoUsuario = await User.create({
    nome,
    email,
    password: hashedPassword,
  });

  return novoUsuario;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const senhaCorreta = await bcrypt.compare(password, user.password);

  if (!senhaCorreta) {
    throw new Error("Senha incorreta");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token, user };
};
