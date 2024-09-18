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

    // Поиск администраторов по ID компании с популяцией userId
    const admins = await Admin.find({ companyIds: companyId }).populate({
      path: 'userId',
      select: '_id', // Загружаем только _id для userId
    });

    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: "No admins found for this company" });
    }

    // Преобразуем userId в строку (ObjectId не имеет свойства _id)
    const result = admins.map((admin) => ({
      ...admin.toObject(), // Преобразуем документ в объект
      userId: (admin.userId as any)._id.toString(), // Преобразуем ObjectId в строку
    }));

    // Возвращаем преобразованный результат
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};






// Удаление администратора по ID
export const deleteAdminById = async (req: Request, res: Response) => {
  try {
    const { adminId } = req.params;

    // Поиск администратора по ID и его удаление
    const admin = await Admin.findByIdAndDelete(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
