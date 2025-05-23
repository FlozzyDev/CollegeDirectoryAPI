import mongoose, { Schema, Document } from 'mongoose';
import { ICourse } from '../../types/index.js';

const courseSchema = new Schema<ICourse & Document>(
  {
    courseName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    courseDepartment: { type: String, required: true },
    credits: { type: Number, required: true },
    courseDescription: { type: String, required: false },
  },
  { versionKey: false, _id: true }
);

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;
