const express = require("express");
const client = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  addUsers,
  getName,
  getId,
  checkUser,
  AddRole,
  AddUser,
} = require("../controllers/auth");
module.exports.setPost = async (req, res) => {
  const { name, password, confirmPassword, adminCode } = req.body;

  if (!name || !password || !confirmPassword) {
    return res.status(400).send("Erreur de validation");
  }
  if (password !== confirmPassword) {
    return res.status(400).send("Erreur avec password ou confimPassword");
  }
  try {
    // 2. Vérification existence
    const check = await getName(name);
    if (check.rows.length > 0)
      return res.status(400).send("Utilisateur déjà existant");

    // 3. Détermination du rôle
    const userCount = await checkUser();
    const role = parseInt(userCount.rows[0].count) === 0 ? "admin" : "user";

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    const newUser = await addUsers(
      name,
      hashedPassword,
      hashedConfirmPassword,
      role,
    );
    const newId = newUser[0].name;

    if (role === "admin") {
      await AddRole(newId);
    } else {
      await AddUser(newId);
    }

    res.status(201).send(`Inscription réussie en tant que ${role}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur");
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
        role: user.role.name || user.role,
      },
      process.env.SECRET_KEY,
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
/*module.exports.getAdmin = async (req, res) => {
  res.send(`Bienvenue Admin ${req.user.name}, voici les données secrètes.`);
};*/
