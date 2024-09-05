// api/applications.ts

import { ApplyT } from "../types/Apply";


export const fetchApplications = async (): Promise<ApplyT[]> => {
  try {
    const response = await fetch('http://localhost:3000/api/applications');
    
    if (!response.ok) {
      throw new Error('Failed to fetch applications');
    }

    const data: ApplyT[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};
