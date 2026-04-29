const express = require("express");
const client = require("../config/db");

module.exports.getPost = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM voyages ORDER BY id ASC");
    res.json(result.rows);
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

    const user = await client.query("SELECT id FROM users WHERE id = $1", [
      admin_id,
    ]);

    if (user.rows.length === 0) {
      res.status(404).json({
        message: "Admin introuvable",
      });
    }
    const result = await client.query(
      "INSERT INTO voyages(destination, prix, admin_id) VALUES($1, $2, $3) RETURNING *",
      [destination, prix, admin_id],
    );

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

    const result = await client.query("SELECT * FROM voyages WHERE id = $1", [
      id,
    ]);

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
    const check = await client.query(
      "SELECT * FROM voyages WHERE id = $1 AND admin_id = $2",
      [req.params.id, admin_id],
    );

    if (check.rows.length === 0) {
      return res.status(403).send("Non autorisé ou voyage inexistant");
    }

    const result = await client.query(
      "UPDATE voyages SET destination = $1, prix = $2 WHERE id = $3 AND admin_id = $4 RETURNING *",
      [destination, prix, req.params.id, admin_id],
    );

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

    const check = await client.query(
      "SELECT * FROM voyages WHERE id = $1 AND admin_id = $2",
      [id, admin_id],
    );

    if (check.rows.length === 0) {
      return res.status(403).send("Non autorisé ou voyage inexistant");
    }

    const resultSup = await client.query(
      "DELETE FROM voyages WHERE id = $1 AND admin_id = $2 RETURNING *",
      [id, admin_id],
    );

    res.json(resultSup.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur");
  }
};
