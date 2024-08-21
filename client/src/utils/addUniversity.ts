import { University } from "../types/University";

  
  export const addUniversity = async (data: University) => {
    const response = await fetch('http://localhost:3000/api/university/add', {
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
  