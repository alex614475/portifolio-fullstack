import express from "express";
import {
  register,
  login,
  listarUsuarios,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rotas públicas
router.post("/register", register);
router.post("/login", login);

// Rotas protegidas
router.get("/listar-usuarios", verificarToken, listarUsuarios);
router.put("/:id", verificarToken, updateUser);
router.delete("/:id", verificarToken, deleteUser);

export default router;
