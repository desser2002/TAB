interface FormData {
    title: string;
    description: string;
    requirements: string;
  }
  
  export const submitJobForm = async (formData: FormData): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  