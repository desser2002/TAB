// utils/addEducation.ts
import { EducationType } from '../types/Education';

const API_URL = 'http://localhost:3000/api';

// Функция для добавления данных об образовании
export const addEducation = async (education: EducationType) => {
  try {
    const response = await fetch(`${API_URL}/education`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(education),
    });

    if (!response.ok) {
      throw new Error('Failed to add education');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding education:', error);
    throw error;
  }
};
