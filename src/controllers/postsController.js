import { getTodosOsPosts, getPostPorID, postNovoPost } from "../models/postModel.js";

export async function listarPosts(req, res) {
  try {
    const listaPosts = await getTodosOsPosts();
    res.status(200).json(listaPosts);
  } catch (erro) {
    res.status(500).json({ message: `${erro.message} - falha na requisição` });
  }
}

export async function listarPostPorID(req, res) {
  const idDoPost = req.params.id;    
  try {
    const umPost = await getPostPorID(idDoPost);
    res.status(200).json(umPost);
  } catch (erro) {
    res.status(500).json({ message: `${erro.message} - falha na requisição` });
  }
}

export async function criarPost(req, res) {
  const novoPost = req.body;
  try {
    const postCriado = await postNovoPost(novoPost);
    res.status(200).json({message: 'post criado com sucesso', post: postCriado});
  } catch (erro) {
    res.status(500).json({ message: `${erro.message} - falha na requisição` });
  }
}
