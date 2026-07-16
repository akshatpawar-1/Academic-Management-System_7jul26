const express = require("express");
const router = express.Router();
const { checkSession } = require("../controllers/sessionController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/", isAuthenticated, checkSession);

module.exports = router;