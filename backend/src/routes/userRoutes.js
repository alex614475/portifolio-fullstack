// src/routes/userRoutes.js
import express from "express";
import {
  createUser,
  getAllUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createUser);
router.get("/", verifyToken, getAllUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
