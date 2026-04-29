const express = require("express");
const client = require("../config/db");
const router = express.Router();
const { setPost, setGet, setMe } = require("../controllers/reservation");
router.route("/api/reservation").post(setPost).get(setGet);
router.get("/api/reservations/me", setMe);
module.exports = router;
