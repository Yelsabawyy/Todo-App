const express = require("express");
const authController = require("../Controllers/authController");
const router = express.Router();

router.post("/login", authController.Login);
router.post("/register", authController.Register);

module.exports = router;
