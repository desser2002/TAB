import { ApplyT } from "../types/Apply";

export const Apply = async (data:ApplyT ) => {
    const response = await fetch('http://localhost:3000/api/apply/add_apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  console.log(data);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }
  
    const result = await response.json();
    return result; // 
  };