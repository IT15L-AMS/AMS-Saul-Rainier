const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

// Admin & Registrar full control
router.post(
  "/",
  authenticate,
  authorize("Admin", "Registrar"),
  studentController.createStudent
);

router.get(
  "/",
  authenticate,
  authorize("Admin", "Registrar", "Instructor"),
  studentController.getAllStudents
);

router.get(
  "/:id",
  authenticate,
  authorize("Admin", "Registrar", "Instructor", "Student"),
  studentController.getStudentById
);

router.put(
  "/:id",
  authenticate,
  authorize("Admin", "Registrar"),
  studentController.updateStudent
);

router.delete(
  "/:id",
  authenticate,
  authorize("Admin", "Registrar"),
  studentController.deactivateStudent
);

module.exports = router;