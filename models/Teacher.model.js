const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  subject: String,
  phoneNumber: Number,
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
