import { Company } from "../types/Company";

export const fetchCompaniesByUserId = async (userId: string): Promise<Company[]> => {
  try {
    const response = await fetch(`http://localhost:3000/api/admins/companies/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }

    const data = await response.json();

    // Преобразуем данные, чтобы _id записывался в id
    const companies = data.map((item: any) => {
      const company = item.company ? item.company : item;
      return {
        ...company,
        id: company._id,  // Переносим значение _id в id
      };
    });

    return companies as Company[];
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};
