// utils/addWorkExperience.ts
import { WorkExperienceType } from '../types/WorkExperience';

const API_URL = 'http://localhost:3000/api';

// Функция для добавления опыта работы
export const addWorkExperience = async (workExperience: WorkExperienceType) => {
  try {
    const response = await fetch(`${API_URL}/work-experience`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workExperience),
    });

    if (!response.ok) {
      throw new Error('Failed to add work experience');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding work experience:', error);
    throw error;
  }
};
