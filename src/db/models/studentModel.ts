import mongoose, { Schema, Document } from 'mongoose';
import { IStudent } from '../../types/index.js';

const studentSchema = new Schema<IStudent & Document>(
  {
    studentId: {
      type: Number,
      required: false,
      unique: true,
      index: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    major: { type: String, required: true },
    expectedGraduation: { type: Number, required: false },
  },
  { versionKey: false, _id: true }
);

studentSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastStudent = await Student.findOne().sort({ studentId: -1 });
    this.studentId = lastStudent ? lastStudent.studentId + 1 : 1;
  }
  next();
});

const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;
