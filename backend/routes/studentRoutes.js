const express = require("express");
const router = express.Router();

const {
    isAuthenticated,
    isAdmin
} = require("../middleware/authMiddleware");

const {
    addStudent,
    getStudents,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

router.post(
    "/",
    isAuthenticated,
    isAdmin,
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
    updateStudent
);

router.delete(
    "/:id",
    isAuthenticated,
    isAdmin,
    deleteStudent
);

module.exports = router;