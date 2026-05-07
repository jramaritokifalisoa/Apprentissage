const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/index");
const {
  setPosts,
  getPosts,
  getme,
  removes,
} = require("../controllers/reservation");

router
  .route("/api/reservation")
  .post(verifyToken, setPosts)
  .get(verifyToken, isAdmin, getPosts);
router.get("/api/reservations/me", verifyToken, isAdmin, getme);
router.route("/api/reservations/:id").delete(verifyToken, isAdmin, removes);
module.exports = router;
