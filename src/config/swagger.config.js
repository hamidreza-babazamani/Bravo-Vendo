const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function SwaggerConfig(app) {
  const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "Vendo API",
        description: "Vendo Backend - Online Classified Ads Platform",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3400",
          description: "Development Server",
        },
        {
          url: "https://bravo-vendo.onrender.com",
          description: "Production Server",
        },
      ],
    },
    apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
  });

  const swagger = swaggerUi.setup(swaggerDocument, {});
  app.use("/swagger", swaggerUi.serve, swagger);
}

module.exports = SwaggerConfig;
