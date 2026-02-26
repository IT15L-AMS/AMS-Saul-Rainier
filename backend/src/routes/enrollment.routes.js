const express = require("express");
const router = express.Router();
const controller = require("../controllers/enrollment.controller");

const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

// Enroll student
router.post(
  "/",
  authenticate,
  authorize("Admin", "Registrar"),
  controller.enrollStudent
);

// Drop course
router.delete(
  "/",
  authenticate,
  authorize("Admin", "Registrar"),
  controller.dropCourse
);

// View student's courses
router.get(
  "/student/:student_id",
  authenticate,
  authorize("Admin", "Registrar", "Student"),
  controller.getStudentEnrollments
);

// Instructor can view students in their course
router.get(
  "/course/:course_id",
  authenticate,
  authorize("Admin", "Registrar", "Instructor"),
  controller.getCourseStudents
);

module.exports = router;