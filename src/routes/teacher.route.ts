import { Router } from 'express';
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '../controllers/teacher.controller.js';
import { validateRequest, validateParams } from '../middleware/validateRequest.js';
import { teacherSchema, teacherIdSchema } from '../validationSchema/teacher.schema.js';
import { requireAuth } from '../authentication/sessionAuth/validation/userAuth.validation.js';

const router = Router();

router.get('/', getAllTeachers);
router.get('/:teacherId', validateParams(teacherIdSchema), getTeacherById);
router.post('/', requireAuth, validateRequest(teacherSchema), createTeacher);
router.put(
  '/:teacherId',
  requireAuth,
  validateParams(teacherIdSchema),
  validateRequest(teacherSchema),
  updateTeacher
);
router.delete('/:teacherId', requireAuth, validateParams(teacherIdSchema), deleteTeacher);

export default router;
