const express = require("express");

const Student = require("../models/Student.model");
const StudentRouter = express.Router();

StudentRouter.get("/", async (req, res) => {
  try {
    const studentsData = Student.find();
    res.status(201).json(studentsData);
  } catch (error) {
    res.status(500).json({ error: "failed to retrieve students data" });
  }
});

StudentRouter.post("/", async (req, res) => {
  const { name, age, gender, className, attendance, marks, grade } = req.body;
  try {
    const updatedStudent = new Student({
      name,
      age,
      gender,
      className,
      attendance,
      marks,
      grade,
    });
    await updatedStudent.save();

    res.status(201).json({ message: "student data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "failed to update the student data" });
  }
});

StudentRouter.put("/:id", async (req, res) => {
  const studentId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student data not found " });
    }

    res.status(200).json({ message: "Student data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "failed to update the student data" });
  }
});

StudentRouter.delete("/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    const studentDeleted = await Student.findByIdAndDelete(studentId);

    if (!studentDeleted) {
      return res.status(404).json({ error: "student data not found " });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "failed to delete the student data" });
  }
});

module.exports = StudentRouter;
