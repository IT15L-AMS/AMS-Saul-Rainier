const express = require("express");
const router = express.Router();
const controller = require("../controllers/course.controller");

const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.post(
  "/",
  authenticate,
  authorize("Admin", "Registrar"),
  controller.createCourse
);

router.get(
  "/",
  authenticate,
  authorize("Admin", "Registrar", "Instructor", "Student"),
  controller.getAllCourses
);

router.put(
  "/:id",
  authenticate,
  authorize("Admin", "Registrar"),
  controller.updateCourse
);

router.put(
  "/:id/assign",
  authenticate,
  authorize("Admin", "Registrar"),
  controller.assignInstructor
);

module.exports = router;