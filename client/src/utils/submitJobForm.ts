interface FormData {
  title: string;
  short_description: string;
  full_description: string;
  location: string;
  salary: number;
  company: string;
  publication_date: Date;
  }
  
  export const submitJobForm = async (formData: FormData): Promise<void> => {
   formData.publication_date = new Date();
  
    try {
      const response = await fetch('http://localhost:3000/api/add_job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log (formData)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log('Success:', result);
        // Optionally, handle result in your UI, like showing a success message
      } else {
        throw new Error('Invalid JSON response');
      }
    } catch (error) {
      console.error('Error:', error);
      // Optionally, update state to show error in your UI
    }
  };
  

  