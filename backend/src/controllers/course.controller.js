const Course = require("../models/course.model");
const db = require("../config/db");

exports.createCourse = async (req, res, next) => {
  try {
    const { course_code, title, units, instructor_id } = req.body;

    if (!course_code || !title || !units) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Validate instructor role if provided
    if (instructor_id) {
      const [rows] = await db.query(
        `SELECT r.name
         FROM users u
         JOIN roles r ON u.role_id = r.id
         WHERE u.id = ?`,
        [instructor_id]
      );

      if (!rows.length || rows[0].name !== "Instructor") {
        return res.status(400).json({ message: "Invalid instructor" });
      }
    }

    const id = await Course.create({
      course_code,
      title,
      units,
      instructor_id
    });

    res.status(201).json({
      message: "Course created successfully",
      courseId: id
    });

  } catch (err) {
    next(err);
  }
};

exports.getAllCourses = async (req, res, next) => {
  try {
    const user = req.user;

    // If Instructor → only show assigned
    if (user.role_id) {
      const [role] = await db.query(
        `SELECT name FROM roles WHERE id = ?`,
        [user.role_id]
      );

      if (role[0].name === "Instructor") {
        const courses = await Course.findByInstructor(user.id);
        return res.json(courses);
      }
    }

    const courses = await Course.findAll();
    res.json(courses);

  } catch (err) {
    next(err);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    await Course.update(req.params.id, req.body);
    res.json({ message: "Course updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.assignInstructor = async (req, res, next) => {
  try {
    const { instructor_id } = req.body;

    await Course.assignInstructor(req.params.id, instructor_id);

    res.json({ message: "Instructor assigned successfully" });
  } catch (err) {
    next(err);
  }
};