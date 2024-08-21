// src/services/companyService.ts
import { Company } from '../types/Company';

export const createCompany = async (data: Company) => {
  const response = await fetch('http://localhost:3000/api/company/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  return response.json();
};
