import { Request, Response } from 'express';
import { Company, ICompany } from '../models/Company';

// Функция для получения названия компании по ID
export const getCompanyNameById = async (req: Request, res: Response) => {
  try {
    const company = await Company.findById(req.params.id).exec();
    if (!company) {
      return res.status(404).send({ message: "Company not found" });
    }
    res.status(200).send(company.name);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving company", error });
  }
};

export const getCompanyIndoById = async (req: Request, res: Response) => {
  try {
    const company = await Company.findById(req.params.id).exec();
    if (!company) {
      return res.status(404).send({ message: "Company not found" });
    }
    res.status(200).send( company );
  } catch (error) {
    res.status(500).send({ message: "Error retrieving company", error });
  }
};

// Функция для создания новой компании
export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, location, industry } = req.body;
    const newCompany = new Company({
      name,
      location,
      industry
    });

    const savedCompany = await newCompany.save();
    res.status(201).send({ message: "Company created successfully", company: savedCompany });
  } catch (error) {
    res.status(500).send({ message: "Error creating company", error });
  }
};
