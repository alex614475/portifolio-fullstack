import express from "express";
import {
  createUser,
  getAllUser,
  deleteUser,
  updateUser,
} from "./controllers/userController.js";

const router = express.Router();

// Criar novo usuário
router.post("/cadastro", createUser);

// Listar todos os usuários
router.get("/", getAllUser);

// Atualizar usuário pelo ID
router.put("/:id", updateUser);

// Deletar usuário pelo ID
router.delete("/:id", deleteUser);

export default router;
