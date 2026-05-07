const express = require("express");
const router = express.Router();
const { login, profil, register } = require("../controllers/auth");

const { verifyToken, isAdmin } = require("../middleware/index");

router.post("/register", register);
router.post("/login", login);

router.get("/me", verifyToken, profil);

module.exports = router;
