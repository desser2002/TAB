import { ApplyT } from "../types/Apply";

export const getApplicationsByJobId = async (jobId: string): Promise<ApplyT[]> => {
  try {
    const response = await fetch(`http://localhost:3000/api/apply/job/${jobId}`);

    if (!response.ok) {
      throw new Error(`Error fetching applications: ${response.statusText}`);
    }

    const applications: ApplyT[] = await response.json();
    console.log(applications)
    return applications;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw new Error('Failed to fetch applications for this job.');
  }
};
