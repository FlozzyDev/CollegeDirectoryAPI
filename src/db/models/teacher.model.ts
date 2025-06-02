import mongoose, { Schema, Document } from 'mongoose';
import { ITeacher } from '../../types/index.js';

const teacherSchema = new Schema<ITeacher & Document>(
  {
    teacherId: {
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
    department: { type: String, required: true },
    hireYear: { type: Number, required: false },
  },
  { versionKey: false, _id: true }
);

teacherSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastTeacher = await Teacher.findOne().sort({ teacherId: -1 });
    this.teacherId = lastTeacher ? lastTeacher.teacherId + 1 : 1;
  }
  next();
});

const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);

export default Teacher;
