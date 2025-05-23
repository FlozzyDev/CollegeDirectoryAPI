import { Router } from 'express';
import {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  addStudentToClass,
  removeStudentFromClass,
} from '../controllers/class.controller.js';

const router = Router();

router.get('/', getAllClasses);
router.get('/:classId', getClassById);
router.post('/', createClass);
router.put('/:classId', updateClass);
router.delete('/:classId', deleteClass);
router.patch('/:classId/students/add', addStudentToClass);
router.patch('/:classId/students/remove', removeStudentFromClass);

export default router;
