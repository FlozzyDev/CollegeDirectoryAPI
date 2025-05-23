import { Router } from 'express';
import {
  getAllCourses,
  getCourseByName,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/course.controller.js';

const router = Router();

router.get('/', getAllCourses);
router.get('/:courseName', getCourseByName);
router.post('/', createCourse);
router.put('/:courseName', updateCourse);
router.delete('/:courseName', deleteCourse);

export default router;
