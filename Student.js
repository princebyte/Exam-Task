const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true,
    trim: true,
  },
  branch: {
    type: String,
    trim: true,
    default: '',
  },
  marks: {
    type: Number,
    min: [0, 'Marks must be at least 0'],
    max: [100, 'Marks must be at most 100'],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Student', studentSchema);
