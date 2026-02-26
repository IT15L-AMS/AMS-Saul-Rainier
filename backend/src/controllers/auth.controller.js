const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const db = require("../config/db");

exports.register = async (req, res, next) => {
  try {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Prevent duplicate email
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Validate role
    const [roles] = await db.query("SELECT * FROM roles WHERE name = ?", [role]);
    if (roles.length === 0) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const role_id = roles[0].id;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await User.create({
      full_name,
      email,
      password: hashedPassword,
      role_id,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId,
    });

  } catch (error) {
    next(error);
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role_id: user.role_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    next(error);
  }
};