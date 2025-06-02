import { Router } from 'express';
import passport from 'passport';
import { createSession } from '../../services/session.services.js';
import { IOAuthUser as IOAuthUserType } from '../types/oAuthUser.types.js';
const router = Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const user = req.user as IOAuthUserType;
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Authentication failed',
        });
        return;
      }
      const sessionId = createSession(user.email); // same session as other users
      res.cookie('sessionId', sessionId, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: 'Successfully authenticated with GitHub',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error during authentication',
        error: (error as Error).message,
      });
    }
  }
);

export default router;
