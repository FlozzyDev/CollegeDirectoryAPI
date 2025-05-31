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

const router = Router();

router.get('/', getAllTeachers);
router.get('/:teacherId', validateParams(teacherIdSchema), getTeacherById);
router.post('/', validateRequest(teacherSchema), createTeacher);
router.put('/:teacherId', validateParams(teacherIdSchema), validateRequest(teacherSchema), updateTeacher);
router.delete('/:teacherId', validateParams(teacherIdSchema), deleteTeacher);

export default router;
