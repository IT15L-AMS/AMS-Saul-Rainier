const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboard.controller");

const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

// Dashboard routes
router.get("/admin", authenticate, authorize("Admin"), controller.getAdminDashboard);
router.get("/registrar", authenticate, authorize("Admin", "Registrar"), controller.getRegistrarDashboard);
router.get("/instructor", authenticate, authorize("Instructor"), controller.getInstructorDashboard);
router.get("/student", authenticate, authorize("Student"), controller.getStudentDashboard);

module.exports = router;