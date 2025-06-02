import mongoose, { Schema, Document } from 'mongoose';
import { IClass, Semester } from '../../types/index.js';

const classSchema = new Schema<IClass & Document>(
  {
    classId: {
      type: Number,
      required: false,
      unique: true,
      index: true,
    },
    courseName: { type: String, required: true },
    teacherId: { type: Number, required: true },
    semester: {
      type: String,
      required: true,
      enum: Object.values(Semester),
      default: Semester.SPRING,
    },
    year: { type: Number, required: true },
    students: { type: [Number], required: false },
    seats: { type: Number, required: true },
  },
  { versionKey: false, _id: true }
);

classSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastClass = await Class.findOne().sort({ classId: -1 });
    this.classId = lastClass ? lastClass.classId + 1 : 1;
  }
  next();
});

const Class = mongoose.model<IClass>('Class', classSchema);

export default Class;
