import "dotenv/config";
import express from "express";
import cors from "cors";
import { sequelize } from "./database/models/index.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("src/uploads"));

app.use("/api/auth", authRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco com sucesso!");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch((err) => console.error(" Erro ao conectar no banco:", err));
