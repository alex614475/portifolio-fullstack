module.exports = {
  development: {
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
  },
};
