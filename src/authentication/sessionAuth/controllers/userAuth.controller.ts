import { Request, Response } from 'express';
import User from '../models/userAuth.model.js';
import bcrypt from 'bcrypt';
import { createSession, getSession, deleteSession } from '../../services/session.services.js';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: `Email and password are required.`,
      });
      return;
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: `User already exists with this email: ${email}`,
      });
      return;
    }
    const user = new User({
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: `New user created for ${email}.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: (error as Error).message,
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password', // we are not specific
      });
      return;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password', // we are not specific
      });
      return;
    }

    const sessionId = createSession(user.email);
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: (error as Error).message,
    });
  }
};

export const logoutUser = (req: Request, res: Response): void => {
  const sessionId = req.cookies.sessionId;
  const session = getSession(sessionId);
  if (!session) {
    res.status(401).json({
      success: false,
      message: 'No session found',
    });
    return;
  }
  deleteSession(sessionId);
  res.clearCookie('sessionId');
  res.status(200).json({
    success: true,
    message: 'User logged out successfully',
  });
};
