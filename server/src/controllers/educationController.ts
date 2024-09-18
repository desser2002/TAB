// controllers/educationController.ts
import { Request, Response } from 'express';
import { Education } from '../models/Education';

// Добавить образование
export const addEducation = async (req: Request, res: Response) => {
  try {
    const { userId, university, specialization, startYear, endYear } = req.body;

    const newEducation = new Education({
      userId,
      university,
      specialization,
      startYear,
      endYear,
    });

    await newEducation.save();
    res.status(201).json(newEducation);
  } catch (error) {
    res.status(500).json({ message: 'Error adding education', error });
  }
};

// Получить данные об образовании по userId
export const getEducationByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const educations = await Education.find({ userId });
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching educations', error });
  }
};
