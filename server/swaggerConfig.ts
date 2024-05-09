import swaggerJsDoc from 'swagger-jsdoc';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Example API',
      version: '1.0.0',
      description: 'A simple Express API',
    },
  },
  apis: ['./routes/*.ts'], // Убедитесь, что путь указывает на ваши TypeScript файлы
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
