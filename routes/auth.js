const express = require("express");
const router = express.Router();
const { setPosts, Login, getPosts } = require("../controllers/auth");

const { verifyToken, isAdmin } = require("../middleware/index");

router.post("/register", setPosts);
router.post("/login", Login);

router.get("/me", verifyToken, getPosts);

module.exports = router;
