import express from "express";
// import routes from "./src/routes/postsRoute.js";
import { conectarInstanciaSQL } from "./src/config/dbConfig.js";

const PORT = 3000;
const app = express();
// routes(app);

await conectarInstanciaSQL();

app.listen(PORT, () => {
  console.log("servidor escutando!");
});
