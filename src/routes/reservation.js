const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/index");
const {
  createReservation,
  showList,
  showHistory,
  removeReservation,
} = require("../controllers/reservation");

router
  .route("/api/reservation")
  .post(verifyToken, createReservation)
  .get(verifyToken, isAdmin, showList);
router.get("/api/reservations/me", verifyToken,showHistory);
router.route("/api/reservations/:id").delete(verifyToken,removeReservation);
module.exports = router;
