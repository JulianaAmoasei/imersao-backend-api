import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";
import routes from "./src/routes/postsRoute.js";

const PORT = 3000;
const app = express();
routes(app);

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

async function getTodosPosts() {
  const db = conexao.db('appfotos');
  const colecao = db.collection('posts');
  return colecao.find().toArray();
}

const resultado = await getTodosPosts();
console.log(resultado);

app.listen(PORT, () => {
  console.log("servidor escutando!");
});
