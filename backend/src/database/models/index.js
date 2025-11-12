// src/database/models/index.js
import { sequelize } from "../../config/database.js";
import User from "./userModel.js";

// Inicializa o modelo User com a instância Sequelize
User.initModel(sequelize);

export { sequelize, User };
