const express = require('express');
const mongoose = require('mongoose');
const Student = require('../models/Student');

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function normalizeStudentPayload(body) {
  return {
    name: body.name?.trim(),
    rollNumber: body.rollNumber?.trim(),
    branch: body.branch?.trim() || '',
    marks: body.marks === '' || body.marks === undefined || body.marks === null ? undefined : Number(body.marks),
  };
}

// Get all students
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    next(error);
  }
});

// Add a new student
router.post('/', async (req, res, next) => {
  try {
    const payload = normalizeStudentPayload(req.body);

    if (!payload.name || !payload.rollNumber) {
      return res.status(400).json({ message: 'Name and roll number are required.' });
    }

    if (payload.marks !== undefined && (Number.isNaN(payload.marks) || payload.marks < 0 || payload.marks > 100)) {
      return res.status(400).json({ message: 'Marks must be a number between 0 and 100.' });
    }

    const student = await Student.create(payload);
    res.status(201).json(student);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Roll number already exists.' });
    }
    next(error);
  }
});

// Get a student by ID
router.get('/:id', async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid student ID.' });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.json(student);
  } catch (error) {
    next(error);
  }
});

// Update student details
router.put('/:id', async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid student ID.' });
    }

    const payload = normalizeStudentPayload(req.body);
    const updateData = {};
    const marksWasProvided = req.body.marks !== undefined && req.body.marks !== null && req.body.marks !== '';

    if (payload.name !== undefined) updateData.name = payload.name;
    if (payload.rollNumber !== undefined) updateData.rollNumber = payload.rollNumber;
    if (payload.branch !== undefined) updateData.branch = payload.branch;
    if (marksWasProvided && Number.isNaN(payload.marks)) {
      return res.status(400).json({ message: 'Marks must be a number between 0 and 100.' });
    }
    if (payload.marks !== undefined) updateData.marks = payload.marks;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'At least one field is required to update.' });
    }

    const student = await Student.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.json(student);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Roll number already exists.' });
    }
    next(error);
  }
});

// Delete a student
router.delete('/:id', async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid student ID.' });
    }

    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.json({ message: 'Student deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
