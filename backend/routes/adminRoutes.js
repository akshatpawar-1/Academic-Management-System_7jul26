const express = require("express");
const router = express.Router();
const upload = require("../middleware/multermiddleware");
const {
    isAuthenticated,
    isSuperAdmin
} = require("../middleware/authMiddleware");
const {
    addAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin,
    verifyEmail
} = require("../controllers/adminController");

// public route - no auth, admin isn't logged in yet when clicking this link
router.get(
    "/verify/:token",
    verifyEmail
);

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
    upload.single("photo"),
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
    upload.single("photo"),
    addAdmin
);

module.exports = router;