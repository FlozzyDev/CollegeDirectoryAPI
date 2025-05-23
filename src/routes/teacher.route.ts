import { Router } from 'express';
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '../controllers/teacher.controller.js';

const router = Router();

router.get('/', getAllTeachers);
router.get('/:teacherId', getTeacherById);
router.post('/', createTeacher);
router.put('/:teacherId', updateTeacher);
router.delete('/:teacherId', deleteTeacher);

export default router;
