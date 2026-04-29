const express = require("express");
const client = require("../db");

module.exports.getAllvoyage = async () => {
  const result = await client.query("SELECT * FROM voyages ORDER BY id ASC");
  return result.rows;
};
module.exports.getId = async (admin_id) => {
  const result = await client.query("SELECT id FROM users WHERE id = $1", [
    admin_id,
  ]);
  return result;
};
module.exports.Addvoyage = async (destination, prix, admin_id) => {
  const result = await client.query(
    "INSERT INTO voyages(destination, prix, admin_id) VALUES($1, $2, $3) RETURNING *",
    [destination, prix, admin_id],
  );
  return result;
};
module.exports.selectId = async (id) => {
  const result = await client.query("SELECT * FROM voyages WHERE id = $1", [
    id,
  ]);
  return result;
};
module.exports.CheckId = async (admin_id) => {
  const result = await client.query(
    "SELECT * FROM voyages WHERE id = $1 AND admin_id = $2",
    [req.params.id, admin_id],
  );
  return result;
};
module.exports.updateVoyage = async (destination, prix, admin_id) => {
  const result = await client.query(
    "UPDATE voyages SET destination = $1, prix = $2 WHERE id = $3 AND admin_id = $4 RETURNING *",
    [destination, prix, req.params.id, admin_id],
  );
  return result;
};
module.exports.IdCheck = async (id, admin_id) => {
  const result = await client.query(
    "SELECT * FROM voyages WHERE id = $1 AND admin_id = $2",
    [id, admin_id],
  );
  return result;
};
module.exports.removeVoyage = async (id, admin_id) => {
  const result = await client.query(
    "DELETE FROM voyages WHERE id = $1 AND admin_id = $2 RETURNING *",
    [id, admin_id],
  );
  return result;
};
