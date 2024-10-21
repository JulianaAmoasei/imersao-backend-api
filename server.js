import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";

const app = express();
const PORT = 3000;

app.use(express.json());

await conectarAoBanco(process.env.STRING_CONEXAO);

app.listen(PORT, () => {
  console.log("servidor escutando!");
});
