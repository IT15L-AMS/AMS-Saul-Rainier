const db = require("../config/db");

const Course = {
  async create(data) {
    const { course_code, title, units, instructor_id } = data;

    const [result] = await db.query(
      `INSERT INTO courses (course_code, title, units, instructor_id)
       VALUES (?, ?, ?, ?)`,
      [course_code, title, units, instructor_id || null]
    );

    return result.insertId;
  },

  async findAll() {
    const [rows] = await db.query(`
      SELECT c.id, c.course_code, c.title, c.units,
             u.full_name AS instructor,
             c.is_active
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
    `);

    return rows;
  },

  async findByInstructor(instructor_id) {
    const [rows] = await db.query(`
      SELECT id, course_code, title, units
      FROM courses
      WHERE instructor_id = ?
    `, [instructor_id]);

    return rows;
  },

  async update(id, data) {
    const { title, units } = data;

    await db.query(
      `UPDATE courses SET title = ?, units = ? WHERE id = ?`,
      [title, units, id]
    );
  },

  async assignInstructor(id, instructor_id) {
    await db.query(
      `UPDATE courses SET instructor_id = ? WHERE id = ?`,
      [instructor_id, id]
    );
  }
};

module.exports = Course;