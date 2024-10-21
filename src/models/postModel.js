import conectarAoBanco from "../config/dbConfig.js";

export async function conectarComColecaoPosts() {
  try {
    const mongoClient = await conectarAoBanco(process.env.STRING_CONEXAO);
    //TOMAR CUIDADO QUE SE O NOME ESTIVER ERRADO O MONGO CRIA OUTRO
    const db = mongoClient.db("appfotos");
    const colecao = db.collection("posts");
    return colecao;
  } catch (erro) {
    console.error("Falha na conexão com o banco!", erro);
    await mongoClient.close();
  }
}

export async function getTodosOsPosts() {
  const colecao = await conectarComColecaoPosts()
  return colecao.find().toArray();
}
