const express = require("express");
const client = require("../db");
const router = express.Router();
const { setPost, getPost, getMe } = require("../services/reservation");
router.route("/api/reservation").post(setPost).get(getPost);
router.get("/api/reservations/me", getMe);
module.exports = router;
