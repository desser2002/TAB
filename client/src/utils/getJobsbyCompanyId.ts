export const fetchJobsByCompanyId = async (companyId: string): Promise<Job[]> => {
  try {
    const response = await fetch(`http://localhost:3000/api/jobs/company/${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch jobs for company ID: ${companyId}`);
    }

    const data: Job[] = await response.json();
    console.log(data)
    return data;
    
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};
