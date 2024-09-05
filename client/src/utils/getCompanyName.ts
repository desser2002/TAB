export const getCompanyName = async (id: string): Promise<string> => {
    try {
        // Correct usage of template literals to include the id in the URL
        const response = await fetch(`http://localhost:3000/api/company/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            // Properly extracting the error text from the response
            const errorText = await response.text(); // Ensure we get the text only once
            throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
        }

        const companyName = await response.text(); // Now we expect plain text, not JSON
        console.log('Success:', companyName);
        return companyName; // Return the company name directly
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error so it can be handled further up the call stack if necessary
    }
};
