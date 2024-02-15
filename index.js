const express = require("express");
const CORS = require("cors");
const app = express();

const initializeDatabase = require("./db");
const StudentRouter = require("./routers/Student.router");
const TeacherRouter = require("./routers/Teacher.router");

initializeDatabase();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("School Management Backend");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.use("/students", StudentRouter);
app.use("/teachers", TeacherRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`School Management backend server started on ${PORT} `)
);
