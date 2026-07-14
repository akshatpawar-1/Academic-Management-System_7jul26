const express = require("express");
const router = express.Router();
const { checkSession } = require("../controllers/sessionController");

router.get("/", checkSession);

module.exports = router;