const express = require("express");
const client = require("../db");

module.exports.getId = async (voyage_id, admin_id) => {
  const result = await client.query(
    "SELECT * FROM voyages WHERE id = $1 AND admin_id = $2",
    [voyage_id, admin_id],
  );
  return result;
};
module.exports.addReservation = async (voyage_id, nom, places) => {
  const result = await client.query(
    "INSERT INTO reservations(voyage_id, nom, places) VALUES($1, $2, $3) RETURNING *",
    [voyage_id, nom, places],
  );
  return result;
};
module.exports.setAdmin = async (admin_id) => {
  const result = await client.query(
    `SELECT r.*
       FROM reservations r
       JOIN voyages v ON r.voyage_id = v.id
       WHERE v.admin_id = $1
       ORDER BY r.id ASC`,
    [admin_id],
  );
  return result;
};
module.exports.getAll = async () => {
  const result = await client.query(
    `SELECT 
         r.id,
         r.nom,
         r.places,
         r.created_at,
         v.id AS voyage_id,
         v.destination,
         v.prix
       FROM reservations r
       JOIN voyages v ON r.voyage_id = v.id
       ORDER BY r.id DESC`,
  );
  return result;
};
