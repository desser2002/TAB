import { Request, Response } from "express";

import { Company } from "../models/Company";
import { User } from "../models/User";
import { Admin } from "../models/Admin";

// Создание нового администратора
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { userId, companyIds } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Проверка наличия компаний по _id
    const companies = await Company.find({ _id: { $in: companyIds } });
    if (companies.length !== companyIds.length) {
      return res.status(404).json({ message: "No companies found" });
    }

    // Создание нового администратора
    const newAdmin = new Admin({ userId, companyIds });
    await newAdmin.save();

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Поиск ID кампаний по ID пользователя
export const findCompaniesByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Find all admins by userId and populate the associated companies
    const admins = await Admin.find({ userId }).populate({
      path: 'companyIds', // The field that references companies
      model: 'Company'    // The model being populated
    });

    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: "Admins not found" });
    }

    // Extract all company details from all found admins
    const companies = admins.flatMap(admin => admin.companyIds);

    // Return the fully populated company details
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Поиск администраторов по ID компании
export const findAdminsByCompanyId = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;

    // Поиск администраторов по ID компании
    const admins = await Admin.find({ companyIds: companyId }).populate("userId");

    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: "No admins found for this company" });
    }

    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
