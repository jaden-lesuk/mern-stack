const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getCurrentUser } = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getCurrentUser);

module.exports = router;