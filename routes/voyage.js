const express = require("express");
const client = require("../db");
const {
  getPost,
  setPost,
  getPostI,
  editPost,
  deletePost,
} = require("../services/voyage");
const router = express.Router();
router.route("/api/voyages").get(getPost).post(setPost);

router
  .route("/api/voyages/:id")
  .get(getPostI)

  .put(editPost)
  .delete(deletePost);
module.exports = router;
