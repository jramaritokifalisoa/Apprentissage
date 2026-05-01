const express = require("express");
const client = require("../db");
const {
  getPost,
  setPost,
  getPostI,
  editPost,
  deletePost,
} = require("../services/voyage");
const { verifyToken, isAdmin } = require("../middleware/index");
const router = express.Router();
router.route("/api/voyages").get(getPost).post(verifyToken, isAdmin, setPost);

router
  .route("/api/voyages/:id")
  .get(getPostI)

  .put(verifyToken, isAdmin, editPost)
  .delete(verifyToken, isAdmin, deletePost);
module.exports = router;
