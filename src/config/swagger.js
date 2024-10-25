import schemas from "../routes/postSchema.json" assert { type: "json" };

export const swaggerOptions = {
  definition: {
    openapi: "3.1.1",
    info: {
      title: "Imersão Back-End",
      version: "0.1.0",
      description:
        "Documentação de API com Swagger/Open API",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Alura Imersão",
        url: "https://alura.com.br",
        email: "e@e.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    paths: schemas.paths,
    components: schemas.components,
  },
  apis: ["./src/routes/*.js"],
};
