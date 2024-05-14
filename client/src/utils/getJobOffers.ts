export interface JobOffer {
    _id: string;
    title: string;
    short_description: string;
    full_description: string;
    location: string;
    salary: number;
    compani_id: number;
    publication_date: Date;
}

export const getJobOffer = async (): Promise<JobOffer[]> => {
    try {
        const response = await fetch('http://localhost:3000/api/offers', {
            method: 'GET',
        });

        if (!response.ok) {
            // Properly extracting the error text from the response
            const errorText = await response.text(); // Ensure we get the text only once
            throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
        }

        const jobOffers: JobOffer[] = await response.json(); // Parse JSON only once
        console.log('Success:', jobOffers);
        return jobOffers; // Return the parsed job offers directly
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error so it can be handled further up the call stack if necessary
    }
};
