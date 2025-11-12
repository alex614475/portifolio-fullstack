// src/database/config/database.js
import { Sequelize } from "sequelize";

const config = {
  dialect: "postgres",
  database: "meuBanco",
  username: "postgres",
  password: "admin",
  host: "127.0.0.1",
  port: 5432,
  ssl: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

// Cria a instância Sequelize usando as configs acima
export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export default config;
