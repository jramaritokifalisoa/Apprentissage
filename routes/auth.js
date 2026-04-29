const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../db");
const { setPost, getPost, setLogin } = require("../services/auth");
const router = express.Router();

const SECRET_KEY = "mon_secret_jwt";

router.post("/register", setPost);

router.get("/me", getPost);

router.post("/login", setLogin);

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
