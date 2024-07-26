import { Request, Response } from 'express';

import { Applications } from '../models/Applications';



// Функция для создания новой компании
export const createApplication = async (req: Request, res: Response) => {
  try {
    const newApply = new Applications(req.body);
    await newApply.save();

    res.status(201).send("Apply added succesfull");
} catch (error) {
  res.status(400).send(error);
}
};
