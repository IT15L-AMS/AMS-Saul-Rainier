// src/controllers/grade.controller.js
const Grade = require("../models/grade.model");
const db = require("../config/db");

exports.assignGrade = async (req, res, next) => {
  try {
    const { enrollment_id, grade, remarks } = req.body;

    if (!enrollment_id || !grade) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // check enrollment exists
    const [enrollment] = await db.query(
      "SELECT * FROM enrollments WHERE id = ?",
      [enrollment_id]
    );

    if (!enrollment.length) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    await Grade.assign(enrollment_id, grade, remarks);

    res.status(201).json({ message: "Grade assigned successfully" });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Grade already exists" });
    }
    next(err);
  }
};

exports.updateGrade = async (req, res, next) => {
  try {
    const { grade, remarks } = req.body;
    await Grade.update(req.params.enrollment_id, grade, remarks);
    res.json({ message: "Grade updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getMyGrades = async (req, res, next) => {
  try {
    const grades = await Grade.getStudentGrades(req.user.id);
    res.json(grades);
  } catch (err) {
    next(err);
  }
};

exports.getCourseGrades = async (req, res, next) => {
  try {
    const grades = await Grade.getCourseGrades(req.params.course_id);
    res.json(grades);
  } catch (err) {
    next(err);
  }
};

exports.getAllGrades = async (req, res, next) => {
  try {
    const grades = await Grade.getAllGrades();
    res.json(grades);
  } catch (err) {
    next(err);
  }
};