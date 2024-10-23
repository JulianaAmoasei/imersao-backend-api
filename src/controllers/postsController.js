import fs from "fs";
import {
  getTodosOsPosts,
  getPostPorID,
  postNovoPost,
  atualizaPost,
  deletaUmPost
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
    res.status(200).json({
      message: "imagem salva com sucesso",
      id: novoDoc.insertedId.toString(),
    });
  } catch (erro) {
    res
      .status(500)
      .json({ message: `${erro.message} - falha ao salvar imagem` });
  }
}

export async function atualizaNovoPost(req, res) {
  const id = req.params.id;

  const postAtualizadoObj = {
    imgUrl: `${req.params.id}.png`,
    descricao: req.body.descricao,
    alt: req.body.alt,
  };

  try {
    const postCriado = await atualizaPost(id, postAtualizadoObj);
    res
      .status(200)
      .json({ message: "post atualizado com sucesso", post: postCriado });
  } catch (erro) {
    res.status(500).json({ message: `${erro.message} - falha na requisição` });
  }
}

export async function excluiPostPorID(req, res) {
  const idDoPost = req.params.id;
  try {
    const resultadoExclusao = await deletaUmPost(idDoPost);
    res.status(200).json(resultadoExclusao);
  } catch (erro) {
    res.status(500).json({ message: `${erro.message} - falha na requisição` });
  }
}
