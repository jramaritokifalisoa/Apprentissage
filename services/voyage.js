const express = require("express");
const client = require("../db");
const {
  getAllvoyage,
  getId,
  Addvoyage,
  selectId,
  CheckId,
  IdCheck,
  removeVoyage,
} = require("../controllers/voyage");
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
    const { destination, prix, admin_id } = req.body;
    if (destination == null || prix == null || admin_id == null) {
      res.status(400).json({
        message: "Données manquantes",
      });
    }

    const user = await getId(admin_id);

    if (user.rows.length === 0) {
      res.status(404).json({
        message: "Admin introuvable",
      });
    }
    const result = await Addvoyage(destination, prix, admin_id);

    return res.status(201).json({
      message: "Voyage créé avec succès",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erreur serveur",
    });
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
  const { destination, prix, admin_id } = req.body;

  if (!destination || !prix || !admin_id) {
    return res.status(400).send("Données manquantes");
  }

  try {
    const check = await CheckId(admin_id);

    if (check.rows.length === 0) {
      return res.status(403).send("Non autorisé ou voyage inexistant");
    }

    const result = await updateVoyage(destination, prix, admin_id);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};
module.exports.deletePost = async (req, res) => {
  const { admin_id } = req.body;

  if (!admin_id) {
    return res.status(400).send("Données manquantes");
  }

  try {
    const id = parseInt(req.params.id);

    const check = await IdCheck(id, admin_id);

    if (check.rows.length === 0) {
      return res.status(403).send("Non autorisé ou voyage inexistant");
    }

    const resultSup = await removeVoyage(id, admin_id);

    res.json(resultSup.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur");
  }
};
