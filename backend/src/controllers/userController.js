import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

// const JWT_SECRET = "G@Ak9!pL2@Qw8^Zr5%Tx3&Yn1*Vm0!_";
export const createUser = async (req, res) => {
  try {
    const usuario = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(usuario.password, salt);

    const userToCreate = {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    };
    const user = await User.create(userToCreate);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erro no Servidor, tente novamente" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const userInfo = req.body;

    const user = await User.findOne({ where: { email: userInfo.email } });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(userInfo.password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("TOKEN GERADO:", token);
    res.status(200).json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro no Servidor, tente novamente" });
  }
};

export const getAllUser = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

export const updateUser = (req, res) => {
  res.status(200).json({ message: "Deu bom" });
};

export const deleteUser = (req, res) => {
  res.status(200).json({ message: "Deu bom" });
};
