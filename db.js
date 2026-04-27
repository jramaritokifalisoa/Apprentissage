const { Client } = require("pg");

const pool = new Client({
  user: "postgres",
  host: "localhost",
  database: "mianatra",
  password: "rjnardo28",
  port: 5432,
});

module.exports = pool;
