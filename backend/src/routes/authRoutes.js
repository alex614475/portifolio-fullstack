import express from "express";
import {
  register,
  login,
  listarUsuarios,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

// Rotas públicas
router.post("/register", upload.single("foto"), register);
router.post("/login", login);

// Rotas protegidas
router.get("/listar-usuarios", verificarToken, listarUsuarios);
router.put("/:id", verificarToken, upload.single("foto"), updateUser);
router.delete("/:id", verificarToken, deleteUser);

export default router;
