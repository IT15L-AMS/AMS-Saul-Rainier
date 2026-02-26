const Enrollment = require("../models/enrollment.model");
const db = require("../config/db");

exports.enrollStudent = async (req, res, next) => {
  try {
    const { student_id, course_id } = req.body;

    if (!student_id || !course_id) {
      return res.status(400).json({ message: "student_id and course_id required" });
    }

    // verify student exists
    const [student] = await db.query(
      "SELECT id FROM students WHERE id = ?",
      [student_id]
    );

    if (!student.length) {
      return res.status(404).json({ message: "Student not found" });
    }

    // verify course exists
    const [course] = await db.query(
      "SELECT id FROM courses WHERE id = ?",
      [course_id]
    );

    if (!course.length) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Enrollment.enroll(student_id, course_id);

    res.status(201).json({ message: "Student enrolled successfully" });

  } catch (err) {

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Student already enrolled" });
    }

    next(err);
  }
};

exports.dropCourse = async (req, res, next) => {
  try {
    const { student_id, course_id } = req.body;

    await Enrollment.drop(student_id, course_id);

    res.json({ message: "Enrollment removed successfully" });

  } catch (err) {
    next(err);
  }
};

exports.getStudentEnrollments = async (req, res, next) => {
  try {
    const courses = await Enrollment.getStudentCourses(req.params.student_id);
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

exports.getCourseStudents = async (req, res, next) => {
  try {
    const students = await Enrollment.getCourseStudents(req.params.course_id);
    res.json(students);
  } catch (err) {
    next(err);
  }
};