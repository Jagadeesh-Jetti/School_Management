const express = require("express");

const TeacherRouter = express.Router();
const Teacher = require("../models/Teacher.model");

TeacherRouter.get("/", async (req, res) => {
  try {
    const teachersData = await Teacher.find();
    res.json(teachersData);
  } catch (error) {
    res.status(500).json({ error: "failed retrieving teachers data " });
  }
});

TeacherRouter.post("/", async (req, res) => {
  const { name, gender, age, subject, phoneNumber } = req.body;
  try {
    const newTeacher = new Teacher({ name, gender, age, subject, phoneNumber });
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ error: "Failed adding a teacher" });
  }
});

TeacherRouter.put("/:id", async (req, res) => {
  const teacherId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      updatedData,
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ error: "teacher not found " });
    }

    res
      .status(201)
      .json({ message: "Teacher data has been updated", updatedTeacher });
  } catch (error) {
    res.status(500).json({ error: "Failed to updated the teacher data" });
  }
});

TeacherRouter.delete("/:id", async (req, res) => {
  const teacherId = req.params.id;

  try {
    const teacherDeleted = await Teacher.findByIdAndDelete(teacherId);

    if (!teacherDeleted) {
      return res.status(404).json({ error: "Teacher not found " });
    }

    res.status(201).json({
      message: "Teacher deletion successful",
      teacherDeleted,
    });
  } catch (error) {
    res.status(500).json({ error: "failed to delete the teacher" });
  }
});

module.exports = TeacherRouter;
