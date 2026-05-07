const express = require("express");
const { User, detail, removes } = require("../controllers/users");

const { verifyToken, isAdmin } = require("../middleware/index");
const router = express.Router();
router.route("/api/users").get(verifyToken, isAdmin, User);
router
  .route("/api/users/:id")
  .get(verifyToken, isAdmin, detail)
  .delete(verifyToken, isAdmin, removes);
module.exports = router;
