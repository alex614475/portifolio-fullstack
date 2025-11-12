import express from "express";
import {
  createUser,
  getAllUser,
  deleteUser,
  updateUser,
  loginUser,
} from "./controllers/userController.js";

const router = express.Router();

// Criar novo usuário
router.post("/cadastro", createUser);

// Listar todos os usuários
router.get("/todos", getAllUser);

// Atualizar usuário pelo ID
router.put("/:id", updateUser);

// Deletar usuário pelo ID
router.delete("/:delete", deleteUser);

router.post("/:login", loginUser);

export default router;
