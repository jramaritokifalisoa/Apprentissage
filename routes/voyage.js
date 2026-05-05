const express = require("express");
const client = require("../db");
const {
  getPosts,
  setPosts,
  getPostII,
  editPosts,
  remove,
} = require("../controllers/voyage");
//const { deletePost } = require("../services/voyage");
const { verifyToken, isAdmin } = require("../middleware/index");
const router = express.Router();
router.route("/api/voyages").get(getPosts).post(verifyToken, isAdmin, setPosts);

router
  .route("/api/voyages/:id")
  .get(getPostII)

  .put(verifyToken, isAdmin, editPosts)
  .delete(verifyToken, isAdmin, remove);
module.exports = router;
