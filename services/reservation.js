const express = require("express");
const client = require("../db");
const {
  getVoyageById,
  addReservation,
  setAdmin,
  getAll,
  removeAll,
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
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    const adminId = req.user.id;
    const userRole =
      typeof req.user.role === "object" ? req.user.role.name : req.user.role;

    if (userRole !== "admin" && userRole !== "SuperAdmin") {
      return res.status(403).json({
        message:
          "Accès refusé : Seuls les admins peuvent voir la liste des réservations",
      });
    }

    const result = await setAdmin();

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};
module.exports.getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Accès refusé ou Utilisateur non authentifié" });
    }

    const nomUtilisateur = req.user.name;

    const result = await getAll(nomUtilisateur);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Erreur serveur lors de la récupération de l'historique");
  }
};
module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).send({ message: "Veuillez vous connecter !!" });
    }

    const nomUtilisateur = req.user.name;

    const resultRemove = await removeAll(id, nomUtilisateur);

    if (resultRemove.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Réservation inexistante ou non autorisée !" });
    }

    return res.status(200).json({
      message: "Réservation supprimée avec succès",
      data: resultRemove.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur lors de la suppression");
  }
};
