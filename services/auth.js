const express = require("express");
const client = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const { addUsers, getName, getId } = require("../controllers/auth");
module.exports.setPost = async (req, res) => {
  const { name, password, confirmPassword } = req.body;

  if (!name || !password || !confirmPassword) {
    return res.status(400).send("Erreur de validation");
  }
  if (password != confirmPassword) {
    return res.status(400).send("Erreur avec password ou confimPassword");
  }
  try {
    const check = await getName(name);

    if (check.rows.length > 0) {
      return res.send("Utilisateur déjà existant");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    await addUsers(name, hashedPassword, hashedConfirmPassword);

    res.send("Register success");
  } catch (error) {
    console.log(error);
    res.send("Erreur serveur");
  }
};

module.exports.getPost = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.send("Nom manquant");
  }
  try {
    const result = await getId(name);
    if (result.rows.length === 0) {
      return res.send("Utilisateur introuvable");
    }
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.send("Erreur serveur");
  }
};

module.exports.setLogin = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.send("Nom ou mot de passe manquant");
  }

  try {
    const result = await getName(name);

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
};
