import { Request, Response } from 'express';
import Class from '../db/models/classModel.js';
import { Semester } from '../types/index.js';

export const getAllClasses = async (req: Request, res: Response): Promise<void> => {
  try {
    const classes = await Class.find().sort({ classId: 1 });
    if (classes.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No classes found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: `Fetched all classes. Count: ${classes.length}.`,
      data: classes,
      classCount: classes.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching classes',
      error: (error as Error).message,
    });
  }
};

export const getClassById = async (req: Request, res: Response): Promise<void> => {
  try {
    const classId = parseInt(req.params.classId);
    if (!classId) {
      res.status(400).json({
        success: false,
        message: `Class ID is required.`,
      });
      return;
    }
    const classItem = await Class.findOne({ classId });
    if (!classItem) {
      res.status(404).json({
        success: false,
        message: `No class found with ${classId}`,
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: classItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching class',
      error: (error as Error).message,
    });
  }
};

export const createClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const classItem = new Class(req.body);
    if (!Object.values(Semester).includes(classItem.semester)) {
      res.status(400).json({
        success: false,
        message: `Invalid semester. Please use one of the following: ${Object.values(Semester).join(', ')}.`,
      });
      return;
    }
    if (classItem.students.length > classItem.seats) {
      res.status(400).json({
        success: false,
        message: `Not enough seats for those students.`,
      });
      return;
    }
    await classItem.save();
    res.status(201).json({
      success: true,
      message: `New class created.`,
      classId: classItem.classId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error creating new class.`,
      error: (error as Error).message,
    });
  }
};

export const updateClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const classId = parseInt(req.params.classId);
    if (!classId) {
      res.status(400).json({
        success: false,
        message: `Class ID is required.`,
      });
      return;
    }
    if (req.body.semester && !Object.values(Semester).includes(req.body.semester)) {
      res.status(400).json({
        success: false,
        message: `Invalid semester. Please use one of the following: ${Object.values(Semester).join(', ')}.`,
      });
      return;
    }
    if (req.body.students.length > req.body.seats) {
      res.status(400).json({
        success: false,
        message: `Not enough seats for those students.`,
      });
      return;
    }
    const updatedClass = await Class.findOneAndUpdate({ classId }, req.body, {
      new: true,
    });

    if (!updatedClass) {
      res.status(404).json({
        success: false,
        message: `Error updating class with ID ${classId}`,
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating class',
      error: (error as Error).message,
    });
  }
};

export const deleteClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const classId = parseInt(req.params.classId);
    if (!classId) {
      res.status(400).json({
        success: false,
        message: `Class ID is required.`,
      });
      return;
    }
    const classItem = await Class.findOneAndDelete({ classId });
    if (!classItem) {
      res.status(404).json({
        success: false,
        message: `Could not find class with ID ${classId}`,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: `Class with ID ${classId} was deleted.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting class',
      error: (error as Error).message,
    });
  }
};

// PATCH
export const addStudentToClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const classId = parseInt(req.params.classId);
    if (!classId) {
      res.status(400).json({
        success: false,
        message: `Class ID is required.`,
      });
      return;
    }
    const studentId = req.body.studentId;
    if (!studentId) {
      res.status(400).json({
        success: false,
        message: `Student ID is required.`,
      });
      return;
    }
    const classItem = await Class.findOne({ classId });
    if (!classItem) {
      res.status(404).json({
        success: false,
        message: `Could not find class with ID ${classId}`,
      });
      return;
    }
    if (classItem.students.length >= classItem.seats) {
      res.status(400).json({
        success: false,
        message: `Class with ID ${classId} is full.`,
      });
      return;
    }
    if (classItem.students.includes(studentId)) {
      res.status(409).json({
        success: false,
        message: `Student with ID ${studentId} is already in class with ID ${classId}.`,
      });
      return;
    }
    if (classItem.students.length >= classItem.seats) {
      res.status(400).json({
        success: false,
        message: `Class with ID ${classId} is full.`,
      });
      return;
    }
    classItem.students.push(studentId);
    await classItem.save();
    res.status(200).json({
      success: true,
      message: `Student with ID ${studentId} was added to class with ID ${classId}.`,
      data: classItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding student to class',
      error: (error as Error).message,
    });
  }
};

// PATCH
export const removeStudentFromClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const classId = parseInt(req.params.classId);
    if (!classId) {
      res.status(400).json({
        success: false,
        message: `Class ID is required.`,
      });
      return;
    }
    const studentId = req.body.studentId;
    if (!studentId) {
      res.status(400).json({
        success: false,
        message: `Student ID is required.`,
      });
      return;
    }
    const classItem = await Class.findOne({ classId });
    if (!classItem) {
      res.status(404).json({
        success: false,
        message: `Could not find class with ID ${classId}`,
      });
      return;
    }
    if (!classItem.students.includes(studentId)) {
      res.status(409).json({
        success: false,
        message: `Student with ID ${studentId} is not in class with ID ${classId}.`,
      });
      return;
    }
    classItem.students = classItem.students.filter((id) => id !== studentId);
    await classItem.save();
    res.status(200).json({
      success: true,
      message: `Student with ID ${studentId} was removed from class with ID ${classId}.`,
      data: classItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing student from class',
      error: (error as Error).message,
    });
  }
};
