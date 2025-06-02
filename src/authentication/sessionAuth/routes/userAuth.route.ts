import { Router } from 'express';
import {
  validateAccountCreation,
  userAuthValSchema,
  validateLogin,
  requireAuth,
} from '../validation/userAuth.validation';
import {
  createUser,
  loginUser,
  logoutUser,
} from '../controllers/userAuth.controller.js';

const router = Router();

router.post('/createAccount', validateAccountCreation(userAuthValSchema), createUser);
router.post('/login', validateLogin(userAuthValSchema), loginUser);
router.post('/logout', requireAuth, logoutUser);
export default router;
