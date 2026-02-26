const db = require("../config/db");

const Student = {
  async create(data) {
    const { user_id, student_id, year_level, program } = data;

    const [result] = await db.query(
      `INSERT INTO students (user_id, student_id, year_level, program)
       VALUES (?, ?, ?, ?)`,
      [user_id, student_id, year_level, program]
    );

    return result.insertId;
  },

  async findAll() {
    const [rows] = await db.query(`
      SELECT s.id, s.student_id, u.full_name, u.email,
             s.year_level, s.program, s.is_active
      FROM students s
      JOIN users u ON s.user_id = u.id
    `);

    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(`
      SELECT s.id, s.student_id, u.full_name, u.email,
             s.year_level, s.program, s.is_active
      FROM students s
      JOIN users u ON s.user_id = u.id
      WHERE s.id = ?
    `, [id]);

    return rows[0];
  },

  async update(id, data) {
    const { year_level, program } = data;

    await db.query(
      `UPDATE students
       SET year_level = ?, program = ?
       WHERE id = ?`,
      [year_level, program, id]
    );
  },

  async deactivate(id) {
    await db.query(
      `UPDATE students SET is_active = FALSE WHERE id = ?`,
      [id]
    );
  }
};

module.exports = Student;