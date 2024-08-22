import { Company } from "../types/Company";

export const getCompanyInfo = async (id: string): Promise<Company> => {
    try {
        // Корректное использование template literals для включения id в URL
        const response = await fetch(`http://localhost:3000/api/company/info/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            // Корректное извлечение текста ошибки из ответа
            const errorText = await response.text(); 
            throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
        }

        // Предполагаем, что API возвращает объект компании без лишних вложений
        const company: Company = await response.json(); // Разбираем JSON только один раз
        console.log(company)
        return company; // Возвращаем разобранный объект компании напрямую
    } catch (error) {
        console.error('Error fetching company info:', error);
        throw error; // Перебрасываем ошибку, чтобы она могла быть обработана выше
    }
};
