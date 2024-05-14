import { Request, Response } from 'express';
import { Job, IJob } from '../models/Job';

export const createOffer = async (req: Request, res: Response): Promise<void> => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).send(newJob);
  } catch (error) {
    res.status(400).send(error);
  }

};
export const getAllOffers = async (req:Request, res: Response): Promise<void> =>

  {
    try {
      const jobs = await Job.find({}); // Fetch all documents in the jobs collection
      res.json(jobs); // Send the retrieved jobs as a JSON response
    } catch (error) {
      res.status(500).send("Failed to fetch jobs. Error: " + error.message);
    }
  }
