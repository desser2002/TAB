import { Request, Response } from 'express';
import { Applications } from '../models/Applications';

// Функция для создания новой заявки (application)
export const createApplication = async (req: Request, res: Response) => {
  try {
    const newApply = new Applications(req.body);
    await newApply.save();
    res.status(201).send("Apply added successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};

// Функция для получения списка заявок (applications) по ID вакансии (job)
export const getApplicationsByJobId = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const applications = await Applications.find({ job: jobId }).populate('user', 'email name').exec();

    if (applications.length === 0) {
      return res.status(404).send({ message: "No applications found for this job" });
    }

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving applications", error });
  }
};
