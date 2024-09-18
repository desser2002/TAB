import { Admin } from "../types/Admin";

export const getAdminsByCompanyId = async (companyId: string): Promise<Admin[]> => {
  try {
    const response = await fetch(`http://localhost:3000/api/admins/company/${companyId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch admins");
    }

    // Ожидаем, что ответ будет массивом объектов Admin
    const admins: Admin[] = await response.json();
    return admins;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
};
