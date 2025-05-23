import { Router } from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/student.controller.js';

const router = Router();

router.get('/', getAllStudents);
router.get('/:studentId', getStudentById);
router.post('/', createStudent);
router.put('/:studentId', updateStudent);
router.delete('/:studentId', deleteStudent);

export default router;
