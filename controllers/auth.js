const express = require("express");
const client = require("../db");
module.exports.getName = async (name) => {
  const result = await client.query("SELECT * FROM users WHERE name = $1", [
    name,
  ]);
  return result;
};
module.exports.addUsers = async (
  name,
  hashedPassword,
  hashedConfirmPassword,
  role = "user",
) => {
  const result = await client.query(
    "INSERT INTO users(name, password , confirmPassword,role) VALUES($1, $2, $3,$4) RETURNING name;",
    [name, hashedPassword, hashedConfirmPassword, role],
  );
  return result.rows;
};
module.exports.getId = async (name) => {
  const result = await client.query(
    `SELECT id, name, "role" FROM users WHERE name = $1`,
    [name],
  );
  return result;
};
module.exports.checkUser = async () => {
  const result = await client.query("SELECT COUNT(*) FROM users");
  return result;
};
module.exports.AddRole = async (newId) => {
  const result = await client.query(
    "INSERT INTO roles(admin_id, user_id) VALUES($1, $2)",
    [newId, "N/A"],
  );
  return result.rows;
};
module.exports.AddUser = async (newId) => {
  const result = await client.query(
    "INSERT INTO roles(admin_id, user_id) VALUES($1, $2)",
    [null, newId],
  );
  return result.rows;
};
