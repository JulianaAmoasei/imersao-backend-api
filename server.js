import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import routes from "./src/routes/postsRoute.js";
import { swaggerOptions } from "./src/config/swagger.js";

const PORT = 3000;
const app = express();
app.use(express.static('public'));

const specs = swaggerJSDoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

routes(app);

app.listen(PORT, () => {
  console.log("servidor escutando!");
});
