const express = require("express");
const router = express.Router();

const { setPost, setLogin, getPost, getAdmin } = require("../services/auth");
const { verifyToken, isAdmin } = require("../middleware/index");

router.post("/register", setPost);
router.post("/login", setLogin);

router.get("/me", verifyToken, getPost);
//router.get("/admin-dashboard", verifyToken, isAdmin, getAdmin);

module.exports = router;
