import { Request, Response } from 'express';
import Student from '../db/models/studentModel.js';

export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.find().sort({ studentId: 1 });
    if (students.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No students found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: `Fetched all students. Count: ${students.length}.`,
      data: students,
      studentCount: students.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: (error as Error).message,
    });
  }
};

export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = parseInt(req.params.studentId);
    if (!studentId || studentId < 1) {
      res.status(400).json({
        success: false,
        message: `Student ID is required.`,
      });
      return;
    }
    const student = await Student.findOne({ studentId });
    if (!student) {
      res.status(404).json({
        success: false,
        message: `No student found with ${studentId}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Student with ID ${studentId} found.`,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: (error as Error).message,
    });
  }
};

export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body) {
      res.status(400).json({
        success: false,
        message: `Request body is required.`,
      });
      return;
    }
    const student = new Student(req.body);

    const existingStudent = await Student.findOne({ email: student.email });
    if (existingStudent) {
      res.status(409).json({
        success: false,
        message: `Student with email ${student.email} already exists.`,
      });
      return;
    }

    const savedSuccessfully = await student.save();
    if (savedSuccessfully) {
      res.status(201).json({
        success: true,
        message: `New student created.`,
        data: student,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error creating new student.`,
      error: (error as Error).message,
    });
  }
};

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = parseInt(req.params.studentId);
    if (!studentId) {
      res.status(400).json({
        success: false,
        message: `Student ID is required.`,
      });
      return;
    }
    const student = await Student.findOneAndUpdate({ studentId }, req.body, {
      new: true,
    });
    if (!student) {
      res.status(404).json({
        success: false,
        message: `Could not find student with ID ${studentId}`,
      });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error updating student`,
      error: (error as Error).message,
    });
  }
};

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = parseInt(req.params.studentId);
    if (!studentId) {
      res.status(400).json({
        success: false,
        message: `Student ID is required.`,
      });
      return;
    }
    const student = await Student.findOneAndDelete({ studentId });
    if (!student) {
      res.status(404).json({
        success: false,
        message: `Could not find student with ID ${studentId}`,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: `Student with ID ${studentId} was deleted.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error deleting student`,
      error: (error as Error).message,
    });
  }
};
