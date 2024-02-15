const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  className: String,
  attendance: Number,
  marks: Number,
  grade: String,
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
