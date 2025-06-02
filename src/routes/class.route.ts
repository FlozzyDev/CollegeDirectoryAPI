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
import {
  classSchema,
  classIdSchema,
  addStudentToClassSchema,
} from '../validationSchema/class.schema.js';
import { requireAuth } from '../authentication/sessionAuth/validation/userAuth.validation.js';

const router = Router();

router.get('/', getAllClasses);
router.get('/:classId', validateParams(classIdSchema), getClassById);
router.post('/', requireAuth, validateRequest(classSchema), createClass);
router.put(
  '/:classId',
  requireAuth,
  validateParams(classIdSchema),
  validateRequest(classSchema),
  updateClass
);
router.delete('/:classId', requireAuth, validateParams(classIdSchema), deleteClass);
router.patch(
  '/:classId/students/add',
  requireAuth,
  validateParams(classIdSchema),
  validateRequest(addStudentToClassSchema),
  addStudentToClass
);
router.patch(
  '/:classId/students/remove',
  requireAuth,
  validateParams(classIdSchema),
  validateRequest(addStudentToClassSchema),
  removeStudentFromClass
);

export default router;
