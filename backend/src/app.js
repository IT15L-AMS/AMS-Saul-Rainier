require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));
app.use("/students", require("./routes/student.routes"));
app.use("/courses", require("./routes/course.routes"));
app.use("/enrollments", require("./routes/enrollment.routes"));
app.use("/grades", require("./routes/grade.routes"));
app.use("/dashboard", require("./routes/dashboard.routes"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;