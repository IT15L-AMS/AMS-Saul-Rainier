const db = require("../config/db");

const Enrollment = {

  async enroll(student_id, course_id) {
    const [result] = await db.query(
      `INSERT INTO enrollments (student_id, course_id)
       VALUES (?, ?)`,
      [student_id, course_id]
    );
    return result.insertId;
  },

  async drop(student_id, course_id) {
    await db.query(
      `DELETE FROM enrollments
       WHERE student_id = ? AND course_id = ?`,
      [student_id, course_id]
    );
  },

  async getStudentCourses(student_id) {
    const [rows] = await db.query(`
      SELECT c.id, c.course_code, c.title, c.units
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.student_id = ?
    `, [student_id]);

    return rows;
  },

  async getCourseStudents(course_id) {
    const [rows] = await db.query(`
      SELECT s.student_id, u.full_name, u.email
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN users u ON s.user_id = u.id
      WHERE e.course_id = ?
    `, [course_id]);

    return rows;
  }

};

module.exports = Enrollment;