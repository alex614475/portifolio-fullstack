import express from "express";
import {
  register,
  login,
  listarUsuarios,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/listar-usuarios", listarUsuarios); // 👈 nova rota

export default router;
