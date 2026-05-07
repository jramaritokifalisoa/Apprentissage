const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/index");
const {
  showReservation,
  showList,
  showHistory,
  showRemove,
} = require("../controllers/reservation");

router
  .route("/api/reservation")
  .post(verifyToken, showReservation)
  .get(verifyToken, isAdmin, showList);
router.get("/api/reservations/me", verifyToken, isAdmin, showHistory);
router.route("/api/reservations/:id").delete(verifyToken, isAdmin, showRemove);
module.exports = router;
