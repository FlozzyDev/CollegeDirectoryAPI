import { Router } from 'express';
import studentRoutes from './student.route.js';
import teacherRoutes from './teacher.route.js';
import courseRoutes from './course.route.js';
import classRoutes from './class.route.js';
import userRoutes from '../authentication/sessionAuth/routes/userAuth.route.js';
import oauthRoutes from '../authentication/oAuth/routes/oauth.route.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API routes working',
  });
});

router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/courses', courseRoutes);
router.use('/classes', classRoutes);
router.use('/auth', userRoutes);
router.use('/auth/oauth', oauthRoutes);

export default router;
