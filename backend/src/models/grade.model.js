const db = require("../config/db");

const Grade = {

  async assign(enrollment_id, grade, remarks) {
    const [result] = await db.query(
      `INSERT INTO grades (enrollment_id, grade, remarks)
       VALUES (?, ?, ?)`,
      [enrollment_id, grade, remarks]
    );
    return result.insertId;
  },

  async update(enrollment_id, grade, remarks) {
    await db.query(
      `UPDATE grades
       SET grade = ?, remarks = ?
       WHERE enrollment_id = ?`,
      [grade, remarks, enrollment_id]
    );
  },

  async getStudentGrades(user_id) {
    const [rows] = await db.query(`
      SELECT c.course_code, c.title, g.grade, g.remarks
      FROM grades g
      JOIN enrollments e ON g.enrollment_id = e.id
      JOIN students s ON e.student_id = s.id
      JOIN users u ON s.user_id = u.id
      JOIN courses c ON e.course_id = c.id
      WHERE u.id = ?
    `, [user_id]);

    return rows;
  },

  async getCourseGrades(course_id) {
    const [rows] = await db.query(`
      SELECT u.full_name, s.student_id, g.grade, g.remarks
      FROM grades g
      JOIN enrollments e ON g.enrollment_id = e.id
      JOIN students s ON e.student_id = s.id
      JOIN users u ON s.user_id = u.id
      WHERE e.course_id = ?
    `, [course_id]);

    return rows;
  },

  async getAllGrades() {
    const [rows] = await db.query(`
      SELECT u.full_name, c.course_code, g.grade
      FROM grades g
      JOIN enrollments e ON g.enrollment_id = e.id
      JOIN students s ON e.student_id = s.id
      JOIN users u ON s.user_id = u.id
      JOIN courses c ON e.course_id = c.id
    `);
    return rows;
  }

};

module.exports = Grade;