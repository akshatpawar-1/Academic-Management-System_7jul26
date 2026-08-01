const express = require("express");
const router = express.Router();

const {
    isAuthenticated,
    isAdmin
} = require("../middleware/authMiddleware");

const {
    addMark,
    getMarks,
    getStudentMarks,
    getStudentSemesterReport,
    updateMark,
    deleteMark
} = require("../controllers/markController");

router.post(
    "/",
    isAuthenticated,
    isAdmin,
    addMark
);

router.get(
    "/",
    isAuthenticated,
    getMarks
);

router.get(
    "/student",
    isAuthenticated,
    getStudentMarks
);

router.get(
    "/report/:student_id/:semester",
    isAuthenticated,
    isAdmin,
    getStudentSemesterReport
);

router.put(
    "/:id",
    isAuthenticated,
    isAdmin,
    updateMark
);

router.delete(
    "/:id",
    isAuthenticated,
    isAdmin,
    deleteMark
);

module.exports = router;