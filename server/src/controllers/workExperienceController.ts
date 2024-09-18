// controllers/workExperienceController.ts
import { Request, Response } from 'express';
import { WorkExperience } from '../models/WorkExperience';

// Добавить опыт работы
export const addWorkExperience = async (req: Request, res: Response) => {
  try {
    const { userId, position, company, startDate, endDate } = req.body;

    const newWorkExperience = new WorkExperience({
      userId,
      position,
      company,
      startDate,
      endDate,
    });

    await newWorkExperience.save();
    res.status(201).json(newWorkExperience);
  } catch (error) {
    res.status(500).json({ message: 'Error adding work experience', error });
  }
};

// Получить опыт работы по userId
export const getWorkExperienceByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const workExperiences = await WorkExperience.find({ userId });
    res.status(200).json(workExperiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching work experiences', error });
  }
};
