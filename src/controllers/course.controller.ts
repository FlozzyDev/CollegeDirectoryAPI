import { Request, Response } from 'express';
import Course from '../db/models/courseModel.js';

export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await Course.find().sort({ courseName: 1 });
    if (courses.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No courses found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: `Fetched all courses. Count: ${courses.length}.`,
      data: courses,
      courseCount: courses.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: (error as Error).message,
    });
  }
};

export const getCourseByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseName = req.params.courseName;
    if (!courseName) {
      res.status(400).json({
        success: false,
        message: `Course ID is required.`,
      });
      return;
    }
    const course = await Course.findOne({ courseName });
    if (!course) {
      res.status(404).json({
        success: false,
        message: `No course found with ${courseName}`,
      });
      return;
    }
    if (course) {
      res.status(200).json({
        success: true,
        data: course,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: (error as Error).message,
    });
  }
};

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = new Course(req.body);
    if (!course) {
      res.status(400).json({
        success: false,
        message: `Request body is required.`,
      });
      return;
    }
    const existingCourse = await Course.findOne({ courseName: course.courseName });
    if (existingCourse) {
      res.status(409).json({
        success: false,
        message: `Course with name ${course.courseName} already exists.`,
      });
      return;
    }

    const savedSuccessfully = await course.save();
    if (savedSuccessfully) {
      res.status(201).json({
        success: true,
        message: `New course created.`,
        data: course,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error creating new course.`,
      error: (error as Error).message,
    });
  }
};

export const updateCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseName = req.params.courseName;
    if (!courseName) {
      res.status(400).json({
        success: false,
        message: `Course ID is required.`,
      });
      return;
    }
    const course = await Course.findOneAndUpdate({ courseName }, req.body, {
      new: true,
    });
    if (!course) {
      res.status(404).json({
        success: false,
        message: `Could not find course with ${courseName}`,
      });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: (error as Error).message,
    });
  }
};

export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseName = req.params.courseName;
    if (!courseName) {
      res.status(400).json({
        success: false,
        message: `Course ID is required.`,
      });
      return;
    }
    const course = await Course.findOneAndDelete({ courseName });
    if (!course) {
      res.status(404).json({
        success: false,
        message: `Could not find course with ${courseName}`,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: `Course with ID ${courseName} was deleted.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: (error as Error).message,
    });
  }
};
