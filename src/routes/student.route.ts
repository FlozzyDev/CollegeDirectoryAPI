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
import { requireAuth } from '../authentication/sessionAuth/validation/userAuth.validation.js';

const router = Router();

router.get('/', getAllStudents);
router.get('/:studentId', validateParams(studentIdSchema), getStudentById);
router.post('/', requireAuth, validateRequest(studentSchema), createStudent);
router.put(
  '/:studentId',
  requireAuth,
  validateParams(studentIdSchema),
  validateRequest(studentSchema),
  updateStudent
);
router.delete('/:studentId', requireAuth, validateParams(studentIdSchema), deleteStudent);

export default router;
