import { Company } from "../types/Company";

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

        const company: Company = await response.json(); // Parse JSON only once
        console.log('Success:', company);
        return company.name; // Return the parsed job offer directly
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error so it can be handled further up the call stack if necessary
    }
};
