// utils/getEducationByUserId.ts
const API_URL = 'http://localhost:3000/api';

// Функция для получения данных об образовании по userId
export const getEducationByUserId = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/education/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch education data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching education data:', error);
    throw error;
  }
};
