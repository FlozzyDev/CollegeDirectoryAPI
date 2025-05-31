import Joi from 'joi';

export const courseSchema = Joi.object({
  courseName: Joi.string()
    .required()
    .min(2)
    .max(20)
    .pattern(/^[A-Z0-9]+$/),
  courseDepartment: Joi.string().required().min(2).max(100),
  credits: Joi.number().integer().required().min(1).max(6),
  courseDescription: Joi.string().max(500),
});

export const courseNameSchema = Joi.object({
  courseName: Joi.string()
    .required()
    .min(2)
    .max(20)
    .pattern(/^[A-Z0-9]+$/),
});
