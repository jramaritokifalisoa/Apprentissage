const express = require("express");
const client = require("../config/db");
const {
  getPost,
  setPost,
  getPostI,
  editPost,
  deletePost,
} = require("../controllers/voyage");
const router = express.Router();
router.route("/api/voyages").get(getPost).post(setPost);

router
  .route("/api/voyages/:id")
  .get(getPostI)

  .put(editPost)
  .delete(deletePost);
module.exports = router;
