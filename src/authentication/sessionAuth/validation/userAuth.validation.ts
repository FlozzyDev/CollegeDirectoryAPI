import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { getSession } from '../../services/session.services.js';

export const userAuthValSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(10),
});

export const validateAccountCreation = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    next();
  };
};

export const validateLogin = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    next();
  };
};

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const sessionId = req.cookies.sessionId;
  const session = getSession(sessionId);

  if (!session) {
    res.status(401).json({
      success: false,
      message: 'Please login',
    });
    return;
  }
  res.locals.userEmail = session.userEmail;
  next();
};
