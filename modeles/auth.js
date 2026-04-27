const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../db");

const router = express.Router();

const SECRET_KEY = "mon_secret_jwt";

router.post("/register", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.send("Erreur de validation");
  }

  try {
    const check = await client.query("SELECT * FROM express WHERE name = $1", [
      name,
    ]);

    if (check.rows.length > 0) {
      return res.send("Utilisateur déjà existant");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await client.query("INSERT INTO express(name, password) VALUES($1,$2)", [
      name,
      hashedPassword,
    ]);

    res.send("Register success");
  } catch (error) {
    console.log(error);
    res.send("Erreur serveur");
  }
});

router.get("/me", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.send("Nom manquant");
  }
  try {
    const result = await client.query(
      "SELECT id, name FROM express WHERE name = $1",
      [name],
    );
    if (result.rows.length === 0) {
      return res.send("Utilisateur introuvable");
    }
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.send("Erreur serveur");
  }
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.send("Nom ou mot de passe manquant");
  }

  try {
    const result = await client.query("SELECT * FROM express WHERE name = $1", [
      name,
    ]);

    if (result.rows.length === 0) {
      return res.send("Utilisateur introuvable");
    }

    const user = result.rows[0];

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.send("Mot de passe incorrect");
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      SECRET_KEY,
      { expiresIn: "1h" },
    );

    res.json({
      message: "Connexion réussie",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.send("Erreur serveur");
  }
});

router.get("/me", verifyToken, async (req, res) => {
  try {
    const result = await client.query(
      "SELECT id, name FROM express WHERE id = $1",
      [req.user.id],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.send("Erreur serveur");
  }
});

function verifyToken(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.send("Token manquant");
  }

  const token = header.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.send("Token invalide");
    }

    req.user = decoded;
    next();
  });
}

module.exports = router;
