import Joi from 'joi';

export const teacherSchema = Joi.object({
  firstName: Joi.string().required().min(2).max(50),
  lastName: Joi.string().required().min(2).max(50),
  gender: Joi.string().required().valid('Male', 'Female', 'Other'),
  email: Joi.string().required().email(),
  department: Joi.string().required().min(2).max(100),
  hireYear: Joi.number().integer().min(1900).max(new Date().getFullYear()),
});

export const teacherIdSchema = Joi.object({
  teacherId: Joi.number().integer().required(),
});
