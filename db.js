const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

pool.on("connect", () => {
  console.log("Connecté à la base de données PostgreSQL");
});

module.exports = pool;
