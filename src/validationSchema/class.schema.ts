import Joi from 'joi';
import { Semester } from '../types/class.types.js';

export const classSchema = Joi.object({
  courseName: Joi.string()
    .required()
    .min(2)
    .max(20)
    .pattern(/^[A-Z0-9]+$/),
  teacherId: Joi.number().integer().required(),
  semester: Joi.string()
    .required()
    .valid(...Object.values(Semester)),
  year: Joi.number()
    .integer()
    .required()
    .min(new Date().getFullYear())
    .max(new Date().getFullYear() + 5),
  students: Joi.array().items(Joi.number().integer()),
  seats: Joi.number().integer().required().min(1).max(100),
});

export const classIdSchema = Joi.object({
  classId: Joi.number().integer().required(),
});

export const addStudentToClassSchema = Joi.object({
  studentId: Joi.number().integer().required(),
});
