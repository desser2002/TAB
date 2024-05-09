import { Request, Response } from 'express';
import { Job, IJob } from '../models/Job';

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).send(newJob);
  } catch (error) {
    res.status(400).send(error);
  }
};
