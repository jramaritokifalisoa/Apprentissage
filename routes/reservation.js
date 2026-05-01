const express = require("express");
const client = require("../db");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/index");
const { setPost, getPost, getMe } = require("../services/reservation");
router
  .route("/api/reservation")
  .post(verifyToken, setPost)
  .get(verifyToken, isAdmin, getPost);
router.get("/api/reservations/me", getMe);
module.exports = router;
