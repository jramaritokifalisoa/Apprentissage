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
) => {
  const result = await client.query(
    "INSERT INTO users(name, password , confirmPassword) VALUES($1, $2, $3);",
    [name, hashedPassword, hashedConfirmPassword],
  );
  return result.rows;
};
module.exports.getId = async (name) => {
  const result = await client.query(
    "SELECT id, name FROM users WHERE name = $1",
    [name],
  );
  return result;
};
