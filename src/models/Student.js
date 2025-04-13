'use strict';
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['monitor', 'student'], default: 'student' },
  },
  { timestamps: true } // This will create - createdAt and updatedAT by default.
);

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
