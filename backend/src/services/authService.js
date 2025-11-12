import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_teste";

// Registro de novo usuário
export const registerUser = async (dados) => {
  const { name, email, password, url_foto_perfil } = dados;

  const userExistente = await User.findOne({ where: { email } });
  if (userExistente) {
    throw new Error("E-mail já cadastrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const novoUsuario = await User.create({
    name,
    email,
    password: hashedPassword,
    url_foto_perfil,
  });

  return novoUsuario;
};

// Login de usuário existente
export const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Usuário não encontrado");

  const senhaCorreta = await bcrypt.compare(password, user.password);
  if (!senhaCorreta) throw new Error("Senha incorreta");

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token, user };
};

// Buscar dados do usuário logado
export const getUserByToken = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "name", "email", "url_foto_perfil"],
    });
    return user;
  } catch {
    throw new Error("Token inválido");
  }
};
