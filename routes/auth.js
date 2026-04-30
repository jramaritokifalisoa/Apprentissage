const express = require("express");
const router = express.Router();

const { setPost, setLogin, getPost } = require("../services/auth");
const { verifyToken } = require("../middleware/auth");

router.post("/register", setPost);
router.post("/login", setLogin);

router.get("/me", verifyToken, getPost);

module.exports = router;
