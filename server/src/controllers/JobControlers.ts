import { Request, Response } from 'express';
import { Job } from '../models/Job';

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
  export const findOfferById = async (req: Request, res: Response): Promise<void> => {
    try {
        const job = await Job.findById(req.params.id); // Fetch the job by ID from the jobs collection

        if (!job) {
            res.status(404).send("Job not found");
            return;
        }

        res.json(job); // Send the retrieved job as a JSON response
    } catch (error) {
        res.status(500).send("Failed to fetch job. Error: " + error.message);
    }
};
export const getOffersByCompanyId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { companyId } = req.params;
    const jobs = await Job.find({ company: companyId }); // Fetch all jobs for a specific company

    if (jobs.length === 0) {
      res.status(404).send("No jobs found for this company");
      return;
    }

    res.json(jobs); // Send the retrieved jobs as a JSON response
  } catch (error) {
    res.status(500).send("Failed to fetch jobs. Error: " + error.message);
  }
};