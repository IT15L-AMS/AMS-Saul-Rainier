
const express = require("express");
const router = express.Router();
const controller = require("../controllers/grade.controller");


const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.post("/", authenticate, authorize("Instructor"), controller.assignGrade);
router.put("/:enrollment_id", authenticate, authorize("Instructor"), controller.updateGrade);
router.get("/my-grades", authenticate, authorize("Student"), controller.getMyGrades);
router.get("/course/:course_id", authenticate, authorize("Instructor"), controller.getCourseGrades);
router.get("/", authenticate, authorize("Admin", "Registrar"), controller.getAllGrades);

// Instructor assigns grade
router.post(
  "/",
  authenticate,
  authorize("Instructor"),
  controller.assignGrade
);

// Update grade
router.put(
  "/:enrollment_id",
  authenticate,
  authorize("Instructor"),
  controller.updateGrade
);

// Student view own grades
router.get(
  "/my-grades",
  authenticate,
  authorize("Student"),
  controller.getMyGrades
);

// Instructor view grades for course
router.get(
  "/course/:course_id",
  authenticate,
  authorize("Instructor"),
  controller.getCourseGrades
);

// Admin & Registrar view all grades
router.get(
  "/",
  authenticate,
  authorize("Admin", "Registrar"),
  controller.getAllGrades
);

module.exports = router;