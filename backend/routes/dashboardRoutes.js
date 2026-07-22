const express = require("express");
const router = express.Router();

const {
    isAuthenticated,
    isAdmin
} = require("../middleware/authMiddleware");

const {
    getDashboard
} = require("../controllers/dashboardController");

router.get(
    "/",
    isAuthenticated,
    isAdmin,
    getDashboard
);

module.exports = router;