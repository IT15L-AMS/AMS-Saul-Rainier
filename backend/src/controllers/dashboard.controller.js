const db = require("../config/db");

// src/controllers/dashboard.controller.js
exports.getAdminDashboard = async (req, res, next) => {
  try {
    res.json({ message: "Admin dashboard data" });
  } catch (err) {
    next(err);
  }
};

exports.getRegistrarDashboard = async (req, res, next) => {
  try {
    res.json({ message: "Registrar dashboard data" });
  } catch (err) {
    next(err);
  }
};

exports.getInstructorDashboard = async (req, res, next) => {
  try {
    res.json({ message: "Instructor dashboard data" });
  } catch (err) {
    next(err);
  }
};

exports.getStudentDashboard = async (req, res, next) => {
  try {
    res.json({ message: "Student dashboard data" });
  } catch (err) {
    next(err);
  }
};
