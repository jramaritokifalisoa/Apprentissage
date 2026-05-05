const express = require("express");
const client = require("../db");
const {
  getAllvoyage,
  getId,
  Addvoyage,
  selectId,
  updateVoyage,
  IdCheck,
  removeVoyage,
} = require("../repository/voyage");
module.exports.getPost = async (req, res) => {
  try {
    const result = await getAllvoyage();
    res.json(result);
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};
module.exports.setPost = async (req, res) => {
  try {
    const { destination, prix, Nombre_place } = req.body;

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Utilisateur non authentifié (req.user est vide)" });
    }
    const userId = req.user.id;
    const userRole =
      typeof req.user.role === "object" ? req.user.role.name : req.user.role;

    if (!destination || !prix || !Nombre_place) {
      return res.status(400).json({ message: "Données manquantes" });
    }

    const userCheck = await getId(userId);

    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    if (userRole !== "admin" && userRole !== "SuperAdmin") {
      return res.status(403).json({
        message: "Accès refusé : Seuls les admins peuvent créer des voyages",
      });
    }

    const result = await Addvoyage(destination, prix, Nombre_place);

    return res.status(201).json({
      message: "Voyage créé avec succès",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
module.exports.getPostI = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await selectId(id);

    if (result.rows.length === 0) {
      return res.status(404).send("Id inexistant");
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};
module.exports.editPost = async (req, res) => {
  try {
    const { destination, prix, Nombre_place } = req.body;
    const { id } = req.params;

    const userRole =
      typeof req.user.role === "object" ? req.user.role.name : req.user.role;

    if (!destination || !prix || !Nombre_place) {
      return res.status(400).json({ message: "Données manquantes" });
    }

    if (userRole !== "admin" && userRole !== "SuperAdmin") {
      return res.status(403).json({
        message: "Accès refusé : Seuls les admins peuvent modifier des voyages",
      });
    }

    const result = await updateVoyage(id, destination, prix, Nombre_place);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Voyage inexistant" });
    }

    return res.status(200).json({
      message: "Voyage mis à jour avec succès",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
module.exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const userRole =
      typeof req.user.role === "object" ? req.user.role.name : req.user.role;

    if (userRole !== "admin" && userRole !== "SuperAdmin") {
      return res.status(403).json({
        message:
          "Accès refusé : Seuls les admins peuvent supprimer des voyages",
      });
    }

    const resultSup = await removeVoyage(id);

    if (resultSup.rowCount === 0) {
      return res.status(404).json({ message: "Voyage inexistant" });
    }

    return res.status(200).json({
      message: "Voyage supprimé avec succès",
      data: resultSup.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
