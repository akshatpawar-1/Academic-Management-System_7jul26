const express = require("express");
const router = express.Router();

const {
    isAuthenticated,
    isSuperAdmin
} = require("../middleware/authMiddleware");

const {
    addAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin
} = require("../controllers/adminController");

router.get(
    "/",
    isAuthenticated,
    isSuperAdmin,
    getAdmin
);

router.put(
    "/:id",
    isAuthenticated,
    isSuperAdmin,
    updateAdmin
);

router.delete(
    "/:id",
    isAuthenticated,
    isSuperAdmin,
    deleteAdmin
);

router.post(
    "/",
    isAuthenticated,
    isSuperAdmin,
    addAdmin
);

module.exports = router;