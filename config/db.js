const { Client } = require("pg");
require("dotenv").config();

const pool = new Client({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

pool
  .connect()
  .then(async () => {
    console.log("Connecté à PostgreSQL");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS role (
        Users TEXT NOT NULL,
        Admin TEXT NOT NULL
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS voyages (
        id SERIAL PRIMARY KEY,
        destination VARCHAR(100) NOT NULL,
        prix NUMERIC(10,2) NOT NULL,
        places INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id SERIAL PRIMARY KEY,
        voyage_id INTEGER REFERENCES voyages(id) ON DELETE CASCADE,
        nom VARCHAR(100) NOT NULL,
        places INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  })
  .catch((err) => {
    console.log("Erreur connexion :", err);
  });

module.exports = pool;
