const express = require("express");
const client = require("../db");

module.exports.getAllvoyage = async () => {
  const result = await client.query("SELECT * FROM voyages ORDER BY id ASC");
  return result.rows;
};
module.exports.getId = async (id) => {
  const result = await client.query(
    'SELECT id, name, "role" FROM users WHERE id = $1',
    [id],
  );
  return result;
};
module.exports.Addvoyage = async (destination, prix, Nombre_place) => {
  const result = await client.query(
    "INSERT INTO voyages(destination, prix, places) VALUES($1, $2, $3) RETURNING *",
    [destination, prix, Nombre_place],
  );
  return result;
};
module.exports.selectId = async (id) => {
  const result = await client.query("SELECT * FROM voyages WHERE id = $1", [
    id,
  ]);
  return result;
};
module.exports.updateVoyage = async (id, destination, prix, Nombre_place) => {
  const result = await client.query(
    "UPDATE voyages SET destination = $1, prix = $2, places = $3 WHERE id = $4 RETURNING *",
    [destination, prix, Nombre_place, id],
  );
  return result;
};
module.exports.removeVoyage = async (id) => {
  const result = await client.query(
    "DELETE FROM voyages WHERE id = $1 RETURNING *",
    [id],
  );
  return result;
};
