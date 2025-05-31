import Joi from 'joi';

export const studentSchema = Joi.object({
  firstName: Joi.string().required().min(2).max(50),
  lastName: Joi.string().required().min(2).max(50),
  gender: Joi.string().required().valid('Male', 'Female', 'Other'),
  email: Joi.string().required().email(),
  major: Joi.string().required().min(2).max(100),
  expectedGraduation: Joi.number()
    .integer()
    .required()
    .min(new Date().getFullYear())
    .max(new Date().getFullYear() + 5),
});

export const studentIdSchema = Joi.object({
  studentId: Joi.number().integer().required(),
});
