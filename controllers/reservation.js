const express = require("express");
const client = require("../config/db");

module.exports.setPost = async (req, res) => {
  try {
    const { voyage_id, nom, places, admin_id } = req.body;

    if (voyage_id == null || !nom || places == null || !admin_id) {
      return res.status(400).send("Données manquantes");
    }

    // vérifier que le voyage appartient à l'admin
    const voyageResult = await client.query(
      "SELECT * FROM voyages WHERE id = $1 AND admin_id = $2",
      [voyage_id, admin_id],
    );

    if (voyageResult.rows.length === 0) {
      return res.status(403).send("Non autorisé ou voyage inexistant");
    }

    const reservationResult = await client.query(
      "INSERT INTO reservations(voyage_id, nom, places) VALUES($1, $2, $3) RETURNING *",
      [voyage_id, nom, places],
    );

    res.status(201).json(reservationResult.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur");
  }
};

module.exports.setGet = async (req, res) => {
  const { admin_id } = req.query;

  if (!admin_id) {
    return res.status(400).send("admin_id manquant");
  }

  try {
    const result = await client.query(
      `SELECT r.*
       FROM reservations r
       JOIN voyages v ON r.voyage_id = v.id
       WHERE v.admin_id = $1
       ORDER BY r.id ASC`,
      [admin_id],
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur");
  }
};
module.exports.setMe = async (req, res) => {
  try {
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
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur");
  }
};
