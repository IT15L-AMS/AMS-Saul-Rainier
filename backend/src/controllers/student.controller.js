const Student = require("../models/student.model");
const User = require("../models/user.model");
const db = require("../config/db");

exports.createStudent = async (req, res, next) => {
  try {
    const { user_id, student_id, year_level, program } = req.body;

    if (!user_id || !student_id || !year_level || !program) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure user role is Student
    if (user.role !== "Student") {
      return res.status(400).json({ message: "User is not a Student role" });
    }

    const studentId = await Student.create({
      user_id,
      student_id,
      year_level,
      program
    });

    res.status(201).json({
      message: "Student created successfully",
      studentId
    });

  } catch (err) {
    next(err);
  }
};

exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    next(err);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    next(err);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    await Student.update(req.params.id, req.body);
    res.json({ message: "Student updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deactivateStudent = async (req, res, next) => {
  try {
    await Student.deactivate(req.params.id);
    res.json({ message: "Student deactivated successfully" });
  } catch (err) {
    next(err);
  }
};