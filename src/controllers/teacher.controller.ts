import { Request, Response } from 'express';
import Teacher from '../db/models/teacher.model.js';

export const getAllTeachers = async (req: Request, res: Response): Promise<void> => {
  try {
    const teachers = await Teacher.find().sort({ teacherId: 1 });
    if (teachers.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No teachers found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: `Fetched all teachers. Count: ${teachers.length}.`,
      data: teachers,
      teacherCount: teachers.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teachers',
      error: (error as Error).message,
    });
  }
};

export const getTeacherById = async (req: Request, res: Response): Promise<void> => {
  try {
    const teacherId = parseInt(req.params.teacherId);
    if (!teacherId || teacherId < 1) {
      res.status(400).json({
        success: false,
        message: `Teacher ID is required.`,
      });
      return;
    }
    const teacher = await Teacher.findOne({ teacherId });
    if (!teacher) {
      res.status(404).json({
        success: false,
        message: `No teacher found with ${teacherId}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teacher',
      error: (error as Error).message,
    });
  }
};

export const createTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body) {
      res.status(400).json({
        success: false,
        message: `Request body is required.`,
      });
      return;
    }
    const existingTeacher = await Teacher.findOne({ email: req.body.email });
    if (existingTeacher) {
      res.status(409).json({
        success: false,
        message: `Teacher with email ${req.body.email} already exists.`,
      });
      return;
    }
    const teacher = new Teacher(req.body);
    const savedSuccessfully = await teacher.save();
    res.status(201).json({
      success: true,
      message: `New teacher created.`,
      data: savedSuccessfully,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating teacher',
      error: (error as Error).message,
    });
  }
};

export const updateTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const teacherId = parseInt(req.params.teacherId);
    if (!teacherId || teacherId < 1) {
      res.status(400).json({
        success: false,
        message: `Teacher ID is required.`,
      });
      return;
    }
    const teacher = await Teacher.findOneAndUpdate({ teacherId }, req.body, {
      new: true,
    });
    if (!teacher) {
      res.status(404).json({
        success: false,
        message: `Could not find teacher with ID ${teacherId}`,
      });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating teacher',
      error: (error as Error).message,
    });
  }
};

export const deleteTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const teacherId = parseInt(req.params.teacherId);
    if (!teacherId) {
      res.status(400).json({
        success: false,
        message: `Teacher ID is required.`,
      });
      return;
    }
    const teacher = await Teacher.findOneAndDelete({ teacherId });
    if (!teacher) {
      res.status(404).json({
        success: false,
        message: `Could not find teacher with ID ${teacherId}`,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: `Teacher with ID ${teacherId} was deleted.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting teacher',
      error: (error as Error).message,
    });
  }
};
