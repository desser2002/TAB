export const addUsertoAdmins = async (userId: string, companyId: string): Promise<void> => {
    try {
        const response = await fetch("http://localhost:3000/api/admins/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, companyIds: [companyId] }), // Исправлено: передаем companyIds как массив
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
        }

        const newAdmin = await response.json();
        console.log('Admin created successfully:', newAdmin);
    } catch (error) {
        console.error('Error creating admin:', error);
        throw error;
    }
};
