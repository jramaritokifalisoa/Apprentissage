const client = require("../db");
const express = require("express");
const { Users, details } = require("../services/users");
const { verifyToken, isAdmin } = require("../middleware/index");
const router = express.Router();
router.route("/api/users").get(verifyToken, isAdmin, Users);
router.route("/api/users/:id").get(verifyToken, isAdmin, details);
module.exports = router;
