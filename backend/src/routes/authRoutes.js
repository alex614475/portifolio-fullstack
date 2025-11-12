import express from "express";
import {
  register,
  login,
  listarUsuarios,
} from "../controllers/authController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/listar-usuarios", verificarToken, listarUsuarios);

export default router;
