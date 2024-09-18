// utils/getWorkExperienceByUserId.ts
const API_URL = 'http://localhost:3000/api';

// Функция для получения опыта работы по userId
export const getWorkExperienceByUserId = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/work-experience/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch work experiences');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching work experiences:', error);
    throw error;
  }
};
