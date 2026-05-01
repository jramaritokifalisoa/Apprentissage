const express = require("express");
const client = require("../db");
const {
  getVoyageById,
  addReservation,
  setAdmin,
  getAll,
} = require("../controllers/reservation");
module.exports.setPost = async (req, res) => {
  try {
    const { voyage_id, places } = req.body;

    const nomClient = req.user.name;

    if (!voyage_id || !places) {
      return res
        .status(400)
        .json({ message: "Données manquantes (ID voyage ou places)" });
    }

    const voyageCheck = await getVoyageById(voyage_id);

    if (voyageCheck.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Le voyage que vous voulez réserver n'existe pas" });
    }

    // 3. Création de la réservation
    const reservationResult = await addReservation(
      voyage_id,
      nomClient,
      places,
    );

    return res.status(201).json({
      message: "Réservation effectuée avec succès",
      data: reservationResult.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de la réservation" });
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
