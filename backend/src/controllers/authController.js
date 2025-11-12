import { User } from "../database/models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // garante que o diretório existe
    const uploadDir = path.join(process.cwd(), "src", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const url_foto_perfil = req.file ? req.file.filename : null;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      url_foto_perfil,
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      url_foto_perfil: user.url_foto_perfil,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return res.status(400).json({
      message: "Erro ao cadastrar usuário",
      error: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({
      message: "Erro no servidor",
      error: error.message,
    });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "created_at"],
    });
    return res.json(users);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({
      message: "Erro ao listar usuários",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    let hashedPassword = user.password;
    if (password) hashedPassword = await bcrypt.hash(password, 10);

    const foto = req.file ? req.file.filename : user.foto;

    await user.update({
      name: name || user.name,
      email: email || user.email,
      password: hashedPassword,
      foto,
    });

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      foto: user.foto,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar usuário",
      error: error.message,
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await user.destroy();

    return res.status(200).json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return res.status(500).json({
      message: "Erro ao excluir usuário",
      error: error.message,
    });
  }
};
export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "url_foto_perfil", "created_at"],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return res.status(500).json({
      message: "Erro ao buscar perfil",
      error: error.message,
    });
  }
};
