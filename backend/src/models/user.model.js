const db = require("../config/db");

const User = {
  async findByEmail(email) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  },

  async create(userData) {
    const { full_name, email, password, role_id } = userData;

    const [result] = await db.query(
      "INSERT INTO users (full_name, email, password, role_id) VALUES (?, ?, ?, ?)",
      [full_name, email, password, role_id]
    );

    return result.insertId;
  },

  async findById(id) {
    const [rows] = await db.query(
      "SELECT u.id, u.full_name, u.email, r.name as role FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = ?",
      [id]
    );

    return rows[0];
  }
};

module.exports = User;