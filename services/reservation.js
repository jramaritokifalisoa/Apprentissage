const express = require("express");
const client = require("../db");
const {
  getId,
  addReservation,
  setAdmin,
  getAll,
} = require("../controllers/reservation");
module.exports.setPost = async (req, res) => {
  try {
    const { voyage_id, nom, places, admin_id } = req.body;

    if (voyage_id == null || !nom || places == null || !admin_id) {
      return res.status(400).send("Données manquantes");
    }

    const voyageResult = await getId(voyage_id, admin_id);

    if (voyageResult.rows.length === 0) {
      return res.status(403).send("Non autorisé ou voyage inexistant");
    }

    const reservationResult = await addReservation(voyage_id, nom, places);

    res.status(201).json(reservationResult.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur");
  }
};

module.exports.getPost = async (req, res) => {
  const { admin_id } = req.query;

  if (!admin_id) {
    return res.status(400).send("admin_id manquant");
  }

  try {
    const result = await setAdmin(admin_id);

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur");
  }
};
module.exports.getMe = async (req, res) => {
  try {
    const result = await getAll();
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur");
  }
};
