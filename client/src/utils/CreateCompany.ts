// src/services/companyService.ts
import { Company } from '../types/Company';

export const createCompany = async (data: Company, userId: string) => {
  try {
    // Step 1: Create the company
    const response = await fetch('http://localhost:3000/api/company/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Await the response to ensure the company is created before proceeding
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong while creating the company');
    }

    const createdCompany = await response.json();

    // Step 2: Add the user as an admin for the newly created company
    const addAdminResponse = await fetch('http://localhost:3000/api/admins/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        companyIds: [createdCompany.company._id] // Assuming the response contains the new company's ID as `_id`
      })
    });

    // Await the response to ensure the user is added as an admin
    if (!addAdminResponse.ok) {
      const errorData = await addAdminResponse.json();
      throw new Error(errorData.message || 'Something went wrong while assigning admin role');
    }

    const adminData = await addAdminResponse.json();

    // Log the admin data to verify the order of execution
    console.log('Admin added:', adminData);

    return { company: createdCompany, admin: adminData };

  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Operation failed: ${error.message}`);
    } 
  }
};
