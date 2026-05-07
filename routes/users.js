const express = require("express");
const {
  showListUsers,
  showDetailUser,
  remove,
} = require("../controllers/users");

const { verifyToken, isAdmin } = require("../middleware/index");
const router = express.Router();
router.route("/api/users").get(verifyToken, isAdmin, showListUsers);
router
  .route("/api/users/:id")
  .get(verifyToken, isAdmin, showDetailUser)
  .delete(verifyToken, isAdmin, remove);
module.exports = router;
