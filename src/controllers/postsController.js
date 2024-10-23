import fs from "fs";
import {
  getTodosOsPosts,
  getPostPorID,
  postNovoPost,
} from "../models/postModel.js";

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
    res
      .status(200)
      .json({ message: "post criado com sucesso", post: postCriado });
  } catch (erro) {
    res.status(500).json({ message: `${erro.message} - falha na requisição` });
  }
}

export async function uploadImage(req, res) {
  const novoPost = {
    imgUrl: req.file.originalname,
    descricao: "",
    alt: "",
  };

  try {
    const novoDoc = await postNovoPost(novoPost);
    //por enquanto só png
    //depois fazer lógica para pegar substring da ext se der tempo
    const arquivoAtualizado = `uploads/${novoDoc.insertedId}.png`;
    fs.renameSync(req.file.path, arquivoAtualizado);
    res
      .status(200)
      .json({
        message: "imagem salva com sucesso",
        id: novoDoc.insertedId.toString(),
      });
  } catch (erro) {
    res
      .status(500)
      .json({ message: `${erro.message} - falha ao salvar imagem` });
  }
}
