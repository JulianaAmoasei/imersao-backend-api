import { ObjectId } from "mongodb";
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
  const colecao = await conectarComColecaoPosts();
  return colecao.find().toArray();
}

export async function getPostPorID(id) {
  //"671686013a59f9c49b23dadc"
  const objectId = ObjectId.createFromHexString(id);
  const colecao = await conectarComColecaoPosts();
  return colecao.findOne({ _id: new ObjectId(objectId) });
}

export async function postNovoPost(novoPostObj) {
  const colecao = await conectarComColecaoPosts();
  // nesse momento não temos validação de dados de entrada
  return colecao.insertOne(novoPostObj);
}

export async function atualizaPost(postId, postAtualizado) {
  const objectId = ObjectId.createFromHexString(postId);
  const colecao = await conectarComColecaoPosts();
  return colecao.updateOne(
    { _id: new ObjectId(objectId) },
    { $set: postAtualizado }
  );
}
