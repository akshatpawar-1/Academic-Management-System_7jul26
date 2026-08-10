const express = require("express");
const router = express.Router();

const {
    isAuthenticated,
    isAdmin
} = require("../middleware/authMiddleware");

const upload = require("../middleware/multerMiddleware");

const {
    addStudent,
    getStudents,
    updateStudent,
    deleteStudent,
    verifyEmail
} = require("../controllers/studentController");

router.get(
    "/verify/:token",
    verifyEmail
);

router.post(
    "/",
    isAuthenticated,
    isAdmin,
    upload.single("photo"),
    addStudent
);

router.get(
    "/",
    isAuthenticated,
    getStudents
);

router.put(
    "/:id",
    isAuthenticated,
    isAdmin,
    upload.single("photo"),
    updateStudent
);

router.delete(
    "/:id",
    isAuthenticated,
    isAdmin,
    deleteStudent
);

module.exports = router;