const express = require("express");
const client = require("../config/db");
const router = express.Router();
const { setPost, getPost, getMe } = require("../controllers/reservation");
router.route("/api/reservation").post(setPost).get(getPost);
router.get("/api/reservations/me", getMe);
module.exports = router;
