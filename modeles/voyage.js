const express = require("express");
const client = require("../db");
const router = express.Router();
router
  .route("/api/voyages")
  .get(async (req, res) => {
    try {
      const result = await client.query(
        "SELECT * FROM voyages ORDER BY id ASC",
      );
      res.json(result.rows);
    } catch (error) {
      res.status(500).send("Erreur serveur");
    }
  })

  .post(async (req, res) => {
    const { destination, prix } = req.body;

    if (!destination || !prix) {
      return res.status(400).send("Données manquantes");
    }

    try {
      const result = await client.query(
        "INSERT INTO voyages(destination, prix) VALUES($1, $2) RETURNING *",
        [destination, prix],
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).send("Erreur serveur");
    }
  });

router
  .route("/api/voyages/:id")
  .get(async (req, res) => {
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
  })

  .put(async (req, res) => {
    const { destination, prix } = req.body;

    if (!destination || !prix) {
      return res.status(400).send("Données manquantes");
    }

    try {
      const result = await client.query(
        "UPDATE voyages SET destination = $1, prix = $2 WHERE id = $3 RETURNING *",
        [destination, prix, req.params.id],
      );

      if (result.rows.length === 0) {
        return res.status(404).send("Id inexistant");
      }

      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).send("Erreur serveur");
    }
  })
  .delete(async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const result = await client.query("SELECT * FROM voyages WHERE id = $1", [
        id,
      ]);

      if (result.rows.length === 0) {
        return res.send("Id non trouvé");
      }

      const resultSup = await client.query(
        "DELETE FROM voyages WHERE id = $1 RETURNING *",
        [id],
      );

      res.json(resultSup.rows[0]);
    } catch (error) {
      res.status(500).send("Erreur serveur");
    }
  });
module.exports = router;
