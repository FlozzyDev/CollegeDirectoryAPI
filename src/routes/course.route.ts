import { Router } from 'express';
import {
  getAllCourses,
  getCourseByName,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/course.controller.js';
import { validateRequest, validateParams } from '../middleware/validateRequest.js';
import { courseSchema, courseNameSchema } from '../validationSchema/course.schema.js';

const router = Router();

router.get('/', getAllCourses);
router.get('/:courseName', validateParams(courseNameSchema), getCourseByName);
router.post('/', validateRequest(courseSchema), createCourse);
router.put('/:courseName', validateParams(courseNameSchema), validateRequest(courseSchema), updateCourse);
router.delete('/:courseName', validateParams(courseNameSchema), deleteCourse);

export default router;
