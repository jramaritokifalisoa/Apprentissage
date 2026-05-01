const client = require("../db");
const express = require("express");
const { Users, details, remove } = require("../services/users");
const { verifyToken, isAdmin } = require("../middleware/index");
const router = express.Router();
router.route("/api/users").get(verifyToken, isAdmin, Users);
router
  .route("/api/users/:id")
  .get(verifyToken, isAdmin, details)
  .delete(verifyToken, isAdmin, remove);
module.exports = router;
