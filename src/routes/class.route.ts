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
import { validateRequest, validateParams } from '../middleware/validateRequest.js';
import { classSchema, classIdSchema, addStudentToClassSchema } from '../validationSchema/class.schema.js';

const router = Router();

router.get('/', getAllClasses);
router.get('/:classId', validateParams(classIdSchema), getClassById);
router.post('/', validateRequest(classSchema), createClass);
router.put('/:classId', validateParams(classIdSchema), validateRequest(classSchema), updateClass);
router.delete('/:classId', validateParams(classIdSchema), deleteClass);
router.patch('/:classId/students/add', validateParams(classIdSchema), validateRequest(addStudentToClassSchema), addStudentToClass);
router.patch('/:classId/students/remove', validateParams(classIdSchema), validateRequest(addStudentToClassSchema), removeStudentFromClass);

export default router;
