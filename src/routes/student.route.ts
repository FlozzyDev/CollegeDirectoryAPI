import { Router } from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/student.controller.js';
import { validateRequest, validateParams } from '../middleware/validateRequest.js';
import { studentSchema, studentIdSchema } from '../validationSchema/student.schema.js';

const router = Router();

router.get('/', getAllStudents);
router.get('/:studentId', validateParams(studentIdSchema), getStudentById);
router.post('/', validateRequest(studentSchema), createStudent);
router.put('/:studentId', validateParams(studentIdSchema), validateRequest(studentSchema), updateStudent);
router.delete('/:studentId', validateParams(studentIdSchema), deleteStudent);

export default router;
